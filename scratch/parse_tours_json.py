import os
import re
import json
from html.parser import HTMLParser

class TildaTourParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.texts = []
        self.images = []
        self.in_script = False
        self.in_style = False
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)
        if tag in ('script', 'style'):
            self.in_script = True
        if tag in ('div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'br', 'tr', 'section'):
            self.texts.append('\n')
        
        # Capture images
        src = attrs_dict.get('src') or attrs_dict.get('data-original') or attrs_dict.get('data-img')
        bg = attrs_dict.get('data-original-bg') or attrs_dict.get('data-bg')
        if src and ('static.tildacdn.com' in src or 'thb.tildacdn.com' in src):
            self.images.append(src)
        if bg and ('static.tildacdn.com' in bg or 'thb.tildacdn.com' in bg):
            self.images.append(bg)

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script = False
        if tag in ('div', 'p', 'h1', 'h2', 'h3', 'h4', 'li', 'tr', 'section'):
            self.texts.append('\n')

    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            d = data.strip()
            if d:
                self.texts.append(d + ' ')

tours_dir = r"scratch/tilda-pages/tours"
extracted_tours = {}

skip_phrases = [
    'function t_', 'var ttt=', 'window.dataLayer', 'display:none',
    'Made on Tilda', 'Email us: Eldar', 't-menu', 't-sociallinks',
    'KHASAUT TOUR', 'Главная', 'О нас', 'Контакты',
    'Как связаться с нами', 'Свяжитесь с нами, все подробно расскажем',
    'Email us:', 'WhatsApp', '+7918-747-72-12', '+79383337750', 'Eldar090807@yandex.ru'
]

for fname in sorted(os.listdir(tours_dir)):
    if not fname.endswith('.html'):
        continue
    tour_key = fname.replace('.html', '')
    fpath = os.path.join(tours_dir, fname)
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    parser = TildaTourParser()
    parser.feed(html)
    raw = ''.join(parser.texts)
    lines = [l.strip() for l in raw.split('\n') if l.strip()]

    # Clean lines
    clean_lines = []
    for l in lines:
        if any(sp in l for sp in skip_phrases):
            continue
        # Avoid pure numbers or punctuation
        if len(l) == 1 and not l.isalnum():
            continue
        clean_lines.append(l)

    # Unique images (clean resize params)
    clean_images = []
    for img in parser.images:
        # Normalize tilda cdn url: strip resize prefixes if present
        # e.g. https://thb.tildacdn.com/tild3866-6530-4863-b833-333239613731/-/resize/504x/rUAAAgAytOA-1920.jpg -> static.tildacdn.com or keep original
        if img not in clean_images and not img.endswith('.ico') and not img.endswith('.svg') and not '_KHASAUT' in img:
            clean_images.append(img)

    extracted_tours[tour_key] = {
        'lines': clean_lines,
        'images': clean_images
    }

out_file = r'scratch/all_tours_extracted.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(extracted_tours, f, ensure_ascii=False, indent=2)

print(f"Successfully extracted {len(extracted_tours)} tours to {out_file}!")
for k, v in extracted_tours.items():
    print(f"  {k}: {len(v['lines'])} lines, {len(v['images'])} images")
    if v['lines']:
        print(f"    Title/Lead: {v['lines'][:2]}")
