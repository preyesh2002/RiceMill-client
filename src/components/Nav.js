import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Nav=()=>{
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
const logout=()=>{

  localStorage.clear();
  navigate('/signup')
}


    return(
    <div><nav class="navbar navbar-expand-lg bg-dark navbar-dark text-bg-light">
    
  
  
    <div class="container-fluid">
      <Link class="navbar-brand" to="/">Sri Vinayaka Rice Mill</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">

        { auth ? <>
          {/* <Link to="/Home" class="nav-link active" aria-current="page" >Home</Link> */}
          {/* <Link to="/Features" class="nav-link" >Features</Link> */}
          <Link to="/ChartComponent" class="nav-link" >Inventory</Link>
          <Link to="/AddProduct" class="nav-link" >Manage Stock</Link>
          <Link to="/Transaction" class="nav-link" >Transaction</Link>
          <Link onClick={logout} to ='/SignUp' class="nav-link">Logout</Link></>
           :<><Link to="SignUp" class="nav-link" >SignUp</Link> <Link to="Login" class="nav-link" >Login</Link></>}
          
          
          
        </div>
      </div>
    </div>
  </nav></div>
)}

export default Nav