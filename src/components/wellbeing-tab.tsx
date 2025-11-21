import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Heart, Moon, Battery, Smile, Target, Award } from "lucide-react";

interface WellbeingTabProps {
  role: "student" | "parent" | "teacher" | "admin";
}

export default function WellbeingTab({ role }: WellbeingTabProps) {
  const { data: wellbeingData, isLoading } = useQuery({
    queryKey: ["/api/wellbeing/student-1"],
    retry: false,
  });

  const mockWellbeingData = {
    overallScore: 8.7,
    mood: "Excellent",
    sleep: "Good", 
    energy: "Moderate",
    kivaActive: true,
    dailyActivity: 45,
    weeklyGoals: 3,
    totalGoals: 5,
  };

  const mockVirtues = [
    { virtue: "Kindness", score: 9, icon: "💝", color: "bg-yellow-50" },
    { virtue: "Perseverance", score: 8, icon: "🎯", color: "bg-blue-50" },
    { virtue: "Humility", score: 7, icon: "🙏", color: "bg-purple-50" },
  ];

  const mockAchievements = [
    { title: "Helper of the Week", description: "Consistently helped classmates with assignments", icon: "🏆" },
    { title: "Peer Mediator", description: "Successfully resolved conflicts between peers", icon: "🌟" },
  ];

  const mockGoals = [
    { goal: "Active Listening", progress: 60, status: "In Progress" },
    { goal: "Leadership Skills", progress: 20, status: "Next Month" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-40 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="wellbeing-tab">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mental Health Dashboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mental Wellbeing</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-finnish-green rounded-full"></div>
                <span className="text-sm font-medium text-finnish-green">Positive</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Wellbeing Score Circle */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 144 144">
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="60" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth="8" 
                    fill="none"
                  />
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="60" 
                    stroke="hsl(var(--finnish-green))" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray="377" 
                    strokeDashoffset="75" 
                    className="progress-ring"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground" data-testid="wellbeing-score">
                      {mockWellbeingData.overallScore}
                    </div>
                    <div className="text-xs text-muted-foreground">out of 10</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wellbeing Factors */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Smile className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium">Mood & Happiness</span>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {mockWellbeingData.mood}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Moon className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium">Sleep Quality</span>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {mockWellbeingData.sleep}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Battery className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium">Energy Level</span>
                </div>
                <span className="text-sm font-semibold text-orange-600">
                  {mockWellbeingData.energy}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities & Support */}
        <div className="space-y-6">
          {/* KiVa Anti-Bullying */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>KiVa Program</CardTitle>
                <Badge className="bg-finnish-mint text-finnish-green">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Research-based anti-bullying program ensuring a safe learning environment for all students.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Weekly peer interaction assessments</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Positive classroom climate monitoring</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 support system available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=120"
                  alt="Finnish nature scene promoting outdoor physical activities"
                  className="w-full h-20 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-finnish-green/20 to-transparent flex items-center px-4">
                  <span className="text-white font-medium text-sm">Finnish Schools on the Move</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <div className="font-semibold text-foreground" data-testid="daily-activity">
                    {mockWellbeingData.dailyActivity} min
                  </div>
                  <div className="text-muted-foreground">Daily Activity</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg">
                  <div className="font-semibold text-foreground" data-testid="weekly-goals">
                    {mockWellbeingData.weeklyGoals}/{mockWellbeingData.totalGoals}
                  </div>
                  <div className="text-muted-foreground">Weekly Goals</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Character Development */}
      <Card>
        <CardHeader>
          <CardTitle>Character Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Virtues */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Monthly Virtues Tracking</h4>
              <div className="space-y-3">
                {mockVirtues.map((virtue, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 ${virtue.color} rounded-lg`}
                    data-testid={`virtue-${index}`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{virtue.icon}</span>
                      <span className="text-sm font-medium">{virtue.virtue}</span>
                    </div>
                    <span className="text-sm font-semibold">{virtue.score}/10</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Recent Achievements</h4>
              <div className="space-y-3">
                {mockAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-3 bg-accent/10 rounded-lg"
                    data-testid={`achievement-${index}`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{achievement.icon}</span>
                      <span className="text-sm font-medium">{achievement.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Development Goals</h4>
              <div className="space-y-3">
                {mockGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/50 rounded-lg"
                    data-testid={`goal-${index}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{goal.goal}</span>
                      <span className="text-xs text-muted-foreground">{goal.status}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
