import React, { useState, useEffect } from "react";


const images = [

  "https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg?auto=compress&cs=tinysrgb&w=600",
  
 
];

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array to ensure the effect runs once on mount

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="image-container">
          <div className="image-overlay">
            <h1>VINAYAKA RICE MILLS</h1>
            <h2>TRADITIONALLY  MODERN</h2>
          </div>
          <img
            src={images[currentImageIndex]}
            alt="Rice Mill"
            className="carousel-image"
          />
        </div>
        <p>Providing high-quality rice for your needs</p>
      </section>
      <section className="about-section" style={{ background: "#f2f2f2" }}>
        <h2>About Us</h2>
        <p>
          We are a dedicated team committed to producing the finest quality
          rice. Our state-of-the-art mill ensures that every grain meets the
          highest standards. With decades of experience, we strive to provide
          nutritious and delicious rice to our customers.
        </p>
      </section>
      <section className="contact-section" style={{ background: "#f2f2f2" }}>
        <h2>Contact Us</h2>
        <p>
          For inquiries and orders, please feel free to reach out to us. We are
          here to assist you.
        </p>
        <p>
          Phone: <a href="tel:+123456789"> +91 8088375054</a>
        </p>
        <p>
          Email: <a href="mailto:info@ricemill.com"> info@srivinayakaricemill.com</a>
        </p>
        <p>
          Visit us at: Sri Vinayaka Rice Mill,Belur Road,Somwarpet-571236
        </p>
      </section>
      <footer>
        <p>&copy; 2023 Rice Mill. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
