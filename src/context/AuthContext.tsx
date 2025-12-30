"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Listen for Auth State Changes
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setCookie(null, "session", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        setLoading(false); // User found, stop loading immediately
      } else {
        setUser(null);
        destroyCookie(null, "session");
        // Don't stop loading here yet! Wait for getRedirectResult.
      }
    });

    // 2. Check for Redirect Result (Handles the page reload after Google login)
    getRedirectResult(auth)
      .then((result) => {
        // If no redirect calculation happened (result is null) AND no user, stop loading.
        if (!result && !auth.currentUser) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Redirect Login Error:", error);
        toast.error(error.message || "Login failed");
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // No need to toast here, redirect happens immediately
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error(error.message || "Login failed");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
