// src/utils/notes.js
export function getAllTags(notes) {
  if (!Array.isArray(notes)) {
    console.error('getAllTags: Expected array but got', typeof notes, notes);
    return [];
  }
  
  const tags = new Set();
  notes.forEach(note => {
    if (note.tags && Array.isArray(note.tags)) {
      note.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function filterNotes(notes, searchTerm, selectedTag) {
  if (!Array.isArray(notes)) return [];
  
  // If no search term and no tag selected, return all notes
  if (!searchTerm && !selectedTag) {
    return notes;
  }
  
  return notes.filter(note => {
    // Convert search term to lowercase for case-insensitive search
    const searchLower = searchTerm ? searchTerm.toLowerCase() : '';
    
    // Check if note matches search term
    const matchesSearch = !searchTerm || 
      (note.title && note.title.toLowerCase().includes(searchLower)) ||
      (note.content && note.content.toLowerCase().includes(searchLower)) ||
      (note.tags && note.tags.some(tag => 
        tag.toLowerCase().includes(searchLower)
      ));
    
    // Check if note matches selected tag
    const matchesTag = !selectedTag || 
      (note.tags && note.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });
}

export function groupNotesByTag(notes) {
  if (!Array.isArray(notes)) return {};
  
  const grouped = {};
  notes.forEach(note => {
    if (note.tags) {
      note.tags.forEach(tag => {
        if (!grouped[tag]) grouped[tag] = [];
        grouped[tag].push(note);
      });
    }
  });
  return grouped;
}