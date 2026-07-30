import asyncio
import os
os.environ["BU_CDP_URL"] = "http://127.0.0.1:9222"

from browser_harness.daemon import get_ws_url
from browser_harness.browser import Browser

async def main():
    ws_url = get_ws_url()
    print(f"Connecting to: {ws_url}")
    
    async with Browser(ws_url) as browser:
        page = browser.pages[0] if browser.pages else await browser.new_page()
        
        # Navigate to admin artikel baru
        await page.goto("http://localhost:3000/admin/artikel/baru")
        await page.wait_for_load_state("networkidle")
        print("Page loaded")
        
        # Get page title
        title = await page.title()
        print(f"Page title: {title}")
        
        # Check if editor area exists
        editor = await page.query_selector('[contenteditable="true"]')
        if editor:
            print("Editor found!")
            
            # Get initial innerHTML length
            initial_html = await editor.inner_html()
            print(f"Initial innerHTML length: {len(initial_html)}")
            
            # Type some text
            await editor.click()
            await page.keyboard.type("Hello World Test", delay=50)
            
            # Check innerHTML after typing
            after_html = await editor.inner_html()
            print(f"After typing innerHTML length: {len(after_html)}")
            print(f"After typing innerHTML: {after_html[:200]}")
            
            # Check if text is visible
            text_content = await editor.text_content()
            print(f"Text content: {text_content[:200] if text_content else 'None'}")
        else:
            print("Editor NOT found!")
            
            # Try to find any contenteditable
            contenteditables = await page.query_selector_all('[contenteditable]')
            print(f"Found {len(contenteditables)} contenteditable elements")
        
        # Check console logs
        print("\n--- Done ---")

if __name__ == "__main__":
    asyncio.run(main())
