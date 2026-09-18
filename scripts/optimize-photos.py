"""Create compressed photo derivatives; retain all source originals."""
from pathlib import Path
import re
import json
from PIL import Image

report = []
for module in [Path('src/data/innerWebAssets.ts'), Path('src/data/innerAssets.ts'), Path('src/data/assets.ts')]:
    text = module.read_text(encoding='utf-8')
    for relative in re.findall(r"from '([^']+\.(?:jpg|jpeg|png))'", text):
        source = (module.parent / relative).resolve()
        is_photo = source.suffix.lower() in ('.jpg', '.jpeg') or 'inner-web' in relative or 'hero-background-caucasus' in relative
        if not is_photo or not source.exists():
            continue
        target = source.with_name(source.stem + '-optimized.webp')
        with Image.open(source) as photo:
            photo.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            photo.save(target, 'WEBP', quality=88, method=6)
        if target.stat().st_size < source.stat().st_size:
            text = text.replace(relative, str(Path(relative).with_name(target.name)).replace('\\', '/'))
            report.append({'source': source.name, 'before': source.stat().st_size, 'after': target.stat().st_size})
    module.write_text(text, encoding='utf-8')
Path('artifacts/seo-research/photo-optimization.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(f'{len(report)} photos: {sum(i["before"] for i in report):,} -> {sum(i["after"] for i in report):,} bytes')
