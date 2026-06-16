'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreHorizontal, Shield, Ban, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { AdminUser } from '@/types/movie';

const mockUsers: AdminUser[] = [
  { id: 1, name: 'Alex Morgan', email: 'alex@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15', lastActive: '2025-06-15', moviesReviewed: 142, reportsFiled: 3 },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'moderator', status: 'active', joinDate: '2024-03-20', lastActive: '2025-06-14', moviesReviewed: 89, reportsFiled: 12 },
  { id: 3, name: 'Marcus Johnson', email: 'marcus@example.com', role: 'editor', status: 'active', joinDate: '2024-06-10', lastActive: '2025-06-13', moviesReviewed: 56, reportsFiled: 1 },
  { id: 4, name: 'Priya Patel', email: 'priya@example.com', role: 'user', status: 'active', joinDate: '2024-08-05', lastActive: '2025-06-15', moviesReviewed: 23, reportsFiled: 5 },
  { id: 5, name: 'James Wilson', email: 'james@example.com', role: 'user', status: 'suspended', joinDate: '2024-02-28', lastActive: '2025-05-01', moviesReviewed: 12, reportsFiled: 8 },
  { id: 6, name: 'Yuki Tanaka', email: 'yuki@example.com', role: 'moderator', status: 'active', joinDate: '2024-04-15', lastActive: '2025-06-12', moviesReviewed: 134, reportsFiled: 7 },
  { id: 7, name: 'Amara Okafor', email: 'amara@example.com', role: 'user', status: 'active', joinDate: '2024-09-01', lastActive: '2025-06-10', moviesReviewed: 45, reportsFiled: 2 },
  { id: 8, name: 'Liam O\'Brien', email: 'liam@example.com', role: 'user', status: 'banned', joinDate: '2024-01-10', lastActive: '2025-03-15', moviesReviewed: 3, reportsFiled: 15 },
];

const roleColors: Record<string, string> = {
  admin: 'bg-red-500/10 text-red-400',
  moderator: 'bg-blue-500/10 text-blue-400',
  editor: 'bg-green-500/10 text-green-400',
  user: 'bg-gray-500/10 text-gray-400',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400',
  suspended: 'bg-yellow-500/10 text-yellow-400',
  banned: 'bg-red-500/10 text-red-400',
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-white transition-colors">Admin</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm">Users</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage users, roles, and permissions</p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        {/* Users Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Reviews</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Last Active</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-sm font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusColors[user.status]}`}>
                        {user.status === 'active' && <CheckCircle className="w-3 h-3" />}
                        {user.status === 'suspended' && <Ban className="w-3 h-3" />}
                        {user.status === 'banned' && <Ban className="w-3 h-3" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm">{user.moviesReviewed}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
