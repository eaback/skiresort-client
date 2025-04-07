'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from "@heroui/react";
import { Order } from '@/lib/db-types';
import Link from 'next/link';
import { Eye, Trash } from 'lucide-react';

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
        try {
            const response = await fetch('/api/orders');
            
            if (!response.ok) {
            throw new Error('Failed to fetch orders');
            }
            
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError('Failed to load orders. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        }

        fetchOrders();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this order?')) {
        return;
        }
        
        try {
        const response = await fetch(`/api/orders?id=${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        
        setOrders(orders.filter(order => order.id !== id));
        
        } catch (err) {
        console.error(err);
        alert('Failed to delete order');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'pending':
            return 'warning';
        case 'processing':
            return 'primary';
        case 'shipped':
            return 'secondary';
        case 'delivered':
            return 'success';
        case 'cancelled':
            return 'danger';
        default:
            return 'default';
        }
    };

    if (loading) {
        return <div className="text-center py-12">Laddar beställningar...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>;
    }

    return (
        <div>
        {orders.length === 0 ? (
            <div className="text-center py-12">
            <p className="text-lg mb-4">Inga beställningar hittades</p>
            </div>
        ) : (
            <Table aria-label="Order list">
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>KUND ID</TableColumn>
                <TableColumn>TOTALT</TableColumn>
                <TableColumn>BETALNINGSSTATUS</TableColumn>
                <TableColumn>ORDERSTATUS</TableColumn>
                <TableColumn>DATUM</TableColumn>
                <TableColumn>ÅTGÄRDER</TableColumn>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer_id}</TableCell>
                    <TableCell>{order.total_price} kr</TableCell>
                    <TableCell>
                    <Chip 
                        color={order.payment_status === 'completed' ? 'success' : 'warning'}
                        size="sm"
                    >
                        {order.payment_status}
                    </Chip>
                    </TableCell>
                    <TableCell>
                    <Chip 
                        color={getStatusColor(order.order_status)}
                        size="sm"
                    >
                        {order.order_status}
                    </Chip>
                    </TableCell>
                    <TableCell>{new Date(order.created_at || '').toLocaleDateString()}</TableCell>
                    <TableCell>
                    <div className="flex gap-2">
                        <Link href={`/admin/orders/${order.id}`}>
                        <Button color="primary" size="sm" isIconOnly>
                            <Eye size={16} />
                        </Button>
                        </Link>
                        <Button 
                        color="danger" 
                        size="sm" 
                        isIconOnly
                        onPress={() => handleDelete(order.id)}
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
