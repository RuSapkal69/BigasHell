import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import { Volume2, VolumeX } from 'lucide-react';

// Parent and Child Variants
const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
};

const childLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const childRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Hero = () => {

  const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
  
    // Toggle mute/unmute function
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
      }
    };
  
    // Set initial mute state when component mounts
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
      }
    }, []);
  

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/BigasHell-_quality.jpg')`, // You'll need to add this image to your public folder
          filter: 'brightness(0.9)'
        }}
      ></div>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* NavBar at top */}
        <NavBar />
        
        <motion.div
          className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] max-w-[1400px] w-full mx-auto p-4"
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Left Section: Text Content */}
          <motion.div 
            className="flex flex-col justify-center items-start lg:w-2/5 space-y-8 pt-8 lg:pt-0"
            variants={childLeftVariants}
          >
            <div className="w-full">
              <p className="font-semibold text-white text-xl">So you want to become</p>
              <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
                BIGas<span className="text-red-600">HELL</span>
              </h1>
            </div>
            
            <motion.p
              className="font-semibold text-white text-lg"
              variants={childRightVariants}
            >
              We hereby assure that whoever goes through our <span className="text-red-600">TORTURES</span>{" "}
              and becomes a member of our <span className="text-red-600">HELL</span> will achieve the body
              they have always dreamt of. We have the best <span className="text-red-600">DEVILS</span> in
              the world to make your body burn as if you are in <span className="text-red-600">HELL</span>.
            </motion.p>
            
            <motion.div variants={childLeftVariants}>
              <button
                onClick={() => {
                  window.location.href = "#explore";
                }}
                className="text-white text-lg font-bold px-6 py-3 bg-red-600 rounded-lg shadow-lg shadow-red-500/50 hover:shadow-red-700/70 hover:bg-red-700 hover:scale-105 transition-transform duration-300"
              >
                Explore
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Section: Video Container - Now Larger */}
          <motion.div 
            className="lg:w-3/5 flex items-center justify-center mt-10 lg:mt-0 px-4 relative"
            variants={childRightVariants}
          >
            <div className="w-full aspect-video bg-black bg-opacity-40 rounded-lg border border-gray-700 shadow-2xl shadow-red-900/20">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <video 
                  className="w-full h-full object-cover rounded-lg"
                  src="./BigasHell gym promo video.mp4"
                  type="video/mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  ref={videoRef}
                  
                ></video>
              </div>
            </div>
              {/* Audio Control Button */}
              <button 
                onClick={toggleMute}
                className="absolute bottom-20 right-2 max-sm:bottom-0 md:bottom-0 lg:bottom-20 p-5 bg-transparent text-white"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX size={28} />
                ) : (
                  <Volume2 size={28} />
                )}
              </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;