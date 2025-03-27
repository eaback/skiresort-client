"use client"

import { useState, useEffect } from "react"
import type { Product, CartItem } from "./db"
import { useAuth } from "@/contexts/auth-context"

// Cart context and provider
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { user } = useAuth()

  // Get a unique key for the cart based on user ID
  const getCartKey = () => {
    return user ? `cart_${user.id}` : "cart_guest"
  }

  // Load cart from localStorage on component mount or when user changes
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
      // Clear cart if no saved cart for this user
      setCart([])
    }

    setIsLoaded(true)
  }, [user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      const cartKey = getCartKey()
      localStorage.setItem(cartKey, JSON.stringify(cart))
    }
  }, [cart, isLoaded, user])

  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)

      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        // Add new item
        return [...prevCart, { product, quantity }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  // Calculate total items
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

