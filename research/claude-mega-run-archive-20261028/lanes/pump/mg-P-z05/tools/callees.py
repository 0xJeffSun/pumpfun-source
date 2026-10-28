#!/usr/bin/env python3
"""callees.py <orig_start> [...]: list internal calls (pc, target window, matched symbol) + syscalls of an ORIGINAL window."""
import sys, json, bisect, struct, re, subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
from score import original_windows
inv=json.load(open(W+'/base/L21/inventory.json'))['windows']
starts=sorted(int(k) for k in inv)
def win(a):
    i=bisect.bisect_right(starts,a)-1; return starts[i]
def dem(s):
    try: return subprocess.run(['c++filt'],input=s,capture_output=True,text=True).stdout.strip()
    except Exception: return s
ws={w['start']:w for w in original_windows()}
for arg in sys.argv[1:]:
    st=int(arg,0); w=ws[st]; raw=w['raw']; i=0; slot=0
    print(f"== {hex(st)} ({w['bytes']} B)")
    while i<len(raw):
        op=raw[i]; regs=raw[i+1]; imm=struct.unpack('<i',raw[i+4:i+8])[0]
        if op==0x85:
            pc=st+i
            if (regs>>4)==1:
                t=pc+8+imm*8; s=win(t); v=inv[str(s)]
                nm=dem(v['symbols'][0]) if v['symbols'] else '?'
                nm=re.sub(r'::h[0-9a-f]{16}$','',nm)
                print(f"  {hex(pc)} slot {slot}: call {hex(t)} {'N' if v['normalized'] else '-'} {nm[:110]}")
            else:
                print(f"  {hex(pc)} slot {slot}: syscall {imm & 0xffffffff:#x}")
        n=16 if op==0x18 else 8; i+=n; slot+=1
