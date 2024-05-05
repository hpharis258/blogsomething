import AppNavbar from '../components/navbar';
import AppAuth from '../database/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppFooter from '../components/footer';

function Auth() {
    return (
      
        <>
        <AppNavbar />
        <div class="d-flex justify-content-center">
            <AppAuth />
        </div>

        
            <AppFooter />

       
    
        </>
    
    );
  }
  
  export default Auth;
  