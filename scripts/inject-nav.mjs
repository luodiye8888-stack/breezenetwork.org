import fs from 'fs';
let content = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
content = content.replace('<div id="article-content" class="custom-article-content pb-40">\n        <slot />\n      </div>\n    </article>', '<div id="article-content" class="custom-article-content pb-10">\n        <slot />\n      </div>\n      <ArticleNav />\n    </article>');
fs.writeFileSync('src/layouts/GuideLayout.astro', content);
