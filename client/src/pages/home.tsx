import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/lib/quotes";
import { ArrowRight, Target, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [notificationPermission, setNotificationPermission] = useState<string>('default');
  const { toast } = useToast();

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const requestNotificationPermission = async () => {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications",
        variant: "destructive"
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        toast({
          title: "Notifications enabled!",
          description: "You'll receive daily reminders to check your goals",
          variant: "default"
        });
        // Schedule a test notification
        setTimeout(() => {
          new Notification("Wake Up! Goal Tracker", {
            body: "Stay focused on your goals! Check your progress now.",
            icon: "/icons/icon-192x192.png"
          });
        }, 3000);
      } else if (permission === 'denied') {
        toast({
          title: "Notifications blocked",
          description: "Please enable notifications in your browser settings",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast({
        title: "Couldn't enable notifications",
        description: "Please try again or check your browser settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            WAKE UP!
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-white">
            {quote}
          </p>
        </div>

        {'Notification' in window && notificationPermission !== 'granted' && (
          <Button 
            onClick={requestNotificationPermission}
            className="bg-red-500 hover:bg-red-600 mb-4"
          >
            <Bell className="mr-2" /> Enable Daily Reminders
          </Button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://i.ibb.co/hJxkSdk7/nordwood-themes-b-Jjs-Kb-To-Y34-unsplash.jpg"
                alt="Dropshipping Business"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">BUILD YOUR EMPIRE!</h2>
              <p className="text-muted-foreground">
                Every minute wasted is money lost! Get up, start grinding, and build that six-figure dropshipping business NOW!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
                alt="Gym Workout"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">CRUSH IT IN THE GYM!</h2>
              <p className="text-muted-foreground">
                Transform your body through iron and discipline! Conquer your limits, push beyond comfort, and become the unstoppable force you were meant to be!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://i.ibb.co/4ZF3LXTx/james-coleman-Hozne-Su-Ppl-M-unsplash.jpg"
                alt="Spiritual Growth"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">STRENGTHEN YOUR SPIRIT!</h2>
              <p className="text-muted-foreground">
                Your soul needs daily prayer! Strengthen your connection with God - it's your ultimate source of power!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://i.ibb.co/qFPMQ9hB/tom-hermans-9-Boq-Xz-Ee-Qq-M-unsplash.jpg"
                alt="Reading Books"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">FEED YOUR MIND!</h2>
              <p className="text-muted-foreground">
                Stop scrolling social media! Grab that book and absorb knowledge that will set you apart from the mediocre masses!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Link href="/goals">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600"
            >
              <Target className="mr-2" /> Track Your Goals <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="/dreams">
            <Button
              size="lg"
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Your Dreams <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}