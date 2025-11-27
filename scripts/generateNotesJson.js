// scripts/generateNotesJson.js
const fs = require('fs');
const path = require('path');

function parseMarkdownFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content: content };
  }

  const frontmatter = match[1];
  const markdownContent = match[2];
  
  const metadata = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content: markdownContent };
}

function generateNotesJson() {
  const notesDir = path.join(process.cwd(), 'notes');
  const outputFile = path.join(process.cwd(), 'src/data/notes.json');
  
  const notes = [];
  
  try {
    const files = fs.readdirSync(notesDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(notesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { metadata, content: markdownContent } = parseMarkdownFrontmatter(content);
        
        const slug = file.replace('.md', '');
        
        // Extract title from first heading if not in frontmatter
        let title = metadata.title || slug;
        const titleMatch = markdownContent.match(/^# (.*)$/m);
        if (titleMatch && !metadata.title) {
          title = titleMatch[1];
        }
        
        // Extract description (first paragraph)
        const description = markdownContent.split('\n\n').find(para => 
          para.trim() && !para.startsWith('#')
        ) || '';
        
        notes.push({
          slug,
          title: title,
          date: metadata.date || new Date().toISOString().split('T')[0],
          tags: metadata.tags || [],
          description: description.substring(0, 200),
          content: markdownContent
        });
      }
    });
    
    // Sort by date descending
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    fs.writeFileSync(outputFile, JSON.stringify(notes, null, 2));
    console.log(`Generated ${notes.length} notes in ${outputFile}`);
    
  } catch (error) {
    console.error('Error generating notes JSON:', error);
  }
}

generateNotesJson();