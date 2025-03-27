import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db-connect"
import type { Customer } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { email: string } }) {
  try {
    const email = decodeURIComponent(params.email)

    const customers = await executeQuery<Customer[]>("SELECT * FROM customers WHERE email = ?", [email])

    if (customers.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const customerData = { ...customers[0] }
    delete customerData.password
    return NextResponse.json(customerData)
  } catch (error) {
    console.error("Error fetching customer by email:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}

