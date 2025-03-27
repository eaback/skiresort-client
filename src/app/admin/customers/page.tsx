import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import CustomerList from "@/components/admin/customer-list";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ManageCustomersPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Hantera Kunder</h1>
            
            <div className="flex gap-4">
                <Link href="/admin">
                <Button variant="light">Tillbaka till Dashboard</Button>
                </Link>
                
                <Link href="/admin/customers/create">
                <Button color="success">Skapa Ny Kund</Button>
                </Link>
            </div>
            </div>
            
            <CustomerList />
        </div>
        
        <AppFooter />
        </div>
    );
}
