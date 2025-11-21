import { useState, useEffect } from "react";

type UserRole = "student" | "parent" | "teacher" | "admin" | null;

let globalRole: UserRole = null;
let listeners: Array<(role: UserRole) => void> = [];

function notifyListeners() {
  listeners.forEach(listener => listener(globalRole));
}

export function useRole() {
  const [role, setRoleState] = useState<UserRole>(globalRole);

  useEffect(() => {
    const listener = (newRole: UserRole) => {
      setRoleState(newRole);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const setRole = (newRole: UserRole) => {
    globalRole = newRole;
    // Store in localStorage for persistence
    if (newRole) {
      localStorage.setItem('schoolconnect-role', newRole);
    } else {
      localStorage.removeItem('schoolconnect-role');
    }
    notifyListeners();
  };

  // Initialize role from localStorage on first load
  useEffect(() => {
    const storedRole = localStorage.getItem('schoolconnect-role') as UserRole;
    if (storedRole && !globalRole) {
      globalRole = storedRole;
      setRoleState(storedRole);
    }
  }, []);

  return {
    role,
    setRole,
  };
}
