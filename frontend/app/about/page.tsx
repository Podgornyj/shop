import Link from 'next/link'

export default function About() {

    return (
        <div className="grid grid-cols-[250px,1fr] min-h-[450px]">
            <div>
                <nav className="flex flex-col gap-2 p-10 shadow-lg">
                    <Link href={`/about`}>Про нас</Link>
                    <Link href={`/payment`}>Оплата і доставка</Link>
                    <Link href={`/exchange`}>Обмін та повернення</Link>
                    <Link href={`/contacts`}>Контактна інформація</Link>
                    <Link href={`/blog`}>Блог</Link>
                </nav>
            </div>
            <div>
                Content About
            </div>
        </div>
    );
}