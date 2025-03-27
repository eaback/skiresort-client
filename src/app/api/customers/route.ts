import { NextResponse } from "next/server"
import { executeQuery, executeInsert } from "@/lib/db-connect"
import type { Customer } from "@/lib/db"
import { hash } from "bcrypt"

async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    let query = "SELECT * FROM customers"
    let params: (string | number)[] = []

    if (id) {
      query = "SELECT * FROM customers WHERE id = ?"
      params = [id]

      const customers = await executeQuery<Customer[]>(query, params)

      if (customers.length === 0) {
        return NextResponse.json({ error: "Customer not found" }, { status: 404 })
      }

      const customerData = { ...customers[0] }
      delete customerData.password
      return NextResponse.json(customerData)
    }

    const customers = await executeQuery<Customer[]>(query, params)

    const safeCustomers = customers.map((customer) => {
      const customerData = { ...customer }
      delete customerData.password
      return customerData
    })
    return NextResponse.json(safeCustomers)
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log("API received customer creation request")
    const body = await request.json()

    console.log("Parsed request body:", {
      ...body,
      password: body.password ? "[PASSWORD PRESENT]" : "[PASSWORD MISSING]",
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
    })

    if (!body.firstname || !body.lastname || !body.email || !body.password) {
      console.error("Missing required fields:", {
        firstname: !!body.firstname,
        lastname: !!body.lastname,
        email: !!body.email,
        password: !!body.password,
      })

      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Checking if email exists:", body.email)
    const existingCustomers = await executeQuery<Customer[]>("SELECT * FROM customers WHERE email = ?", [body.email])

    if (existingCustomers.length > 0) {
      console.error("Email already in use:", body.email)
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    console.log("Hashing password...")
    const hashedPassword = await hashPassword(body.password)
    console.log("Password hashing completed, hash length:", hashedPassword.length)
    console.log("Password hashed successfully, length:", hashedPassword.length)

    const query = `
      INSERT INTO customers (
        firstname, lastname, email, password, phone, 
        street_address, postal_code, city, country
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params: (string | number)[] = [
      body.firstname,
      body.lastname,
      body.email,
      hashedPassword,
      body.phone || "",
      body.street_address || "",
      body.postal_code || "",
      body.city || "",
      body.country || "Sweden",
    ]

    console.log("Executing query with params:", {
      firstname: params[0],
      lastname: params[1],
      email: params[2],
      password: "[HASHED]",
      phone: params[4],
      street_address: params[5],
      postal_code: params[6],
      city: params[7],
      country: params[8],
    })

    try {
      const result = await executeInsert(query, params)
      console.log("Insert result:", result)

      if (!result || !result.insertId) {
        throw new Error("Failed to insert customer - no insertId returned")
      }

      console.log("Fetching newly created customer with ID:", result.insertId)
      const newCustomer = await executeQuery<Customer[]>("SELECT * FROM customers WHERE id = ?", [result.insertId])

      if (!newCustomer || newCustomer.length === 0) {
        throw new Error("Customer was inserted but could not be retrieved")
      }

      console.log("Customer created successfully with ID:", result.insertId)

      const customerData = { ...newCustomer[0] }
      delete customerData.password
      return NextResponse.json(customerData, { status: 201 })
    } catch (dbError) {
      console.error("Database error during customer creation:", dbError)
      throw dbError
    }
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json(
      { error: "Failed to create customer: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 })
    }

    const body = await request.json()

    if (!body.firstname || !body.lastname || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const customer = await executeQuery<Customer[]>("SELECT * FROM customers WHERE id = ?", [id])

    if (customer.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    if (body.email !== customer[0].email) {
      const existingCustomers = await executeQuery<Customer[]>("SELECT * FROM customers WHERE email = ? AND id != ?", [
        body.email,
        id,
      ])

      if (existingCustomers.length > 0) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
      }
    }

    let passwordUpdate = ""
    const params: (string | number)[] = [
      body.firstname,
      body.lastname,
      body.email,
      body.phone || "",
      body.street_address || "",
      body.postal_code || "",
      body.city || "",
      body.country || "Sweden",
      id,
    ]

    if (body.password) {
      passwordUpdate = ", password = ?"
      const hashedPassword = await hashPassword(body.password)
      params.splice(3, 0, hashedPassword)
    }

    const query = `
      UPDATE customers
      SET firstname = ?, lastname = ?, email = ?${passwordUpdate}, 
          phone = ?, street_address = ?, postal_code = ?, city = ?, country = ?
      WHERE id = ?
    `

    await executeQuery<unknown>(query, params)

    const updatedCustomer = await executeQuery<Customer[]>("SELECT * FROM customers WHERE id = ?", [id])

    const customerData = { ...updatedCustomer[0] }
    delete customerData.password
    return NextResponse.json(customerData)
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 })
    }

    const customer = await executeQuery<Customer[]>("SELECT * FROM customers WHERE id = ?", [id])

    if (customer.length === 0) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const orders = await executeQuery<unknown[]>("SELECT * FROM orders WHERE customer_id = ?", [id])

    if (orders.length > 0) {
      return NextResponse.json({ error: "Cannot delete customer with existing orders" }, { status: 400 })
    }

    await executeQuery<unknown>("DELETE FROM customers WHERE id = ?", [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}

