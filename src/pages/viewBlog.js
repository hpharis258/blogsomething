import React from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../database/database';
import { useEffect } from 'react';
import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import {Row} from 'react-bootstrap';
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Notiflix from 'notiflix';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

async function deleteBlog(blogID) {
    await supabase.from('blogs').delete().eq('id', blogID);
    Notiflix.Report.success(
        'Success',
        'Blog Deleted!',
        'Okay',
        () => {
            window.location.href = '/';
        }
    );
}

async function GetBlog(blogID) {
//console.log(blogID)
if (!blogID) {
    return null;
}
const { data, error } = await supabase
  .from('blogs')
  .select('*').eq('id', blogID)
    if (error) {
        //console.log(error)
        return error;
    } else {
        //console.log(data)
        return data;
    }
}
async function handleUpvote(blogID, currentUser, data) {
    if(data.upvoted_by?.includes(currentUser)){
        Notiflix.Report.failure(
            'Error',
            'You have already upvoted this blog',
            'Okay',
        );
        return
    }
    if(!data.upvoted_by){
        data.upvoted_by = []
    }
    data.upvoted_by.push(currentUser)
    let CurrentRating = 0;
    if(data.downvoted_by?.length === 0 || !data.downvoted_by)
    {
        CurrentRating = data.upvoted_by?.length;
    }else
    {
        CurrentRating = data.upvoted_by?.length - data.downvoted_by?.length;
    }
    

  
    await supabase.from('blogs').update({upvoted_by:  data.upvoted_by, rating: CurrentRating}).eq('id', blogID);
    Notiflix.Report.success(
        'Success',
        'Upvoted!',
        'Okay',
        () => {
            window.location.reload();
        }
    );
};

async function handleDownvote(blogID, currentUser, data) {
    if(data.downvoted_by?.includes(currentUser)){ 
        Notiflix.Report.failure(
            'Error',
            'You have already downvoted this blog',
            'Okay',
        ); 
        return
    }
    if(!data.downvoted_by){
        data.downvoted_by = []
    }
    data.downvoted_by?.push(currentUser)
    let CurrentRating = 0;
    if(!data.upvoted_by || data.upvoted_by?.length === 0)
    {
        CurrentRating = data.downvoted_by?.length;
    }else
    {
        CurrentRating = data.upvoted_by?.length - data.downvoted_by?.length;
    }
    
    await supabase.from('blogs').update({downvoted_by:  data.downvoted_by, rating: CurrentRating}).eq('id', blogID);
    Notiflix.Report.success(
        'Success',
        'Downvoted!',
        'Okay',
        () => {
            window.location.reload();
        }
    );
};

const ViewBlog = () => {
    // Supabase Session
    const [session, setSession] = useState(null);
    // 
    const location = useLocation();
    const blogID = new URLSearchParams(location.search).get('id');
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    useEffect(() => {
        // Get Blog From supabase
        GetBlog(blogID).then((data) => { setData(data) });
        // get session
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
        //
        
    }, [blogID])
    if(!blogID){
        // No blog ID found in the URL
        return (
            <div>
               This blog does not exist
            </div>)
    }
    if(isLoading || !data){
        return (
            <div>
                Loading...
            </div>
        )
    }
    if(data.length === 0){
        return (
            <div>
               This blog does not exist
            </div>)
    }
    if(data)
    {
        return (
            <>
            <AppNavbar />
            <div className='container'>
                <Card>
                <Card.Header>Author: {data[0].Author} {data[0]?.user == session?.user.id ? <Button onClick={() => window.location.href='/edit?id='+ data[0].id} style={{marginLeft: "74%"}}>Edit Blog</Button> : ""}</Card.Header>
                    
                    <Card.Body>
                        <Card.Title>{data[0].title}</Card.Title>
                        <Card.Text>
                            {data[0].blog}

                        </Card.Text>
                        <Card.Img style={{borderRadius: 10}} variant="top" src={data[0].imageURL} />
                        {console.log(data[0])}
                        <Row style={{marginTop: 20, marginLeft: 20}}>
                            {session === null ? "" : <Button onClick={() =>{ handleUpvote(blogID, session?.user?.id, data[0])}} style={{width: 100}} variant='success'><FontAwesomeIcon icon={faCircleUp} beat /> </Button>}
                           {session === null ? "" : <Button onClick={() => handleDownvote(blogID, session?.user?.id, data[0])} style={{width: 100}}  variant='warning'><FontAwesomeIcon icon={faCircleDown} beat /> </Button>}
                            <div style={{width: 200}} >Upvote Count: {data[0].upvoted_by?.length || 0}</div>
                            <div style={{width: 200}} >Downvote Count: {data[0].downvoted_by?.length || 0}</div>
                        </Row>
                    </Card.Body>
                    
                    
                    <Card.Footer> <small className="text-muted">Created {(data[0].created_at).split('T')[0] }</small>  {data[0]?.user == session?.user.id ? <Button onClick={() => deleteBlog(blogID)} variant='danger' style={{marginLeft: "78%"}}>Delete Blog <FontAwesomeIcon icon={faTrash} beat /></Button> : "" }</Card.Footer>
                </Card>
               
               
            </div>
            <AppFooter />
            </>
        );
    }
  
};

export default ViewBlog;