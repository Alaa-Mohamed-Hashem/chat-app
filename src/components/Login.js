import { Button } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {
   const signIn = (e) => {
      e.preventDefault();
      auth.signInWithPopup(provider).catch(err => alert(err.message));
   };

   return (
      <LoginContainer>
         <LoginInnerContainer>
            <img src="https://www.pinclipart.com/picdir/big/54-546980_sms-transparent-sms-blue-icon-png-clipart.png" alt="" />
            <h1>Sign in to Whisper</h1>
            <p>www.whisper.com</p>
            <Button onClick={signIn}>Sign In With Google</Button>
         </LoginInnerContainer>
      </LoginContainer>
   )
};

export default Login;

const LoginContainer = styled.div`
   background-color: #f8f8f8;
   height: 100vh;
   display: grid;
   place-items: center;
`;

const LoginInnerContainer = styled.div`
   padding: 100px;
   text-align: center;
   background-color: white;
   border-radius: 10px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

   > img {
      object-fit: contain;
      height: 100px;
      margin-bottom: 10px;
      margin-left: -12px;
   }

   > Button {
      margin-top: 40px;
      text-transform: inherit !important;
      background-color: #126d73 !important;  
      color: white;
      transition: .3s;
   }
   
   > button:hover {
      background-color: #50dcff  !important;  
      color: #000;
   }

   @media (max-width: 768px) {
      padding: 75px;
      margin: 0px 15px;
   }
`;
