import re
# give the realloc-error drop-exit block its own ret instead of branching to bb12
def edit(f):
    lines = f.split('\n')
    out = []
    inblk = False
    for i, l in enumerate(lines):
        if l.startswith('"_ZN4core3ptr85drop_in_place') and 'exit95' in l.split(':')[0]:
            inblk = True
        if inblk and l.strip() == 'br label %bb12':
            out.append('  %r1x = insertvalue { i64, ptr } poison, i64 %_29.0, 0')
            out.append('  %r2x = insertvalue { i64, ptr } %r1x, ptr %_29.1, 1')
            out.append('  ret { i64, ptr } %r2x')
            inblk = False
            continue
        m = re.match(r'(\s*%_0\.sroa\.[05]\.0 = phi \S+ )(.*)$', l)
        if m:
            # drop the incoming from exit95
            parts = re.findall(r'\[ [^\]]+ \]', m.group(2))
            parts = [p for p in parts if 'exit95' not in p]
            l = m.group(1) + ', '.join(parts)
        out.append(l)
    return '\n'.join(out)
