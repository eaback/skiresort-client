'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from "@heroui/react";
import { Customer } from '@/lib/db';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCustomers() {
        try {
            const response = await fetch('/api/customers');
            
            if (!response.ok) {
            throw new Error('Failed to fetch customers');
            }
            
            const data = await response.json();
            setCustomers(data);
        } catch (err) {
            setError('Failed to load customers. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        fetchCustomers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this customer?')) {
        return;
        }
        
        try {
        const response = await fetch(`/api/customers?id=${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
        
        setCustomers(customers.filter(customer => customer.id !== id));
        
        } catch (err) {
        console.error(err);
        alert('Failed to delete customer');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Laddar kunder...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    return (
        <div>
        {customers.length === 0 ? (
            <div className="text-center py-12">
            <p className="text-lg mb-4">Inga kunder hittades</p>
            <Link href="/admin/customers/create">
                <Button color="success">Skapa Ny Kund</Button>
            </Link>
            </div>
        ) : (
            <Table aria-label="Customer list">
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>NAMN</TableColumn>
                <TableColumn>E-POST</TableColumn>
                <TableColumn>TELEFON</TableColumn>
                <TableColumn>STAD</TableColumn>
                <TableColumn>REGISTRERAD</TableColumn>
                <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.firstname} {customer.lastname}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>{new Date(customer.created_at || '').toLocaleDateString()}</TableCell>
                    <TableCell>
                    <div className="flex gap-2">
                        <Link href={`/admin/customers/${customer.id}`}>
                        <Button color="primary" size="sm" isIconOnly>
                            <Edit size={16} />
                        </Button>
                        </Link>
                        <Button 
                        color="danger" 
                        size="sm" 
                        isIconOnly
                        onPress={() => handleDelete(customer.id)}
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
