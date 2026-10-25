"""Portable saved-only verification. No compiler, VM, target or network."""
from pathlib import Path
import argparse,collections,gzip,hashlib,importlib.util,json,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def sealed(root,seal=None):
 m=J(root/'manifest.json');actual={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']};assert actual==set(m)
 assert(root/'manifest.sha256').read_text().split()[0]==H(root/'manifest.json');assert seal is None or H(root/'manifest.json')==seal
 for n,v in m.items():assert not(root/n).is_symlink()and H(root/n)==(v['sha256']if isinstance(v,dict)else v),n
 return m

def module(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--accepted-root',type=Path);p.add_argument('--retained-input-gates',action='store_true');args=p.parse_args();sealed(P);Q=P/'reviewed-plan';sealed(Q,'03089fad9517779b1f0d7e176321e6254d9fb8405e924b9d801e4ef8e01542ef');B=P/'build';g=J(Q/'plan.json');allow=J(P/'allowlist.json');assert set(allow['build_top_level_files'])=={f.name for f in B.iterdir()if f.is_file()}
 frozen=J(Q/'audit/frozen-source.json');assert len(frozen)==14
 for root in [Q/'source',B/'source']:
  assert {str(f.relative_to(root)):H(f)for f in root.rglob('*')if f.is_file()}==frozen
 assert J(B/'source-after-compile.json')==frozen;assert J(B/'gate-before.json')==J(B/'gate-after.json');assert J(B/'gate-after.json')['passed'];assert J(B/'copied-registry-before.json')==J(B/'copied-registry-after.json')
 exit=J(B/'controller-exit.json');assert exit['returncode']==0 and exit['failure']is None and len(exit['children'])==8 and exit['new_runtime']==0
 for row in exit['children']:
  assert row['returncode']==0 and H(B/(row['name']+'.stdout'))==row['stdout_sha256']and H(B/(row['name']+'.stderr'))==row['stderr_sha256'];assert J(B/(row['name']+'-exit.json'))==row
 assert not J(B/'backend-diagnostics.json')['forbidden_diagnostics'];assert H(B/'candidate.so')==g['audited_candidate']==H(Q/'audit/build-01/candidate.so');assert H(B/'unstripped.so')==H(Q/'audit/build-01/unstripped.so');assert H(B/'original.so')==g['original_sha256']
 for n,h in allow['copied_external_baseline_subset'].items():assert H(P/n)==h
 # Re-run reviewed saved-only audit and independent consumed-table pointer proof.
 for cmd in [[sys.executable,'-B',str(Q/'audit/verify.py')],[sys.executable,'-B',str(Q/'independent-review/verify.py'),'--packet',str(Q/'audit'),'--accepted-root',str(P)]]:
  r=subprocess.run(cmd,cwd=P,capture_output=True,text=True);assert r.returncode==0,r.stderr
 a=module(Q/'ledger-method/layer01.py','retarget_ledger');O=a.Elf(B/'original.so');C=a.Elf(B/'candidate.so');S=a.Elf(B/'unstripped.so');assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 ledger=json.loads(gzip.decompress((B/'complete-inventory.json.gz').read_bytes()));prior=json.loads(gzip.decompress((Q/'prior-complete-inventory.json.gz').read_bytes()));assert len(ledger['original_rows'])==441
 for old,row in zip(prior['original_rows'],ledger['original_rows']):
  assert(old['id'],old['start'],old['end'],old['scope'],old['raw_sha256'])==(row['id'],row['start'],row['end'],row['scope'],row['raw_sha256']);assert row['raw_sha256']==a.sha(O.b[row['start']:row['end']])
  if row['scope']=='opaque':assert row['body_analysis']is None and not row['fresh_normalized_matches']
  else:assert row['body_analysis']==O.window(row['start'],row['end'])
 groups=collections.defaultdict(set)
 for s in S.symbols:
  if s['info']&15==2 and s['size']>=8 and S.lo<=s['value']<S.hi:groups[(s['value'],s['value']+s['size'])].add(s['name'])
 assert len(groups)==len(ledger['candidate_rows'])==408
 for row,((start,end),names)in zip(ledger['candidate_rows'],sorted(groups.items())):
  assert(row['start'],row['end'],row['names'])==(start,end,sorted(names));assert row['raw_sha256']==a.sha(C.b[start:end])
  if row['scope']=='opaque':assert row['body_analysis']is None and not row['fresh_normalized_matches']
  else:assert row['body_analysis']==C.window(start,end)
 assert sum(r['scope']=='opaque'for r in ledger['original_rows'])==257 and sum(r['scope']=='opaque'for r in ledger['candidate_rows'])==11
 for row in ledger['candidate_rows']:
  if row['body_analysis']is None:continue
  b=row['body_analysis'];matches=[r['id']for r in ledger['original_rows']if r['body_analysis']is not None and r['end']-r['start']==row['end']-row['start']and r['body_analysis']['normalized_sha256']==b['normalized_sha256']and r['body_analysis']['normalization_pattern']==b['normalization_pattern']];assert matches==row['fresh_normalized_matches']
 # Exact frozen matcher, with only actual portable root/path arguments substituted.
 savedargv=sys.argv;sys.argv=[str(Q/'refresh_helpers.py'),str(B),str(P)]
 try:m=module(Q/'refresh_helpers.py','retarget_helpers');computed=m.analyze()
 finally:sys.argv=savedargv
 actual=computed['builds']['v154_retarget'];saved=J(B/'helper-results.json')['builds']['v154_retarget'];assert actual['functions']==saved['functions']and actual['summary']==saved['summary']
 for k in ['candidate','symbol_source']:assert actual[k]['sha256']==saved[k]['sha256']and actual[k]['text_sha256']==saved[k]['text_sha256']
 post=module(Q/'postlink.py','retarget_postlink');assert post.inspect(B/'candidate.so',Q/'sdk/syscalls.txt',(B/'readelf-dyn-symbols.stdout').read_text())==J(B/'sdk-postlink.json');assert J(B/'sdk-postlink.json')['official_driver_check_outcome']=='WARNING_ONLY'
 imp=module(Q/'compare_imports.py','retarget_imports');comparison=J(B/'import-structure-comparison.json');assert json.loads(json.dumps(imp.inspect(B/'original.so')))==comparison['original']and json.loads(json.dumps(imp.inspect(B/'candidate.so')))==comparison['candidate'];assert comparison['undefined_import_sets_equal']
 state=J(B/'pipeline-state.json');assert state['runtime_authorized']is False and state['promotion_authorized']is False and state['syscall_authority_decisive']is False
 if args.accepted_root:
  root=args.accepted_root.resolve();assert H(root/'repro/mayhem/sell-result-error-main-twentyfour/main/candidate.so')==g['accepted_candidate']
  for n,h in frozen.items():assert H(root/'programs/mayhem'/n)==h
 if args.retained_input_gates:
  for n,h in J(Q/'external-inputs.json').items():assert H(Path(n))==h
 print(json.dumps({'passed':True,'candidate':H(B/'candidate.so'),'symbols':H(B/'unstripped.so'),'source14':True,'all8_child_exits0':True,'original_windows':441,'candidate_windows':408,'opaque_original':257,'opaque_candidate':11,'helper_summary':saved['summary'],'sdk':'WARNING_ONLY; authority unresolved','new_runtime':0,'promotion_authorized':False},indent=2))
if __name__=='__main__':main()
