import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { roleConfigs } from "@/lib/role-configs";
import { TrendingUp, Users, Clock, MessageCircle } from "lucide-react";

interface OverviewTabProps {
  role: "student" | "parent" | "teacher" | "admin";
}

export default function OverviewTab({ role }: OverviewTabProps) {
  const config = roleConfigs[role];

  // Simulate API calls based on role
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: [`/api/metrics/${role}`],
    retry: false,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: [`/api/activities/${role}`],
    retry: false,
  });

  if (metricsLoading || activitiesLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const defaultMetrics = config.metrics;
  const defaultActivities = config.activities;

  return (
    <div className="space-y-6" data-testid="overview-tab">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(defaultMetrics).map(([key, metric], index) => {
          const icons = [TrendingUp, Users, Clock, MessageCircle];
          const Icon = icons[index];
          
          return (
            <Card key={key} className="card-interactive" data-testid={`metric-${key}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="text-primary text-xl" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activities</CardTitle>
              <Button variant="outline" size="sm" data-testid="view-all-activities">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {defaultActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                  data-testid={`activity-${index}`}
                >
                  <div className={`w-10 h-10 ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-sm">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quick Actions</CardTitle>
              <Badge variant="outline" className="text-xs">Personalized</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {config.quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="flex flex-col items-center justify-center p-4 h-auto hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                  data-testid={`quick-action-${index}`}
                >
                  <span className="text-xl text-primary mb-2">{action.icon}</span>
                  <span className="text-xs font-medium text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Progress Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">Week</Button>
              <Button variant="default" size="sm">Month</Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">Year</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-gradient-to-r from-finnish-mint to-singapore-light rounded-xl flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="Finnish forest representing natural growth and educational progress"
              className="w-full h-full object-cover rounded-xl opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">📈</div>
                <p className="font-medium">Progress Analytics</p>
                <p className="text-sm opacity-80">AI-powered insights available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getActivityColor(type: string) {
  const colors: Record<string, string> = {
    success: "bg-green-500",
    achievement: "bg-yellow-500",
    reminder: "bg-blue-500",
    social: "bg-purple-500",
    safety: "bg-green-600",
    event: "bg-blue-600",
    finance: "bg-orange-500",
    work: "bg-primary",
    communication: "bg-blue-400",
    admin: "bg-gray-500",
    report: "bg-indigo-500",
    security: "bg-red-500",
  };
  return colors[type] || "bg-gray-500";
}

function getActivityIcon(type: string) {
  const icons: Record<string, string> = {
    success: "✓",
    achievement: "⭐",
    reminder: "⏰",
    social: "👥",
    safety: "🛡️",
    event: "📅",
    finance: "💳",
    work: "📋",
    communication: "💬",
    admin: "⚙️",
    report: "📊",
    security: "🔒",
  };
  return icons[type] || "•";
}
