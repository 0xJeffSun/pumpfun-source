import os
WHICH = os.environ.get('WHICH', 'p')
def edit(f):
    lines = f.split('\n'); out = []; inblk = False
    for l in lines:
        if WHICH in ('p', 'pt') and l.strip().startswith('%_29.1 = extractvalue'): continue
        if WHICH == 'pt' and l.strip().startswith('%_29.0 = extractvalue'): continue
        if l.startswith('"_ZN4core3ptr85drop_in_place') and 'exit95' in l.split(':')[0]: inblk = True
        if inblk and l.strip() == 'br label %bb12':
            if WHICH == 'pt': out.append('  %_29.0 = extractvalue { i64, ptr } %41, 0')
            out.append('  %_29.1 = extractvalue { i64, ptr } %41, 1'); inblk = False
        out.append(l)
    return '\n'.join(out)
