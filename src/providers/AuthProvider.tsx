 import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import { Session } from '@supabase/supabase-js';
import { isLoading } from 'expo-font';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

 type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any;
  isAdmin: boolean
 };

 const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false
 });

 export default function AuthProvider({children}: PropsWithChildren) {
  const [ session, setSession ] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user session from supabase
    const fetchSession = async() =>  {
      const { data: {session} } = await supabase.auth.getSession();
      // console.log(data);
      setSession(session)

      if (session) {
        // fetch profile-> query supabase from profile table
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false)
    };
    // cannot run async code in useEffect -> call function right after declaring it
    fetchSession()

    // subscribe to session changes :
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  // console.log('profile', profile);

  // QUERY SESSION
  return <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === 'ADMIN'}}>{children}</AuthContext.Provider>
 }

 export const useAuth = () => useContext(AuthContext)
