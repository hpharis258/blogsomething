import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../database/database';
import AppAuth from '../database/database';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Notiflix from 'notiflix';

function Create() {
    const [session, setSession] = useState(null);
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isContentValid, setIsContentValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit = async (title, content) => {
        if(!title){
            setIsTitleValid(true);
            alert('Add a title!')
            return
        }
        if(!content){
            setIsContentValid(true);
            alert('Add some content!')
            return
        }
        const { data, error } = await supabase.from('blogs').insert(
            { title: title, blog: content, user: session.user.id },
          )
          if(error){
              console.log(error)
          } else {
              console.log(data)
          }
          Notiflix.Report.success(
            'Success',
            'Blog Created!',
            'Okay',
            () => {
                window.location.href = '/'
            }
        );
    };

    useEffect(() => {
        setIsLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        setIsLoading(false)
        return () => subscription.unsubscribe()
        
      }, [])
      if(isLoading){
            return (
                <div><FontAwesomeIcon icon={faSpinner} spinPulse /></div>
            )
    } else
    {
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
          } else {
        return (
            <>  
            <AppNavbar /> 
            <div className='vh-100 container'>
                <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" value={session.user.email} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control isInvalid={isTitleValid} type="text" placeholder="My Blog Title!" value={title} onChange={(val) => {setTitle(val.target.value); setIsTitleValid(false)}} />
                        </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Content</Form.Label>
                                <Form.Control isInvalid={isContentValid} as="textarea" rows={3} value={content} onChange={(changeEvent) => {setContent(changeEvent.target.value); setIsContentValid(false)}} placeholder='Something you want to share with the world!'/>
                        </Form.Group>
                        <Button onClick={() => {handleSubmit(title, content)}} variant="primary">Submit</Button>
                    </Form>
            </div>
              
            <AppFooter />
            </>
       
        );
    }

     
}
  }
  
  export default Create;
  