"""UNEXECUTED: one root-approved build/static inventory; no runtime path exists."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys,shutil,re,traceback,gzip
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,name):s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def save(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');args=a.parse_args()
 load(P/'verify_plan.py','plan').verify(args.reviewed_plan_sha256)
 R=args.repo.resolve();baseline=R/'repro/donation-relay/source-build-12-idl-discriminator-owned';z=J(P/'freeze.json');assert H(baseline/'manifest.json')==z['checkpoint']
 for n,h in z['baseline_source'].items():assert H(baseline/'source'/n)==h
 baseline_manifest=J(P/'checkpoint-manifest.json')
 expected_candidate='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e'
 expected_symbols='af100c573ed3d97304590328200c764d01f9a87980babbc1e4004ed9e25637cf'
 assert baseline_manifest['candidate.so']==H(baseline/'candidate.so')==expected_candidate
 assert baseline_manifest['unstripped.so']==H(baseline/'unstripped.so')==expected_symbols
 current=J(R/'repro/donation-relay/current.json')
 assert current['evidence_manifest_sha256']==z['checkpoint']
 assert current['candidate_sha256']==expected_candidate and current['symbols_sha256']==expected_symbols
 prefix='repro/donation-relay/source-build-12-idl-discriminator-owned/'
 for key,tail in [('candidate_artifact','candidate.so'),('source_snapshot','source'),('source_manifest','launcher/resolved-source-sha256.json'),('evidence_manifest','manifest.json')]:assert current[key]==prefix+tail
 assert current['full_original_byte_equality']is False
 launcher=load(P/'launcher/relay_build_once.py','relay_launcher');launcher.preflight()
 if not args.execute:print('PASS preflight only: no build/static output/runtime written');return
 assert args.output is not None;D=launcher.no_link_chain(args.output.resolve());D.relative_to(R/'work');assert D!=P and P not in D.parents and not D.exists();D.mkdir(parents=True)
 save(D/'controller-launch.json',{'reviewed_plan_sha256':args.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'source':z['source'],'baseline_checkpoint':z['checkpoint'],'attempt_limit':1,'runtime_authorized':False})
 exitcode=0
 try:
  launcher.execute(D/'attempt')
  assert J(D/'attempt/build-result.json')['returncode']==0
  diagnostics=(D/'attempt/build.stdout').read_text(errors='replace')+'\n'+(D/'attempt/build.stderr').read_text(errors='replace');bad=[s for s in diagnostics.splitlines()if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',s,re.I)];save(D/'backend-diagnostics.json',{'failures':bad});assert not bad
  # Existing unchanged static method emits every full original/candidate call/data/function/residual row.
  Q=D/'static';Q.mkdir()
  for n in['original.so','original-windows.json']:shutil.copyfile(P/'method'/n,Q/n)
  for n in['candidate.so','unstripped.so']:shutil.copyfile(D/'attempt/retained'/n,Q/n)
  method=load(P/'method/analyze.py','relay_inventory');method.write(Q)
  elf=method.Elf((Q/'unstripped.so').read_bytes());rows=J(Q/'candidate-function-ledger.json');typed=[f for f in rows if any('idl5typed' in n for n in f['names'])];assert len(typed)==1
  selected={typed[0]['start']};by={f['start']:f for f in rows}
  selected.update(c['target']for c in typed[0]['direct_calls']if c['target']in by)
  dis=load(P/'method/disasm.py','relay_disasm');(Q/'typed-borrow').mkdir()
  for pc in sorted(selected):f=by[pc];(Q/'typed-borrow'/f'{pc}.asm').write_text(dis.render(elf,f['start'],f['end']))
  save(Q/'typed-borrow-review-pending.json',{'scope':'Complete typed body and direct targets retained; precise new borrowed failure conversion/name/log/drop order requires root static review before separate runtime authorization.','full_rows':[by[pc]for pc in sorted(selected)],'runtime_cases':0,'emitted_order_accepted':False})
  # No restoration, source repair, extra compiler attempt or target harness is performed.
  load(P/'verify_plan.py','plan_after').verify(args.reviewed_plan_sha256)
  assert all(H(baseline/'source'/n)==h for n,h in z['baseline_source'].items())
  save(D/'build-only-result.json',{'build_success':True,'candidate_sha256':H(Q/'candidate.so'),'symbols_sha256':H(Q/'unstripped.so'),'source_inputs':23,'source_after':J(D/'attempt/build-result.json')['source_after'],'static_inventory_complete':True,'static_emitted_acceptance_pending':True,'runtime_authorized':False,'new_target_executions':0})
 except BaseException:
  exitcode=1;(D/'controller-failure.txt').write_text(traceback.format_exc());raise
 finally:save(D/'runner-exit.json',{'returncode':exitcode,'one_attempt_limit':True,'runtime_executions':0})
if __name__=='__main__':main()
