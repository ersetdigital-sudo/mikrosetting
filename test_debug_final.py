# Clear editor fresh
js("document.querySelector('[contenteditable]').innerHTML = ''")
js("document.querySelector('[contenteditable]').focus()")
wait(0.5)

# Type a longer paragraph simulating real user
text = "Ini adalah paragraf pertama yang saya ketik di editor. Saya ingin melihat apakah teksnya muncul secara visual atau tidak."
cdp("Input.insertText", text=text)
wait(1)

# Check debug
debug = js("(() => { const d = document.querySelector('.bg-yellow-100'); return d ? d.textContent : 'none'; })()")
print("After paragraph 1:", debug[:300])

# Now type more - second paragraph via Enter + text
cdp("Input.dispatchKeyEvent", type="keyDown", key="Enter", code="Enter", windowsVirtualKeyCode=13)
wait(0.2)
cdp("Input.dispatchKeyEvent", type="keyUp", key="Enter", code="Enter", windowsVirtualKeyCode=13)
wait(0.2)

text2 = "Ini paragraf kedua setelah enter. Apakah teks tetap terlihat?"
cdp("Input.insertText", text=text2)
wait(1)

# Check debug again
debug2 = js("(() => { const d = document.querySelector('.bg-yellow-100'); return d ? d.textContent : 'none'; })()")
print("After paragraph 2:", debug2[:300])

# Final DOM check
dom_text = js("document.querySelector('[contenteditable]').textContent")
print("Full DOM text:", dom_text[:500] if dom_text else "empty")

dom_html = js("document.querySelector('[contenteditable]').innerHTML")
print("Full DOM html:", dom_html[:500] if dom_html else "empty")
