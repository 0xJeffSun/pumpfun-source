import re, os
# rebuild the return block bb12 as a single aggregate phi; MODE env picks incoming for size path (bb20) and ok path
MODE = os.environ.get('MODE', 'a')
def edit(f):
    lines = f.split('\n')
    i = next(k for k, l in enumerate(lines) if l.startswith('bb12:'))
    p5 = lines[i+1]; p0 = lines[i+2]
    inc5 = re.findall(r'\[ ([^,]+), (%"[^"]+"|%\S+) \]', p5)
    out = lines[:i+1]
    vals = []
    for v, b in inc5:
        if v == 'undef': nv = '{ i64 2, ptr undef }'
        elif v == '%_29.1': nv = '%41'
        elif v == '%23':
            if b == '%bb20':
                nv = {'a': '%21', 'b': '{ i64 2, ptr undef }', 'c': '%szagg'}[MODE]
            else: nv = '%21'
        vals.append(f'[ {nv}, {b} ]')
    out.append('  %ret = phi { i64, ptr } ' + ', '.join(vals))
    out.append('  ret { i64, ptr } %ret')
    rest = lines[i+3:]
    k = next(j for j, l in enumerate(rest) if l.strip().startswith('ret '))
    out += rest[k+1:]
    s = '\n'.join(out)
    s = s.replace('  %_29.1 = extractvalue { i64, ptr } %41, 1\n', '').replace('  %_29.0 = extractvalue { i64, ptr } %41, 0\n', '')
    if MODE == 'c':
        s = s.replace('bb20:', 'bb20:', 1)
        j = s.index('bb20:'); j2 = s.index('\n', s.index('%_10 = icmp', j))
        s = s[:j2] + '\n  %szagg = insertvalue { i64, ptr } { i64 2, ptr undef }, ptr %23, 1' + s[j2:]
    return s
