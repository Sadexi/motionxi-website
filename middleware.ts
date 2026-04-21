import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "motionxi_admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage  = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  const token  = req.cookies.get(COOKIE_NAME)?.value;
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET ?? "dev-secret");

  let valid = false;
  if (token) {
    try { await jwtVerify(token, secret); valid = true; } catch {}
  }

  if (isAdminRoute && !isLoginPage && !valid) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (isLoginPage && valid) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
