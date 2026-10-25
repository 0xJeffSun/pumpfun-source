#!/usr/bin/env python3
"""Read-only saved publication verification; no builds, VMs or transactions sent."""
from pathlib import Path,PurePosixPath
import argparse,base64,gzip,hashlib,json,re,subprocess,sys,tarfile
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if(p/'evidence/upstream/pump.json').is_file())
sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(name):
 p=PurePosixPath(name);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json'),name
 return p
def raw(name):
 p=P/safe(name);assert not p.is_symlink();return p.read_bytes()
def read(name):
 b=raw(name);return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def transactions(v):
 if isinstance(v,dict):
  if isinstance(v.get('transaction_base64'),str):yield v['transaction_base64']
  for k,c in v.items():
   if k!='transaction_base64':yield from transactions(c)
 elif isinstance(v,list):
  for c in v:yield from transactions(c)
def signatures(v):
 n=s=0
 for encoded in transactions(v):
  b=base64.b64decode(encoded);tx=VersionedTransaction.from_bytes(b)
  assert bytes(tx)==b and all(tx.verify_with_results());n+=1;s+=len(tx.signatures)
 return {'transactions':n,'signatures':s}
def archive_hashes(name):
 out={}
 with tarfile.open(P/name)as tar:
  ms=tar.getmembers()
  for m in ms:safe(m.name);assert m.isfile()and m.name not in out;out[m.name]=None
  for m in ms:out[m.name]=sha(tar.extractfile(m).read())
 return out
args=argparse.ArgumentParser();args.add_argument('--current-main','--current-source',dest='current_source',action='store_true');args=args.parse_args()
manifest=read('manifest-sha256.json')
for name in manifest:safe(name)
for name,item in manifest.items():b=raw(name);assert item=={'sha256':sha(b),'bytes':len(b)},name
scratch=read('scratch-manifest-sha256.json');assert sha(raw('scratch-manifest-sha256.json'))=='64fa54308f45bde2c4746ae01100576907e3087b977351ac3c2d28506d6938b5'
archived=archive_hashes('scratch-handoff.tar.gz');assert archived.pop('manifest-sha256.json')==sha(raw('scratch-manifest-sha256.json'));assert archived=={p:v['sha256']for p,v in scratch.items()}
source=read('source-sha256.json');assert len(source)==36 and source==read('candidate-source-sha256.json')
assert archive_hashes('source-snapshot.tar.gz')==source
assert archive_hashes('harness-snapshot.tar.gz')==read('harness-snapshot-sha256.json')
for path,h in source.items():assert sha(raw('source/'+path))==h,path
if args.current_source:
 for path,h in source.items():assert sha((R/path).read_bytes())==h,path
 for path,h in read('owned-files-sha256.json').items():assert sha((R/path).read_bytes())==h,path
