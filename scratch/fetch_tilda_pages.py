import urllib.request
import os
import re

pages = [
    ("transfer", "https://khasaut-tour.ru/page128192986.html"),
    ("excursions_jeep", "https://khasaut-tour.ru/page128172616.html"),
    ("unusual_routes", "https://khasaut-tour.ru/page128355436.html"),
    ("horse_rides", "https://khasaut-tour.ru/page128386636.html"),
    ("thermal_springs", "https://khasaut-tour.ru/page128359026.html"),
]

out_dir = r"scratch/tilda-pages"
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for name, url in pages:
    print(f"Fetching {name} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            fpath = os.path.join(out_dir, f"{name}.html")
            with open(fpath, "w", encoding="utf-8") as out:
                out.write(content)
            print(f"  Saved {len(content)} bytes to {fpath}")
    except Exception as e:
        print(f"  Error fetching {url}: {e}")

print("Done fetching!")
