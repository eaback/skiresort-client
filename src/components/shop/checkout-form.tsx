"use client"

import { useState, useEffect } from "react"
import { Button, Input } from "@heroui/react"
import { useCartContext } from "@/contexts/cart-context"
// import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface CheckoutFormData {
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string
    street_address: string
    postal_code: string
    city: string
    country: string
}

export default function CheckoutForm() {
    // const router = useRouter()
    const { cart, totalPrice } = useCartContext()
    const { user, isAuthenticated } = useAuth()

    const [formData, setFormData] = useState<CheckoutFormData>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "Sweden",
    })

    useEffect(() => {
        if (user) {
        setFormData((prev) => ({
            ...prev,
            firstname: (user.firstname as string) || "",
            lastname: (user.lastname as string) || "",
            email: (user.email as string) || "",
            phone: (user.phone as string) || "",
            street_address: (user.street_address as string) || "",
            postal_code: (user.postal_code as string) || "",
            city: (user.city as string) || "",
            country: (user.country as string) || "Sweden",
        }))
        }
    }, [user])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        localStorage.setItem(
        "checkout_form",
        JSON.stringify({
            ...JSON.parse(localStorage.getItem("checkout_form") || "{}"),
            [name]: value,
        }),
        )
    }

    useEffect(() => {
        const savedForm = localStorage.getItem("checkout_form")
        if (savedForm) {
        try {
            const parsedForm = JSON.parse(savedForm) as Partial<CheckoutFormData>
            setFormData((prev) => ({
            ...prev,
            ...parsedForm,
            }))
        } catch (e) {
            console.error("Failed to parse form data from localStorage", e)
        }
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (cart.length === 0) {
        setError("Your cart is empty")
        return
        }

        setLoading(true)
        setError(null)

        try {
        let customerId: number | undefined = user?.id

        if (!isAuthenticated) {
            const checkResponse = await fetch(`/api/customers/email/${encodeURIComponent(formData.email)}`)

            if (checkResponse.ok) {
            const existingCustomer = await checkResponse.json()
            customerId = existingCustomer.id
            } else {
            if (!formData.firstname || !formData.lastname || !formData.email) {
                setError("Please fill in all required fields")
                setLoading(false)
                return
            }

            console.log("Creating new customer for checkout")
            const customerResponse = await fetch("/api/customers", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!customerResponse.ok) {
                const errorData = await customerResponse.json()
                throw new Error(errorData.error || "Failed to create customer")
            }

            const customer = await customerResponse.json()
            customerId = customer.id
            }
        } else {
            customerId = user?.id
        }

        console.log("Creating order with customer ID:", customerId)

        const orderItems = cart.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price,
        }))

        const orderResponse = await fetch("/api/orders", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            customer_id: customerId,
            items: orderItems,
            payment_status: "pending",
            order_status: "pending",
            }),
        })

        if (!orderResponse.ok) {
            const errorData = await orderResponse.json()
            throw new Error(errorData.error || "Failed to create order")
        }

        const orderData = await orderResponse.json()
        const orderId = orderData.id

        const lineItems = cart.map((item) => ({
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
        }))

        const stripeResponse = await fetch("/api/stripe", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            orderId,
            lineItems,
            }),
        })

        if (!stripeResponse.ok) {
            const errorData = await stripeResponse.json()
            throw new Error(errorData.error || "Failed to create Stripe checkout session")
        }

        const stripeData = await stripeResponse.json()

        window.location.href = stripeData.checkout_url
        } catch (err) {
        console.error("Checkout error:", err)
        setError(err instanceof Error ? err.message : "An error occurred during checkout. Please try again.")
        setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Din kundvagn är tom</h2>
            <p>Du behöver lägga till produkter innan du kan gå till kassan.</p>
        </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h2 className="text-2xl font-bold mb-6">Dina uppgifter</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="firstname" className="block mb-2">
                    Förnamn <span className="text-red-500">*</span>
                </label>
                <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </div>
                <div>
                <label htmlFor="lastname" className="block mb-2">
                    Efternamn <span className="text-red-500">*</span>
                </label>
                <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block mb-2">
                E-post <span className="text-red-500">*</span>
                </label>
                <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isAuthenticated}
                />
            </div>

            <div>
                <label htmlFor="phone" className="block mb-2">
                Telefon <span className="text-red-500">*</span>
                </label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="street_address" className="block mb-2">
                Gatuadress <span className="text-red-500">*</span>
                </label>
                <Input
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="postal_code" className="block mb-2">
                    Postnummer <span className="text-red-500">*</span>
                </label>
                <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="city" className="block mb-2">
                    Stad <span className="text-red-500">*</span>
                </label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
            </div>

            <div>
                <label htmlFor="country" className="block mb-2">
                Land <span className="text-red-500">*</span>
                </label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

            <Button type="submit" color="warning" size="lg" className="w-full mt-6" isLoading={loading}>
                Gå till betalning
            </Button>
            </form>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-6">Din beställning</h2>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                    <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                        {item.quantity} x {item.product.price} kr
                    </p>
                    </div>
                    <p className="font-medium">{item.quantity * item.product.price} kr</p>
                </div>
                ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold">
                <p>Totalt</p>
                <p>{totalPrice} kr</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

