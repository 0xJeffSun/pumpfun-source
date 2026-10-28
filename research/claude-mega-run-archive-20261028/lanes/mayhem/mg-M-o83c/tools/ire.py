"""IR experiment helper: split module into (pre, handler fn, post), edit handler text, llc, score vs orig O0083.
use: import ire; pre,h,post=ire.split(path); ...; ire.run(pre,h2,post,label) -> (masked_slots, stackmasked_slots, size)"""
import sys, os, re, subprocess, difflib
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
sys.path.insert(0,L+'/tools')
import llc83, sc, sc3
B='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
import sbfdis, objsec
PAT='buy_v2_handler'
def split(path, pat=PAT):
    s=open(path).read()
    i=s.index('\ndefine ', s.index(pat)-400) if False else None
    m=re.search(r'\ndefine [^\n]*'+pat+r'[^\n]*\n', s)
    a=m.start()+1; b=s.index('\n}\n',a)+3
    return s[:a], s[a:b], s[b:]
def orig_list():
    S,E=sc.WS['O0083']; return sc.lst(sc.O,S,E)
OL=None
def score_bin(code):
    Y=[sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text'] for pc,r in objsec.insns(code)]
    return sc3.score(Y)+(len(code),)
def score_bin_old(code):
    global OL
    if OL is None: OL=orig_list()
    Y=[sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text'] for pc,r in objsec.insns(code)]
    m=sc.slots([sc.mask(t) for t in OL],[sc.mask(t) for t in Y]); s=sc.slots([sc.mask(t,False) for t in OL],[sc.mask(t,False) for t in Y])
    return m,s,len(code)
def run(pre,h,post,label,extra=()):
    p=f'{L}/llc/{label}.ll'; open(p,'w').write(pre+h+post)
    code=llc83.run(p,label,extra=extra,quiet=True)
    if code is None: return None
    os.remove(p)
    return score_bin(code)
def unnumber(h):
    h=re.sub(r'%(\d+)\b', r'%v\1', h)
    h=re.sub(r'(?m)^(\d+):', r'v\1:', h)
    return h
