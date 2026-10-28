"""IR experiment helpers for O0083 (buy_v2_handler): load module, edit handler body, llc, score.
score tuple = (masked, stackmasked, size)."""
import sys, os, re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c'
sys.path.insert(0,L+'/tools')
import ire
_cache={}
def load(path):
    if path not in _cache: _cache[path]=ire.split(path)
    return _cache[path]
def run(path,h,label,extra=()):
    pre,_,post=load(path)
    return ire.run(pre,h,post,label,extra)
def block_span(ls,lab):
    i=[k for k,l in enumerate(ls) if l.startswith(lab+':')][0]
    j=i+1
    while j<len(ls) and not re.match(r'^[^\s;][^:]*:',ls[j]) and ls[j]!='}': j+=1
    return i,j
def phis(h,lab):
    ls=h.split('\n'); i,j=block_span(ls,lab)
    idx=[k for k in range(i+1,j) if ' = phi ' in ls[k]]
    return ls,idx
def set_phi_order(h,lab,order):
    """order: list of phi names (without %) in desired order"""
    ls,idx=phis(h,lab)
    lines={re.match(r'\s*%([^ ]+) = phi',ls[k]).group(1):ls[k] for k in idx}
    assert sorted(lines)==sorted(order),(sorted(lines),sorted(order))
    for k,n in zip(idx,order): ls[k]=lines[n]
    return '\n'.join(ls)
def phi_names(h,lab):
    ls,idx=phis(h,lab)
    return [re.match(r'\s*%([^ ]+) = phi',ls[k]).group(1) for k in idx]
