import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gymQuotes } from "../../utils/gym-quotes";

export default function MotivationalQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % gymQuotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black/80 z-0"></div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1] opacity-40"
        style={{ backgroundImage: "url('/BigasHell.jpg')" }}
      ></div>

      <div className="relative z-10 max-w-lg text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-6xl mb-6"
            >
              "
            </motion.div>

            <motion.p
              className="text-white text-xl md:text-2xl font-bold mb-6"
              animate={{
                scale: [1, 1.02, 1],
                transition: { duration: 4, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              {gymQuotes[currentQuote].quote}
            </motion.p>

            <motion.p className="text-gray-300 text-lg">{gymQuotes[currentQuote].author}</motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 flex space-x-2">
        {gymQuotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full ${index === currentQuote ? "bg-red-600" : "bg-gray-600"}`}
          />
        ))}
      </div>
    </div>
  );
}