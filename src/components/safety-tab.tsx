import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Bus, Phone, Shield, Camera, Lock } from "lucide-react";

interface SafetyTabProps {
  role: "student" | "parent" | "teacher" | "admin";
}

export default function SafetyTab({ role }: SafetyTabProps) {
  const { data: safetyData, isLoading } = useQuery({
    queryKey: ["/api/safety-logs/student-1"],
    retry: false,
  });

  const mockStudentData = {
    name: "Alex Johnson",
    class: "Grade 8A",
    studentId: "SC24-0847",
    rfidStatus: "Active",
    currentLocation: "Library - Study Hall B",
  };

  const mockBusData = {
    busNumber: "42",
    route: "Route A - North Campus",
    currentLocation: "Maple Street",
    eta: "8 minutes",
    driver: "Mr. Zhang Wei",
    status: "On Route",
  };

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
    <div className="space-y-6" data-testid="safety-tab">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Safety Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Safety Status</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium text-green-600">All Safe</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Student ID Card */}
            <div className="bg-gradient-to-r from-singapore-blue to-finnish-green rounded-xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold" data-testid="student-name">
                    {mockStudentData.name}
                  </h4>
                  <p className="text-sm opacity-90" data-testid="student-class">
                    {mockStudentData.class}
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="text-2xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="opacity-75">Student ID</p>
                  <p className="font-mono" data-testid="student-id">
                    {mockStudentData.studentId}
                  </p>
                </div>
                <div>
                  <p className="opacity-75">RFID Status</p>
                  <p className="font-medium">✅ {mockStudentData.rfidStatus}</p>
                </div>
              </div>
            </div>

            {/* Location Tracking */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Current Location</h4>
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200"
                  alt="Modern Singapore school campus with safety features"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-lg font-semibold flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Main Campus
                    </div>
                    <div className="text-sm" data-testid="current-location">
                      {mockStudentData.currentLocation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transportation Safety */}
        <Card>
          <CardHeader>
            <CardTitle>Transportation</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Bus Tracking */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Bus className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">
                      Bus #{mockBusData.busNumber}
                    </p>
                    <p className="text-sm text-blue-600">{mockBusData.route}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {mockBusData.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center justify-between">
                  <span>Current Location:</span>
                  <span className="font-medium" data-testid="bus-location">
                    {mockBusData.currentLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ETA to School:</span>
                  <span className="font-medium" data-testid="bus-eta">
                    {mockBusData.eta}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Driver:</span>
                  <span className="font-medium">{mockBusData.driver}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Emergency Contacts</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-between p-3 bg-red-50 hover:bg-red-100 border-red-200"
                  data-testid="emergency-school-button"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-900">School Security</span>
                  </div>
                  <span className="text-xs text-red-600">24/7</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between p-3 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  data-testid="emergency-medical-button"
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-900">Medical Emergency</span>
                  </div>
                  <span className="text-xs text-orange-600">995</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Monitoring (Admin View) */}
      {role === "admin" && (
        <Card data-testid="security-panel">
          <CardHeader>
            <CardTitle>Security Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CCTV Status */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-900">CCTV System</h4>
                  <Badge className="bg-green-100 text-green-700">
                    48 Cameras Active
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center">
                    <Camera className="w-3 h-3 mr-2" />
                    Main Entrance
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-3 h-3 mr-2" />
                    Playground
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-3 h-3 mr-2" />
                    Cafeteria
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-3 h-3 mr-2" />
                    All Hallways
                  </div>
                </div>
              </div>

              {/* Access Control */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-900">Access Control</h4>
                  <Badge className="bg-blue-100 text-blue-700">
                    RFID Active
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-2" />
                    Main Gates: Secure
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-2" />
                    Library: 24 Students
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-2" />
                    Cafeteria: 156 Students
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 mr-2" />
                    Bus Area: 8 Students
                  </div>
                </div>
              </div>

              {/* Alert System */}
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-purple-900">Alert System</h4>
                  <Badge className="bg-purple-100 text-purple-700">
                    All Clear
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-purple-800">
                  <div>🔔 Emergency Protocols Ready</div>
                  <div>📱 Parent Notifications Active</div>
                  <div>🚨 Fire System: Normal</div>
                  <div>⚡ Backup Power: Ready</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
