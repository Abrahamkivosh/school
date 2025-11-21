import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import StudentPortal from "@/pages/student-portal";
import ParentPortal from "@/pages/parent-portal";
import TeacherPortal from "@/pages/teacher-portal";
import AdminPortal from "@/pages/admin-portal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/student" component={StudentPortal} />
      <Route path="/parent" component={ParentPortal} />
      <Route path="/teacher" component={TeacherPortal} />
      <Route path="/admin" component={AdminPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
