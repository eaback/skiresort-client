"use client"

import { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, Divider, Button } from "@heroui/react"
import type { Order } from "@/lib/db"
import { useAuth } from "@/contexts/auth-context"
import { formatDate } from "@/lib/utils"

export default function UserOrderList() {
    const { user, isAuthenticated } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!isAuthenticated || !user) {
        setLoading(false)
        return
        }

        async function fetchOrders() {
        try {
            const response = await fetch(`/api/orders?customerId=${user?.id}`)

            if (!response.ok) {
            throw new Error("Failed to fetch orders")
            }

            const data = await response.json()
            setOrders(data)
        } catch (err) {
            setError("Failed to load orders. Please try again later.")
            console.error(err)
        } finally {
            setLoading(false)
        }
        }

        fetchOrders()
    }, [user, isAuthenticated])

    if (!isAuthenticated) {
        return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Du måste vara inloggad för att se dina beställningar</h2>
            <Button color="primary" href="/auth/login" as="a">
            Logga in
            </Button>
        </div>
        )
    }

    if (loading) {
        return <div className="text-center py-12">Laddar beställningar...</div>
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>
    }

    if (orders.length === 0) {
        return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Du har inga beställningar</h2>
            <Button color="warning" href="/butik" as="a">
            Börja handla
            </Button>
        </div>
        )
    }

    return (
        <div className="space-y-6">
        {orders.map((order) => (
            <Card key={order.id} className="w-full">
            <CardHeader className="flex justify-between items-center">
                <div>
                <h3 className="text-lg font-bold">Beställning #{order.id}</h3>
                <p className="text-sm text-gray-500">{formatDate(order.created_at || "")}</p>
                </div>
                <div className="flex items-center gap-2">
                <span
                    className={`px-3 py-1 rounded-full text-xs ${
                    order.order_status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.order_status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {getOrderStatusText(order.order_status)}
                </span>
                <span
                    className={`px-3 py-1 rounded-full text-xs ${
                    order.payment_status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.payment_status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {getPaymentStatusText(order.payment_status)}
                </span>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Produkter</h4>
                    <div className="space-y-2">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                        <div>
                            <span className="font-medium">{item.product_name}</span>
                            <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span>{item.unit_price * item.quantity} kr</span>
                        </div>
                    ))}
                    </div>
                </div>
                <Divider />
                <div className="flex justify-between font-bold">
                    <span>Totalt</span>
                    <span>{order.total_price} kr</span>
                </div>
                </div>
            </CardBody>
            </Card>
        ))}
        </div>
    )
}

function getOrderStatusText(status: string): string {
    switch (status) {
        case "pending":
        return "Väntande"
        case "processing":
        return "Behandlas"
        case "shipped":
        return "Skickad"
        case "delivered":
        return "Levererad"
        case "cancelled":
        return "Avbruten"
        default:
        return status
    }
}

function getPaymentStatusText(status: string): string {
    switch (status) {
        case "pending":
        return "Väntande"
        case "completed":
        return "Betald"
        case "failed":
        return "Misslyckad"
        case "refunded":
        return "Återbetald"
        default:
        return status
    }
}

