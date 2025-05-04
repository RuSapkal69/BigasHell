import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { gymQuotes } from '../utils/gym-quotes';
import QuoteSlider from './QuoteSlider';

const Motivate = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const totalQuotes = gymQuotes.length;

  const nextQuote = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % totalQuotes);
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalQuotes]);

  const prevQuote = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === 0 ? totalQuotes - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalQuotes]);

  // Auto-rotate quotes every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextQuote();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [nextQuote]);

  return (
    <div className="relative rounded-lg p-10 shadow-lg border border-gray-800 h-full overflow-hidden">
      {/* SVG Gradient Background */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="motivationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4158D0">
              <animate 
                attributeName="stop-color" 
                values="#4158D0; #8367C7; #C06C84; #F67280; #F8B195; #FFD166; #06D6A0; #118AB2; #4158D0" 
                dur="30s" 
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#C06C84">
              <animate 
                attributeName="stop-color" 
                values="#C06C84; #F67280; #F8B195; #FFD166; #06D6A0; #118AB2; #4158D0; #8367C7; #C06C84" 
                dur="30s" 
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#FFD166">
              <animate 
                attributeName="stop-color" 
                values="#FFD166; #06D6A0; #118AB2; #4158D0; #8367C7; #C06C84; #F67280; #F8B195; #FFD166" 
                dur="30s" 
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#motivationGradient)"/>
      </svg>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="relative h-[80px] flex items-center justify-center mt-10">
          <button 
            onClick={prevQuote}
            className="absolute -left-6 top-[25%] -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 p-1 rounded-full text-white hover:text-white transition-colors z-10"
            aria-label="Previous quote"
          >
            <ChevronLeft size={20} />
          </button>
          
          
          <QuoteSlider 
            quote={gymQuotes[currentQuoteIndex].quote}
            author={gymQuotes[currentQuoteIndex].author}
            isVisible={!isAnimating}
          />
          
          <button 
            onClick={nextQuote}
            className="absolute -right-6 top-[25%] -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 p-1 rounded-full text-white hover:text-white transition-colors z-10"
            aria-label="Next quote"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Motivate;