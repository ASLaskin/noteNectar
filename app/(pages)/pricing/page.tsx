"use client";

import { motion } from "framer-motion";
import React from "react";
import Header from "@/components/header";
const MotionDiv = motion.div;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

export default function PricingPage() {
  return (
    <main>
      <Header />
      <div className="relative min-h-screen w-full bg-white pt-24 flex flex-col items-center justify-center">
        <MotionDiv
          className="max-w-6xl w-full px-6 md:px-12 space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h1 className="text-5xl pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Pricing Plans
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Flexible pricing for everyone, designed to meet your needs. Choose a plan and start
              simplifying your workflow today.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {/* Pay-As-You-Go Plan */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                Pay-As-You-Go
              </h2>
              <p className="text-gray-600 mb-6">
                Purchase credits as you need them with no commitments.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> $10 for 50 credits
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> $20 for 120 credits
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> $50 for 350 credits
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                Buy Credits
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                Pro Plan
              </h2>
              <p className="text-gray-600 mb-6">
                Best for users who need a consistent number of credits each month.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> 250 credits/month
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> Priority Support
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> $19.99/month
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                Subscribe to Pro
              </button>
            </motion.div>

            {/* Unlimited Plan */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                Unlimited Plan
              </h2>
              <p className="text-gray-600 mb-6">
                For power users who need unlimited access to all features.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> Unlimited credits
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> Premium Support
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✔</span> $49.99/month
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                Subscribe to Unlimited
              </button>
            </motion.div>
          </MotionDiv>

          {/* Footer Note */}
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-gray-700">
              Not sure which plan is right for you? Start with Pay-As-You-Go and upgrade anytime!
            </p>
          </motion.div>
        </MotionDiv>
      </div>
    </main>
  );
}
