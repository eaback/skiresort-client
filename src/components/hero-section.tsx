import { Button } from "@heroui/react"

export default function HeroSection() {
  return (
     <section className="text-center py-32 bg-cover bg-center min-h-[50dvh]" style={{ backgroundImage: "url('/HeroImage.png')" }}>
        <div className="p-10 m-20">
            <h1 className="text-5xl font-bold text-[#FAE8DC]">Upplev Vinter i Vildmarken</h1>
            <p className="text-lg text-[#FAE8DC] mt-4">Boka din vistelse och njut av Ljungdalens fjällvärld</p>
            <Button className="mt-6 bg-[#AE5338] text-[#FAE8DC]" size="lg">Boka Nu</Button>
        </div>
      </section>
  )
}

