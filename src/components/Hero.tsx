import React, { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const images = [
  { src: "https://images.unsplash.com/photo-1762706372855-34d5efc09ef5?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 1" },
  { src: "https://images.unsplash.com/photo-1762701254454-889d0cb98c30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 2" },
  { src: "https://images.unsplash.com/photo-1762696782497-2b39df0f4523?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 3" },
  { src: "https://images.unsplash.com/photo-1762696796348-d6f22d721657?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 4" },
  { src: "https://images.unsplash.com/photo-1762539609832-edc710faa692?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 5" },
  { src: "https://images.unsplash.com/photo-1762698325112-16b13f4f8732?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Adventure 6" },
];

const TRANSITION_MS = 1000;
const INTERVAL_MS = 5000;

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={img.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000`}
            style={{
              backgroundImage: `url(${img.src})`,
              opacity: i === index ? 1 : 0,
              transitionDuration: `${TRANSITION_MS}ms`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Discover Your Next
              <span className="block gradient-adventure bg-clip-text text-transparent pt-2">Adventure</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed font-light">
              Discover breathtaking landscapes, thrilling expeditions, and unforgettable journeys designed to inspire your spirit of exploration and adventure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up">
            <Button asChild variant="hero" size="xl" className="group">
              <Link to="/destinations" className="inline-flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button variant="glass" size="xl" className="group">
              <Play className="mr-2 h-5 w-5" />
              Watch Stories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto">
            <div className="text-center animate-float">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/70 text-xs md:text-sm pt-2">Adventures</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-3xl md:text-4xl font-bold text-white">10k+</div>
              <div className="text-white/70 text-xs md:text-sm pt-2">Happy Travelers</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-3xl md:text-4xl font-bold text-white">3+</div>
              <div className="text-white/70 text-xs md:text-sm pt-2">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
