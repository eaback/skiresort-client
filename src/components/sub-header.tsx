import Link from "next/link"
import { Mountain } from "lucide-react"

export default function SubHeader() {
  return (
    <section className="top-0 z-50 w-full bg-[#f9f5f2] border-b border-neutral-200">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="h-8 w-8 text-[#a85238]" />
          <Link href="/" className="text-2xl font-bold text-[#0a5c5c]">
            Upptäck Ljungdalsfjällen
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Upplev Ljungdalsfjällen
          </Link>
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Boende
          </Link>
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Restaurang med resonemang
          </Link>
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Väder & Vind
          </Link>
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Partners
          </Link>
          <Link href="#" className="text-sm font-medium text-[#0a5c5c] hover:text-[#a85238]">
            Uthyrning
          </Link>
        </nav>
        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0a5c5c]"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

