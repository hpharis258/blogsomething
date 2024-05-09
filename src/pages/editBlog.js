import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../database/database';
import AppAuth from '../database/database';
import { Form, Button } from 'react-bootstrap';
import Notiflix from 'notiflix';
import Image from 'react-bootstrap/Image';
import { Container, Row, Col } from 'react-bootstrap';

async function GetBlog(blogID) {
    if (!blogID) {
        return null;
    }
    const { data, error } = await supabase
      .from('blogs')
      .select('*').eq('id', blogID)
        if (error) {
            return error;
        } else {
            return data;
        }
}
async function handleUpdate(title, content, blogID, session) {
    if(!title){
        Notiflix.Report.failure(
            'Error',
            'Add a title!',
            'Okay',
        );
        return
    }
    if(!content){
        Notiflix.Report.failure(
            'Error',
            'Add some content!',
            'Okay',
        );
        return
    }
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').innerHTML = 'Loading...';
    // Upload Image
    const fileInput = document.getElementById('formFileLg');
    const file = fileInput?.files[0];
    if(file != null && file != undefined){
    const fileName = file.name+session.user.id+Date.now();
    const filePath = `blogs/${fileName}`;
    const {data} = await supabase
    .storage
    .from('images')
    .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
    })
    let ImageURL = "https://nssawtgybrwtsvhhsohw.supabase.co/storage/v1/object/public/" + data.fullPath;
    await supabase.from('blogs').update({title: title, blog: content, imageURL: ImageURL}).eq('id', blogID);
    Notiflix.Report.success(
        'Success',
        'Blog Updated!',
        'Okay',
        () => {
            window.location.href = '/'
        }
    );
    }
    else{
        await supabase.from('blogs').update({title: title, blog: content}).eq('id', blogID);
        Notiflix.Report.success(
            'Success',
            'Blog Updated!',
            'Okay',
            () => {
                window.location.href = '/'
            }
        );
    }
};

function Edit() {
  const location = useLocation();
    const blogID = new URLSearchParams(location.search).get('id');
     // Supabase Session
    const [session, setSession] = useState(null);
    const [blogData, setBlogData] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        GetBlog(blogID).then((data) => {
            if(data.length === 0){
              Notiflix.Report.failure(
                  'Error',
                  'Blog not found!',
                  'Okay',
                  () => window.location.href = '/'
              );
            }
            setBlogData(data[0]);
            setTitle(data[0]?.title);
            setContent(data[0]?.blog);

        });
    }, [blogID]);
    if(!blogID){
        // If no blog id is provided, redirect to home page
        window.location.href = '/'
    }
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
      }
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
                                <Form.Control type="text" placeholder="My Blog Title!" value={title} onChange={(val) => {setTitle(val.target.value); }} />
                        </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Content</Form.Label>
                                <Form.Control as="textarea" rows={3} value={content} onChange={(changeEvent) => {setContent(changeEvent.target.value); }} placeholder='Something you want to share with the world!'/>
                        </Form.Group>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Current Image</Form.Label>
                            <Container>
                            <Row>
                              <Col xs={6} md={4}>
                              <Image thumbnail src={blogData?.imageURL} />
                              </Col>
                             
                            </Row>
                            </Container>
                            
                         
                        </Form.Group>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Upload a new Image</Form.Label>
                            <Form.Control accept='image/*' type="file"  />
                        </Form.Group> 
                        <Button onClick={() => handleUpdate(title, content, blogID, session)} id='submitBtn' variant="primary">Update</Button>
                    </Form>
            </div>
        <AppFooter />
      </>
    );
  }
  
  export default Edit;
  