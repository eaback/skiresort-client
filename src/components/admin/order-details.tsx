'use client';

import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Divider, Select, SelectItem } from "@heroui/react";
import { Order } from '@/lib/db-types';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

export default function OrderDetails({ orderId }: { orderId: string }) {
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string>('');

    

    const fetchOrder = async () => {
        try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        
        const data = await response.json();
        setOrder(data);
        setOrderStatus(data.order_status);
        setPaymentStatus(data.payment_status);
        } catch (err) {
        setError('Failed to load order. Please try again later.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const handleUpdateStatus = async () => {
        if (!order) return;
        
        try {
        const response = await fetch(`/api/orders?id=${orderId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            order_status: orderStatus,
            payment_status: paymentStatus,
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
        
        fetchOrder();
        
        } catch (err) {
        console.error(err);
        alert('Failed to update order status');
        }
    };

    const handleDeleteItem = async (itemId: number) => {
        if (!confirm('Are you sure you want to delete this item?')) {
        return;
        }
        
        try {
        const response = await fetch(`/api/order-items?id=${itemId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete order item');
        }
        
        fetchOrder();
        
        } catch (err) {
        console.error(err);
        alert('Failed to delete order item');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Laddar beställning...</div>;
    }

    if (error || !order) {
        return <div className="text-center py-12 text-red-500">{error || 'Order not found'}</div>;
    }

    return (
        <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
            <CardHeader>
                <h3 className="text-xl font-bold">Beställningsinformation</h3>
            </CardHeader>
            <CardBody>
                <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium">Beställnings-ID:</span>
                    <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Datum:</span>
                    <span>{new Date(order.created_at || '').toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Totalt:</span>
                    <span className="font-bold">{order.total_price} kr</span>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                    <span className="font-medium">Betalningsstatus:</span>
                    <Select 
                    selectedKeys={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-40"
                    >
                    <SelectItem key="pending">Väntande</SelectItem>
                    <SelectItem key="completed">Slutförd</SelectItem>
                    <SelectItem key="failed">Misslyckad</SelectItem>
                    <SelectItem key="refunded">Återbetald</SelectItem>
                    </Select>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">Orderstatus:</span>
                    <Select 
                    selectedKeys={orderStatus} 
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="w-40"
                    >
                    <SelectItem key="pending">Väntande</SelectItem>
                    <SelectItem key="processing">Behandlas</SelectItem>
                    <SelectItem key="shipped">Skickad</SelectItem>
                    <SelectItem key="delivered">Levererad</SelectItem>
                    <SelectItem key="cancelled">Avbruten</SelectItem>
                    </Select>
                </div>
                <Button 
                    color="primary" 
                    onPress={handleUpdateStatus}
                >
                    Uppdatera Status
                </Button>
                </div>
            </CardBody>
            </Card>
            
            <Card>
            <CardHeader>
                <h3 className="text-xl font-bold">Kundinformation</h3>
            </CardHeader>
            <CardBody>
                <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium">Kund-ID:</span>
                    <span>{order.customer_id}</span>
                </div>
                {/* In a real app, you would fetch and display customer details here */}
                <Button 
                    color="primary" 
                    variant="light"
                    onPress={() => router.push(`/admin/customers/${order.customer_id}`)}
                >
                    Visa Kunddetaljer
                </Button>
                </div>
            </CardBody>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
            <h3 className="text-xl font-bold">Beställda Produkter</h3>
            </CardHeader>
            <CardBody>
            <table className="w-full">
                <thead>
                <tr className="border-b">
                    <th className="py-2 text-left">Produkt</th>
                    <th className="py-2 text-center">Antal</th>
                    <th className="py-2 text-right">Pris</th>
                    <th className="py-2 text-right">Totalt</th>
                    <th className="py-2 text-right">Åtgärder</th>
                </tr>
                </thead>
                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id} className="border-b">
                    <td className="py-4">{item.product_name}</td>
                    <td className="py-4 text-center">{item.quantity}</td>
                    <td className="py-4 text-right">{item.unit_price} kr</td>
                    <td className="py-4 text-right font-medium">{item.quantity * item.unit_price} kr</td>
                    <td className="py-4 text-right">
                        <Button 
                        color="danger" 
                        size="sm" 
                        isIconOnly
                        onPress={() => handleDeleteItem(item.id)}
                        >
                        <Trash size={16} />
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={3} className="py-4 text-right font-bold">Totalt:</td>
                    <td className="py-4 text-right font-bold">{order.total_price} kr</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            </CardBody>
        </Card>
        </div>
    );
}
