"""Build a single self-contained HTML file (all CSS, JS and images inlined).

Usage (from the repo root):
    python3 tools/build_standalone.py
Output: dist/paris-chic-standalone.html
"""
import base64, mimetypes, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
js = (ROOT / "js/main.js").read_text(encoding="utf-8")

html = html.replace('<link rel="stylesheet" href="css/styles.css">', f"<style>\n{css}</style>")
html = html.replace('<script src="js/main.js"></script>', f"<script>\n{js}</script>")

cache = {}
def data_uri(match):
    path = match.group(1)
    if path not in cache:
        f = ROOT / path
        raw = f.read_bytes()
        mime = "image/svg+xml" if f.suffix == ".svg" else ("image/jpeg" if raw[:3] == b"\xff\xd8\xff" else mimetypes.guess_type(f.name)[0])
        cache[path] = f"data:{mime};base64," + base64.b64encode(raw).decode()
    return cache[path]

html = re.sub(r'(assets/[\w./-]+\.(?:png|jpg|jpeg|svg|webp))', data_uri, html)
out = ROOT / "dist/paris-chic-standalone.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"Wrote {out.relative_to(ROOT)} ({out.stat().st_size/1e6:.1f} MB, {len(cache)} assets inlined)")
