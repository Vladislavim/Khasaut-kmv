import subprocess

with open('test_php.php', 'w') as f:
    f.write('<?php echo "PHP_WORKS_" . PHP_VERSION; ?>')

subprocess.run(['curl.exe', '--ftp-pasv', '-T', 'test_php.php', 'ftp://u3649764:6GaPu0j6VS7GvrDi@31.31.196.164/www/khasaut-kmv.ru/test_php.php'], capture_output=True)

res = subprocess.run(['curl.exe', '-s', 'https://khasaut-kmv.ru/test_php.php'], capture_output=True)
print('HTTP response:', res.stdout.decode('utf-8', errors='ignore'))
