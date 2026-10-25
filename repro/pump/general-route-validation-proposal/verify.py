#!/usr/bin/env python3
from pathlib import Path
import argparse,ast,hashlib,json,tarfile
P=Path(__file__).resolve().parent;sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();load=lambda p:json.loads((P/p).read_text())
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);p.add_argument('--source-root',type=Path);a=p.parse_args()
m=load('manifest-sha256.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest-sha256.json'};assert actual==set(m)
for name,d in m.items():assert sha(P/name)==d['sha256']and(P/name).stat().st_size==d['bytes'],name
s=(P/'harness/pump_general_route_differential.py').read_text();tree=ast.parse(s)
assert not any(x in s for x in ['with_sigverify','with_blockhash_check','with_transaction_history'])
for n in ast.walk(tree):
 if isinstance(n,ast.Call)and isinstance(n.func,ast.Name)and n.func.id=='LiteSVM':assert not n.args and not n.keywords
old_tree=ast.parse((P/'prior-v3-driver.py').read_text())
old_functions={n.name:ast.dump(n,include_attributes=False)for n in old_tree.body if isinstance(n,ast.FunctionDef)}
new_functions={n.name:ast.dump(n,include_attributes=False)for n in tree.body if isinstance(n,ast.FunctionDef)}
assert set(new_functions)-set(old_functions)=={'route_instructions','compute_instruction_binding'} and not set(old_functions)-set(new_functions)
for name in old_functions:
 if name not in ['unsigned_plan','invoke']:assert old_functions[name]==new_functions[name],name
old_invoke=next(n for n in old_tree.body if isinstance(n,ast.FunctionDef)and n.name=='invoke')
new_invoke=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='invoke')
assert [ast.dump(n,include_attributes=False)for n in ast.walk(old_invoke)if isinstance(n,ast.Assert)]==[ast.dump(n,include_attributes=False)for n in ast.walk(new_invoke)if isinstance(n,ast.Assert)]
assert "source_root=str(source_root),relative_source_sha256=relative_source" in s
assert "{k:v for k,v in before.items()if k!='candidate'}==saved" in s
plan=load('unsigned-packet-plan.json');result=load('unsigned-plan-result.json');assert plan['case_count']==result['case_count']==16 and result['runtime_executions']==result['signatures_created']==0
assert result['maximum_packet_bytes']==1128
assert 'COMPUTE_UNIT_LIMIT=600_000'in s and 'set_compute_unit_price'not in s and '.with_compute_budget'not in s
for row in plan['case_rows']:
 assert row['expected_signed_transaction_bytes']==row['unsigned_transaction_bytes']==1128 and row['expected_signatures']==1 and row['expected_pump_accounts']==28
 assert row['case']['depth']==3 and row['case']['flags']==([2,0,1]if row['case']['sell']else[1,0,2])
 assert sum(x['signer']for x in row['outer_metas'])==1 and not row['outer_metas'][3]['signer']
 assert row['compute_budget_instruction']=={'instruction_index':0,'amm_instruction_index':1,'program_id':'ComputeBudget111111111111111111111111111111','data_hex':'02c0270900','accounts':[],'compute_unit_limit':600000}
 assert len(row['compiled_instructions'])==2 and row['compiled_instructions'][0]=={'program_id':'ComputeBudget111111111111111111111111111111','data_hex':'02c0270900','account_indices':[]}
 assert row['compiled_instructions'][1]['program_id']=='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
comp=load('build-comparison.json');attempt=load('build-attempt.json');source=load('source-sha256.json');assert len(source)==36
assert attempt['returncode']==0 and attempt['source_unchanged']and comp['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
assert {p.removeprefix('work/pump-general-route-recovery/run-01/source/'):h for p,h in comp['source_sha256'].items()}==source
assert source['programs/pump/src/multi_hop_curve.rs']=='55c6441320779ff06357831cf081b4a6da8267750c7a5f185d89e1f3e803980f'
assert comp['comparison']['candidate_sha256']=='5cc1ee21860551e09a4ce1de2d1148f7f4ce22c1fbe0ed7147317c17026c4198'
if a.repo:
 for p,h in load('repository-inputs.json').items():assert sha(a.repo/p)==h,p
 assert a.source_root,'Explicit --source-root required with --repo'
 for p,h in source.items():assert sha(a.source_root/p)==h,p
 assert sha(a.repo/'work/pump-general-route-recovery/run-01/build-01/artifacts/pump_recovered.so')==comp['comparison']['candidate_sha256']
with tarfile.open(P/'v3-failed-original-attempt.tar.gz')as t:
 raw=t.extractfile('original-v3-run-01/manifest-sha256.json').read();assert hashlib.sha256(raw).hexdigest()=='0a235240e8e89b5d5fddb3e8023dd1723e9d3a09dd59673331515061495ae705';prior=json.loads(raw)
 for n,d in prior.items():assert hashlib.sha256(t.extractfile('original-v3-run-01/'+n).read()).hexdigest()==d['sha256']
assert load('static-binding-check.json')['all_pass']
print(json.dumps(dict(pass_=True,payloads=len(m),proposed_cases=16,unsigned_packet_bytes=1128,compute_unit_limit=600000,v4_runtime_executions=0,prior_failed_original_executions=1,signatures_created=0)))
