"use client"

import { useState, useEffect } from "react"
import type { Product, CartItem } from "./db"
import { useAuth } from "@/contexts/auth-context"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { user } = useAuth()

  const getCartKey = () => {
    return user ? `cart_${user.id}` : "cart_guest"
  }

  useEffect(() => {
    const cartKey = getCartKey()
    const savedCart = localStorage.getItem(cartKey)

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    } else {
      setCart([])
    }

    setIsLoaded(true)
  }, [user])

  useEffect(() => {
    if (isLoaded) {
      const cartKey = getCartKey()
      localStorage.setItem(cartKey, JSON.stringify(cart))
    }
  }, [cart, isLoaded, user])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [...prevCart, { product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    isLoaded,
  }
}

