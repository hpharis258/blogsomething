import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { redirect } from "react-router-dom";


console.log(process.env.REACT_APP_SUPABASE_URL);

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_API_KEY);

function AppAuth() {
     // Supabase Session
  const [session, setSession] = useState(null);
  const [Email, setEmail] = React.useState("");
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])
  
    if(!session) {
      return <Auth supabaseClient={supabase} providers={Email} appearance={{ theme: ThemeSupa }} />
    }else{
        return(
            <>
            <div className='container'>
                <h1>Welcome {session.user.email}</h1>
                <h2>You have logged in successfully!</h2>

                <button onClick={async () => {
                  await supabase.auth.signOut()
                }}>Sign Out</button>
            </div>
            </>
        );
        
    
    }
  
}

export default AppAuth;
export {supabase};
