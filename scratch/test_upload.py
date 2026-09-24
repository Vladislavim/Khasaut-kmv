import urllib.request
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
lines = [
    f'--{boundary}',
    'Content-Disposition: form-data; name="func"',
    '',
    'file.upload',
    f'--{boundary}',
    'Content-Disposition: form-data; name="sok"',
    '',
    'ok',
    f'--{boundary}',
    'Content-Disposition: form-data; name="type"',
    '',
    'data',
    f'--{boundary}',
    'Content-Disposition: form-data; name="plid"',
    '',
    'www/khasaut-kmv.ru',
    f'--{boundary}',
    'Content-Disposition: form-data; name="filename"; filename="deploy_test.txt"',
    'Content-Type: text/plain',
    '',
    'deploy test verified content 998877',
    f'--{boundary}--',
    ''
]
body = '\r\n'.join(lines).encode('utf-8')

url = 'https://server162.hosting.reg.ru:1500/mancgi/upload?authinfo=u3649764:dHWHjLXe54457rmu&out=json'
req = urllib.request.Request(
    url,
    data=body,
    headers={
        'Content-Type': f'multipart/form-data; boundary={boundary}',
    },
    method='POST'
)

try:
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        print('Upload response:', resp.read().decode('utf-8'))
except Exception as e:
    print('Upload error:', e)
