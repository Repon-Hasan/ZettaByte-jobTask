'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'


type Props = {
open: boolean
onClose: () => void
children: React.ReactNode
}


export default function Modal({ open, onClose, children }: Props) {
return (
<AnimatePresence>
{open && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 z-50 flex items-center justify-center"
>
<motion.div
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.8, opacity: 0 }}
transition={{ type: 'spring', stiffness: 300, damping: 30 }}
className="bg-white rounded-lg p-6 shadow-lg w-[min(90%,720px)]"
>
<div className="flex justify-end">
<button onClick={onClose} className="text-black">Close</button>
</div>
<div className="mt-2">{children}</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
)
}