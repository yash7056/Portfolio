import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Hero.css";

import yashPhoto from "../assets/yash_photo.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const leftRef = useRef(null);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // Load voices for SpeechSynthesis
  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // GSAP ANIMATION (Intro)
  useEffect(() => { 
    const ctx = gsap.context(() => {
      // Animate text on left
      gsap.from(".left > *", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      });

      // Animate social icons from left side
      gsap.from(".social-icons > *", {
        x: -100,
        opacity: 0,
        duration: 2.5,
        ease: "power4.out",
      });

      // Animate background photo fade in
      gsap.from(".hero-background-photo", {
        opacity: 0,
        scale: 1.05,
        duration: 2,
        ease: "power2.out",
      });
    });

    return () => {
      ctx.revert();
      window.speechSynthesis.cancel();
    };
  }, []);

  // GSAP Breathing / Speaking Motion
  useEffect(() => {
    let breatheTimeline;
    if (speaking) {
      // Animate subtle breathing & speaking body movements
      breatheTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      breatheTimeline.to(".hero-background-photo", {
        scale: 1.025,
        y: -10,
        rotation: 0.3,
        duration: 2.2,
        ease: "sine.inOut",
      });
    } else {
      // Reset position when not speaking
      gsap.to(".hero-background-photo", {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
    return () => {
      if (breatheTimeline) breatheTimeline.kill();
    };
  }, [speaking]);

  // SELECT MOST NATURAL MALE ENGLISH VOICE AVAILABLE
  const getBestVoice = () => {
    const list = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    
    // Keywords representing male voices
    const maleKeywords = ["guy", "david", "male", "mark", "ryan", "liam", "connor", "andrew", "james", "george", "ravi", "prabhat"];
    
    // 1. Try to find a premium Male Microsoft Natural / Online / Google voice
    let voice = list.find(
      (v) => 
        v.lang.startsWith("en") && 
        (v.name.includes("Online") || v.name.includes("Natural") || v.name.includes("Google")) &&
        maleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
    );
    
    // 2. Fall back to any Male English voice
    if (!voice) {
      voice = list.find(
        (v) => 
          v.lang.startsWith("en") && 
          maleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
      );
    }
    
    // 3. Fall back to standard en-US Male if possible, or any en voice containing "male"
    if (!voice) {
      voice = list.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("male"));
    }
    
    // 4. Default to any English voice
    if (!voice) {
      voice = list.find((v) => v.lang.startsWith("en"));
    }
    
    return voice;
  };

  // TOGGLE TEXT-TO-SPEECH
  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      window.speechSynthesis.cancel();

      const introductionText = 
        "Hi, I am Yash Dargad, an AI and Machine Learning Engineer and Full-Stack Web Developer. " +
        "I build intelligent applications and scalable tools, combining computer vision, machine learning, and modern web architectures. " +
        "Welcome to my portfolio! Feel free to explore my projects and get in touch.";

      const utterance = new SpeechSynthesisUtterance(introductionText);
      
      const bestVoice = getBestVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
      
      utterance.rate = 0.95; // Slightly slower makes it sound more human and deliberate
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setSpeaking(false);
      };

      utterance.onerror = () => {
        setSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  return (
    <section className="hero" id="home">
      <div className="social-icons">
        <div>
          <a href="https://github.com/yash7056" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
        <div>
          <a href="https://linkedin.com/in/yash-dargad-897502333" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* BACKGROUND PHOTO */}
      <div className="hero-background-photo-container">
        <img src={yashPhoto} alt="Yash Dargad" className="hero-background-photo" />
        {speaking && <div className="avatar-speaking-glow"></div>}
        <div className="hero-background-overlay"></div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="left" ref={leftRef}>
          <p className="intro">Hi, I'm</p>

          <h1>
            Yash Dargad
            <span>AI/ML Engineer & Full-Stack Developer</span>
          </h1>

          <p>
            I build intelligent full-stack applications and AI-powered tools, 
            combining computer vision, machine learning, and modern web architectures.
          </p>

          <div className="buttons">
            <a href="#projects">
              <button className="primary">View My Work</button>
            </a>
            <a href="#contact">
              <button className="secondary">Contact Me</button>
            </a>
            <a href="/resume.pdf" download>
              <button className="resume">Download Resume</button>
            </a>
          </div>
        </div>

        <div className="right">
          <div className="speaking-container">
            <button
              className={`playButton ${speaking ? "speaking" : ""}`}
              onClick={toggleSpeech}
              title={speaking ? "Pause Introduction" : "Listen to Introduction"}
            >
              {speaking ? "❚❚" : "▶"}
            </button>
            
            {speaking && (
              <div className="audio-wave">
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="scroll">Scroll ↓</div>
    </section>
  );
}