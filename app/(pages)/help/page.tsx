"use client";

import { motion } from "framer-motion";
import Header from "@/components/landingheader";
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

export default function HelpPage() {
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
              Help Center
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
          </motion.div>

          {/* FAQ Section */}
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {/* FAQ Item 1 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                How do I get started?
              </h2>
              <p className="text-gray-700">
                To get started, sign up for an account and upload your first document to begin summarizing.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Can I upgrade my plan later?
              </h2>
              <p className="text-gray-700">
                Yes! You can upgrade or downgrade your plan anytime from your account settings.
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                What payment methods are accepted?
              </h2>
              <p className="text-gray-700">
                We accept all major credit cards and online payment methods for your convenience.
              </p>
            </motion.div>

            {/* FAQ Item 4 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Where can I find my stored documents?
              </h2>
              <p className="text-gray-700">
                Your stored documents are available in the dashboard under the "Stored Notes" section.
              </p>
            </motion.div>
          </MotionDiv>

          {/* Contact Section */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-gray-900">
              Still Need Help?
            </h2>
            <p className="text-gray-700">
              Reach out to our support team, and we’ll get back to you as soon as possible.
            </p>
            <button className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
              Contact Support
            </button>
          </motion.div>
        </MotionDiv>
      </div>
    </main>
  );
}
