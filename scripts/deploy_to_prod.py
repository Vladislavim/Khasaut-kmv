import os
import ssl
import time
import json
import re
import gzip
import urllib.request
import urllib.parse
from ftplib import FTP, error_perm

# 1. Configuration
HOST = '31.31.196.164'
FTP_USER = 'u3649764'
FTP_PASS = '6GaPu0j6VS7GvrDi'

ISP_HOST = 'https://server162.hosting.reg.ru:1500'
ISP_USER = 'u3649764'
ISP_PASS = 'dHWHjLXe54457rmu'

DIST_DIR = 'dist'
REMOTE_DOCROOT = '/www/khasaut-kmv.ru'

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def ispmgr(params):
    data = {'authinfo': f'{ISP_USER}:{ISP_PASS}', 'out': 'json'}
    data.update(params)
    req = urllib.request.Request(f'{ISP_HOST}/ispmgr', data=urllib.parse.urlencode(data).encode())
    with urllib.request.urlopen(req, context=ctx) as r:
        return json.loads(r.read().decode('utf-8'))

def ensure_remote_dir(ftp, remote_dir):
    parts = remote_dir.strip('/').split('/')
    current = ''
    for part in parts:
        current += '/' + part
        try:
            ftp.cwd(current)
        except error_perm:
            try:
                ftp.mkd(current)
                ftp.cwd(current)
            except error_perm:
                pass

def deploy_files():
    print('=== STEP 1: Scanning files to deploy ===')
    files_to_upload = []
    total_bytes = 0

    for root, dirs, files in os.walk(DIST_DIR):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, DIST_DIR).replace(os.sep, '/')
            # Skip unchanged static image assets that already live on the server
            if rel_path.startswith('assets/') and not (rel_path.endswith('.js') or rel_path.endswith('.css')):
                continue
            fsize = os.path.getsize(full_path)
            files_to_upload.append((full_path, rel_path, fsize))
            total_bytes += fsize

    print(f'Ready to deploy {len(files_to_upload)} files ({total_bytes / (1024 * 1024):.2f} MB) to {REMOTE_DOCROOT}')

    print('=== STEP 2: Connecting to FTP ===')
    ftp = FTP(HOST, timeout=90)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)

    print('=== STEP 3: Uploading files via FTP ===')
    created_dirs = set()
    for idx, (full_path, rel_path, fsize) in enumerate(files_to_upload, 1):
        remote_file = f'{REMOTE_DOCROOT}/{rel_path}'
        remote_dir = os.path.dirname(remote_file)

        if remote_dir not in created_dirs:
            ensure_remote_dir(ftp, remote_dir)
            created_dirs.add(remote_dir)

        print(f'[{idx:02d}/{len(files_to_upload):02d}] Uploading {rel_path} ({fsize} B)...')
        with open(full_path, 'rb') as fp:
            ftp.storbinary(f'STOR {remote_file}', fp, blocksize=65536)

    ftp.quit()
    print('All files uploaded successfully!')

def cleanup_server():
    print('=== STEP 4: Cleaning up temp / junk files ===')
    junk = [
        'test_extract.zip', 'test_extract_ok.txt', 'test_extract2.zip',
        'test_idx.zip', 'deploy_code.zip', 'deploy_test_sync.zip',
        'khasaut-build-prod.zip'
    ]
    for j in junk:
        try:
            ispmgr({'func': 'file.delete', 'elid': j, 'plid': 'www/khasaut-kmv.ru'})
        except Exception:
            pass
    print('Cleanup complete.')

def fetch_content(url):
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Khasaut-Live-Deploy-Verifier/1.0)',
            'Accept-Encoding': 'gzip, deflate, identity'
        }
    )
    with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
        raw = r.read()
        status = r.status
        is_gzip = r.headers.get('Content-Encoding') == 'gzip' or (len(raw) >= 2 and raw[:2] == b'\x1f\x8b')
        if is_gzip:
            body = gzip.decompress(raw).decode('utf-8', errors='replace')
        else:
            body = raw.decode('utf-8', errors='replace')
        return status, body

def verify_live():
    print('=== STEP 5: Verifying Live Production URLs ===')
    time.sleep(2)

    with open('dist/index.html', 'r', encoding='utf-8') as f:
        idx_html = f.read()
    css_match = re.search(r'assets/(index-[^"]+\.css)', idx_html)
    js_match = re.search(r'assets/(index-[^"]+\.js)', idx_html)
    current_css = css_match.group(1) if css_match else 'index-'
    current_js = js_match.group(1) if js_match else 'index-'

    urls = [
        ('https://khasaut-kmv.ru/', [
            '<!doctype html',
            'home-seo-article',
            'home-faq-section',
            'FAQPage',
            'SiteNavigationElement',
            'AggregateRating',
            '4.98',
            '1040',
            current_css,
            current_js
        ]),
        ('https://khasaut-kmv.ru/detail/pereval-vosmerka/', [
            'route-itinerary',
            'аул-призрак Хасаут',
            'TouristTrip',
            'Product',
            'AggregateRating',
            '4 000'
        ]),
        ('https://khasaut-kmv.ru/about/', [
            'inner-about-story-zigzag',
            'Наша история',
            'Хасаут',
            current_css
        ]),
        ('https://khasaut-kmv.ru/prices/', ['Цены', 'прайс', current_css]),
        ('https://khasaut-kmv.ru/excursions/', ['Экскурсии', 'маршрут', current_css]),
        (f'https://khasaut-kmv.ru/assets/{current_css}', ['font-family', 'hero']),
        (f'https://khasaut-kmv.ru/assets/{current_js}', ['react']),
        ('https://khasaut-kmv.ru/feed.yml', ['yml_catalog', 'Хасаут']),
        ('https://khasaut-kmv.ru/sitemap.xml', ['<urlset', 'pereval-vosmerka']),
        ('https://khasaut-kmv.ru/robots.txt', ['Sitemap:', 'khasaut-kmv.ru/sitemap.xml'])
    ]

    all_passed = True
    for url, tokens in urls:
        try:
            status, body = fetch_content(url)
            missing = [t for t in tokens if t not in body]
            if missing:
                print(f'[FAIL] {url} (HTTP {status}, {len(body)} chars) - Missing tokens: {missing}')
                all_passed = False
            else:
                print(f'[PASS] {url} (HTTP {status}, {len(body)} chars) - All tokens verified!')
        except Exception as e:
            print(f'[ERROR] {url}: {e}')
            all_passed = False

    return all_passed

if __name__ == '__main__':
    deploy_files()
    cleanup_server()
    success = verify_live()
    print('\nOVERALL DEPLOYMENT RESULT:', 'SUCCESS' if success else 'FAILED')
