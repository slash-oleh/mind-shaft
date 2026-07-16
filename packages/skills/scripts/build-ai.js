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
const templatesPath = path.join(src, 'formalize-skill', 'templates');
const protocolPath = path.join(templatesPath, 'protocol.md');
const PROTOCOL_MARKER = '{{PROTOCOL_INJECTED}}';

function copyDir(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source);
  for (const item of items) {
    if (item === 'README.md') continue;
    if (item === 'protocol.md' && source === templatesPath) continue;

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

function injectProtocol(directory) {
  const protocolContent = fs.readFileSync(protocolPath, 'utf8');
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.lstatSync(fullPath).isDirectory()) {
      injectProtocol(fullPath);
    } else if (item === 'SKILL.md') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes(PROTOCOL_MARKER)) continue;
      const newContent = content.replace(PROTOCOL_MARKER, protocolContent);
      fs.writeFileSync(fullPath, newContent);
      console.log(`Injected protocol into ${fullPath}`);
    }
  }
}

console.log('Building skills...');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true });
}
copyDir(src, dist);
injectProtocol(dist);
console.log('Build complete.');
