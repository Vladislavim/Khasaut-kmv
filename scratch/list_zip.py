import zipfile
import os

zip_path = os.path.abspath(r'..\web2.zip_khasaut_tour_ru.zip')
print('Looking for:', zip_path)
if os.path.exists(zip_path):
    with zipfile.ZipFile(zip_path, 'r') as z:
        htmls = [f for f in z.namelist() if f.endswith(('.html', '.htm', '.json', '.txt'))]
        print(f"Total matching files: {len(htmls)}")
        for h in htmls:
            print(h)
else:
    print("Zip file does not exist!")
