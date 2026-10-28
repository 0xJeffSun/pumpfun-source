import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools'); sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04')
from mk import make
import v_r1, v_m3
FUND_H1=v_m3.FV['H1'].replace('__X','')
def fund_only(name, base=None):
    kw={} if base is None else {'base':base}
    d=make(name,[('migrate_v2.rs',v_r1.OLD_FUND,v_r1.NEW_FUND)],**kw)
    p=d+'/src/migrate_v2.rs'; s=open(p).read()
    if not s.endswith('\n'): s+='\n'
    s+=FUND_H1; open(p,'w').write(s); return d
if __name__=='__main__':
    print(fund_only('D1'))
