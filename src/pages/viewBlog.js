import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewBlog = () => {
    // Add your logic here to fetch the blog data and store it in a state variable
    const location = useLocation();
    const blogID = new URLSearchParams(location.search).get('id');
    if(!blogID){
        // No blog ID found in the URL
        return (
            <div>
                No blog ID found in the URL
            </div>)
    }
    return (
        <div>
            VIEWING BLOG
            <p>{new URLSearchParams(location.search).get('id')}</p>
            {/* Render the blog content here */}
        </div>
    );
};

export default ViewBlog;