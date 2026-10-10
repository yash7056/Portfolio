import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import './contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isActivationNotice, setIsActivationNotice] = useState(false)
  const [error, setError] = useState('')

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch("https://formsubmit.co/ajax/yashdargadpartur1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          Subject: formData.subject,
          Message: formData.message,
          _replyto: formData.email,
          _subject: `New Portfolio Message from ${formData.name}: ${formData.subject}`,
          _template: "table"
        })
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setIsActivationNotice(false);
        setSubmitted(true);
      } else if (data.message && data.message.toLowerCase().includes("activation")) {
        // One-time activation notice from FormSubmit
        setIsActivationNotice(true);
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to deliver message.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network issue while sending. You can reach out directly at yashdargadpartur1@gmail.com or +91 9156647056.");
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setIsActivationNotice(false)
    setError('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container contact__inner">
        {/* Left Side: Info */}
        <div className="contact__text contact__animate">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let's build something next-level.</h2>
          <p className="contact__sub">
            Have an exciting project, an internship/job opportunity, or want to discuss 
            AI/ML systems and web development? Drop a message!
          </p>

          <div className="contact__direct-info">
            <a href="mailto:yashdargadpartur1@gmail.com" className="contact__info-card">
              <div className="contact__info-icon">
                <FaEnvelope />
              </div>
              <div className="contact__info-details">
                <span>Email Directly</span>
                <strong>yashdargadpartur1@gmail.com</strong>
              </div>
            </a>

            <a href="tel:+919156647056" className="contact__info-card">
              <div className="contact__info-icon">
                <FaPhoneAlt />
              </div>
              <div className="contact__info-details">
                <span>Phone / Call</span>
                <strong>+91 9156647056</strong>
              </div>
            </a>

            <div className="contact__info-card location-card">
              <div className="contact__info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact__info-details">
                <span>Location</span>
                <strong>Pune, Maharashtra, India</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact__form-container contact__animate">
          {submitted ? (
            <div className="contact__success">
              {isActivationNotice ? (
                <>
                  <div className="success-icon">✉</div>
                  <h3>One-Time Activation Required</h3>
                  <p>
                    FormSubmit has sent an activation email to <strong>yashdargadpartur1@gmail.com</strong>.
                    Please open that email and click <strong>"Activate Form"</strong> once.
                    After doing that, all messages will arrive directly in your inbox in real time!
                  </p>
                  <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Done / Back to Form
                  </button>
                </>
              ) : (
                <>
                  <div className="success-icon">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>! Your message has been sent directly to Yash Dargad at <strong>yashdargadpartur1@gmail.com</strong>.
                  </p>
                  <button onClick={handleReset} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Send Another Message
                  </button>
                </>
              )}
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              {error && (
                <div className="contact__error">
                  {error}
                </div>
              )}

              <div className="contact__row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact__row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending to Email...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Yash Dargad. All rights reserved.</span>
          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
