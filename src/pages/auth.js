import AppNavbar from '../components/navbar';
import AppAuth from '../database/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Auth() {
    return (
      
        <>
        <AppNavbar />
        <div class="d-flex justify-content-center">
            <AppAuth />
        </div>

           
    
        </>
    
    );
  }
  
  export default Auth;
  