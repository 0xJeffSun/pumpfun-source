#!/usr/bin/env python3
"""Portable saved-data verifier. No target execution, build, network or signing."""
from pathlib import Path,PurePosixPath
import argparse,ast,base64,gzip,hashlib,importlib.util,json,re,struct,subprocess,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def safe(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json'),n;return p
def raw(n):p=P/safe(n);assert not p.is_symlink();return p.read_bytes()
def obj(n):
 b=raw(n);return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def tar_map(n):
 out={}
 with tarfile.open(P/n)as t:
  for m in t:
   safe(m.name);assert m.isfile()and m.name not in out;out[m.name]=H(t.extractfile(m).read())
 return out
def load(n,name):
 s=importlib.util.spec_from_file_location(name,P/n);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def transactions(v):
 if isinstance(v,dict):
  if isinstance(v.get('transaction_base64'),str):yield v['transaction_base64']
  for k,x in v.items():
   if k!='transaction_base64':yield from transactions(x)
 elif isinstance(v,list):
  for x in v:yield from transactions(x)
def signatures(v):
 from solders.transaction import VersionedTransaction
 count=sigs=0
 for enc in transactions(v):
  b=base64.b64decode(enc);tx=VersionedTransaction.from_bytes(b);assert bytes(tx)==b and all(tx.verify_with_results());count+=1;sigs+=len(tx.signatures)
 return {'transactions':count,'signatures':sigs}
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,help='Additionally verify unchanged current baseline source and maintained inputs.');a=ap.parse_args()
 manifest=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 files=set()
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']:files.add(p.relative_to(P).as_posix())
 assert files==set(manifest),(files-set(manifest),set(manifest)-files)
 for n,v in manifest.items():b=raw(n);assert v=={'sha256':H(b),'bytes':len(b)},n
 assert H(raw('approved-proposal/manifest.json'))=='41672b9dcd98b09da36f25261230a8e3c2cf0d1ec3ee2b8f2807703c7e073982'
 pr=subprocess.run([sys.executable,'-B',str(P/'approved-proposal/verify.py')],cwd='/',capture_output=True,text=True);assert pr.returncode==0,pr.stdout+pr.stderr
 source=obj('source-sha256.json');baseline=obj('baseline-source-sha256.json');change=obj('source-change-map.json');assert len(source)==len(baseline)==37 and len(change)==1
 assert tar_map('source-snapshot.tar.gz')==source
 for n,h in source.items():assert H(raw('source/'+n))==h,n
 assert {n for n in source if source[n]!=baseline[n]}==set(change)
 for n,v in change.items():assert source[n]==v['after_sha256']and baseline[n]==v['before_sha256']and raw('source/'+n)==raw('approved-proposal/proposal/trade.rs')
 assert baseline['programs/pump/src/trade.rs']==H(raw('approved-proposal/before/trade.rs'))
 b=obj('build/build-comparison.json');attempt=obj('build/build-attempt.json');actual=b['source_sha256']
 assert actual==attempt['source_sha256']==attempt['source_after_sha256']==obj('actual-source-sha256.json')
 assert {n[n.index('programs/pump/'):]:h for n,h in actual.items()}==source
 assert attempt['source_unchanged']and attempt['returncode']==0
 assert H(gzip.decompress(raw('build/build.log.gz')))==attempt['build_log_sha256']==b['build_log_sha256']
 result=obj('build-result.json');assert result['returncode']==0 and result['source_unchanged']and result['main_source_unchanged']and result['tool_hashes_unchanged']and not result['backend_stack_failures']and result['retries']==result['source_repairs']==0
 assert not b['comparison']['full_byte_equality']
 assert H(raw('candidate.so'))==b['comparison']['candidate_sha256']=='bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314'
 phases=obj('toolchain-phases.json');assert phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'and phases['compile']['before']==phases['compile']['after']
 assert phases['candidate']['sha256']==H(raw('candidate.so'))and phases['symbols']['sha256']==H(raw('unstripped.so'))
 assert phases['sdk_source_sha256']==obj('sdk-source-sha256.json')==b['sdk_source_sha256']
 assert obj('dependency-before.json')==obj('dependency-after.json')and obj('dependency-before.json')['files']==14281
 assert tar_map('prebuild-snapshot.tar.gz')=={n:h for n,h in obj('prebuild-manifest-sha256.json').items() if n not in obj('prebuild-snapshot-exclusions.json')}
 for n,h in obj('build-helper-sha256.json').items():assert H(raw('build-helpers/'+n))==h
 meta=load('analyze_fresh.py','metadata_fresh');fresh,inventory=meta.run();assert fresh==obj('fresh-metadata.json')and inventory==obj('before-after-inventory.json')
 assert all(x['full_normalized_equal']for x in fresh['metadata_windows'])and not fresh['full_original_byte_equality']
 closure=load('metadata_closure.py','metadata_closure');c=closure.run();assert c==obj('metadata-closure.json')
 assert [x['actual_target_full_pattern_matches']for x in c['roles']]==[1,19,38,4]
 full=load('full_inventory.py','full_inventory');inv=full.run();assert inv==obj('full-before-after-inventory.json.gz')
 assert inv['before']['summary']['candidate_with_pattern']==493 and inv['after']['summary']['candidate_with_pattern']==493
 assert inv['before']['summary']['candidate_with_call_consistent_pattern']==427 and inv['after']['summary']['candidate_with_call_consistent_pattern']==427
 # Fresh complete serializer1840/all25/consumed discriminator proof, no stale offsets.
 from elf_reader import Elf
 o=Elf(P/'static-inputs/original.so');e=Elf(P/'candidate.so');s=Elf(P/'unstripped.so');ser=obj('function-match.json');start=ser['candidate_body']['start'];size=1840;orig=0x5a28
 assert o.normalized[orig:orig+size]==e.normalized[start:start+size]and o.pattern(orig,size)==e.pattern(start,size)
 assert len(e.callsites(start,size))==25
 for call in e.callsites(start,size):
  ot=o.calls[orig+call['offset']];ct=call['target'];f=[f for f in s.funcs if f['start']==ct];sizes={f['size']for f in f};assert len(sizes)==1;n=next(iter(sizes));assert ot in o.entries and o.entries[o.entries.index(ot)+1]-ot==n
  assert o.normalized[ot:ot+n]==e.normalized[ct:ct+n]and o.pattern(ot,n)==e.pattern(ct,n)
 for elf,at in [(o,orig+248),(e,start+248)]:
  pointer=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32;assert elf.b[pointer:pointer+8]==bytes.fromhex('17b7f83760d8ac60')
 inputs=obj('inputs-before.json')
 for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs']:assert tar_map(group+'.tar.gz')==inputs[group]
 for n,h in obj('runtime-layer-manifest.json').items():assert H(raw('runtime-layer/'+n))==h
 assert obj('runtime-layer/nested-harness/expected-source-map.json')==source
 with tarfile.open(P/'published_additional_inputs.tar.gz')as archive:
  prefix='repro/pump/nested-general-route-fortyeight/'
  for name in obj('runtime-layer-manifest.json'):
   if name.startswith('nested-harness/')and name!='nested-harness/expected-source-map.json':assert raw('runtime-layer/'+name)==archive.extractfile(prefix+name).read()
  before=archive.extractfile(prefix+'route-harness/pump_general_route_differential.py').read().decode();after=raw('runtime-layer/route-harness/pump_general_route_differential.py').decode()
  funcs=lambda text:{n.name:ast.dump(n)for n in ast.parse(text).body if isinstance(n,(ast.FunctionDef,ast.ClassDef))}
  left,right=funcs(before),funcs(after);assert left.keys()==right.keys()and[n for n in left if left[n]!=right[n]]==['bindings']
  assert raw('runtime-layer/route-harness/base-fixture.json')==archive.extractfile(prefix+'route-harness/base-fixture.json').read()
 nested=obj('nested-differential.json.gz');nb=nested['provenance']['compiled_candidate_binding'];assert nb['actual_source_sha256']==actual and nb['report_sha256']==H(raw('build/build-comparison.json'))
 ri=obj('runtime-identities.json');assert ri['python_solders_nested']==nested['provenance']['runtime_files']==obj('nested-original.json.gz')['provenance']['runtime_files']
 assert ri['python_solders_route']==obj('route-original/bindings-before.json')['runtime_files']==obj('route-candidate/bindings-after.json')['runtime_files']
 rb=obj('route-candidate/bindings-after.json')['candidate'];assert rb['source_sha256']==actual and rb['relative_source_sha256']==source and rb['build_report_sha256']==H(raw('build/build-comparison.json'))
 assert all(x['returncode']==0 for x in obj('root-runtime-exits.json'))
 for rows in ['differential/run.json','surfpool/run.json','extra-run.json']:assert all(x['returncode']==0 for x in obj(rows))
 bindings=obj('receipt-bindings.json');assert len(bindings)==68
 totals={k:{'cases':0,'transactions':0,'signatures':0}for k in ['differential','surfpool']};receipts={}
 for row in bindings:
  data=obj(row['path']);assert H(raw(row['path']))==row['sha256']and row['actual_source_sha256']==actual and row['build_report_sha256']==H(raw('build/build-comparison.json'))
  assert row['candidate_sha256']==H(raw('candidate.so'))and row['original_sha256']==H(raw('static-inputs/original.so'))
  assert not data.get('mismatches',[])and not data.get('failures',[])and not data.get('unexpected_original_errors',[])and not data.get('unexpected_errors',[])
  if isinstance(data.get('cases'),list):
   for case in data['cases']:
    if isinstance(case,dict):assert not case.get('mismatches',[])and not case.get('failures',[])
  check=signatures({'original':data['original'],'candidate':data['candidate']}if row['kind']=='surfpool'else data);assert check==row['verified']
  nc=data.get('case_count',data.get('cases'));nc=len(nc)if isinstance(nc,list)else nc;assert nc==row['cases']
  target=totals[row['kind']];target['cases']+=nc
  for k,v in check.items():target[k]+=v
  receipts[row['suite']]=data
 assert totals=={'differential':{'cases':9269,'transactions':15934,'signatures':24352},'surfpool':{'cases':1024,'transactions':2048,'signatures':2980}},totals
 qc=receipts['quote_control']['bound_inputs_sha256']
 for n,h in actual.items():assert qc[n]==h
 assert qc[obj('build-report-original-path.json')['path']]==H(raw('build/build-comparison.json'))
 partial=receipts['multi_hop_curve_partial'];assert partial['case_count']==partial['passed']==56
 for row in partial['cases']:
  for k in ['error','events','inner','return_data','before','after']:assert row['original'][k]==row['candidate'][k]
 two=receipts['tokenkeg_two_curve'];assert two['provenance']['compiled_candidate_binding']['actual_source_sha256']==actual
 prior=obj('historical-two-curve-original.json.gz');norm=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
 for old,row in zip(prior['cases'],two['cases']):
  assert old['case']==row['case']and old['parameters']==row['parameters']and not row['mismatches']
  for k in ['error','events','inner','return_data','before','after','pump_calls','token_calls']:assert old['original'][k]==row['original'][k]==row['candidate'][k]
  assert norm(row['original']['logs'])==norm(row['candidate']['logs'])
 extra=load('verify_extra_saved.py','extra_saved').run();assert extra==obj('extra-saved-verification.json')
 if a.repo:
  repo=a.repo.resolve()
  for group in ['baseline_main_source','harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs']:
   for n,h in inputs[group].items():assert H((repo/n).read_bytes())==h,(group,n)
 mode_static=load('mode_order_static.py','mode_order_static');mode_generated=mode_static.generate()
 for name,value in mode_generated.items():assert (raw(name).decode()==value if isinstance(value,str) else obj(name)==value),name
 fee_static=load('fee_basis_static.py','fee_basis_static');generated=fee_static.generate()
 for name,value in generated.items():assert obj(name)==value,name
 coverage=load('derive_coverage.py','derive_coverage');assert coverage.generate()==obj('coverage-review.json')
 print(json.dumps({'status':'PASS','payloads':len(manifest),'source_inputs':37,'source_files_changed':1,'builds':1,'retries':0,'candidate_sha256':H(raw('candidate.so')),'metadata_full_body_matches':4,'metadata_direct_target_matches':62,'serializer1840_all25':True,'receipt_bindings':68,'totals':totals,'additional_original_only_signatures':32,'new_unique_cases':0,'main_baseline_checked':bool(a.repo),'full_original_byte_equality':False,'audit_complete':False},indent=2))
if __name__=='__main__':main()
