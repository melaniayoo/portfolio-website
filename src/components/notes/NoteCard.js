import Link from 'next/link';
import Card from '../ui/Card';
import { useRef } from 'react';

export default function NoteCard({ note }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 25;
    const rotateX = (centerY - y) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <Link href={`/notes/${note.slug}`}>
      <Card 
        hover 
        className="note-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1), box-shadow 0.5s ease',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="note-header">
          <h3>{note.title}</h3>
          <span className="note-date">
            {new Date(note.date).toLocaleDateString()}
          </span>
        </div>
        
        <p className="note-description">{note.description}</p>
        
        <div className="note-tags">
          {note.tags.map(tag => (
            <span key={tag} className="note-tag">{tag}</span>
          ))}
        </div>
        
        <style jsx>{`
          .note-card {
            border-left: 4px solid var(--primary-color);
            cursor: pointer;
            height: 100%;
            position: relative;
          }
          
          .note-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, transparent 0%, rgba(255, 239, 179, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.5s ease;
            border-radius: inherit;
            pointer-events: none;
          }
          
          .note-card:hover::before {
            opacity: 1;
          }
          
          .note-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            transform: translateZ(30px);
          }
          
          .note-header h3 {
            font-size: 1.3rem;
            margin: 0;
            flex: 1;
            line-height: 1.3;
            color: var(--secondary-color); /* ✅ FIXED: Changed to navy */
          }
          
          .note-date {
            color: var(--light-text);
            font-size: 0.9rem;
            white-space: nowrap;
            margin-left: 1rem;
            transform: translateZ(20px);
          }
          
          .note-description {
            color: var(--light-text);
            margin-bottom: 1rem;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            transform: translateZ(25px);
          }
          
          .note-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            transform: translateZ(20px);
          }
          
          .note-tag {
            background: rgba(253, 224, 71, 0.2);
            color: var(--secondary-color);
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            transition: all 0.3s ease;
          }
          
          .note-card:hover .note-tag {
            transform: translateY(-2px);
            background: rgba(253, 224, 71, 0.3);
          }
          
          @media (max-width: 768px) {
            .note-header {
              flex-direction: column;
              gap: 0.5rem;
            }
            
            .note-date {
              margin-left: 0;
            }
            
            /* Disable 3D effect on mobile for performance */
            .note-card {
              transform: none !important;
            }
          }
        `}</style>
      </Card>
    </Link>
  );
}