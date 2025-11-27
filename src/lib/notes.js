import notesData from '../data/notes.json';

export function getAllNotes() {
  return notesData.notes;
}

export function getNoteBySlug(slug) {
  return notesData.notes.find(note => note.slug === slug);
}

export function processContentWithLinks(content) {
  const allNotes = getAllNotes();
  
  // Replace [[Note Title]] with links
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, noteTitle) => {
    const linkedNote = allNotes.find(note => note.title === noteTitle);
    
    if (linkedNote) {
      // ✅ ENSURE the class "internal-link" is here. 
      // I'll keep the data-slug attribute for the hover feature, if you implement it.
      return `<a href="/notes/${linkedNote.slug}" data-slug="${linkedNote.slug}" class="internal-link">${noteTitle}</a>`;
    }
    
    // If note doesn't exist, leave as text but with different styling
    return `<span class="broken-link">${noteTitle}</span>`;
  });
}

export function getBacklinks(targetSlug) {
  const allNotes = getAllNotes();
  const backlinks = [];

  allNotes.forEach(note => {
    // Simple regex to find [[Note Title]] pattern
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

export function processContentWithLinks(content) {
  const allNotes = getAllNotes();
  
  // Replace [[Note Title]] with links
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, noteTitle) => {
    const linkedNote = allNotes.find(note => note.title === noteTitle);
    
    if (linkedNote) {
      return `<a href="/notes/${linkedNote.slug}" class="internal-link">${noteTitle}</a>`;
    }
    
    // If note doesn't exist, leave as text but with different styling
    return `<span class="broken-link">${noteTitle}</span>`;
  });
}