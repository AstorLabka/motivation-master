import express from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

(async () => {
  try {
    log("Starting server...");

    if (app.get("env") === "development") {
      log("Setting up Vite development server...");
      const viteServer = await setupVite(app);
      log("Vite development server setup complete");

      const PORT = 5000;
      app.listen(PORT, "0.0.0.0", () => {
        log(`Server successfully started and listening on port ${PORT}`);
      });
    } else {
      log("Production mode: serving static files");
      serveStatic(app);

      const PORT = 5000;
      app.listen(PORT, "0.0.0.0", () => {
        log(`Server successfully started and listening on port ${PORT}`);
      });
    }
  } catch (error) {
    log(`Fatal error during server startup: ${error instanceof Error ? error.message : String(error)}`);
    console.error("Full startup error:", error);
    process.exit(1);
  }
})();