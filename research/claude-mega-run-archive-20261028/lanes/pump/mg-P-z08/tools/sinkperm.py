#!/usr/bin/env python3
"""sinkperm.py <in.ll> <fnregex> <blocklabel-substr> <out.ll> <order>
Reorder the 'sinks' (stores / memcpy / memset whose destination is %_0 or a GEP of %_0) of one basic block.
order = comma list of destination offsets (0 = %_0 itself); sinks not listed keep their relative order after the listed ones.
Each sink is preceded by its not-yet-emitted in-block dependencies. Prints the sink order found when order='?'."""
import re, sys
src, fnrx, blk, out, order = sys.argv[1:6]
t = open(src).read()
m = re.search(r'\ndefine [^\n]*' + fnrx + r'[^\n]*\{', t); fs = m.end(); fe = t.index('\n}\n', fs)
f = t[fs:fe]
bs = f.index(blk); bs = f.index('\n', bs) + 1
mnext = re.compile(r'\n\n').search(f, bs); be = mnext.start() if mnext else len(f)
lines = f[bs:be].split('\n')
head = [l for l in lines if l.strip().startswith('%') and ' = phi ' in l]
body = [l for l in lines if l not in head]
term = body[-1]; body = body[:-1]
defs = {}
for i, l in enumerate(body):
    mm = re.match(r'\s*(%[\w.$"\-]+) = ', l)
    if mm: defs[mm.group(1)] = i
def uses(l):
    return [u for u in re.findall(r'%[\w.$\-]+', l.split(' = ', 1)[1] if ' = ' in l else l) if u in defs]
gep0 = {}
for i, l in enumerate(body):
    mm = re.match(r'\s*(%[\w.$\-]+) = getelementptr inbounds i8, ptr %_0, i64 (\d+)', l)
    if mm: gep0[mm.group(1)] = int(mm.group(2))
sinks = []
for i, l in enumerate(body):
    s = l.strip()
    if s.startswith('store '):
        dst = re.search(r', ptr (%[\w.$\-]+),', s).group(1)
    elif 'llvm.memcpy' in s or 'llvm.memset' in s:
        dst = re.search(r'\(ptr [^%]*(%[\w.$\-]+)', s).group(1)
    else: continue
    if dst == '%_0': sinks.append((i, 0))
    elif dst in gep0: sinks.append((i, gep0[dst]))
if order == '?':
    print(','.join(str(o) for i, o in sinks)); sys.exit()
want = [int(x) for x in order.split(',') if x]
byoff = {}
for i, o in sinks: byoff.setdefault(o, []).append(i)
seq = []
for o in want:
    if o in byoff and byoff[o]: seq.append(byoff[o].pop(0))
rest = [i for i, o in sinks if i not in seq]
seq += rest
# keep every non-sink instruction in place; refill the sink slots in the requested order (a sink waits until its
# operands are defined)
slots = [i for i, o in sinks]; sinkset = set(slots)
pending = list(seq); outl = []; defined = set()
for i, l in enumerate(body):
    if i in sinkset:
        # place the first pending sink whose deps are all defined
        for k, si in enumerate(pending):
            if all(defs[u] in defined for u in uses(body[si])):
                outl.append(body[si]); pending.pop(k); break
        else:
            pass
    else:
        outl.append(l); defined.add(i)
outl += [body[si] for si in pending]
nb = '\n'.join(head + outl + [term])
open(out, 'w').write(t[:fs] + f[:bs] + nb + f[be:] + t[fe:])
