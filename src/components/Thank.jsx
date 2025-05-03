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
    <div className="relative w-full overflow-hidden py-24 md:py-32" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-blue-100 z-0"></div>

      {/* Decorative elements with darker, more visible colors */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-40 z-0 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-400 rounded-full blur-3xl opacity-40 z-0 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-30 z-0 animate-blob animation-delay-4000"></div>
      

      
      {/* Content container with improved spacing */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 flex flex-col items-center px-8 md:px-16 mx-auto"
      >
        {/* Header with improved spacing */}
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
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-4xl mx-auto px-6 md:px-16">
            "Our mission is to help you transform not just your body, but your entire approach to wellness. 
            We've built this gym to be a sanctuary where you can push your limits, find your strength, 
            and become part of a community that supports your journey every step of the way."
          </p>
        </motion.div>

        {/* Avatar with better spacing */}
        <motion.div 
          variants={itemVariants}
          className="relative mb-28"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-white shadow-xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-blue-500 opacity-80"></div>
            <img 
              src="/api/placeholder/400/400" 
              alt="Gym Owner" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center mt-6 text-xl font-medium text-gray-700">Rushikesh Sapkal, Founder</p>
        </motion.div>

        {/* Benefits with larger cards and better spacing */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl px-4 mb-20"
        >
          <motion.div 
            className="flex flex-col items-center p-8 bg-red-50 rounded-xl shadow-lg hover:bg-red-100 transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.2)",
              scale: 1.03
            }}
          >
            <motion.div
              whileHover={{ rotate: [0, 15, -15, 0], scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="h-16 w-16 text-red-500 mb-6" />
            </motion.div>
            <h3 className="font-semibold text-2xl mb-4">Personalized Care</h3>
            <p className="text-lg text-center text-gray-600">Customized workout plans tailored to your unique needs and goals.</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-8 bg-purple-50 rounded-xl shadow-lg hover:bg-purple-100 transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.2)",
              scale: 1.03
            }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Award className="h-16 w-16 text-purple-500 mb-6" />
            </motion.div>
            <h3 className="font-semibold text-2xl mb-4">Expert Guidance</h3>
            <p className="text-lg text-center text-gray-600">Learn from certified trainers with years of experience in fitness.</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-8 bg-blue-50 rounded-xl shadow-lg hover:bg-blue-100 transition-all duration-500"
            whileHover={{ 
              y: -12, 
              boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.2)",
              scale: 1.03
            }}
          >
            <motion.div
              whileHover={{ rotate: [0, 180, 360], scale: 1.2 }}
              transition={{ duration: 0.8 }}
            >
              <Clock className="h-16 w-16 text-blue-500 mb-6" />
            </motion.div>
            <h3 className="font-semibold text-2xl mb-4">Flexible Hours</h3>
            <p className="text-lg text-center text-gray-600">Open 24/7 to accommodate your busy schedule and lifestyle.</p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Add animation styles for the blob and cursor effects */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}