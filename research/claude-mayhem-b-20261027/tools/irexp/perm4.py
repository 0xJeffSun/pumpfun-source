import itertools, re

def renumber(lines):
    return [re.sub(r'%(\d+)\b', lambda m: '%v' + m.group(1), l) for l in lines]

def idx(lines, pred):
    r = [k for k, l in enumerate(lines) if pred(l)]
    assert len(r) == 1, (len(r),)
    return r[0]

G = {
    'rem': ('%v2 = getelementptr inbounds nuw i8, ptr %ctx, i64 16', '%_56.0.i = load ptr, ptr %v2'),
    't616': ('%v15 = getelementptr inbounds nuw i8, ptr %_57.i, i64 616', '%_46.i.i = load ptr, ptr %v15'),
    'a160': ('%v16 = getelementptr inbounds nuw i8, ptr %_57.i, i64 160', '%_135.i.i = load ptr, ptr %v16'),
    'q600': ('%v37 = getelementptr inbounds nuw i8, ptr %_57.i, i64 600', '%_177.i.i = load ptr, ptr %v37'),
}

def place(order, anchor='%_57.i = load ptr'):
    def fn(lines):
        lines = renumber(lines)
        picked = []
        for k in order:
            for frag in G[k]:
                i = idx(lines, lambda l, f=frag: l.strip().startswith(f))
                picked.append(lines.pop(i))
        a = idx(lines, lambda l: l.strip().startswith(anchor))
        lines[a + 1:a + 1] = picked
        return lines
    return fn

EXPS = [('base', lambda l: renumber(l))]
for p in itertools.permutations(['rem', 't616', 'a160', 'q600']):
    EXPS.append(('p-' + '-'.join(p), place(p)))
