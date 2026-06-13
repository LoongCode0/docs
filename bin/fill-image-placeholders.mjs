// 一次性脚本：把所有 Markdown 截图占位 `](...)` 按「文档名_序号.png」规则填上图片路径。
// 规则：src 下每个 .md 文件内，按 `](...)` 出现顺序，第 N 个替换为 `](/images/<basename>_<N>.png)`。
// 已填写过真实路径的占位（非 `...`）不受影响。
// 用法（在仓库根目录）：node bin/fill-image-placeholders.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

function walkMarkdown(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkMarkdown(full, acc);
    else if (name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

let total = 0;
for (const file of walkMarkdown('src')) {
  const base = basename(file, '.md');
  let n = 0;
  const next = readFileSync(file, 'utf8').replace(/\]\(\.\.\.\)/g, () => {
    n += 1;
    return `](/images/${base}_${n}.png)`;
  });
  if (n > 0) {
    writeFileSync(file, next);
    console.log(`${file}: ${n}`);
    total += n;
  }
}
console.log(`TOTAL replaced: ${total}`);
