"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AdminUser {
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithPassword: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed", data);
        toast.error(data.message || "Login failed");
        return;
      }

      setUser({
        email: data.email,
        displayName: null,
        photoURL: null,
        role: data.role,
      });

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error.message || "Login failed");
    }
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/admin-signout", { method: "POST" });
      setUser(null);
      toast.success("Signed out");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
