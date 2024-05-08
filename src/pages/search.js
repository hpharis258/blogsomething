import AppNavbar from "../components/navbar";
import AppFooter from "../components/footer";
import { supabase } from "../database/database";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

async function SearchBlogs(searchTerm) {
    const { data, error } = await supabase
    .from('blogs')
    .select()
    .textSearch('title', searchTerm);
    if (error) {
        console.log(error)
        return error;
    } else {
        console.log(data)
        return data;
    }
}

function SearchPage () {
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('searchTerm');
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const data = await SearchBlogs(searchTerm);
            setBlogs(data);
            setIsLoading(false);
        }
        fetchData();
    }, [searchTerm]);

    if(isLoading){
        return (
            <>
            <AppNavbar />
            <h1>Loading...</h1>
            <AppFooter />
            </>
        )
    }
    if(blogs.length === 0){
        return (
            <>
            <AppNavbar />
            <h1>No Blogs Found</h1>
            <AppFooter />
            </>
        )
    }
  return (
    <>
    <AppNavbar />
    <div className='vh-100 container'>
        <div style={{marginLeft: 20}} className="mb-4"><h3>{blogs.length} blogs matched the search term {searchTerm}</h3></div> 
                {blogs.map((blog) => {
                    return (
                        <div style={{marginTop:10, marginBottom:10}} className='container' key={blog.id}>
                        <Card>
                        <Card.Header>Author: {blog.Author}</Card.Header>
                            
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
                                    {/* <div style={{width: 200}} >{blog.country  == null ? "No Country added" : "Country: " + blog.country }</div> */}
                                </Row>
                            </Card.Body>
                            
                            
                            <Card.Footer> <small className="text-muted">Created {(blog.created_at).split('T')[0] }</small></Card.Footer>
                        </Card>
                       
                       </div>
                   
                    )
                })}
                {/* <Pagination>
                    <Pagination.Prev onClick={() => goToPrevpage(currentPage, start, end, setStart, setEnd, setCurrentPage)} />
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => goToNextpage(currentPage, start, end, setStart, setEnd, setCurrentPage, blogs)} />
                </Pagination> */}
            </div>
       
    <AppFooter />
    </>
  );
}

export default SearchPage;