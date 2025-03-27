import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import ProductList from "@/components/admin/product-list";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ManageProductsPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />

        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Hantera Produkter</h1>

            <div className="flex gap-4">
                <Link href="/admin">
                <Button variant="light">Tillbaka till Dashboard</Button>
                </Link>

                <Link href="/admin/products/create">
                <Button color="success">Skapa Ny Produkt</Button>
                </Link>
            </div>
            </div>

            <ProductList />
        </div>

        <AppFooter />
        </div>
    );
}
