import { Avatar } from '@material-ui/core';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

const Header = () => {
   const [user] = useAuthState(auth);

   return (
      <HeaderContainer>

         <HeaderLeft>
            <HeaderAvatar
               onClick={() => auth.signOut()}
               src={user?.photoURL}
               alt={user?.displayName}
            />
            <AccessTime />
         </HeaderLeft>

         <h1>{user?.displayName}</h1>

         <HeaderSearch>
            <Search />
            <input placeholder="Search" />
         </HeaderSearch>

         <HeaderRight>
            <HelpOutline />
         </HeaderRight>

      </HeaderContainer>
   )
};

export default Header;

const HeaderContainer = styled.div`
   display: flex;
   position: fixed;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   padding: 10px 0px;
   background-color: #1d1d1f;
   color: white;
   border-bottom: 1px solid #126d73;
   z-index: 9999;
   
   > h1 {
      display: none;
   }

   @media (max-width: 768px) {
    flex-direction: column;
    /* padding-top: 15px; */
   padding: 9px 0px;

    > h1 {
         display: block;
         width: 100%;
         text-align: center;
         font-size: 12px;
         letter-spacing: 1px;
         /* margin: 1px 0px; */
      }
   }
`;

const HeaderLeft = styled.div`
   display: flex;
   flex: 0.3;
   align-items: center;
   margin-left: 20px;

   > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 30px;
   }

   @media (max-width: 768px) {
      > .MuiSvgIcon-root {
         display: none;
      }
      margin-left: 0px;
      margin-bottom: 5px;
   }
`;

const HeaderAvatar = styled(Avatar)`
   cursor: pointer;
   transition: .3s;
   width: 45px !important;
   height: 45px !important;
   border: 1px solid #126d73;
   
   :hover {
      opacity: 0.6;
   }

   @media (max-width: 768px) {
      width: 30px !important;
      height: 30px !important;
   }
`;

const HeaderSearch = styled.div`
   display:flex;
   flex: 0.4;
   padding: 0 20px;
   opacity: 1;
   border-radius: 6px;
   text-align: center;
   color: gray;
   border: 1px solid gray;

   > input {
      background-color: transparent;
      border: none;
      text-align: center;
      min-width: 34vw;
      outline: 0;
      color: white;
   }

   > input::placeholder{
      color: #fff;
      letter-spacing: .3px;
   }

   > input:focus::placeholder{
      color: #1d1d1f;
   }
   
   @media (max-width: 768px) {
      /* display: none; */
      flex: 0.6 !important;
      width: 60%;
      margin-right: 20px;
      display: none;

      > input {
         width: 100%;
      }
   }
`;

const HeaderRight = styled.div`
   flex: 0.3;
   display: flex;
   /* align-items: flex-end; */

   > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 20px;
   }

   @media (max-width: 768px) {
      display: none;
   }
`