'use client';

import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar, Plus, Copy, Edit, Trash2, Book, Sparkles } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

export default function ProgramsPage() {
  const { exercises } = mockData;

  const programs = [
    {
      id: '1',
      name: 'Strength Fundamentals',
      description: 'Build a solid foundation in bodyweight strength',
      duration: 12,
      workoutsPerWeek: 3,
      level: 'beginner',
      activeClients: 8,
      exercises: 12,
    },
    {
      id: '2',
      name: 'Advanced Hand Balancing',
      description: 'Master freestanding handstands and variations',
      duration: 16,
      workoutsPerWeek: 4,
      level: 'advanced',
      activeClients: 2,
      exercises: 15,
    },
    {
      id: '3',
      name: 'Push/Pull Power',
      description: 'Increase upper body strength with progressive overload',
      duration: 8,
      workoutsPerWeek: 4,
      level: 'intermediate',
      activeClients: 5,
      exercises: 10,
    },
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
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Programs</h1>
            <p className="text-gray-600">Create and manage training programs</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
            <Plus className="w-5 h-5" />
            Create Program
          </button>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        program.level === 'beginner'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : program.level === 'intermediate'
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{program.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{program.duration} weeks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>{program.workoutsPerWeek}x per week</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💪</span>
                      <span>{program.exercises} exercises</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{program.activeClients} active clients</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-md">
                  Assign to Athletes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Program Builder Preview */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
              ✨
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Program Builder</h3>
              <p className="text-gray-700 mb-4">
                Create custom training programs with our drag-and-drop builder. Set progression rules, rest periods, and auto-scaling intensity.
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Open Builder
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}