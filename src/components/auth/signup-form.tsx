"use client"

import type React from "react"

import { useState } from "react"
import { Button, Input, Card, CardBody } from "@heroui/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

interface FormData {
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  street_address: string
  postal_code: string
  city: string
  country: string
  [key: string]: string
}

export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "Sweden",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      const requiredFields = [
        "firstname",
        "lastname",
        "email",
        "password",
        "phone",
        "street_address",
        "postal_code",
        "city",
      ]

      const missingFields = requiredFields.filter((field) => !formData[field])

      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(", ")}`)
        setLoading(false)
        return
      }

      const customerData = { ...formData } as Partial<FormData>
      delete customerData.confirmPassword

      console.log("Submitting customer data:", {
        ...customerData,
        password: "[REDACTED]",
      })

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      console.log("API response status:", response.status)
      const data = await response.json()

      if (!response.ok) {
        console.error("Registration error:", data)
        throw new Error(data.error || "Registration failed")
      }

      console.log("Registration successful:", data)

      alert("Account created successfully! You can now log in.")

      router.push("/auth/login?registered=true")
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>

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
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              Lösenord <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2">
              Bekräfta lösenord <span className="text-red-500">*</span>
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">Contact Information</h3>

          <div>
            <label htmlFor="phone" className="block mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">Shipping Address</h3>

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

          <Button type="submit" color="primary" className="w-full mt-4" isLoading={loading}>
            Skapa konto
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

