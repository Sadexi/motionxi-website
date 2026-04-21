import type { NextAuthConfig } from "next-auth";

// Minimal config for edge middleware (no Node.js-only deps)
export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage  = nextUrl.pathname === "/admin/login";
      if (isAdminRoute && !isLoginPage && !isLoggedIn) return false;
      return true;
    },
  },
};
