import { AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { jwtDecode } from "jwt-decode";
import { Session } from "@supabase/supabase-js";

type MyAuthToken = {
  aud: string
  exp: number
  iat: number
  iss: string
  sub: string

  email?: string
  email_verified?: boolean
  user_role?: string
  user_metadata?: any
}


const AuthService = {
    activate: () => {
        // Tells Supabase Auth to continuously refresh the session automatically if
        // the app is in the foreground. When this is added, you will continue to receive
        // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
        // if the user's session is terminated. This should only be registered once.
        AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                supabase.auth.startAutoRefresh()
            } else {
                supabase.auth.stopAutoRefresh()
            }
        });
    },

    signUp: ({email, password}: {email: string, password: string}) => {
        return supabase.auth.signUp({ email, password });
    },
    signIn: ({email, password}: {email: string, password: string}) => {
        return supabase.auth.signInWithPassword({ email, password });
    },
    signOut: () => {
        supabase.auth.signOut();
    },

    getUserRoles: (session: Session) => jwtDecode<MyAuthToken>(session.access_token).user_role,
        
}

export default AuthService;