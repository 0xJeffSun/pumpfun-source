"""Unapplied ordinary-None diagnostic delta only; no build or active-source edits."""
from pathlib import Path
import json,hashlib,difflib
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def compose():
 s=(P/'baseline-admin_cto.rs').read_text();assert H(s.encode())=='d6b4937f03a62c013baca8d93bf1be72f035681e17a6a86e19df204c57cce457'
 zero='No creator fee to collect';rent='Creator account does not have enough rent-exemption lamports'
 assert s.count('if amount==0{None}else{')==2 and s.count('if post_balance<required{None}else{')==1
 after=s.replace('if amount==0{None}else{',f'if amount==0{{msg!("{zero}");None}}else{{').replace('if post_balance<required{None}else{',f'if post_balance<required{{msg!("{rent}");None}}else{{')
 return after,''.join(difflib.unified_diff(s.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs'))
if __name__=='__main__':
 after,patch=compose();(P/'source/programs/pump/src/admin_cto.rs').write_text(after);(P/'proposal.patch').write_text(patch);j=json.loads((P/'source-before.json').read_text());j['programs/pump/src/admin_cto.rs']=H(after.encode());(P/'source-after.json').write_text(json.dumps(j,indent=2,sort_keys=True)+'\n')
