import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import { Button } from "@heroui/react";
import Link from "next/link";
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            
            <h1 className="text-4xl font-bold text-teal-800 mb-4">Tack för din beställning!</h1>
            
            <p className="text-lg mb-8">
                Din beställning har mottagits och bearbetas nu. Du kommer att få en bekräftelse via e-post inom kort.
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Vad händer nu?</h2>
                <ul className="text-left space-y-2">
                <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Vi behandlar din beställning</span>
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Du får en bekräftelse via e-post</span>
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Vi förbereder dina varor för leverans</span>
                </li>
                <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Du får ett leveransmeddelande när din beställning skickas</span>
                </li>
                </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/">
                <Button color="primary" size="lg">
                    Tillbaka till Hem
                </Button>
                </Link>
                
                <Link href="/butik">
                <Button color="warning" size="lg">
                    Fortsätt handla
                </Button>
                </Link>
            </div>
            </div>
        </div>
        
        <AppFooter />
        </div>
    );
}
