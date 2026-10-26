"""UNEXECUTED runtime-only ordinary12 controller; requires separate approval."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys,shutil,traceback,datetime
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
CREATED=None
C='e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244'
def load(p,name):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(seal,repo):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(P/n)==h,n
 S=P/'static-proof';assert H(S/'manifest.json')=='aaf31657de951430a0d3fcd0f14e8887d1d851e06aa08265b1da8ec4074a9e1c';load(S/'verify.py','static_proof').main()
 assert H(S/'static/candidate.so')==C and H(S/'static/unstripped.so')=='2df866f5a9a629199ba856861fa3bf9ed03e8f1a265eadc5c5a990589d547596'
 proposal=repo/'repro/donation-relay/local-validation-proposal';assert H(proposal/'manifest.json')==H(P/'frozen-proposal/manifest.json')=='2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c';pm=J(proposal/'manifest.json')['files']
 for n,h in pm.items():assert H(proposal/n)==h==H(P/'frozen-proposal'/n),n
 assert H(proposal/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b'
 assert (P/'saved-verify.py').read_text()==(P/'saved-verify.original.py').read_text().replace('6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e',C)
 return proposal

def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');args=a.parse_args();R=args.repo.resolve();proposal=verify(args.reviewed_plan_sha256,R)
 if not args.execute:print('PASS UNEXECUTED preflight; runtime0');return
 assert args.output is not None;D=args.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D=D.resolve();D.relative_to(R/'work');assert not D.exists() and D!=P and P not in D.parents;D.mkdir();O=D/'ordinary';O.mkdir();code=1
 global CREATED
 CREATED=D
 def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
 # Same accepted saved verifier parent layout; only candidate binding changed.
 shutil.copyfile(P/'static-proof/static/candidate.so',D/'candidate.so');(D/'launcher').mkdir();save(D/'launcher/resolved-source-sha256.json',J(P/'static-proof/plan-freeze.json')['source']);shutil.copyfile(Path(__file__),O/'adapter.py');shutil.copyfile(P/'saved-verify.py',O/'verify.py')
 save(D/'controller-launch.json',{'plan_sha256':args.reviewed_plan_sha256,'static_proof_sha256':H(P/'static-proof/manifest.json'),'controller_sha256':H(Path(__file__)),'attempt_limit':1,'group':'ordinary','new_borrow_failure_coverage':0})
 try:
  m=load(proposal/'harness_proposal.py','unchanged_relay_harness');old=dict(m.EXPECTED);m.EXPECTED=dict(old,candidate=C)
  save(O/'launch.json',{'time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'adapter_sha256':H(O/'adapter.py'),'harness_path':str((proposal/'harness_proposal.py').relative_to(R)),'harness_sha256':H(proposal/'harness_proposal.py'),'proposal_seal':H(proposal/'manifest.json'),'original_expected':old,'runtime_expected':m.EXPECTED,'only_harness_adaptation':'Candidate SHA-256 binding only; unchanged ordinary12 fixtures/effects/signatures/history/PDA controls.','group':'ordinary','source_map':J(D/'launcher/resolved-source-sha256.json')})
  m.execute(R,D/'candidate.so','ordinary',O/'ordinary.json');code=0
 except BaseException as exc:
  code=exc.code if isinstance(exc,SystemExit) and isinstance(exc.code,int) else 1;(O/'failure.txt').write_text(traceback.format_exc())
 finally:
  save(O/'process-result.json',{'returncode':code,'harness_unchanged':H(proposal/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b','candidate_unchanged':H(D/'candidate.so')==C,'report_exists':(O/'ordinary.json').exists()})
  save(D/'runner-exit.json',{'returncode':code,'runtime_group':'ordinary','no_retry':True})
 if code:raise SystemExit(code)
 # Fresh ordinary subpacket exact manifest required by unchanged saved assertions.
 files={str(p.relative_to(O)):H(p) for p in O.rglob('*') if p.is_file()};save(O/'manifest.json',files);(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n')
 try:
  saved=load(O/'verify.py','saved_relay_verifier').verify(R,runtime=True);save(D/'saved-verification.json',saved);verify(args.reviewed_plan_sha256,R)
 except BaseException:
  (D/'saved-verification-failure.txt').write_text(traceback.format_exc());raise
if __name__=='__main__':
 code=0
 try:main()
 except BaseException as exc:
  code=exc.code if isinstance(exc,SystemExit) and isinstance(exc.code,int) else 1
  if CREATED is not None:(CREATED/'controller-failure.txt').write_text(traceback.format_exc())
  raise
 finally:
  if CREATED is not None:(CREATED/'controller-exit.json').write_text(json.dumps({'returncode':code,'one_runtime_attempt':True})+'\n')
