"""Assemble exact named public evidence after one successful main identity build."""
from pathlib import Path
import ast,difflib,gzip,hashlib,io,json,shutil,tarfile
R=Path.cwd();W=R/'work/pump-nested-general-route-main-promotion';S=R/'work/pump-nested-general-route-recovery/run-01/handoff';B=W/'main-build-01';P=R/'repro/pump/nested-general-route-fortyeight';PREFIX=P.relative_to(R).as_posix()
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):assert not p.is_symlink()and not p.name.endswith('-keypair.json');return p.read_bytes()
def read(p):return json.loads(raw(p))
def put(n,b):p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def out(n,j):put(n,(json.dumps(j,indent=2)+'\n').encode())
def copy(p,n):put(n,raw(p))
def archive(n,files):
 with(P/n).open('wb')as f,gzip.GzipFile(fileobj=f,mode='wb',mtime=0)as g,tarfile.open(fileobj=g,mode='w')as t:
  for name,p in sorted(files.items()):
   b=raw(p);i=tarfile.TarInfo(name);i.size=len(b);i.mode=0o644;i.mtime=0;t.addfile(i,io.BytesIO(b))
identity=read(W/'main-scratch-identity.json');assert identity['whole_stripped_equal']and identity['whole_symbols_equal'];assert not P.exists();P.mkdir(parents=True)
sm=read(S/'manifest-sha256.json');assert sha(raw(S/'manifest-sha256.json'))=='0e4e2d6644c6bede5b164f6c2450c3ebd95460173f27e1537979a052f6d92aa1'
for n,v in sm.items():b=raw(S/n);assert v=={'sha256':sha(b),'bytes':len(b)}
archive('scratch-handoff.tar.gz',{n:S/n for n in [*sm,'manifest-sha256.json']});copy(S/'manifest-sha256.json','scratch-manifest-sha256.json')
for n in ['candidate.so','unstripped.so','source-sha256.json','source-snapshot.tar.gz','documentation-sha256.json','tools-observed.json','sdk-source-sha256.json','build-helper-sha256.json','prebuild-manifest-sha256.json','build-launch.json','build-result.json','dependency-before.json','dependency-after.json','baseline-dependency-provenance.json.gz','toolchain-phases.json','build_once.py','build-launch.stdout','build-launch.stderr','main-scratch-identity.json','postbuild-completion.json','sdk-postbuild-source-sha256.json','complete_bookkeeping.py']:
 copy(W/n,n)
shutil.copytree(W/'preserved-launcher-failure',P/'preserved-launcher-failure')
for n in ['build-comparison.json','build-attempt.json']:copy(B/n,n)
put('build.log.gz',gzip.compress(raw(B/'build.log'),mtime=0));copy(W/'build-invocation.log','main-build-invocation.log')
for f in(W/'build-helpers').rglob('*'):
 if f.is_file():copy(f,'build-helpers/'+f.relative_to(W/'build-helpers').as_posix())
source=read(W/'source-sha256.json');assert len(source)==37 and source==read(B/'build-comparison.json')['source_sha256']
for n,h in source.items():assert sha(raw(R/n))==h;copy(R/n,'source/'+n)
copy(R/'programs/pump/README.md','owned/programs/pump/README.md')
copy(S/'README.md','scratch-README.md');copy(S/'integration-proposal.json','scratch-integration-proposal.json')
for n in ['inputs-before.json','runtime-identities.json','independent-verification.json','receipt-verification.json','harness-snapshot.tar.gz','fixture-snapshot.tar.gz','nested-repository-inputs.json','nested-repository-inputs.tar.gz']:
 copy(S/n,n)
for n in ['function-match.json','route-windows.json','combined-static.json']:copy(S/'focused-handoff/static'/n,n)
for f in(S/'nested-execution-harness').rglob('*'):
 if f.is_file():copy(f,'nested-harness/'+f.relative_to(S/'nested-execution-harness').as_posix())
for n in ['pump_tokenkeg_two_curve_differential.py','base-fixture.json']:copy(S/'two-curve-harness'/n,'harness/'+n)
# Only source-root metadata changes in the canonical route runner; fixtures and execution/assertion code stay exact.
with tarfile.open(S/'focused-handoff/focused-layer.tar.gz')as t:
 before=t.extractfile('focused-layer/harness/pump_general_route_differential.py').read().decode();fixture=t.extractfile('focused-layer/harness/base-fixture.json').read()
