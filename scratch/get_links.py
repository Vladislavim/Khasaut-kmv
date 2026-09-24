import re
from html.parser import HTMLParser

html_path = r'scratch/tilda-extracted/khasaut-tour.ru/index.html'

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.curr_href = None
        self.curr_text = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attrs_dict = dict(attrs)
            self.curr_href = attrs_dict.get('href', '')
            self.curr_text = []

    def handle_endtag(self, tag):
        if tag == 'a' and self.curr_href is not None:
            text = ' '.join(''.join(self.curr_text).split())
            self.links.append((text, self.curr_href))
            self.curr_href = None

    def handle_data(self, data):
        if self.curr_href is not None:
            self.curr_text.append(data)

extractor = LinkExtractor()
extractor.feed(html)
for text, href in extractor.links:
    print(f"'{text}' -> {href}")
