const fs = require('fs');
const path = require('path');

const guidesDir = path.join('src', 'pages', 'guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(guidesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the original dirty title
  const titleMatch = content.match(/title="([^"]+)"/);
  if (!titleMatch) return;
  
  const dirtyTitle = titleMatch[1];
  
  // Clean up the title
  let cleanTitle = dirtyTitle;
  
  // If it has book quotes 《》, extract that as the main title
  const bookMatch = dirtyTitle.match(/《([^》]+)》/);
  if (bookMatch) {
    cleanTitle = bookMatch[1];
  } else {
    // Otherwise, just split by newlines, trim, and take the longest meaningful line or just the first non-empty line
    const lines = dirtyTitle.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length > 0) {
      // Find the most 'title-like' line (e.g. longest or first)
      cleanTitle = lines.reduce((a, b) => a.length > b.length ? a : b);
      if (cleanTitle.length > 50) {
        cleanTitle = lines[0]; // fallback
      }
    }
  }

  // Remove any leftover newlines and extra spaces
  cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim();

  // Replace title in frontmatter
  content = content.replace(`title="${dirtyTitle}"`, `title="${cleanTitle}"`);
  
  // Replace the messy strong tag in the intro paragraph
  // The intro paragraph looks like: <p>今天我们要坐下来深度聊聊的主题，是 <strong>...</strong>。
  // We can just use a regex to replace everything inside <strong>...</strong> that comes after "聊聊的主题"
  content = content.replace(/(主题，\s*是\s*<strong>)(.*?)(<\/strong>)/s, `$1${cleanTitle}$3`);

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Successfully cleaned up titles in all articles!");
