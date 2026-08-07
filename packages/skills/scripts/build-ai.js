import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import { visit } from 'unist-util-visit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist', 'ai');

function copyDir(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source);
  for (const item of items) {
    if (item === 'README.md') continue;

    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      if (item.endsWith('.md')) {
        let content = fs.readFileSync(srcPath, 'utf8');
        const tree = remark().use(remarkFrontmatter, ['yaml']).parse(content);
        
        visit(tree, 'yaml', (node) => {
          content = content
            .replace(node.value, node.value.replace(/^title:.*(\r?\n)?/m, ''))
            .replace(/^---\n\s*---\n+/m, '');
        });
        
        fs.writeFileSync(destPath, content);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log('Building skills...');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true });
}
fs.mkdirSync(dist, { recursive: true });

// src is grouped into category folders (sdlc/meta/tools) for organization,
// but dist stays flat - one skill folder per skill - since downstream
// consumers (rulesync, the `skills` CLI) resolve skills as immediate
// children of the skills root.
for (const category of fs.readdirSync(src)) {
  const categoryPath = path.join(src, category);
  if (!fs.lstatSync(categoryPath).isDirectory()) continue;

  for (const skill of fs.readdirSync(categoryPath)) {
    const skillPath = path.join(categoryPath, skill);
    if (!fs.lstatSync(skillPath).isDirectory()) continue;
    copyDir(skillPath, path.join(dist, skill));
  }
}

console.log('Build complete.');
