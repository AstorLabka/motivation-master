import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertGoalSchema, insertCheckinSchema } from "@shared/schema";
import path from "path";
import express from 'express';

export function registerRoutes(app: Express) {
  // Serve static files from public directory
  app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));

  app.get("/api/goals", async (_req, res) => {
    const goals = await storage.getGoals();
    res.json(goals);
  });

  app.post("/api/goals", async (req, res) => {
    const parsed = insertGoalSchema.parse(req.body);
    const goal = await storage.createGoal(parsed);
    res.json(goal);
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await storage.updateGoal(id, req.body);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGoal(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/checkins", async (_req, res) => {
    const checkins = await storage.getDailyCheckins();
    res.json(checkins);
  });

  app.post("/api/checkins", async (req, res) => {
    const parsed = insertCheckinSchema.parse(req.body);
    const checkin = await storage.createDailyCheckin(parsed);
    res.json(checkin);
  });

  const server = createServer(app);
  return server;
}