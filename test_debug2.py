ensure_real_tab()

# Get all AX nodes
ax = cdp("Accessibility.getFullAXTree")
nodes = ax["nodes"]
print(f"Total AX nodes: {len(nodes)}")

# Print all roles
roles = set()
for n in nodes:
    role = n.get("role", {})
    if isinstance(role, dict):
        role = role.get("value", "unknown")
    roles.add(str(role))
print("Roles found:", sorted(roles))

# Find contenteditable elements
editables = js("Array.from(document.querySelectorAll('[contenteditable]')).map(e => ({tag: e.tagName, ce: e.contentEditable, text: e.textContent.substring(0, 50)}))")
print("Contenteditable elements:", editables)
