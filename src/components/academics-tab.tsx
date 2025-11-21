import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import AssignmentModal from "./modals/assignment-modal";
import { Plus, Calculator, FlaskConical, BookOpen } from "lucide-react";

interface AcademicsTabProps {
  role: "student" | "parent" | "teacher" | "admin";
}

export default function AcademicsTab({ role }: AcademicsTabProps) {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["/api/assignments"],
    retry: false,
  });

  // Mock assignments data
  const mockAssignments = [
    {
      id: "1",
      title: "Algebraic Equations Worksheet",
      subject: "Mathematics",
      dueDate: "March 15, 2024",
      status: "pending",
      priority: "high",
    },
    {
      id: "2", 
      title: "Science Lab Report",
      subject: "Physics",
      dueDate: "March 18, 2024",
      status: "submitted",
      priority: "medium",
    },
    {
      id: "3",
      title: "Literature Essay",
      subject: "English", 
      dueDate: "March 22, 2024",
      status: "draft",
      priority: "low",
    },
  ];

  const displayAssignments = Array.isArray(assignments) ? assignments : mockAssignments;

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700", 
      low: "bg-green-100 text-green-700",
    };
    return colors[priority] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      submitted: "bg-green-100 text-green-700",
      draft: "bg-blue-100 text-blue-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (assignmentsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-40 bg-muted rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="academics-tab">
      {/* Assignments Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Assignments</CardTitle>
              {(role === "teacher" || role === "admin") && (
                <Button
                  onClick={() => setIsAssignmentModalOpen(true)}
                  data-testid="create-assignment-button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayAssignments.map((assignment: any) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                  data-testid={`assignment-${assignment.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{assignment.title}</h4>
                      <Badge className={getPriorityColor(assignment.priority)}>
                        {assignment.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {assignment.subject} • Due: {assignment.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Progress Sidebar */}
      <div className="space-y-6">
        {/* Grade Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mathematics</span>
                <div className="flex items-center space-x-2">
                  <Progress value={80} className="w-20" />
                  <span className="text-sm font-medium">A-</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Science</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20" />
                  <span className="text-sm font-medium">A+</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Literature</span>
                <div className="flex items-center space-x-2">
                  <Progress value={75} className="w-20" />
                  <span className="text-sm font-medium">B+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Physics Quiz</p>
                  <p className="text-xs text-muted-foreground">March 18</p>
                </div>
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Math Test</p>
                  <p className="text-xs text-muted-foreground">March 22</p>
                </div>
                <Calculator className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Study Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <BookOpen className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Library</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Calculator className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Calculator</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        // assignment={null}
        // onSave={() => setIsAssignmentModalOpen(false)}
      />
    </div>
  );
}