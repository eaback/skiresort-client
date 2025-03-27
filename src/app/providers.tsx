// app/providers.tsx
'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { CartProvider } from '@/contexts/cart-context'
import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
                </AuthProvider>
        </HeroUIProvider>
    )
}