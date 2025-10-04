'use client';

import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar, ArrowUp, ArrowDown, Book, Sparkles } from 'lucide-react';
import { getCoachAnalytics } from '@/lib/mock-data';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AnalyticsPage() {
  const analytics = getCoachAnalytics();

  // Mock data for charts
  const revenueHistory = [
    { month: 'Apr', revenue: 400 },
    { month: 'May', revenue: 600 },
    { month: 'Jun', revenue: 700 },
    { month: 'Jul', revenue: 800 },
    { month: 'Aug', revenue: 900 },
    { month: 'Sep', revenue: 1000 },
  ];

  const adherenceTrend = [
    { month: 'Apr', adherence: 75 },
    { month: 'May', adherence: 78 },
    { month: 'Jun', adherence: 80 },
    { month: 'Jul', adherence: 79 },
    { month: 'Aug', adherence: 81 },
    { month: 'Sep', adherence: 82 },
  ];

  const categoryDistribution = [
    { name: 'Push', value: 28, color: '#3b82f6' },
    { name: 'Pull', value: 25, color: '#10b981' },
    { name: 'Legs', value: 22, color: '#a855f7' },
    { name: 'Core', value: 15, color: '#eab308' },
    { name: 'Other', value: 10, color: '#f97316' },
  ];

  const clientGrowth = [
    { week: 'W1', new: 1, churned: 0 },
    { week: 'W2', new: 0, churned: 0 },
    { week: 'W3', new: 2, churned: 0 },
    { week: 'W4', new: 1, churned: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white/95 backdrop-blur-sm border-r border-gray-200 p-6 shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TrainAI</h1>
          <p className="text-sm text-gray-500">Coach Portal</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Activity className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/athletes"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Users className="w-5 h-5" />
            Athletes
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Calendar className="w-5 h-5" />
            Programs
          </Link>
          <Link
            href="/exercises"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Book className="w-5 h-5" />
            Exercise Library
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <span className="w-5 h-5 flex items-center justify-center">💬</span>
            Chat
          </Link>
          <Link
            href="/calendar"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <Calendar className="w-5 h-5" />
            Calendar
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Detailed insights into your coaching business</p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">MRR</span>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                <ArrowUp className="w-3 h-3" />
                <span>25%</span>
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">${analytics.monthlyRevenue}</p>
            <p className="text-xs text-gray-500">Monthly Recurring Revenue</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Retention</span>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <ArrowUp className="w-3 h-3" />
                <span>2%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{analytics.retentionRate}%</p>
            <p className="text-xs text-gray-500">Client retention rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Engagement</span>
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <ArrowUp className="w-3 h-3" />
                <span>5%</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{analytics.engagementScore}</p>
            <p className="text-xs text-gray-500">Average engagement score</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">LTV</span>
              <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                <span>—</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">$1,200</p>
            <p className="text-xs text-gray-500">Lifetime value per client</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              <span className="text-green-600 font-semibold">↑ 150%</span> growth over 6 months
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Adherence Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={adherenceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[70, 90]} />
                <Tooltip />
                <Line type="monotone" dataKey="adherence" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              <span className="text-blue-600 font-semibold">↑ 7%</span> improvement over 6 months
            </p>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Exercise Category Focus</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              Distribution of exercises across categories
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Client Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={clientGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#10b981" name="New Clients" radius={[8, 8, 0, 0]} />
                <Bar dataKey="churned" fill="#ef4444" name="Churned" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              <span className="text-green-600 font-semibold">Net +3</span> clients this month
            </p>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Peak Engagement Times</p>
                  <p className="text-sm text-gray-600">
                    Your clients are most active between 6-8 AM and 6-8 PM. Consider scheduling live sessions during these windows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Progression Velocity</p>
                  <p className="text-sm text-gray-600">
                    Athletes in the "Strength Fundamentals" program are progressing 15% faster than average. Consider applying similar principles to other programs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Churn Risk</p>
                  <p className="text-sm text-gray-600">
                    2 clients show signs of disengagement (low adherence + decreased chat activity). Reach out for check-ins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}