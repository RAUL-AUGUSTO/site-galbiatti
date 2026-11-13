import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const config = JSON.parse(read('firebase.json'));
JSON.parse(read('.firebaserc'));
const pages = ['index.html', 'privacidade.html', '404.html'];
for (const page of pages) {
  const html = read(page);
  check(/<html[^>]+lang="pt-BR"/.test(html), `${page}: idioma ausente`);
  check(/<title>.+?<\/title>/.test(html), `${page}: título ausente`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  check(new Set(ids).size === ids.length, `${page}: IDs duplicados`);
  for (const [, value] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|\/\/)/.test(value)) continue;
    const [path, fragment] = value.split('#');
    const cleanPath = path.split('?')[0];
    if (!cleanPath && fragment) check(ids.includes(fragment), `${page}: âncora inexistente ${value}`);
    if (!cleanPath) continue;
    let target = resolve(root, cleanPath.replace(/^\//, ''));
    if (cleanPath === '/') target = resolve(root, 'index.html');
    check(existsSync(target) || existsSync(`${target}.html`), `${page}: arquivo inexistente ${value}`);
  }
}
const html = read('index.html');
const csp = config.hosting.headers.flatMap(entry => entry.headers).find(header => header.key === 'Content-Security-Policy')?.value ?? '';
for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
  JSON.parse(json);
  const hash = createHash('sha256').update(json).digest('base64');
  check(csp.includes(`'sha256-${hash}'`), 'Hash CSP do JSON-LD não corresponde ao HTML');
}
execFileSync(process.execPath, ['--check', resolve(root, 'js/main.js')], { stdio: 'inherit' });
const tracked = execFileSync('git', ['-c', `safe.directory=${root.replaceAll('\\', '/')}`, 'ls-files'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/);
for (const path of tracked) {
  check(!/(?:^|\/)(?:\.env(?:\..*)?|.*\.(?:pem|key)|.*service[-_]?account.*\.json)$/i.test(path), `Arquivo potencialmente sensível: ${path}`);
  if (!/\.(?:html|css|js|mjs|json|md|yml)$/.test(path)) continue;
  const text = read(path);
  check(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text), `Chave privada em ${path}`);
  check(!/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AIza[A-Za-z0-9_-]{35})\b/.test(text), `Possível credencial em ${path}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('OK: páginas, arquivos locais, âncoras, IDs, JSON, CSP, sintaxe JavaScript e padrões de credenciais.');
}
