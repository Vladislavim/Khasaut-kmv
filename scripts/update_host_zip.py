import os
import zipfile
import sys

def package_dist_to_zip(dist_dir, zip_path):
    print(f"Packaging {dist_dir} into {zip_path}...")
    temp_zip = zip_path + ".tmp"
    
    count = 0
    total_size = 0
    with zipfile.ZipFile(temp_zip, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                full_path = os.path.join(root, file)
                # Compute relative path inside the zip
                rel_path = os.path.relpath(full_path, dist_dir).replace('\\', '/')
                zf.write(full_path, arcname=rel_path)
                count += 1
                total_size += os.path.getsize(full_path)
    
    # Replace destination zip safely
    if os.path.exists(zip_path):
        os.remove(zip_path)
    os.rename(temp_zip, zip_path)
    
    final_zip_size = os.path.getsize(zip_path)
    print(f"Successfully packaged {count} files ({total_size / (1024*1024):.2f} MB uncompressed) into {zip_path} ({final_zip_size / (1024*1024):.2f} MB)")

if __name__ == '__main__':
    dist_directory = os.path.abspath('dist')
    target_zip = os.path.abspath(r'..\filemgr.122OZl.2026-09-23_10_56_38.zip')
    package_dist_to_zip(dist_directory, target_zip)
