import AppNavbar from '../components/navbar';
import Accordion from 'react-bootstrap/Accordion';
import AppFooter from '../components/footer';
import React from 'react';
import emailjs from '@emailjs/browser';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import Notiflix from "notiflix";

function Support() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    // function to send email
    const sendEmail = (e) => {
        e.preventDefault();
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = 'Loading...';
        if(!email){
            Notiflix.Report.failure(
                'Error',
                'Add an email!',
                'Okay',
            );
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            return
        }
        if(!message){
            Notiflix.Report.failure(
                'Error',
                'Add a message!',
                'Okay',
            );
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            return
        }
        let fData = {
            service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            user_id: process.env.REACT_APP_EMAILJS_USER_ID,
            template_params: {
                'email': email,
                'message': message
            }
        };
        axios({
            method: "post",
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            data: JSON.stringify(fData),
            headers: {
                'Content-Type':  'application/json'
            }
        })
        .then(function (response) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            //clearInput()
            //handle success
            Notiflix.Report.success(
                'Success',
                response.data.message,
                'Okay',
            );
        })
        .catch(function (error) {
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = 'send message';
            //handle error
            const { response } = error;
            if(response.status === 500) {
                Notiflix.Report.failure(
                    'An error occurred',
                    response.data.message,
                    'Okay',
                );
            }
            if(response.data.errors !== null) {
                //setErrors(response.data.errors)
            }
            
        });

        //window.location.reload();
    }
    //
    return (
        <>
        <AppNavbar />
            <div className='container'>
                <h1>FAQ - BlogSomething.com</h1>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I start?</Accordion.Header>
                        <Accordion.Body>
                        Starting a blog on BlogSomething.com is simple! Just sign up for an account, choose a unique username and start creating your content. Our user-friendly interface makes it easy to write and publish blogs.


                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Can I monetize my blog?</Accordion.Header>
                        <Accordion.Body>
                        Absolutely! BlogSomething.com provides various monetization options for bloggers. You can earn money through affiliate marketing, sponsored posts, and more. Our platform is designed to help you grow your audience and generate revenue from your blog. Get started today and turn your passion for blogging into a profitable venture!
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Is this website free?</Accordion.Header>
                        <Accordion.Body>
                        Yes, absolutely! Creating and maintaining a blog on BlogSomething.com is free. We offer a range of features and tools at no cost, allowing you to start sharing your ideas and creativity with the world without any financial commitment. 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header> How is my user information used?</Accordion.Header>
                        <Accordion.Body>
                        At BlogSomething.com, we prioritize the privacy and security of our users. Your user information is used solely for the purpose of providing and improving our blogging platform's services. We may use your information to personalize your experience, communicate with you about your account and our services, analyze usage patterns to enhance our platform, and comply with legal obligations. Rest assured, we do not sell or share your personal information with third parties for marketing purposes without your consent. For more details, please refer to our comprehensive Privacy Policy.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header> Can I delete all of my user information at any time if I choose to?</Accordion.Header>
                        <Accordion.Body>
                        Yes, you have the right to delete all of your user information from BlogSomething.com at any time. We believe in giving our users full control over their data. You can easily access the account settings section and find the option to delete your account and associated information permanently. Keep in mind that once you delete your account, all your content, including blog posts and comments, will also be permanently removed from our platform. If you have any concerns or need assistance with the deletion process, feel free to reach out to our support team for guidance.
                        </Accordion.Body>
                    </Accordion.Item>
            </Accordion>
            <h1 style={{marginTop: 20}}><u>Have an additional question that is not on here?</u></h1>
            <h1 style={{marginTop: 20}}>Contact us</h1>
            <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(changeEvent) => setEmail(changeEvent.target.value)} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your Message</Form.Label>
        <Form.Control value={message} onChange={(changeEvent) => setMessage(changeEvent.target.value)} placeholder='I have a question about...' as="textarea" rows={3} />
        <Button style={{marginTop: 10}} id='submitBtn' onClick={sendEmail} variant="primary" type="submit"> Submit </Button>
      </Form.Group>
    </Form>
          
            </div>
        <AppFooter />
        </>
     
    );
  }
  
  export default Support;
  