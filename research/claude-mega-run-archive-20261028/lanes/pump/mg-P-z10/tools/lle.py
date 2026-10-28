#!/usr/bin/env python3
"""lle.py <module.ll> <fnregex> <orig_start> <tag> <edits.py>: exec edits.py with `f` = function text (str); it must
leave the edited text in `f` (helpers: rep(old,new) exact single replace, swap(a,b) swap two exact lines). llc + sacmp."""
import sys, re, subprocess
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10'
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
G['rep']=rep; G['line']=line
exec(open(ed).read(), G)
out=f'{L}/llx/{tag}.ll'
open(out,'w').write(s[:st]+G['f']+s[en:])
r=subprocess.run([LLC,'-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',out,'-o',f'{L}/llx/{tag}.o']+sys.argv[6:],capture_output=True,text=True)
if r.returncode: print('LLC FAIL', r.stderr[:600]); sys.exit(1)
o=subprocess.run(['python3','-B',f'{L}/tools/sacmp.py',f'{L}/llx/{tag}.o',orig,fn],capture_output=True,text=True).stdout.strip()
print(tag, o.splitlines()[-1] if o else 'no output')
