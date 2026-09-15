"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type UserRole = "user" | "admin";

export type CurrentUser = {
  name: string;
  email: string;
  role: UserRole;
};

type UserContextValue = {
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const currentUserKey = "chamKonTumCurrentUser";
const userChangedEvent = "userChanged";

const UserContext = createContext<UserContextValue | null>(null);

export function isAdminUser(user: CurrentUser | null) {
  if (!user) {
    return false;
  }

  return (
    user.role === "admin" ||
    user.name.trim().toLowerCase() === "admin" ||
    user.email.trim().toLowerCase() === "admin@chamkontum.vn"
  );
}

function getCurrentUserJson() {
  if (typeof window === "undefined") {
    return "null";
  }

  return localStorage.getItem(currentUserKey) ?? "null";
}

function parseCurrentUser(currentUserJson: string): CurrentUser | null {
  try {
    const user = JSON.parse(currentUserJson) as Partial<CurrentUser> | null;

    if (!user?.name || !user?.email) {
      return null;
    }

    const currentUser: CurrentUser = {
      name: user.name,
      email: user.email,
      role: user.role === "admin" ? "admin" : "user",
    };

    if (isAdminUser(currentUser)) {
      return {
        ...currentUser,
        name: "Admin",
        email: "admin@chamkontum.vn",
        role: "admin" as const,
      };
    }

    return currentUser;
  } catch {
    return null;
  }
}

function subscribeUserChange(onStoreChange: () => void) {
  window.addEventListener(userChangedEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(userChangedEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUserJson = useSyncExternalStore(
    subscribeUserChange,
    getCurrentUserJson,
    () => "null"
  );

  const currentUser = useMemo(
    () => parseCurrentUser(currentUserJson),
    [currentUserJson]
  );

  const saveUser = useCallback((user: CurrentUser) => {
    localStorage.setItem(currentUserKey, JSON.stringify(user));
    window.dispatchEvent(new Event(userChangedEvent));
  }, []);

  const login = useCallback(
    (username: string, password: string) => {
      const normalizedUsername = username.trim().toLowerCase();

      if (normalizedUsername === "admin" && password === "123") {
        saveUser({
          name: "Admin",
          email: "admin@chamkontum.vn",
          role: "admin",
        });
        return true;
      }

      if (normalizedUsername === "admin") {
        return false;
      }

      if (username.trim() && password.trim()) {
        saveUser({
          name: username,
          email: `${username}@user.local`,
          role: "user",
        });
        return true;
      }

      return false;
    },
    [saveUser]
  );

  const register = useCallback(
    (name: string, email: string, password: string) => {
      if (!name.trim() || !email.trim() || !password.trim()) {
        return false;
      }

      saveUser({
        name,
        email,
        role: "user",
      });
      return true;
    },
    [saveUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(currentUserKey);
    window.dispatchEvent(new Event(userChangedEvent));
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({
      currentUser,
      login,
      register,
      logout,
    }),
    [currentUser, login, logout, register]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser phải được dùng bên trong UserProvider");
  }

  return context;
}
