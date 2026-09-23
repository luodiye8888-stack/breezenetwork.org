import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://breezenetwork.org';

const report = {
  scannedFiles: 0,
  titleErrors: { missing: [], duplicate: [], tooShort: [], tooLong: [] },
  descErrors: { missing: [], duplicate: [], tooShort: [], tooLong: [] },
  h1Errors: { missing: [], multiple: [], pass: 0 },
  canonicalErrors: { missing: [], duplicate: [], wrongDomain: [], nonSelf: [], pass: 0 },
  langErrors: { missing: [], wrong: [] },
  robotsErrors: { noindex: [], nofollow: [] },
  ogErrors: { missing: [], wrongUrl: [], pass: 0 },
  twitterErrors: { missing: [], pass: 0 },
  jsonldErrors: { invalid: [], duplicate: [], wrongDomain: [], total: 0 },
  schemaTypes: new Set(),
  brokenLinks: [],
  localhostRefs: [],
  wrongDomainRefs: []
};

const allTitles = new Map();
const allDescs = new Map();
const allHtmlFiles = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      allHtmlFiles.push(fullPath);
    }
  }
}

if (!fs.existsSync(DIST_DIR)) {
  console.error("DIST_DIR not found. Please run build first.");
  process.exit(1);
}

walkDir(DIST_DIR);
report.scannedFiles = allHtmlFiles.length;

