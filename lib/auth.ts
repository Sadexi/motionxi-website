import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email    = credentials?.email    as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;
        if (email !== process.env.ADMIN_EMAIL) return null;
        const hash  = process.env.ADMIN_PASSWORD_HASH as string;
        const valid = await bcrypt.compare(password, hash);
        if (!valid) return null;
        return { id: "1", email, name: "Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
