import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { enterRoom } from '../features/appSlice';
import { db } from '../firebase';
import '../App.css';

const SidebarOption = ({ Icon, title, addChannelOption, id, hideClass }) => {
   const dispatch = useDispatch();

   const addChannel = () => {
      const channelName = prompt('Please enter the channel name');

      if (channelName) {
         db.collection('rooms').add({
            name: channelName,
         })
      }
   };

   const selectChannel = () => {
      if (id) {
         dispatch(enterRoom({
            roomId: id
         }))
      }
   };

   return (

      <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>
         {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
         {Icon ? <h3>{title}</h3> :
            <NavLink activeClassName="active" to={`/rooms/${id}`}>
               <SidebarOptionChannel onClick={hideClass}>
                  <span>#</span> {title}
               </SidebarOptionChannel>
            </NavLink>
         }
      </SidebarOptionContainer>

   )
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
   display: flex;
   align-items: center;
   font-size: 12px;
   cursor: pointer;
   transition: .3s;

   :hover {
      opacity: .9;
      background-color: #126d73;
   }

   > h3 {
      font-weight: 500;
      letter-spacing: .3px;
   }

   > h3 > span {
      padding: 15px;
   }
`;

const SidebarOptionChannel = styled.h3`
   padding: 10px 0px;
   padding-left: 15px;
   font-weight: 300;

   > span {
      padding-right: 15px;
   }
`;