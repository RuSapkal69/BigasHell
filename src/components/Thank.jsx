import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Heart, Award, Clock } from 'lucide-react';

export default function Thank() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    },
  };

  return (
    <div className="relative w-full overflow-hidden py-24 md:py-32 bg-black" ref={containerRef}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 flex flex-col items-center px-8 md:px-16 mx-auto"
      >
        <motion.div 
          variants={itemVariants} 
          className="text-center w-full max-w-5xl mx-auto mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 px-4">
            What Our Owner Has To Say
          </h1>
          <motion.div 
            variants={{
              hidden: { width: 0 },
              visible: { 
                width: "80%",
                transition: {
                  duration: 1.2,
                  ease: "easeInOut"
                }
              }
            }}
            className="h-1 w-4/5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-full mx-auto mt-4 mb-12"
          />
          <p className="text-xl md:text-2xl leading-relaxed text-gray-300 max-w-4xl mx-auto px-6 md:px-16">
            "Our mission is to help you transform not just your body, but your entire approach to wellness. 
            We've built this gym to be a sanctuary where you can push your limits, find your strength, 
            and become part of a community that supports your journey every step of the way."
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative mb-28"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-white shadow-xl mx-auto">
            <img 
              src="/avatar.jpg" 
              alt="Gym Owner" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center mt-6 text-xl font-medium text-gray-300">Rushikesh Sapkal, Founder</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl px-4 mb-20"
        >
          {/* Box 1 */}
          <motion.div 
            className="flex flex-col items-center p-8 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(255, 255, 255, 0.2)",
              scale: 1.03
            }}
          >
            <Heart className="h-16 w-16 text-red-400 mb-6" />
            <h3 className="font-semibold text-2xl mb-4 text-white">Personalized Care</h3>
            <p className="text-lg text-center text-gray-300">Customized workout plans tailored to your unique needs and goals.</p>
          </motion.div>

          {/* Box 2 */}
          <motion.div 
            className="flex flex-col items-center p-8 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(255, 255, 255, 0.2)",
              scale: 1.03
            }}
          >
            <Award className="h-16 w-16 text-purple-400 mb-6" />
            <h3 className="font-semibold text-2xl mb-4 text-white">Expert Guidance</h3>
            <p className="text-lg text-center text-gray-300">Learn from certified trainers with years of experience in fitness.</p>
          </motion.div>

          {/* Box 3 */}
          <motion.div 
            className="flex flex-col items-center p-8 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(255, 255, 255, 0.2)",
              scale: 1.03
            }}
          >
            <Clock className="h-16 w-16 text-blue-400 mb-6" />
            <h3 className="font-semibold text-2xl mb-4 text-white">Flexible Hours</h3>
            <p className="text-lg text-center text-gray-300">Open 24/7 to accommodate your busy schedule and lifestyle.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
