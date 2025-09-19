'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './components/Card';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { scale: 1.03 },
};

export default function HomePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Dashboard Header with animated text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Dashboard Home
        </motion.h1>
        <motion.p
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-700 text-lg md:text-xl"
        >
          Welcome back! Here's a quick overview of your stats.
        </motion.p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5 }}
          className="h-64"
        >
          <Card title="Welcome" className="h-full flex flex-col justify-center items-start">
            <p className="text-sm text-slate-600">
              This is a mini dashboard UI test. Focus on clean structure, reusability, and animations.
            </p>
          </Card>
        </motion.div>

        {/* Revenue Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-64"
        >
          <Card title="Revenue (This Month)" className="h-full flex flex-col justify-center items-start">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl md:text-4xl font-bold"
            >
              $12,345
            </motion.div>
            <div className="text-sm text-slate-500 mt-2">Compared to last month</div>
          </Card>
        </motion.div>

        {/* Active Users Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-64"
        >
          <Card title="Active Users" className="h-full flex flex-col justify-center items-start">
            <motion.div
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-3xl md:text-4xl font-bold"
            >
              1,245
            </motion.div>
            <div className="text-sm text-slate-500 mt-2">Currently active</div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-48"
        >
          <Card title="Quick Links" className="h-full flex flex-col justify-center items-start">
            <ul className="text-sm space-y-2">
              <li>• Go to Posts page</li>
              <li>• Go to Users page</li>
              <li>• Use error button to test API failure</li>
            </ul>
          </Card>
        </motion.div>

        {/* Animated Chart Placeholder */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-48 flex justify-center items-center"
        >
          <Card className="h-full w-full flex justify-center items-center">
            <motion.div
              className="w-24 h-24 bg-blue-400 rounded-full"
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
