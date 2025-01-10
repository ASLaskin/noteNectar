"use client";

import { motion } from "framer-motion";
import React from "react";
import BlurIn from "@/components/magicui/blur-in";
import Header from "@/components/landingheader";
import AnimatedImage from "@/components/AnimatedImage";
const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center">
        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center w-full max-w-6xl gap-8 px-4 py-16 md:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center md:items-start space-y-6 text-left">
            <motion.div variants={itemVariants}>
              <BlurIn
                word="NoteNectar"
                className="font-display text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600  max-w-3xl md:max-w-none text-left"
                duration={1}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <BlurIn
                word="Make studying easier than ever before."
                className="font-display text-4xl font-bold text-gray-900 max-w-3xl md:max-w-none text-left"
                duration={1}
              />
            </motion.div>

            <motion.h2
              className="text-lg md:text-xl text-gray-700 tracking-normal max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              An all-in-one AI-powered summarization tool to help you organize notes from PowerPoints
              and further edit at your pace, streamlining your study process.
            </motion.h2>

            <motion.div variants={itemVariants}>
              <button className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                Get Started
              </button>
            </motion.div>
          </div>

          <motion.div
            className="w-full flex items-center justify-center md:justify-end"
            variants={itemVariants}
          >
            <AnimatedImage
              src="/images/back.jpg"
              alt="image"
              width={1200}
              height={1200}
              className="max-w-full h-auto md:w-[100%]"
            />
          </motion.div>
        </MotionDiv>
      </div>
    </main>
  );
}
