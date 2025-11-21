import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import MessageModal from "./modals/message-modal";
import { Send, MessageSquare, Phone, Video } from "lucide-react";

interface CommunicationTabProps {
  role: "student" | "parent" | "teacher" | "admin";
}

export default function CommunicationTab({ role }: CommunicationTabProps) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/messages/user-1"],
    retry: false,
  });

  // Mock data for messages and contacts
  const mockMessages = [
    {
      id: "1",
      sender: "Ms. Chen",
      subject: "Assignment Feedback",
      preview: "Great work on your algebra assignment...",
      time: "2 hours ago",
      read: false,
      avatar: "👩‍🏫"
    },
    {
      id: "2",
      sender: "School Office",
      subject: "Sports Day Information",
      preview: "Annual sports day scheduled for March 25th...",
      time: "1 day ago",
      read: true,
      avatar: "🏫"
    },
    {
      id: "3",
      sender: "Mr. Wang",
      subject: "Science Project",
      preview: "Your science project proposal has been approved...",
      time: "3 days ago",
      read: true,
      avatar: "👨‍🔬"
    }
  ];

  const mockContacts = [
    { name: "Ms. Chen", role: "Math Teacher", status: "online", avatar: "👩‍🏫" },
    { name: "School Office", role: "Administration", status: "available", avatar: "🏫" },
    { name: "Mr. Wang", role: "Science Teacher", status: "busy", avatar: "👨‍🔬" },
    { name: "Parent Council", role: "Community", status: "offline", avatar: "👥" }
  ];

  const mockAnnouncements = [
    { title: "School Sports Day", time: "Today", type: "event" },
    { title: "Parent-Teacher Conference", time: "Next Week", type: "meeting" },
    { title: "New Library Hours", time: "2 days ago", type: "info" }
  ];

  const displayMessages = Array.isArray(messages) ? messages : mockMessages;

  if (messagesLoading) {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="communication-tab">
      {/* Messages List */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Button
                onClick={() => setIsMessageModalOpen(true)}
                data-testid="new-message-button"
              >
                <Send className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {displayMessages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 ${
                    message.read ? "" : "bg-primary/5"
                  }`}
                  data-testid={`message-${message.id}`}
                >
                  <div className="text-2xl">{message.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground truncate">{message.sender}</h4>
                      <span className="text-xs text-muted-foreground ml-2">{message.time}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">{message.subject}</p>
                    <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                  </div>
                  {!message.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Tools */}
      <div className="space-y-6">
        {/* Quick Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
                  data-testid={`contact-${index}`}
                >
                  <div className="text-2xl">{contact.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    contact.status === "online" ? "bg-green-500" :
                    contact.status === "available" ? "bg-yellow-500" :
                    contact.status === "busy" ? "bg-red-500" : "bg-gray-400"
                  }`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Communication Options */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <MessageSquare className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Chat</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Phone className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Call</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Video className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Video</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Send className="w-6 h-6 mb-2 text-primary" />
                <span className="text-xs">Email</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnnouncements.map((announcement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  data-testid={`announcement-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground">{announcement.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {announcement.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        // onSave={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
}