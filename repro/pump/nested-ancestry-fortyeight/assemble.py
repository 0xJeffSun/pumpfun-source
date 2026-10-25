"""Assemble named public evidence only; never traverse a compiler target."""
from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent
S=R/'work/pump-nested-correction-build/handoff';B=W/'main-build-01'
P=R/'repro/pump/nested-ancestry-fortyeight';PREFIX=P.relative_to(R).as_posix()
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 assert not p.name.endswith('-keypair.json') and not p.is_symlink();return p.read_bytes()
def read(p):return json.loads(raw(p))
def put(n,b):
 p=P/n;assert not p.name.endswith('-keypair.json');p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def out(n,j):put(n,(json.dumps(j,indent=2)+'\n').encode())
def copy(p,n):put(n,raw(p))
def archive(n,files):
 with (P/n).open('wb')as f,gzip.GzipFile(fileobj=f,mode='wb',mtime=0)as g,tarfile.open(fileobj=g,mode='w')as t:
  for name,p in sorted(files.items()):
   data=raw(p);i=tarfile.TarInfo(name);i.size=len(data);i.mode=0o644;i.mtime=0;t.addfile(i,io.BytesIO(data))
assert not P.exists();P.mkdir(parents=True)
sm=read(S/'manifest-sha256.json');assert sha(raw(S/'manifest-sha256.json'))=='3a907ab0ae1ae926c94951c98aede4da512e8a39e5bca5c5a437fe5fd1464f9c'
for n,v in sm.items():b=raw(S/n);assert v=={'sha256':sha(b),'bytes':len(b)}
archive('scratch-handoff.tar.gz',{n:S/n for n in [*sm,'manifest-sha256.json']});copy(S/'manifest-sha256.json','scratch-manifest-sha256.json')
for n in ['candidate.so','unstripped.so','source-sha256.json','documentation-sha256.json','tools-before.json','tools-after.json','toolchain-phases.json','function-match.json','depth-guard-match.json','fresh-walk.asm','elf_reader.py','match-serializer.py','match-depth-guard.py','record_phases.py','authorization.json']:
 copy(W/n,n)
for n in ['build-comparison.json','build-attempt.json']:copy(B/n,n)
put('build.log.gz',gzip.compress(raw(B/'build.log'),mtime=0));copy(B/'target/.rustc_info.json','cargo-rustc-info.json')
copy(W/'build-invocation.log','main-build-invocation.log');copy(S/'REPORT.md','scratch-REPORT.md')
copy(S/'prebuild/depth-guard-review/REPORT.md','depth-guard-review-REPORT.md')
for n in ['dependency-integrity.json','dependency-integrity.log','runtime-identities.json','independent-verification.json','execution-harness-manifest.json','two-curve-provenance-37.patch','two-curve-provenance-map.json','source-proposal.patch','harness-snapshot.tar.gz','fixture-snapshot.tar.gz','inputs-before.json','verify_static_portable.py']:
 if (S/n).exists():copy(S/n,n)
copy(S/'prebuild/depth-guard-review/proposed/nested_create.rs','reviewed/nested_create.rs') if (S/'prebuild/depth-guard-review/proposed/nested_create.rs').exists()else None
source=read(W/'source-sha256.json');assert source==read(B/'build-comparison.json')['source_sha256'] and len(source)==37
archive('source-snapshot.tar.gz',{n:R/n for n in source})
for n,h in source.items():assert sha(raw(R/n))==h;copy(R/n,'source/'+n)
for n in ['promotion/README.patch','promotion/owned-promotion-map.json','promotion/workflow-proposal.patch','promotion/current-bindings-dispatch-proposal.patch','promotion/current-validation-proposal.json','promotion/central-inputs.json']:
 copy(S/n,n)
owned={n:v['after_sha256']for n,v in read(S/'promotion/owned-promotion-map.json')['owned_files'].items()}
out('owned-program-files-sha256.json',owned)
for n,h in owned.items():assert sha(raw(R/n))==h;copy(R/n,'owned/'+n)
for n in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:copy(W/'build-helper-snapshot/scripts'/n,'build-helper-snapshot/scripts/'+n)
identity={'scope':'Both clean main and tested scratch stripped and symbol ELF files are wholly identical. Saved scratch runtime evidence applies by this measured identity; no additional runtime executed for promotion.',
 'scratch_manifest_sha256':sha(raw(S/'manifest-sha256.json')),'main_build_report_sha256':sha(raw(B/'build-comparison.json')),'scratch_build_report_sha256':sha(raw(S/'build-comparison.json')),
 'main_source_sha256':source,'scratch_source_sha256':read(S/'build-comparison.json')['source_sha256'],'source_content_equal_after_root_normalization':True,'files':{}}
for n in ['candidate.so','unstripped.so']:
 a=raw(W/n);b=raw(S/n);assert a==b;identity['files'][n]={'main_sha256':sha(a),'scratch_sha256':sha(b),'bytes':len(a),'entire_files_equal':True}
