import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteSlider = ({ quote, author, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg font-medium text-white italic leading-tight mb-2 font-serif">
            "{quote}"
          </p>
          <p className="text-sm text-gray-400">
            — {author}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteSlider;