# Navigate to admin page after successful login
new_tab("http://localhost:3000/admin/artikel/baru")
wait_for_load()
print(page_info())
