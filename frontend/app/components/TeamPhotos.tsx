"use client";

import { useState } from "react";
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function TeamPhotos() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamSlides = [
    {
      src: "team.png",
      alt: "Команда MindKey у чайній"
    },
    {
      src: "team2.png",
      alt: "Команда MindKey на корпоративі в парку"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamSlides.length) % teamSlides.length);
  };

  return (
    <div>
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#003459] text-center mx-auto">
              Наша Команда
            </h2>
            <p className="text-lg text-[#003459]/80 max-w-2xl text-center mx-auto">
              У MindKey ми не просто заварюємо чай та каву — ми створюємо атмосферу, де кожен може знайти свій ритм і зарядитися енергією для продуктивної роботи. Наша команда — це поєднання чайних сомельє, техно-бариста та амбасадорів дзену, які разом створюють унікальний простір для вашого фокусу.
            </p>
          </div>
          
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white aspect-[16/10] md:aspect-[16/9] max-h-[520px] mx-auto">
            <div className="relative w-full h-full bg-slate-900">
              {teamSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 pointer-events-none z-0"
                  }`}
                >
                  <img 
                    src={slide.src} 
                    alt={slide.alt} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-sm font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400 fill-red-400" /> Створено з любов'ю
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 active:scale-95 text-white p-3 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
              aria-label="Попереднє фото"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 active:scale-95 text-white p-3 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
              aria-label="Наступне фото"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 bg-black/35 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/15">
              {teamSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "bg-[#0077B6] scale-125" 
                      : "bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Перейти до фото ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}