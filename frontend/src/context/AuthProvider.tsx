import { createContext, useContext, useState, useEffect } from "react";
import { getMeUserProfile } from "@/api/profile";
import type { UserProfile } from "@/api/profile";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  token: string | null;
  user: UserProfile | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserProfile | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (token) {
      // Save token globally
      localStorage.setItem("token", token);

      getMeUserProfile()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        });
    } else {
      console.log("No token found, skipping user profile fetch.");
    }
  }, [token]);
  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    console.debug("Token removed from localStorage");
    queryClient.clear(); // clear cached queries on logout
    console.debug("Query cache cleared");  
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
