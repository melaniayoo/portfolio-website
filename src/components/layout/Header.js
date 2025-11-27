import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🤯</span>
            Melania<span>Yoo</span>
          </Link>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/notes">Notes</Link></li>
          </ul>
          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </div>
      <style jsx>{`
        header {
          background-color: var(--background-color);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: var(--transition);
        }
        
        header.scrolled {
          box-shadow: var(--shadow);
        }
        
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-weight: 700;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--secondary-color); 
        }
        
        .logo span {
          color: var(--primary-color);
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links a {
          font-weight: 500;
          transition: var(--transition);
          position: relative;
          color: var(--secondary-color); 
        }
        
        .nav-links a:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--primary-color);
          transition: var(--transition);
        }
        
        .nav-links a:hover:after {
          width: 100%;
        }
        
        .nav-links a:hover {
          color: var(--primary-color); 
        }
        
        .menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--secondary-color); 
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow);
          }
          
          .nav-links.active {
            display: flex;
          }
          
          .nav-links a {
            color: var(--secondary-color); 
            padding: 0.5rem 0;
          }
          
          .menu-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}