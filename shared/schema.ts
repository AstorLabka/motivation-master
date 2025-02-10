import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dailyCheckins = pgTable("daily_checkins", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  mood: integer("mood").notNull(),
  notes: text("notes"),
});

export const insertGoalSchema = createInsertSchema(goals).omit({ 
  id: true,
  createdAt: true 
});

export const insertCheckinSchema = createInsertSchema(dailyCheckins).omit({
  id: true
});

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;
export type DailyCheckin = typeof dailyCheckins.$inferSelect;
