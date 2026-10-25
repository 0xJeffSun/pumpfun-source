from pathlib import Path
import hashlib,json,difflib
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run():
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 assert {p.name for p in P.iterdir()if p.is_file()and p.name not in ['manifest.json','manifest.sha256']}==set(m)
 for n,h in m.items():assert H(P/n)==h
 before=(P/'before.rs').read_text();after=(P/'admin_cto.rs').read_text();assert H(P/'before.rs')=='a373bc50f3a204997cb3b739045f43460640ef6c9112f9315d622895c63ef4f8'
 old=''' a.bonding_curve.creator=target;
 a.bonding_curve.is_holder_reward=holder;
 a.bonding_curve.is_cashback_coin=cashback;
 if let Some(f)=fee{a.bonding_curve.creator_fee_bps=f;}
 a.bonding_curve.can_edit_creator_fee=false;
'''
 new=''' {
  let curve=&mut ctx.accounts.bonding_curve;
  curve.creator=target;
  curve.is_holder_reward=holder;
  curve.is_cashback_coin=cashback;
  if let Some(f)=fee{curve.creator_fee_bps=f;}
  curve.can_edit_creator_fee=false;
 }
 let a=&ctx.accounts;
'''
 assert before.replace('let a=&mut *ctx.accounts;let old_fee=','let a=&ctx.accounts;let old_fee=').replace(old,new)==after
 assert ''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs'))==(P/'repair.patch').read_text()
 return {'status':'PASS','scope':'Exactly borrow-scope substitutions; original field values/order and all other bytes retained','builds':0,'target_executions':0}
if __name__=='__main__':print(json.dumps(run(),indent=2))
