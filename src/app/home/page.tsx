import { auth } from '@/auth';
import React from 'react';

async function Page() {
  // ✅ Get session on server
  const session = await auth();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Profile Page</h1>
      {session ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {session.user?.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          )}
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}

export default Page;
