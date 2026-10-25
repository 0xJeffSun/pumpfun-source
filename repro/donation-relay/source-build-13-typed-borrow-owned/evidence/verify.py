"""Portable saved-proof/signature verification only: no target execution."""
from pathlib import Path
import hashlib,json,sys,importlib.util
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,name):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify():
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and not p.name.endswith('-keypair.json')
 for n,h in m.items():assert H(P/n)==h,n
 plan=P/'runtime-plan';assert H(plan/'manifest.json')=='38062cc1152bd78464e1d27693f4435721b4e66263e6939fe858482e603ef71e';load(plan/'run_ordinary.py','unrun_plan_verifier').verify(H(plan/'manifest.json'),P/'repository')
 run=P/'run';assert H(run/'candidate.so')=='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244';assert J(run/'controller-exit.json')['returncode']==J(run/'runner-exit.json')['returncode']==0
 assert H(run/'ordinary/adapter.py')==H(plan/'run_ordinary.py');assert (run/'ordinary/verify.py').read_bytes()==(plan/'saved-verify.py').read_bytes()
 result=load(run/'ordinary/verify.py','unchanged_saved_verifier').verify(P/'repository',runtime=True);assert result==J(run/'saved-verification.json');assert result['cases']==12 and result['transaction_submissions']==24 and result['encoded_signature_fields_checked']==50 and result['effects_checked']==24
 after=J(P/'canonical-after.json');assert after['all_payload_hashes_match'] and after['current_matches_pre_runtime_static_record'];assert after['manifest_sha256']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a';assert after['current']['candidate_sha256']=='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e'
 return dict(result,new_target_executions=0,new_borrow_failure_coverage=0,current_selection_changed=False,whole_original_byte_equality=False)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
