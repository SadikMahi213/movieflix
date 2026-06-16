'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Users, Film, DollarSign, Eye, Clock,
  ArrowUpRight, ArrowDownRight, Activity,
  FilmIcon, BarChart3, Settings, MessageSquare,
  Calendar, Search, Shield,
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', trend: 'up', icon: DollarSign },
  { label: 'Active Users', value: '48,230', change: '+8.2%', trend: 'up', icon: Users },
  { label: 'Total Movies', value: '1,847', change: '+3.1%', trend: 'up', icon: Film },
  { label: 'Total Views', value: '12.5M', change: '+18.7%', trend: 'up', icon: Eye },
  { label: 'Watch Time', value: '2.8M hrs', change: '+22.3%', trend: 'up', icon: Clock },
  { label: 'Avg. Rating', value: '7.8', change: '+0.4%', trend: 'up', icon: TrendingUp },
];

const adminModules = [
  { label: 'Movie Management', href: '/admin/movies', icon: FilmIcon, desc: 'Add, edit, and manage movies' },
  { label: 'User Management', href: '/admin/users', icon: Users, desc: 'Manage users and permissions' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, desc: 'View detailed analytics' },
  { label: 'Reviews', href: '#', icon: MessageSquare, desc: 'Moderate user reviews' },
  { label: 'Content Schedule', href: '#', icon: Calendar, desc: 'Schedule content releases' },
  { label: 'SEO Settings', href: '#', icon: Search, desc: 'Manage SEO configurations' },
  { label: 'Site Settings', href: '#', icon: Settings, desc: 'General site settings' },
  { label: 'Roles & Permissions', href: '#', icon: Shield, desc: 'Manage access control' },
];

const revenueData = [
  { month: 'Jan', revenue: 180000, users: 32000 },
  { month: 'Feb', revenue: 195000, users: 34000 },
  { month: 'Mar', revenue: 210000, users: 36000 },
  { month: 'Apr', revenue: 225000, users: 38000 },
  { month: 'May', revenue: 240000, users: 41000 },
  { month: 'Jun', revenue: 260000, users: 43000 },
  { month: 'Jul', revenue: 275000, users: 45000 },
  { month: 'Aug', revenue: 290000, users: 47000 },
  { month: 'Sep', revenue: 310000, users: 49000 },
  { month: 'Oct', revenue: 325000, users: 50000 },
  { month: 'Nov', revenue: 340000, users: 51000 },
  { month: 'Dec', revenue: 360000, users: 53000 },
];

export default function AdminDashboard() {
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxUsers = Math.max(...revenueData.map(d => d.users));

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here&apos;s your overview.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-4 h-4 text-primary" />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-lg md:text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Revenue Overview
            </h3>
            <div className="flex items-end gap-1.5 h-40">
              {revenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(d.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/60 to-primary transition-all hover:from-primary hover:to-primary/80 cursor-pointer"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              User Growth
            </h3>
            <div className="flex items-end gap-1.5 h-40">
              {revenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {(d.users / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-purple-500/60 to-purple-500 transition-all hover:from-purple-500 hover:to-purple-500/80 cursor-pointer"
                    style={{ height: `${(d.users / maxUsers) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Admin Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-6">Administration</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adminModules.map((module) => (
              <Link
                key={module.label}
                href={module.href}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all group"
              >
                <module.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm">{module.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{module.desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
