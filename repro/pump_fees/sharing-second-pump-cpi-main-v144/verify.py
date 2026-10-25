from pathlib import Path
import argparse,hashlib,json,gzip,tarfile
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--current-main',type=Path);args=a.parse_args()
assert not list(P.rglob('*.pyc')) and not list(P.rglob('__pycache__'))
m=J(P/'manifest.json');actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name not in ['manifest.json','manifest.sha256']and '__pycache__'not in f.parts};assert actual==set(m)
for n,h in m.items():assert H(P/n)==h,n
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
r=P/'reference';main=P/'main';c=main/'controls';i=J(P/'acceptance-inputs.json');sm=J(r/'scratch-manifest.json')
assert H(r/'scratch-manifest.json')==i['scratch_manifest_sha256']
for n in i['reference_files']:assert H(r/n)==sm[n],n
identity=J(c/'identity.json');assert identity['whole_candidate_equal']and identity['whole_symbols_equal']and identity['helpers_tools_dependencies_unchanged']
assert (main/'candidate.so').read_bytes()==(r/'build01/candidate.so').read_bytes()
assert (main/'symbols.so').read_bytes()==(r/'build01/symbols.so').read_bytes()
assert H(main/'candidate.so')==identity['candidate_sha256']==i['candidate_sha256'];assert H(main/'symbols.so')==identity['symbols_sha256']==i['symbols_sha256']
s=J(r/'acceptance.json');scratch=s['scratch_source_sha256'];source=J(c/'source-proposed.json');assert len(source)==len(scratch)==26
assert [n for n in source if source[n]!=scratch[n]]==['programs/pump-fees/README.md']
assert source['programs/pump-fees/README.md']==H(r/'proposal/README.md')
assert identity['main_source_sha256']==source and identity['scratch_source_sha256']==scratch
assert identity['main_scratch_input_difference']==['programs/pump-fees/README.md']
b=J(main/'build-comparison.json');attempt=J(main/'build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']
assert b['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
assert H(main/'build.log')==attempt['build_log_sha256']==b['build_log_sha256']
for key in ['selected_toolchain','rustc_sha256','sdk_source_sha256']:assert b[key]==J(r/'build01/build-comparison.json')[key]
assert J(c/'build-exit.json')['returncode']==0 and J(c/'runner-exit.json')['returncode']==0
assert J(c/'dependency-before.json')==J(c/'dependency-after.json')==J(r/'dependency-before.json')==J(r/'dependency-after.json')
for n,h in source.items():
 assert H(P/'source'/n)==h,n
 if args.current_main:assert H(args.current_main/n)==h,n
helpers=J(r/'gate-before.json')['helpers']
for n,h in helpers.items():
 assert H(P/'helpers'/n)==h,n
 if args.current_main:assert H(args.current_main/n)==h,n
assert s['comparison_receipts']==17461 and s['sequence_steps_separate']==10 and s['functional_mismatches']==0
assert s['saved_baseline_and_sequence_signature_verification']['verified_signatures_in_encoded_fields']==17204
assert s['focused_signature_verification']=={'fields':40,'signatures':80}
assert s['missing_pool_coverage']=={'sharing_creation_cases':116,'error6019_case_names':['graduated-missing']}
assert s['option_order_coverage']['late_program_or_event_error6019_rows']==[]
bindings=J(P/'validation-bindings.json');assert len(bindings)==11
count=0
with tarfile.open(r/'receipts-and-verification.tar.gz') as z:
 for name,binding in bindings.items():
  raw=gzip.decompress((P/'validation'/(name+'.json.gz')).read_bytes());assert raw==z.extractfile(binding['archive_member']).read()
  assert hashlib.sha256(raw).hexdigest()==binding['raw_sha256'];d=json.loads(raw);assert d['candidate_sha256']==i['candidate_sha256'] and not d.get('mismatches',[])
  if name=='donation-sequence':assert len(d['steps'])==10 and all(x['match']for x in d['steps'])
  else:count+=d['case_count']
assert count==17461
print(json.dumps({'passed':True,'whole_executable_and_symbols_equal':True,'compiled_inputs':26,'identical_non_README_inputs':25,'inherited_comparison_receipts':17461,'separate_sequence_steps':10,'new_builds':0,'new_target_executions':0}))
