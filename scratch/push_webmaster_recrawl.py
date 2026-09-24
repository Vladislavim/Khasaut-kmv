import urllib.request
import json
import ssl

token = "y0__wgBEPC2i5YCGIGzSiCpmMySGTDUlbP4CDT-WVvs49xEaSykOMx2eNY3EqjK"
user_id = "583195504"
host_id = "https:khasaut-kmv.ru:443"

# Check quota first
quota_url = f"https://api.webmaster.yandex.net/v4/user/{user_id}/hosts/{host_id}/recrawl/quota"
req = urllib.request.Request(quota_url, headers={"Authorization": f"OAuth {token}"})
ctx = ssl.create_default_context()

try:
    with urllib.request.urlopen(req, context=ctx) as response:
        quota_data = json.loads(response.read().decode('utf-8'))
        print("Recrawl quota:", quota_data)
except Exception as e:
    print("Error getting quota:", e)

# Push top growth point pages to recrawl queue
urls_to_recrawl = [
    "https://khasaut-kmv.ru/",
    "https://khasaut-kmv.ru/detail/pereval-vosmerka/",
    "https://khasaut-kmv.ru/detail/dzhily-su/",
    "https://khasaut-kmv.ru/detail/bermamyt/",
    "https://khasaut-kmv.ru/prices/",
    "https://khasaut-kmv.ru/excursions/"
]

queue_url = f"https://api.webmaster.yandex.net/v4/user/{user_id}/hosts/{host_id}/recrawl/queue"
for u in urls_to_recrawl:
    data = json.dumps({"url": u}).encode('utf-8')
    post_req = urllib.request.Request(
        queue_url,
        data=data,
        headers={
            "Authorization": f"OAuth {token}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(post_req, context=ctx) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            print(f"Queued {u}: task_id = {res.get('task_id')}")
    except urllib.error.HTTPError as he:
        print(f"HTTPError for {u}: {he.code} - {he.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error queuing {u}: {e}")
