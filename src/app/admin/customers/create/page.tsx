import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import CustomerForm from "@/components/admin/customer-form";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function CreateCustomerPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Skapa Ny Kund</h1>
            
            <Link href="/admin/customers">
                <Button variant="light">Tillbaka till Kundlistan</Button>
            </Link>
            </div>
            
            <CustomerForm />
        </div>
        
        <AppFooter />
        </div>
);
}
