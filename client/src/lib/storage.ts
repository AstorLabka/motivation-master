const GOALS_KEY = 'wake_up_goals';
const LAST_CHECKIN_KEY = 'last_checkin';

export interface Goal {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export function getGoals(): Goal[] {
  const stored = localStorage.getItem(GOALS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveGoal(goal: Omit<Goal, 'id' | 'createdAt'>): Goal {
  const goals = getGoals();
  const newGoal: Goal = {
    ...goal,
    id: Date.now(), // Use timestamp as ID
    createdAt: new Date().toISOString(),
  };
  goals.push(newGoal);
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  return newGoal;
}

export function updateGoal(id: number, updates: Partial<Goal>): Goal {
  const goals = getGoals();
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) throw new Error('Goal not found');

  goals[index] = { ...goals[index], ...updates };
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  return goals[index];
}

export function deleteGoal(id: number): void {
  const goals = getGoals();
  const filtered = goals.filter(g => g.id !== id);
  localStorage.setItem(GOALS_KEY, JSON.stringify(filtered));
}

export function saveLastCheckin(date: string) {
  localStorage.setItem(LAST_CHECKIN_KEY, date);
}

export function getLastCheckin(): string | null {
  return localStorage.getItem(LAST_CHECKIN_KEY);
}