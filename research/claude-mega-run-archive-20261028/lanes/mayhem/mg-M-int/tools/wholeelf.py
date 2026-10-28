# usage: wholeelf.py CANDIDATE.so ORIGINAL.so [OUT.json] -> per-section byte comparison (ELF64 LE), stdlib only
import json, struct, sys
c, o = open(sys.argv[1], 'rb').read(), open(sys.argv[2], 'rb').read()
def sections(b):
    shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    strtab = hs[shstrndx]; name = lambda off: b[strtab[4] + off:b.index(b'\0', strtab[4] + off)].decode()
    return [dict(name=name(h[0]), type=h[1], addr=h[3], offset=h[4], size=h[5]) for h in hs], shoff, shentsize * shnum
cs, cshoff, cshlen = sections(c); os_, oshoff, oshlen = sections(o)
tail = o[len(c):]
res = dict(candidate_bytes=len(c), original_bytes=len(o), original_tail_bytes=len(tail), original_tail_all_zero=not any(tail),
           prefix_equal=c == o[:len(c)], differing_bytes=sum(x != y for x, y in zip(c, o)), sections=[])
for a, b in zip(cs, os_):
    same_hdr = (a['name'], a['type'], a['addr'], a['offset'], a['size']) == (b['name'], b['type'], b['addr'], b['offset'], b['size'])
    if a['type'] == 8: diff = 0  # NOBITS
    else: diff = sum(x != y for x, y in zip(c[a['offset']:a['offset'] + a['size']], o[b['offset']:b['offset'] + b['size']])) + abs(a['size'] - b['size'])
    res['sections'].append(dict(name=a['name'], offset=a['offset'], size=a['size'], header_equal=same_hdr, differing_bytes=diff))
res['section_count_equal'] = len(cs) == len(os_)
covered = sorted((s['offset'], s['offset'] + s['size']) for s in cs if s['type'] != 8) + [(cshoff, cshoff + cshlen), (0, 64)]
res['diff_by_section'] = {s['name'] or '<null>': s['differing_bytes'] for s in res['sections'] if s['differing_bytes']}
out = json.dumps(res, indent=1)
if len(sys.argv) > 3: open(sys.argv[3], 'w').write(out + '\n')
print({k: v for k, v in res.items() if k != 'sections'})
