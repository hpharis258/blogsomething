import React from 'react';
import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';
import {supabase} from '../database/database';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import Notiflix from 'notiflix';

async function getBlogs(start, end) {
    const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .range(start, end).order('rating', {ascending: false});
    if (error) {
        console.log(error)
        return error;
    } else {
        console.log(data)
        return data;
    }
};

function goToNextpage (currentPage ,start, end, setStart, setEnd, setCurrentPage, blogs) {
    if(blogs.length < 5){
        Notiflix.Report.failure(
            'Error',
            'You are already on the last page',
            'Okay',
        );
        return
    }
    setStart(start + 5);
    setEnd(end + 5);
    setCurrentPage(currentPage + 1);

}

function goToPrevpage (currentPage ,start, end, setStart, setEnd, setCurrentPage) {
    if(currentPage === 1){
        Notiflix.Report.failure(
            'Error',
            'You are already on the first page',
            'Okay',
        );
        return
    }
    setStart(start - 5);
    setEnd(end - 5);
    setCurrentPage(currentPage - 1);
}

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
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
            <>
            <AppNavbar/>
            <div><h1>Loading...</h1></div>
            <AppFooter/>
            </>
        )
    }
    if(blogs.length === 0){
        return (
            <>
            <AppNavbar/>
            <div className='container'><h1>There are no blogs in the database :( </h1></div>
            <AppFooter/>
            </>
        )
    }
        return (
            <>
            <AppNavbar/>
            <div className='vh-100 container'>
                {blogs.map((blog) => {
                    return (
                        <div style={{marginTop: 10, marginBottom:10}} className='container' key={blog.id}>
                        <Card>
                        <Card.Header>Author: {blog.Author}</Card.Header>
                            
                            <Card.Body>
                                <Card.Title> <h1>{blog.title}</h1></Card.Title>
                                <Card.Text>
                                    <p>{blog.blog}</p>
                                    
        
                                </Card.Text>
                                <Card.Img style={{borderRadius: 10}} variant="top" src={blog.imageURL} />

                                <Row style={{marginTop: 20, marginLeft: 20}}>
                                    <Button onClick={() => window.location.href="/viewBlog?id=" + blog.id} style={{width: 200}} variant='primary'>View this Blog</Button>
                                   
                                    <div style={{width: 200}} >Upvote Count: {blog.upvoted_by?.length || 0}</div>
                                    <div style={{width: 200}} >Downvote Count: {blog.downvoted_by?.length || 0}</div>
                                    {/* <div style={{width: 200}} >{blog.country  == null ? "No Country added" : "Country: " + blog.country }</div> */}
                                </Row>
                            </Card.Body>
                            
                            
                            <Card.Footer> <small className="text-muted">Created {(blog.created_at).split('T')[0] }</small></Card.Footer>
                        </Card>
                       
                       </div>
                   
                    )
                })}
                <Pagination>
                    <Pagination.Prev onClick={() => goToPrevpage(currentPage, start, end, setStart, setEnd, setCurrentPage)} />
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => goToNextpage(currentPage, start, end, setStart, setEnd, setCurrentPage, blogs)} />
                </Pagination>
            </div>
            <AppFooter/>
            </>
        )
    

}
  export default Home;
  