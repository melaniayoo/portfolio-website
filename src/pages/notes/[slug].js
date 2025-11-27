// src/pages/notes/[slug].js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  getNoteBySlug, 
  getAllNotes, 
  getBacklinks, 
  processContentWithLinks
} from '../../data/notes';

// Client-side note preview function
const getNotePreview = (linkText) => {
  try {
    const slug = linkText.toLowerCase().replace(/\s+/g, '-');
    const notes = require('../../data/notes.json').notes;
    const targetNote = notes.find(note => note.slug === slug);
    
    if (targetNote) {
      // Clean the excerpt - remove markdown and wikilinks
      const cleanContent = targetNote.content
        .replace(/\[\[([^\]]+)\]\]/g, '$1') // Remove wikilink brackets
        .replace(/#+\s?/g, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italics
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .trim();
      
      return {
        title: targetNote.title,
        excerpt: cleanContent.substring(0, 120) + (cleanContent.length > 120 ? '...' : ''),
        date: targetNote.date
      };
    }
  } catch (error) {
    console.error('Error getting note preview:', error);
  }
  
  return null;
};

export default function NotePage({ note, processedContent }) {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [previewNote, setPreviewNote] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // Fetch note preview data on hover
  useEffect(() => {
    if (!hoveredLink) {
      setPreviewNote(null);
      return;
    }

    const fetchPreview = async () => {
      setIsLoadingPreview(true);
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const notePreview = getNotePreview(hoveredLink);
      
      if (notePreview) {
        setPreviewNote(notePreview);
      } else {
        setPreviewNote({
          title: hoveredLink,
          excerpt: `Create "${hoveredLink}" note to see preview here.`,
          date: 'Not created yet'
        });
      }
      
      setIsLoadingPreview(false);
    };

    fetchPreview();
  }, [hoveredLink]);

  // Add hover event listeners to internal links
  useEffect(() => {
    const internalLinks = document.querySelectorAll('.internal-link');
    
    const handleMouseEnter = (e) => {
      const link = e.target;
      const linkText = link.textContent;
      
      setHoveredLink(linkText);
      setPreviewPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseLeave = () => {
      setHoveredLink(null);
    };

    internalLinks.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      internalLinks.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [processedContent]);

  if (router.isFallback) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="error-container">
        <h1>Note not found</h1>
        <Link href="/notes" className="back-link">
          ← Back to all notes
        </Link>
      </div>
    );
  }

  const pageTitle = `${note.title} - Melania`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      
      <div className="note-page">
        <div className="note-container">
          <div className="back-nav">
            <Link href="/notes" className="back-button">
              ← Back to Notes
            </Link>
          </div>

          <div className="note-content">
            <div className="note-header">
              <h1 className="note-title">{note.title}</h1>
              <div className="note-meta">
                <time className="note-date">
                  {new Date(note.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <div className="reading-time">
                  {Math.ceil(note.content.split(/\s+/).length / 200)} min read
                </div>
              </div>
            </div>

            <div className="content-section">
              <div 
                className="content-body"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Tooltip */}
      {(hoveredLink && (previewNote || isLoadingPreview)) && (
        <div 
          className="preview-tooltip"
          style={{
            left: `${previewPosition.x + 15}px`,
            top: `${previewPosition.y + 15}px`
          }}
        >
          <div className="preview-content">
            {isLoadingPreview ? (
              <div className="preview-loading">Loading preview...</div>
            ) : (
              <>
                <div className="preview-header">
                  <h4 className="preview-title">{previewNote.title}</h4>
                  <time className="preview-date">
                    {previewNote.date === 'Not created yet' 
                      ? 'Not created yet' 
                      : new Date(previewNote.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                    }
                  </time>
                </div>
                <div className="preview-excerpt">
                  {previewNote.excerpt}
                </div>
                <div className="preview-footer">
                  <span className="preview-link">Click to open note →</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .note-page {
          min-height: 100vh;
          background-color: var(--background-color);
          padding: 2rem 0;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      .note-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
        }

        .back-nav {
          margin-bottom: 2rem;
        }

        .back-button {
          color: var(--secondary-color);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
          padding: 0.5rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.7;
        }

        .back-button:hover {
          color: var(--primary-color);
          transform: translateX(-2px);
          opacity: 1;
        }

        .note-content {
          /* No padding needed since container handles it */
        }

        .note-header {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .note-title-container {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .title-icon {
          background: var(--primary-color);
          color: var(--secondary-color);
          padding: 0.5rem;
          border-radius: 8px;
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .note-title {
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--secondary-color);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
          flex: 1;
        }

        .note-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.95rem;
          padding-left: 3rem;
        }

        .note-date::before {
          content: "📅";
          font-size: 0.8rem;
        }

        .reading-time {
          color: var(--light-text);
          background: rgba(255, 239, 179, 0.2);
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(255, 239, 179, 0.3);
        }

        .reading-time::before {
          content: "⏱️";
          font-size: 0.8rem;
        }

        .content-body {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--text-color);
        }

        /* Headings */
        .content-body h1, .content-body h2, .content-body h3, .content-body h4 {
          margin: 2rem 0 1rem 0;
          color: var(--secondary-color);
          font-weight: 700;
        }

        .content-body h1 {
          font-size: 1.8rem;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .content-body h2 {
          font-size: 1.5rem;
          color: var(--secondary-color);
        }

        .content-body h3 {
          font-size: 1.3rem;
          color: var(--secondary-color);
          opacity: 0.9;
        }

        /* Lists */
        .content-body ul, .content-body ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .content-body li {
          margin: 0.5rem 0;
          padding-left: 0.5rem;
        }

        .content-body ul li::marker {
          color: var(--primary-color);
        }

        .content-body ol li::marker {
          color: var(--primary-color);
          font-weight: 600;
        }

        /* EXTERNAL LINKS */
        .content-body :global(.external-link) {
          text-decoration: none !important;
          color: var(--secondary-color) !important;
          font-weight: 500 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          border: 1px solid var(--border-color) !important;
          background: rgba(29, 53, 87, 0.05) !important;
          transition: var(--transition) !important;
        }

        .content-body :global(.external-link:hover) {
          color: var(--secondary-color) !important;
          background: rgba(29, 53, 87, 0.1) !important;
          border-color: var(--secondary-color) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(29, 53, 87, 0.15) !important;
        }

        /* INTERNAL LINKS - LIGHTER YELLOW */
        .content-body :global(.internal-link) {
          background-color: #FFFDF4 !important; /* Very light yellow */
          padding: 3px 8px !important;
          border-radius: 6px !important;
          font-weight: 600 !important;
          text-decoration: none !important;
          color: var(--text-color) !important;
          border: 1px solid rgba(255, 239, 179, 0.8) !important;
          transition: var(--transition) !important;
          cursor: pointer !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
        }

        .content-body :global(.internal-link:hover) {
          background-color: #FFF9C2 !important; /* Slightly brighter on hover */
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2) !important;
          border-color: var(--primary-color) !important;
        }

        /* Broken links */
        .content-body :global(.broken-link) {
          color: #e53e3e !important;
          text-decoration: line-through !important;
          background-color: #fed7d7 !important;
          padding: 3px 8px !important;
          border-radius: 4px !important;
          border: 1px solid #feb2b2 !important;
        }

        /* Code and technical elements */
        .content-body code {
          background: #f7fafc;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          color: #e53e3e;
          border: 1px solid var(--border-color);
        }

        /* Blockquotes */
        .content-body blockquote {
          border-left: 4px solid var(--primary-color);
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: var(--light-text);
          font-style: italic;
          background: rgba(255, 239, 179, 0.1);
          padding: 1rem 1rem 1rem 1.5rem;
          border-radius: 0 8px 8px 0;
        }

        /* Preview Tooltip Styles */
        .preview-tooltip {
          position: fixed;
          z-index: 1000;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 0;
          width: 320px;
          box-shadow: var(--shadow-hover);
          animation: fadeIn 0.2s ease;
          pointer-events: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .preview-content {
          padding: 1.25rem;
        }

        .preview-loading {
          text-align: center;
          color: var(--light-text);
          font-style: italic;
          padding: 1rem;
        }

        .preview-header {
          margin-bottom: 0.75rem;
        }

        .preview-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--secondary-color);
        }

        .preview-date {
          font-size: 0.8rem;
          color: var(--light-text);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .preview-excerpt {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 1rem;
        }

        .preview-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 0.75rem;
        }

        .preview-link {
          font-size: 0.8rem;
          color: var(--secondary-color);
          font-weight: 600;
        }

        /* Tags section */
        .note-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .tag {
          background: rgba(255, 239, 179, 0.2);
          color: var(--secondary-color);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(255, 239, 179, 0.3);
        }

        @media (max-width: 768px) {
          .note-container {
            padding: 0;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
          }

          .back-nav {
            padding: 1.5rem 1.5rem 0;
            border-radius: 0;
          }

          .note-content {
            padding: 0 1.5rem 1.5rem;
          }

          .note-title {
            font-size: 2rem;
          }
          
          .content-body {
            font-size: 1.05rem;
          }

          .note-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .preview-tooltip {
            width: 280px;
            left: 50% !important;
            transform: translateX(-50%);
          }
        }

        /* Loading and error states */
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .back-link {
          color: var(--secondary-color);
          text-decoration: none;
          font-weight: 500;
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .back-link:hover {
          color: var(--primary-color);
          transform: translateX(-2px);
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const notes = getAllNotes();
  const paths = notes.map(note => ({
    params: { slug: note.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const note = getNoteBySlug(params.slug);
  
  if (!note) {
    return {
      notFound: true
    };
  }

  const backlinks = getBacklinks(params.slug);
  const processedContent = processContentWithLinks(note.content);

  return {
    props: {
      note,
      backlinks,
      processedContent
    }
  };
}