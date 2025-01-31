import Image from "next/image";
//Components
import { ProductCard } from "./components/ProductCard";
import { Baner } from "./components/Baner";


export default function HomePage() {

  return (
    <>
      <div className="p-4 pb-10 pt-10">
        <Image className="rounded-lg" src="/baner.webp" alt="Baner" layout="responsive" width={854} height={341} />
      </div>
      <div className="flex justify-center gap-5 pb-10">
        <div>Хіти продажу</div>
        <div>Новинки</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg overflow-hidden p-4 pt-20 pb-20">
        <Baner img={'/left_baner.webp'} />
        <Baner img={'/right_baner.webp'} />
      </div>
    </>
  );
}