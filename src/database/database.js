import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';


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
      return (<div style={{marginTop: '10%'}}> <Auth supabaseClient={supabase} providers={Email} appearance={{ theme: ThemeSupa }} /> </div>)
    }else{
        return(
            <>
            <div className='container justify-content-center text-center'>
                <h1>Welcome {session.user.email}</h1>
                <h3>What would you like to do today?</h3>

                

                <Carousel>
      <Carousel.Item>
        <img src='https://images.pexels.com/photos/2950003/pexels-photo-2950003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>

        <Carousel.Caption>
        <Link id='homeLink' to={'/'}>Home</Link>
          <p>Go to home page to see other peoples blogs!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://images.pexels.com/photos/1539581/pexels-photo-1539581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>

        <Carousel.Caption>
            <Link id='createLink' to={'/create'} >Create a Blog!</Link>
          <p>Create a new blog and share something great with the World!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://images.pexels.com/photos/2882509/pexels-photo-2882509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        <Carousel.Caption>
        <Link id='aboutLink' to={'/about'} >About</Link>
          <p>
            Go to the about page to learn more about us!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://images.pexels.com/photos/5697262/pexels-photo-5697262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        <Carousel.Caption>
        <Link id='supportLink' to={'/support'}>Support</Link>
          <p>
            Go to the support page to contact us!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://images.pexels.com/photos/134065/pexels-photo-134065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        <Carousel.Caption>
        <button id='logoutButton' onClick={async () => {
                        await supabase.auth.signOut()
                        }}>Sign Out</button>
          <p id='logoutText'>
            Hope to see you soon!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

               
               
              
            </div>
            </>
        );
        
    
    }
  
}

export default AppAuth;
export {supabase};
