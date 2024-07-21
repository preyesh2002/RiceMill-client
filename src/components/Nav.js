import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const collapseRef = useRef(null);

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  const handleLinkClick = () => {
    if (collapseRef.current && collapseRef.current.classList.contains('show')) {
      const collapseElement = new window.bootstrap.Collapse(collapseRef.current, {
        toggle: true,
      });
      collapseElement.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Sri Vinayaka Rice Mill</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" ref={collapseRef}>
          <div className="navbar-nav me-auto">
            {auth ? (
              <>
                <Link to="/ChartComponent" className="nav-link" onClick={handleLinkClick}>Inventory</Link>
                <Link to="/AddProduct" className="nav-link" onClick={handleLinkClick}>Manage Stock</Link>
                <Link to="/Transaction" className="nav-link" onClick={handleLinkClick}>Transaction</Link>
                <Link onClick={() => { logout(); handleLinkClick(); }} to='/SignUp' className="nav-link">Logout</Link>
              </>
            ) : (
              <>
                <Link to="SignUp" className="nav-link" onClick={handleLinkClick}>SignUp</Link>
                <Link to="Login" className="nav-link" onClick={handleLinkClick}>Login</Link>
              </>
            )}
          </div>
          <div className="navbar-text text-nowrap">
            <span className="contact-number">Contact: +91-9481113939</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
