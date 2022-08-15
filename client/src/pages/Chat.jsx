import React,{useState,useEffect} from 'react';
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { getAllUsers, getContacts } from '../utils/APIRoutes';

const Chat = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const [contacts,setContacts]=useState([]);
  const navigate=useNavigate();



  useEffect(()=>{
    
      const fetchContacts=async()=>{
        const {data}=await axios.get(`${getContacts}`,{

          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        });
        setContacts(data)
      }

      const fetchAllUsers=async()=> {
        const {data}=await axios.get(`${getAllUsers}`,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
      }
      if(user) {
        if(user.user.isAvatarImageSet) {
            fetchContacts();
            fetchAllUsers();
        }else{
          navigate("/setAvatar");
        }
      }
  },[navigate,user])
  
  return (
    <Container>
      <div className="container">

      </div>
      
    </Container>
  )
}






const Container=styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .container {
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
      grid-template-columns:35% 65%;
    }

  }
`

export default Chat
