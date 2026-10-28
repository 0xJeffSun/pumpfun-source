#!/usr/bin/env python3
"""Run llc on a .ll (full module), extract the buy_v2_handler section, compare with original O0083 and optionally with a candidate ELF.
usage: llc83.py IN.ll LABEL [cand_symbols.so]
"""
import sys, subprocess, os
B='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0,B); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/ir-o83/tools')
import objsec, sbfdis, w83
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
LLC=os.path.expanduser('~/.cache/solana/v1.54/platform-tools/llvm/bin/llc')
def run(ll, label, extra=(), secpat='buy_v2_handler', quiet=False):
    o=f'{W}/llc/{label}.o'
    r=subprocess.run([LLC,'-O3','-mtriple=sbf','-mcpu=generic','-relocation-model=pic','-function-sections','-filetype=obj',*extra,ll,'-o',o],capture_output=True,text=True)
    if r.returncode: print(r.stderr[:3000]); return None
    secs=objsec.sections(o)
    key=[k for k in secs if secpat in k and k.startswith('.text')]
    assert len(key)==1,key
    code=secs[key[0]]
    open(f'{W}/llc/{label}.bin','wb').write(code)
    if not quiet: w83.binrep(f'{W}/llc/{label}.bin')
    return code
if __name__=='__main__':
    code=run(sys.argv[1],sys.argv[2])
    if len(sys.argv)>3 and code is not None:
        C,(a,b,n)=w83.cand(sys.argv[3])
        print('llc == rustc candidate (masked):', objsec.norm(code)==objsec.norm(C.b[a:b]), len(code), b-a)
