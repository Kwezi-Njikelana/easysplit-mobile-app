import { create } from "zustand";
import { User } from "../types";
import { supabase } from "../supabase-client";
import { getAuthError } from "../utils/authErrors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    console.log("Login attempt for: ", email);

    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.warn("login error: ", error.code, error.message);
        throw new Error(getAuthError(error));
      }

      const authUser = data.user;
      console.log("Fetching profile for user: ", authUser.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

        if (profileError ) {
          console.warn("Profile fetch error: ", profileError.code, profileError.message);
          throw new Error(getAuthError(profileError));
        }

     const user: User = {
      id: authUser.id,
      email: authUser.email!,
      fullName: profile.name,
      avatar: profile.avatar ?? undefined,
      phoneNumber: profile.phone_number ?? undefined,
      createdAt: profile.created_at,
    };

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error instanceof Error ? error : new Error(getAuthError(error));
    }
  },

  signup: async (email: string, password: string, fullName: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: fullName,
          },
        },
      });
  if (error) {
        console.warn("Signup: error ", error.code, error.message);
        throw new Error("Account creation failed. Please try again.");
      }


      const authUser = data.user;
    if (!authUser) throw new Error("User creation failed");


     const user: User = {
      id: authUser.id,
      email: authUser.email!,
      fullName: fullName,
      createdAt: authUser.created_at,
    };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error instanceof Error ? error : new Error(getAuthError(error));
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));
