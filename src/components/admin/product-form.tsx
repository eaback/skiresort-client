'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Textarea } from "@heroui/react";
import { Product } from '@/lib/db-types';
import { useRouter } from 'next/navigation';

export default function ProductForm({ productId }: { productId?: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Product, 'id' | 'created_at'>>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (productId) {
        setIsEdit(true);
        fetchProduct(productId);
        }
    }, [productId]);

    const fetchProduct = async (id: string) => {
        try {
        const response = await fetch(`/api/products?id=${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setFormData(data);
        
        } catch (err) {
        setError('Failed to load product data. Please try again later.');
        console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'price' || name === 'stock') {
        setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
        setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        
        try {
        const url = isEdit 
            ? `/api/products?id=${productId}` 
            : '/api/products';
        
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error(`Failed to ${isEdit ? 'update' : 'create'} product`);
        }
        
        router.push('/admin/products');
        
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
            <div>
            <label htmlFor="name" className="block mb-2">Produktnamn</label>
            <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="description" className="block mb-2">Beskrivning</label>
            <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
            />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="price" className="block mb-2">Pris (kr)</label>
                <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price.toString()}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="stock" className="block mb-2">Lagersaldo</label>
                <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock.toString()}
                onChange={handleChange}
                required
                />
            </div>
            </div>
            
            <div>
            <label htmlFor="category" className="block mb-2">Kategori</label>
            <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="image" className="block mb-2">Bild URL</label>
            <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
            />
            </div>
            
            {formData.image && (
            <div className="mt-4">
                <p className="mb-2">Förhandsvisning:</p>
                <img 
                src={formData.image || "/placeholder.svg"} 
                alt="Product preview" 
                className="w-40 h-40 object-cover rounded border"
                />
            </div>
            )}
            
            {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
                {error}
            </div>
            )}
            
            <div className="flex justify-end gap-4 pt-4">
            <Button 
                type="button" 
                variant="light"
                onPress={() => router.push('/admin/products')}
            >
                Avbryt
            </Button>
            <Button 
                type="submit" 
                color="primary" 
                isLoading={loading}
            >
                {isEdit ? 'Uppdatera' : 'Skapa'} Produkt
            </Button>
            </div>
        </form>
        </div>
    );
}
