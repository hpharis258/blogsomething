import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';

console.log(process.env.REACT_APP_SUPABASE_URL);

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_API_KEY);

function AppAuth() {
  return (
    <Auth supabaseClient={supabase} />
  );
}

export default AppAuth;