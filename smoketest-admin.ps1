[Net.ServicePointManager]::SecurityProtocol = 'Tls12'
$base = 'http://localhost:3100'

# 1. /admin tanpa login -> harus redirect ke login
try {
  $r = Invoke-WebRequest -Uri "$base/admin" -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 0
  Write-Output "1. /admin tanpa login -> status $($r.StatusCode) (HARUSNYA redirect!)"
} catch {
  $resp = $_.Exception.Response
  $loc = $resp.Headers['Location']
  Write-Output "1. /admin tanpa login -> redirect ke: $loc"
}

# 2. login password salah
try {
  Invoke-RestMethod -Method Post -Uri "$base/api/admin/login" -ContentType 'application/json' -Body '{"password":"salah"}' -TimeoutSec 20
  Write-Output "2. login salah -> DITERIMA (BUG!)"
} catch {
  Write-Output "2. login salah -> ditolak $($_.Exception.Response.StatusCode.value__) (OK)"
}

# 3. login benar -> cookie
$login = Invoke-WebRequest -Method Post -Uri "$base/api/admin/login" -ContentType 'application/json' -Body '{"password":"mikrosetting2026"}' -SessionVariable sess -UseBasicParsing -TimeoutSec 20
Write-Output "3. login benar -> status $($login.StatusCode), cookies: $($sess.Cookies.Count)"

# 4. list artikel dengan cookie
$list = Invoke-RestMethod -Uri "$base/api/admin/articles" -WebSession $sess -TimeoutSec 20
Write-Output "4. GET articles -> $($list.articles.Count) artikel"

# 5. buat artikel published uji
$payload = @{
  title = 'Artikel Uji Admin'
  slug = 'artikel-uji-admin'
  meta_description = 'Artikel uji dari halaman admin untuk memastikan alur publish berjalan dengan baik dan benar.'
  category = 'MikroTik'
  excerpt = 'Ringkasan artikel uji.'
  content = '<h2 id="pendahuluan">Pendahuluan</h2><p>Ini konten uji dari admin panel.</p>'
  keywords = @('uji')
  faqs = @(@{ q = 'Apakah ini uji?'; a = 'Ya, ini artikel uji yang dibuat dari halaman admin MikroSetting untuk validasi.' })
  image = '/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png'
  status = 'published'
} | ConvertTo-Json -Depth 5
$created = Invoke-RestMethod -Method Post -Uri "$base/api/admin/articles" -ContentType 'application/json; charset=utf-8' -Body ([System.Text.Encoding]::UTF8.GetBytes($payload)) -WebSession $sess -TimeoutSec 20
Write-Output "5. POST create -> slug=$($created.article.slug) id=$($created.article.id) wc=$($created.article.word_count)"

# 6. cek muncul di blog publik
$blog = Invoke-WebRequest -Uri "$base/blog/artikel?topik=artikel-uji-admin" -UseBasicParsing -TimeoutSec 25
if ($blog.Content.Contains('Artikel Uji Admin') -and $blog.Content.Contains('FAQPage')) {
  Write-Output "6. artikel uji LIVE di blog + FAQPage schema (OK)"
} else {
  Write-Output "6. artikel uji TIDAK muncul (FAIL)"
}

# 7. hapus artikel uji
$del = Invoke-RestMethod -Method Delete -Uri "$base/api/admin/articles/$($created.article.id)" -WebSession $sess -TimeoutSec 20
Write-Output "7. DELETE -> $($del.ok)"

# 8. cek sudah hilang dari blog list
$list2 = Invoke-RestMethod -Uri "$base/api/admin/articles" -WebSession $sess -TimeoutSec 20
Write-Output "8. artikel tersisa: $($list2.articles.Count) (harusnya 7)"
