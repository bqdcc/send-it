"use client"

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function Login() {
  return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
