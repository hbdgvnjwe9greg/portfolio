import { useState, useEffect, useRef } from 'react';
import {
  Code, Cpu, Cloud, Terminal, GraduationCap, Award,
  Mail, MapPin, ExternalLink, Send, Menu, X, ArrowRight, Sparkles
} from 'lucide-react';
import './App.css';

const EMAIL = 'ammad2558@gmail.com';
const ROLES = [
  'AI Engineer',
  'Machine Learning Engineer',
  'Full Stack Developer',
  'Computer Vision Builder',
  'Cloud & DevOps Enthusiast',
  'AI Automation Specialist'
];
const TECH = [
  'Python', 'OpenCV', 'Deep Learning', 'FastAPI', 'React', 
  'Flutter', 'Firebase', 'MongoDB', 'AWS', 'Docker', 'CI/CD', 'Linux'
];
const SECTION_IDS = ['hero', 'projects', 'experience', 'skills', 'education', 'contact'];
const NAV_ITEMS = [
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['education', 'Education']
];
const TAB_LABELS = { all: 'All Projects', ai: 'AI & Vision', fullstack: 'Full Stack', mobile: 'Mobile Apps' };

const projects = [
  {
    title: 'FormFit AI (AI Gym System)',
    category: 'ai',
    desc: 'Real-time AI posture analytics and computer vision tracker built for form accuracy, rep counting, and instant Urdu audio feedback.',
    tags: ['Python', 'OpenCV', 'Machine Learning', 'Deep Learning', 'FastAPI'],
    image: '/gym_website.png',
    github: 'https://github.com/hbdgvnjwe9greg/FormFit-AI.git',
    live: null
  },
  {
    title: 'University Management System',
    category: 'fullstack',
    desc: 'Comprehensive academic and administrative portal managing student enrollments, faculty workloads, grading, and department resources.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    github: 'https://github.com/ammad2558',
    live: null
  },
  {
    title: 'Dental & Lab Mobile App',
    category: 'mobile',
    desc: 'Cross-platform mobile solution built in Flutter and Firebase for dental clinics and laboratories to manage patient appointments and diagnostic reports.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore'],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop',
    github: 'https://github.com/ammad2558',
    live: null
  }
];

