import users from '../../shared/mock-data/users.json';
import profiles from '../../shared/mock-data/profiles.json';
import exercises from '../../shared/mock-data/exercises.json';
import progressions from '../../shared/mock-data/progressions.json';
import userProgressions from '../../shared/mock-data/user-progressions.json';
import groups from '../../shared/mock-data/groups.json';
import messages from '../../shared/mock-data/messages.json';
import coaches from '../../shared/mock-data/coaches.json';

// Current coach for demo
export const CURRENT_COACH_ID = 'coach-1';

export const mockData = {
  users,
  profiles,
  exercises,
  progressions,
  userProgressions,
  groups,
  messages,
  coaches,
};

export function getCurrentCoach() {
  const user = users.find(u => u.id === CURRENT_COACH_ID);
  const profile = profiles.find(p => p.userId === CURRENT_COACH_ID);
  const coach = coaches.find(c => c.userId === CURRENT_COACH_ID);
  return { ...user, profile, coach };
}

export function getCoachClients() {
  // Get all athletes (non-coach users)
  return users
    .filter(u => u.role === 'athlete')
    .map(user => {
      const profile = profiles.find(p => p.userId === user.id);
      const progressions = userProgressions.filter(up => up.userId === user.id);
      return {
        ...user,
        profile,
        progressionCount: progressions.length,
      };
    });
}

export function getCoachAnalytics() {
  const clients = getCoachClients();
  const averageAdherence = clients.reduce((sum, c) => sum + (c.profile?.stats?.adherenceRate || 0), 0) / clients.length;

  return {
    totalClients: clients.length,
    activeClients: clients.filter(c => (c.profile?.stats?.adherenceRate || 0) >= 60).length,
    averageAdherence: Math.round(averageAdherence),
    monthlyRevenue: clients.length * 100, // $100 per client
    retentionRate: 92,
    progressionRate: 2.5, // avg progressions per month
    engagementScore: 87,
  };
}

export function getUserProgressions(userId: string) {
  return userProgressions.filter(up => up.userId === userId);
}