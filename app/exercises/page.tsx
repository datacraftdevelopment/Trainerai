'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar, Plus, Edit, Trash2, Book, ChevronDown, ChevronUp, Video, Sparkles } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

export default function ExercisesPage() {
  const { exercises, progressions, userProgressions } = mockData;
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [showNewExerciseModal, setShowNewExerciseModal] = useState(false);
  const [showNewProgressionModal, setShowNewProgressionModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const categories = ['Push', 'Pull', 'Legs', 'Core', 'Hand Balance', 'Flexibility'];

  // Count athletes using each exercise
  const getAthleteCount = (exerciseId: string) => {
    return userProgressions.filter(up => up.exerciseId === exerciseId && up.isCurrent).length;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Push': 'bg-blue-100 text-blue-700',
      'Pull': 'bg-green-100 text-green-700',
      'Legs': 'bg-purple-100 text-purple-700',
      'Core': 'bg-yellow-100 text-yellow-700',
      'Hand Balance': 'bg-pink-100 text-pink-700',
      'Flexibility': 'bg-orange-100 text-orange-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

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
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Exercise Library</h1>
            <p className="text-gray-600">Manage exercises and progression levels</p>
          </div>
          <button
            onClick={() => setShowNewExerciseModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Exercise
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <p className="text-sm font-medium text-gray-600 mb-2">Total Exercises</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{exercises.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <p className="text-sm font-medium text-gray-600 mb-2">Progression Levels</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{progressions.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <p className="text-sm font-medium text-gray-600 mb-2">Categories</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">{categories.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <p className="text-sm font-medium text-gray-600 mb-2">Avg Levels/Exercise</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              {(progressions.length / exercises.length).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryExercises = exercises.filter(ex => ex.category === category);

            return (
              <div key={category}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{category}</h2>
                <div className="space-y-3">
                  {categoryExercises.map((exercise) => {
                    const exerciseProgressions = progressions.filter(p => p.exerciseId === exercise.id);
                    const isExpanded = expandedExercise === exercise.id;
                    const athleteCount = getAthleteCount(exercise.id);

                    return (
                      <div
                        key={exercise.id}
                        className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {/* Exercise Header */}
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(exercise.category)}`}>
                                  {exercise.category}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {exerciseProgressions.length} levels
                                </span>
                                <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                  <Users className="w-3 h-3" />
                                  {athleteCount} {athleteCount === 1 ? 'athlete' : 'athletes'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Difficulty: {exercise.difficultyBase}/10</span>
                                <span>•</span>
                                <span>Muscles: {exercise.musclesWorked.join(', ')}</span>
                                {exercise.equipment.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>Equipment: {exercise.equipment.join(', ')}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => {
                                  setSelectedExercise(exercise.id);
                                  setShowNewProgressionModal(true);
                                }}
                                className="px-3 py-1.5 text-sm bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition-colors"
                              >
                                Add Level
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Progressions (Expanded) */}
                        {isExpanded && (
                          <div className="border-t border-gray-200 bg-gray-50 p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Progression Levels</h4>
                            <div className="space-y-2">
                              {exerciseProgressions.map((prog) => (
                                <div
                                  key={prog.id}
                                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                        L{prog.level}
                                      </div>
                                      <div>
                                        <h5 className="font-semibold text-gray-900">{prog.name}</h5>
                                        <p className="text-xs text-gray-500">
                                          Criteria: {prog.criteria.minSets}x{prog.criteria.minReps} for {prog.criteria.minWorkouts} workouts
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                        <Video className="w-4 h-4" />
                                      </button>
                                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-gray-600 font-medium mb-1">Form Cues:</p>
                                      <ul className="space-y-0.5">
                                        {prog.formCues.map((cue, idx) => (
                                          <li key={idx} className="text-gray-700 text-xs">• {cue}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p className="text-gray-600 font-medium mb-1">Common Mistakes:</p>
                                      <ul className="space-y-0.5">
                                        {prog.commonMistakes.map((mistake, idx) => (
                                          <li key={idx} className="text-gray-700 text-xs">• {mistake}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <img
                                      src={prog.thumbnailUrl}
                                      alt={prog.name}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* New Exercise Modal */}
      {showNewExerciseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Exercise</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Name</label>
                <input
                  type="text"
                  placeholder="e.g., Diamond Push-up"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the exercise..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                  <input
                    type="text"
                    placeholder="Pull-up bar, Rings"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Muscles Worked</label>
                <input
                  type="text"
                  placeholder="Chest, Triceps, Shoulders"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewExerciseModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewExerciseModal(false);
                  // In real app, would save the exercise
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Exercise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Progression Modal */}
      {showNewProgressionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Progression Level</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level Name</label>
                <input
                  type="text"
                  placeholder="e.g., Archer Push-up"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level Number</label>
                <input
                  type="number"
                  min="1"
                  placeholder="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Workouts</label>
                  <input
                    type="number"
                    placeholder="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Sets</label>
                  <input
                    type="number"
                    placeholder="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Reps</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Form Cues (one per line)</label>
                <textarea
                  placeholder="Keep body straight&#10;Hands shoulder-width apart&#10;Control the descent"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Mistakes (one per line)</label>
                <textarea
                  placeholder="Sagging hips&#10;Flaring elbows too wide"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowNewProgressionModal(false);
                  setSelectedExercise(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewProgressionModal(false);
                  setSelectedExercise(null);
                  // In real app, would save the progression
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Progression Level
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}