import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">Logga in</h1>
            
            <LoginForm />
            
            <div className="mt-6 text-center">
                <p className="mb-4">Har du inget konto?</p>
                <Link href="/auth/signup">
                <Button color="warning" variant="flat">
                    Skapa ett konto
                </Button>
                </Link>
            </div>
            </div>
        </div>
        
        <AppFooter />
        </div>
    );
}
