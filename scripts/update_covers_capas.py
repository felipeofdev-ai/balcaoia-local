"""Atualiza coverSrc do catálogo Tier Zero para /capas/{slug}.jpg"""
from __future__ import annotations

import re
from pathlib import Path

p = Path(r"c:\Users\Usuário\Desktop\BalcãoIA Local\balcaoia-studio\lib\sales\tier-zero-catalog.ts")
t = p.read_text(encoding="utf-8")
t2, n = re.subn(
    r'coverSrc:\s*"/mockups/([a-z0-9-]+)/social-cover\.svg"',
    r'coverSrc: "/capas/\1.jpg"',
    t,
)
# objetos sem coverSrc: inserir após finalCtaTitle line when possible
# ensure every product object with slug: has coverSrc
slugs = re.findall(r'slug:\s*"([a-z0-9-]+)"', t2)
for slug in set(slugs):
    # if this slug block lacks capas cover, add after finalCtaTitle of that product — hard
    pass

# For products that still use non-capas coverSrc or missing — inject after checkoutUrl line for each slug key
# Simpler approach: for each top-level key "slug": { ensure coverSrc
pattern = re.compile(
    r'("([a-z0-9-]+)": \{\s*\n\s*slug: "\2",.*?)(\n\s*problem:)',
    re.S,
)

def ensure_cover(m: re.Match) -> str:
    block, slug = m.group(1), m.group(2)
    if f'/capas/{slug}.jpg' in block:
        return m.group(0)
    if "coverSrc:" in block:
        block = re.sub(r'coverSrc:\s*"[^"]+"', f'coverSrc: "/capas/{slug}.jpg"', block, count=1)
        return block + m.group(3)
    return block + f'\n    coverSrc: "/capas/{slug}.jpg",' + m.group(3)

t3, n2 = pattern.subn(ensure_cover, t2)
p.write_text(t3, encoding="utf-8")
print(f"mockup->capas replacements: {n}")
print(f"ensure_cover blocks: {n2}")
print(f"capas refs: {t3.count('/capas/')}")
