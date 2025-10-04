'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar as CalendarIcon, Plus, Clock, Video, MapPin, Book, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'group_training' | 'video_feedback' | 'one_on_one' | 'workshop';
  date: string;
  time: string;
  duration: number;
  attendees: string[];
  location: 'virtual' | 'in_person';
  meetingLink?: string;
  notes?: string;
}

export default function CalendarPage() {
  const { users, profiles } = mockData;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const events: CalendarEvent[] = [
    {
      id: 'e1',
      title: 'Strength Fundamentals Group Training',
      type: 'group_training',
      date: '2025-09-30',
      time: '18:00',
      duration: 60,
      attendees: ['user-1', 'user-2', 'user-3', 'user-4'],
      location: 'virtual',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'Focus on progressive push-up variations',
    },
    {
      id: 'e2',
      title: 'Form Check: Sarah Kim',
      type: 'video_feedback',
      date: '2025-10-01',
      time: '15:30',
      duration: 30,
      attendees: ['user-2'],
      location: 'virtual',
      meetingLink: 'https://zoom.us/j/987654321',
    },
    {
      id: 'e3',
      title: '1-on-1 Progress Review: Alex Chen',
      type: 'one_on_one',
      date: '2025-10-02',
      time: '10:00',
      duration: 45,
      attendees: ['user-1'],
      location: 'virtual',
      meetingLink: 'https://zoom.us/j/555555555',
    },
    {
      id: 'e4',
      title: 'Handstand Workshop',
      type: 'workshop',
      date: '2025-10-05',
      time: '14:00',
      duration: 120,
      attendees: ['user-1', 'user-2', 'user-5', 'user-6'],
      location: 'in_person',
      notes: 'Bring yoga mat and resistance bands',
    },
    {
      id: 'e5',
      title: 'Weekly Group Check-in',
      type: 'group_training',
      date: '2025-10-03',
      time: '19:00',
      duration: 60,
      attendees: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
      location: 'virtual',
      meetingLink: 'https://zoom.us/j/111222333',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'group_training':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white';
      case 'video_feedback':
        return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white';
      case 'one_on_one':
        return 'bg-gradient-to-br from-green-500 to-green-600 text-white';
      case 'workshop':
        return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white';
      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'group_training':
        return 'bg-blue-100 text-blue-700';
      case 'video_feedback':
        return 'bg-purple-100 text-purple-700';
      case 'one_on_one':
        return 'bg-green-100 text-green-700';
      case 'workshop':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatEventType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">TrainAI</h1>
          <p className="text-sm text-gray-500">Coach Portal</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <Activity className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/athletes"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <Users className="w-5 h-5" />
            Athletes
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <CalendarIcon className="w-5 h-5" />
            Programs
          </Link>
          <Link
            href="/exercises"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <Book className="w-5 h-5" />
            Exercise Library
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            <span className="w-5 h-5 flex items-center justify-center">💬</span>
            Chat
          </Link>
          <Link
            href="/calendar"
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium"
          >
            <CalendarIcon className="w-5 h-5" />
            Calendar
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar & Scheduling</h1>
            <p className="text-gray-600">Manage group sessions and client meetings</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Schedule Session
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'month'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'week'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'day'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayEvents = getEventsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={day}
                    className={`aspect-square border border-gray-200 rounded-lg p-2 hover:border-blue-300 transition-all cursor-pointer ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-1.5 py-0.5 rounded ${getEventTypeBadge(event.type)} truncate`}
                        >
                          {event.time.slice(0, 5)}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 px-1.5">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Sessions</span>
                  <span className="text-lg font-bold text-gray-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Group Training</span>
                  <span className="text-lg font-bold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">1-on-1s</span>
                  <span className="text-lg font-bold text-green-600">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Workshops</span>
                  <span className="text-lg font-bold text-orange-600">1</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.date + ' ' + event.time);
                  return (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg cursor-pointer hover:shadow-md transition-all ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm leading-tight">{event.title}</h4>
                        {event.location === 'virtual' ? (
                          <Video className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-90">
                        <Clock className="w-3 h-3" />
                        <span>
                          {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-90 mt-1">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* All Events List */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Scheduled Sessions</h3>
          <div className="space-y-3">
            {events
              .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
              .map((event) => {
                const eventDate = new Date(event.date + ' ' + event.time);
                const attendeeProfiles = event.attendees
                  .map(id => profiles.find(p => p.userId === id))
                  .filter(Boolean);

                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all"
                  >
                    <div className={`w-2 h-16 rounded-full ${getEventTypeColor(event.type)}`} />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEventTypeBadge(event.type)}`}>
                          {formatEventType(event.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time} ({event.duration} min)
                        </span>
                        <span className="flex items-center gap-1">
                          {event.location === 'virtual' ? (
                            <>
                              <Video className="w-4 h-4" />
                              Virtual
                            </>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4" />
                              In-Person
                            </>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {event.notes && (
                        <p className="text-sm text-gray-500 mt-2">{event.notes}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {event.meetingLink && (
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          Join
                        </a>
                      )}
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>

      {/* Create Event Modal (simplified - would expand in full implementation) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule New Session</h2>
            <p className="text-gray-600 mb-6">Session scheduling form would go here</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}