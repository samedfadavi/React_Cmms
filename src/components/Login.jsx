// App.js
import React, { useState } from 'react';
import '../assets/scss/Login.scss';

const Login=({onLogin})=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {user,setUser}=useDashboardDataContext
 const inputhandler =()=>
 {
    const prompt = document.querySelector('.prompt');
    window.alert('ok');
    if (this.value) {
        prompt.style.top = '-10px';
        prompt.style.left = '10px';
    } else {
        prompt.style.top = '10px';
        prompt.style.left = '10px';
    }
 }
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-container" onSubmit={onLogin}>
       
         
          <input id='email'
            type="email"
            value={email}
            onInput={inputhandler}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           <label for='email' className='propmt'>Email</label> 
          <input id='pass'
            type="password"
            value={password}
            onInput={inputhandler}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <label for='pass' className='propmt'>Password</label>      
        {error && <div className="error">{error}</div>}
        <button  type="submit">ورود</button>
      </form>
    </div>
  );
}

export default Login;