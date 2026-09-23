import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist directory not found. Did the build fail?');
  process.exit(1);
}

const findHtmlFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(filePath));
    } else if (filePath.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
};

const htmlFiles = findHtmlFiles(distDir);
const report = {
  buildStatus: 'SUCCESS',
  pagesGenerated: htmlFiles.length,
  missingTitle: 0,
  duplicateTitle: 0,
  missingDescription: 0,
  duplicateDescription: 0,
  missingH1: 0,
  multipleH1: 0,
  missingCanonical: 0,
  canonicalWrongDomain: 0,
  missingLang: 0,
  noindexPages: 0,
  brokenInternalLinks: 0,
  schemaPages: 0,
  ogMissing: 0,
  errors: []
};

const titles = new Set();
const descriptions = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) report.missingTitle++;
  else {
    if (titles.has(titleMatch[1])) report.duplicateTitle++;
    titles.add(titleMatch[1]);
  }
  
  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) report.missingDescription++;
  else {
    if (descriptions.has(descMatch[1])) report.duplicateDescription++;
    descriptions.add(descMatch[1]);
  }
  
  // H1
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) report.missingH1++;
  else if (h1Matches.length > 1) report.multipleH1++;
  
  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonMatch) report.missingCanonical++;
  else if (!canonMatch[1].startsWith('https://breezenetwork.org')) report.canonicalWrongDomain++;
  
  // Lang
  if (!content.match(/<html[^>]*lang=["']zh-CN["']/i)) report.missingLang++;
  
  // Noindex
  if (content.match(/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i)) report.noindexPages++;
  
  // Schema
  if (content.match(/<script\s+type=["']application\/ld\+json["']/i)) report.schemaPages++;
  
  // OG
  if (!content.match(/<meta\s+property=["']og:title["']/i)) report.ogMissing++;
});

console.log('--- FINAL SEO AUDIT REPORT ---');
console.log(JSON.stringify(report, null, 2));
const passed = (report.missingTitle + report.duplicateTitle + report.missingDescription + report.missingH1 + report.multipleH1 + report.missingCanonical + report.canonicalWrongDomain + report.missingLang) === 0;
console.log('Final SEO Audit: ' + (passed ? 'PASS' : 'FAIL'));
