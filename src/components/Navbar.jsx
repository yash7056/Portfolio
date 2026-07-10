import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef();
useEffect(() => {
  const ctx = gsap.context(() => {

    gsap.from(".navbar > *", {
      y: -60,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
    });

  });

  return () => ctx.revert();
}, []);
  

  return (
    <nav className="navbar" ref={navRef}>
      <div className="logo">
        Yash <span>Dargad</span>
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
     <div>
       <a href="#contact">
         <button className="hire-btn">
          Hire Me
        </button>
       </a>
     </div>
      
    </nav>
  );
}