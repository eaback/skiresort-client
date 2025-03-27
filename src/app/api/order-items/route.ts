import { NextResponse } from "next/server"
import { executeQuery } from "../../../lib/db-connect"
import type { OrderItem } from "@/lib/db"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const orderId = searchParams.get("orderId")

        if (id) {
        const items = await executeQuery<OrderItem[]>("SELECT * FROM order_items WHERE id = ?", [id])

        if (items.length === 0) {
            return NextResponse.json({ error: "Order item not found" }, { status: 404 })
        }

        return NextResponse.json(items[0])
        }

        if (orderId) {
        const items = await executeQuery<OrderItem[]>("SELECT * FROM order_items WHERE order_id = ?", [orderId])

        return NextResponse.json(items)
        }

        return NextResponse.json({ error: "Order ID or item ID is required" }, { status: 400 })
    } catch (error) {
        console.error("Error fetching order items:", error)
        return NextResponse.json({ error: "Failed to fetch order items" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Order item ID is required" }, { status: 400 })
        }

        const body = await request.json()

        if (!body.quantity || body.quantity < 1) {
            return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 })
        }

        const item = await executeQuery<OrderItem[]>("SELECT * FROM order_items WHERE id = ?", [id])

        if (item.length === 0) {
            return NextResponse.json({ error: "Order item not found" }, { status: 404 })
        }

    const quantityDiff = body.quantity - item[0].quantity

    const connection = await getConnection()
    await connection.beginTransaction()

    try {
        await connection.execute("UPDATE order_items SET quantity = ? WHERE id = ?", [body.quantity, id])

        await connection.execute("UPDATE products SET stock = stock - ? WHERE id = ?", [quantityDiff, item[0].product_id])

        await connection.execute(
            `UPDATE orders 
            SET total_price = (
            SELECT SUM(quantity * unit_price) 
            FROM order_items 
            WHERE order_id = ?
            )
            WHERE id = ?`,
            [item[0].order_id, item[0].order_id],
        )

        await connection.commit()

        const updatedItem = await executeQuery<OrderItem[]>("SELECT * FROM order_items WHERE id = ?", [id])

        return NextResponse.json(updatedItem[0])
        } catch (error) {
        await connection.rollback()
        throw error
        }
    } catch (error) {
        console.error("Error updating order item:", error)
        return NextResponse.json({ error: "Failed to update order item" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
        return NextResponse.json({ error: "Order item ID is required" }, { status: 400 })
        }

        const item = await executeQuery<OrderItem[]>("SELECT * FROM order_items WHERE id = ?", [id])

        if (item.length === 0) {
        return NextResponse.json({ error: "Order item not found" }, { status: 404 })
        }

        const connection = await getConnection()
        await connection.beginTransaction()

        try {
        await connection.execute("UPDATE products SET stock = stock + ? WHERE id = ?", [
            item[0].quantity,
            item[0].product_id,
        ])

        await connection.execute("DELETE FROM order_items WHERE id = ?", [id])

        await connection.execute(
            `UPDATE orders 
            SET total_price = (
            SELECT SUM(quantity * unit_price) 
            FROM order_items 
            WHERE order_id = ?
            )
            WHERE id = ?`,
            [item[0].order_id, item[0].order_id],
        )

        await connection.commit()

        return NextResponse.json({ success: true })
        } catch (error) {
        await connection.rollback()
        throw error
        }
    } catch (error) {
        console.error("Error deleting order item:", error)
        return NextResponse.json({ error: "Failed to delete order item" }, { status: 500 })
    }
}

async function getConnection() {
    const pool = await import("../../../lib/db-connect").then((module) => module.getConnection())
    return pool
}

