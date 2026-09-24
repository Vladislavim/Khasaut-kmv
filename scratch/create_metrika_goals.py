import urllib.request
import json

token = 'y0__wgBEPC2i5YCGIGzSiCpmMySGTDUlbP4CDT-WVvs49xEaSykOMx2eNY3EqjK'
counter_id = '112941764'
url = f'https://api-metrika.yandex.net/management/v1/counter/{counter_id}/goals'

goals_to_create = [
    {
        "name": "Клик: WhatsApp (заявка/чат)",
        "type": "action",
        "conditions": [{"type": "exact", "url": "whatsapp_click"}]
    },
    {
        "name": "Клик: Telegram (заявка/чат)",
        "type": "action",
        "conditions": [{"type": "exact", "url": "telegram_click"}]
    },
    {
        "name": "Клик: Звонок по телефону",
        "type": "action",
        "conditions": [{"type": "exact", "url": "phone_click"}]
    },
    {
        "name": "Клик: Кнопка бронирования тура",
        "type": "action",
        "conditions": [{"type": "exact", "url": "booking_click"}]
    },
    {
        "name": "Калькулятор: отправка расчета",
        "type": "action",
        "conditions": [{"type": "exact", "url": "calc_submit"}]
    },
    {
        "name": "Скачивание: Прайс-лист PDF",
        "type": "action",
        "conditions": [{"type": "exact", "url": "price_pdf_download"}]
    },
    {
        "name": "Посещение: Страница контактов",
        "type": "url",
        "conditions": [{"type": "contain", "url": "/contact"}]
    },
    {
        "name": "Вовлеченность: 3+ страницы",
        "type": "number",
        "conditions": [{"type": "exact", "url": "3"}]
    }
]

created = []
for g in goals_to_create:
    payload = json.dumps({"goal": g}).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            'Authorization': f'OAuth {token}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            goal_res = data.get('goal', {})
            print(f"CREATED GOAL: {goal_res.get('id')} - {goal_res.get('name')}")
            created.append(goal_res)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        print(f"HTTP ERROR for {g['name']}: {e.code} - {err_body}")
    except Exception as e:
        print(f"ERROR for {g['name']}: {e}")

print(f"\nTotal created goals: {len(created)}")
