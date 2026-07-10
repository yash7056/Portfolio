import "./projects.css";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const projects = [
  {
    id: "01",
    title: "NeighborTrust",
    description:
      "A full-stack, locality-first on-demand services marketplace connecting customers with verified local providers (plumbers, electricians, tutors, cleaners) via a custom Node.js/Express REST API and MongoDB Atlas. Features an AI-calibrated dynamic pricing engine, real-time geolocation using Haversine formula, simulated checkout, and role-based JWT auth.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "HTML5",
      "CSS3",
      "JavaScript (ES6)",
    ],
    github: "https://github.com/yash7056",
    live: "https://neighbor-trust.vercel.app/",
  },

  {
    id: "02",
    title: "Quick Load (AI Logistics)",
    description:
      "A real-time, full-stack logistics dashboard bridging customer demand and driver supply, leveraging Socket.io for instantaneous data synchronization across the MERN stack. Features a high-performance Glassmorphism-based UI with Framer Motion animations and AI-driven dynamic pricing logic.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Framer Motion",
      "AI Logic",
    ],
    github: "https://github.com/yash7056",
    live: "https://quickload-customer-portal.vercel.app/",
  },

  {
    id: "03",
    title: "AgriTech",
    description:
      "A full-stack agricultural e-commerce marketplace to facilitate direct buying and selling of fresh agricultural products between local farmers and buyers. Implemented product listings, seller dashboards, search/filter functionality, and fully responsive UI.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    github: "https://github.com/yash7056",
    live: "#",
  },

  {
    id: "04",
    title: "MessHub",
    description:
      "A web platform to help users discover, compare, and manage local mess/tiffin services. Implemented secure user authentication, service listing pages, and a convenient booking/management interface.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    github: "https://github.com/yash7056",
    live: "#",
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">

     

      <div className="projects-top">

        <span className="tag">
          Featured Projects
        </span>

        <h2>
          Work that speaks
          <br />
          for itself
        </h2>

        <p>
          A selection of projects that showcase my expertise in full-stack
          development and modern architecture.
        </p>

      </div>

      <div className="project-list">

        {projects.map((project) => (
          <div className="project-card" key={project.id}>

            <span className="project-label">
              ★ Flagship Project
            </span>

            <div className="project-heading">

              <h3>{project.id}</h3>

              <h1>{project.title}</h1>

            </div>

            <p className="description">
              {project.description}
            </p>

            <div className="tech-stack">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="buttons">

              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
                GitHub
              </a>

              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt />
                Live Demo
              </a>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}