// src/pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const heroRef = useRef(null);
  const linkCardsRef = useRef([]);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Hi, I'm Melania 👋";

  useEffect(() => {
    // Typewriter effect
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe hero elements
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.fade-up');
      heroElements.forEach(el => observer.observe(el));
    }

    // Observe link cards
    linkCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !linkCardsRef.current.includes(el)) {
      linkCardsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>Melania Yoo - Portfolio</title>
        <meta name="description" content="Personal portfolio of Melania Yoo" />
      </Head>

      <Layout>
        <section className="hero" ref={heroRef}>
          <div className="container">
            <div className="hero-content">
              <h1 className="typewriter-container">
                <span className="typewriter-text">{displayedText}</span>
                <span className="cursor">|</span>
              </h1>
              <p className="fade-up" style={{ animationDelay: '0.1s' }}>I'm a Computer Engineering student at the University of Waterloo, with a passion for tackling tough problems in security, embedded systems, and robotics.</p>
              
              <div className="highlights">
                <div className="highlight-item fade-up" style={{ animationDelay: '0.2s' }}>
                  <i className="fas fa-microchip bounce"></i>
                  <span>I love exploring how hardware and software come together, building projects that push the boundaries of what's possible.</span>
                </div>
                <div className="highlight-item fade-up" style={{ animationDelay: '0.3s' }}>
                  <i className="fas fa-book bounce" style={{ animationDelay: '0.1s' }}></i>
                  <span>I continuously keep track of what I learn by updating my notes page with my latest braindumps and discoveries — so look forward to it!</span>
                </div>
              </div>
              
              <div className="btn-container fade-up" style={{ animationDelay: '0.4s' }}>
                <Link href="/work" className="btn pulse-hover">View My Work</Link>
                <Link href="/notes" className="btn btn-outline pulse-hover">Read My Notes</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-links">
          <div className="container">
            <div className="links-grid">
              <Link href="/work" className="link-card slide-in" ref={addToRefs}>
                <i className="fas fa-briefcase float"></i>
                <h3>Work</h3>
                <p>Experiences That Shaped My Path</p>
              </Link>
              <Link href="/projects" className="link-card slide-in" ref={addToRefs}>
                <i className="fas fa-laptop-code float" style={{ animationDelay: '0.2s' }}></i>
                <h3>Projects</h3>
                <p>Beyond the Assignment: My Tech Playground</p>
              </Link>
              <Link href="/notes" className="link-card slide-in" ref={addToRefs}>
                <i className="fas fa-book float" style={{ animationDelay: '0.4s' }}></i>
                <h3>Notes</h3>
                <p>A living document of my technical exploration</p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          background: var(--background-color);
          overflow: hidden;
        }
        
        .hero-content {
          max-width: 800px;
        }
        
        .typewriter-container {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          color: var(--secondary-color);
          min-height: 4.2rem;
          display: flex;
          align-items: center;
        }
        
        .typewriter-text {
          color: var(--secondary-color);
        }
        
        .typewriter-text span {
          color: var(--primary-color);
        }
        
        .cursor {
          animation: blink 1s infinite;
          margin-left: 2px;
          color: var(--primary-color);
        }
        
        .hero p {
          font-size: 1.2rem;
          color: var(--light-text);
          margin-bottom: 2rem;
          max-width: 600px;
        }
        
        .quick-links {
          padding: 4rem 0;
          background-color: #F1F5F9;
        }
        
        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .link-card {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          transition: var(--transition);
          text-align: center;
          display: block;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .link-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-hover);
        }
        
        .link-card i {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        
        .link-card h3 {
          margin-bottom: 1rem;
          color: var(--secondary-color);
        }
        
        .link-card p {
          color: var(--light-text);
        }
        
        /* Animation Classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .slide-in {
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.6s ease;
        }
        
        .links-grid .link-card:nth-child(2) {
          transition-delay: 0.1s;
        }
        
        .links-grid .link-card:nth-child(3) {
          transition-delay: 0.2s;
        }
        
        /* Typewriter cursor animation */
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        
        /* Hand wave animation - applied to the emoji in the typed text */
        .typewriter-text {
          position: relative;
        }
        
        .typewriter-text::after {
          content: "👋";
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
          margin-left: 0.5rem;
        }
        
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        
        /* Icon bounce animation */
        .bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
        
        /* Icon float animation */
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        /* Button pulse hover effect */
        .pulse-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .pulse-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .pulse-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .pulse-hover:hover::before {
          left: 100%;
        }
        
        /* Staggered animation for highlight items */
        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .highlight-item i {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        
        @media (max-width: 768px) {
          .typewriter-container {
            font-size: 2.5rem;
            min-height: 3rem;
          }
          
          .highlight-item {
            flex-direction: column;
            text-align: center;
          }
          
          .highlight-item i {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}