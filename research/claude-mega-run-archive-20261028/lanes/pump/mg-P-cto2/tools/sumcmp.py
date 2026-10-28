#!/usr/bin/env python3
"""sumcmp.py <cand.so> [symregex] : SUMMARY-ONLY comparison of a candidate fn vs original window 0x22a10.
Prints counts/metrics only (no instruction listings)."""
import sys, re, json, bisect, difflib, collections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
import win, coords
from score import original_windows, body
ST=0x22a10
inv=json.load(open(W+'/base/L27/inventory.json'))['windows']; starts=sorted(int(k) for k in inv)
ALIAS={'create':'create_idempotent','?3cd50':'prepare_bonding_curve'}
REV={}
for k,e in inv.items():
    if e.get('normalized'):
        for sy in e.get('symbols') or []: REV[sy]=int(k)
def short(sy): return win.demangle(sy).split('::')[-1][:28]
def oname(t):
    i=bisect.bisect_right(starts,t)-1; s=starts[i]; sy=inv[str(s)].get('symbols') or []
    n=(short(sy[0]) if sy else '?%x'%s)+('' if s==t else '+')
    return ALIAS.get(n,n)
def analyze(path, st, size, blob, secs, nm):
    raw=body(blob,secs,st,size)
    sites=[s['line'] for s in coords.sites(blob,secs,st,raw)]
    txt=win.objdump_text(path,st,st+size); pcs=sorted(txt)
    lead={st}; calls=[]; frame=0; nj=0
    for k,pc in enumerate(pcs):
        t=txt[pc]
        for m in re.finditer(r'r10 - (0x[0-9a-f]+)',t): frame=max(frame,int(m.group(1),16))
        if t.startswith('j') or t.startswith('exit'):
            nj+=1
            if k+1<len(pcs): lead.add(pcs[k+1])
            m=re.match(r'(j\w+)\s.*?([+-]0x[0-9a-f]+|[+-]\d+)$',t.split('<')[0].strip())
            if t.startswith('j') and m: lead.add(pc+8+int(m.group(2),0)*8)
        m=re.match(r'call (-?0x[0-9a-f]+)$',t)
        if m:
            imm=int(m.group(1),16)
            calls.append('SYSCALL' if imm==-1 else nm((pc//8+1+imm)*8))
        elif t.startswith('call'): calls.append(t)
        elif t.startswith('callx'): calls.append('callx')
    blocks=len([x for x in lead if st<=x<st+size])
    return dict(size=size, blocks=blocks, calls=calls, sites=sites, frame=frame, jumps=nj, norm=win.normalized(blob,secs,st,size) if hasattr(win,'normalized') else None)
def main():
    path=sys.argv[1]; rx=sys.argv[2] if len(sys.argv)>2 else r'admin_cto.*execute'
    w=next(x for x in original_windows() if x['start']==ST)
    o=analyze(str(W+'/base/original.so'), ST, w['bytes'], win.ORIG, win.ORIG_SECS, oname)
    c=win.Cand(path); f=[x for x in c.funcs if re.search(rx,x[2])]
    if not f: print('no symbol', rx); return
    cst,csize,cname=f[0]
    fmap=sorted((a,win.demangle(b)) for a,_,b in c.funcs); ks=[x[0] for x in fmap]
    raw={a:b for a,_,b in c.funcs}
    def nm(t):
        i=bisect.bisect_right(ks,t)-1; s,n=fmap[i]; r=raw.get(s)
        n=n.split('::')[-1][:28]+('' if s==t else '+'); return ALIAS.get(n,n)
    k=analyze(path, cst, csize, c.blob, c.secs, nm)
    print(f"cand {win.demangle(cname)[:60]} @0x{cst:x}")
    for key in ('size','blocks','frame','jumps'):
        print(f"  {key:7s} orig={o[key]:<6} cand={k[key]:<6} d={k[key]-o[key]:+}")
    print(f"  calls   orig={len(o['calls'])} cand={len(k['calls'])}  seqratio={difflib.SequenceMatcher(None,o['calls'],k['calls'],autojunk=False).ratio():.4f}")
    oc=collections.Counter(o['calls']); kc=collections.Counter(k['calls'])
    d=[(n,oc[n],kc[n]) for n in sorted(set(oc)|set(kc)) if oc[n]!=kc[n]]
    print('  callee count diffs (name orig cand): '+('; '.join(f"{n} {a} {b}" for n,a,b in d) if d else 'none'))
    os_=collections.Counter(o['sites']); ks_=collections.Counter(k['sites'])
    print(f"  sites   orig={len(o['sites'])} cand={len(k['sites'])} seqratio={difflib.SequenceMatcher(None,o['sites'],k['sites'],autojunk=False).ratio():.4f}")
    miss=sorted((os_-ks_).elements()); extra=sorted((ks_-os_).elements())
    print(f"  sites missing in cand: {miss[:30]}")
    print(f"  sites extra in cand:   {extra[:30]}")
main()
