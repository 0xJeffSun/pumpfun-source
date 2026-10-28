#!/usr/bin/env python3
"""irsplit.py <in.ll> <fn-substr> <out.ll> <block>[,<block>...] [--place after|keep]: duplicate each listed block once per
predecessor (block must have no phis); each copy placed right after its predecessor (or keep original pos)."""
import sys,re
src,fn,out,blks=sys.argv[1:5]; place='after' if '--keep' not in sys.argv else 'keep'
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+re.escape(fn)+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
body=s[st:en]
parts=re.split(r'\n(?=[A-Za-z0-9_.$"\-]+:)',body)
def nm(p): return p.split(':')[0].strip()
for blk in blks.split(','):
    names=[nm(p) for p in parts]
    bi=names.index(blk); bp=parts[bi]
    hdr,rest=bp.split('\n',1)
    # preds = blocks whose terminator mentions label %blk
    preds=[i for i,p in enumerate(parts) if i!=bi and re.search(r'label %'+re.escape(blk)+r'\b',p.splitlines()[-1] if p.splitlines() else '')]
    newparts=[]
    for i,p in enumerate(parts):
        if i==bi: continue
        if i in preds:
            k=preds.index(i); newname=f'{blk}.s{k}'
            lines=p.split('\n'); li=max(j for j,x in enumerate(lines) if x.strip()); lines[li]=re.sub(r'label %'+re.escape(blk)+r'\b','label %'+newname,lines[li]); p='\n'.join(lines)
            newparts.append(p)
            # rename SSA defs in the copy
            defs=re.findall(r'^\s*(%[A-Za-z0-9_.]+) =',rest,re.M)
            r2=rest
            for d in defs: r2=re.sub(re.escape(d)+r'\b',d+f'.s{k}',r2)
            newparts.append(f'{newname}:\n'+r2)
        else: newparts.append(p)
    parts=newparts
open(out,'w').write(s[:st]+'\n'.join(parts)+s[en:])
print(' '.join(nm(p)[:10] for p in parts))
