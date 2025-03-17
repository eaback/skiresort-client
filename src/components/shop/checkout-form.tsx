'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from "@heroui/react";
import { useCartContext } from '@/contexts/cart-context';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
    const router = useRouter();
    const { cart, totalPrice, clearCart } = useCartContext();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        street_address: '',
        postal_code: '',
        city: '',
        country: 'Sweden',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (cart.length === 0) {
        setError('Your cart is empty');
        return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
        const customerResponse = await fetch('/api/customers', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (!customerResponse.ok) {
            throw new Error('Failed to create customer');
        }
        
        const customer = await customerResponse.json();
        
        const orderItems = cart.map(item => ({
            product_id: item.product.id,
            product_name: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price,
        }));
        
        const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            customer_id: customer.id,
            items: orderItems,
            }),
        });
        
        if (!orderResponse.ok) {
            throw new Error('Failed to create order');
        }
        
        clearCart();
        router.push('/butik/confirmation');
        
        } catch (err) {
        console.error(err);
        setError('An error occurred during checkout. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Din kundvagn är tom</h2>
            <p>Du behöver lägga till produkter innan du kan gå till kassan.</p>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h2 className="text-2xl font-bold mb-6">Dina uppgifter</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="firstname" className="block mb-2">Förnamn</label>
                <Input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="lastname" className="block mb-2">Efternamn</label>
                <Input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>
            
            <div>
                <label htmlFor="email" className="block mb-2">E-post</label>
                <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            
            <div>
                <label htmlFor="phone" className="block mb-2">Telefon</label>
                <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                />
            </div>
            
            <div>
                <label htmlFor="street_address" className="block mb-2">Gatuadress</label>
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
                <label htmlFor="postal_code" className="block mb-2">Postnummer</label>
                <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="city" className="block mb-2">Stad</label>
                <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>
            
            <div>
                <label htmlFor="country" className="block mb-2">Land</label>
                <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                />
            </div>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                {error}
                </div>
            )}
            
            <Button 
                type="submit" 
                color="warning" 
                size="lg" 
                className="w-full mt-6"
                isLoading={loading}
            >
                Slutför köp
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
                    <p className="text-sm text-gray-500">{item.quantity} x {item.product.price} kr</p>
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
    );
}
