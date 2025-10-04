'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar, Book, Sparkles, Send, Video, Image as ImageIcon, Smile, Pin, Flag, Trash2, Search, Filter, MessageCircle, AtSign, Play, X } from 'lucide-react';
import { getCoachClients, mockData } from '@/lib/mock-data';
import { format } from 'date-fns';

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'video' | 'image';
  mediaUrl?: string;
  mentions?: string[];
  reactions?: { emoji: string; userIds: string[] }[];
  isPinned?: boolean;
  needsReview?: boolean;
}

export default function ChatPage() {
  const clients = getCoachClients();
  const { users, profiles } = mockData;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      userId: 'user-1',
      content: 'Hey everyone! Just finished today\'s workout. Feeling great! 💪',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'text',
      reactions: [{ emoji: '🔥', userIds: ['user-2', 'coach-1'] }],
    },
    {
      id: 'msg-2',
      userId: 'user-2',
      content: '@coach I uploaded a form check video for my push-ups. Could you review it?',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      type: 'video',
      mediaUrl: 'https://picsum.photos/seed/formcheck1/640/360',
      mentions: ['coach-1'],
      needsReview: true,
    },
    {
      id: 'msg-3',
      userId: 'coach-1',
      content: 'Great form Sarah! Just watch your elbow angle on the descent. Try to keep them at 45 degrees.',
      timestamp: new Date(Date.now() - 2900000).toISOString(),
      type: 'text',
      isPinned: true,
    },
    {
      id: 'msg-4',
      userId: 'user-3',
      content: 'Hit a new PR on pull-ups today! 10 reps! 🎉',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: 'text',
      reactions: [{ emoji: '💪', userIds: ['user-1', 'user-2', 'coach-1'] }, { emoji: '🎉', userIds: ['user-1'] }],
    },
    {
      id: 'msg-5',
      userId: 'user-1',
      content: '@coach When is the next group training session?',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      type: 'text',
      mentions: ['coach-1'],
      needsReview: true,
    },
  ]);

  const [input, setInput] = useState('');
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [filter, setFilter] = useState<'all' | 'mentions' | 'videos'>('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMessages = messages.filter(msg => {
    if (filter === 'mentions') return msg.mentions?.includes('coach-1');
    if (filter === 'videos') return msg.type === 'video';
    return true;
  });

  const needsReviewCount = messages.filter(m => m.needsReview).length;

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: 'coach-1',
      content: input,
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const handleReact = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);

        if (existingReaction) {
          if (existingReaction.userIds.includes('coach-1')) {
            existingReaction.userIds = existingReaction.userIds.filter(id => id !== 'coach-1');
          } else {
            existingReaction.userIds.push('coach-1');
          }
        } else {
          reactions.push({ emoji, userIds: ['coach-1'] });
        }

        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const getUserInfo = (userId: string) => {
    const user = users.find(u => u.id === userId);
    const profile = profiles.find(p => p.userId === userId);
    return { user, profile };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 p-6 shadow-lg z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TrainAI</h1>
          <p className="text-sm text-gray-500">Coach Portal</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Activity className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/athletes"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Users className="w-5 h-5" />
            Athletes
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Calendar className="w-5 h-5" />
            Programs
          </Link>
          <Link
            href="/exercises"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Book className="w-5 h-5" />
            Exercise Library
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium relative"
          >
            <span className="w-5 h-5 flex items-center justify-center">💬</span>
            Chat
            {needsReviewCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {needsReviewCount}
              </span>
            )}
          </Link>
          <Link
            href="/calendar"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <Calendar className="w-5 h-5" />
            Calendar
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg font-medium transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        <div className="flex h-screen">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Strength Fundamentals
                  </h1>
                  <p className="text-sm text-gray-600">8 members • {messages.length} messages</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === 'all'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('mentions')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      filter === 'mentions'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <AtSign className="w-4 h-4" />
                    Mentions
                    {needsReviewCount > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-white/30 rounded-full text-xs">
                        {needsReviewCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setFilter('videos')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      filter === 'videos'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Videos
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50 backdrop-blur-sm">
              {filteredMessages.map((message) => {
                const { user, profile } = getUserInfo(message.userId);
                const isCoach = user?.role === 'coach';
                const needsReview = message.needsReview;

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${needsReview ? 'ring-2 ring-orange-400 rounded-2xl p-3 bg-orange-50/50' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCoach
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-purple-200'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    } shadow-lg`}>
                      <span className="text-white font-bold text-lg">
                        {profile?.name?.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{profile?.name}</span>
                        {isCoach && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full">
                            Coach
                          </span>
                        )}
                        {message.isPinned && (
                          <Pin className="w-4 h-4 text-blue-600" />
                        )}
                        <span className="text-xs text-gray-500 ml-auto">
                          {format(new Date(message.timestamp), 'h:mm a')}
                        </span>
                      </div>

                      {/* Message Content */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>

                        {/* Video Preview */}
                        {message.type === 'video' && message.mediaUrl && (
                          <div className="mt-3 relative group">
                            <img
                              src={message.mediaUrl}
                              alt="Form check video"
                              className="w-full h-48 object-cover rounded-lg cursor-pointer"
                              onClick={() => setSelectedVideo(message.mediaUrl!)}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg group-hover:bg-black/40 transition-all cursor-pointer"
                              onClick={() => setSelectedVideo(message.mediaUrl!)}>
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-blue-600 ml-1" />
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              Form Check
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Reactions */}
                      <div className="flex items-center gap-2 mt-2">
                        {message.reactions?.map((reaction, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleReact(message.id, reaction.emoji)}
                            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all ${
                              reaction.userIds.includes('coach-1')
                                ? 'bg-blue-100 border-2 border-blue-500'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-xs font-medium">{reaction.userIds.length}</span>
                          </button>
                        ))}

                        <button
                          onClick={() => handleReact(message.id, '👍')}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Coach Actions */}
                      {needsReview && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => {
                              setMessages(prev => prev.map(m =>
                                m.id === message.id ? { ...m, needsReview: false } : m
                              ));
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                          >
                            ✓ Reviewed
                          </button>
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-all">
                            Quick Reply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end gap-3">
                <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                >
                  <Video className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                />

                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message... Use @ to mention"
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line • Use @coach to get attention
              </p>
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {[
                'Great form! Keep it up! 💪',
                'Watch your elbow angle',
                'Perfect depth on that squat',
                'Try slowing down the eccentric',
                'Excellent progress this week!',
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(template)}
                  className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg text-sm transition-all border border-blue-200"
                >
                  {template}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-gray-900 mb-4">Active Members</h3>
              <div className="space-y-2">
                {clients.slice(0, 5).map(client => (
                  <div key={client.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{client.profile?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedVideo}
              alt="Form check video"
              className="w-full rounded-xl"
            />
            <div className="mt-4 bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Provide Feedback</h3>
              <textarea
                placeholder="Write your feedback here..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  // Would send feedback here
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}