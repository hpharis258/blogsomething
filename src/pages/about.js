import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';

function About() {
    return (
        <>
        <AppNavbar />
        <div style={{marginTop: "5%"}} class="d-flex justify-content-center">
            <h1>About Us at BlogSomething.com</h1>
        </div>
        <div style={{marginLeft: "25%", marginRight: "25%", marginBottom: 20}} class="d-flex justify-content-center">
            <p>
            Welcome to BlogSomething.com, where every word matters and every voice can echo around the world! We are more than just a blogging website—we are a vibrant community of writers, thinkers, and dreamers. Our platform was founded in 2024 with a simple mission: to empower individuals to share their thoughts, ideas, and stories with a global audience.
            </p>
        </div>
        <div class="d-flex justify-content-center">
            <h4>Our Philosophy</h4>
        </div>
        <div style={{marginLeft: "26%", marginRight: "26%"}} class="d-flex justify-content-center">
            <p>We believe that everyone has something valuable to say. At BlogSomething.com, we strive to offer a platform that is as diverse as our community. Whether you are a seasoned blogger or just starting your first post, our site is designed to be intuitive, user-friendly, and supportive. We encourage freedom of expression and foster an environment where ideas can flourish and diverse viewpoints are respected.
</p>
        </div>
       
        <div class="d-flex justify-content-center">
            <h4>Join Us!</h4>
        </div>
        <div style={{marginLeft: "27%", marginRight: "27%"}} class="d-flex justify-content-center">
            <p>
            Whether you're looking to share your latest culinary adventures, offer insights into the world of tech, or inspire with your personal growth story, BlogSomething.com is the place for you. Join our community of bloggers today and start making an impact with your words!

We invite you to explore, engage, and enjoy the journey of blogging with us at BlogSomething.com. Your next great post is just a thought away!

Thank you for visiting our About Us page. We can't wait to see what you'll blog something about next!








            </p>
        </div>
        <div class="d-flex justify-content-center">
            <h4>What We Offer</h4>
        </div>
        <div class="d-flex justify-content-center">
            <ul>
                <li>Easy-to-use blogging tools</li>
                <li>Community forums and discussion boards</li>
                <li>Opportunities to collaborate with other bloggers</li>
                <li>And much more!</li>
            </ul>
        </div>
        <AppFooter />
        </>
     
    );
  }
  
  export default About;
  