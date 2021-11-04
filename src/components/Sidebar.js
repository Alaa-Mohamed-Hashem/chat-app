import {
   FiberManualRecord, Create, InsertComment, Inbox, Drafts, BookmarkBorder,
   PeopleAlt, Apps, FileCopy, ExpandLess, ExpandMore, Add
} from '@material-ui/icons'; import React from 'react';

import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = (props) => {
   const [user] = useAuthState(auth);
   const [channels] = useCollection(db.collection('rooms'));

   return (
      <SidebarContainer style={{ minWidth: props.classes }}>

         <SidebarHeader>
            <SidebarInfo>
               <h2>Whisperers TEAM</h2>
               <h3>
                  <FiberManualRecord />
                  {user.displayName}
               </h3>
            </SidebarInfo>
            <Create />
         </SidebarHeader>

         <SidebarOption Icon={InsertComment} title="Threads" />
         <SidebarOption Icon={Inbox} title="Mention & reactions" />
         <SidebarOption Icon={Drafts} title="Saved Items" />
         <SidebarOption Icon={BookmarkBorder} title="Channel borswer" />
         <SidebarOption Icon={PeopleAlt} title="People & user groups" />
         <SidebarOption Icon={Apps} title="Apps" />
         <SidebarOption Icon={FileCopy} title="File browser" />
         <SidebarOption Icon={ExpandLess} title="Show less" />
         <hr />
         <SidebarOption Icon={ExpandMore} title="channels" />
         <hr />
         <SidebarOption Icon={Add} addChannelOption title="Add channel" />

         {channels?.docs.map(doc => (
            <SidebarOption hideClass={props.hideClass} key={doc.id} id={doc.id} title={doc.data().name} />
         ))}

      </SidebarContainer>
   )
};

export default Sidebar;

const SidebarContainer = styled.div`
   color: white;
   background-color: #1d1d1f;
   flex: 0.2;
   margin-top: 68px;
   overflow: auto;
   position: relative;
   transition: .2s;

   > .MuiSvgIcon-root {
      position: absolute;
      top: 50%;
      right: -4px;
      font-size: 30px;
      background-color: #f6f6f6;
      border-radius: 50% 0% 0% 50%;
      color: #000; 
      display: none;
   }

   ::-webkit-scrollbar {
      display: none; 
   }

   > hr {
      margin-top: 8px;
      margin-bottom: 8px;
      border: 1px solid #126d73;
      border-bottom: none;
   }

   @media (max-width: 768px) {
      margin-top: 104px;
      flex: 0;
      z-index: 1;

      > .MuiSvgIcon-root {
         display: block;
      }
   }
`;

const SidebarHeader = styled.div`
   display: flex;
   border-bottom: 1px solid #126d73;
   padding: 10px 13px;

   > .MuiSvgIcon-root {
      padding: 8px;
      color: #126d73;
      margin-top: 4px;
      width: 19px;
      height: 19px;
      background-color: #f6f6f6;
      border-radius: 999px;
   }
`;

const SidebarInfo = styled.div`
   flex: 1;

   > h2 {
      font-size: 14px;
      font-weight: 900;
      margin-bottom: 7px;
      letter-spacing: 1px;
      /* margin-left: 4px; */
   }
   
   > h3 {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: .5px;
      margin-left: -2px;
   }
   
   > h3 > .MuiSvgIcon-root {
      font-size: 17px;
      margin-top: 1.5px;
      margin-right: 3px;
      color: green;
   }
`;