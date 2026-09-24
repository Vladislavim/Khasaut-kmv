import json

with open('scratch/all_tours_extracted.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('scratch/tours_summary.txt', 'w', encoding='utf-8') as out:
    for tour_id, tour_data in data.items():
        out.write(f"\n{'='*30} {tour_id.upper()} ({len(tour_data['lines'])} lines) {'='*30}\n")
        for idx, l in enumerate(tour_data['lines']):
            out.write(f"[{idx}] {l}\n")

print("Dumped to scratch/tours_summary.txt")
