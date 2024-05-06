import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import { supabase } from '../database/database';
import { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function AppNavbar() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        return () => subscription.unsubscribe()
      }, [])
     
           
    if(!session){
        return (
            <>
             
                <Navbar key={1} expand={'md'} className="bg-body-tertiary mb-3">
                  <Container fluid>
                    <Navbar.Brand href="/">BlogSomething.com</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
                    <Navbar.Offcanvas
                      id={`offcanvasNavbar-expand-${'md'}`}
                      aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
                      placement="end"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
                          Offcanvas
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link href="/">Home</Nav.Link>
                          <Nav.Link href="/about">About</Nav.Link>
                          <NavDropdown
                            title="More"
                            id={`offcanvasNavbarDropdown-expand-${'md'}`}
                          >
                            <NavDropdown.Item href="/create">Create a Blog</NavDropdown.Item>
                            <NavDropdown.Item href="/auth">
                              Login or Register
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/support">
                              Support
                            </NavDropdown.Item>
                           
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://buymeacoffee.com/haroldas">
                              Buy me a coffee
                            </NavDropdown.Item>
                          </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                          />
                          <Button variant="outline-success">Search</Button>
                        </Form>
                      </Offcanvas.Body>
                    </Navbar.Offcanvas>
                  </Container>
                </Navbar>
        
            </>
          );
    } else {
        return (
            <>
              
                <Navbar key={1} expand={'md'} className="bg-body-tertiary mb-3">
                  <Container fluid>
                    <Navbar.Brand href="/">BlogSomething.com</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
                    <Navbar.Offcanvas
                      id={`offcanvasNavbar-expand-${'md'}`}
                      aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
                      placement="end"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
                          Offcanvas
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                          <Nav.Link href="/">Home</Nav.Link>
                          <Nav.Link href="/about">About</Nav.Link>
                          <NavDropdown
                            title="More"
                            id={`offcanvasNavbarDropdown-expand-${'md'}`}
                          >
                            <NavDropdown.Item href="/create">Create a Blog</NavDropdown.Item>
                            <NavDropdown.Item href="/auth">
                              Login or Register
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/support">
                              Support
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/settings">
                              Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={async () => { 
                                await supabase.auth.signOut();
                                }}>
                              Log out
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://buymeacoffee.com/haroldas">
                              Buy me a coffee
                            </NavDropdown.Item>
                          </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                          />
                          <Button variant="outline-success">Search</Button>
                        </Form>
                      </Offcanvas.Body>
                    </Navbar.Offcanvas>
                  </Container>
                </Navbar>
        
            </>
          );
    }
      
}

export default AppNavbar;