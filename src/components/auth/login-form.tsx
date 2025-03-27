"use client"

import { useState } from "react"
import { Button, Input, Card, CardBody } from "@heroui/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Cookies from "js-cookie"

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      console.log("Attempting login with email:", formData.email)

      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("Login response status:", response.status)
      const data = await response.json()

      if (!response.ok) {
        console.error("Login failed:", data)

        if (response.status === 401) {
          throw new Error("Invalid email or password. Please check your credentials and try again.")
        } else {
          throw new Error(data.error || "Login failed")
        }
      }

      console.log("Login successful, received token")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      Cookies.set("token", data.token, { expires: 1 })

      router.push("/")
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardBody>
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block mb-2">
                E-post
            </label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block mb-2">
                Lösenord
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
              <Button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-teal-800 hover:underline">
              Glömt lösenord?
            </a>
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>}

          <Button 
            type="submit" 
            color="primary" 
            className="w-full" 
            isLoading={loading}>
              Logga in
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

