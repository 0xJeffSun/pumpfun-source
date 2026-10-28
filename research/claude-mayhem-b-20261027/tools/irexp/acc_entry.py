import itertools, re, sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/out/specs')
from perm4 import renumber, idx, G, place

ACC = ('%v3 = getelementptr inbounds nuw i8, ptr %ctx, i64 8', '%_57.i = load ptr, ptr %v3')
REM = G['rem']

def to_entry(frags):
    def fn(lines):
        picked = []
        for f in frags:
            i = idx(lines, lambda l, f=f: l.strip().startswith(f))
            picked.append(lines.pop(i))
        b = idx(lines, lambda l: l.strip().startswith('br i1 %v1, label %bb1.i'))
        lines[b:b] = picked
        return lines
    return fn

def chain(*fns):
    def fn(lines):
        lines = renumber(lines)
        for f in fns:
            lines = f(lines)
        return lines
    return fn

def place_nr(order, anchor):
    # like perm4.place but without renumbering and with a custom anchor
    def fn(lines):
        picked = []
        for k in order:
            for frag in G[k]:
                i = idx(lines, lambda l, f=frag: l.strip().startswith(f))
                picked.append(lines.pop(i))
        a = idx(lines, lambda l: l.strip().startswith(anchor))
        lines[a + 1:a + 1] = picked
        return lines
    return fn

EXPS = [('acc-entry', chain(to_entry(ACC))),
        ('acc+rem-entry', chain(to_entry(ACC + REM))),
        ('rem-entry', chain(to_entry(REM)))]
for p in [('rem', 'q600', 'a160', 't616'), ('q600', 'a160', 't616', 'rem'), ('rem', 't616', 'a160', 'q600'),
          ('t616', 'a160', 'q600', 'rem')]:
    EXPS.append(('acc-entry-' + '-'.join(p), chain(to_entry(ACC), place_nr(p, '%v53 = getelementptr'))))

EXPS = []
for p in itertools.permutations(['rem', 't616', 'a160', 'q600']):
    EXPS.append(('ae-' + '-'.join(p), chain(to_entry(ACC), place_nr(p, 'bb1.i:'))))
