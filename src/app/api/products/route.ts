import { NextResponse } from "next/server"
import { executeQuery, executeInsert } from "@/lib/db-connect"
import type { Product } from "@/lib/db"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const category = searchParams.get("category")

        let query = "SELECT * FROM products"
        let params: (string | number)[] = []

        if (id) {
        query = "SELECT * FROM products WHERE id = ?"
        params = [id]

        const products = await executeQuery<Product[]>(query, params)

        if (products.length === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(products[0])
        }

        if (category) {
        query = "SELECT * FROM products WHERE category = ?"
        params = [category]
        }

        const products = await executeQuery<Product[]>(query, params)
        return NextResponse.json(products)
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
    }

    export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (!body.name || !body.price || !body.category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const query = `
        INSERT INTO products (name, description, price, stock, category, image)
        VALUES (?, ?, ?, ?, ?, ?)
        `

        const params: (string | number)[] = [
        body.name,
        body.description || "",
        body.price,
        body.stock || 0,
        body.category,
        body.image || "",
        ]

        const result = await executeInsert(query, params)

        const newProduct = await executeQuery<Product[]>("SELECT * FROM products WHERE id = ?", [result.insertId])

        return NextResponse.json(newProduct[0], { status: 201 })
    } catch (error) {
        console.error("Error creating product:", error)
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }
    }

    export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
        }

        const body = await request.json()

        if (!body.name || !body.price || !body.category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const query = `
        UPDATE products
        SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ?
        WHERE id = ?
        `

        const params: (string | number)[] = [
        body.name,
        body.description || "",
        body.price,
        body.stock || 0,
        body.category,
        body.image || "",
        id,
        ]

        await executeQuery<unknown>(query, params)

        const updatedProduct = await executeQuery<Product[]>("SELECT * FROM products WHERE id = ?", [id])

        if (updatedProduct.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json(updatedProduct[0])
    } catch (error) {
        console.error("Error updating product:", error)
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
        return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
        }

        const product = await executeQuery<Product[]>("SELECT * FROM products WHERE id = ?", [id])

        if (product.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        await executeQuery<unknown>("DELETE FROM products WHERE id = ?", [id])

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting product:", error)
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }
}

