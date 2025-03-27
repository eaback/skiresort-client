import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import CartContents from "@/components/shop/cart-contents";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function CartPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Din Kundvagn</h1>
            
            <Link href="/butik">
                <Button variant="light" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Fortsätt handla
                </Button>
            </Link>
            </div>
            
            <CartContents />
        </div>
        
        <AppFooter />
        </div>
    );
}
