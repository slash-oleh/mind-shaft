import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist', 'ai');
const templatesPath = path.join(src, 'formalize-skill', 'templates');
const protocolPath = path.join(templatesPath, 'protocol.md');

function copyDir(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source);
  for (const item of items) {
    if (item === 'README.md' && source === src) continue;
    if (item === 'protocol.md' && source === templatesPath) continue;

    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
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
      let newContent;
      if (content.includes('[PROTOCOL INJECTED]')) {
        newContent = content.replace('[PROTOCOL INJECTED]', protocolContent);
      } else {
        newContent = `${content}\n\n---\n\n${protocolContent}`;
      }
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
