'use client';

import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, Activity, Calendar, MessageSquare, Video, Trophy, Book, Sparkles } from 'lucide-react';
import { mockData, getUserProgressions } from '@/lib/mock-data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AthleteDetailPage({ params }: { params: { id: string } }) {
  const { users, profiles, exercises, progressions } = mockData;

  const athlete = users.find(u => u.id === params.id);
  const profile = profiles.find(p => p.userId === params.id);
  const athleteProgressions = getUserProgressions(params.id);

  if (!athlete || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Athlete Not Found</h1>
          <Link href="/athletes" className="text-blue-600 hover:text-blue-700">
            ← Back to Athletes
          </Link>
        </div>
      </div>
    );
  }

  // Mock data
  const workoutHistory = [
    { date: 'Sep 23', completed: 1 },
    { date: 'Sep 24', completed: 0 },
    { date: 'Sep 25', completed: 1 },
    { date: 'Sep 26', completed: 1 },
    { date: 'Sep 27', completed: 0 },
    { date: 'Sep 28', completed: 1 },
    { date: 'Sep 29', completed: 0 },
  ];

  const volumeTrend = [
    { week: 'W1', sets: 45 },
    { week: 'W2', sets: 48 },
    { week: 'W3', sets: 52 },
    { week: 'W4', sets: 56 },
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
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
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
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Back Button */}
        <Link
          href="/athletes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Athletes
        </Link>

        {/* Athlete Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {profile.name?.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
                <p className="text-gray-600 mb-2">{athlete.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{profile.stats?.totalWorkouts}</span> workouts
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{athleteProgressions.length}</span> progressions
                  </span>
                  <span className="text-gray-600">
                    <span className="font-semibold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">{profile.stats?.currentStreak}</span> day streak 🔥
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-md">
                <Video className="w-4 h-4" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Adherence</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">{profile.stats?.adherenceRate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-2">
              <div
                className="h-full bg-green-500"
                style={{ width: `${profile.stats?.adherenceRate}%` }}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Personal Records</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-1">{profile.stats?.personalRecords}</p>
            <p className="text-xs text-gray-500">This week</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Avg Sets/Week</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">52</p>
            <p className="text-xs text-gray-500">+4 from last week</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Progression Rate</span>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">2.5</p>
            <p className="text-xs text-gray-500">Levels per month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Workout Consistency</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={workoutHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 1]} ticks={[0, 1]} />
                <Tooltip />
                <Bar dataKey="completed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Volume Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={volumeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sets" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals & Progressions */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Goals</h3>
            <div className="space-y-3">
              {profile.goals?.map((goal, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-900">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Progressions</h3>
            <div className="space-y-3">
              {athleteProgressions.filter(ap => ap.isCurrent).map((ap) => {
                const prog = progressions.find(p => p.id === ap.progressionId);
                const ex = exercises.find(e => e.id === ap.exerciseId);

                return (
                  <div key={ap.progressionId} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{ex?.name}</span>
                      <span className="text-xs text-gray-600">Level {prog?.level}</span>
                    </div>
                    <p className="text-xs text-gray-600">{prog?.name}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${(ap.workoutsCompleted / (prog?.criteria.minWorkouts || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {ap.workoutsCompleted} / {prog?.criteria.minWorkouts} workouts
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}