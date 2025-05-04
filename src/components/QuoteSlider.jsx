import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const QuoteSlider = ({ quote, author, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full px-6"
        >
          <div className="flex justify-center mb-2">
            <Quote className="h-5 w-5 text-white" />
          </div>
          <p className="text-xl font-semibold text-white italic leading-tight mb-2 font-serif text-shadow-md">
            "{quote}"
          </p>
          <p className="text-sm text-white font-semibold text-shadow-md italic">
            — {author}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteSlider;