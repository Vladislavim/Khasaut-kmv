import os
import sys
import zipfile
import subprocess
import urllib.request
import urllib.parse
import ssl
import json
import time

HOST = '31.31.196.164'
FTP_USER = 'u3649764'
FTP_PASS = '6GaPu0j6VS7GvrDi'

ISP_HOST = 'https://server162.hosting.reg.ru:1500'
ISP_USER = 'u3649764'
ISP_PASS = 'dHWHjLXe54457rmu'

REMOTE_DIR = 'www/khasaut-kmv.ru'
LOCAL_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
ZIP_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist-deploy.zip'))

def ispmgr_call(func, params=None):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    data_dict = {
        'authinfo': f'{ISP_USER}:{ISP_PASS}',
        'out': 'json',
        'func': func,
    }
    if params:
        data_dict.update(params)

    url = f'{ISP_HOST}/ispmgr'
    req = urllib.request.Request(url, data=urllib.parse.urlencode(data_dict).encode())
    with urllib.request.urlopen(req, context=ctx) as response:
        return json.loads(response.read().decode('utf-8'))

def make_zip():
    print(f'Creating zip from {LOCAL_DIST} with explicit Unix permissions (0644/0755)...')
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
        
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(LOCAL_DIST):
            for dir_name in dirs:
                abs_dir = os.path.join(root, dir_name)
                rel_dir = os.path.relpath(abs_dir, LOCAL_DIST).replace('\\', '/') + '/'
                zinfo = zipfile.ZipInfo(rel_dir)
                zinfo.external_attr = (0o755 << 16) | 0o040000
                zipf.writestr(zinfo, '')
                
            for file in files:
                abs_file = os.path.join(root, file)
                rel_path = os.path.relpath(abs_file, LOCAL_DIST).replace('\\', '/')
                with open(abs_file, 'rb') as f:
                    content = f.read()
                zinfo = zipfile.ZipInfo(rel_path)
                zinfo.external_attr = (0o644 << 16)
                zinfo.compress_type = zipfile.ZIP_DEFLATED
                zipf.writestr(zinfo, content)
                
    size_mb = os.path.getsize(ZIP_PATH) / (1024 * 1024)
    print(f'Created {ZIP_PATH}, size: {size_mb:.2f} MB')

def upload_zip():
    print(f'Uploading {ZIP_PATH} via curl FTP to {REMOTE_DIR}/dist-deploy.zip...')
    ftp_url = f'ftp://{FTP_USER}:{FTP_PASS}@{HOST}/{REMOTE_DIR}/dist-deploy.zip'
    res = subprocess.run(['curl.exe', '--ftp-pasv', '--retry', '3', '-T', ZIP_PATH, ftp_url], capture_output=True)
    if res.returncode != 0:
        print(f'Upload failed: {res.stderr.decode("utf-8", errors="ignore")}')
        sys.exit(1)
    print('Upload completed successfully!')

def extract_zip():
    print('Extracting dist-deploy.zip in ISPmanager to docroot...')
    target_hex = '2f7777772f6b6861736175742d6b6d762e7275'
    res = ispmgr_call('file.extract', {
        'elid': 'dist-deploy.zip',
        'plid': REMOTE_DIR,
        'dirlist': target_hex,
        'sok': 'ok',
    })
    doc = res.get('doc', {})
    if 'error' in doc:
        print('Extraction error:', json.dumps(doc['error'], ensure_ascii=False))
        sys.exit(1)
    print('Extract succeeded without errors!')

def cleanup_remote():
    print('Cleaning up remote zip and test files...')
    junk_files = [
        'dist-deploy.zip', 'test_extract.zip', 'test_live_verify.txt', 
        'test.zip', 'test-extract.txt', 'test_php.php', 'test-upload.json',
        'deploy_test.txt'
    ]
    for fname in junk_files:
        try:
            ispmgr_call('file.delete', {
                'elid': fname,
                'plid': REMOTE_DIR,
            })
        except Exception:
            pass
            
    # Also cleanup accidental subdirectories in docroot if any
    for sub in ['www', 'dist']:
        try:
            ispmgr_call('file.delete', {
                'elid': sub,
                'plid': REMOTE_DIR,
            })
        except Exception:
            pass
    print('Cleanup complete.')

def verify_live():
    print('Verifying live site https://khasaut-kmv.ru...')
    time.sleep(2)
    res = subprocess.run(['curl.exe', '-sI', 'https://khasaut-kmv.ru/'], capture_output=True)
    headers = res.stdout.decode('utf-8', errors='ignore')
    print('HTTP Headers:')
    for line in headers.splitlines()[:5]:
        print(' ', line)

    # 1. Check Homepage
    res_home = subprocess.run(['curl.exe', '-s', 'https://khasaut-kmv.ru/'], capture_output=True)
    home_body = res_home.stdout.decode('utf-8', errors='ignore')
    has_seo = 'home-seo-article' in home_body
    has_faq = 'home-faq-section' in home_body
    has_faq_schema = 'FAQPage' in home_body
    has_hero = 'hero-section' in home_body
    print(f'Homepage (size: {len(home_body)} bytes):')
    print(f'  Contains Home SEO Article: {has_seo}')
    print(f'  Contains Home FAQ Section: {has_faq}')
    print(f'  Contains FAQPage Schema.org: {has_faq_schema}')
    print(f'  Contains Hero Section in static root: {has_hero}')

    # 2. Check Pereval Vosmerka
    res_vosm = subprocess.run(['curl.exe', '-s', 'https://khasaut-kmv.ru/detail/pereval-vosmerka/'], capture_output=True)
    vosm_body = res_vosm.stdout.decode('utf-8', errors='ignore')
    has_itin = 'route-itinerary' in vosm_body
    has_ghost = 'аул-призрак Хасаут' in vosm_body
    has_trip_schema = 'TouristTrip' in vosm_body
    print(f'Pereval Vosmerka (size: {len(vosm_body)} bytes):')
    print(f'  Contains Itinerary Timeline: {has_itin}')
    print(f'  Contains Ghost Village Khasaut: {has_ghost}')
    print(f'  Contains TouristTrip Schema.org: {has_trip_schema}')

    # 3. Check Robots.txt
    res_robots = subprocess.run(['curl.exe', '-s', 'https://khasaut-kmv.ru/robots.txt'], capture_output=True)
    print(f'Robots.txt verified: {"https://khasaut-kmv.ru/sitemap.xml" in res_robots.stdout.decode("utf-8", errors="ignore")}')

def main():
    if not os.path.exists(os.path.join(LOCAL_DIST, 'index.html')):
        print('Error: dist/index.html not found. Run npm run build first.')
        sys.exit(1)

    make_zip()
    upload_zip()
    extract_zip()
    cleanup_remote()

    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)

    verify_live()
    print('Deployment & verification complete!')

if __name__ == '__main__':
    main()
