import AppNavbar from '../components/navbar';
import AppFooter from '../components/footer';

function PageNotFound() {
    return (
        <>
        <AppNavbar />
            <div className='container vh-100'>
                <h1>The Page you are looking for does not exist</h1>
                
            </div>
        <AppFooter />
        </>
     
    );
  }
  
  export default PageNotFound;
  