out('main-scratch-identity.json',identity);ih=sha(raw(P/'main-scratch-identity.json'))
mapping=read(S/'receipt-copy-map.json');v=read(S/'independent-verification.json');expected={x['receipt_sha256']:x for x in v['differential_suites']+v['surfpool_suites']}
bindings=[];suites={};newmap={}
for b in read(S/'receipt-build-bindings.json'):
 m=mapping[b['receipt']];packed=raw(S/m['path']);original=gzip.decompress(packed)if m['transport']=='gzip-original-bytes'else packed
 assert sha(original)==b['receipt_sha256'];payload=gzip.decompress(original)if original.startswith(b'\x1f\x8b')else original;data=json.loads(payload);row=expected[b['receipt_sha256']]
 if b['kind']=='differential':name='differential/'+row['suite']+'.json.gz';suites[row['suite']]=data
 else:name='surfpool/'+row['suite']+'/'+Path(b['receipt']).name.removesuffix('.gz')+'.gz'
 published=original if original.startswith(b'\x1f\x8b')else gzip.compress(original,mtime=0);put(name,published)
 entry={'receipt':PREFIX+'/'+name,'kind':b['kind'],'suite':row['suite'],'cases':row.get('case_count',row.get('cases')),'receipt_sha256':sha(published),'scratch_original_receipt_sha256':sha(original),'scratch_saved_path':m['path'],'decoded_json_sha256':sha(payload),'verified':row['verified'],'executed_candidate_sha256':v['candidate_sha256'],'executed_original_sha256':v['original_sha256'],'main_build_report_sha256':identity['main_build_report_sha256'],'actual_main_source_sha256':source,'executed_scratch_build_report_sha256':identity['scratch_build_report_sha256'],'identity_report_sha256':ih,'legacy_embedded_source_maps':'Preserved incidental checkout snapshots, not the37 actual compiled scratch inputs. See sealed scratch per-receipt bindings.'}
 bindings.append(entry);newmap[b['receipt']]=name
focused=json.loads(gzip.decompress(raw(S/'focused-01.json.gz')));copy(S/'focused-01.json.gz','differential/general_nested.json.gz');suites['general_nested']=focused
bindings.append({'receipt':PREFIX+'/differential/general_nested.json.gz','kind':'differential','suite':'general_nested','cases':16,'receipt_sha256':sha(raw(S/'focused-01.json.gz')),'scratch_saved_path':'focused-01.json.gz','decoded_json_sha256':sha(gzip.decompress(raw(S/'focused-01.json.gz'))),'verified':{'transactions':32,'signatures':64},'executed_candidate_sha256':v['candidate_sha256'],'executed_original_sha256':v['original_sha256'],'main_build_report_sha256':identity['main_build_report_sha256'],'actual_main_source_sha256':source,'executed_scratch_build_report_sha256':identity['scratch_build_report_sha256'],'identity_report_sha256':ih})
out('receipt-build-bindings.json',bindings);out('published-receipt-path-map.json',newmap)
put('all-differential.json.gz',gzip.compress((json.dumps({'scope':'Existing9237 plus16 unique nested cases. Same source-bound executable; individual saved receipts preserved.','candidate_sha256':v['candidate_sha256'],'original_sha256':v['original_sha256'],'case_count':9253,'suite_count':39,'mismatches':[],'suites':suites},separators=(',',':'))+'\n').encode(),mtime=0))
copy(S/'original-acceptance-01.json.gz','original-only-nested.json.gz')
for p in (S/'execution-harness').rglob('*'):
 if p.is_file():copy(p,'nested-harness/'+p.relative_to(S/'execution-harness').as_posix())
for n in ['pump_tokenkeg_two_curve_differential.py','base-fixture.json']:copy(S/'two-curve-harness'/n,'harness/'+n)
aliases={'work/pump-multi-hop-curve-recovery/differential.py':'repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py','work/pump-multi-hop-curve-recovery/verify_saved.py':'repro/pump/native-curve-partial-fortyeight/isolated-partial-checkpoint/verify_saved.py','work/pump-nested-correction-build/two-curve-harness/pump_tokenkeg_two_curve_differential.py':PREFIX+'/harness/pump_tokenkeg_two_curve_differential.py','work/pump-nested-correction-build/two-curve-harness/base-fixture.json':PREFIX+'/harness/base-fixture.json'}
inputs=read(S/'inputs-before.json');groups={'source':source,'maintained_harness':{},'fixtures_and_program_ELFs':inputs['repository_fixture_snapshot_sha256'],'build_helpers':read(W/'tools-after.json')['build_helpers'],'documentation':read(W/'documentation-sha256.json'),'canonical_nested':{PREFIX+'/nested-harness/'+n:h for n,h in read(S/'execution-harness-manifest.json').items()},'candidate':{PREFIX+'/'+n:sha(raw(P/n))for n in ['candidate.so','unstripped.so']}}
for n,h in inputs['harness_sha256'].items():groups['maintained_harness'][aliases.get(n,n)]=h
for group,rows in groups.items():
 for n,h in rows.items():assert not n.startswith('work/')and sha(raw(R/n))==h,(group,n)
out('current-bindings.json',{'scope':'Current tracked inputs. Exact historical scratch paths are rebound to published byte-identical copies; local Surfpool executable is historical identity only and is not a current requirement.','groups':groups,'historical_path_aliases':aliases,'historical_runtime_identity':'runtime-identities.json','source_inputs':37,'maintained_harness_inputs':96,'fixture_inputs':28})
status=read(S/'promotion/status-pump-proposal.json')['pump'];status['nested_ancestry_failed_diagnostic_evidence']=PREFIX+'/depth-guard-review-REPORT.md';out('status-pump-proposal.json',status)
print(json.dumps({'package':PREFIX,'source':len(source),'bindings':len(bindings),'candidate':identity['files']['candidate.so']}))
