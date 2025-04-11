import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { Product } from "@/lib/db-types"


interface GoogleSearchItem {
  link: string
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json([])
    }

    const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID

    let products: Product[] = []

    if (googleApiKey && searchEngineId) {
      const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image`

      const response = await fetch(googleSearchUrl)
      const data = await response.json()

      if (response.ok && data.items) {
        const productIds = (data.items as GoogleSearchItem[]).map((item) => {
          try {
            const urlParts = new URL(item.link).pathname.split('/')
            const lastSegment = urlParts[urlParts.length - 1]
            const possibleId = parseInt(lastSegment)
            return isNaN(possibleId) ? null : possibleId
          } catch {
            return null
          }
        }).filter((id: number | null): id is number => id !== null)

        if (productIds.length > 0) {
          const placeholders = productIds.map(() => '?').join(',')
          products = await executeQuery<Product[]>(
            `SELECT * FROM products WHERE id IN (${placeholders})`,
            productIds
          )
        }
      } else {
        console.warn("Google Search API failed or returned no results, falling back to DB search")
      }
    }

    // Fallback to DB search if no products from Google
    if (products.length === 0) {
      const searchQuery = `
        SELECT * FROM products 
        WHERE 
          name LIKE ? OR 
          description LIKE ? OR
          category LIKE ?
        LIMIT 10
      `
      const searchTerm = `%${query}%`
      const params = [searchTerm, searchTerm, searchTerm]

      products = await executeQuery<Product[]>(searchQuery, params)
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
