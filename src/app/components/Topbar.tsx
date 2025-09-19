'use client'
import React from 'react'
export default function Topbar() {
  

  return (
    <header className="flex items-center justify-between p-[22px] border-b bg-white">
      {/* Left side */}
      <div className="text-slate-600 font-medium text-base sm:text-lg">
        Welcome To the DashBoard 👋
      </div>

      {/* Right side */}
      <div className="hidden sm:block text-sm text-black">
        Dashboard
      </div>

   

    
    </header>
  )
}
