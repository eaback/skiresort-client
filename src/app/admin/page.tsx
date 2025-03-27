import AppNavbar from "@/components/navbar";
import AppFooter from "@/components/footer";
import AdminDashboard from "@/components/admin/dashboard";

export default function AdminPage() {
    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />
        
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-teal-800 mb-8">Admin Dashboard</h1>
            
            <AdminDashboard />
        </div>
        
        <AppFooter />
        </div>
    );
}
