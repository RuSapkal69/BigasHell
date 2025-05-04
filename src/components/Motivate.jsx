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
    <div className="bg-gray-900 rounded-lg p-3 shadow-lg border border-gray-800 h-full">
      {/* <div className="flex items-center mb-4">
        <Quote className="h-5 w-5 text-red-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Daily Motivation</h2>
      </div> */}
      <div className="relative h-[80px] flex items-center justify-center mt-10">
        <button 
          onClick={prevQuote}
          className="absolute left-0 top-[65%] -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-1 rounded-full text-gray-300 hover:text-white transition-colors z-10"
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
          className="absolute right-0 top-[65%] -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-1 rounded-full text-gray-300 hover:text-white transition-colors z-10"
          aria-label="Next quote"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Motivate;