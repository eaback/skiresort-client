import React from 'react';

const SkiAdventureSection = () => {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-5xl font-serif text-teal-800">Lyft ditt Skidäventyr</h2>
          <p className="text-gray-500">
            Doppa ner dig i Ljungdalens snöiga landskap, en skidort inbäddad i hjärtat
            av de svenska fjällen
          </p>
          <button className="bg-[#A45D4E] text-white px-8 py-3 rounded-full hover:bg-[#8E503F] transition-colors">
            Upptäck våra respaket
          </button>
        </div>
        <div className="bg-[#A45D4E] p-8 rounded-lg text-white">
          <h3 className="text-4xl font-serif mb-6">Omfamna lugnet</h3>
          <p className="text-lg leading-relaxed mb-8">
            Unna dig den ultimata vinterunderlandets upplevelse på Destination Ljungdalen. 
            Vår skidort erbjuder oöverträffad tillgång till de svepande backarna, lyxigt 
            boende och exceptionell mat, catering till äventyrliga andar och de som söker 
            avkoppling
          </p>
          <button className="bg-white text-[#A45D4E] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
            Boka Nu
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkiAdventureSection; 