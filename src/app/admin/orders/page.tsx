import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import OrderList from "@/components/admin/order-list";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ManageOrdersPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Hantera Beställningar</h1>
            
            <Link href="/admin">
                <Button variant="light">Tillbaka till Dashboard</Button>
            </Link>
            </div>
            
            <OrderList />
        </div>
        
        <AppFooter />
        </div>
    );
}
