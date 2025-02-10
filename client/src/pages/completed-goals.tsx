import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Trash2, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import * as storage from "@/lib/storage";

export default function CompletedGoals() {
  const { toast } = useToast();
  const [goals, setGoals] = useState<storage.Goal[]>([]);

  useEffect(() => {
    setGoals(storage.getGoals().filter(goal => goal.completed));
  }, []);

  const handleUncomplete = (id: number) => {
    const updatedGoal = storage.updateGoal(id, { completed: false });
    setGoals(prev => prev.filter(g => g.id !== id));
    toast({
      title: "Goal moved back to active!",
      variant: "default"
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      storage.deleteGoal(id);
      setGoals(prev => prev.filter(g => g.id !== id));
      toast({
        title: "Goal deleted!",
        variant: "default"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/goals">
            <Button variant="outline">
              <ArrowLeft className="mr-2" /> Back to Active Goals
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">CONQUERED GOALS 🏆</h1>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-green-900/20">
              <CardContent className="p-4 flex items-center gap-4">
                <Trophy className="text-yellow-500" />
                <span className="flex-1 line-through text-muted-foreground">
                  {goal.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  Completed on {new Date(goal.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUncomplete(goal.id)}
                    title="Mark as active"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(goal.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center text-muted-foreground p-8">
            NO CONQUERED GOALS YET! GET BACK TO WORK! 💪
          </div>
        )}
      </div>
    </div>
  );
}