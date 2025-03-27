'use client';

import { useEffect, useState } from 'react';
import { Button, Input } from "@heroui/react";
import { Product } from '@/lib/db';
import { useCartContext } from '@/contexts/cart-context';

export default function ProductDetail({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartContext();

    useEffect(() => {
        async function fetchProduct() {
        try {
            const response = await fetch(`/api/products?id=${id}`);
            
            if (!response.ok) {
            throw new Error('Failed to fetch product');
            }
            
            const data = await response.json();
            setProduct(data);
        } catch (err) {
            setError('Failed to load product. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
        addToCart(product, quantity);
        }
    };

    if (loading) {
        return <div className="text-center py-12">Laddar produkt...</div>;
    }

    if (error || !product) {
        return <div className="text-center py-12 text-red-500">{error || 'Product not found'}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="w-full h-[400px] object-cover"
            />
        </div>
        
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <p className="text-2xl font-bold text-teal-800">{product.price} kr</p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm">Lagerstatus: 
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? ' I lager' : ' Slut i lager'}
                </span>
            </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            
            <div className="flex items-center gap-4">
            <div className="w-24">
                <Input
                type="number"
                min="1"
                max={product.stock}
                value={quantity.toString()}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                disabled={product.stock <= 0}
                />
            </div>
            
            <Button 
                color="warning" 
                size="lg"
                onPress={handleAddToCart}
                disabled={product.stock <= 0}
            >
                Lägg i kundvagn
            </Button>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">Kategori: {product.category}</p>
            </div>
        </div>
        </div>
    );
}
