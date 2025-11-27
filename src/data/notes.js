import notesData from './notes.json';

export function getAllNotes() {
  return notesData.notes || [];
}

export function getNoteBySlug(slug) {
  return notesData.notes.find(note => note.slug === slug);
}

export function getBacklinks(targetSlug) {
  const allNotes = getAllNotes();
  const backlinks = [];

  allNotes.forEach(note => {
    if (!note.content) return;
    
    const linkRegex = /\[\[([^\]]+)\]\]/g;
    let match;
    
    while ((match = linkRegex.exec(note.content)) !== null) {
      const linkedNoteTitle = match[1];
      const linkedNote = allNotes.find(n => n.title === linkedNoteTitle);
      
      if (linkedNote && linkedNote.slug === targetSlug) {
        backlinks.push({
          sourceNote: note,
          context: getContextAroundMatch(note.content, match.index, 50)
        });
      }
    }
  });

  return backlinks;
}

function getContextAroundMatch(content, matchIndex, contextLength) {
  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(content.length, matchIndex + contextLength);
  let context = content.substring(start, end);
  
  if (start > 0) context = '...' + context;
  if (end < content.length) context = context + '...';
  
  return context;
}

// In src/data/notes.js - update processContentWithLinks function
export function processContentWithLinks(content) {
  const allNotes = getAllNotes();
  
  if (!content) return '';
  
  let processedContent = content;
  
  // Process headings (###, ##, #)
  processedContent = processedContent.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  processedContent = processedContent.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  processedContent = processedContent.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  processedContent = processedContent.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Process bold text (**bold**)
  processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Process italic text (*italic*)
  processedContent = processedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Process unordered lists (- item)
  processedContent = processedContent.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Process ordered lists (1. item)
  processedContent = processedContent.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
  
  // Wrap consecutive list items in <ul> or <ol>
  processedContent = processedContent.replace(/(<li>.*<\/li>)(\s*<li>.*<\/li>)+/g, '<ul>$&</ul>');
  
  // Process line breaks
  processedContent = processedContent.replace(/\n/g, '<br>');
  
  // Process horizontal rules (---)
  processedContent = processedContent.replace(/^---$/gim, '<hr>');
  
// Process EXTERNAL links [text](url) - ADD THIS SECTION
  processedContent = processedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="external-link">$1</a>'
  );

  // Process unordered lists
  processedContent = processedContent.replace(/^- (.*)$/gim, '<li>$1</li>');
  // Process ordered lists  
  processedContent = processedContent.replace(/^\d+\. (.*)$/gim, '<li>$1</li>');

  // Wrap consecutive list items in ul/ol
  processedContent = processedContent.replace(/(<li>.*<\/li>)+/g, (match) => {
    // Check if it's likely an ordered list (starts with number)
    if (match.match(/<li>\d+\./)) {
      return `<ol>${match}</ol>`;
    } else {
      return `<ul>${match}</ul>`;
    }
  });

  // Process internal links LAST
  processedContent = processedContent.replace(/\[\[([^\]]+)\]\]/g, (match, noteTitle) => {
    const linkedNote = allNotes.find(note => note.title === noteTitle);
    
    if (linkedNote) {
      return `<a href="/notes/${linkedNote.slug}" class="internal-link">${noteTitle}</a>`;
    }
    
    return `<a class="broken-link">${noteTitle}</a>`;
  });

  return processedContent;
}

export function autoLinkKeywords(content) {
  if (!content) return content;

  const keywords = [
    "CompTIA Security+",
    "Risk Management", 
    "Network Security",
    "Cryptography",
    "Cybersecurity",
    "Computer Memory",
  ];

  let modified = content;

  keywords.forEach((word) => {
    const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
    
    const slug = word.toLowerCase().replace(/\s+/g, '-');
    
    modified = modified.replace(
      regex,
      `<a href="/notes/${slug}" class="internal-link">${word}</a>`
    );
  });

  return modified;
}