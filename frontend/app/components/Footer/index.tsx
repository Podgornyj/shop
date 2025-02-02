import Image from "next/image";
//Icons
import {
    FiPhone,
    FiMail,
    FiInstagram,
    FiFacebook,
    FiYoutube,
    FiSmartphone
} from "react-icons/fi";

export function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <div>
                    <Image src="/shop_logo.webp" alt="Homella Logo" width={150} height={50} />
                    <p className="mt-4">&copy; 2025</p>
                    <p className="flex items-center mt-2">
                        <FiSmartphone className="mr-2" /> Мобільна версія
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-green-400">Каталог</h4>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="hover:underline">Килими</a></li>
                        <li><a href="#" className="hover:underline">Пледи</a></li>
                        <li><a href="#" className="hover:underline">Постільна білизна</a></li>
                        <li><a href="#" className="hover:underline">Освітлення</a></li>
                        <li><a href="#" className="hover:underline">Декор</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-green-400">Клієнтам</h4>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="hover:underline">Вхід до кабінету</a></li>
                        <li><a href="#" className="hover:underline">Про нас</a></li>
                        <li><a href="#" className="hover:underline">Оплата і доставка</a></li>
                        <li><a href="#" className="hover:underline">Обмін та повернення</a></li>
                        <li><a href="#" className="hover:underline">Контактна інформація</a></li>
                        <li><a href="#" className="hover:underline">Блог</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-green-400">Контактна інформація</h4>
                    <ul className="mt-2 space-y-2">
                        <li className="flex items-center">
                            <FiPhone className="mr-2" /> 044 000-00-00
                        </li>
                        <li className="flex items-center">
                            <FiPhone className="mr-2" /> 095 000-00-00
                        </li>
                        <li><a href="#" className="hover:underline">Передзвонити вам?</a></li>
                        <li className="flex items-center">
                            <FiMail className="mr-2" /> mail@mail.com
                        </li>
                    </ul>
                    <h4 className="mt-4 font-bold text-green-400">Ми в соцмережах</h4>
                    <div className="flex space-x-4 mt-2">
                        <FiInstagram className="text-xl cursor-pointer hover:text-gray-400" />
                        <FiFacebook className="text-xl cursor-pointer hover:text-gray-400" />
                        <FiYoutube className="text-xl cursor-pointer hover:text-gray-400" />
                    </div>
                </div>
            </div>
        </footer>
    )
}