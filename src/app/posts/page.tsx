'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import useFetch from '../hooks/useFetch';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const { data: posts, loading, error } = useFetch<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-black">
        Loading posts...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error.message}
      </div>
    );

  if (!posts || posts.length === 0)
    return (
      <div className="flex justify-center items-center h-[60vh] text-black">
        No posts available.
      </div>
    );

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.090, // delay between each card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600"
      >
        Posts
      </motion.h1>

      {/* Posts Grid with stagger animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
          >
            <Link href={`/posts/${post.id}`}>
              <Card
                title={post.title}
                className="h-48 overflow-hidden flex flex-col justify-between text-black bg-white shadow hover:shadow-lg transition rounded-lg p-4"
              >
                <p className="text-sm text-black line-clamp-3">{post.body}</p>
                <span className="text-xs text-indigo-500 mt-2 hover:underline">
                  Read more →
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