build=read('build-comparison.json');attempt=read('build-attempt.json');identity=read('main-scratch-identity.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
assert source==build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
assert sha(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']
candidate=sha(raw('candidate.so'));original=build['comparison']['original_sha256']
assert candidate==build['comparison']['candidate_sha256']==identity['main_sha256']==identity['scratch_sha256']
assert identity['entire_files_equal']and identity['main_source_sha256']==source and not build['comparison']['full_byte_equality']
assert identity['main_build_report_sha256']==sha(raw('build-comparison.json'))
phases=read('toolchain-phases.json');assert phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'
assert sha(raw('unstripped.so'))==phases['compiled_unstripped']['sha256'];assert sha(raw('cargo-rustc-info.json'))==phases['compile']['cargo_rustc_info']['sha256']
static=json.loads(subprocess.check_output([sys.executable,str(P/'match-serializer.py'),'--check'],text=True))
assert static['candidate']['sha256']==candidate and static['normalized_body_equal']and static['all_25_direct_target_bodies_match']
assert static['candidate_body']['bytes']==1840
bindings=read('receipt-build-bindings.json');assert len(bindings)==66;counts={k:{'transactions':0,'signatures':0}for k in ['differential','surfpool','two_curve']}
for binding in bindings:
 rel=Path(binding['receipt']).relative_to(P.relative_to(R)).as_posix();packet=raw(rel);assert sha(packet)==binding['receipt_sha256']
 sourcebytes=gzip.decompress(packet)if binding['transport']=='gzip-original-bytes'else packet
 assert sha(sourcebytes)==binding['receipt_source_sha256'];data=json.loads(gzip.decompress(sourcebytes)if sourcebytes.startswith(b'\x1f\x8b')else sourcebytes)
 assert binding['executed_candidate_sha256']==candidate and binding['executed_original_sha256']==original
 assert binding['main_source_sha256']==source and binding['main_build_report_sha256']==sha(raw('build-comparison.json'))
 assert binding['executed_scratch_source_sha256']==identity['scratch_source_sha256']
 assert binding['executed_scratch_build_report_sha256']==identity['scratch_build_report_sha256']
 assert binding['identity_report_sha256']==sha(raw('main-scratch-identity.json'))
 assert not data.get('mismatches',[])and not data.get('failures',[])
 value={'original':data['original'],'candidate':data['candidate']}if binding['kind']=='surfpool'else data
 n=signatures(value)
 for k,z in n.items():counts[binding['kind']][k]+=z
assert counts=={'differential':{'transactions':15830,'signatures':24216},'surfpool':{'transactions':2048,'signatures':2980},'two_curve':{'transactions':40,'signatures':40}}
agg=read('all-differential.json.gz');assert len(agg['suites'])==38 and agg['case_count']==9237 and agg['candidate_sha256']==candidate and not agg['mismatches']
for name,data in agg['suites'].items():assert data==read('differential/'+name+'.json.gz'),name
focused=read('differential/tokenkeg_two_curve.json.gz');replay=read('canonical-harness-replay.json.gz');assert replay['case_count']==focused['case_count']==20 and replay['candidate_sha256']==candidate
binding=replay['provenance']['compiled_candidate_binding'];assert binding['actual_source_sha256']==source and binding['report_sha256']==sha(raw('build-comparison.json'))and binding['attempt_sha256']==sha(raw('build-attempt.json'))
assert binding['report']=='repro/pump/tokenkeg-two-curve-fortyeight/build-comparison.json'
assert replay['provenance']['repository_inputs']['repro/pump/tokenkeg-two-curve-fortyeight/harness/pump_tokenkeg_two_curve_differential.py']==sha(raw('harness/pump_tokenkeg_two_curve_differential.py'))
assert 'work/'not in raw('harness/pump_tokenkeg_two_curve_differential.py').decode()
norm=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
for old,new in zip(focused['cases'],replay['cases']):
 assert old['case']==new['case']and old['parameters']==new['parameters']and not old['mismatches']and not new['mismatches']
 for side in ['original','candidate']:
  for field in ['error','events','inner','return_data','before','after','pump_calls','token_calls']:assert old[side][field]==new[side][field],(new['case'],side,field)
  assert new[side]['fresh_vm']
 assert norm(new['original']['logs'])==norm(new['candidate']['logs'])
repeat=signatures(replay);assert repeat=={'transactions':40,'signatures':40}
status=read('status-pump-proposal.json');assert len(status['implemented_handlers'])==48 and len(status['partially_implemented_handlers'])==5 and status['validated_cases']==9237
print(json.dumps({'status':'PASS','payload_files':len(manifest),'source_inputs':36,'scratch_sealed_payload_files':len(scratch),'candidate_sha256':candidate,'main_scratch_entire_elf_equal':True,'complete_serializer_body_and_25_targets_recomputed':True,'core_receipt_bindings':66,'differential_cases':9237,'surfpool_comparisons':1024,'core_verified_signatures':sum(x['signatures']for x in counts.values()),'core_counts':counts,'canonical_same20_repeat_verified':repeat,'canonical_repeat_adds_coverage_cases':0,'current_source_checked':args.current_source,'full_byte_equality':False,'security_audit_complete':False},indent=2))
