// src/components/ScrollProgress.js
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="scroll-progress">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      />
      <style jsx>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: transparent;
          z-index: 1000;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          transition: width 0.1s ease;
          box-shadow: 0 0 10px rgba(255, 239, 179, 0.5);
        }
      `}</style>
    </div>
  );
}