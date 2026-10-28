#!/usr/bin/env python3
"""lle.py <module.ll (extracted)> <fnregex> <orig_start> <tag> <edits.py> [--show]: exec edits.py with f=function text;
helpers rep(old,new), line(sub), movelines(start_sub, end_sub, before_sub) (move a contiguous line range before a line).
llc + sacmp; --show prints the win-style hunk summary for the result."""
import sys, re, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10b'
LLC='/Users/shawwalters/.cache/solana/v1.44/platform-tools/llvm/bin/llc'
mod, fn, orig, tag, ed = sys.argv[1:6]
s=open(mod).read()
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{', s); st=m.start(); en=s.index('\n}\n', st)
G={'f': s[st:en]}
def rep(old,new,cnt=1):
    if old not in G['f']: print('EDIT NOT FOUND:', old[:100]); sys.exit(1)
    G['f']=G['f'].replace(old,new,cnt)
def line(sub):
    ls=[l for l in G['f'].split('\n') if sub in l]
    if len(ls)!=1: print('LINE not unique/found', len(ls), sub[:80]); sys.exit(1)
    return ls[0]
def movelines(a,b,before):
    ls=G['f'].split('\n'); i=[k for k,l in enumerate(ls) if a in l]; j=[k for k,l in enumerate(ls) if b in l]
    assert len(i)==1 and len(j)==1, (a,b,len(i),len(j)); i,j=i[0],j[0]; blk=ls[i:j+1]; rest=ls[:i]+ls[j+1:]
    t=[k for k,l in enumerate(rest) if before in l]; assert len(t)==1,(before,len(t)); rest[t[0]:t[0]]=blk; G['f']='\n'.join(rest)
def nm(*ns):
    for n in ns: G['f']=re.sub(r'%'+str(n)+r'(?![0-9A-Za-z_.])','%v'+str(n),G['f'])
def renum():
    # rename all numbered values to named ones (so lines can move freely)
    G['f']=re.sub(r'%([0-9]+)(?![0-9A-Za-z_.])',r'%v\1',G['f'])
G.update(rep=rep,line=line,movelines=movelines,nm=nm,renum=renum)
exec(open(ed).read(), G)
out=f'{L}/llx/{tag}.ll'
open(out,'w').write(s[:st]+G['f']+s[en:])
r=subprocess.run([LLC,'-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',out,'-o',f'{L}/llx/{tag}.o'],capture_output=True,text=True)
if r.returncode: print('LLC FAIL', r.stderr[:600]); sys.exit(1)
o=subprocess.run(['python3','-B',f'{L}/tools/sacmp.py',f'{L}/llx/{tag}.o',orig,fn],capture_output=True,text=True).stdout.strip()
print(tag, o.splitlines()[-1] if o else 'no output')
