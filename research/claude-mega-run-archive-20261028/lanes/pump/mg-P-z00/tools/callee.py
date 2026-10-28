import json,sys,bisect
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json'))
w=inv['windows']; ks=sorted(int(k) for k in w)
for arg in sys.argv[1:]:
  pc,imm=[int(x,16) for x in arg.split(':')]
  t=pc+8+imm*8
  i=bisect.bisect_right(ks,t)-1
  print(arg, hex(t), hex(ks[i]), t==ks[i], w[str(ks[i])]['normalized'], [s[:110] for s in w[str(ks[i])]['symbols'][:2]])
