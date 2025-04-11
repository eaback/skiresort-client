"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardBody, CardFooter } from "@heroui/react"
import type { Product } from "@/lib/db-types"

export default function SearchResults({ query }: { query: string }) {
    const [results, setResults] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSearchResults() {
        if (!query) {
            setResults([])
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

            if (!response.ok) {
            throw new Error("Failed to fetch search results")
            }

            const data = await response.json()
            setResults(data)
        } catch (err) {
            setError("Failed to load search results. Please try again later.")
            console.error(err)
        } finally {
            setLoading(false)
        }
        }

        fetchSearchResults()
    }, [query])

    if (loading) {
        return <div className="text-center py-12">Laddar sökresultat...</div>
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">{error}</div>
    }

    if (results.length === 0) {
        return (
        <div className="text-center py-12">
            <p className="text-lg mb-4">Inga produkter hittades för "{query}"</p>
            <Link href="/butik">
            <button className="text-teal-600 hover:text-teal-800 font-medium">Gå tillbaka till butiken</button>
            </Link>
        </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((product) => (
            <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
                <img
                src={product.image || "/placeholder.svg?height=192&width=384"}
                alt={product.name}
                // fill
                className="object-cover"
                />
            </div>
            <CardBody>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price.toLocaleString("sv-SE")} kr</p>
            </CardBody>
            <CardFooter>
                <Link href={`/butik/${product.id}`} className="w-full">
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md">Visa produkt</button>
                </Link>
            </CardFooter>
            </Card>
        ))}
        </div>
    )
}
