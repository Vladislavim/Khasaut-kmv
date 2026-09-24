import json

with open('scratch/all_tours_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for tour_id, tour_data in data.items():
    print(f"\n{'='*20} {tour_id.upper()} ({len(tour_data['lines'])} lines) {'='*20}")
    for idx, l in enumerate(tour_data['lines'][:25]):
        print(f"[{idx}] {l}")
