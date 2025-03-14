import React from 'react';

const ContactSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-5xl font-serif text-teal-800">Kontakta Oss</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Hör av dig till Destination Ljungdalen. Vårt dedikerade team är här för att hjälpa dig
          med alla frågor, bokningsförfrågningar eller specialarrangemang
        </p>
        <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors">
          Kontakta oss
        </button>
      </div>
      <div className="relative h-[500px]">
        <img
          src="/contact.png"
          alt="Snowy mountain landscape"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default ContactSection;