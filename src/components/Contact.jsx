import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.contact__animate'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container contact__inner">
        <div className="contact__text contact__animate">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let's build something next-level.</h2>
          <p className="contact__sub">
            Have an exciting project, a job opportunity, or just want to discuss 
            AI/ML systems and web development? Drop a message!
          </p>
        </div>

        <form className="contact__form contact__animate" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact__success">Thank you! Your message has been sent successfully. 🚀</div>
          ) : (
            <>
              <div className="contact__row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <input type="text" placeholder="Subject" required />
              <textarea rows="4" placeholder="Your Message" required />
              <button type="submit" className="btn btn-primary">Send Message →</button>
            </>
          )}
        </form>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Yash Dargad. All rights reserved.</span>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
