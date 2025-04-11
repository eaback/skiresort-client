import { Suspense } from "react"
import AppNavbar from "@/components/navbar"
import AppFooter from "@/components/footer"
import { Button } from "@heroui/react"
import Link from "next/link"
import SearchResults from "@/components/shop/search-result"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || ""

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <AppNavbar />

        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-teal-800">Sökresultat</h1>
            <Link href="/butik">
                <Button variant="light">Tillbaka till butiken</Button>
            </Link>
            </div>

            <div className="mb-6">
            <p className="text-lg">
                Visar resultat för: <span className="font-semibold">{query}</span>
            </p>
            </div>

            <Suspense fallback={<div className="text-center py-12">Laddar sökresultat...</div>}>
            <SearchResults query={query} />
            </Suspense>
        </div>

        <AppFooter />
        </div>
    )
}
