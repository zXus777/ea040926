# Decor font

`Decor.ttf` is the original font, converted to `Decor.woff2` for faster loading.
Both are re-serialized with fontTools (fixed OS/2 table) because the original
1990s file failed Chromium's font sanitizer and silently refused to load in
browsers. `Comforter` (Google Fonts) is kept as a fallback in the `font-family`
stack in case either file goes missing.
