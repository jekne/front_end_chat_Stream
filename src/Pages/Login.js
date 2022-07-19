import { useState,useEffect } from "react";
import {Container} from "react-bootstrap";
import { Form } from "react-bootstrap";
import {Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import { apiUrl } from "../Config/constants.js";
import { StreamChat } from "stream-chat";
import { useNavigate } from 'react-router-dom'
import { getTokenAndConnectUser } from "../Utils/getTokenAndConnectUser.js";



const API_KEY =  "9q8cp29sk4fh";
const PORT = process.env.REACT_APP_PORT;
const client = StreamChat.getInstance(API_KEY);

export default function Login ({setConnectUser}){
    const [userId, setUserId] = useState("");
      const [error, setError] = useState(null);

    // let history = useNavigate()


    // const loginUser = async (userId) => {
   
    //     const response = await axios.get(`${apiUrl}/token?userId=${userId}`);
    //         const token= response.data.token

    // //   console.log("my response", response.data)
    //     const chatClient = await client.connectUser(
    //         { id: userId },
    //       token
    //       );
    //       console.log(" chat client",chatClient)
    //     return chatClient;
    //   };
// console.log("the login user ",loginUser)
    
    const submitForm = (event) => {
      event.preventDefault();
      // console.log(" userId",userId) 
        getTokenAndConnectUser(userId, setConnectUser, setError);
      };


    return (
    <div>
        <h1>Welcome to the STREAM chat</h1>
        <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='mt-5 mb-5'>Login</h1>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Name </Form.Label>
          <Form.Control
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            type='email'
            placeholder='Enter user name'
            required
          />
        </Form.Group> 
        <Form.Group className='mt-5'>
          <Button variant='primary' type='submit' onClick={submitForm}>
            Log in
          </Button>
        </Form.Group>
        <Link to='/signup' style={{ textAlign: "center" }}>
          Click here to sign up
        </Link>
        </Form>
        </Container>
    </div>
    )
}