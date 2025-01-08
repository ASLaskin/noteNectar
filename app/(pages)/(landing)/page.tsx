"use client";

import { motion } from 'framer-motion';
import React from 'react';
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import BlurIn from "@/components/magicui/blur-in";
import AnimatedImage from '@/components/AnimatedImage';
import Header from '@/components/header';

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
      <Header/>
      <div className="z-0 relative min-h-screen w-full pb-40 overflow-hidden bg-[radial-gradient(97.14%_56.45%_at_51.63%_0%,_#7D56F4_0%,_#4517D7_30%,_#000_100%)]">
        <DotPattern className={cn(
          "[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]",
        )} />
        <MotionDiv
          className="relative z-10 flex flex-col items-center justify-start min-h-screen space-y-6 px-4 pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <BlurIn
              word="Make your studying easier and faster than ever before."
              className="font-display text-center text-4xl font-bold text-white w-full lg:w-auto max-w-3xl mx-auto z-10"
              duration={1}
            />
          </motion.div>
          {/* Eye-catching modern Responsive designs. Multiple layouts. Unique animations. Perfect for 2024. Free */}
          <motion.h2
            className="text-xl text-white text-opacity-60 tracking-normal text-center max-w-2xl mx-auto z-10"
            variants={itemVariants}
          >
            An all-in-one AI-powered summarization tool to help you organize notes from PowerPoints
            and further edit at your pace, streamlining your study process.
          </motion.h2>

          <motion.div variants={itemVariants} className="z-20">
            <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#FACC15] to-[#FB923C] rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              Get Started
            </button>
          </motion.div>

          {/* <motion.div variants={itemVariants}>
            <AnimatedImage
              src="/image.webp"
              alt="Image"
              width={1200}
              height={900}
              className="w-full h-auto max-w-6xl mx-auto rounded-2xl shadow-lg"
            />
          </motion.div> */}
        </MotionDiv>
      </div>
    </main>
  );
}