"use client";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AadharUploader from "@/components/aadhar-uploader";
import { useAadharStatus } from "@/store/use-aadhar-status";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
});
const Issuer = () => {
  const { aad } = useAadharStatus();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form
        className="flex max-w-3xl mx-auto w-full flex-1 pt-12 h-full flex-col gap-10"
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <h1 className="text-3xl">Sign Up Here</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Name" className="p-6" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" className="p-6" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center">
          <p>Connect Aadhar here:</p>
          <AadharUploader />
        </div>
        <button className="p-2 bg-blue-500 text-white rounded-md" type="submit">
          Submit
        </button>
      </form>
    </Form>
  );
};

export default Issuer;
