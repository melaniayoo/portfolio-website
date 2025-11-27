// src/pages/projects.js
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Projects() {
  const sectionTitleRef = useRef(null);
  const projectCardsRef = useRef([]);

  const projects = [
    {
      title: "Drone RL Control",
      description: "Simulation & Control of a Drone using Reinforcement Learning Techniques in a ROS2 Environment",
      tags: ["ROS2", "Reinforcement Learning", "Gazebo", "OpenAI Gymnasium", "Stable Baselines3"],
      icon: "fa-solid fa-robot",
      link: "/projects/drone-rl-control"
    },
    {
      title: "Handwriting Recognizer",
      description: "Recognition and Conversion of Handwritten Alphabets and Numbers into Digital Text",
      tags: ["ML", "CNN", "Image Processing", "Computer Vision", "PyTorch", "Tkinter"],
      icon: "fas fa-laptop-code",
      link: "/projects/handwriting-recognizer"
    },
    {
      title: "Water Level Tracker",
      description: "A portable STM32-based water tracker that monitors bottle consumption in real time and provides personalized reminders and feedback",
      tags: ["C", "STM32CubeIDE", "STM32F401RE Board", "Sensor Integration", "Embedded Systems", "Real-Time Monitoring"],
      icon: "fas fa-water",
      link: "/projects/water-level-tracker"
    },
    {
      title: "Dance Dance Fingerlution",
      description: "Raspberry Pi-based memory game where players replicate LED-lit button sequences with real-time visual and audio feedback",
      tags: ["Raspberry Pi", "Python", "GPIO Control", "Audio Playback", "Circuit Prototyping"],
      icon: "fas fa-gamepad",
      link: "/projects/dance-dance-fingerlution"
    },
    {
      title: "Port Scanner",
      description: "Python-based TCP port scanner that scans a given IP address or hostname over a specified range of ports",
      tags: ["Python", "Network Security", "Penetration Testing", "Socket Programming"],
      icon: "fas fa-shield-alt",
      link: "/projects/port-scanner"
    }
  ];

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe section title
    if (sectionTitleRef.current) {
      observer.observe(sectionTitleRef.current);
    }

    // Observe project cards
    projectCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const addToProjectRefs = (el) => {
    if (el && !projectCardsRef.current.includes(el)) {
      projectCardsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>Projects - Melania Yoo</title>
      </Head>

      <Layout>
        <section className="section-padding">
          <div className="container">
            <div className="section-title" ref={sectionTitleRef}>
              <h1>Projects</h1>
              <p className="subtitle">Beyond the Assignment: My Tech Playground</p>
            </div>
            
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card" ref={addToProjectRefs}>
                  <div className="project-icon">
                    <i className={project.icon}></i>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                  <Link href={project.link} className="project-link">
                    View Project <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>

      <style jsx>{`
        .section-padding {
          padding: 6rem 0 2rem 0; /* Consistent with work page */
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title h1 {
          font-size: 2.5rem;
          display: inline-block;
          position: relative;
          color: var(--secondary-color); /* Add this line */
        }
        
        .section-title h1:after {
          content: '';
          position: absolute;
          width: 0;
          height: 4px;
          background-color: var(--primary-color);
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.8s ease;
        }
        
        .section-title.animate-in h1:after {
          width: 60px;
        }
        
        .subtitle {
          margin-top: 1.5rem;
          color: var(--light-text);
          font-size: 1.1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.3s;
        }
        
        .section-title.animate-in .subtitle {
          opacity: 1;
          transform: translateY(0);
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .project-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }
        
        .project-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        /* Stagger the animation for project cards */
        .project-card:nth-child(1).animate-in { transition-delay: 0.1s; }
        .project-card:nth-child(2).animate-in { transition-delay: 0.2s; }
        .project-card:nth-child(3).animate-in { transition-delay: 0.3s; }
        .project-card:nth-child(4).animate-in { transition-delay: 0.4s; }
        .project-card:nth-child(5).animate-in { transition-delay: 0.5s; }
        
        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-hover);
        }
        
        .project-icon {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
          transition: all 0.4s ease;
        }
        
        .project-card:hover .project-icon {
          transform: scale(1.1) rotate(5deg);
          color: var(--secondary-color);
        }
        
        .project-card h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.2s;
          color: var(--secondary-color); /* Add this line */
        }
        
        .project-card.animate-in h3 {
          opacity: 1;
          transform: translateY(0);
        }
        
        .project-card p {
          color: var(--light-text);
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.3s;
        }
        
        .project-card.animate-in p {
          opacity: 1;
          transform: translateY(0);
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tag {
          background: rgba(253, 224, 71, 0.2);
          color: var(--secondary-color);
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
          font-size: 0.8rem;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s ease;
        }
        
        .project-card.animate-in .tag {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Stagger tag animations */
        .project-card.animate-in .tag:nth-child(1) { transition-delay: 0.4s; }
        .project-card.animate-in .tag:nth-child(2) { transition-delay: 0.5s; }
        .project-card.animate-in .tag:nth-child(3) { transition-delay: 0.6s; }
        .project-card.animate-in .tag:nth-child(4) { transition-delay: 0.7s; }
        .project-card.animate-in .tag:nth-child(5) { transition-delay: 0.8s; }
        .project-card.animate-in .tag:nth-child(6) { transition-delay: 0.9s; }
        
        .project-link {
          color: var(--secondary-color);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
          text-decoration: none;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.6s ease 0.5s;
        }
        
        .project-card.animate-in .project-link {
          opacity: 1;
          transform: translateX(0);
        }
        
        .project-link:hover {
          color: var(--primary-color);
          gap: 0.8rem;
        }
        
        .project-link i {
          transition: transform 0.3s ease;
        }
        
        .project-link:hover i {
          transform: translateX(3px);
        }
        
        /* Add a subtle gradient border on hover */
        .project-card {
          position: relative;
          overflow: hidden;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.05), transparent);
          transition: left 0.6s ease;
        }
        
        .project-card:hover::before {
          left: 100%;
        }
        
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .project-card {
            padding: 1.5rem;
          }
          
          /* Reduce animation delays on mobile for faster feel */
          .project-card.animate-in { transition-delay: 0s !important; }
          .project-card.animate-in .tag { transition-delay: 0.1s !important; }
        }
      `}</style>
    </>
  );
}