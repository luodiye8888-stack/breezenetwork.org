import fs from 'fs';
import path from 'path';

const AFF_URL = "https://edp01.breezenetaff.com/#/?code=bSnymFll";
const CLOAKED_URL = "/go";

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.astro') || fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // If the file contains the AFF_URL
      if (content.includes(AFF_URL) && !fullPath.includes('go.astro')) {
        content = content.split(AFF_URL).join(CLOAKED_URL);
        changed = true;
      }
      
      // Check for <a href="/go" and ensure rel="nofollow sponsored"
      // It might already have rel="nofollow" or rel="nofollow sponsored" or nothing.
      // This regex looks for href="/go" and checks if rel is present.
      const anchorRegex = /<a\s+([^>]*?)href="\/go"([^>]*?)>/g;
      content = content.replace(anchorRegex, (match, before, after) => {
        let inside = before + " " + after;
        
        // Remove existing rel attributes to avoid duplicates
        inside = inside.replace(/rel="[^"]*"/, '');
        inside = inside.replace(/rel='[^']*'/, '');
        
        // Clean up extra spaces
        inside = inside.replace(/\s+/g, ' ').trim();
        
        changed = true;
        return `<a href="/go" rel="nofollow sponsored" ${inside}>`;
      });
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

walkAndReplace(path.join(process.cwd(), 'src'));
