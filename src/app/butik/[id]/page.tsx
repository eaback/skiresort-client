import { Suspense } from 'react';
import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import ProductDetail from "@/components/shop/product-detail";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <Link href="/butik">
                <Button variant="light" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Tillbaka till butiken
                </Button>
            </Link>
            
            <Link href="/butik/cart">
                <Button color="warning" variant="flat" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Kundvagn
                </Button>
            </Link>
            </div>
            
            <Suspense fallback={<div className="text-center py-12">Laddar produkt...</div>}>
            <ProductDetail id={params.id} />
            </Suspense>
        </div>
        
        <AppFooter />
        </div>
    );
}
