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

      // Animate social icons from left on desktop, from bottom on mobile
      const isMobile = window.innerWidth <= 850;
      gsap.from(".social-icons > *", {
        x: isMobile ? 0 : -100,
        y: isMobile ? 30 : 0,
        opacity: 0,
        duration: 2,
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
    const list = voices.length > 0 ? voices : (window.speechSynthesis?.getVoices() || []);
    if (!list || list.length === 0) return null;

    const femaleKeywords = [
      "female", "zira", "heera", "eva", "hazel", "susan", "samantha", 
      "karen", "victoria", "moira", "fiona", "tessa", "veena", "ananya", 
      "neerja", "sita", "jenny", "aria", "catherine", "linda", "amy", 
      "emma", "joanna", "kendra", "kimberly", "salli", "ivy", "chloe", 
      "zoe", "woman", "girl", "swara", "geeta", "priya", "kavya"
    ];

    const maleKeywords = [
      "male", "david", "mark", "ravi", "prabhat", "guy", "ryan", 
      "liam", "connor", "andrew", "james", "george", "daniel", 
      "arthur", "aaron", "gordon", "fred", "oliver", "rishi", 
      "alex", "tom", "lee", "richard", "stefan", "ajay", "madhav"
    ];

    const isFemale = (v) => {
      const name = (v.name || "").toLowerCase();
      return femaleKeywords.some((f) => name.includes(f));
    };

    const isMale = (v) => {
      const name = (v.name || "").toLowerCase();
      return maleKeywords.some((m) => name.includes(m));
    };

    // Filter English voices
    const englishVoices = list.filter((v) => (v.lang || "").toLowerCase().startsWith("en"));
    const pool = englishVoices.length > 0 ? englishVoices : list;

    // Filter out female voices strictly
    const maleCandidatePool = pool.filter((v) => !isFemale(v));

    // 1. Indian English Male voice (Ravi, Rishi, Prabhat, etc.)
    let voice = maleCandidatePool.find(
      (v) => (v.lang || "").toLowerCase().includes("in") && isMale(v)
    );

    // 2. Microsoft Natural / Online / Google English Male voice
    if (!voice) {
      voice = maleCandidatePool.find(
        (v) =>
          ((v.name || "").includes("Online") || (v.name || "").includes("Natural") || (v.name || "").includes("Google")) &&
          isMale(v)
      );
    }

    // 3. Any voice matching explicit male keywords
    if (!voice) {
      voice = maleCandidatePool.find((v) => isMale(v));
    }

    // 4. Any English voice that is not explicitly female
    if (!voice && maleCandidatePool.length > 0) {
      voice = maleCandidatePool[0];
    }

    // 5. Fallback from full pool
    if (!voice) {
      voice = pool.find((v) => isMale(v)) || pool[0];
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
      
      utterance.rate = 0.92; // Natural, deliberate, professional pace
      utterance.pitch = 0.82; // Deep, masculine baritone pitch

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
              aria-label={speaking ? "Pause introduction" : "Listen to introduction"}
            >
              {speaking ? "❚❚" : "▶"}
            </button>
            
            {speaking ? (
              <div className="audio-wave">
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
                <span className="stroke"></span>
              </div>
            ) : (
              <span className="voice-label">Voice Intro</span>
            )}
          </div>
        </div>
      </div>

      <div className="scroll">Scroll ↓</div>
    </section>
  );
}