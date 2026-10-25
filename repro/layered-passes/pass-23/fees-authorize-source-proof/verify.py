from pathlib import Path
import json,hashlib,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=(P/'before.rs').read_text();b=(P/'proposal.rs').read_text();old='  require_keys_eq!(creator,ctx.accounts.payer.key(),FeeError::NotAuthorized);';new='  require!(ctx.accounts.payer.key()==ctx.accounts.global.admin_set_creator_authority || creator==ctx.accounts.payer.key(),FeeError::NotAuthorized);';assert a.count(old)==1 and b==a.replace(old,new)
assert b.index('if ctx.accounts.sharing_config.version!=0')<b.index('let creator=if graduated')<b.index(new)<b.index('let state=&mut')
s=(P/'anchor-macros.rs').read_text();req=s[s.index('macro_rules! require {'):s.index('macro_rules! require_eq')];keys=s[s.index('macro_rules! require_keys_eq'):s.index('macro_rules! require_keys_neq')if 'macro_rules! require_keys_neq'in s else s.index('macro_rules! require_keys_neq')];assert '.with_pubkeys'in keys and '.with_pubkeys'not in req
assert H(P/'original-proof/manifest.json')==json.loads((P/'bindings.json').read_text())['original_proof_seal']
p=subprocess.run([sys.executable,'-B',str(P/'original-proof/verify.py')],capture_output=True,text=True);assert p.returncode==0,p.stderr
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'changed_files':1,'constructor':'source-bearing plain require; no with_pubkeys','baseline':'6a1f3f','builds':0,'target_executions':0}))
