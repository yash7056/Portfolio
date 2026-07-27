import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="logo">
        Yash <span>Dargad</span>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>

      <div className="hire-btn-container">
        <a href="#contact" onClick={closeMenu}>
          <button className="hire-btn">
            Hire Me
          </button>
        </a>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}