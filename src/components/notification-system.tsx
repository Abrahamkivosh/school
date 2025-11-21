import { useEffect } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function NotificationSystem() {
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    notifications.forEach((notification) => {
      if (!notification.persistent) {
        const timer = setTimeout(() => {
          removeNotification(notification.id);
        }, 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, removeNotification]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-3 max-w-sm"
      data-testid="notification-container"
    >
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`notification-slide border shadow-lg ${getNotificationStyles(notification.type)}`}
          data-testid={`notification-${notification.id}`}
        >
          <div className="p-4">
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                {notification.title && (
                  <h4 className="text-sm font-semibold mb-1">
                    {notification.title}
                  </h4>
                )}
                <p className="text-sm">{notification.message}</p>
                {notification.action && (
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={notification.action.onClick}
                      className="text-xs"
                    >
                      {notification.action.label}
                    </Button>
                  </div>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeNotification(notification.id)}
                className="p-1 h-auto opacity-70 hover:opacity-100"
                data-testid={`notification-close-${notification.id}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
