// src/components/notes/TagsFilter.js
export default function TagsFilter({ 
  tags, 
  selectedTag, 
  onTagSelect, 
  notesCount 
}) {
  return (
    <div className="tags-filter">
      <h3>Filter by Tags</h3>
      <div className="tags-list">
        <button
          className={`tag ${selectedTag === '' ? 'active' : ''}`}
          onClick={() => onTagSelect('')}
        >
          All Notes ({notesCount})
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <style jsx>{`
        .tags-filter {
          background: white;
          padding: 1.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
        }
        
        .tags-filter h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: var(--secondary-color);
        }
        
        .tags-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .tag {
          background: none;
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          font-size: 0.9rem;
        }
        
        .tag:hover {
          border-color: var(--primary-color);
          color: var(--secondary-color);
        }
        
        .tag.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: var(--secondary-color);
        }
      `}</style>
    </div>
  );
}