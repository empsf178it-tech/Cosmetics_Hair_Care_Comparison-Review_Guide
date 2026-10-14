import glob, os
from PIL import Image, ImageFilter, ImageStat

images = sorted(glob.glob('assets/images/*.jpg'), key=lambda x: int(os.path.basename(x).split('.')[0]))

results = []

for img_path in images:
    fname = os.path.basename(img_path)
    with Image.open(img_path) as im:
        w, h = im.size
        aspect = round(w / h, 2)
        
        # Sample pixels for color check
        im_thumb = im.resize((100, 100)).convert('RGB')
        pixels = list(im_thumb.getdata())
        total = len(pixels)
        
        skin_count = 0
        green_count = 0
        light_count = 0
        
        for r, g, b in pixels:
            if r > 95 and g > 40 and b > 20 and r > g and r > b and abs(r - g) > 15:
                skin_count += 1
            if g > r + 10 and g > b + 10:
                green_count += 1
            if r > 200 and g > 190 and b > 180:
                light_count += 1
                
        skin_pct = round((skin_count / total) * 100, 1)
        green_pct = round((green_count / total) * 100, 1)
        light_pct = round((light_count / total) * 100, 1)

        gray = im_thumb.convert('L')
        edges = gray.filter(ImageFilter.FIND_EDGES)
        edge_stat = ImageStat.Stat(edges)
        edge_score = round(edge_stat.mean[0], 1)

        results.append({
            'name': fname,
            'w': w,
            'h': h,
            'aspect': aspect,
            'skin_pct': skin_pct,
            'green_pct': green_pct,
            'light_pct': light_pct,
            'edge_score': edge_score
        })

print("NAME    | RES       | ASPECT | SKIN% | GREEN% | LIGHT% | EDGES | ESTIMATED CATEGORY")
print("-" * 80)
for r in results:
    cats = []
    if r['skin_pct'] > 25:
        cats.append("Model/Portrait")
    if r['green_pct'] > 5:
        cats.append("Botanical")
    if r['light_pct'] > 35:
        cats.append("Product/Studio")
    if not cats:
        if r['edge_score'] > 20:
            cats.append("Texture/Hair Detail")
        else:
            cats.append("Atmospheric/Lifestyle")
    
    print(f"{r['name']:7s} | {r['w']}x{r['h']:<5d} | {r['aspect']:<6.2f} | {r['skin_pct']:<5.1f} | {r['green_pct']:<6.1f} | {r['light_pct']:<6.1f} | {r['edge_score']:<5.1f} | {', '.join(cats)}")
