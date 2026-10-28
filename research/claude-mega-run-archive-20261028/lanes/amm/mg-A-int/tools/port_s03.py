import shutil,os
from pathlib import Path
U=Path.home()/'amm100-run/lanes/mg-union/src/programs/pump-amm/src'
C=Path.home()/'amm100-run/lanes/collect-C/src-step1/programs/pump-amm/src'
cl=(C/'lib.rs').read_text().split('\n')
def cblock(start_pat):
    i=[k for k,x in enumerate(cl) if start_pat in x]; assert len(i)==1,start_pat; i=i[0]
    if cl[i].rstrip().endswith('}') and cl[i].count('{')==cl[i].count('}'): return cl[i:i+1]
    j=i
    while cl[j]!='    }': j+=1
    return cl[i:j+1]
for f in ['incentives.rs','state/volume_accumulator.rs','instructions/token_incentives/mod.rs','instructions/token_incentives/claim.rs','instructions/sweep_fees.rs']:
    shutil.copy(C/f, U/f)
os.remove(U/'cashback.rs'); os.remove(U/'sweep.rs')
m=(U/'instructions/mod.rs').read_text(); assert 'sweep_fees' not in m
(U/'instructions/mod.rs').write_text(m.replace('pub mod boost;\n','pub mod boost;\n\npub mod sweep_fees;\n',1))
L=(U/'lib.rs').read_text().split('\n')
assert L[14]=='mod cashback;' and L[15]=='use cashback::*;', L[14:16]
L[14]=cl[14]; L[15]=cl[15]
assert L[27]=='pub mod sweep;', L[27]
L[27]='pub use instructions::sweep_fees as sweep;'
def repl_handler(name):
    i=[k for k,x in enumerate(L) if f'pub fn {name}(' in x]; assert len(i)==1,name; i=i[0]
    if L[i].rstrip().endswith('}') and L[i].count('{')==L[i].count('}'): j=i
    else:
        j=i
        while L[j]!='    }': j+=1
    L[i:j+1]=cblock(f'pub fn {name}(')
for h in ['claim_token_incentives','close_user_volume_accumulator','sync_user_volume_accumulator','claim_cashback']:
    repl_handler(h)
(U/'lib.rs').write_text('\n'.join(L))
print('s03 applied; lib.rs lines', len(L))