old="  # Build records retain their original work paths; source-root is an explicit\n  # repo-shaped copy of those compiler inputs, independent of --repo evidence.\n  prefix='work/pump-nested-general-route-recovery/run-01/source/'\n  assert all(p.startswith(prefix)for p in data['source_sha256'])\n  relative_source={p[len(prefix):]:h for p,h in data['source_sha256'].items()}"
new="  # Published main build records use repository-relative compiler input paths.\n  # source-root remains explicit and independent of --repo evidence.\n  assert all(p.startswith('programs/pump/')for p in data['source_sha256'])\n  relative_source=dict(data['source_sha256'])"
assert before.count(old)==1;after=before.replace(old,new)
get=lambda s:{n.name:ast.dump(n)for n in ast.parse(s).body if isinstance(n,(ast.FunctionDef,ast.ClassDef))}
a,b=get(before),get(after);assert [n for n in a if a[n]!=b[n]]==['bindings']
put('route-harness/pump_general_route_differential.py',after.encode());put('route-harness/base-fixture.json',fixture)
put('route-harness/main-source-binding.patch',''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='approved-combined/harness/pump_general_route_differential.py',tofile='route-harness/pump_general_route_differential.py')).encode())
out('route-harness/provenance.json',{'only_changed_function':'bindings','approved_driver_sha256':sha(before.encode()),'canonical_driver_sha256':sha(after.encode()),'fixture_sha256':sha(fixture),'runtime_fixture_assertion_control_changes':False,'adaptation':'Require main programs/pump/* keys and bind them under explicit source-root; source count37 and report/attempt/source/ELF gates unchanged. Fresh CI must repeat original acceptance because the canonical driver hash differs.'})
# Copy all focused sidecars; the immutable scratch archive additionally retains their original seal.
for side in ['original','candidate']:shutil.copytree(S/('focused-handoff/focused-'+side),P/('route-'+side))
mapping=read(S/'receipt-copy-map.json');v=read(S/'independent-verification.json');expected={x['receipt_sha256']:x for x in v['differential_suites']+v['surfpool_suites']}
fullidentity={'scope':'Measured entire stripped and symbol identity binds freshly tested scratch receipts to the one clean main build. No runtime rerun during promotion.','scratch_manifest_sha256':sha(raw(S/'manifest-sha256.json')),'main_build_report_sha256':sha(raw(B/'build-comparison.json')),'scratch_build_report_sha256':sha(raw(S/'focused-handoff/build/build-comparison.json')),'main_source_sha256':source,'scratch_source_sha256':read(S/'focused-handoff/build/build-comparison.json')['source_sha256'],'files':{}}
for n in ['candidate.so','unstripped.so']:
 x=raw(W/n);y=raw(S/'focused-handoff/static'/n);assert x==y;fullidentity['files'][n]={'main_sha256':sha(x),'scratch_sha256':sha(y),'bytes':len(x),'entire_files_equal':True}
out('main-scratch-identity.json',fullidentity);ih=sha(raw(P/'main-scratch-identity.json'));bindings=[];suites={}
def bind(name,suite,cases,kind,verified,scratch_path,decoded):
 bindings.append({'receipt':PREFIX+'/'+name,'kind':kind,'suite':suite,'cases':cases,'receipt_sha256':sha(raw(P/name)),'scratch_saved_path':scratch_path,'decoded_json_sha256':sha(decoded),'verified':verified,'executed_candidate_sha256':v['candidate_sha256'],'executed_original_sha256':v['original_sha256'],'main_build_report_sha256':fullidentity['main_build_report_sha256'],'actual_main_source_sha256':source,'executed_scratch_build_report_sha256':fullidentity['scratch_build_report_sha256'],'identity_report_sha256':ih})
for b in read(S/'receipt-build-bindings.json'):
 m=mapping[b['receipt']];packed=raw(S/m['path']);original=gzip.decompress(packed)if m['transport']=='gzip-original-bytes'else packed;assert sha(original)==b['receipt_sha256'];decoded=gzip.decompress(original)if original.startswith(b'\x1f\x8b')else original;data=json.loads(decoded);row=expected[b['receipt_sha256']]
 if b['kind']=='differential':name='differential/'+row['suite']+'.json.gz';suites[row['suite']]=data
 else:name='surfpool/'+row['suite']+'/'+Path(b['receipt']).name.removesuffix('.gz')+'.gz'
 put(name,original if original.startswith(b'\x1f\x8b')else gzip.compress(original,mtime=0));bind(name,row['suite'],row.get('case_count',row.get('cases')),b['kind'],row['verified'],m['path'],decoded)
nested=raw(S/'nested-differential.json.gz');copy(S/'nested-differential.json.gz','differential/general_nested.json.gz');suites['general_nested']=json.loads(gzip.decompress(nested));bind('differential/general_nested.json.gz','general_nested',16,'differential',{'transactions':32,'signatures':64},'nested-differential.json.gz',gzip.decompress(nested));copy(S/'nested-original-acceptance.json.gz','original-only-nested.json.gz')
cs=read(P/'route-candidate/summary.json');pairs=[]
for row in cs['rows']:
 name=row['file'];pairs.append({'case':row['case'],'original':read(P/'route-original'/name),'candidate':read(P/'route-candidate'/name),'mismatches':row['mismatches']})
