'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from "@heroui/react";
import { Product } from '@/lib/db';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            
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
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) {
        return;
        }
        
        try {
        const response = await fetch(`/api/products?id=${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        
        // Remove product from state
        setProducts(products.filter(product => product.id !== id));
        
        } catch (err) {
        console.error(err);
        alert('Failed to delete product');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Laddar produkter...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    return (
        <div>
        {products.length === 0 ? (
            <div className="text-center py-12">
            <p className="text-lg mb-4">Inga produkter hittades</p>
            <Link href="/admin/products/create">
                <Button color="success">Skapa Ny Produkt</Button>
            </Link>
            </div>
        ) : (
            <Table aria-label="Product list">
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>BILD</TableColumn>
                <TableColumn>NAMN</TableColumn>
                <TableColumn>KATEGORI</TableColumn>
                <TableColumn>PRIS</TableColumn>
                <TableColumn>LAGER</TableColumn>
                <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                    <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                    />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price} kr</TableCell>
                    <TableCell>
                    <Chip 
                        color={product.stock > 0 ? "success" : "danger"}
                        size="sm"
                    >
                        {product.stock > 0 ? `${product.stock} st` : 'Slut i lager'}
                    </Chip>
                    </TableCell>
                    <TableCell>
                    <div className="flex gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                        <Button color="primary" size="sm" isIconOnly>
                            <Edit size={16} />
                        </Button>
                        </Link>
                        <Button 
                        color="danger" 
                        size="sm" 
                        isIconOnly
                        onPress={() => handleDelete(product.id)}
                        >
                        <Trash size={16} />
                        </Button>
                    </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
        </div>
    );
}
