#!/usr/bin/env python3
"""Assemble the portfolio into a single self-contained index.html.

Inlines the Press Start 2P webfont (base64 woff2) so the page works offline,
on any host, and inside strict-CSP environments.
"""
import base64
import pathlib
import re

HERE = pathlib.Path(__file__).parent
FONT = HERE / "assets" / "PressStart2P.woff2"

body = (HERE / "_page.html").read_text(encoding="utf-8")
css = (HERE / "_style.css").read_text(encoding="utf-8")
js = (HERE / "_app.js").read_text(encoding="utf-8")

b64 = base64.b64encode(FONT.read_bytes()).decode()
face = (
    "@font-face{font-family:'Press Start 2P';font-style:normal;font-weight:400;"
    "font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2');}" % b64
)

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ahmed Khan — Computer Science · Security Operations, Data &amp; AI</title>
<meta name="description" content="Ahmed Khan — Computer Science undergraduate at Heriot-Watt University Dubai. Security operations at Fresha, data analytics at Emirates, and 15+ personal projects across AI, Python and systems.">
<meta name="author" content="Ahmed Khan">
<meta name="theme-color" content="#07070f">
<meta property="og:type" content="website">
<meta property="og:title" content="Ahmed Khan — Security Operations, Data &amp; AI">
<meta property="og:description" content="CS undergraduate in Dubai. Fraud investigation at Fresha, data analytics at Emirates, and 15+ builds across AI, Python and systems.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%2307070f'/%3E%3Cg fill='%234ef07f'%3E%3Crect x='2' y='3' width='2' height='10'/%3E%3Crect x='4' y='7' width='2' height='2'/%3E%3Crect x='6' y='3' width='2' height='10'/%3E%3Crect x='10' y='3' width='2' height='4'/%3E%3Crect x='10' y='9' width='2' height='4'/%3E%3Crect x='12' y='3' width='2' height='2'/%3E%3Crect x='12' y='11' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E">
<style>
__FONT_FACE__
__CSS__
</style>
</head>
<body>
"""

head = HEAD.replace("__FONT_FACE__", face).replace("__CSS__", css)
html = head + body + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n"

out = HERE / "index.html"
out.write_text(html, encoding="utf-8")
kb = len(html.encode("utf-8")) / 1024
print(f"built {out}  ({kb:.1f} KB, font inlined: {len(b64)/1024:.1f} KB base64)")
