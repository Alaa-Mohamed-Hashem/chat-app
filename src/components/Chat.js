import { Bookmark, Info } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { db } from '../firebase';
import ChatInput from './ChatInput';
import Message from './Message';

const Chat = (props) => {
   const chatRef = useRef(null);
   const { roomId } = useParams();

   const [roomDetails] = useDocument(
      roomId && db.collection('rooms').doc(roomId)
   );

   const [roomMessages, loading] = useCollection(
      roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc'),
   );

   useEffect(() => {
      chatRef?.current?.scrollIntoView({
         behavior: 'smooth',
      });
   }, [roomId, loading]);

   return (
      <>
         <Header>
            <HeaderLeft>
               <h4><strong>{roomDetails?.data().name}</strong></h4>
               <Bookmark />
            </HeaderLeft>
            <HeaderRight>
               <p>
                  <Info />
                  Details
               </p>
            </HeaderRight>
         </Header>

         <ChatContainer>
            {roomDetails && roomMessages && (
               <>
                  <ChatMessage>
                     {roomMessages?.docs.map(doc => {
                        const { message, timestamp, user, userImeage } = doc.data();

                        return (
                           <Message
                              key={doc.id}
                              message={message}
                              timestamp={timestamp}
                              user={user}
                              userImeage={userImeage}
                           />
                        )
                     })}
                     <ChatButtom ref={chatRef} />
                  </ChatMessage>

                  <ChatInput
                     chatRef={chatRef}
                     channelName={roomDetails?.data().name}
                     channelId={roomId}
                  />
               </>
            )}
         </ChatContainer>
      </>
   )
};

export default Chat;

const ChatContainer = styled.div`
   position: relative;
   margin-top: 67px;
   flex: 0.8;
   flex-grow: 1;
   overflow-y: auto;
   background-image: url('https://res.cloudinary.com/practicaldev/image/fetch/s--WAKqnINn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/tw0nawnvo0zpgm5nx4fp.png');
   
   > .MuiSvgIcon-root {
      position: absolute;
      top: 50%;
      left: -5px;
      color: #000;
      font-size: 30px;
      opacity: 0.2;
      background-color: #000;
      border-radius: 0% 50% 50% 0%;
      color: #fff;
      display: none;
   }
   
   > .MuiSvgIcon-root:hover{
      opacity: 1;
   }
   
   @media (max-width: 768px) {
      margin-top: 104px;
      > .MuiSvgIcon-root {
         display: block;
      }
   }
`;

const Header = styled.div`
   position: fixed;
   display: flex;
   align-items: center;
   top: 68px;
   left: 256px;
   display: flex;
   justify-content: space-between;
   padding: 19px 0px;
   width: 82.7%;
   background-color: #126d73;
   color: #f1f1f1;
   z-index: 9999;
   
   @media (max-width: 768px) {
      width: 100%;
      padding: 5px 0px;
      top: 70px;
      left: 0px;
      /* border-bottom: 1px solid #126d73; */
   }
`;

const HeaderLeft = styled.div`
   display: flex;
   align-items: center;
   margin-left: 20px;
   
   > h4 {
      display: flex;
      text-transform: uppercase;
   }
   
   > .MuiSvgIcon-root {
      margin-left: 2px;
      color: #f1f1f1;
   }
   `;

const HeaderRight = styled.div`
   margin-right: 20px;

   > p {
      display: flex;
      align-items: center;
      font-size: 15px;
   }

   > p > .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 19px;
   }
`;

const ChatMessage = styled.div`
   margin-top: 80px;
   z-index: 9999;

   @media (max-width: 768px) {
      margin-top: 13px;
   }
`;

const ChatButtom = styled.div`
   padding-bottom: 200px;
`;

