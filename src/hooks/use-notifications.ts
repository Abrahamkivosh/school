import { useState, useCallback, useEffect } from "react";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

let globalNotifications: Notification[] = [];
let listeners: Array<(notifications: Notification[]) => void> = [];

function notifyListeners() {
  listeners.forEach(listener => listener(globalNotifications));
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(globalNotifications);

  useEffect(() => {
    const listener = (newNotifications: Notification[]) => {
      setNotifications([...newNotifications]);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
    };

    globalNotifications = [...globalNotifications, newNotification];
    notifyListeners();

    // Auto-remove non-persistent notifications after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotificationGlobal(id);
      }, 5000);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    removeNotificationGlobal(id);
  }, []);

  const clearAllNotifications = useCallback(() => {
    globalNotifications = [];
    notifyListeners();
  }, []);

  const hasUnread = notifications.length > 0;

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    hasUnread,
  };
}

function removeNotificationGlobal(id: string) {
  globalNotifications = globalNotifications.filter(n => n.id !== id);
  notifyListeners();
}

// Global notification functions for use outside of React components
export function showNotification(notification: Omit<Notification, "id">) {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const newNotification: Notification = {
    ...notification,
    id,
  };

  globalNotifications = [...globalNotifications, newNotification];
  notifyListeners();

  if (!notification.persistent) {
    setTimeout(() => {
      removeNotificationGlobal(id);
    }, 5000);
  }

  return id;
}

// Simulate real-time notifications for demo purposes
export function simulateRealTimeNotifications() {
  const messages = [
    { type: "info" as const, message: "New assignment posted" },
    { type: "success" as const, message: "Bus location updated" },
    { type: "info" as const, message: "Wellbeing check completed" },
    { type: "warning" as const, message: "Weather alert: Heavy rain expected" },
    { type: "success" as const, message: "Payment processed successfully" },
  ];

  setInterval(() => {
    if (Math.random() > 0.7 && globalNotifications.length < 3) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showNotification({
        ...randomMessage,
        title: "SchoolConnect",
      });
    }
  }, 30000); // Every 30 seconds
}
