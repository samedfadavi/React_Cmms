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
        <div className="admin-container position-relative overflow-hidden">
           
                
                <EntypoSprite />
                {isLoggedIn ? 
                
                <Routes>
                    {routes?.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {(item?.path && (
                                    <Route path="/" element={<Layouts />}>
                                        <Route
                                            path={item?.path}
                                            element={<item.component />}
                                        />
                                    </Route>
                                )) ||
                                    (item?.route && (
                                        <Route
                                            path={item?.route}
                                            element={<item.component />}
                                        />
                                    ))}
                            </Fragment>
                        );
                    })}
                </Routes> :   
          
    <form onSubmit={handleLogin} className="login-container" >
       <img  src={logo}   style={{position:"absolute",left:"40%",top:"-6.5%",background :"white",width:"20%", backgroundColor:'transparent'}}></img>
       <img  src={logof}   style={{position:"absolute",left:"40%",top:"10%",background :"white",width:"20%", backgroundColor:'transparent'}}></img>
       <div  className="line" ></div>
       <label      style={{width:'100%', position:"relative",background :"transparent", backgroundColor:'transparent'}}>سامانه مدیریت داراییهای فیزیکی</label>
       <div style={{ position: 'relative' }}>
    <input id='email'
      type="text"
      value={email}
      placeholder="نام کاربری"
      onFocus={inputhandler}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    
    <i  className="showpassbutton fa-solid fa-user"   style={{width:'30px',height:'26px',background :"transparent",backgroundColor:'transparent'}}  aria-label="Show"></i>
    </div>
      <div style={{ position: 'relative' }}>
     
    <input id='pass' 
     
      placeholder="کلمه عبور"
      value={password}
      onFocus={inputhandler}
      onChange={(e) => setPassword(e.target.value)}
      type={showPassword ? "text" : "password"}
     
     
    
      style={{ paddingRight: '40px' }}
      required
    />
               <button
        type="button"
        onClick={handleTogglePassword} 
        style={{height:'26px'}}
        className="showpassbutton fa-solid fa-eye"
      >
   
      </button>
      </div>
  {error && <div className="error">{error}</div>}
  <button className="loginbutton"  type="submit">ورود</button>
  <div  className="line" ></div>
  <div className="co">شرکت طراحان بهینه الگوریتم</div>
</form>

      }
               
           
        </div>
      </ThemeProvider>
    );
}

export default App;

