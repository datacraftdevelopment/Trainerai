'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, TrendingUp, Activity, Calendar, Send, Sparkles, User, Zap, Book, Bot } from 'lucide-react';
import { getCoachClients } from '@/lib/mock-data';

export default function AIAssistantPage() {
  const clients = getCoachClients();
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your AI coaching assistant. I can help you analyze athlete performance, suggest program adjustments, identify trends, and answer questions about your clients. What would you like to know?",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "Which athletes need attention this week?",
    "Analyze Sarah Kim's progression velocity",
    "Suggest program modifications for low adherence clients",
    "What's the average time to progress in Push exercises?",
    "Compare Alex Chen's performance to group average",
    "Generate a weekly report for all clients",
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';

      if (input.toLowerCase().includes('attention') || input.toLowerCase().includes('need')) {
        aiResponse = `Based on recent data, **3 athletes need attention** this week:\n\n**1. Sarah Kim** (75% adherence)\n- Last workout: 2 days ago\n- Trend: Declining from 82% last month\n- Recommendation: Schedule check-in, review goal alignment\n\n**2. Emma Davis** (58% adherence)\n- Missed 3 consecutive workouts\n- Recent chat activity: None\n- Recommendation: Immediate outreach, assess barriers\n\n**3. Ava Martinez** (55% adherence)\n- New client (joined 2 weeks ago)\n- Struggling with progression difficulty\n- Recommendation: Review program fit, consider regression\n\n💡 **Action Items:** Send personalized messages, offer 1-on-1 sessions, adjust program intensity.`;
      } else if (input.toLowerCase().includes('sarah')) {
        aiResponse = `📊 **Sarah Kim - Performance Analysis**\n\n**Current Status:**\n- Adherence: 75% (↓ from 82%)\n- Current streak: 3 days\n- Progressions achieved: 2 (last 30 days)\n\n**Progression Velocity:**\n- Average: 0.5 levels/month (Below group average of 2.5)\n- Time per level: ~60 days (Group: ~12 days)\n- Bottleneck: Incline Push-ups (Level 2) - stuck for 3 weeks\n\n**Insights:**\n- Strong in Pull movements (on track)\n- Struggling with Push progressions\n- May need form coaching or alternative progressions\n\n**Recommendations:**\n1. Submit form check video for Push-ups\n2. Add accessory work (Tricep dips, Shoulder stability)\n3. Reduce progression threshold temporarily\n4. Schedule technique-focused live session`;
      } else if (input.toLowerCase().includes('program') || input.toLowerCase().includes('modification')) {
        aiResponse = `🎯 **Program Modification Suggestions for Low Adherence Clients**\n\n**Strategy 1: Reduce Volume**\n- Current: 3-4 workouts/week\n- Suggested: 2-3 workouts/week with higher quality\n- Impact: 85% adherence improvement (historical data)\n\n**Strategy 2: Micro-Progressions**\n- Break levels into smaller milestones\n- Add intermediate steps (e.g., Level 2.5)\n- Faster "wins" = better motivation\n\n**Strategy 3: Flexible Scheduling**\n- Remove strict weekly structure\n- Allow athletes to choose workout days\n- Focus on total monthly volume\n\n**Strategy 4: Gamification**\n- Add weekly challenges with small rewards\n- Pair low-adherence with high-adherence buddies\n- Create mini-competitions\n\n**Specific Clients to Apply:**\n- Sarah Kim: Strategy 1 + 2\n- Emma Davis: Strategy 3 + 4\n- Ava Martinez: Strategy 2 (new client, needs quick wins)`;
      } else if (input.toLowerCase().includes('average') || input.toLowerCase().includes('time')) {
        aiResponse = `⏱️ **Progression Time Analysis - Push Exercises**\n\n**Overall Average:**\n- Time to progress: **12.3 days** per level\n- Workout requirement: **3.8 sessions** per level\n\n**By Level:**\n- Level 1→2: 8.5 days (easiest)\n- Level 2→3: 14.2 days\n- Level 3→4: 16.8 days (hardest)\n\n**By Athlete Experience:**\n- Beginners: 18.4 days\n- Intermediate: 10.7 days\n- Advanced: 8.2 days\n\n**Success Factors:**\n✅ Consistent 3+ workouts/week: 65% faster\n✅ Form quality >4/5: 40% faster\n✅ Active in community chat: 25% faster\n\n**Bottlenecks:**\n⚠️ Most athletes stuck at Level 2→3 transition\n⚠️ 35% require coach intervention\n⚠️ Common issue: Form deterioration under fatigue`;
      } else if (input.toLowerCase().includes('compare') || input.toLowerCase().includes('alex')) {
        aiResponse = `📈 **Alex Chen vs. Group Average**\n\n**Overall Performance: ⭐⭐⭐⭐⭐ (Top 15%)**\n\n**Adherence:**\n- Alex: 89% | Group Avg: 82% (↑ +7%)\n\n**Progression Velocity:**\n- Alex: 3.2 levels/month | Group: 2.5 (↑ +28%)\n\n**Workout Consistency:**\n- Alex: 4.2 workouts/week | Group: 3.5\n- Current streak: 7 days | Group avg: 3.8 days\n\n**Strength by Category:**\n- Push: Level 3.0 (Group: 2.4) ✨\n- Pull: Level 3.0 (Group: 2.6) ✨\n- Legs: Level 2.0 (Group: 2.2) ⚠️\n- Hand Balance: Level 2.0 (Group: 1.8) ✨\n\n**Engagement:**\n- Community messages: 18/week (Group: 8)\n- Form check submissions: 2/month (Group: 0.8)\n- Live session attendance: 100% (Group: 65%)\n\n**Key Insight:** Alex is a model athlete and could mentor others. Consider making him a group leader or challenge captain.`;
      } else if (input.toLowerCase().includes('report')) {
        aiResponse = `📋 **Weekly Coaching Report - Week of Sep 23-29**\n\n**Overview:**\n- Active Clients: 10/10 (100%)\n- Avg Adherence: 82% (↑ +3% from last week)\n- Total Workouts Completed: 38\n- New Progressions: 7\n- PRs Achieved: 12\n\n**🏆 Top Performers:**\n1. Alex Chen - 100% adherence, 3 PRs\n2. Mike Johnson - 95% adherence, 2 progressions\n3. Ryan Patel - 93% adherence, 4 PRs\n\n**⚠️ Needs Attention:**\n1. Emma Davis - 40% adherence (missed 4/7 days)\n2. Ava Martinez - 55% adherence (new, struggling)\n3. Sarah Kim - 75% adherence (declining trend)\n\n**📊 Category Progress:**\n- Push: 5 progressions\n- Pull: 2 progressions\n- Hand Balance: 1 progression (Alex → Level 3)\n\n**💬 Community Engagement:**\n- Total messages: 47 (↑ +12)\n- Form checks submitted: 5\n- Live session attendance: 8/10 (80%)\n\n**🎯 Action Items for Next Week:**\n1. Contact Emma & Ava for check-ins\n2. Review Sarah's Push-up form\n3. Celebrate Alex's handstand progression\n4. Plan group challenge for Legs focus`;
      } else {
        aiResponse = `I can help you with that! I have access to all your athlete data, performance metrics, and progression history. \n\nTry asking me:\n- "Which athletes need attention?"\n- "Analyze [athlete name]'s performance"\n- "What's the average progression time for [exercise]?"\n- "Compare [athlete] to group average"\n- "Suggest program modifications"\n- "Generate a weekly report"\n\nWhat would you like to know?`;
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 p-6 shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">TrainAI</h1>
          <p className="text-sm text-gray-500">Coach Portal</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Activity className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/athletes"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Users className="w-5 h-5" />
            Athletes
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Programs
          </Link>
          <Link
            href="/exercises"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Book className="w-5 h-5" />
            Exercise Library
          </Link>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg font-medium border-2 border-purple-200"
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <span className="w-5 h-5 flex items-center justify-center">💬</span>
            Chat
          </Link>
          <Link
            href="/calendar"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Calendar
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Coaching Assistant</h1>
              <p className="text-gray-600">Ask questions, get insights, and optimize your coaching</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl">
          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">💡 Try asking:</p>
              <div className="grid grid-cols-2 gap-3">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left p-3 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-sm text-gray-700 shadow-sm"
                  >
                    <Zap className="w-4 h-4 text-purple-500 inline mr-2" />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-6" style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}>
            <div className="h-full overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block p-4 rounded-2xl ${
                        message.role === 'assistant'
                          ? 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">
                        {message.content.split('\n').map((line, idx) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <div key={idx} className="font-bold my-2">{line.slice(2, -2)}</div>;
                          }
                          return <div key={idx}>{line}</div>;
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-4">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about athlete performance, suggest modifications, analyze trends..."
                rows={3}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}