const makePlaceholder = (label) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#0f172a"/>
      </linearGradient></defs>
      <rect width="900" height="600" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#c6ff3d" font-family="Arial, sans-serif" font-size="44"
            font-weight="700" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`
  );

const handleImgError = (label) => (e) => {
  if (e.currentTarget.dataset.fallback) return;
  e.currentTarget.dataset.fallback = 'true';
  e.currentTarget.src = makePlaceholder(label);
};

function GithubIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.63 1.21 3.27.92.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

function LinkedinIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.96V9.18h2.97v9.56ZM6.44 7.87a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.87h-2.96v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.48V9.18h2.84v1.31h.04c.4-.75 1.36-1.55 2.8-1.55 2.99 0 3.58 1.97 3.58 4.53v5.27Z" /></svg>;
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'revealed' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function TiltCard({ className = '', children }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf, particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(75, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8
      }));
    };

    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(198,255,61,0.6)';
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 140) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}

function useTypewriter(words, speed = 70, pause = 1500) {
  const [text, setText] = useState('');

  useEffect(() => {
    let i = 0, j = 0, deleting = false, timer;
    const tick = () => {
      const word = words[i];
      if (!deleting) {
        j++;
        setText(word.slice(0, j));
        if (j === word.length) {
          deleting = true;
          timer = setTimeout(tick, pause);
          return;
        }
      } else {
        j--;
        setText(word.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
      }
      timer = setTimeout(tick, deleting ? 30 : speed);
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [words, speed, pause]);

  return text;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('hero');
  const [formStatus, setFormStatus] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const typed = useTypewriter(ROLES);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormStatus('Opening your email app to send message...');
    setTimeout(() => setFormStatus(''), 5000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="portfolio-container">
      <ParticleNetwork />

      {/* Navbar - Full Width Mirror Glassmorphism */}
      <nav className="navbar full-width-mirror-nav">
        <div className="nav-content">
          <button type="button" className="nav-brand" onClick={() => scrollToSection('hero')}>
            <div className="brand-logo">AH</div>
            <span className="brand-name">Ammad Hussain</span>
          </button>

          <div className="nav-links">
            {NAV_ITEMS.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className={activeSection === id ? 'active' : ''}>
                {label}
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="nav-contact-btn">
              Contact Me
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-toggle" aria-label="Toggle navigation">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            {NAV_ITEMS.map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}>{label}</button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="mobile-contact-btn">Contact Me</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Available for High-Impact Projects</span>
            </div>

            <h1 className="hero-title">
              <span className="hello">Hello, I'm</span>
              <span className="gradient-text">Ammad Hussain</span>
            </h1>

            <div className="typed-line">
              <span className="prompt">&gt;</span>
              <span className="typed-text">{typed}</span>
              <span className="caret"></span>
            </div>

            <p className="hero-desc">
              AI Engineer | Full Stack Developer | AI Automation | DevOps | Cloud Computing | AWS | KFUEIT ’27
            </p>

            <div className="hero-buttons">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                <span>Explore Work</span>
                <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary">
                Get In Touch
              </button>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/ammad2558" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={24} /></a>
              <a href="https://www.linkedin.com/in/ammad-hussain-752142284/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={24} /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={24} /></a>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="image-border">
              <div className="image-inner">
                <img src="/hero.png" alt="Ammad Hussain" onError={handleImgError('Ammad Hussain')} />
              </div>
            </div>
            <span className="chip chip-1">Python & AI</span>
            <span className="chip chip-2">AWS Cloud</span>
            <span className="chip chip-3">Computer Vision</span>
            <span className="chip chip-4">Full Stack</span>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={i} className="marquee-item"><i></i>{t}</span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <Reveal className="section-header">
          <h2>Featured <span className="highlight">Projects</span></h2>
          <p>Explore robust intelligent systems and production-ready applications built with modern tools.</p>

          <div className="project-tabs">
            {Object.keys(TAB_LABELS).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 120}>
              <TiltCard className="project-card">
                <div className="project-img-box">
                  <img src={project.image} alt={project.title} loading="lazy" onError={handleImgError(project.title)} />
                  <span className="project-cat">{TAB_LABELS[project.category]}</span>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                    <GithubIcon size={18} />
                    <span>View Repository</span>
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="ext-link">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="experience-section">
        <Reveal className="section-header">
          <h2>Professional <span className="highlight">Experience</span></h2>
          <p>Industry background and hands-on software engineering internships.</p>
        </Reveal>

        <div className="timeline">
          <Reveal className="timeline-item">
            <div className="timeline-dot"></div>
            <TiltCard className="timeline-card">
              <div className="timeline-top">
                <h3>AI & Full Stack Developer (Intern)</h3>
                <span className="timeline-date">June 2026 – August 2026</span>
              </div>
              <h4>DanZee Tech</h4>
              <p>
                Engineered robust software solutions, automated complex data pipelines, implemented cloud-backed architectures, and integrated high-performance AI modules into production workflows.
              </p>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <Reveal className="section-header">
          <h2>Core <span className="highlight">Skills & Expertise</span></h2>
          <p>Advanced technical proficiencies spanning artificial intelligence, cloud infrastructure, and full-stack engineering.</p>
        </Reveal>

        <div className="skills-grid">
          {[
            [<Cpu size={26} />, 'Artificial Intelligence', 'Machine Learning, Deep Learning, Computer Vision, OpenCV, Neural Networks.'],
            [<Code size={26} />, 'Full Stack & Mobile', 'React, Node.js, Express, Flutter, Dart, Firebase, HTML5/CSS3, JavaScript.'],
            [<Cloud size={26} />, 'Cloud & DevOps', 'AWS Cloud Services, CI/CD Pipelines, Docker, AI Automation, System Deployments.'],
            [<Terminal size={26} />, 'Tools & Databases', 'Git, GitHub, MongoDB, PostgreSQL, REST APIs, Linux CLI.']
          ].map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 100}>
              <TiltCard className="skill-card">
                <div className="skill-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education-section">
        <Reveal className="section-header">
          <h2>Educational <span className="highlight">Background</span></h2>
          <p>Academic institutions and foundational qualifications.</p>
        </Reveal>

        <div className="education-grid">
          {[
            [<GraduationCap size={26} />, 'KFUEIT ’27', 'Bachelor studies at Khwaja Fareed University of Engineering and Information Technology.'],
            [<Award size={26} />, 'FSc (Pre-Medical)', 'Concordia College (A project of Beaconhouse), Rahim Yar Khan.'],
            [<Award size={26} />, 'Matriculation', 'The Doctors Public School, Rahim Yar Khan.']
          ].map(([icon, title, text], i) => (
            <Reveal key={title} delay={i * 100}>
              <TiltCard className="edu-card">
                <div className="edu-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <Reveal className="section-header">
          <h2>Get In <span className="highlight">Touch</span></h2>
          <p>Have an exciting project, AI solution, or collaboration in mind? Let's talk.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info">
            <div className="contact-item">
              <div className="c-icon"><Mail size={26} /></div>
              <div>
                <h4>Email Me</h4>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon"><LinkedinIcon size={26} /></div>
              <div>
                <h4>LinkedIn Profile</h4>
                <a href="https://www.linkedin.com/in/ammad-hussain-752142284/" target="_blank" rel="noopener noreferrer">ammad-hussain-752142284</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon"><MapPin size={26} /></div>
              <div>
                <h4>Location</h4>
                <p>Rahim Yar Khan, Pakistan</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="contact-form-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input id="email" name="email" type="email" required placeholder="john@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required placeholder="Hello Ammad, I'd like to talk about..." value={form.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <Send size={18} />
                <span>Send Message</span>
              </button>
              {formStatus && <p className="form-success">{formStatus}</p>}
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ammad Hussain. All rights reserved.</p>
      </footer>
    </div>
  );
}