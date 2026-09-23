const fs = require('fs');
const pages = [
  'airport-recommendation.astro', 
  'cheap-airport.astro', 
  'clash-airport.astro', 
  'dedicated-line.astro', 
  'ladder-recommendation.astro'
];
pages.forEach(page => {
  let p = 'src/pages/' + page;
  let content = fs.readFileSync(p, 'utf8');
  if (content.indexOf('\0') !== -1) {
    content = fs.readFileSync(p, 'utf16le'); // PS might have messed it up
  }
  content = content.replace(/title=".*?"/, (match) => {
    if(match.includes('2026机场推荐')) return 'title="2026机场推荐 - 微风网络"';
    if(match.includes('便宜机场推荐')) return 'title="便宜机场推荐 - 微风网络"';
    if(match.includes('Clash机场推荐')) return 'title="Clash机场推荐 - 微风网络"';
    if(match.includes('专线机场推荐')) return 'title="专线机场推荐 - 微风网络"';
    if(match.includes('2026梯子推荐')) return 'title="梯子推荐 - 微风网络"';
    return match;
  });
  // Strip BOM if exists
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  fs.writeFileSync(p, content, 'utf8');
});
console.log('Update complete!');
