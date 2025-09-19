'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FileText,
  Users,
  UserRound,
  LogOut,
  LogIn,
  X,
  Menu,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import type { Session } from 'next-auth';

interface SidebarClientProps {
  session: Session | null;
}

export default function SidebarClient({ session }: SidebarClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', icon: <Home size={20} /> },
    { href: '/posts', label: 'Posts', icon: <FileText size={20} /> },
    { href: '/users', label: 'Users', icon: <Users size={20} /> },
  ];

  const getLinkClasses = (href: string) =>
    `block p-3 rounded flex items-center gap-3 transition ${
      pathname === href
        ? 'bg-indigo-100 text-indigo-600 font-medium'
        : 'hover:bg-slate-100 text-gray-700'
    }`;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: '/' });
      Swal.fire({
        title: 'Logged Out!',
        text: 'You have successfully logged out.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // ✅ SweetAlert for successful login
  useEffect(() => {
    if (session && typeof window !== 'undefined') {
      const loginFlag = localStorage.getItem('loginSuccess');
      if (loginFlag) {
        Swal.fire({
          title: 'Login Successful 🎉',
          text: `Welcome back, ${session.user?.name || 'User'}!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        localStorage.removeItem('loginSuccess'); // prevent repeat alerts
      }
    }
  }, [session]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b bg-white fixed top-0 left-0 right-0 z-40">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded hover:bg-slate-100 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-screen bg-white border-r shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Mini Dashboard</h2>
          )}
          <button
            aria-label="Toggle sidebar"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-slate-100 transition"
          >
            {collapsed ? '➡' : '⬅'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={getLinkClasses(item.href)}>
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}

            {/* Session Links */}
            {session ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className={getLinkClasses('/profile')}
                  >
                    <UserRound size={20} />
                    {!collapsed && <span>Profile</span>}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 rounded hover:bg-slate-100 flex items-center gap-3 text-gray-700"
                  >
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className={getLinkClasses('/login')}>
                  <LogIn size={20} />
                  {!collapsed && <span>Login</span>}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 text-sm text-slate-500 border-t">v1.0.0</div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-50 flex flex-col pt-16 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Mini Dashboard</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded hover:bg-slate-100 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={getLinkClasses(item.href)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}

                {session ? (
                  <>
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className={getLinkClasses('/profile')}
                      >
                        <UserRound size={20} />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block p-3 rounded hover:bg-slate-100 flex items-center gap-3 text-gray-700"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={getLinkClasses('/login')}
                    >
                      <LogIn size={20} />
                      <span>Login</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 text-sm text-slate-500 border-t">v1.0.0</div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
