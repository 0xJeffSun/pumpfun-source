"""Static work-only bridge proposal checks. No active/current helper execution."""
from pathlib import Path
import argparse,ast,hashlib,json
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def verify(repo=None):
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h
 g=J(P/'plan.json');assert g['status']=='BOUND_WORK_ONLY_INLINE_BRIDGE_ROOT_REVIEW_REQUIRED'and g['active_writes']is False
 before=(P/'before/scripts/verify_current_checkpoint.py').read_text();after=(P/'proposed/scripts/verify_current_checkpoint.py').read_text()
 prior=P/'history/prior-two-script-2786';assert H(prior/'manifest.json')==g['prior_two_script_proposal_seal'];bridge=(prior/'proposed/scripts/verify_amm_owner6048_checkpoint.py').read_text()
 constants="PUBLIC='"+bridge.split("PUBLIC='",1)[1].split("TRANSITION='",1)[0];helpers='def safe(root,rel):'+bridge.split('def safe(root,rel):',1)[1].split('def verify(root):',1)[0];body=bridge.split('def verify(root):\n',1)[1].split("if __name__=='__main__':",1)[0]
 inline='def _verify_amm_owner6048(root):\n'+''.join(' '+line+'\n'for line in constants.rstrip().splitlines())+' H=sha;J=read\n'+''.join(' '+line+'\n'for line in helpers.rstrip().splitlines())+body+'\n'
 expected=before.replace('import argparse\n','import argparse\nimport base64\n');expected=expected.replace('def verify(program, root):\n',inline+'\n'+'def verify(program, root):\n');needle="    name = status['candidate_artifact'][:-len(suffix)]\n";insert="    if program == 'pump_amm' and name == 'repro/pump_amm/owner6048-v144':\n        return _verify_amm_owner6048(root)\n";expected=expected.replace(needle,needle+insert)
 assert before.count(needle)==1 and after==expected;assert H(P/'before/scripts/verify_current_checkpoint.py')==g['dispatcher_before_sha256']and H(P/'proposed/scripts/verify_current_checkpoint.py')==g['dispatcher_proposed_sha256']
 assert{p.name for p in(P/'proposed/scripts').iterdir()}=={'verify_current_checkpoint.py'}
 tree=ast.parse(after);fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='_verify_amm_owner6048');constants={n.targets[0].id:n.value.value for n in fn.body if isinstance(n,ast.Assign)and isinstance(n.targets[0],ast.Name)and isinstance(n.value,ast.Constant)}
 for name,key in [('PUBLIC','public_relative_path'),('PUBLIC_SEAL','public_manifest_sha256'),('READER','public_reader_sha256'),('CANDIDATE','candidate_sha256'),('SYMBOLS','symbols_sha256'),('README','README_proposed_sha256'),('STATUS','AMM_status_canonical_sha256'),('SOURCE30','source30_sha256')]:assert constants[name]==g[key],name
 assert H(P/'witness/public-manifest.json')==g['public_manifest_sha256'];pub=J(P/'witness/public-manifest.json');assert pub['verify_public.py']==g['public_reader_sha256'];assert J(P/'witness/assembler-exit.json')['returncode']==0 and J(P/'witness/assembler-exit.json')['public_manifest_sha256']==g['public_manifest_sha256'];assert J(P/'witness/strict-saved-verification-exit.json')['returncode']==0
 assert H(P/'witness/README.proposed.md')==g['README_proposed_sha256']and H(P/'witness/source30.json')==g['source30_sha256']and len(J(P/'witness/source30.json'))==30
 status=J(P/'witness/status.proposed.json')['pump_amm'];assert hashlib.sha256(json.dumps(status,sort_keys=True,separators=(',',':')).encode()).hexdigest()==g['AMM_status_canonical_sha256']
 assert status['candidate_sha256']==g['candidate_sha256']and status['candidate_artifact']==g['public_relative_path']+'/main/candidate.so'
 if repo:
  assert H(repo/'scripts/verify_current_checkpoint.py')==g['dispatcher_before_sha256'];assert not(repo/'scripts/verify_amm_owner6048_checkpoint.py').exists()
  for n,h in J(P/'witness/source30.json').items():assert H(repo/n)==h,n
 return {'status':'PASS_WORK_ONLY_EXPLICIT_CURRENT_BRIDGE_PROPOSAL','bound_public_seal':g['public_manifest_sha256'],'changed_existing_script_files':1,'new_top_level_script_files':0,'all_legacy_dispatch_bytes_preserved':True,'source30_witness_bound':True,'exact_AMM_status_and_README_bound':True,'active_writes':False,'proposed_bridge_executed':False,'public_verifier_invoked':False,'target_executions':0,'new_builds':0,'current_before_helper_checked':bool(repo)}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);x=a.parse_args();print(json.dumps(verify(x.repo),indent=2))
