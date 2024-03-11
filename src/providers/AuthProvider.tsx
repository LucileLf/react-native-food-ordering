 import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { isLoading } from 'expo-font';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

 type AuthData = {
  session: Session | null;
  loading: boolean;
 };

 const AuthContext = createContext<AuthData>({
  session: null,
  loading: true
 });

 export default function AuthProvider({children}: PropsWithChildren) {
  const [ session, setSession ] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user session from supabase
    const fetchSession = async() =>  {
      const { data, error } = await supabase.auth.getSession();
      // console.log(data);
      setSession(data.session)
      setLoading(false)
    };
    // cannot run async code in useEffect -> call function right after declaring it
    fetchSession()
    
    // subscribe to session changes :
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])
  // QUERY SESSION
  return <AuthContext.Provider value={{session, loading}}>{children}</AuthContext.Provider>
 }

 export const useAuth = () => useContext(AuthContext)
