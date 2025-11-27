// src/pages/notes/index.js
import { useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import NoteCard from '../../components/notes/NoteCard';
import TagsFilter from '../../components/notes/TagsFilter';
import { getAllNotes } from '../../data/notes';

export default function NotesIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const sectionTitleRef = useRef(null);
  const sidebarRef = useRef(null);
  const noteCardsRef = useRef([]);

  const notes = getAllNotes();
  
  const filteredNotes = useMemo(() => {
    if (!searchTerm && !selectedTag) {
      return notes;
    }

    return notes.filter(note => {
      const matchesSearch = !searchTerm || 
        note.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag = !selectedTag || note.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [notes, searchTerm, selectedTag]);

  const allTags = useMemo(() => {
    const tags = new Set();
    notes.forEach(note => {
      note.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [notes]);

  // Typewriter effect for title and subtitle
  useEffect(() => {
    const titleText = "📚 Knowledge Vault";
    const subtitleText = "My learning journey and technical notes from courses and personal projects.";
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleInterval, subtitleInterval;

    // Start typing title
    titleInterval = setInterval(() => {
      if (titleIndex <= titleText.length) {
        setDisplayedTitle(titleText.slice(0, titleIndex));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        setIsTitleComplete(true);
        
        // Start typing subtitle after title completes
        subtitleInterval = setInterval(() => {
          if (subtitleIndex <= subtitleText.length) {
            setDisplayedSubtitle(subtitleText.slice(0, subtitleIndex));
            subtitleIndex++;
          } else {
            clearInterval(subtitleInterval);
          }
        }, 30); // Faster typing for subtitle
      }
    }, 80); // Title typing speed

    return () => {
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, []);

  useEffect(() => {
    // Reset animations when filtered notes change
    noteCardsRef.current.forEach(card => {
      if (card) card.classList.remove('animate-in');
    });

    // Re-observe note cards after a brief delay to trigger animations
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe note cards
      noteCardsRef.current.forEach(card => {
        if (card) observer.observe(card);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredNotes]);

  useEffect(() => {
    // Initial animations setup
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe sidebar sections
    if (sidebarRef.current) {
      const sidebarSections = sidebarRef.current.querySelectorAll('.sidebar-section');
      sidebarSections.forEach(section => observer.observe(section));
    }

    return () => observer.disconnect();
  }, []);

  const addToNoteRefs = (el) => {
    if (el && !noteCardsRef.current.includes(el)) {
      noteCardsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>Notes - Melania Yoo</title>
      </Head>

      <Layout>
        <div className="notes-page">
          <div className="container">
            <div className="notes-layout">
              {/* Sidebar */}
              <aside className="notes-sidebar" ref={sidebarRef}>
                <div className="sidebar-section">
                  <TagsFilter
                    tags={allTags}
                    selectedTag={selectedTag}
                    onTagSelect={setSelectedTag}
                    notesCount={notes.length}
                  />
                </div>

                <div className="sidebar-section">
                  <h3>Recent Notes</h3>
                  <div className="recent-notes">
                    {notes.slice(0, 5).map((note, index) => (
                      <Link 
                        key={note.slug} 
                        href={`/notes/${note.slug}`} 
                        className="recent-note"
                      >
                        {note.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="notes-main">
                <div className="notes-header" ref={sectionTitleRef}>
                  <h1>
                    {displayedTitle}
                    {!isTitleComplete && <span className="typing-cursor">|</span>}
                  </h1>
                  <p>
                    {displayedSubtitle}
                    {isTitleComplete && displayedSubtitle.length < "My learning journey and technical notes from courses and personal projects.".length && (
                      <span className="typing-cursor">|</span>
                    )}
                  </p>
                  
                  <div className="search-bar-container">
                    <input
                      type="text"
                      placeholder="Search notes by title, content, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="clear-search"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="notes-grid">
                  {filteredNotes.map((note, index) => (
                    <div key={note.slug} ref={addToNoteRefs} className="note-card-wrapper">
                      <NoteCard note={note} />
                    </div>
                  ))}
                  
                  {filteredNotes.length === 0 && (
                    <div className="no-notes">
                      <h3>No notes found</h3>
                      <p>Try adjusting your search or filter</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedTag('');
                        }}
                        className="reset-filters"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </Layout>

      <style jsx>{`
        .notes-page {
          padding: 6rem 0 2rem 0;
          min-height: 100vh;
          background: var(--background-color);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .notes-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .notes-sidebar {
          position: sticky;
          top: 6rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-section {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease;
        }

        .sidebar-section.animate-in {
          opacity: 1;
          transform: translateX(0);
        }

        /* Stagger sidebar animations */
        .sidebar-section:nth-child(1).animate-in {
          transition-delay: 0.1s;
        }
        .sidebar-section:nth-child(2).animate-in {
          transition-delay: 0.2s;
        }

        .sidebar-section h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: var(--secondary-color);
          font-weight: 600;
        }

        .recent-notes {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .recent-note {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          color: var(--text-color);
          text-decoration: none;
          opacity: 0;
          transform: translateY(10px);
        }

        .sidebar-section.animate-in .recent-note {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger recent note animations */
        .sidebar-section.animate-in .recent-note:nth-child(1) { transition-delay: 0.3s; }
        .sidebar-section.animate-in .recent-note:nth-child(2) { transition-delay: 0.4s; }
        .sidebar-section.animate-in .recent-note:nth-child(3) { transition-delay: 0.5s; }
        .sidebar-section.animate-in .recent-note:nth-child(4) { transition-delay: 0.6s; }
        .sidebar-section.animate-in .recent-note:nth-child(5) { transition-delay: 0.7s; }

        .recent-note:hover {
          color: var(--secondary-color);
          transform: translateX(5px);
        }

        .notes-header {
          margin-bottom: 2rem;
        }

        .notes-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
          font-weight: 700;
          min-height: 1.2em;
        }

        .notes-header p {
          color: var(--light-text);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
          min-height: 1.6em;
        }

        /* Typewriter cursor */
        .typing-cursor {
          animation: blink 1s infinite;
          color: var(--secondary-color);
          font-weight: 300;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .search-bar-container {
          position: relative;
          max-width: 500px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.4s;
        }

        /* Show search bar after typing completes */
        .notes-header:not(:has(.typing-cursor)) .search-bar-container {
          opacity: 1;
          transform: translateY(0);
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--primary-color);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px #FFEFB3;
          transform: translateY(-2px);
        }

        .clear-search {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--light-text);
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .clear-search:hover {
          color: var(--text-color);
          background: var(--primary-color);
          border-radius: 4px;
          transform: translateY(-50%) scale(1.1);
        }

        .notes-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Note card wrapper for animations - NO DELAYS */
        .note-card-wrapper {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .note-card-wrapper.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .no-notes {
          text-align: center;
          padding: 3rem;
          color: var(--light-text);
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.6s ease;
        }

        .no-notes.animate-in {
          opacity: 1;
          transform: scale(1);
        }

        .no-notes h3 {
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }

        .reset-filters {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: var(--secondary-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .reset-filters:hover {
          background: #152642;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(29, 53, 87, 0.3);
        }

        /* Enhanced hover effects for sidebar */
        .sidebar-section {
          transition: all 0.4s ease;
        }

        .sidebar-section:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 8px 25px rgba(0,0,0,0.15),
            0 0 0 1px var(--primary-color);
        }

        /* Add a subtle glow to interactive elements */
        .search-input:focus,
        .reset-filters:focus {
          outline: none;
        }

        /* Enhanced tag filter styles to match theme */
        :global(.tag-filter) {
          transition: all 0.3s ease;
        }

        :global(.tag-filter:hover) {
          background: var(--primary-color) !important;
          color: var(--secondary-color) !important;
          transform: translateY(-2px);
        }

        :global(.tag-filter.active) {
          background: var(--secondary-color) !important;
          color: white !important;
        }

        @media (max-width: 968px) {
          .notes-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .notes-sidebar {
            position: static;
          }

          .sidebar-section {
            transform: translateY(20px);
          }

          .sidebar-section.animate-in {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}