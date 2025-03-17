'use client';

import { Button, Input } from "@heroui/react";
import { useCartContext } from '@/contexts/cart-context';
import Link from 'next/link';

export default function CartContents() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCartContext();

    if (cart.length === 0) {
        return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Din kundvagn är tom</h2>
            <p className="mb-8">Lägg till några produkter för att fortsätta.</p>
            <Link href="/butik">
            <Button color="warning" size="lg">Fortsätt handla</Button>
            </Link>
        </div>
        );
    }

    return (
        <div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                <th className="py-4 px-6 text-left">Produkt</th>
                <th className="py-4 px-6 text-center">Antal</th>
                <th className="py-4 px-6 text-right">Pris</th>
                <th className="py-4 px-6 text-right">Totalt</th>
                <th className="py-4 px-6"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map((item) => (
                <tr key={item.product.id}>
                    <td className="py-4 px-6">
                    <div className="flex items-center">
                        <img 
                        src={item.product.image || "/placeholder.svg"} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                        </div>
                    </div>
                    </td>
                    <td className="py-4 px-6">
                    <div className="flex justify-center">
                        <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        />
                    </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                    {item.product.price} kr
                    </td>
                    <td className="py-4 px-6 text-right font-medium">
                    {item.product.price * item.quantity} kr
                    </td>
                    <td className="py-4 px-6 text-right">
                    <Button 
                        color="danger" 
                        variant="light" 
                        size="sm"
                        onPress={() => removeFromCart(item.product.id)}
                    >
                        Ta bort
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Button 
            color="danger" 
            variant="light"
            onPress={clearCart}
            >
            Töm kundvagn
            </Button>
            
            <div className="text-right">
            <p className="text-lg mb-2">Totalt: <span className="font-bold">{totalPrice} kr</span></p>
            <Link href="/butik/checkout">
                <Button color="warning" size="lg">Gå till kassan</Button>
            </Link>
            </div>
        </div>
        </div>
    );
}
