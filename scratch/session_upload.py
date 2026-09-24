import urllib.request
import ssl
import urllib.parse
import http.cookiejar

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx), urllib.request.HTTPCookieProcessor(cj))

# 1. Login
login_data = urllib.parse.urlencode({
    'username': 'u3649764',
    'password': 'dHWHjLXe54457rmu',
    'func': 'auth'
}).encode('utf-8')
opener.open('https://server162.hosting.reg.ru:1500/ispmgr', data=login_data)
print('Logged in successfully!')

# 2. Upload
boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
parts = [
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
    '/www/khasaut-kmv.ru',
    f'--{boundary}',
    'Content-Disposition: form-data; name="filename"; filename="deploy_test.txt"',
    'Content-Type: text/plain',
    '',
    'deploy test verified content 998877',
    f'--{boundary}--',
    ''
]
body = '\r\n'.join(parts).encode('utf-8')

req = urllib.request.Request(
    'https://server162.hosting.reg.ru:1500/mancgi/upload',
    data=body,
    headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
)
resp = opener.open(req)
print('Upload status:', resp.status)
print('Upload response:', resp.read().decode('utf-8')[:300])
