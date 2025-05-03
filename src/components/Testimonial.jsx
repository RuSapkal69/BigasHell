import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const testimonials = [
    [
      {
        name: "James Wilson",
        role: "Member since 2022",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-b-_N-na2JFF5UQHeGXLqBZ2ORwNRJKBryw&s",
        content: "The personalized workout plans completely transformed my fitness journey. I've lost 30 pounds in 6 months and feel stronger than ever!",
      },
      {
        name: "Sarah Martinez",
        role: "Fitness Enthusiast",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5cmcyRMCK2wEHY213hPirrYO4lmOhwaU3kg&s",
        content: "The exercise tracking feature helps me stay accountable. I love how the app adjusts my routine based on my progress data.",
      }
    ],
    [
      {
        name: "David Chen",
        role: "Marathon Runner",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiH7-037jcHshVoPr9OtJk3J-Tqg9RT4298g&s",
        content: "As someone who trains for competitions, the detailed analytics helped me improve my performance metrics by 15%. Couldn't have done it without this app!",
      },
      {
        name: "Lisa Johnson",
        role: "Working Professional",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LyGVuIJECvwnRj5CzA5C8GKQkJgTaz-cUA&s",
        content: "The quick workout recommendations fit perfectly into my busy schedule. I can finally maintain consistency in my fitness routine despite long work hours.",
      }
    ],
    [
      {
        name: "Michael Brown",
        role: "Recovery Patient",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZs49I8IIeZOTl-NN35wO1RecnRF0R5qH9Hw&s",
        content: "After my injury, the app's adaptive exercises helped me rebuild strength safely. My physical therapist is impressed with my progress!",
      },
      {
        name: "Emma Taylor",
        role: "New Mom",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRggUwDSbTMq4hsqrO1xWXoTRJnSjXLmcNj3w&s",
        content: "The postpartum workout plan was exactly what I needed. I appreciate how the app adjusts based on my energy levels and available time.",
      }
    ]
  ];

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center py-16" 
         style={{ backgroundImage: "url('/HellGym_2.jpg')" }}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Clients Say About Us
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Real results, real stories. See how our personalized fitness guidance has transformed lives.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((slide, slideIndex) => (
            <div 
              key={slideIndex} 
              className={`transition-opacity duration-500 ${activeSlide === slideIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {slide.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="backdrop-blur-md bg-white/20 rounded-xl shadow-xl p-6 transition-all duration-300 hover:bg-white group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full mr-4 overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `/api/placeholder/150/150`;
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white group-hover:text-gray-800 transition-colors duration-300">{testimonial.name}</h4>
                        <p className="text-blue-300 group-hover:text-blue-600 transition-colors duration-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#FFD700" color="#FFD700" />
                      ))}
                    </div>
                    <p className="text-white/90 group-hover:text-gray-700 transition-colors duration-300 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide} 
            className="absolute top-[45%] -left-12 -translate-y-1/2 bg-white/20 hover:bg-white/80 text-white hover:text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute top-[45%] -right-12 -translate-y-1/2 bg-white/20 hover:bg-white/80 text-white hover:text-gray-800 p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'bg-blue-500 w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}