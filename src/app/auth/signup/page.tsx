import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import SignupForm from "@/components/auth/signup-form";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">Skapa konto</h1>
            
            <SignupForm />
            
            <div className="mt-6 text-center">
                <p className="mb-4">Har du redan ett konto?</p>
                <Link href="/auth/login">
                <Button color="warning" variant="flat">
                    Logga in
                </Button>
                </Link>
            </div>
            </div>
        </div>
        
        <AppFooter />
        </div>
    );
}
