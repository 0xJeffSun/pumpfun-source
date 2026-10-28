import re
def edit(f):
    lines = f.split('\n')
    out = []
    for l in lines:
        if l.strip().startswith('%_29.1 = extractvalue'):
            continue
        m = re.match(r'(\s*)%_0\.sroa\.5\.0 = phi ptr (.*)$', l)
        if m:
            inc = m.group(2)
            inc = inc.replace('[ undef,', '[ undef,').replace('%_29.1,', '%41,').replace('[ %23,', '[ %21,')
            out.append(m.group(1) + '%aggp = phi { i64, ptr } ' + inc)
            pend = m.group(1) + '%_0.sroa.5.0 = extractvalue { i64, ptr } %aggp, 1'
            continue
        if l.strip().startswith('%47 = insertvalue'):
            out.append(pend)
        out.append(l)
    return '\n'.join(out)
