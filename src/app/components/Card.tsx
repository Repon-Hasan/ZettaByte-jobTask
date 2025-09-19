'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <motion.div
      className={`bg-white border rounded-lg shadow p-4 hover:shadow-lg transition-shadow ${className}`}
      whileHover={{ scale: 1.03 }}
      layout
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </motion.div>
  );
}
