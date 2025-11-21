import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRole } from "@/hooks/use-role";

const roleData = [
  {
    role: "student",
    title: "Student Portal",
    description: "Academic progress, assignments, wellbeing",
    icon: "🎓",
    color: "bg-finnish-green",
    feature: "Wellbeing Focused",
    path: "/student"
  },
  {
    role: "parent",
    title: "Parent Portal", 
    description: "Child progress, communication, safety",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-purple-500",
    feature: "Real-time Updates",
    path: "/parent"
  },
  {
    role: "teacher",
    title: "Teacher Portal",
    description: "Class management, assessments, analytics", 
    icon: "👩‍🏫",
    color: "bg-blue-500",
    feature: "AI-Powered Insights",
    path: "/teacher"
  },
  {
    role: "admin",
    title: "Admin Portal",
    description: "Security, operations, multi-campus",
    icon: "🛡️",
    color: "bg-red-500", 
    feature: "Enterprise Security",
    path: "/admin"
  }
];

export default function WelcomeScreen() {
  const [, setLocation] = useLocation();
  const { setRole } = useRole();

  const handleRoleSelection = (role: string, path: string) => {
    setRole(role as any);
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-singapore-blue to-finnish-green flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-6 relative">
            <img 
              src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Modern educational campus representing excellence"
              className="w-full h-40 object-cover rounded-2xl shadow-2xl mx-auto opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-singapore-blue/20 to-finnish-green/20 rounded-2xl"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-3 animate-float">
            SchoolConnect
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-6">
            Advanced School Management Information System
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roleData.map((item) => (
            <Card 
              key={item.role}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center cursor-pointer card-interactive group hover:scale-105 transition-all duration-300"
              onClick={() => handleRoleSelection(item.role, item.path)}
              data-testid={`role-card-${item.role}`}
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl text-white">{item.icon}</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <span className={`w-2 h-2 ${item.color} rounded-full`}></span>
                <span>{item.feature}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Key Features Banner */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div>
              <div className="text-2xl font-bold mb-2">🔐</div>
              <div className="text-sm font-medium">Blockchain Security</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">📍</div>
              <div className="text-sm font-medium">GPS Tracking</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">🌱</div>
              <div className="text-sm font-medium">Wellbeing Focus</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">🤖</div>
              <div className="text-sm font-medium">AI Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
