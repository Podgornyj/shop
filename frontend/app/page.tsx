// import { useState } from "react";
// import styles from './styles.module.css'

export default function HomePage() {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Товар" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">Товар {index + 1}</h2>
            <p className="text-gray-500">Описание товара</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md transition transform hover:scale-105 active:scale-95">
              Купить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}