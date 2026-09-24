import urllib.request
import urllib.parse
import ssl
import json
import zipfile
import subprocess
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HOST = '31.31.196.164'
FTP_USER = 'u3649764'
FTP_PASS = '6GaPu0j6VS7GvrDi'

ISP_HOST = 'https://server162.hosting.reg.ru:1500'
ISP_USER = 'u3649764'
ISP_PASS = 'dHWHjLXe54457rmu'

# 1. Create a zip with explicit unix permissions (0644)
zinfo = zipfile.ZipInfo('test_live_verify.txt')
zinfo.external_attr = 0o644 << 16
with zipfile.ZipFile('test_extract.zip', 'w') as z:
    z.writestr(zinfo, 'LIVE_OK_PERMISSIONS_VERIFIED\n')

# 2. Upload test_extract.zip to www/khasaut-kmv.ru/test_extract.zip
ftp_url = f'ftp://{FTP_USER}:{FTP_PASS}@{HOST}/www/khasaut-kmv.ru/test_extract.zip'
subprocess.run(['curl.exe', '--ftp-pasv', '-T', 'test_extract.zip', ftp_url], check=True)

def ispmgr(params):
    data = {'authinfo': f'{ISP_USER}:{ISP_PASS}', 'out': 'json'}
    data.update(params)
    req = urllib.request.Request(f'{ISP_HOST}/ispmgr', data=urllib.parse.urlencode(data).encode())
    with urllib.request.urlopen(req, context=ctx) as r:
        return json.loads(r.read().decode('utf-8'))

# Extract into www/khasaut-kmv.ru
res = ispmgr({
    'func': 'file.extract',
    'elid': 'test_extract.zip',
    'plid': 'www/khasaut-kmv.ru',
    'dirlist': '2f7777772f6b6861736175742d6b6d762e7275',
    'sok': 'ok'
})

time.sleep(1)
try:
    with urllib.request.urlopen('https://khasaut-kmv.ru/test_live_verify.txt', timeout=5) as resp:
        print('SUCCESS! Response from live site:', resp.read().decode('utf-8'))
except Exception as e:
    print('Failed:', e)
