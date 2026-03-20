import React, { useEffect, useRef } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    const currentCards = cardsRef.current;
    currentCards.forEach((card) => {
      if (card) {
        card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
        card.addEventListener('mouseleave', () => handleMouseLeave(card));
      }
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) {
          card.removeEventListener('mousemove', (e) => handleMouseMove(e, card));
          card.removeEventListener('mouseleave', () => handleMouseLeave(card));
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="portfolio-container">
      <div className="liquid-bg">
        <div className="blob"></div>
      </div>

      <nav className="nav-island">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#reflection">Reflection</a>
      </nav>

      <div className="wrapper">
        {/* About Section */}
        <section id="about" className="card about-card" ref={addToRefs}>
          <div className="photo-circle">
            <img 
              src="./Profile.jpg" 
              alt="Jerico Corporal Soriano" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div>
            <h1>Jerico Corporal Soriano</h1>
            <p>A BSIT student focused on creating fluid, aesthetic digital experiences and integrating practical AI solutions.</p>
            <div className="tag-group">
              <span className="tag">🏆 Accomplishment: OMSC Mamburao Library System</span>
              <span className="tag">🎯 Interest: UI/UX & AI Development</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="card skills-card" ref={addToRefs}>
          <h2>Inventory</h2>
          <h3>Languages & Tech</h3>
          <div className="tag-group" style={{ marginBottom: '20px' }}>
            {['HTML5', 'CSS3', 'JS', 'React'].map(skill => <span key={skill} className="tag">{skill}</span>)}
          </div>
          <h3>Tools & Design</h3>
          <div className="tag-group">
            {['VS Code', 'Figma', 'Tailwind'].map(tool => <span key={tool} className="tag">{tool}</span>)}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="card projects-card" ref={addToRefs}>
          <h2>Featured Projects</h2>
          <div className="project-grid">
            <div className="project-box">
              <span style={{ fontSize: '12px', color: 'var(--accent)' }}>ROLE: LEAD DEVELOPER</span>
              <h3>OMSC Mamburao AI Library Book Locator</h3>
              <p>AI-powered web system using APIs for efficient library book discovery.</p>
              <div className="tag-group">
                <span className="tag">Artificial Intelligence</span>
                <span className="tag">API Integration</span>
              </div>
            </div>
            <div className="project-box">
              <span style={{ fontSize: '12px', color: 'var(--accent)' }}>ROLE: DESIGNER & DEVELOPER</span>
              <h3>Liquid Glass Web Portfolio</h3>
              <p>A high-fidelity personal portfolio showcasing modern UI/UX principles, Bento Grids, and glassmorphism.</p>
              <div className="tag-group">
                <span className="tag">CSS3</span>
                <span className="tag">Vanilla JS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection Section */}
        <section id="reflection" className="card reflection-card" ref={addToRefs}>
          <h2>Portfolio Reflection</h2>
          <span className="reflection-q">1. What technologies did you use and why?</span>
          <span className="reflection-a">I used CSS backdrop-filters and React to achieve the "Liquid Glass" look typical of modern OS updates.</span>
          <span className="reflection-q">4. What technologies are you most interested in learning?</span>
          <span className="reflection-a">I am passionate about learning Artificial Intelligence development as it is the most significant trend today.</span>
          <span className="reflection-q">5. What kind of applications do you want to build?</span>
          <span className="reflection-a">I aim to build practical, intelligent web applications that leverage AI to simplify complex tasks for users.</span>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;