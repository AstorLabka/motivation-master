import { type Goal, type DailyCheckin, type InsertGoal } from "@shared/schema";

export interface IStorage {
  getGoals(): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<Goal>): Promise<Goal>;
  deleteGoal(id: number): Promise<void>;
  getDailyCheckins(): Promise<DailyCheckin[]>;
  createDailyCheckin(checkin: Omit<DailyCheckin, "id">): Promise<DailyCheckin>;
}

// In-memory storage implementation
class MemoryStorage implements IStorage {
  private goals: Goal[] = [];
  private checkins: DailyCheckin[] = [];
  private nextGoalId = 1;
  private nextCheckinId = 1;

  async getGoals(): Promise<Goal[]> {
    return this.goals;
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const goal: Goal = {
      ...insertGoal,
      id: this.nextGoalId++,
    };
    this.goals.push(goal);
    return goal;
  }

  async updateGoal(id: number, goalUpdate: Partial<Goal>): Promise<Goal> {
    const index = this.goals.findIndex(g => g.id === id);
    if (index === -1) {
      throw new Error("Goal not found");
    }

    const updatedGoal = {
      ...this.goals[index],
      ...goalUpdate,
    };
    this.goals[index] = updatedGoal;
    return updatedGoal;
  }

  async deleteGoal(id: number): Promise<void> {
    const index = this.goals.findIndex(g => g.id === id);
    if (index !== -1) {
      this.goals.splice(index, 1);
    }
  }

  async getDailyCheckins(): Promise<DailyCheckin[]> {
    return this.checkins;
  }

  async createDailyCheckin(checkin: Omit<DailyCheckin, "id">): Promise<DailyCheckin> {
    const newCheckin: DailyCheckin = {
      ...checkin,
      id: this.nextCheckinId++,
    };
    this.checkins.push(newCheckin);
    return newCheckin;
  }
}

export const storage = new MemoryStorage();