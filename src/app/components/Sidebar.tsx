// Sidebar.tsx (Server Component)
import { auth } from '@/auth';
import SidebarClient from './SidebarClient';


export default async function Sidebar() {
  const session = await auth(); // ✅ server-side session
  return <SidebarClient session={session} />;
}

// Sidebar.tsx (Server Component)
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth/next";
// import SidebarClient from "./SidebarClient";

// export default async function Sidebar() {
//   const session = await getServerSession(authOptions);
//   return <SidebarClient session={session} />;
// }
