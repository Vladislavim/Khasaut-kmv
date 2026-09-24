import os
import re
import json

pattern = re.compile(
    r'[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u2139\u25aa-\u25fe]'
)

results = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as file:
                for idx, line in enumerate(file):
                    m = pattern.findall(line)
                    if m:
                        results.append({
                            'file': p.replace('\\', '/'),
                            'line': idx + 1,
                            'emojis': m,
                            'content': line.strip()
                        })

with open('emoji_audit.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, ensure_ascii=False, indent=2)

print(f"Found {len(results)} occurrences. Written to emoji_audit.json")
