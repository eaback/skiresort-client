import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Customer } from "@/lib/db-types"
import { compare } from "bcrypt"
import { SignJWT } from "jose"

export async function POST(request: Request) {
  
  const headers = new Headers()
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")

  try {
    const body = await request.json()

    console.log("Auth attempt for email:", body.email)

    if (!body.email || !body.password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Searching for customer with email:", body.email)
    const customers = await executeQuery<Customer[]>("SELECT * FROM customers WHERE email = ?", [body.email])

    console.log("Found customers:", customers.length)

    if (customers.length === 0) {
      console.log("No customer found with email:", body.email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const customer = customers[0]
    console.log("Found customer with ID:", customer.id, "Email:", customer.email)
    console.log("Customer found:", {
      id: customer.id,
      email: customer.email,
      passwordExists: !!customer.password,
      passwordLength: customer.password ? customer.password.length : 0,
    })

    if (!customer.password) {
      console.log("Customer has no password set")
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("Verifying password...")
    try {
      console.log(
        "Stored password hash (first 10 chars):",
        customer.password ? customer.password.substring(0, 10) + "..." : "NULL",
      )

      const passwordMatch = await compare(body.password, customer.password)
      console.log("Password match result:", passwordMatch)

      if (!passwordMatch) {
        console.log("Password does not match")
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }
    } catch (bcryptError) {
      console.error("bcrypt error during password comparison:", bcryptError)
      return NextResponse.json({ error: "Authentication error" }, { status: 500 })
    }

    console.log("Creating JWT token...")
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

    const token = await new SignJWT({
      id: customer.id,
      email: customer.email,
      name: `${customer.firstname} ${customer.lastname}`,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    console.log("JWT token created successfully")

    const customerData = {...customer}
    delete customerData.password

    return new NextResponse(
      JSON.stringify({
        token,
        user: customerData,
      }),
      {
        status: 200,
        headers: headers,
      },
    )
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

