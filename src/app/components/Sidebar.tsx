// Sidebar.tsx (Server Component)
import { auth } from '@/auth';
import SidebarClient from './SidebarClient';


export default async function Sidebar() {
  const session = await auth(); // ✅ server-side session
  return <SidebarClient session={session} />;
}
