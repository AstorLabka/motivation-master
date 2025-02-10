import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target } from "lucide-react";
import { Link } from "wouter";

export default function Dreams() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
            YOUR DREAMS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://i.ibb.co/b5cgnqkf/IMG-7649.png"
                alt="Sigriswil Village"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Sigriswil Dream Home</h2>
              <p className="text-muted-foreground">
                Your dream home in Switzerland awaits! But dreams don't work unless YOU DO!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://i.ibb.co/dwSXRfxn/IMG-7650.jpg"
                alt="Maserati"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Your Luxury Car</h2>
              <p className="text-muted-foreground">
                Success has a price. Are you willing to pay it with your hard work?
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 bg-red-900/20 border-red-500/50">
            <CardContent className="p-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1664279990987-1cfe303b164b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy Family"
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Beautiful Family Life</h2>
              <p className="text-muted-foreground">
                Building a loving family requires dedication, stability, and success. 
                Every minute you waste is a minute further from this dream!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">REMEMBER!</h2>
          <p className="text-xl text-red-400">
            These dreams will remain JUST DREAMS unless you take ACTION!
            Every moment of procrastination is a moment stolen from your future success!
          </p>
          <Link href="/goals">
            <Button size="lg" className="mt-6 bg-red-500 hover:bg-red-600">
              <Target className="mr-2" /> Start Working on Your Goals NOW!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}