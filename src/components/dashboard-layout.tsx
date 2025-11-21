import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/hooks/use-role";
import { useNotifications } from "@/hooks/use-notifications";
import OverviewTab from "./overview-tab";
import AcademicsTab from "./academics-tab";
import CommunicationTab from "./communication-tab";
import SafetyTab from "./safety-tab";
import WellbeingTab from "./wellbeing-tab";
import NotificationSystem from "./notification-system";
import { Home, Book, MessageCircle, Shield, Heart, Globe, Bell, User } from "lucide-react";

interface DashboardLayoutProps {
  userRole: "student" | "parent" | "teacher" | "admin";
  userData: {
    name: string;
    title: string;
    icon: string;
  };
}

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "academics", label: "Academics", icon: Book },
  { id: "communication", label: "Communication", icon: MessageCircle },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "wellbeing", label: "Wellbeing", icon: Heart },
];

export default function DashboardLayout({ userRole, userData }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentLang, setCurrentLang] = useState("EN");
  const [, setLocation] = useLocation();
  const { role } = useRole();
  const { notifications, hasUnread } = useNotifications();

  const handleGoHome = () => {
    setLocation("/");
  };

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === "EN" ? "ZH" : "EN");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab role={userRole} />;
      case "academics":
        return <AcademicsTab role={userRole} />;
      case "communication":
        return <CommunicationTab role={userRole} />;
      case "safety":
        return <SafetyTab role={userRole} />;
      case "wellbeing":
        return <WellbeingTab role={userRole} />;
      default:
        return <OverviewTab role={userRole} />;
    }
  };

  return (
    <div className={`min-h-screen bg-background role-${userRole}`}>
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoHome}
                className="text-primary hover:text-primary/80"
                data-testid="home-button"
              >
                <Home className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  SchoolConnect
                </h1>
                <p className="text-sm text-muted-foreground">{userData.title}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1 bg-muted/50 rounded-xl p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    data-testid={`nav-${tab.id}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
                data-testid="language-toggle"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLang}</span>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                data-testid="notifications-button"
              >
                <Bell className="w-4 h-4" />
                {hasUnread && (
                  <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-destructive rounded-full animate-pulse-soft" />
                )}
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">{userData.icon}</span>
                </div>
                <span className="text-sm font-medium hidden sm:block" data-testid="user-name">
                  {userData.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>

      {/* Mobile Navigation */}
      <nav className="mobile-nav md:hidden">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`mobile-nav-${tab.id}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      <NotificationSystem />
    </div>
  );
}
