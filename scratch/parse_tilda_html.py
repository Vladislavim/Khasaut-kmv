import re
from html.parser import HTMLParser

html_path = r'scratch/tilda-extracted/khasaut-tour.ru/index.html'

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's extract all t-card, t-cell, field, title, descr elements or text blocks
# Or clean html tags
class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.current_tag = None
        self.in_script = False
        self.in_style = False

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag in ('script', 'style'):
            self.in_script = True
        if tag in ('div', 'p', 'h1', 'h2', 'h3', 'h4', 'li', 'br', 'tr'):
            self.result.append('\n')

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script = False
        if tag in ('div', 'p', 'h1', 'h2', 'h3', 'h4', 'li', 'tr'):
            self.result.append('\n')

    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            text = data.strip()
            if text:
                self.result.append(text + ' ')

parser = TextExtractor()
parser.feed(html)
all_text = ''.join(parser.result)

# Clean up multiple newlines
lines = [l.strip() for l in all_text.split('\n') if l.strip()]
output_path = r'scratch/extracted_text.txt'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Extracted {len(lines)} lines of text to {output_path}")
for l in lines[:50]:
    print(l)
