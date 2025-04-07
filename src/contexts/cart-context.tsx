'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/lib/cart';
import { Product, CartItem } from '@/lib/db-types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
    isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const cartUtils = useCart();
    
    return (
        <CartContext.Provider value={cartUtils}>
        {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}
