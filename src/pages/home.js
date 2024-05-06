import React from 'react';
import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';
import {supabase} from '../database/database';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

async function getBlogs(start, end) {
    const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .range(start, end);
    if (error) {
        console.log(error)
        return error;
    } else {
        console.log(data)
        return data;
    }
};

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getBlogs(start, end).then((data) => {
            setBlogs(data)
            console.log(blogs)
            setIsLoading(false)
        })
    }, [start, end])
    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }else{
        return (
            <>
            <AppNavbar/>
            <div className='vh-100 container'>
                {blogs.map((blog) => {
                    return (
                        <div className='container' key={blog.id}>
                        <Card>
                        <Card.Header>Author: {blog.user}</Card.Header>
                            
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>
                                    {blog.blog}
        
                                </Card.Text>
                                <Card.Img style={{borderRadius: 10}} variant="top" src={blog.imageURL} />

                                <Row style={{marginTop: 20, marginLeft: 20}}>
                                    <Button onClick={() => window.location.href="/viewBlog?id=" + blog.id} style={{width: 200}} variant='primary'>View this Blog</Button>
                                   
                                    <div style={{width: 200}} >Upvote Count: {blog.upvoted_by?.length || 0}</div>
                                    <div style={{width: 200}} >Downvote Count: {blog.downvoted_by?.length || 0}</div>
                                </Row>
                            </Card.Body>
                            
                            
                            <Card.Footer> <small className="text-muted">Created {(blog.created_at).split('T')[0] }</small></Card.Footer>
                        </Card>
                       
                       </div>
                   
                    )
                })}
            </div>
            <AppFooter/>
            </>
        )
    }

}
  export default Home;
  