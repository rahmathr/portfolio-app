import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
} from "lucide-react";

// Lazy load components for code splitting
const ProjectCard = lazy(() =>
  Promise.resolve({
    default: ({ project }) => (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Project <ExternalLink className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    ),
  })
);

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Sample projects data
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack online store with payment integration and admin dashboard",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Weather App",
      description: "Real-time weather application using OpenWeather API",
      image:
        "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=400&h=300&fit=crop",
      tags: ["JavaScript", "API", "CSS"],
      link: "#",
    },
    {
      title: "Task Management System",
      description: "Collaborative task tracker with real-time updates",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      link: "#",
    },
    {
      title: "Portfolio Dashboard",
      description: "Analytics dashboard for tracking portfolio performance",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tags: ["React", "Chart.js", "Bootstrap"],
      link: "#",
    },
  ];

  // Form validation (vanilla JavaScript)
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setFormErrors({});
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setFormSubmitted(false);
      }, 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Navigation component
  const Navigation = () => (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["home", "about", "projects", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize font-medium transition-colors ${
                  currentPage === page
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-3">
            {["home", "about", "projects", "contact"].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded capitalize ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm{" "}
            <span className="text-blue-600 dark:text-blue-400">Rahmat</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Software Engineer (a.k.a Tukang Software)
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            I create beautiful, functional, and user-friendly web applications
            that solve real-world problems
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage("projects")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Projects
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium border-2 border-blue-600 dark:border-blue-400"
            >
              Contact Me
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Code className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Clean Code
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Writing maintainable and scalable code
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Palette className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Modern Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Creating beautiful user interfaces
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Zap className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized for speed and efficiency
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Page (Manual CSS styling)
  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-20">
      <style>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .about-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .about-title {
          font-size: 3rem;
          font-weight: bold;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        .dark .about-title {
          color: #ffffff;
        }
        .about-subtitle {
          font-size: 1.25rem;
          color: #64748b;
        }
        .dark .about-subtitle {
          color: #94a3b8;
        }
        .about-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .about-content {
            grid-template-columns: 1fr 1fr;
          }
        }
        .about-section {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .dark .about-section {
          background: #1e293b;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #2563eb;
        }
        .dark .section-title {
          color: #60a5fa;
        }
        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .skill-item {
          padding: 0.5rem 1rem;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .dark .skill-item {
          background: #1e3a8a;
          color: #93c5fd;
        }
        .text-content {
          line-height: 1.75;
          color: #475569;
        }
        .dark .text-content {
          color: #cbd5e1;
        }
      `}</style>

      <div className="about-container">
        <header className="about-header">
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">
            Get to know more about my background and skills
          </p>
        </header>

        <div className="about-content">
          <section className="about-section">
            <h2 className="section-title">My Story</h2>

            <p className="text-content">
              Hello 👋, I’m Rahmat Hidayat Ramadhan — a “tukang software” who
              enjoys building systems that work, crafting backend logic, and
              developing efficient digital solutions.
            </p>

            <p className="text-content" style={{ marginTop: "1rem" }}>
              I continuously improve my skills through personal projects,
              self-learning, and exploring modern technologies. For me, being a
              software engineer isn’t just about writing code — it’s about
              solving problems with clean, simple, and useful solutions.
            </p>

            <div className="text-content" style={{ marginTop: "1.5rem" }}>
              <p>💡 What I usually “build”:</p>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.2rem" }}>
                <li>Software Engineering & Programming</li>
                <li>Backend Development</li>
                <li>Database & API Integration</li>
                <li>Information Systems & Modern Technologies</li>
              </ul>
            </div>

            <p className="text-content" style={{ marginTop: "1.5rem" }}>
              🚀 I aim to be the kind of builder who creates impactful and
              reliable digital solutions.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Education</h2>
            <div className="text-content">
              <p>
                <strong>Bachelor of Information Technology</strong>
              </p>
              <p>Bina Sarana Informatika University (2024 - 2028)</p>

              <p style={{ marginTop: "1rem" }}>
                Currently pursuing a Bachelor's degree in Information Technology
                and actively developing skills in programming and web
                development.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skill-list">
              <span className="skill-item">JavaScript</span>
              <span className="skill-item">React</span>
              <span className="skill-item">Node.js</span>
              <span className="skill-item">Python</span>
              <span className="skill-item">TypeScript</span>
              <span className="skill-item">MongoDB</span>
              <span className="skill-item">PostgreSQL</span>
              <span className="skill-item">Docker</span>
              <span className="skill-item">AWS</span>
              <span className="skill-item">Git</span>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Interests</h2>
            <div className="text-content">
              <ul style={{ paddingLeft: "1.5rem" }}>
                <li>Open Source Contribution</li>
                <li>UI/UX Design</li>
                <li>Machine Learning</li>
                <li>Technical Writing</li>
                <li>Photography</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // Projects Page (Tailwind CSS)
  const ProjectsPage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Here are some of my recent works
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );

  // Contact Page (Bootstrap-style + Tailwind)
  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              rahmathr.king@gmail.com
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <Github className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-400">@rahmathr</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Send a Message
          </h2>

          {formSubmitted && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your name"
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                  formErrors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your message here..."
              />
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/rahmathr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>

            <a
              href="https://www.linkedin.com/in/rahmathr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-8 h-8" />
            </a>

            <a
              href="mailto:rahmathr.king@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          © 2024 Rahmat Hidayat Ramadhan. Built with React & Tailwind CSS
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Made with ❤️ for the portfolio project
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <main>
        {currentPage === "home" && <HomePage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
