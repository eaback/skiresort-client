'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import Link from 'next/link';
import { Product } from '@/lib/db-types';

export default function ProductList({ category }: { category?: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
        try {
            const url = category 
            ? `/api/products?category=${encodeURIComponent(category)}` 
            : '/api/products';
            
            const response = await fetch(url);
            
            if (!response.ok) {
            throw new Error('Failed to fetch products');
            }
            
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div className="text-center py-12">Laddar produkter...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    if (products.length === 0) {
        return (
        <div className="text-center py-12">
            <p className="text-lg mb-4">Inga produkter hittades</p>
            {category && (
            <p>Försök med en annan kategori</p>
            )}
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
            <Card key={product.id} className="p-4">
            <CardBody className="overflow-visible p-0">
                <Image
                alt={product.name}
                className="w-full object-cover h-[200px]"
                src={product.image || "/placeholder.svg"}
                />
            </CardBody>
            <CardFooter className="flex flex-col items-start">
                <h4 className="font-bold text-large">{product.name}</h4>
                <p className="text-tiny text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex justify-between w-full items-center mt-4">
                <p className="font-bold text-xl">{product.price} kr</p>
                <Link href={`/butik/${product.id}`}>
                    <Button color="warning">Visa detaljer</Button>
                </Link>
                </div>
            </CardFooter>
            </Card>
        ))}
        </div>
    );
}
