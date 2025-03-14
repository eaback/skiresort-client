import { Button } from "@heroui/react";
import Image from "next/image"

export default function ServicesSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#0a5c5c] text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Upptäck våra tjänster</h2>
            <p className="text-white/80">
              Upptäck de oändliga möjligheterna på Destination Ljungdalen. Från spännande skidåkning och snowboardåkning
              till mysiga afterski-upplevelser, vår resort passar alla vinterentusiaster
            </p>
            <div className="pt-4">
              <Button variant="flat" className="text-white border-white hover:bg-white/20 rounded-full px-8">
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <Image
              src="/services.png"
              alt="Skier on a slope with mountain view"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

