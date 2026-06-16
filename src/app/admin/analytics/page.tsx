'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Globe, Smartphone, Monitor, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const trafficSources = [
  { source: 'Direct', visitors: 45230, percentage: 35, color: 'from-red-500 to-orange-500' },
  { source: 'Search Engines', visitors: 32100, percentage: 25, color: 'from-blue-500 to-cyan-500' },
  { source: 'Social Media', visitors: 25800, percentage: 20, color: 'from-purple-500 to-pink-500' },
  { source: 'Referral', visitors: 15400, percentage: 12, color: 'from-green-500 to-emerald-500' },
  { source: 'Email', visitors: 10300, percentage: 8, color: 'from-yellow-500 to-amber-500' },
];

const devices = [
  { name: 'Mobile', percentage: 55, icon: Smartphone },
  { name: 'Desktop', percentage: 32, icon: Monitor },
  { name: 'Tablet', percentage: 13, icon: Globe },
];

const topMovies = [
  { title: 'The Last Horizon', views: 45231, revenue: 1200000000, growth: '+18%' },
  { title: 'Shadow Protocol', views: 38102, revenue: 450000000, growth: '+12%' },
  { title: 'Neon Samurai', views: 34156, revenue: 580000000, growth: '+25%' },
  { title: 'Eternal Garden', views: 29187, revenue: 210000000, growth: '+8%' },
  { title: 'Dragon\'s Legacy', views: 34123, revenue: 890000000, growth: '+32%' },
];

export default function AdminAnalyticsPage() {
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
            <span className="text-sm">Analytics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Track performance and growth metrics</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">{source.visitors.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${source.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Devices</h3>
            <div className="space-y-6">
              {devices.map((device) => (
                <div key={device.name} className="text-center">
                  <device.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{device.percentage}%</p>
                  <p className="text-sm text-muted-foreground">{device.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Movies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Top Performing Movies</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Views</th>
                  <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</th>
                  <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topMovies.map((m) => (
                  <tr key={m.title} className="border-b border-white/5">
                    <td className="py-3 text-sm font-medium">{m.title}</td>
                    <td className="py-3 text-sm">{m.views.toLocaleString()}</td>
                    <td className="py-3 text-sm">${(m.revenue / 1000000).toFixed(0)}M</td>
                    <td className="py-3 text-sm">
                      <span className="flex items-center gap-1 text-green-400">
                        <ArrowUpRight className="w-3 h-3" />
                        {m.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Marketing Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Marketing Readiness</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'GA4 Connected', status: true },
              { label: 'GTM Installed', status: true },
              { label: 'Conversion Tracking', status: true },
              { label: 'Heatmap Ready', status: true },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-white/5 text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${item.status ? 'bg-green-400' : 'bg-yellow-400'}`} />
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
