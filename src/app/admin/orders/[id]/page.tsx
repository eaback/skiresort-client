import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import OrderDetails from "@/components/admin/order-details";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Beställningsdetaljer</h1>
            
            <Link href="/admin/orders">
                <Button variant="light">Tillbaka till Beställningslistan</Button>
            </Link>
            </div>
            
            <OrderDetails orderId={params.id} />
        </div>
        
        <AppFooter />
        </div>
    );
}
