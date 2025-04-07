'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from "@heroui/react";
import { Customer } from '@/lib/db-types';
import { useRouter } from 'next/navigation';

export default function CustomerForm({ customerId }: { customerId?: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Customer, 'id' | 'created_at'>>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        street_address: '',
        postal_code: '',
        city: '',
        country: 'Sweden',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (customerId) {
        setIsEdit(true);
        fetchCustomer(customerId);
        }
    }, [customerId]);

    const fetchCustomer = async (id: string) => {
        try {
        const response = await fetch(`/api/customers?id=${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        
        const data = await response.json();
        
        
        const { password, ...customerData } = data;
        setFormData(customerData);
        
        } catch (err) {
        setError('Failed to load customer data. Please try again later.');
        console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        
        try {
        const url = isEdit 
            ? `/api/customers?id=${customerId}` 
            : '/api/customers';
        
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to ${isEdit ? 'update' : 'create'} customer`);
        }
        
        router.push('/admin/customers');
        
        } catch (err) {
        console.error(err);
        setError(`An error occurred. Please try again.`);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
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
            
            {!isEdit && (
            <div>
                <label htmlFor="password" className="block mb-2">Lösenord</label>
                <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!isEdit}
                />
            </div>
            )}
            
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
            
            <div className="flex justify-end gap-4 pt-4">
            <Button 
                type="button" 
                variant="light"
                onPress={() => router.push('/admin/customers')}
            >
                Avbryt
            </Button>
            <Button 
                type="submit" 
                color="primary" 
                isLoading={loading}
            >
                {isEdit ? 'Uppdatera' : 'Skapa'} Kund
            </Button>
            </div>
        </form>
        </div>
    );
}
