import Image from "next/image";

export function Baner({ img }: { img: string }) {
    return (
        <div className="rounded-lg overflow-hidden">
            <Image
                layout="responsible"
                src={img}
                alt="Затишні пледи"
                width={510}
                height={310}
                className="w-full h-full object-cover"
            />
        </div>
    );
}