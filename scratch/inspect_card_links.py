import re
import os
from html.parser import HTMLParser

class CardLinkInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            d = dict(attrs)
            href = d.get('href', '')
            self.cards.append(href)

for fname in os.listdir(r'scratch/tilda-pages'):
    if not fname.endswith('.html'):
        continue
    fpath = os.path.join(r'scratch/tilda-pages', fname)
    insp = CardLinkInspector()
    with open(fpath, 'r', encoding='utf-8') as f:
        insp.feed(f.read())
    pages = [h for h in insp.cards if '/page' in h]
    print(f"=== {fname} ({len(pages)} subpages) ===")
    for p in pages:
        print("  ", p)