allHtmlFiles.forEach(file => {
  const relPath = file.substring(DIST_DIR.length).replace(/\\/g, '/');
  // Expected canonical URL (normalize index.html)
  let expectedPath = relPath.replace(/\/index\.html$/, '/');
  if (expectedPath === '/404.html') expectedPath = '/404'; // special case or skip canonical for 404
  const expectedCanonical = `${BASE_URL}${expectedPath}`;
  
  const content = fs.readFileSync(file, 'utf-8');

  // Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    report.titleErrors.missing.push(relPath);
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 5) report.titleErrors.tooShort.push(relPath);
    if (title.length > 70) report.titleErrors.tooLong.push(relPath);
    if (allTitles.has(title)) report.titleErrors.duplicate.push(relPath);
    allTitles.set(title, relPath);
  }

  // Description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch) {
    report.descErrors.missing.push(relPath);
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 10) report.descErrors.tooShort.push(relPath);
    if (desc.length > 160) report.descErrors.tooLong.push(relPath);
    if (allDescs.has(desc)) report.descErrors.duplicate.push(relPath);
    allDescs.set(desc, relPath);
  }

  // Lang
  const langMatch = content.match(/<html[^>]*lang="([^"]+)"/i);
  if (!langMatch) {
    report.langErrors.missing.push(relPath);
  } else if (!langMatch[1].startsWith('zh')) {
    report.langErrors.wrong.push(relPath);
  }

  // H1
  // We match <h1... > ... </h1>
  const h1Matches = [...content.matchAll(/<h1[^>]*>(.*?)<\/h1>/gi)];
  if (h1Matches.length === 0) {
    report.h1Errors.missing.push(relPath);
  } else if (h1Matches.length > 1) {
    report.h1Errors.multiple.push(relPath);
  } else {
    report.h1Errors.pass++;
  }

  // Canonical
  // Exclude 404 from strict canonical requirement
  if (!relPath.includes('404.html')) {
    const canonicalMatches = [...content.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/gi)];
    if (canonicalMatches.length === 0) {
      report.canonicalErrors.missing.push(relPath);
    } else if (canonicalMatches.length > 1) {
      report.canonicalErrors.duplicate.push(relPath);
    } else {
      const canonical = canonicalMatches[0][1];
      if (!canonical.startsWith(BASE_URL)) {
        report.canonicalErrors.wrongDomain.push(relPath);
      } else if (canonical !== expectedCanonical && canonical !== expectedCanonical.slice(0, -1)) {
        // allowing trailing slash or not
        report.canonicalErrors.nonSelf.push(`${relPath} (Found: ${canonical}, Expected: ${expectedCanonical})`);
      } else {
        report.canonicalErrors.pass++;
      }
    }
  }

  // Robots
  const robotsMatch = content.match(/<meta\s+name="robots"\s+content="([^"]+)"/i);
  if (robotsMatch) {
    const directives = robotsMatch[1].toLowerCase();
    if (directives.includes('noindex') && !relPath.includes('404')) report.robotsErrors.noindex.push(relPath);
    if (directives.includes('nofollow') && !relPath.includes('404')) report.robotsErrors.nofollow.push(relPath);
  }

  // OG
  const ogTitle = content.match(/property="og:title"/i);
  const ogDesc = content.match(/property="og:description"/i);
  const ogUrlMatch = content.match(/property="og:url"\s+content="([^"]+)"/i);
  const ogImage = content.match(/property="og:image"/i);
  
  if (!ogTitle || !ogDesc || !ogUrlMatch) {
    report.ogErrors.missing.push(relPath);
  } else {
    const ogUrl = ogUrlMatch[1];
    if (!ogUrl.startsWith(BASE_URL)) report.ogErrors.wrongUrl.push(relPath);
    else report.ogErrors.pass++;
  }

  // Twitter
  const twCard = content.match(/name="twitter:card"/i);
  const twTitle = content.match(/name="twitter:title"/i);
  if (!twCard || !twTitle) {
    report.twitterErrors.missing.push(relPath);
  } else {
    report.twitterErrors.pass++;
  }

  // JSON-LD
  const jsonldMatches = [...content.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  report.jsonldErrors.total += jsonldMatches.length;
  const pageSchemas = new Set();
  jsonldMatches.forEach(match => {
    try {
      const parsed = JSON.parse(match[1]);
      const processSchema = (schema) => {
        if (schema['@type']) {
          report.schemaTypes.add(schema['@type']);
          if (pageSchemas.has(schema['@type'])) report.jsonldErrors.duplicate.push(`${relPath} (${schema['@type']})`);
          pageSchemas.add(schema['@type']);
        }
        const jsonStr = JSON.stringify(schema);
        if (jsonStr.includes('localhost') || jsonStr.includes('http://breezenetwork.org')) {
          report.jsonldErrors.wrongDomain.push(relPath);
        }
      };
      
      if (parsed['@graph']) {
        parsed['@graph'].forEach(processSchema);
      } else {
        processSchema(parsed);
      }
    } catch (e) {
      report.jsonldErrors.invalid.push(relPath);
    }
  });

  // Localhost & wrong domains
  if (/localhost|127\.0\.0\.1/i.test(content)) report.localhostRefs.push(relPath);
  if (/http:\/\/breezenetwork\.org|pages\.dev|workers\.dev/i.test(content)) report.wrongDomainRefs.push(relPath);

  // Internal Links
  const linkMatches = [...content.matchAll(/<a\s+[^>]*href="([^"]+)"/gi)];
  linkMatches.forEach(match => {
    let href = match[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      // It's an internal absolute path
      // Strip hash and query
      href = href.split('#')[0].split('?')[0];
      if (href === '' || href === '/') return;
      
      // Try to find if this route exists
      // In Astro, /about maps to /about/index.html
      let checkPath1 = path.join(DIST_DIR, href);
      if (!checkPath1.endsWith('.html') && !checkPath1.endsWith('/')) checkPath1 += '/index.html';
      else if (checkPath1.endsWith('/')) checkPath1 += 'index.html';
      
      let checkPath2 = path.join(DIST_DIR, href + '.html'); // just in case
      
      if (!fs.existsSync(checkPath1) && !fs.existsSync(checkPath2)) {
        if (!report.brokenLinks.find(l => l.path === relPath && l.href === href)) {
          report.brokenLinks.push({ path: relPath, href: href });
        }
      }
    }
  });
});

report.schemaTypes = Array.from(report.schemaTypes); console.log(JSON.stringify(report, null, 2));
