import React from "react";
import { motion } from "framer-motion";

// Parent and Child Variants
const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8, // Delay between children animations
    },
  },
};

const childLeftVariants = {
  hidden: { opacity: 0, x: -50 }, // Start faded and moved left
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Fade in and slide into position
};

const childRightVariants = {
  hidden: { opacity: 0, x: 50 }, // Start faded and moved right
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }, // Fade in and slide into position
};

const Hero = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[1100px] w-full mx-auto p-4"
      variants={parentVariants} // Apply parent variants
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Replay animation when scrolling back
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        variants={childLeftVariants} // Child animation from the left
      >
        <p className="font-semibold text-white">So you want to become</p>
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          BIGas<span>HELL</span>
        </h1>
      </motion.div>
      <motion.p
        className="font-semibold text-white p-10"
        variants={childRightVariants} // Child animation from the right
      >
        We hereby assure that whoever goes through our <span>TORTURES</span>{" "}
        and becomes a member of our <span>HELL</span> will achieve the body
        they have always dreamt of. We have the best <span>DEVILS</span> in
        the world to make your body burn as if you are in <span>HELL</span>. We
        will make you do the exercises that you have never done before. We will
        make you sweat for all the <span>SINS</span> you have committed towards
        your body.
      </motion.p>
      <motion.div
        variants={childLeftVariants} // Child animation from the left
      >
        <button
          onClick={() => {
            window.location.href = "#generate";
          }}
          className="text-white text-lg font-bold px-6 py-3 bg-red-600 rounded-lg shadow-lg shadow-red-500/50 hover:shadow-red-700/70 hover:bg-red-700 hover:scale-105 transition-transform duration-300"
        >
          Accept & Enter the Hell
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
