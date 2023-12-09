export const contractAddress = "0xed8A12A699d1eC31Fe674b75Ca58BA8A93989E24";
export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_prover",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_ofIssuer",
        type: "bool",
      },
    ],
    name: "addDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "addUserData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DeCert_Invalid_User",
    type: "error",
  },
  {
    inputs: [],
    name: "DeCert__AlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "DeCert__OnlyIssuerRequired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_changeUserName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_changeEmail",
        type: "string",
      },
    ],
    name: "updateDetailsByUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_userName",
        type: "string",
      },
    ],
    name: "UserSignIn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "checkDetail",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "fetchDetail",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "bool",
            name: "prover",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isIssuer",
            type: "bool",
          },
        ],
        internalType: "struct DeCert.Detail",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
    ],
    name: "fetchUserData",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "s_details",
    outputs: [
      {
        internalType: "string",
        name: "userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "bool",
        name: "prover",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isIssuer",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "s_userData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
