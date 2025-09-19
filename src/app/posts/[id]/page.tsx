'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../components/Card';
import useFetch from '../../hooks/useFetch';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-black">
        Loading post...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error.message}
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-[60vh] text-black">
        Post not found.
      </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <AnimatePresence>
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            title={post.title}
            className="h-auto bg-white shadow-md text-black rounded-lg p-6 transition hover:shadow-lg"
          >
            <p className="text-slate-700 text-base leading-relaxed">{post.body}</p>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
