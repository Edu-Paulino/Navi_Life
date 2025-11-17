import React, { useState, useEffect, createContext, useContext, PropsWithChildren } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';

export type Profile = {
  id: string;
  full_name: string;
  updated_at: string;
  onboarding_completed: boolean;
  integrates_calendar: boolean;
  receives_financial_news: boolean;
};

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  loading: true,
  signOut: () => {},
  updateProfile: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      
      // 1. Get session
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        Alert.alert('Erro de Sessão', sessionError.message);
        setLoading(false);
        return;
      }

      setSession(currentSession);

      // 2. If session exists, get profile
      if (currentSession?.user) {
        try {
          const { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setProfile(data);
          }
        } catch (error: any) {
          Alert.alert('Erro ao buscar perfil', error.message);
        }
      }
      
      setLoading(false);
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        // If user logs out, clear profile
        if (!newSession) {
          setProfile(null);
        } else if (newSession && _event === 'SIGNED_IN') {
           // If user signs in, refetch profile
           const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession.user.id)
            .single();
          if (data) setProfile(data);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session.user.id)
        .select()
        .single();
      
      if (error) throw error;

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error: any) {
      Alert.alert('Erro ao atualizar perfil', error.message);
    }
  };

  const value = {
    session,
    profile,
    loading,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
