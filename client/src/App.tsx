import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Goals from "@/pages/goals";
import CompletedGoals from "@/pages/completed-goals";
import Dreams from "@/pages/dreams";
import React from "react";

// Simple hash-based routing for GitHub Pages
const useHashLocation = () => {
  const [location, setLocation] = React.useState(() => {
    // Initial location from hash, default to root
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });

  React.useEffect(() => {
    // Update location when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setLocation(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = React.useCallback((to: string) => {
    window.location.hash = to === '/' ? '' : to;
  }, []);

  return [location, navigate] as [string, (to: string) => void];
};

function Router() {
  return (
    <div className="min-h-screen">
      <WouterRouter hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/goals" component={Goals} />
          <Route path="/completed-goals" component={CompletedGoals} />
          <Route path="/dreams" component={Dreams} />
          <Route component={NotFound} />
        </Switch>
      </WouterRouter>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;