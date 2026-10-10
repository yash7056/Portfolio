import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaSms, FaMapMarkerAlt } from 'react-icons/fa'
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formattedMessage = 
      `Hi Yash, I reached out via your portfolio website!\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Subject: ${formData.subject}\n` +
      `Message: ${formData.message}`

    const encodedText = encodeURIComponent(formattedMessage)

    // Automatically trigger WhatsApp with pre-filled message to +91 9156647056
    try {
      window.open(`https://wa.me/919156647056?text=${encodedText}`, '_blank')
    } catch {
      // Ignore popup blocker if any
    }

    // Also attempt background email dispatch to yashdargadpartur1@gmail.com
    fetch("https://formsubmit.co/ajax/yashdargadpartur1@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Name: formData.name,
        Email: formData.email,
        SenderPhone: formData.phone || "Not provided",
        Subject: formData.subject,
        Message: formData.message,
        _replyto: formData.email,
        _subject: `Portfolio Message from ${formData.name}: ${formData.subject}`
      })
    }).catch(() => {})

    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const formattedMessage = 
    `Hi Yash, I reached out via your portfolio website!\n\n` +
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone || 'Not provided'}\n` +
    `Subject: ${formData.subject}\n` +
    `Message: ${formData.message}`

  const encodedText = encodeURIComponent(formattedMessage)

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container contact__inner">
        {/* Left Side: Info */}
        <div className="contact__text contact__animate">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let's build something next-level.</h2>
          <p className="contact__sub">
            Have an exciting project, an internship/job opportunity, or want to discuss 
            AI/ML systems and web development? Reach out directly via WhatsApp, SMS, or Email!
          </p>

          <div className="contact__direct-info">
            <a
              href="https://wa.me/919156647056?text=Hi%20Yash,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__info-card whatsapp-card"
            >
              <div className="contact__info-icon">
                <FaWhatsapp />
              </div>
              <div className="contact__info-details">
                <span>WhatsApp Message</span>
                <strong>+91 9156647056</strong>
              </div>
            </a>

            <a href="sms:+919156647056" className="contact__info-card sms-card">
              <div className="contact__info-icon">
                <FaSms />
              </div>
              <div className="contact__info-details">
                <span>Send SMS to Mobile</span>
                <strong>+91 9156647056</strong>
              </div>
            </a>

            <a href="tel:+919156647056" className="contact__info-card">
              <div className="contact__info-icon">
                <FaPhoneAlt />
              </div>
              <div className="contact__info-details">
                <span>Call Directly</span>
                <strong>+91 9156647056</strong>
              </div>
            </a>

            <a href="mailto:yashdargadpartur1@gmail.com" className="contact__info-card">
              <div className="contact__info-icon">
                <FaEnvelope />
              </div>
              <div className="contact__info-details">
                <span>Email Me</span>
                <strong>yashdargadpartur1@gmail.com</strong>
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
              <div className="success-icon">✓</div>
              <h3>Message Ready to Send!</h3>
              <p>
                Your message is prepared for <strong>Yash Dargad (+91 9156647056)</strong>.
                Tap your preferred button below to send it instantly:
              </p>

              <div className="success-actions">
                <a
                  href={`https://wa.me/919156647056?text=${encodedText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp /> Send on WhatsApp (+91 9156647056)
                </a>

                <a
                  href={`sms:+919156647056?body=${encodedText}`}
                  className="btn btn-sms"
                >
                  <FaSms /> Send as SMS (+91 9156647056)
                </a>

                <a
                  href={`mailto:yashdargadpartur1@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Message')}&body=${encodedText}`}
                  className="btn btn-email"
                >
                  <FaEnvelope /> Send via Email
                </a>

                <button onClick={handleReset} className="btn btn-outline-reset">
                  Write Another Message
                </button>
              </div>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
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
              >
                Send Message (SMS & WhatsApp) →
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
