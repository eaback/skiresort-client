import { Card, CardBody, CardHeader, Image } from "@heroui/react"

export default function Feature () {

    return (
        <section className="container mx-auto px-6 py-16 grid gap-6 md:grid-cols-3">
                <Card className="p-4">
                <CardBody className="overflow-visible items-center p-2">
                    <Image
                    alt="Boende"
                    className="object-cover rounded-xl"
                    src="/cabin.png"
                    width={370}
                    height={270}
                    />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Lyxiga Boenden</h4>
                    <p className="text-tiny uppercase font-bold">Fly vardagen</p>
                </CardHeader>
                </Card>
                <Card className="p-4">
                <CardBody className="overflow-visible items-center p-2">
                    <Image
                    alt="Skidåkning"
                    className="object-cover rounded-xl"
                    src="/skiing.png"
                    width={370}
                    height={270}
                    />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Åk skidor i backarna med stil</h4>
                    <p className="text-tiny uppercase font-bold">Omfamna äventyret</p>
                </CardHeader>
                </Card>
                <Card className="p-4">
                <CardBody className="overflow-visible items-center p-2">
                    <Image
                    alt="Berget"
                    className="object-cover rounded-xl"
                    src="/berget.png"
                    width={370}
                    height={270}
                    />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Erövra Berget</h4>
                    <p className="text-tiny uppercase font-bold">Skapa bestående minnen</p>
                </CardHeader>
                </Card>
            </section>
    )
}