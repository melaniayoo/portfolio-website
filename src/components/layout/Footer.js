// src/components/layout/Footer.js
import Link from 'next/link';

export default function Footer() {
  const copyEmail = () => {
    navigator.clipboard.writeText('m3yoo@uwaterloo.ca');
    // Optional: Show a toast notification
    alert('Email copied to clipboard!');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Melania <span>Yoo</span></div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/work">Work</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/notes">Notes</Link>
          </div>
          <div className="social-links">
            <a href="https://github.com/melaniayoo" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/melaniayoo/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a onClick={copyEmail} style={{ cursor: 'pointer' }}>
              <i className="far fa-envelope"></i>
            </a>
          </div>
          <p className="copyright">© 2025 Melania Yoo. All rights reserved.</p>
        </div>
      </div>
      <style jsx>{`
        footer {
          background-color: var(--secondary-color);
          color: white;
          padding: 4rem 0 2rem;
        }
        
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .footer-logo {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        
        .footer-logo span {
          color: var(--primary-color);
        }
        
        .footer-links {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-links a:hover {
          color: var(--primary-color);
        }
        
        .social-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .social-links a {
          font-size: 1.5rem;
          transition: var(--transition);
        }
        
        .social-links a:hover {
          color: var(--primary-color);
        }
        
        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .footer-links {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}