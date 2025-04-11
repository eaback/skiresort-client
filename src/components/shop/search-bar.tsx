"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@heroui/react"
// import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type SearchResult = {
    id: number
    name: string
    image: string
    price: number
    category: string
}

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false)
        }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const searchProducts = async () => {
        if (query.length < 2) {
            setResults([])
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
            if (response.ok) {
            const data = await response.json()
            setResults(data)
            setShowResults(true)
            }
        } catch (error) {
            console.error("Search error:", error)
        } finally {
            setIsLoading(false)
        }
        }

        const debounceTimer = setTimeout(() => {
        searchProducts()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
        router.push(`/butik/search?q=${encodeURIComponent(query)}`)
        setShowResults(false)
        }
    }

    return (
        <div className="relative w-full max-w-md" ref={searchRef}>
        <form onSubmit={handleSearch} className="relative">
            <Input
            type="search"
            placeholder="Sök produkter..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
            />
            <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Sök"
            >
            <Search size={18} />
            </button>
        </form>

        {showResults && results.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-96 overflow-auto">
            <ul className="py-2">
                {results.map((product) => (
                <li key={product.id}>
                    <Link
                    href={`/butik/${product.id}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowResults(false)}
                    >
                    <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                        <img
                        src={product.image || "/placeholder.svg?height=48&width=48"}
                        alt={product.name}
                        
                        className="object-cover rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.price.toLocaleString("sv-SE")} kr • {product.category}
                        </p>
                    </div>
                    </Link>
                </li>
                ))}
            </ul>
            <div className="p-2 border-t">
                <button
                onClick={handleSearch}
                className="w-full text-center text-sm text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                >
                Visa alla resultat
                </button>
            </div>
            </div>
        )}

        {isLoading && (
            <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 text-center">
            <p>Söker...</p>
            </div>
        )}
        </div>
    )
}
