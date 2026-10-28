import re
def denumber(b):
    """rename numbered values %N -> %vN and numbered labels 'N:' -> 'vN:' so instructions can be moved freely"""
    b = re.sub(r'%(\d+)\b', r'%v\1', b)
    b = re.sub(r'^(\d+):', r'v\1:', b, flags=re.M)
    return b
def move_lines(b, lines, after):
    """remove the given exact lines (list) and insert them right after the line containing `after`"""
    for l in lines: assert l in b, l; b = b.replace(l + '\n', '', 1)
    i = b.index(after); j = b.index('\n', i) + 1
    return b[:j] + ''.join(l + '\n' for l in lines) + b[j:]
