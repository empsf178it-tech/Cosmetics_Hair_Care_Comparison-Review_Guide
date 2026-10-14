import glob, os

images = sorted(glob.glob('assets/images/*.jpg'), key=lambda x: int(os.path.basename(x).split('.')[0]))

os.makedirs('scratch', exist_ok=True)
html = '''<!DOCTYPE html>
<html>
<head>
<title>Image Index</title>
<style>
body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card { background: #222; border-radius: 8px; overflow: hidden; padding: 10px; text-align: center; }
.card img { width: 100%; height: 180px; object-fit: cover; border-radius: 4px; }
.card p { margin: 6px 0 0 0; font-size: 14px; font-weight: bold; }
</style>
</head>
<body>
<h1>FOLLICLE 50 Downloaded Images Overview</h1>
<div class="grid">
'''
for img in images:
    fname = os.path.basename(img)
    html += f'<div class="card"><img src="../assets/images/{fname}"><p>{fname}</p></div>\n'
html += '</div></body></html>'

with open('scratch/image_index.html', 'w') as f:
    f.write(html)
print('Generated scratch/image_index.html')
