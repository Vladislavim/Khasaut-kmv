import os
import re
from html.parser import HTMLParser

class TildaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.texts = []
        self.in_script = False
        self.in_style = False
        self.current_attrs = {}

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.in_script = True
        self.current_attrs = dict(attrs)
        if tag in ('div', 'p', 'h1', 'h2', 'h3', 'h4', 'li', 'br', 'tr', 'section'):
            self.texts.append('\n')

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

pages = {
    'index': r'scratch/tilda-extracted/khasaut-tour.ru/index.html',
    'transfer': r'scratch/tilda-pages/transfer.html',
    'excursions_jeep': r'scratch/tilda-pages/excursions_jeep.html',
    'unusual_routes': r'scratch/tilda-pages/unusual_routes.html',
    'horse_rides': r'scratch/tilda-pages/horse_rides.html',
    'thermal_springs': r'scratch/tilda-pages/thermal_springs.html',
}

out_md = []

for page_name, fpath in pages.items():
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    parser = TildaParser()
    parser.feed(html)
    raw = ''.join(parser.texts)
    lines = [l.strip() for l in raw.split('\n') if l.strip()]
    
    # Filter out common menu/footer repetitive lines
    filtered = []
    skip = False
    for l in lines:
        if any(skip_word in l for skip_word in [
            'function t_', 'var ttt=', 'window.dataLayer', 'display:none',
            'Made on Tilda', 'Email us: Eldar', 't-menu', 't-sociallinks'
        ]):
            continue
        filtered.append(l)

    out_md.append(f"# PAGE: {page_name}\n")
    for line in filtered:
        out_md.append(line)
    out_md.append("\n" + "="*50 + "\n")

out_file = r'scratch/all_parsed_tilda_content.txt'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_md))

print(f"Saved complete parsed content to {out_file}")
