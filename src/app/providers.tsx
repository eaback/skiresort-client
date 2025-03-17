// app/providers.tsx
'use client'

import { CartProvider } from '@/contexts/cart-context'
import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </HeroUIProvider>
    )
}