import re
def short(sym):
    """Compact legacy-mangled Rust symbol: path segments joined by ::, hash dropped."""
    if not sym.startswith('_ZN'):
        return sym
    s, i, out = sym[3:], 0, []
    while i < len(s) and s[i].isdigit():
        j = i
        while s[j].isdigit(): j += 1
        n = int(s[i:j]); seg = s[j:j + n]; i = j + n
        if re.fullmatch(r'h[0-9a-f]{16}', seg): break
        seg = seg.replace('$LT$', '<').replace('$GT$', '>').replace('$u20$', ' ').replace('$u7b$', '{').replace('$u7d$', '}').replace('..', '::')
        out.append(seg)
    return '::'.join(x for x in out if x != 'pump_amm_recovered')[-90:]


def segs(sym):
    """Path segments of a legacy-mangled Rust symbol (hash dropped), e.g.
    ['pump_amm_recovered', 'state', 'pool', '<impl pump_amm_recovered::state::Pool>', 'can_boost']."""
    if not sym.startswith('_ZN'):
        return [sym]
    s, i, out = sym[3:], 0, []
    while i < len(s) and s[i].isdigit():
        j = i
        while s[j].isdigit():
            j += 1
        n = int(s[i:j]); seg = s[j:j + n]; i = j + n
        if re.fullmatch(r'h[0-9a-f]{16}', seg):
            break
        seg = seg.replace('$LT$', '<').replace('$GT$', '>').replace('$u20$', ' ').replace('$u7b$', '{') \
                 .replace('$u7d$', '}').replace('$RF$', '&').replace('$C$', ',').replace('..', '::')
        if seg[:2] in ('_<', '_{'):
            seg = seg[1:]
        out.append(seg)
    return out
