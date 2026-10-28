import re,sys,bisect,json
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json'))
ks=sorted(int(k) for k in inv['windows'])
tg=set(int(a,16) for a in sys.argv[1:])
for line in open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00b/tools/orig.dis'):
  m=re.match(r'\s*([0-9a-f]+):\s+call (0x[0-9a-f]+|-0x[0-9a-f]+)',line)
  if not m: continue
  pc=int(m.group(1),16); imm=int(m.group(2),16)
  t=pc+8+imm*8
  if t in tg:
    i=bisect.bisect_right(ks,pc)-1
    print(hex(t),'called from',hex(pc),'in window',hex(ks[i]))
