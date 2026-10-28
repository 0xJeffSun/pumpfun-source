# annotate original window disasm with callee window + matched symbol
import json,sys,bisect,subprocess,re
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
inv=json.load(open(W+'/base/L12/inventory.json'))['windows']; ks=sorted(int(k) for k in inv)
import functools
@functools.lru_cache(None)
def best(t):
  return ''
out=subprocess.run(['python3',W+'/harness/win.py','orig',sys.argv[1]],capture_output=True,text=True).stdout
for line in out.splitlines():
  m=re.match(r'(0x[0-9a-f]+)\s+call (-?0x[0-9a-f]+)',line)
  if m:
    pc=int(m.group(1),16); t=pc+8+int(m.group(2),16)*8
    i=bisect.bisect_right(ks,t)-1; e=inv[str(ks[i])]
    sym=e['symbols'][0] if e['symbols'] else '?unmatched'
    sym=re.sub(r'17h[0-9a-f]{16}E$','',sym)
    line+=f'   -> {hex(t)}{"" if t==ks[i] else "+"+hex(t-ks[i])} {sym[-90:]}'
  print(line)
