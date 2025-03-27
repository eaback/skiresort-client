'use client';

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import Link from 'next/link';
import { Users, ShoppingBag, Package } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/customers" className="block">
            <Card className="h-full">
            <CardHeader className="flex gap-3">
                <Users className="w-8 h-8 text-teal-800" />
                <div className="flex flex-col">
                <p className="text-xl font-bold">Hantera Kunder</p>
                <p className="text-small text-gray-500">Visa, skapa, uppdatera och ta bort kunder</p>
                </div>
            </CardHeader>
            <CardBody>
                <Button color="primary" className="w-full">Gå till Kunder</Button>
            </CardBody>
            </Card>
        </Link>
        
        <Link href="/admin/products" className="block">
            <Card className="h-full">
            <CardHeader className="flex gap-3">
                <ShoppingBag className="w-8 h-8 text-teal-800" />
                <div className="flex flex-col">
                <p className="text-xl font-bold">Hantera Produkter</p>
                <p className="text-small text-gray-500">Visa, skapa, uppdatera och ta bort produkter</p>
                </div>
            </CardHeader>
            <CardBody>
                <Button color="primary" className="w-full">Gå till Produkter</Button>
            </CardBody>
            </Card>
        </Link>
        
        <Link href="/admin/orders" className="block">
            <Card className="h-full">
            <CardHeader className="flex gap-3">
                <Package className="w-8 h-8 text-teal-800" />
                <div className="flex flex-col">
                <p className="text-xl font-bold">Hantera Beställningar</p>
                <p className="text-small text-gray-500">Visa, uppdatera och hantera beställningar</p>
                </div>
            </CardHeader>
            <CardBody>
                <Button color="primary" className="w-full">Gå till Beställningar</Button>
            </CardBody>
            </Card>
        </Link>
        </div>
    );
}
