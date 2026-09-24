import urllib.request
import os
import re
import json
import time

all_page_urls = [
    # Excursions / Jeep tours
    ("dzhily_su", "https://khasaut-tour.ru/page128389916.html"),
    ("dzhily_su_bermamyt", "https://khasaut-tour.ru/page145494976.html"),
    ("bermamyt", "https://khasaut-tour.ru/page128418576.html"),
    ("dombay", "https://khasaut-tour.ru/page128703716.html"),
    ("arkhyz", "https://khasaut-tour.ru/page128736336.html"),
    ("elbrus_terskol", "https://khasaut-tour.ru/page128779406.html"),
    ("aktoprak", "https://khasaut-tour.ru/page128782856.html"),
    ("verhnyaya_balkariya", "https://khasaut-tour.ru/page129003296.html"),
    ("severnaya_osetiya", "https://khasaut-tour.ru/page129008016.html"),
    ("ingushetiya", "https://khasaut-tour.ru/page129013416.html"),
    ("grozny", "https://khasaut-tour.ru/page129016296.html"),
    ("medovye_vodopady", "https://khasaut-tour.ru/page129028116.html"),
    ("dolina_narzanov", "https://khasaut-tour.ru/page129025176.html"),

    # Unusual routes
    ("khurla_kel", "https://khasaut-tour.ru/page148224266.html"),
    ("khudessky_labirint", "https://khasaut-tour.ru/page148225966.html"),
    ("mukhinskoe_uschelye", "https://khasaut-tour.ru/page148227216.html"),

    # Thermal springs
    ("suvorovskie", "https://khasaut-tour.ru/page128376976.html"),
    ("zhemchuzhina_kavkaza", "https://khasaut-tour.ru/page128380866.html"),
    ("geduko", "https://khasaut-tour.ru/page128381376.html"),
    ("aushiger", "https://khasaut-tour.ru/page128381666.html"),
]

out_dir = r"scratch/tilda-pages/tours"
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for name, url in all_page_urls:
    target_path = os.path.join(out_dir, f"{name}.html")
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000:
        print(f"Skipping {name}, already downloaded")
        continue
    print(f"Downloading {name} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            with open(target_path, "w", encoding="utf-8") as out:
                out.write(content)
            print(f"  Saved {len(content)} bytes")
        time.sleep(0.3)
    except Exception as e:
        print(f"  Error {name}: {e}")

print("Done downloading all tours!")
