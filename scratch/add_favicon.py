import os, glob, re

html_files = glob.glob("*.html")
favicon_tag = '  <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">'

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove old favicon tag if exists
    content = re.sub(r'\s*<link rel="icon"[^>]*>', '', content)
    
    # Insert after <meta name="viewport"...> or inside <head>
    if '<meta name="viewport"' in content:
        content = re.sub(r'(<meta name="viewport"[^>]*>)', r'\1\n' + favicon_tag, content, count=1)
    elif '<head>' in content:
        content = content.replace('<head>', '<head>\n' + favicon_tag, 1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Added favicon tag to {len(html_files)} HTML files successfully.")
