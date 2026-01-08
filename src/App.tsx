import React, { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { EntypoSprite } from "@entypo-icons/react";

import routes from "@/routes";
import Layouts from "@/layouts/Layouts";
import { useDashboardDataContext } from "@/context/dashboardDataContext";

import theme from "./styles/Theme";

import "@/assets/scss/Login.scss";
import logo from "@/assets/image/dima.png";
import logof from "@/assets/image/dimaf.png";
const App = () => {
  const { userInfo, setUserInfo } = useDashboardDataContext();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
       
      

        const handleTogglePassword = (
          e: React.MouseEvent<HTMLButtonElement>
        ) => {
          const target = e.currentTarget;
          target.classList.toggle("fa-eye");
          target.classList.toggle("fa-eye-slash");
          setShowPassword(prev => !prev);
        };
      
        const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
      
          if (email === "smadmin" && password === "F@v@1404") {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            setError("Invalid credentials");
          }
        };
      
    const inputhandler =(e:React.FocusEvent<HTMLInputElement>)=>
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

