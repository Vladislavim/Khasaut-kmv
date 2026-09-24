import os
import ssl
import time
import json
import zipfile
import subprocess
import urllib.request
import urllib.parse

# 1. Configuration
HOST = '31.31.196.164'
FTP_USER = 'u3649764'
FTP_PASS = '6GaPu0j6VS7GvrDi'

ISP_HOST = 'https://server162.hosting.reg.ru:1500'
ISP_USER = 'u3649764'
ISP_PASS = 'dHWHjLXe54457rmu'

DIST_DIR = 'dist'
ZIP_NAME = 'deploy_code.zip'

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def ispmgr(params):
    data = {'authinfo': f'{ISP_USER}:{ISP_PASS}', 'out': 'json'}
    data.update(params)
    req = urllib.request.Request(f'{ISP_HOST}/ispmgr', data=urllib.parse.urlencode(data).encode())
    with urllib.request.urlopen(req, context=ctx) as r:
        return json.loads(r.read().decode('utf-8'))

def step1_create_zip():
    print(f'=== STEP 1: Creating {ZIP_NAME} with UNIX permissions ===')
    file_count = 0
    dir_count = 0
    with zipfile.ZipFile(ZIP_NAME, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for root, dirs, files in os.walk(DIST_DIR):
            for d in dirs:
                full_path = os.path.join(root, d)
                rel_path = os.path.relpath(full_path, DIST_DIR).replace(os.sep, '/') + '/'
                zinfo = zipfile.ZipInfo(rel_path)
                zinfo.external_attr = (0o755 << 16) | 0o040000
                z.writestr(zinfo, '')
                dir_count += 1
            for f in files:
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, DIST_DIR).replace(os.sep, '/')
                # Skip static image assets that already exist on server
                if rel_path.startswith('assets/') and not (rel_path.endswith('.js') or rel_path.endswith('.css')):
                    continue
                zinfo = zipfile.ZipInfo(rel_path)
                zinfo.external_attr = 0o644 << 16
                with open(full_path, 'rb') as fp:
                    z.writestr(zinfo, fp.read())
                file_count += 1
    size_mb = os.path.getsize(ZIP_NAME) / (1024 * 1024)
    print(f'Created {ZIP_NAME}: {file_count} files, {dir_count} dirs, size = {size_mb:.2f} MB')

def step2_upload_ftp():
    print(f'=== STEP 2: Uploading {ZIP_NAME} via FTP ===')
    ftp_url = f'ftp://{FTP_USER}:{FTP_PASS}@{HOST}/www/khasaut-kmv.ru/{ZIP_NAME}'
    cmd = ['curl.exe', '--ftp-pasv', '-T', ZIP_NAME, ftp_url]
    subprocess.run(cmd, check=True)
    print('FTP upload completed successfully.')

def step3_extract_ispmanager():
    print('=== STEP 3: Extracting via ISPmanager API ===')
    res = ispmgr({
        'func': 'file.extract',
        'elid': ZIP_NAME,
        'plid': 'www/khasaut-kmv.ru',
        'dirlist': '2f7777772f6b6861736175742d6b6d762e7275',
        'sok': 'ok'
    })
    print('Extract response:', res.get('doc', {}).get('ok', 'No explicit ok (check errors)'))
    if 'error' in res.get('doc', {}):
        print('Error:', res['doc']['error'])

def step4_cleanup():
    print('=== STEP 4: Cleaning up archive from server ===')
    try:
        res = ispmgr({'func': 'file.delete', 'elid': ZIP_NAME, 'plid': 'www/khasaut-kmv.ru'})
        print(f'Deleted {ZIP_NAME}:', res.get('doc', {}).get('ok') is not None)
    except Exception as e:
        print('Cleanup error:', e)

def step5_verify_live():
    print('=== STEP 5: Verifying Live Production URLs ===')
    time.sleep(2)
    urls = [
        ('https://khasaut-kmv.ru/', [
            '<!doctype html',
            'home-seo-article',
            'home-faq-section',
            'FAQPage',
            'index-Bf0LujbI.css',
            'index-DFuVZkRH.js'
        ]),
        ('https://khasaut-kmv.ru/detail/pereval-vosmerka/', [
            'route-itinerary',
            'аул-призрак Хасаут',
            'TouristTrip',
            '4 000'
        ]),
        ('https://khasaut-kmv.ru/about/', ['О нас', 'Хасаут']),
        ('https://khasaut-kmv.ru/prices/', ['Цены', 'прайс']),
        ('https://khasaut-kmv.ru/excursions/', ['Экскурсии', 'маршрут']),
        ('https://khasaut-kmv.ru/assets/index-Bf0LujbI.css', ['font-family', 'hero']),
        ('https://khasaut-kmv.ru/assets/index-DFuVZkRH.js', ['react']),
        ('https://khasaut-kmv.ru/sitemap.xml', ['<urlset', 'pereval-vosmerka']),
        ('https://khasaut-kmv.ru/robots.txt', ['Sitemap:', 'khasaut-kmv.ru/sitemap.xml'])
    ]

    all_passed = True
    for url, tokens in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Khasaut-Live-Deploy-Verifier/1.0)'})
            with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
                body = r.read().decode('utf-8', errors='replace')
                status = r.status
                missing = [t for t in tokens if t not in body]
                if missing:
                    print(f'[FAIL] {url} (HTTP {status}, {len(body)} bytes) - Missing tokens: {missing}')
                    all_passed = False
                else:
                    print(f'[PASS] {url} (HTTP {status}, {len(body)} bytes) - All tokens verified!')
        except Exception as e:
            print(f'[ERROR] {url}: {e}')
            all_passed = False

    return all_passed

if __name__ == '__main__':
    step1_create_zip()
    step2_upload_ftp()
    step3_extract_ispmanager()
    step4_cleanup()
    success = step5_verify_live()
    print('\nOVERALL DEPLOYMENT RESULT:', 'SUCCESS' if success else 'FAILED')
