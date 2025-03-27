import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db-connect"
import type { Order, Customer } from "@/lib/db"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia", 
})

export async function POST(request: Request) {
try {
    const body = await request.json()
    const { orderId, lineItems } = body

    if (!orderId || !lineItems || lineItems.length === 0) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const orders = await executeQuery<Order[]>("SELECT * FROM orders WHERE id = ?", [orderId])

    if (orders.length === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const order = orders[0]

    const customers = await executeQuery<Customer[]>("SELECT * FROM customers WHERE id = ?", [order.customer_id])

    if (customers.length === 0) {
        return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const customer = customers[0]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems.map((item: any) => ({
            price_data: {
            currency: "sek",
            product_data: {
                name: item.name,
                description: item.description || "",
                images: item.image ? [item.image] : [],
            },
            unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/butik/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/butik/cart`,
        customer_email: customer.email,
        metadata: {
            order_id: orderId,
        },
        })

        await executeQuery("UPDATE orders SET payment_id = ? WHERE id = ?", [session.id, orderId])

        return NextResponse.json({
        checkout_url: session.url,
        session_id: session.id,
        })
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error)
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }
}

