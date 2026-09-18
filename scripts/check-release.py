from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re

root = Path('dist')
issues = []
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.h1=0; self.canonical=[]; self.schemas=[]; self.in_schema=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='script' and a.get('type')=='application/ld+json': self.in_schema=True
        for k in ('src','href'):
            if a.get(k): self.links.append(a[k])
    def handle_data(self,data):
        if self.in_schema: self.schemas.append(json.loads(data))
    def handle_endtag(self,tag):
        if tag=='script': self.in_schema=False

pages=list(root.rglob('*.html'))
for file in pages:
    source=file.read_text(encoding='utf-8'); page=Page(); page.feed(source)
    if page.h1!=1: issues.append(f'{file}: {page.h1} H1s')
    if len(page.canonical)!=1 or not page.canonical[0].startswith('https://khasaut-kmv.ru/'): issues.append(f'{file}: canonical')
    if not page.schemas: issues.append(f'{file}: no structured data')
    if len(re.findall(r'<meta name="description"',source))!=1: issues.append(f'{file}: description')
    if 'agentation' in source or '/src/' in source: issues.append(f'{file}: development content')
    for link in page.links:
        url=urlsplit(link)
        if url.scheme or url.netloc or not url.path: continue
        path=root / unquote(url.path).lstrip('/') if url.path.startswith('/') else file.parent / unquote(url.path)
        if path.is_dir(): path=path/'index.html'
        if not path.exists(): issues.append(f'{file}: missing {link}')
expected={'dzhily-su-bermamyt':'Джилы-Суу + Бермамыт','bermamyt':'Плато Бермамыт','dombay':'Домбай','arkhyz':'Архыз','elbrus':'Эльбрус с Терскола','balkaria':'Верхняя Балкария','ossetia':'Северная Осетия'}
for slug,title in expected.items():
    html=(root/'detail'/slug/'index.html').read_text(encoding='utf-8')
    if title not in re.search(r'<h1[^>]*>(.*?)</h1>',html,re.S).group(1): issues.append(f'{slug}: incorrect route title')
for file in (root/'assets').glob('*.css'):
    for link in re.findall(r'url\([\"\']?([^\)\"\']+)',file.read_text(encoding='utf-8')):
        if link.startswith('/') and not (root/link.lstrip('/')).exists(): issues.append(f'Missing CSS asset {link}')
report={'html_pages':len(pages),'issues':sorted(set(issues)),'checks':['H1','canonical','description','structured data','local links and images','CSS assets','route title mapping']}
Path('artifacts/seo-research/release-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(bool(issues))
