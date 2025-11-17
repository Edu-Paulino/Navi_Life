import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useDispatch } from 'react-redux';
import { setProfile, setLoading as setUserLoading, Profile } from '../store/slices/userSlice';
import { router, useSegments } from 'expo-router';

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(session: Session | null, profile: Profile | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/login');
    } else if (session && profile && !profile.onboarding_completed) {
      router.replace('/onboarding');
    } else if (session && inAuthGroup) {
      router.replace('/(app)/(tabs)');
    }
  }, [session, profile, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfileState] = useState<Profile | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) {
          dispatch(setProfile(data));
          setProfileState(data);
        }
      }
      setLoading(false);
      dispatch(setUserLoading(false));
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) {
          dispatch(setProfile(data));
          setProfileState(data);
        }
      } else {
        dispatch(setProfile(null));
        setProfileState(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
  
  useProtectedRoute(session, profile);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
