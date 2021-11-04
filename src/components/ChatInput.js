import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
import firebase from '@firebase/app-compat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ChatInput = ({ channelName, channelId, chatRef }) => {
   const [input, setInput] = useState('');
   const [user] = useAuthState(auth);

   const sendMessage = e => {
      e.preventDefault();

      if (!channelId || input.trim().length === 0) {
         return false
      };

      db.collection('rooms').doc(channelId).collection('messages').add({
         message: input,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         user: user.displayName,
         userImeage: user.photoURL
      });

      chatRef.current.scrollIntoView({
         behavior: 'smooth',
      })

      setInput('');
   };

   const messageUp = () => {
      chatRef.current.scrollIntoView({
         behavior: 'smooth',
      })

      
   };

   return (
      <ChatInputContainer>
         <form>
            <input
               value={input}
               onChange={e => setInput(e.target.value)}
               placeholder={`Send To ${channelName}`}
               onFocus={messageUp}
            />
            <Button hidden type="submit" onClick={sendMessage}>
               Send
            </Button>
         </form>
      </ChatInputContainer>
   )
};

export default ChatInput;

const ChatInputContainer = styled.div`
   border-radius: 20px;
   
   > form {
      position: relative;
      display: flex;
      justify-content: center;
   }
   
   > form > input {
      position: fixed;
      bottom: 30px;
      width: 55%;
      border: 1px solid #126d73;
      border-radius: 5px;
      padding: 15px;
      outline: none !important;
      background-color: #fcfcfcc9;
      transition: .3s;
   }
   
   > form > input:hover{
      background-color: transparent;
      border: 1px solid #676767
   }
   
   > form > input::placeholder {
      transition: .3s;
   }

   > form > input:hover::placeholder {
      color: transparent
   }

   > form > button {
      display: none;
   }

   @media (max-width: 768px) {
      > form > input {
         width: 70%;
      }
   }
`;
