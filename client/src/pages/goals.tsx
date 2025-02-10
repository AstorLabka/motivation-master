import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trophy, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { getRandomAchievementQuote } from "@/lib/quotes";
import * as storage from "@/lib/storage";

export default function Goals() {
  const [newGoal, setNewGoal] = useState("");
  const [editingGoal, setEditingGoal] = useState<{ id: number, title: string } | null>(null);
  const [goals, setGoals] = useState<storage.Goal[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setGoals(storage.getGoals().filter(goal => !goal.completed));
  }, []);

  const addGoal = () => {
    if (!newGoal.trim()) {
      toast({
        title: "NO EMPTY GOALS!",
        description: "Write something meaningful!",
        variant: "destructive"
      });
      return;
    }

    const goal = storage.saveGoal({ title: newGoal, completed: false });
    setGoals(prev => [...prev, goal]);
    setNewGoal("");
    toast({
      title: "GOAL ADDED! NOW CRUSH IT! 💪",
      variant: "default"
    });
  };

  const saveEdit = (id: number) => {
    if (!editingGoal) return;
    if (!editingGoal.title.trim()) {
      toast({
        title: "Goal cannot be empty!",
        variant: "destructive"
      });
      return;
    }

    const updatedGoal = storage.updateGoal(id, { title: editingGoal.title });
    setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g));
    setEditingGoal(null);
    toast({
      title: "Goal updated successfully!",
      variant: "default"
    });
  };

  const handleToggleComplete = (id: number, currentCompleted: boolean) => {
    if (!currentCompleted) {
      const quote = getRandomAchievementQuote();
      toast({
        title: quote,
        variant: "default",
        className: "bg-green-500 text-white font-bold"
      });
    }

    const updatedGoal = storage.updateGoal(id, { completed: !currentCompleted });
    setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g));
  };

  const deleteGoal = (id: number) => {
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
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">YOUR MISSIONS</h1>
          <Link href="/completed-goals">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              Conquered Goals <Trophy className="ml-2" />
            </Button>
          </Link>
        </div>

        <Card className="bg-red-900/20 border-red-500/50">
          <CardContent className="p-6">
            <div className="flex gap-2">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && addGoal()}
              />
              <Button 
                onClick={addGoal} 
                className="bg-red-500 hover:bg-red-600"
              >
                <Plus className="mr-2" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-red-900/20">
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => handleToggleComplete(goal.id, goal.completed)}
                />
                {editingGoal?.id === goal.id ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={editingGoal.title}
                      onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && saveEdit(goal.id)}
                    />
                    <Button
                      onClick={() => saveEdit(goal.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingGoal(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{goal.title}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingGoal({ id: goal.id, title: goal.title })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center text-muted-foreground p-8">
            NO GOALS YET? ADD SOME AND START CRUSHING THEM! 💪
          </div>
        )}
      </div>
    </div>
  );
}