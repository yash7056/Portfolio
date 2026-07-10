import "./About.css";
import { FaPython, FaReact, FaNodeJs } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import profile from "../assets/yash_photo.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });

      tl.from(".About-left", {
        y: -140,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      })
        .from(
          ".About-right ",
          {
            x: 60,
            opacity: 0,
            duration: 0.2,
            stagger: 0.2,
          },
          "="
        )
        
        .from(
          ".tech",
          {
            y: 40,
            opacity: 0,
            scale: 0.8,
            stagger: 0.2,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        )
        .call(() => {
          gsap.to(imageRef.current, {
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 0%",
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="About" id="about" ref={sectionRef}>
      <div className="About-container">
        {/* Left Side */}
        <div className="About-left">
          <div className="hanger">
            <div className="hook"></div>

            <div className="rope rope-left"></div>
            <div className="rope rope-right"></div>

            <div className="image-card" ref={imageRef}>
              <img src={profile} alt="Profile" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="About-right">
          <h1>Hello!</h1>

          <p>
            Hi, my name is <span>Yash Dargad</span>, a B.Tech Computer Science student at D Y Patil College of Engineering, Pune (CGPA: 9.24/10). I am a passionate AI/ML Engineer and Software Developer with hands-on experience building production-ready, intelligent full-stack applications.
          </p>

          <div className="tech-stack">
            <div className="tech">
              <FaPython />
              <span>PYTHON</span>
            </div>

            <div className="tech">
              <FaReact />
              <span>REACT</span>
            </div>

            <div className="tech">
              <FaNodeJs />
              <span>NODE.JS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="curve"></div>

      {/* Decorative Stars */}
      <span className="star star1">✦</span>
      <span className="star star2">✦</span>
    </section>
  );
}