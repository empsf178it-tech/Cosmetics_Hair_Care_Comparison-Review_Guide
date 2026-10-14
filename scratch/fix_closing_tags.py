import glob

html_files = glob.glob("*.html")

for filepath in html_files:
    if filepath == 'dashboard.html':
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix duplicate closing tag after mobile-nav-footer
    bad_pattern = '    </div>\n  </div>\n  </div>\n\n  <!-- STICKY NAVBAR -->'
    good_pattern = '    </div>\n  </div>\n\n  <!-- STICKY NAVBAR -->'

    if bad_pattern in content:
        content = content.replace(bad_pattern, good_pattern)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

print("Fixed closing tags.")
