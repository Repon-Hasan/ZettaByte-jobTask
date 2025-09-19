'use client'
import React, { useState } from 'react'
import { Menu } from 'lucide-react' // ✅ hamburger icon

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between p-[22px] border-b bg-white">
      {/* Left side */}
      <div className="text-slate-600 font-medium text-base sm:text-lg">
        Welcome To the DashBoard 👋
      </div>

      {/* Right side */}
      <div className="hidden sm:block text-sm text-slate-500">
        Dashboard
      </div>

   

    
    </header>
  )
}
