import React from 'react'
import {useNavigate} from 'react-router-dom'



const Login= () => {
    
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();
  

const serverUrl="https://ricemill-server.onrender.com"
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form data submitted:',  password, email)
        
        let result = await fetch(`${serverUrl}/Login`, {
          method: 'post',
          body: JSON.stringify({  email, password }),
          headers: {
            'Content-type': 'application/json',
          },
        })
        result = await result.json()
        console.warn(result)
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
          navigate('/')
        }else{
            alert("Enter Valid Details")
        }
      }
 


    return(<div className="signup-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit} className="signup-form">
      
      

      {/* Email input */}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password input */}
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default Login;