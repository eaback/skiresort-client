import React from 'react';

const RestaurantSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative h-[500px] order-2 lg:order-1">
        <img
          src="/restaurang.png"
          alt="Mountain cabin restaurant"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="space-y-6 order-1 lg:order-2">
        <h2 className="text-5xl font-serif text-teal-800">Hittar Restaurang</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Njut av kulinariska läckerheter på Destination Ljungdalen. Våra kockar
          tillverkar aptitretande rätter med de finaste lokala ingredienserna, vilket
          garanterar en verkligt minnesvärd matupplevelse
        </p>
        <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors">
          Boka ett bord
        </button>
      </div>
    </section>
  );
};

export default RestaurantSection;