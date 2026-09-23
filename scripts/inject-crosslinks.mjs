import fs from 'fs';

const files = [
  'src/pages/pricing.astro',
  'src/pages/airport-recommendation.astro',
  'src/pages/ladder-recommendation.astro',
  'src/pages/clash-airport.astro',
  'src/pages/dedicated-line.astro',
  'src/pages/cheap-airport.astro',
  'src/pages/network.astro'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('<SEOCrossLinks />')) return;

  // Add import to frontmatter
  content = content.replace(/---\r?\n/, "---\nimport SEOCrossLinks from '../components/SEOCrossLinks.astro';\n");

  // Determine injection point
  if (content.includes('</article>')) {
    content = content.replace('</article>', '  <SEOCrossLinks />\n    </article>');
  } else if (content.includes('</main>')) {
    content = content.replace('</main>', '  <div class="max-w-4xl mx-auto px-4"><SEOCrossLinks /></div>\n  </main>');
  } else {
    // Inject before </Layout> but before <style> or <script> if they exist at the end
    // Easiest is just replacing </Layout> with the component + </Layout>
    const injection = `
  <section class="max-w-4xl mx-auto px-4 pb-12">
    <SEOCrossLinks />
  </section>
</Layout>`;
    content = content.replace('</Layout>', injection);
  }

  fs.writeFileSync(file, content);
  console.log(`Injected into ${file}`);
});
