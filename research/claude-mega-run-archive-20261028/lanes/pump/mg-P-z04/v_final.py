import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
from mk import make
import v_r1
def boost_only(name, boost, size, base=None):
    """lane src (D1) + boost block in execute replaced by init_pump_amm_boost_v2(&ctx)?; (line-neutral) + boost fn with its
    require! on line 658 and size helper with its error on line 747 (appended after file end, blank pad lines)."""
    kw={} if base is None else {'base':base}
    d=make(name,[],**kw); p=d+'/src/migrate_v2.rs'; s=open(p).read()
    s=v_r1.boost_edit(s)
    if not s.endswith('\n'): s+='\n'
    b=boost.replace('__X',''); z=size.replace('__X','')
    bl=b.split('\n'); ri=next(i for i,l in enumerate(bl) if 'require!(' in l)
    zl=z.split('\n'); zi=next(i for i,l in enumerate(zl) if 'UnsupportedQuoteMint' in l)
    n=s.count('\n'); s+='\n'*(658-ri-(n+1)); s+=b if b.endswith('\n') else b+'\n'
    n=s.count('\n'); assert 747-zi-(n+1)>=0, 'boost too long'; s+='\n'*(747-zi-(n+1)); s+=z
    open(p,'w').write(s)
    t=s.split('\n'); assert 'require!(' in t[657] and 'UnsupportedQuoteMint' in t[746], (t[657][:40], t[746][:40])
    return d
