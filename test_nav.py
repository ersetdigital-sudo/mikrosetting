# Login via fetch
result = js("fetch('/api/admin/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password:'mikrosetting2026'})}).then(r=>r.json())")
print("Login:", result)
wait(2)

# Navigate to admin
goto_url("http://localhost:3000/admin/artikel/baru")
wait(3)
print(page_info())
