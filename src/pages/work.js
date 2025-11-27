// src/pages/work.js
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { useEffect, useRef } from 'react';

export default function Work() {
  const sectionTitleRef = useRef(null);
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe section title
    if (sectionTitleRef.current) {
      observer.observe(sectionTitleRef.current);
    }

    // Observe timeline items
    timelineItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const addToTimelineRefs = (el) => {
    if (el && !timelineItemsRef.current.includes(el)) {
      timelineItemsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>Work Experience - Melania Yoo</title>
      </Head>

      <Layout>
        <section className="section-padding">
          <div className="container">
            <div className="section-title" ref={sectionTitleRef}>
              <h1>Work Experience</h1>
            </div>
            
            <div className="timeline">
              <div className="timeline-item" ref={addToTimelineRefs}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Sep 2024 - Dec 2024</div>
                  <h3>Information Security Intern</h3>
                  <div className="company">Toyota Canada Inc.</div>
                  <ul>
                    <li>Monitored and investigated phishing emails</li>
                    <li>Organized Cybersecurity Awareness Month, driving company-wide engagement with weekly content, achieving
                        750+ views and 200+ quiz completions</li>
                    <li>Built control assessments, evaluating the maturity of existing security controls</li>
                    <li>Gained exposure to Qualys, QRadar, and CrowdStrike, enhancing understanding of vulnerability management, SIEM, and endpoint detection.</li>
                  </ul>
                </div>
              </div>
              
              <div className="timeline-item" ref={addToTimelineRefs}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Jan 2024 - Apr 2024</div>
                  <h3>Application Engineering Intern</h3>
                  <div className="company">BlackBerry QNX</div>
                  <ul>
                    <li>Conducted a research project to compare the real time performance of the QNX micro-kernel with the Ubuntu monolithic kernel, analyzing computational execution times across single-threaded and multi-threaded scenarios.</li>
                    <li>Designed software in C++ and Python with ROS 2 to utilize the ORB-SLAM3 library for implementing a small-scale monocular visual SLAM tracking demo on a mobile robot equipped with a ZED 2 camera</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <style jsx>{`
        .section-padding {
          padding: 6 rem 0 2rem 0;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title h1 {
          font-size: 2.5rem;
          display: inline-block;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
          color: var(--secondary-color);
        }
        
        .section-title.visible h1 {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-title h1:after {
          content: '';
          position: absolute;
          width: 60px;
          height: 4px;
          background-color: var(--primary-color);
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          transition: transform 0.8s ease 0.3s;
        }
        
        .section-title.visible h1:after {
          transform: translateX(-50%) scaleX(1);
        }
        
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .timeline:before {
          content: '';
          position: absolute;
          left: 50%;
          width: 2px;
          height: 100%;
          background-color: var(--primary-color);
          transform: translateX(-50%);
        }
        
        .timeline-item {
          width: 50%;
          padding: 20px 40px;
          position: relative;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.6s ease;
        }
        
        .timeline-item:nth-child(even) {
          transform: translateX(50px);
        }
        
        .timeline-item.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .timeline-item:nth-child(odd) {
          left: 0;
        }
        
        .timeline-item:nth-child(even) {
          left: 50%;
        }
        
        .timeline-content {
          background: white;
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
        }
        
        .timeline-content:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }
        
        .timeline-dot {
          position: absolute;
          top: 32px;
          width: 16px;
          height: 16px;
          background: var(--primary-color);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .timeline-item.visible .timeline-dot {
          animation: pulse 2s infinite;
        }
        
        .timeline-item:nth-child(odd) .timeline-dot {
          right: -8px;
        }
        
        .timeline-item:nth-child(even) .timeline-dot {
          left: -8px;
        }
        
        .timeline-date {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.2s;
        }
        
        .timeline-item.visible .timeline-date {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          opacity: 0;
          color: var(--secondary-color);
          transform: translateY(10px);
          transition: all 0.6s ease 0.3s;
        }
        
        .timeline-item.visible .timeline-content h3 {
          opacity: 1;
          transform: translateY(0);
        }
        
        .company {
          color: var(--light-text);
          font-weight: 500;
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.4s;
        }
        
        .timeline-item.visible .company {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-content ul {
          list-style-position: inside;
          color: var(--light-text);
        }
        
        .timeline-content li {
          margin-bottom: 0.5rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.5s ease;
        }
        
        .timeline-item.visible .timeline-content li {
          opacity: 1;
          transform: translateX(0);
        }
        
        .timeline-item.visible .timeline-content li:nth-child(1) {
          transition-delay: 0.5s;
        }
        .timeline-item.visible .timeline-content li:nth-child(2) {
          transition-delay: 0.6s;
        }
        .timeline-item.visible .timeline-content li:nth-child(3) {
          transition-delay: 0.7s;
        }
        .timeline-item.visible .timeline-content li:nth-child(4) {
          transition-delay: 0.8s;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
        
        @media (max-width: 768px) {
          .timeline:before {
            left: 20px;
          }
          
          .timeline-item {
            width: 100%;
            padding-left: 50px;
            padding-right: 0;
            left: 0 !important;
            transform: translateX(-30px);
          }
          
          .timeline-item:nth-child(even) {
            transform: translateX(-30px);
          }
          
          .timeline-item.visible {
            transform: translateX(0);
          }
          
          .timeline-item:nth-child(odd) .timeline-dot,
          .timeline-item:nth-child(even) .timeline-dot {
            left: 12px;
          }
        }
      `}</style>
    </>
  );
}