import "./Navbar.css";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img
        className="nav-logo"
        src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
        alt="netflix-logo"
      />
      <img
        className="nav-avatar"
        src="https://i.pinimg.com/originals/8c/74/0b/8c740bc13bd5a0a19c24d28dff98cbdd.png"
        alt="profile-logo"
      />
    </div>
  );
};
