import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Sri Vinayaka Rice Mill</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            {auth ? (
              <>
                <Link to="/ChartComponent" className="nav-link">Inventory</Link>
                <Link to="/AddProduct" className="nav-link">Manage Stock</Link>
                <Link to="/Transaction" className="nav-link">Transaction</Link>
                <Link onClick={logout} to='/SignUp' className="nav-link">Logout</Link>
              </>
            ) : (
              <>
                <Link to="SignUp" className="nav-link">SignUp</Link>
                <Link to="Login" className="nav-link">Login</Link>
              </>
            )}
          </div>
          <div className="navbar-text text-nowrap">
            <span className="contact-number">Contact: +1-234-567-890</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
