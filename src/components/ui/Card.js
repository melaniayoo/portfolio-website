// src/components/ui/Card.js
export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
      {children}
      <style jsx>{`
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          transition: var(--transition);
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }
      `}</style>
    </div>
  );
}