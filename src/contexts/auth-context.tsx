"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    [key: string]: unknown
}

interface AuthContextType {
    user: User | null
    token: string | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
        setToken(storedToken)
        try {
            setUser(JSON.parse(storedUser))
        } catch (error) {
            console.error("Failed to parse user from localStorage", error)
        }
        }

        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)

        try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || "Login failed")
        }

        const data = await response.json()

        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        Cookies.set("token", data.token, { expires: 1 })

        setToken(data.token)
        setUser(data.user)

        console.log("Login successful, user:", data.user.firstname)
        } catch (error) {
        console.error("Login error:", error)
        throw error
        } finally {
        setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        localStorage.removeItem("cart")

        Cookies.remove("token")

        setToken(null)
        setUser(null)

        router.push("/")
}

    const isAdmin = !!user && user.email === "edgar.backer@medieinstitutet.se"

    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            isLoading,
            login,
            logout,
            isAuthenticated: !!user && !!token,
            isAdmin,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

