#!/usr/bin/env python3
"""irmv.py <module.ll> <fnregex> <orig_start> <tag> [--list] [MOVE ...]: MOVE = 'A>B' moves block #A to after block #B (indices
from --list, applied sequentially on the CURRENT order using original indices). llc + sacmp."""
import sys, re, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b'
LLC='/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod,fn,orig,tag=sys.argv[1:5]; ops=sys.argv[5:]
s=open(mod).read()
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{',s); st=m.start(); en=s.index('\n}\n',st)
f=s[st:en]
f=re.sub(r'%([0-9]+)\b',r'%v\1',f)
lines=f.split('\n'); head=lines[:2]; body=lines[2:]
blocks=[]; cur=None
for l in body:
    mm=re.match(r'^("[^"]+"|[\w.$-]+):',l)
    if mm and not l.startswith(' '): cur=[mm.group(1),[l]]; blocks.append(cur); continue
    if cur is None: cur=['start',[]]; blocks.append(cur)
    cur[1].append(l)
if '--list' in ops:
    for k,(n,ls) in enumerate(blocks):
        calls=[re.sub(r'17h[0-9a-f]{16}E','',x)[-24:] for x in re.findall(r'call [^@]*@("?[^(" ]+)',' '.join(ls)) if 'lifetime' not in x and 'llvm.' not in x]
        print(k, n[:40], len(ls), ' '.join(calls)[:80])
    sys.exit()
order=list(range(len(blocks)))
for op in ops:
    a,b=map(int,op.split('>')); order.remove(a); order.insert(order.index(b)+1,a)
out=f'{L}/llx/{tag}.ll'; nb=[]
for k in order: nb.extend(blocks[k][1])
open(out,'w').write(s[:st]+'\n'.join(head+nb)+s[en:])

r=subprocess.run([LLC,'-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',out,'-o',f'{L}/llx/{tag}.o'],capture_output=True,text=True)
if r.returncode: print('LLC FAIL',r.stderr[:300]); sys.exit(1)
o=subprocess.run(['python3','-B','/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/plainbody/tools/sacmp.py',f'{L}/llx/{tag}.o',orig,fn],capture_output=True,text=True).stdout.strip()
print(tag,' '.join(ops),'|',o.splitlines()[-1] if o else 'no output')
