import React from 'react';
import myImage from './images/1.png';
import { Link } from 'react-router-dom';

const Head = () => {
  return (
    <div className="tale">
      <img src={myImage} alt="Logo" className="loogo" />
      <div className="enquiry">
        <div className="material-symbols-outlined">
          phone_in_talk
        </div>
        <p>
          +91-9481113939 <span>|</span> +91-9448976787<br />
          <a className="mail" href="mailto:enquiries@srivinayakaricemill.com">
            enquiries@srivinayakaricemillricemill.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Head;
