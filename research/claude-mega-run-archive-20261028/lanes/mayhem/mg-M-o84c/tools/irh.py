"""IR text helpers for exps: operate on a function body string."""
import re
def lines(b): return b.split('\n')
def find(ls, pref, start=0):
    for i in range(start, len(ls)):
        if ls[i].lstrip().startswith(pref): return i
    raise KeyError(pref)
def move(b, prefs, after=None, before=None):
    """move lines starting with each of prefs (in order) to right after line `after` (prefix) or before `before`."""
    ls = lines(b); moved = []
    for p in prefs:
        i = find(ls, p); moved.append(ls.pop(i))
    if after is not None:
        j = find(ls, after) + 1
    else:
        j = find(ls, before)
    ls[j:j] = moved
    return '\n'.join(ls)
def label_line(ls, lab):
    for i, l in enumerate(ls):
        if l.startswith(lab + ':'): return i
    raise KeyError(lab)
def to_block_end(b, prefs, lab):
    """move lines to just before the terminator of block `lab`."""
    ls = lines(b); moved = []
    for p in prefs:
        i = find(ls, p); moved.append(ls.pop(i))
    i = label_line(ls, lab) + 1
    while not re.match(r'\s+(br|switch|ret|unreachable)\b', ls[i]): i += 1
    ls[i:i] = moved
    return '\n'.join(ls)
def sub(b, old, new, count=1):
    assert old in b, old
    return b.replace(old, new, count)
def renum(b):
    """rename unnamed %N values to %vN so lines can be moved freely."""
    b = re.sub(r'%(\d+)\b', r'%v\1', b)
    b = re.sub(r'^(\d+):', r'v\1:', b, flags=re.M)
    return b
def R(f):
    return lambda b: f(renum(b))
