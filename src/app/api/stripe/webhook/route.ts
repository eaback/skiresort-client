import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import Stripe from "stripe"
import { headers } from "next/headers"
import type { Order, OrderItem } from "@/lib/db-types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia", 
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get("stripe-signature") || ""

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret || "")
        console.log("Webhook received:", event.type)
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        const orderId = session.metadata?.order_id
        console.log("Processing completed checkout for order:", orderId)

        if (orderId) {
        try {
            await executeQuery(
            "UPDATE orders SET payment_status = ?, order_status = ? WHERE payment_id = ?", 
            ["Paid", "Received", session.id]
            )
            
            console.log(`Order ${orderId} updated to Paid/Received status`)

            const orderItems = await executeQuery<OrderItem[]>(
            "SELECT * FROM order_items WHERE order_id = ?", 
            [orderId]
            )
            
            for (const item of orderItems) {
            await executeQuery(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [item.quantity, item.product_id]
            )
            console.log(`Updated stock for product ${item.product_id}, reduced by ${item.quantity}`)
            }
            
            console.log(`Stock updated for all items in order ${orderId}`)
        } catch (error) {
            console.error("Error processing webhook:", error)
        }
        }
    }

    return NextResponse.json({ received: true })
}