route={'scope':'Derived paired view of the retained sixteen original/candidate raw receipt sets; no new execution. Each complete sidecar remains in route-original/ and route-candidate/.','candidate_sha256':v['candidate_sha256'],'original_sha256':v['original_sha256'],'case_count':16,'mismatches':[],'cases':pairs}
decoded=(json.dumps(route,separators=(',',':'))+'\n').encode();put('differential/general_route.json.gz',gzip.compress(decoded,mtime=0));suites['general_route']=route;bind('differential/general_route.json.gz','general_route',16,'differential',{'transactions':32,'signatures':32},None,decoded)
out('receipt-build-bindings.json',bindings)
put('all-differential.json.gz',gzip.compress((json.dumps({'scope':'38 unchanged existing suites9237 + accepted nested16 + general route16. Same exact executable; individual original records and derived route pair mapping retained.','candidate_sha256':v['candidate_sha256'],'original_sha256':v['original_sha256'],'case_count':9269,'suite_count':40,'mismatches':[],'suites':suites},separators=(',',':'))+'\n').encode(),mtime=0))
aliases={'work/pump-multi-hop-curve-recovery/differential.py':'repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py','work/pump-multi-hop-curve-recovery/verify_saved.py':'repro/pump/native-curve-partial-fortyeight/isolated-partial-checkpoint/verify_saved.py','work/pump-nested-general-route-recovery/run-01/two-curve-harness/pump_tokenkeg_two_curve_differential.py':PREFIX+'/harness/pump_tokenkeg_two_curve_differential.py','work/pump-nested-general-route-recovery/run-01/two-curve-harness/base-fixture.json':PREFIX+'/harness/base-fixture.json'}
inputs=read(S/'inputs-before.json');groups={'source':source,'maintained_harness':{aliases.get(n,n):h for n,h in inputs['harness_sha256'].items()},'fixtures_and_program_ELFs':inputs['repository_fixture_snapshot_sha256'],'build_helpers':read(W/'build-helper-sha256.json'),'documentation':read(W/'documentation-sha256.json'),'canonical_nested':{PREFIX+'/nested-harness/'+n:h for n,h in read(S/'nested-execution-harness-manifest.json').items()},'canonical_route':{PREFIX+'/route-harness/'+n:sha(raw(P/'route-harness'/n))for n in ['pump_general_route_differential.py','base-fixture.json']},'candidate':{PREFIX+'/'+n:sha(raw(P/n))for n in ['candidate.so','unstripped.so']},'nested_additional_inputs':read(S/'nested-repository-inputs.json'),'route_additional_inputs':read(P/'route-original/bindings-before.json')['repository_inputs']}
for group,rows in groups.items():
 for n,h in rows.items():assert not n.startswith('work/')and sha(raw(R/n))==h,(group,n)
out('current-bindings.json',{'scope':'Every live input uses tracked repository paths or exact published historical copies; no work/ dependencies. Darwin runtime identities are historical only.','groups':groups,'historical_path_aliases':aliases,'historical_runtime_identity':'runtime-identities.json'})
status=read(R/'repro/status.json')['pump'];old='repro/pump/nested-ancestry-fortyeight';status=json.loads(json.dumps(status).replace(old,PREFIX));sp=read(S/'integration-proposal.json')
for k in ['validated_cases','differential_signed_transactions','differential_verified_signatures','surfpool_comparisons','surfpool_signed_transactions','surfpool_verified_signatures','multi_hop_curve_focused_cases','multi_hop_curve_verified_signatures','multi_hop_curve_successful_cases','multi_hop_curve_pump_cpi_cases','multi_hop_curve_caller_rejections']:status[k]=sp[k]
status['prior_checkpoint']=old;status['partially_implemented_handlers']['multi_hop_curve_swap']=sp['multi_hop_scope'];status['coverage_limitations']=[sp['multi_hop_scope']if x.startswith('multi_hop_curve_swap remains partial:')else x for x in status['coverage_limitations']]
status['nested_ancestry_failed_diagnostic_evidence']=old+'/depth-guard-review-REPORT.md';status['multi_hop_curve_general_route_report']=PREFIX+'/README.md';status['multi_hop_curve_general_route_cases']=16;status['multi_hop_curve_general_route_verified_signatures']=32
out('status-pump-proposal.json',status)
print(json.dumps({'package':PREFIX,'source':len(source),'bindings':len(bindings),'candidate':fullidentity['files']['candidate.so']}))
