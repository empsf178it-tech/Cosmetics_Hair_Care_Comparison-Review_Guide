import glob, re

nav_items = [
    ('index.html', 'Home'),
    ('shop.html', 'Shop'),
    ('compare.html', 'Compare'),
    ('hair-quiz.html', 'Hair Quiz'),
    ('reviews.html', 'Reviews')
]

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generate custom navbar HTML for this file
    links_html = '<div class="d-none d-lg-flex align-items-center gap-2">\n'
    for page, label in nav_items:
        active_cls = ' active' if filepath == page else ''
        links_html += f'        <a href="{page}" class="nav-link-follicle{active_cls}">{label}</a>\n'
    links_html += '      </div>'

    # Replace center navbar div
    pattern = r'<div class="d-none d-lg-flex align-items-center gap-2">.*?</div>'
    new_content = re.sub(pattern, links_html, content, flags=re.DOTALL)

    # Also make sure mobile drawer has Home link instead of Discover
    new_content = new_content.replace('<a href="index.html">Discover</a>', '<a href="index.html">Home</a>')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated navbar in {filepath}')
