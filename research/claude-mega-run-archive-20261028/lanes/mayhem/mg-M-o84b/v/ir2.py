import re
def phi_sink_swap(b):
    m = re.search(r'(%\.sink\.i = phi i64 )([^\n]+)', b)
    items = re.findall(r'\[ [^\]]+ \]', m.group(2))
    return b.replace(m.group(2), ', '.join(items[::-1]), 1)
EXPS = [('identity', lambda b: b), ('phi_sink_swap', phi_sink_swap)]
