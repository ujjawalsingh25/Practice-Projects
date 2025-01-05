import { useEffect, useState } from 'react';
import type { Database } from 'database.types';
import { useRevalidator } from '@remix-run/react';
import { createBrowserClient } from '@supabase/ssr';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseClient = SupabaseClient<Database>;

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient;
  domainUrl: string;
};

type SupabaseEnv = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

type UseSupabase = {
  env: SupabaseEnv;
  serverSession: Session | null;
};

export const useSupabase = ({ env, serverSession }: UseSupabase) => {
    const revalidator = useRevalidator();
    const serverAccessToken = serverSession?.access_token;
  
    const [supabase] = useState(() =>
        createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
    );

    useEffect(() => {
        const {data: { subscription }} = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth event happened: ', event, session);
            if (session?.access_token !== serverAccessToken) {
                revalidator.revalidate();       // if user have not session redirect to login page
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [supabase.auth, serverAccessToken, revalidator]);

  return { supabase };
};
