# Certmaker — Architecture Deep Dive

This document provides a comprehensive technical breakdown of the Certmaker architecture, component interactions, data flows, and design decisions.

---

## Table of Contents

- [System Overview](#system-overview)
- [Frontend Architecture](#frontend-architecture)
- [Smart Contract Design](#smart-contract-design)
- [Storage Layer](#storage-layer)
- [Identity & ZK Layer](#identity--zk-layer)
- [Data Flow Diagrams](#data-flow-diagrams)
- [Contract ABI Reference](#contract-abi-reference)
- [Security Considerations](#security-considerations)

---

## System Overview

Certmaker is composed of three fully decentralized layers that interact without any centralized backend:

```
┌─────────────────────────────────────────┐
│         Frontend  (Next.js 14)          │
│  wagmi hooks ──→ Contract calls         │
│  Lighthouse SDK ──→ IPFS uploads        │
│  Anon Aadhaar ──→ ZK proof generation  │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐   ┌──────────────────┐
│  Blockchain │   │  IPFS / Filecoin │
│  (EVM)      │   │  (Lighthouse)    │
│  Certmaker  │   │  Certificate     │
│  Contract   │   │  Documents       │
└─────────────┘   └──────────────────┘
```

---

## Frontend Architecture

### Directory Structure

```
Certmaker/
├── app/
│   ├── layout.tsx                   # Root layout (Web3Modal, AnonAadhaar providers)
│   └── (main)/
│       ├── layout.tsx               # Main shell with Navbar
│       ├── (home)/page.tsx          # Landing page
│       ├── issuer/page.tsx          # Issuer registration + certificate upload
│       ├── user/page.tsx            # User registration
│       ├── user/[name]/page.tsx     # User certificate portfolio
│       └── user-certificate/[id]/   # Individual certificate viewer
├── components/
│   ├── navbar.tsx                   # Navigation bar (wallet connection)
│   ├── uploader.tsx                 # Lighthouse IPFS file uploader component
│   ├── aadhar-uploader.tsx          # Anon Aadhaar ZK proof uploader
│   ├── AadharProvider.tsx           # Anon Aadhaar React context provider
│   └── ui/                          # shadcn/ui component library
├── lib/
│   ├── contractUtils.tsx            # Contract address + ABI exports
│   └── utils.ts                     # cn() tailwind class utility
├── context/                         # React context providers
├── store/
│   └── use-aadhar-status.ts         # Zustand store for Aadhaar proof state
└── contract/
    ├── contracts/decert.sol         # Certmaker smart contract
    ├── scripts/deploy.js            # Hardhat deployment script
    └── test/                        # Contract unit tests
```

### State Management

| State | Library | Scope |
|---|---|---|
| Wallet / account | wagmi | Global (via WagmiConfig provider) |
| Contract reads | wagmi `useContractRead` | Per-component |
| Contract writes | wagmi `useContractWrite` | Per-component |
| Aadhaar ZK status | Zustand | Global |
| Form data | React Hook Form | Per-form |

### Routing Model

```
/                        → Landing page (features, CTA)
/issuer                  → Issuer registration & certificate issuance
/user                    → User registration
/user/[name]             → User's public verifiable portfolio
/user-certificate/[id]   → Individual certificate viewer (sharable link)
```

---

## Smart Contract Design

### Contract: `Certmaker.sol`

**Compiler:** Solidity `^0.8.10`
**Network:** EVM-compatible (deployed on Polygon)
**Address:** `0xed8A12A699d1eC31Fe674b75Ca58BA8A93989E24`

### Storage Layout

```solidity
// User profile registry: wallet address → user details
mapping(address => Detail) public s_details;

// Certificate registry: user email → array of IPFS CID URLs
mapping(string => string[]) public s_userData;
```

### Access Control Model

```
                    ┌──────────────────┐
                    │  Smart Contract  │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
    ┌──────────────────┐        ┌──────────────────────┐
    │  User (prover)   │        │  Issuer (isIssuer)   │
    │                  │        │                      │
    │  addDetails()    │        │  addDetails()        │
    │  fetchDetail()   │        │  fetchDetail()       │
    │  fetchUserData() │        │  fetchUserData()     │
    │  updateDetails() │        │  updateDetails()     │
    │                  │        │  addUserData() ← ✅  │
    └──────────────────┘        └──────────────────────┘
```

`addUserData` reverts with `Certmaker__OnlyIssuerRequired()` if `msg.sender` is not a registered issuer.

---

## Storage Layer

### Lighthouse IPFS Integration

Certmaker uses the **Lighthouse Web3 SDK** to upload certificate files directly from the browser to IPFS nodes backed by Filecoin storage deals.

**Upload flow:**

```
1. User selects file (PDF, PNG, JPG)
       ↓
2. lighthouse.upload(file, API_KEY, false, null, progressCallback)
       ↓
3. Lighthouse node pins file to IPFS
       ↓
4. Returns: { data: { Name, Size, Hash (CID) } }
       ↓
5. Gateway URL constructed:
   https://gateway.lighthouse.storage/ipfs/<CID>
       ↓
6. CID URL passed to addUserData() on-chain
```

**Progress tracking:**
```typescript
const progressCallback = (progressData: number) => {
  let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  setProgress(percentageDone);
};
```

---

## Identity & ZK Layer

### Anon Aadhaar Integration

Anon Aadhaar is a ZK-SNARK circuit that generates a proof that a user holds a valid Aadhaar card **without revealing any personal information**.

**How it works:**

```
1. User scans Aadhaar QR code
       ↓
2. Browser-side ZK circuit (WASM + snark.js) processes the QR data
       ↓
3. Generates a cryptographic proof  (no PII transmitted anywhere)
       ↓
4. Proof verified against the Anon Aadhaar verifier contract
       ↓
5. Upon success → issuers unlock the certificate upload panel
```

**React integration:**

```tsx
// Provider wraps the entire app
<LogInWithAnonAadhaar />     // Login button component
const [anonAadhaar] = useAnonAadhaar();  // Hook for proof status
```

**Global status** is tracked in the Zustand store `use-aadhar-status.ts` so any component in the tree can access proof state.

---

## Data Flow Diagrams

### Certificate Issuance Flow

```
Issuer Browser                Lighthouse IPFS           Blockchain (EVM)
──────────────                ───────────────           ─────────────────
     │                               │                         │
     │── Select certificate file ───▶│                         │
     │◀── Upload progress (%) ───────│                         │
     │◀── IPFS CID returned ─────────│                         │
     │                               │                         │
     │── addUserData(email, CID) ───────────────────────────▶ │
     │                               │                         │── s_userData[email].push(CID)
     │◀── Transaction confirmed ─────────────────────────────  │
     │                               │                         │
```

### Certificate Verification Flow

```
Verifier Browser              IPFS Gateway              Blockchain (EVM)
────────────────              ────────────              ─────────────────
     │                               │                         │
     │── Open /user/[name] ─────────────────────────────────▶ │
     │◀── fetchUserData(email) returns CID array ─────────────│
     │                               │                         │
     │── GET https://gateway.../CID ▶│                         │
     │◀── Certificate document ──────│                         │
     │                               │                         │
     │ [Render verified certificate] │                         │
```

---

## Contract ABI Reference

Key function signatures for frontend integration (see `lib/contractUtils.tsx` for full ABI):

```typescript
// Register user or issuer
addDetails(address _userAddress, string _userName, string _email, bool _prover, bool _ofIssuer)

// Fetch user details by wallet address
fetchDetail(address userAddress) returns (Detail)

// Fetch all certificates for a user (by email)
fetchUserData(string _email) returns (string[])

// Issue a new certificate (issuers only)
addUserData(string _email, string _data)

// Update own profile
updateDetailsByUser(string _changeUserName, string _changeEmail)
```

---

## Security Considerations

### Threat Model

| Threat | Mitigation |
|---|---|
| Forged certificates | IPFS CIDs are content-addressed (SHA-256 hash of content) — any tampering produces a different CID |
| Unauthorized certificate issuance | `isIssuer` flag enforced on-chain; reverts with custom error |
| PII exposure during identity verification | Anon Aadhaar ZK circuit — no raw Aadhaar data leaves the browser |
| Phishing / impersonation | Certificate validity anchored to wallet address on-chain |
| Storage loss | Lighthouse Filecoin deals ensure long-term IPFS persistence |
| Smart contract re-entrancy | Solidity 0.8.x + checks-effects-interactions pattern |

### Known Limitations

- Email is used as the key for `s_userData` — this assumes unique emails per user. Consider migrating to address-based lookup in future versions.
- `updateDetailsByUser` does not validate uniqueness — a user can set a username that conflicts with another user.
- The `isIssuer` flag is set at registration time and cannot be revoked — consider adding an admin role for future governance.

---

*Certmaker — Empowering Trust through Transparency and Verifiable Certifications.*
