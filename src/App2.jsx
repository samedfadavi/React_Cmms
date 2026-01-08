import { Fragment } from "react";
import { EntypoSprite } from "@entypo-icons/react";
import { Routes, Route } from "react-router-dom";
import routes from "@/routes.jsx";
import Layouts from "@/layouts/Layouts.jsx";
import { useDashboardDataContext } from "@/context/dashboardDataContext.jsx";
import React, { useState,useEffect} from 'react';
import '@/assets/scss/Login.scss';
import logo from "@/assets/image/dima.png";
import logof from "@/assets/image/dimaf.png";
import aye from "@/assets/image/aye.png";
import aye2 from "@/assets/image/aye2.png";
import user from "@/assets/image/user.png";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Theme";
import axios from 'axios';
import Modeler from "./components/Modeler/Modeler";
const App = () => {
    const { userInfo, setUserInfo } = useDashboardDataContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
        const [showPassword, setShowPassword] = useState(false);
       
      
        const handleTogglePassword = (e) => {
          if( e.target.className!='showpassbutton fa-solid fa-eye')
          e.target.className='showpassbutton fa-solid fa-eye';
          else
            e.target.className='showpassbutton fa-solid fa-eye-slash';
          setShowPassword(!showPassword);
        };


    const handleLogin = (e) => {
        

        e.preventDefault();
 /*        axios.get('http://80.191.255.65:6081/api/User/GetUserInfo/pmadmin/D@ft@r1404')
          .then((response) => {
           
            setUserInfo(response.data);
            setIsLoggedIn(true);
            //setLoading(false);
          })
          .catch((error) => {
            //setError(error);
            //setLoading(false);
            setIsLoggedIn(false);
          })
          .finally(() => {
            setIsLoggedIn(true);
        }); */
       
        if(email=='smadmin' && password=='F@v@1404')
        setIsLoggedIn(true);
    else
     setIsLoggedIn(false); 
    }
    const inputhandler =(e)=>
    {
       const prompt = document.querySelector('.prompt');
       //e.target.value='111';
    /*    if (e.target.value) {
           prompt.style.top = '-10px';
           prompt.style.left = '10px';
       } else {
           prompt.style.top = '10px';
           prompt.style.left = '10px';
       } */
    }
    return (
      <ThemeProvider theme={theme} >
   <Modeler></Modeler>
      </ThemeProvider>
    );
}

export default App;

