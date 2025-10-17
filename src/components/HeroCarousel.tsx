import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

const carouselSlides = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG2WaQnz0U2-PkT1z5BRpuxxGTAZggf7uN1Q&s",
    title: "Unbeatable bulk deals!",
    description: "Your first order deserves a treat! Enjoy 10% OFF on ₹2000+ orders.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1624278086471-cdb98170201d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBjb29raW5nfGVufDF8fHx8MTc2MDUxMDUwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mobile Food Service",
    description: "Professional chefs with mobile setups for any location",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558163260-0200547a99ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY29va2luZyUyMGNoZWZ8ZW58MXx8fHwxNzYwNTEwNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Outdoor Catering",
    description: "Expert outdoor cooking for parties, events & celebrations",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1760411070365-714fa3a186db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBmb29kJTIwY2FydHxlbnwxfHx8fDE3NjA0Mzk4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Parking Lot Pop-ups",
    description: "Convenient chef services at your office or community parking",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1580689376629-2c4ef0920e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwaW5kaWF8ZW58MXx8fHwxNzYwNDIzMTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Local Culinary Masters",
    description: "Discover talented chefs showcasing regional Indian cuisine",
  },
];

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full mb-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent>
          {carouselSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Card className="border-0">
                <CardContent className="p-0">
                  <div className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-lg bg-muted">
                    <ImageWithFallback
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                      <h2 className="text-white mb-2 max-w-2xl">{slide.title}</h2>
                      <p className="text-white/95 text-base md:text-lg max-w-xl">{slide.description}</p>
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {carouselSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === current
                              ? "w-8 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/75"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
