"""Portable saved-only full inventory/source/bounded semantic verification."""
from pathlib import Path
import json,hashlib,struct,gzip,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def tree(D,seal=None):
 assert H(D/'manifest.json')==(D/'manifest.sha256').read_text().split()[0]
 if seal:assert H(D/'manifest.json')==seal
 m=J(D/'manifest.json');assert set(m)=={str(p.relative_to(D)) for p in D.rglob('*') if p.is_file() and p not in[D/'manifest.json',D/'manifest.sha256']}
 for p in D.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and not p.name.endswith('-keypair.json')
 for n,h in m.items():assert H(D/n)==h,n

def verify():
 tree(P);plan=P/'reviewed-plan';tree(plan,'376e1c9e57a1cf4c24c0d3a7581e3806e6d696a4f65547830be625f24fbe154f');z=J(plan/'freeze.json');source={str(p.relative_to(P/'source')):H(p) for p in(P/'source').rglob('*') if p.is_file()};assert source==z['source'] and len(source)==23;assert [n for n,h in source.items() if h!=z['baseline_source'][n]]==['src/arithmetic.rs','src/handlers.rs']
 assert H(P/'static/candidate.so')=='33d5264b90d9a32556918072837cfe9cff284c369b15c3e31c32344125d06cb6';assert H(P/'static/unstripped.so')=='1933d743aa3d8ef459e7e9acd580f4209fd2b264c8ce8e62b0d10df2af0fe656'
 assert J(P/'controller-exit.json')['returncode']==J(P/'build-records/build-result.json')['returncode']==0;assert not J(P/'backend-diagnostics.json')['failures'];after=J(P/'independent-after-gates.json');assert not after['failed'] and all(x['passed'] for x in after['checks'].values());assert after['checks']['source23']['observed']==source;assert after['checks']['SDK53']['observed']==J(plan/'launcher/tool-witness/sdk-files.json');assert after['checks']['full_existing_tool_cache_bytes']['observed']==J(plan/'complete-existing-cache-snapshots.json')
 actual_fp=J(P/'build-records/actual-root-fingerprint.json');baseline_fp=J(plan/'accepted-e575-root-fingerprint.json')
 for key in ['rustflags','features','profile','compile_kind','rustc']:assert actual_fp[key]==baseline_fp[key],key
 expected_deps={r['name']+'-'+r['version']:r['files'] for r in J(plan/'launcher/resolved-source-archive-equality.json')}
 for r in after['checks']['extracted_dependencies']['observed']:assert r['files']==expected_deps[r['package']]
 for ns,m in after['checks']['private_cache_archives']['observed'].items():
  for n,h in m.items():assert H(plan/'launcher/registry/archives'/n)==h
 runner=J(P/'root-observed/relay25-weights-order-build-runner-exit.json');assert runner['returncode']==runner['standalone_backend_gate_returncode']==0 and runner['actual_terminal_completion_observed'];assert H(P/'root-observed/relay25-weights-order-build.stdout')==runner['stdout_sha256'] and H(P/'root-observed/relay25-weights-order-build.stderr')==runner['stderr_sha256'];assert H(P/'root-observed/relay25-weights-order-backend.stdout')==runner['backend_gate_stdout_sha256'];backend=J(P/'root-observed/relay25-weights-order-backend.stdout');assert backend['diagnostic_gate_passed'] and backend['backend_error_count']==0
 for r in backend['logs']:
  name=Path(r['input']).name;assert H(P/'build-records'/name)==r['input_sha256']
 spec=importlib.util.spec_from_file_location('same_method',plan/'method/analyze.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a);computed=a.analyze(P/'static')
 for n,value in computed.items():
  p=P/'static'/n;actual=json.loads(gzip.decompress(p.read_bytes()) if n.endswith('.gz') else p.read_bytes());assert value==actual,n
 e=a.Elf((P/'static/unstripped.so').read_bytes());ins=lambda pc:struct.unpack('<BBhi',e.at(pc,8))
 def call(pc,target):
  op,r,off,imm=ins(pc);assert op==133 and pc+8+imm*8==target
 assert ins(56064)==(98,8,16,6025) and ins(56184)==(98,8,16,6030);assert ins(56312)==(103,4,0,1);assert ins(56456)==(7,1,0,32);assert ins(56488)==(105,16,0,0) and ins(56496)==(107,4,0,0);assert ins(56504)==(7,1,0,36) and ins(56512)==(7,4,0,2);call(56568,43344)
 assert ins(56560)==(191,100,0,0);assert ins(44136)==(105,34,0,0) and ins(43928)==(7,2,0,2);assert ins(43408)==(103,2,0,3) and ins(43648)==(39,2,0,24)
 assert ins(44656)[0]==0xad;op,r,off,imm=ins(44672);assert op==0x1d and 44672+8+off*8==49368
 for pc in range(49368,49424,8):assert ins(pc)[0]!=133
 assert ins(49416)[0]==0x95
 roles=J(P/'bounded-role-comparisons.json');assert next(r for r in roles if 'insertion_sort' in r['role_token'])['normalized_equal'];assert [r['after']['bytes'] for r in roles[:2]]==[6456,3032]
 summary=J(P/'static/comparison-summary.json');assert summary['original_inferred_windows']==492 and summary['candidate_symbol_windows']==330 and summary['original_normalized_match_windows']==122 and summary['original_raw_match_windows']==33 and summary['unmatched_original_windows']==370 and not summary['whole_file_equal']
 return {'status':'PASS_BOUNDED_STATIC','candidate_sha256':H(P/'static/candidate.so'),'source_inputs':23,'caller_bytes':3032,'arithmetic_bytes':6456,'u16_materialization_after_both_guards':True,'read_only_u16_input_supported':True,'no_sort_on_no_leftover':True,'full_inventory_recomputed':True,'normalized_matches':122,'unmatched_original':370,'out_of_domain_error_gap_retained':True,'original58_59_or_rejected9d_decoded':False,'runtime_executions':0}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
