import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Get the token from the cookies
        const token = request.cookies.get("token")?.value

        if (!token) {
        // Redirect to login page if no token is found
        return NextResponse.redirect(new URL("/auth/login", request.url))
        }

        try {
        // Verify the token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

        const payload = await jwtVerify(token, secret)

        // Check if the user is an admin
        if (payload.payload.email !== "edgar.backer@medieinstitutet.se") {
            // Redirect to home page if not admin
            return NextResponse.redirect(new URL("/", request.url))
        }

        // Continue with the request if token is valid and user is admin
        return NextResponse.next()
        } catch (error) {
        console.error("Token verification failed:", error)
        // Redirect to login page if token is invalid
        return NextResponse.redirect(new URL("/auth/login", request.url))
        }
    }

    // Continue with the request for non-admin routes
    return NextResponse.next()
    }

    // See "Matching Paths" below to learn more
    export const config = {
    matcher: ["/admin/:path*"],
}

