import AppNavbar from "../components/navbar";
import AppFooter from "../components/footer";
import { useEffect } from "react";
import { supabase } from "../database/database";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Notiflix from "notiflix";
import AppAuth from "../database/database";
import Form from "react-bootstrap/Form";
import { createClient } from '@supabase/supabase-js'


async function changePassword(firstPassword, secondPassword) {
    if(firstPassword !== secondPassword){
        Notiflix.Report.failure(
            'Error',
            'Passwords do not match',
            'Okay',
        );
        return
    }
    if(firstPassword.length < 8){
        Notiflix.Report.failure(
            'Error',
            'Password must be at least 8 characters',
            'Okay',
        );
        return
    }
    const { data, error } = await supabase.auth.updateUser({
        password: firstPassword,
      })
    if (error) {
        Notiflix.Report.failure(
            'Error',
            error.message,
            'Okay',
        );
    } 

    Notiflix.Report.success(
        'Success',
        'Password Changed',
        'Okay',
    );
}

async function deleteAccount(user_id) {
    const supabaseAdmin = await createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_API_ADMIN_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      // Sign a User Out
     await supabase.auth.signOut();
      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
        user_id,
      )
        if (error) {
            Notiflix.Report.failure(
                'Error',
                error.message,
                'Okay',
            );
        }
        Notiflix.Report.success(
            'Success',
            'Account Deleted',
            'Okay',
        );
        window.location.href = '/'
};

function Settings() {
    const [session, setSession] = useState(null);
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    

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
        if(!session){
            return (
                <>
                <AppNavbar />
                    <div className="d-flex justify-content-center">
                        <AppAuth />
                    </div>
                <AppFooter />
                </>
            
            );
        }else
        {
            return (
                <>
                    <AppNavbar />
                    <div className="container">
                        <Card>
                            <Card.Body>
                                <Card.Title>Settings</Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Account Email</Form.Label>
                                            <Form.Control type="email" value={session.user.email} readOnly={true} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formFirstPassword">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control value={firstPassword} onChange={(changeEvent) => setFirstPassword(changeEvent.target.value)} type="password" placeholder="Enter new password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formSecondPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control value={secondPassword} onChange={(changeEvent) => setSecondPassword(changeEvent.target.value)} type="password" placeholder="Confirm Password" />
                                        </Form.Group>
                                       
                                    </Form>
                                </Card.Text>
                               
                      


                                <Card.Text>
                                    <Button onClick={() => changePassword(firstPassword, secondPassword)} variant="warning">Change Password</Button>
                                </Card.Text>
                                <Card.Text>
                                    <Button onClick={() => deleteAccount(session.user.id)} variant="danger">Delete Account</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{marginTop: '18%'}}>
                    <AppFooter />
                    </div>
                   
                </>
            );
        
        }
  
    
  
}

export default Settings;