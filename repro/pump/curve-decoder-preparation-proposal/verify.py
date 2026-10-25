#!/usr/bin/env python3
"""Portable static source-proposal verification. No compiler/VM/network."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
from review import run
from compose_connected import outputs
from fences import run as fence_run
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 q=PurePosixPath(n);assert not q.is_absolute()and '..'not in q.parts and '__pycache__'not in q.parts and q.suffix!='.pyc'and not q.name.endswith('-keypair.json')
 p=P/q;assert not p.is_symlink();return p.read_bytes()
def obj(n):return json.loads(raw(n))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args()
 m=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 actual={p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']};assert actual==set(m)
 for n,v in m.items():b=raw(n);assert H(b)==v['sha256']and len(b)==v['bytes'],n
 for name,v in obj('prior-origins.json').items():
  assert H(raw('prior/'+name+'/manifest.json'))==v['manifest_sha256']
  r=subprocess.run([sys.executable,'-B',str(P/'prior'/name/'verify.py')],text=True,capture_output=True)
  assert r.returncode==0,r.stdout+r.stderr
 source=obj('current-source-sha256.json');assert len(source)==37
 for n,h in source.items():
  assert H(raw('inputs/source/'+n))==h
  if a.repo:assert H((a.repo/n).read_bytes())==h,n
 for n,v in obj('input-bindings.json').items():
  assert H(raw(v['snapshot']))==v['sha256']
  if a.repo:assert H((a.repo/n).read_bytes())==v['sha256'],n
 ownership=obj('accepted-input-ownership.json');assert ownership['verified_binding_count']==195
 assert sum(len(x)for x in ownership['groups'].values())==195 and ownership['groups']['source']==source
 if a.repo:
  assert H((a.repo/ownership['origin']).read_bytes())==ownership['origin_sha256']
  for group,rows in ownership['groups'].items():
   for n,h in rows.items():
    assert not n.endswith('-keypair.json');assert H((a.repo/n).read_bytes())==h,(group,n)
 assert run()==obj('integration-ledger.json')
 for n,s in outputs().items():assert raw(n).decode()==s,n
 f=fence_run();assert f==obj('fence-ledger.json')
 before=source.copy();after=before.copy();sm=obj('proposal/source-map.json')
 assert set(sm)=={'programs/pump/src/'+n for n in ['trade_types.rs','trade.rs','multi_hop_curve.rs']}
 for n,v in sm.items():assert v['before_sha256']==before[n];after[n]=H(raw('proposal/source/'+n));assert after[n]==v['after_sha256']
 assert after==obj('proposed-source-sha256.json')and len(after)==37
 plan=obj('build-and-regression-plan.json');assert plan['builds']==1 and plan['retries']==plan['variants']==0
 assert plan['runtime_plan']['total_differential_comparisons']==9269 and plan['runtime_plan']['surfpool_comparisons']==1024
 assert plan['runtime_plan']['baseline_cases']+sum(x['cases']for x in plan['runtime_plan']['additional_existing'])==9269
 result=obj('result.json');assert result['source_proposal_ready']and not any(result[x]for x in ['built','runtime_performed','main_edited','fence_removed','full_buy_v3_integration','full_original_equality'])
 print(json.dumps({'status':'PASS','payloads':len(m),'source_inputs':37,'accepted_input_bindings':195,'changed_files':3,'trait_fields':4,'affected_entrypoints':6,'new_static_windows':13,'original_preparation_callers':14,'existing_fences':sum(len(x['before'])for x in f['files']),'preserved_buy_rows':117,'compiled':False,'runtime_performed':False,'main_edited':False},indent=2))
if __name__=='__main__':main()
