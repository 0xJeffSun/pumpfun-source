#!/usr/bin/env python3
"""Verify frozen build/source/static/runtime evidence without executable replay."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,io,json,runpy,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
args=argparse.ArgumentParser();args.add_argument('--current-main',action='store_true');a=args.parse_args()
sha=lambda value:hashlib.sha256(value).hexdigest()
def safe(name):
 path=PurePosixPath(name);assert not path.is_absolute()and'..'not in path.parts and not path.name.endswith('-keypair.json'),name
 return path
def raw(name):
 path=P/safe(name);assert not path.is_symlink(),name;return path.read_bytes()
def read(name):return json.loads(raw(name))
def archive(name):
 out={}
 with tarfile.open(fileobj=io.BytesIO(raw(name)),mode='r:gz')as tar:
  for member in tar:
   safe(member.name);assert member.isfile()and member.name not in out;out[member.name]=tar.extractfile(member).read()
 return out
manifest=read('manifest-sha256.json')
for name in manifest:safe(name)
for name,item in manifest.items():
 value=raw(name);assert {'sha256':sha(value),'bytes':len(value)}==item,name
sources={}
for label,prefix,original_prefix in [('trial1','trials/trial1/','work/fees-social-v2-box-recovery/source/'),('trial2','trials/trial2/','work/fees-social-v2-box-recovery/source-v2/'),('main','','')]:
 source=archive(prefix+'source-snapshot.tar.gz');mapping=read(prefix+'source-sha256.json');build=read(prefix+'build-comparison.json');attempt=read(prefix+'build-attempt.json')
 assert len(source)==22 and {name:sha(value)for name,value in source.items()}==mapping
 assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']and attempt['source_unchanged']and attempt['returncode']==0
 assert {name.removeprefix(original_prefix):value for name,value in build['source_sha256'].items()}==mapping
 assert sha(gzip.decompress(raw(prefix+'build.log.gz')))==build['build_log_sha256']
 assert sha(raw(prefix+'pump_fees_candidate.so'))==build['comparison']['candidate_sha256']
 sources[label]=source
assert {name for name in sources['main']if sources['main'][name]!=sources['trial2'][name]}=={'programs/pump-fees/README.md'}
assert {name for name in sources['trial1']if sources['trial1'][name]!=sources['trial2'][name]}=={'programs/pump-fees/src/social.rs'}
assert raw('pump_fees_candidate.so')==raw('trials/trial2/pump_fees_candidate.so')
identity=read('main-scratch-identity.json');digest=sha(raw('pump_fees_candidate.so'))
assert digest==identity['main_binary_sha256']==identity['scratch_binary_sha256']=='c181b0ba75aee67369385e04908d89088552c1fad756bf5a21d7fb21979e6a58'
assert identity['whole_file_equal']and not identity['runtime_receipts_inherited']and len(raw('pump_fees_candidate.so'))==770624
assert identity['main_build_report_sha256']==sha(raw('build-comparison.json'))and identity['scratch_build_report_sha256']==sha(raw('trials/trial2/build-comparison.json'))
assert raw('pump_fees_candidate.so')!=raw('runtime/evidence/original/pump_fees/deployed.so')
for binding in read('static-package-bindings.json'):
 assert sha(raw(binding['archive']))==binding['archive_sha256']and sha(raw(binding['manifest']))==binding['manifest_sha256']
 files=archive(binding['archive']);assert files[binding['manifest_name']]==raw(binding['manifest']);seal=read(binding['manifest']);payload=seal.get('files',seal)
 assert len(payload)==binding['payload_files']and set(files)==set(payload)|{binding['manifest_name']}
 for name,h in payload.items():assert sha(files[name])==h,name
harness=archive('harness-snapshot.tar.gz');assert len(harness)==46 and {name:sha(value)for name,value in harness.items()}==read('harness-source-sha256.json')
runtime=read('runtime-inputs.json');assert len(runtime)==18
for name,h in runtime.items():assert sha(raw('runtime/'+name))==h,name
assert read('runtime-records/source-sha256.json')==read('source-sha256.json')
assert raw('runtime-records/harness-source-sha256.json')==raw('harness-source-sha256.json')and raw('runtime-records/harness-snapshot.tar.gz')==raw('harness-snapshot.tar.gz')and raw('runtime-records/runtime-inputs.json')==raw('runtime-inputs.json')
summary=read('runtime-records/summary.json');bindings=read('receipt-build-bindings.json');assert len(summary['reports'])==len(bindings)==10
assert summary['candidate_sha256']==digest and summary['comparison_receipts']==17441 and summary['donation_sequence_steps']==10 and summary['source_inputs']==22 and summary['harness_inputs']==46 and summary['runtime_inputs']==18 and not summary['mismatches']
reports={row['name']:row for row in summary['reports']}
for row in bindings:
 original=reports[row['name']];assert original['returncode']==0 and not original['mismatches']
 assert original['actual_source_sha256']==row['actual_source_sha256']==read('source-sha256.json')
 assert original['executed_candidate_sha256']==row['executed_candidate_sha256']==digest
 assert original['build_report_sha256']==row['build_report_sha256']==sha(raw('build-comparison.json'))
 assert sha(raw(row['published_report']))==row['published_report_sha256']
 value=gzip.decompress(raw(row['published_report']));assert sha(value)==row['raw_report_sha256']==original['report_sha256']
 report=json.loads(value);assert report['candidate_sha256']==digest and report['original_sha256']==sha(raw('runtime/evidence/original/pump_fees/deployed.so'))
ref=raw('reference/verify_publication.py').decode();prior_body=ref[ref.index('total=0\n'):ref.index('assert total==17441')+len('assert total==17441')]
current=raw('verify_saved_runtime.py').decode();current_body=current[current.index('total=0\n'):current.index('assert total==17441')+len('assert total==17441')]
assert current_body==prior_body and sha(prior_body.encode())==read('runtime-assertion-provenance.json')['copied_body_sha256']
assert sha(raw('reference/verify_publication.py'))==read('runtime-assertion-provenance.json')['reference_sha256']
static=runpy.run_path(str(P/'verify_static.py'))['RESULT'];runtime_result=runpy.run_path(str(P/'verify_saved_runtime.py'))['RESULT']
assert static['normalized_exit_equal']and len(static['direct_calls'])==7 and len(static['bounded_literals'])==3
from elf_reader import Elf
c=Elf(P/'trials/trial1/pump_fees_candidate.so');s=Elf(P/'trials/trial1/symbol-source.so');o=Elf(P/'runtime/evidence/original/pump_fees/deployed.so')
f=[f for f in s.funcs if'ClaimSocialFeePdaV2'in f['name']and'AccountsExit'in f['name']and'4exit'in f['name']];assert len(f)==1 and f[0]['size']==560
start=f[0]['start'];original=405560
assert [off for off in range(0,560,8)if c.normalized[start+off:start+off+8]!=o.normalized[original+off:original+off+8]]==[88]
assert c.pattern(start,560)==o.pattern(original,560)and not read('trials/exit-hypothesis-diagnostic.json')['hypothesis_verified']
current_checked=False
if a.current_main:
 R=next(p for p in P.parents if(p/'evidence/original/pump_fees/deployed.so').is_file())
 for name in ['source-sha256.json','harness-source-sha256.json','runtime-inputs.json','orchestration-sha256.json','build-helper-sha256.json','documentation-sha256.json']:
  for path,h in read(name).items():assert sha((R/path).read_bytes())==h,(name,path)
 current_checked=True
print(json.dumps({'payload_files':len(manifest),'source_inputs':22,'executed_harness_inputs':46,'separate_orchestrator':1,'runtime_inputs':18,'main_scratch_byte_equal':True,'current_main_checked':current_checked,'original_full_byte_equal':False,'static_exit_bytes':560,'direct_call_sites':7,'unique_direct_targets':len({r['candidate_target']for r in static['direct_calls']}),'bounded_literals':3,'failed_first_trial_difference_offsets':[88],'fresh_runtime':runtime_result},indent=2))
