import re, os
ORD = os.environ.get('ORD', 'tag_first')
def edit(f):
    lines = f.split('\n')
    out = []
    pend = None; tagphi = None
    for l in lines:
        if l.strip().startswith('%_29.1 = extractvalue'):
            continue
        m = re.match(r'(\s*)%_0\.sroa\.5\.0 = phi ptr (.*)$', l)
        if m:
            inc = m.group(2).replace('%_29.1,', '%41,').replace('[ %23,', '[ %21,')
            aggl = m.group(1) + '%aggp = phi { i64, ptr } ' + inc
            pend = m.group(1) + '%_0.sroa.5.0 = extractvalue { i64, ptr } %aggp, 1'
            if ORD == 'agg_first': out.append(aggl)
            else: hold = aggl
            continue
        if l.strip().startswith('%_0.sroa.0.0 = phi'):
            out.append(l)
            if ORD != 'agg_first': out.append(hold)
            continue
        if l.strip().startswith('%48 = insertvalue'):
            out.append(pend)
        out.append(l)
    return '\n'.join(out)
