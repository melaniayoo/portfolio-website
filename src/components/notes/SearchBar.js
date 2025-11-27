// src/components/notes/SearchBar.js
export default function SearchBar({ value, onChange, placeholder = "Search notes..." }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <i className="fas fa-search search-icon"></i>
      <style jsx>{`
        .search-container {
          position: relative;
          max-width: 400px;
          width: 100%;
        }
        
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: var(--transition);
          background: white;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(253, 224, 71, 0.1);
        }
        
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--light-text);
        }
      `}</style>
    </div>
  );
}