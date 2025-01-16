"use client";

import { motion } from "framer-motion";
import React from "react";
import BlurIn from "@/components/magicui/blur-in";
import Header from "@/components/landingheader";
import AnimatedImage from "@/components/AnimatedImage";
const MotionDiv = motion.div;
import Link from "next/link";
import {Bot, Notebook, Cloud} from "lucide-react"

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
              <Link href="/auth">
                <button className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                  Get Started
                </button>
              </Link>
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
      <motion.div
        className="bg-gray-50 w-full py-20"
        variants={containerVariants}
      >
        {/* Features Section */}
        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6 md:px-12"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
            variants={itemVariants}
          >
            <div className="bg-indigo-100 p-4 rounded-full">
              <Bot className="mr-2 h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">AI Summarization</h3>
            <p className="text-gray-700">
              Let our advanced AI analyze your documents and deliver concise, organized summaries in seconds.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
            variants={itemVariants}
          >
            <div className="bg-indigo-100 p-4 rounded-full">
              <Notebook className="mr-2 h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Customizable Notes</h3>
            <p className="text-gray-700">
              Edit, format, and personalize your notes in real-time with an intuitive, built-in editor.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
            variants={itemVariants}
          >
            <div className="bg-indigo-100 p-4 rounded-full">
              <Cloud className="mr-2 h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Cloud Storage</h3>
            <p className="text-gray-700">
              Store all your notes securely in the cloud and access them anytime, anywhere.
            </p>
          </motion.div>
        </MotionDiv>
      </motion.div>

      {/* Testimonials*/}
      <motion.div className="w-full bg-white py-20">
        <MotionDiv
          className="max-w-6xl mx-auto text-center space-y-16"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-extrabold text-gray-900"
            variants={itemVariants}
          >
            What Our Users Are Saying
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 shadow-md"
              variants={itemVariants}
            >
              <p className="text-gray-700">
                “NoteNectar has completely changed how I study. The AI summaries are so accurate, and the editing tools are a lifesaver!”
              </p>
              <h3 className="text-lg font-bold text-gray-900">— Sarah W.</h3>
            </motion.div>

            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 shadow-md"
              variants={itemVariants}
            >
              <p className="text-gray-700">
                “I’ve saved hours thanks to this app. It’s intuitive, fast, and just what I needed for my workflow.”
              </p>
              <h3 className="text-lg font-bold text-gray-900">— James P.</h3>
            </motion.div>

            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 shadow-md"
              variants={itemVariants}
            >
              <p className="text-gray-700">
                “The unlimited plan is a no-brainer for anyone serious about productivity. Highly recommended!”
              </p>
              <h3 className="text-lg font-bold text-gray-900">— Amanda T.</h3>
            </motion.div>
          </div>
        </MotionDiv>
      </motion.div>

      {/* Call-to-Action footer */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 w-full py-16"
        variants={containerVariants}
      >
        <MotionDiv
          className="text-center max-w-4xl mx-auto space-y-8 px-6"
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-extrabold text-white"
            variants={itemVariants}
          >
            Ready to Simplify Your Workflow?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-100"
            variants={itemVariants}
          >
            Join thousands of users who trust NoteNectar to make studying and organizing notes a breeze.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/auth">
              <button className="px-8 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
                Get Started for Free
              </button>
            </Link>
          </motion.div>
        </MotionDiv>
      </motion.div>
    </main>
  );
}
