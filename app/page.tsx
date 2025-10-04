'use client';

import Link from 'next/link';
import { Users, TrendingUp, DollarSign, Activity, AlertCircle, Calendar, Book, Sparkles } from 'lucide-react';
import { getCurrentCoach, getCoachClients, getCoachAnalytics } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function DashboardPage() {
  const coach = getCurrentCoach();
  const clients = getCoachClients();
  const analytics = getCoachAnalytics();

  // Mock data for charts
  const weeklyActivity = [
    { day: 'Mon', workouts: 8 },
    { day: 'Tue', workouts: 7 },
    { day: 'Wed', workouts: 9 },
    { day: 'Thu', workouts: 6 },
    { day: 'Fri', workouts: 8 },
    { day: 'Sat', workouts: 5 },
    { day: 'Sun', workouts: 4 },
  ];

  const progressionTrend = [
    { month: 'Jul', count: 12 },
    { month: 'Aug', count: 18 },
    { month: 'Sep', count: 25 },
  ];

  const needsAttention = clients.filter(c => (c.profile?.stats?.adherenceRate || 0) < 60);

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
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
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
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg font-medium transition-all duration-200 hover:translate-x-1"
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900">{coach.profile?.name}</p>
            <p className="text-xs text-gray-600">Coach</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {coach.profile?.name?.split(' ')[0]}!</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 this month</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">{analytics.totalClients}</p>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+3%</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">{analytics.averageAdherence}%</p>
            <p className="text-sm text-gray-600">Avg Adherence</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+$200</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">${analytics.monthlyRevenue}</p>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+0.3</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-1">{analytics.progressionRate}</p>
            <p className="text-sm text-gray-600">Progressions/Month</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="workouts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Progression Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={progressionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Needs Attention Alert */}
        {needsAttention.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-1">
                  {needsAttention.length} {needsAttention.length === 1 ? 'Client Needs' : 'Clients Need'} Attention
                </h3>
                <p className="text-sm text-orange-800 mb-3">
                  The following clients have adherence below 60% and may need extra support:
                </p>
                <div className="flex flex-wrap gap-2">
                  {needsAttention.map(client => (
                    <Link
                      key={client.id}
                      href={`/athletes/${client.id}`}
                      className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-orange-900 hover:bg-orange-100 transition-colors"
                    >
                      {client.profile?.name} ({client.profile?.stats?.adherenceRate}%)
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Client Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Client Overview</h3>
            <Link href="/athletes" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {clients.slice(0, 5).map(client => (
              <div key={client.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {client.profile?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{client.profile?.name}</p>
                    <p className="text-sm text-gray-600">
                      {client.progressionCount} progressions • {client.profile?.stats?.totalWorkouts} workouts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Adherence</p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            (client.profile?.stats?.adherenceRate || 0) >= 80
                              ? 'bg-green-500'
                              : (client.profile?.stats?.adherenceRate || 0) >= 60
                              ? 'bg-yellow-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${client.profile?.stats?.adherenceRate || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {client.profile?.stats?.adherenceRate || 0}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Streak</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {client.profile?.stats?.currentStreak || 0} days
                    </p>
                  </div>
                  <Link
                    href={`/athletes/${client.id}`}
                    className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}