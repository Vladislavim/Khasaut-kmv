import zipfile
import os
from collections import Counter

zip_path = os.path.abspath(r'..\web2.zip_khasaut_tour_ru.zip')
with zipfile.ZipFile(zip_path, 'r') as z:
    exts = Counter(os.path.splitext(f)[1].lower() for f in z.namelist())
    print("Extensions in zip:", exts)
    js_files = [f for f in z.namelist() if f.endswith('.js')]
    print("JS files count:", len(js_files))
    for j in js_files[:15]:
        print("  ", j)
