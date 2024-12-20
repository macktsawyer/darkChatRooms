// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      creationDate?: Timestamp;
      defaultMessageColor?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    creationDate?: Timestamp;
    defaultMessageColor?: string;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}