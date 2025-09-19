'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function UsersPage() {
  const { data: users, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-black">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-600">Users</h1>

      {/* ✅ Responsive Table (Table for md+, Cards for mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.map((user) => (
              <motion.tr
                key={user.id}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(239,246,255,0.5)' }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <td className="px-4 py-3 text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-gray-800">{user.email}</td>
                <td className="px-4 py-3 text-gray-800">{user.company.name}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {users?.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <h3 className="text-lg font-semibold text-indigo-600">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
          </motion.div>
        ))}
      </div>

      {/* ✅ User Modal */}
      <AnimatePresence>
        {selectedUser && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
            />

            {/* Modal */}
            <motion.div
              className="
                fixed z-50 bg-white shadow-lg p-6 
                w-full max-h-[90vh] overflow-y-auto
                bottom-0 left-0 right-0 rounded-t-xl
                md:w-[95%] md:max-w-lg md:rounded-xl
                md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2
              "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-2xl font-bold mb-2 text-indigo-600">{selectedUser.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Website:</strong> {selectedUser.website}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Company:</strong> {selectedUser.company.name} – {selectedUser.company.catchPhrase}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Address:</strong> {selectedUser.address.suite}, {selectedUser.address.street},{' '}
                {selectedUser.address.city}, {selectedUser.address.zipcode}
              </p>
              <button
                onClick={() => setSelectedUser(null)}
                className="mt-2 px-4 py-2 w-full md:w-auto bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
