'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Camera, Video, Plus, Smile, Users } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'video' | 'image';
  mediaUrl?: string;
  reactions?: { emoji: string; userIds: string[] }[];
}

export default function ChatPage() {
  const { users, profiles, coaches } = mockData;
  const currentUserId = 'user-1';
  const currentUser = users.find(u => u.id === currentUserId);
  const currentProfile = profiles.find(p => p.userId === currentUserId);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      userId: 'coach-1',
      content: 'Morning team! Remember to focus on form quality today. Take your time with each rep. 💪',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'text',
    },
    {
      id: 'm2',
      userId: 'user-2',
      content: 'Just hit a new PR on push-ups! 🎉',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      type: 'text',
      reactions: [
        { emoji: '🔥', userIds: ['user-1', 'user-3', 'coach-1'] },
        { emoji: '💪', userIds: ['user-4'] },
      ],
    },
    {
      id: 'm3',
      userId: 'user-3',
      content: 'Can you check my handstand form? I feel like my shoulders might be too far forward.',
      timestamp: new Date(Date.now() - 2400000).toISOString(),
      type: 'video',
      mediaUrl: '/videos/handstand-check.mp4',
    },
    {
      id: 'm4',
      userId: 'coach-1',
      content: 'Great progress! Your shoulder positioning looks much better. Keep engaging those scapulas.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: 'text',
    },
    {
      id: 'm5',
      userId: 'user-4',
      content: "Anyone else feeling the burn from yesterday's leg workout? 😅",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: 'text',
      reactions: [
        { emoji: '😂', userIds: ['user-1', 'user-2'] },
      ],
    },
    {
      id: 'm6',
      userId: currentUserId,
      content: 'Definitely! DOMS is real today 🦵',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      type: 'text',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      userId: currentUserId,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  };

  const handleReact = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);

          if (existingReaction) {
            if (existingReaction.userIds.includes(currentUserId)) {
              // Remove reaction
              const updatedUserIds = existingReaction.userIds.filter(id => id !== currentUserId);
              if (updatedUserIds.length === 0) {
                return {
                  ...msg,
                  reactions: reactions.filter(r => r.emoji !== emoji),
                };
              }
              return {
                ...msg,
                reactions: reactions.map(r =>
                  r.emoji === emoji ? { ...r, userIds: updatedUserIds } : r
                ),
              };
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: reactions.map(r =>
                  r.emoji === emoji ? { ...r, userIds: [...r.userIds, currentUserId] } : r
                ),
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [...reactions, { emoji, userIds: [currentUserId] }],
            };
          }
        }
        return msg;
      })
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const quickEmojis = ['🔥', '💪', '👍', '🎉', '😂', '❤️'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Team Chat</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {users.filter(u => u.role === 'athlete').length} members
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Users className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map(msg => {
          const msgUser = users.find(u => u.id === msg.userId);
          const msgProfile = profiles.find(p => p.userId === msg.userId);
          const isCoach = msg.userId === 'coach-1';
          const isCurrentUser = msg.userId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              {!isCurrentUser && (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                    isCoach
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}
                >
                  {msgProfile?.name?.charAt(0) || msgUser?.email?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className={`flex-1 ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                {/* Name and time */}
                <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-semibold text-gray-900">
                    {isCurrentUser ? 'You' : msgProfile?.name || msgUser?.email}
                  </span>
                  {isCoach && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                      Coach
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isCurrentUser
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  {msg.type === 'video' ? (
                    <div className="space-y-2">
                      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                            <Video className="w-8 h-8 text-white ml-1" />
                          </button>
                        </div>
                      </div>
                      {msg.content && (
                        <p className={isCurrentUser ? 'text-white' : 'text-gray-900'}>
                          {msg.content}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="leading-relaxed">{msg.content}</p>
                  )}
                </div>

                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {msg.reactions.map(reaction => (
                      <button
                        key={reaction.emoji}
                        onClick={() => handleReact(msg.id, reaction.emoji)}
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-all ${
                          reaction.userIds.includes(currentUserId)
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="font-medium text-gray-700">{reaction.userIds.length}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick react */}
                {!isCurrentUser && (
                  <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {quickEmojis.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleReact(msg.id, emoji)}
                        className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-sm"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isCurrentUser && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {currentProfile?.name?.charAt(0) || currentUser?.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        {/* Quick Actions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors whitespace-nowrap">
            <Camera className="w-4 h-4" />
            Photo
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors whitespace-nowrap">
            <Video className="w-4 h-4" />
            Video
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Form Check
          </button>
        </div>

        {/* Message Input */}
        <div className="flex items-end gap-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                minHeight: '44px',
                maxHeight: '120px',
              }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className={`p-3 rounded-full transition-all ${
              inputMessage.trim()
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Emoji Picker (simplified) */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
            <div className="grid grid-cols-6 gap-2">
              {['😀', '😂', '😍', '🤔', '😎', '🔥', '💪', '👍', '🎉', '❤️', '💯', '🙌'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => {
                    setInputMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="w-10 h-10 text-2xl hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}