const token = 'y0__wgBEPC2i5YCGIGzSiCpmMySGTDUlbP4CDT-WVvs49xEaSykOMx2eNY3EqjK';
const hostId = 'https:khasaut-kmv.ru:443';
const userId = '583195504';

async function check() {
  const headers = { 'Authorization': 'OAuth ' + token };
  
  const endpoints = [
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/messages`,
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/notifications`,
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/problems`,
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/important-urls`,
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/summary`,
    `https://api.webmaster.yandex.net/v4/user/${userId}/hosts/${hostId}/diagnostics`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { headers });
      console.log(`=== ${url} (${res.status}) ===`);
      const text = await res.text();
      console.log(text.slice(0, 1500));
    } catch (e) {
      console.error(e);
    }
  }
}

check();
