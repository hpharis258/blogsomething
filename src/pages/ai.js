import AppNavbar from "../components/navbar";
import AppFooter from "../components/footer";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { supabase } from "../database/database";
import { useState, useEffect } from "react";
import AppAuth from "../database/database";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function GenerateBlog() {
    document.getElementById("generateButton").disabled = true;
    document.getElementById("generateButton").innerHTML = "Loading...";

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "user",
      "content": "You are a helpful assistant for a blogging platform called blogsomething.com, please generate a random blog, it should have a title and some content."
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
let choices = response.choices;
let aiResponse = choices[0].message.content;

document.getElementById("generatedContent").innerHTML = aiResponse;
console.log(response);
document.getElementById("generateButton").disabled = false;
document.getElementById("generateButton").innerHTML = "Generate Blog";

}



function AI()
{
      // Supabase Session
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
                <AppNavbar />
                    <div className="d-flex justify-content-center">
                        <AppAuth />
                    </div>
                <AppFooter />
                
            </>
        )
      }
    return (
        <>
        <AppNavbar />
        <div className="container">
            <h1 id="generatedTitle">Develop Blog Ideas with AI!</h1>
            <Card>
                <Card.Header>Author: AI to be exact "gpt-3.5-turbo-0125" </Card.Header>
                    
                    <Card.Body>
                        
                        <Card.Text id="generatedContent">
                        Press the button below to generate a blog.

                        </Card.Text>
                       
                    </Card.Body>
                    
                    
                    <Card.Footer>  </Card.Footer>
                </Card>
                <div>
                
              
                <Button style={{marginTop: 10}} id="generateButton" onClick={GenerateBlog}>Generate Blog</Button>

            </div>
        </div>
        <AppFooter />
        </>
       
    );
}

export default AI;