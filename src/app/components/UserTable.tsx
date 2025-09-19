'use client'
import React from 'react'
import { motion } from 'framer-motion'


type User = {
id: number
name: string
email: string
company: { name: string }
phone?: string
website?: string
}


export default function UserTable({ users, onRowClick }: { users: User[]; onRowClick: (u: User) => void }) {
return (
<div className="overflow-auto bg-white rounded shadow">
<table className="min-w-full divide-y">
<thead className="bg-slate-50">
<tr>
<th className="p-3 text-left text-sm">Name</th>
<th className="p-3 text-left text-sm">Email</th>
<th className="p-3 text-left text-sm">Company</th>
</tr>
</thead>
<tbody>
{users.map((u) => (
<motion.tr
key={u.id}
onClick={() => onRowClick(u)}
whileHover={{ scale: 1.01 }}
className="cursor-pointer border-t"
>
<td className="p-3">{u.name}</td>
<td className="p-3">{u.email}</td>
<td className="p-3">{u.company.name}</td>
</motion.tr>
))}
</tbody>
</table>
</div>
)
}