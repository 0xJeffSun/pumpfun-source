#!/usr/bin/env python3
"""Read-only saved package/source/signature verification; no transaction execution."""
from pathlib import Path,PurePosixPath
import argparse,base64,gzip,hashlib,io,json,struct,sys,tarfile
from solders.transaction import VersionedTransaction
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
args=argparse.ArgumentParser();args.add_argument('--current-main',action='store_true');a=args.parse_args()
sha=lambda raw:hashlib.sha256(raw).hexdigest()
def safe(name):
 p=PurePosixPath(name);assert not p.is_absolute()and'..'not in p.parts and not p.name.endswith('-keypair.json'),name
 return p
def raw(name):
 path=P/safe(name);assert not path.is_symlink(),name;return path.read_bytes()
def data(name):
 value=raw(name);return json.loads(gzip.decompress(value)if value.startswith(b'\x1f\x8b')else value)
def archive_hashes(value):
 out={}
 with tarfile.open(fileobj=io.BytesIO(value),mode='r:gz')as tar:
  for member in tar:
   safe(member.name);assert member.isfile()and member.name not in out,member.name
   out[member.name]=sha(tar.extractfile(member).read())
 return out
def transaction_bytes(value):
 if isinstance(value,dict):
  if isinstance(value.get('transaction_base64'),str):yield value['transaction_base64']
  for key,child in value.items():
   if key!='transaction_base64':yield from transaction_bytes(child)
 elif isinstance(value,list):
  for child in value:yield from transaction_bytes(child)
def verify_transactions(value):
 txcount=sigcount=0
 for encoded in transaction_bytes(value):
  encoded=base64.b64decode(encoded);tx=VersionedTransaction.from_bytes(encoded)
  assert bytes(tx)==encoded and all(tx.verify_with_results());txcount+=1;sigcount+=len(tx.signatures)
 return {'transactions':txcount,'signatures':sigcount}
manifest=data('manifest-sha256.json')
for name in manifest:safe(name)
for name,expected in manifest.items():
 value=raw(name);assert {'sha256':sha(value),'bytes':len(value)}==expected,name
source=data('source-sha256.json');build=data('build-comparison.json');attempt=data('build-attempt.json');identity=data('main-scratch-identity.json')
assert len(source)==36 and source==build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
assert attempt['returncode']==0 and attempt['source_unchanged']
assert archive_hashes(raw('source-snapshot.tar.gz'))==source
assert archive_hashes(raw('harness-snapshot.tar.gz'))==data('harness-snapshot-sha256.json')
assert sha(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']
candidate=sha(raw('candidate.so'));assert candidate==build['comparison']['candidate_sha256']==identity['main_candidate_sha256']==identity['scratch_candidate_sha256']
assert len(raw('candidate.so'))==identity['candidate_bytes']==1534768 and identity['whole_file_equal']
assert identity['main_build_report_sha256']==sha(raw('build-comparison.json'))
assert identity['scratch_manifest_sha256']==sha(raw('scratch-manifest-sha256.json'))=='32cc9e674f38ed552ceeb06021a7fd3fe1140cbbade4bfff01db6b84f0c099bc'
assert identity['scratch_archive_sha256']==sha(raw('scratch-handoff.tar.gz'))
scratch_manifest=data('scratch-manifest-sha256.json');assert len(scratch_manifest)==173
small_names={'build-comparison.json','candidate-source-sha256.json','baseline-source-sha256.json','independent-verification.json','inputs-before.json','receipt-build-bindings.json','receipt-copy-map.json','differential/run.json','surfpool/run.json','function-match.json'}
saved={};seen=set()
with tarfile.open(P/'scratch-handoff.tar.gz',mode='r:gz')as tar:
 for member in tar:
  safe(member.name);assert member.isfile()and member.name not in seen,member.name;seen.add(member.name)
  value=tar.extractfile(member).read()
  if member.name=='manifest-sha256.json':assert value==raw('scratch-manifest-sha256.json')
  else:assert {'sha256':sha(value),'bytes':len(value)}==scratch_manifest[member.name],member.name
  if member.name in small_names:saved[member.name]=json.loads(value)
  if member.name=='candidate.so':assert value==raw('candidate.so')
assert seen==set(scratch_manifest)|{'manifest-sha256.json'} and set(saved)==small_names
scratch_source=saved['candidate-source-sha256.json'];baseline=saved['baseline-source-sha256.json']
assert scratch_source==source and set(baseline)==set(source)
assert [p for p in source if source[p]!=baseline[p]]==['programs/pump/src/trade_types.rs']
scratch_build=saved['build-comparison.json'];prefix='work/pump-bonding-curve-serializer-recovery/source/'
assert all(p.startswith(prefix)for p in scratch_build['source_sha256'])
assert {p[len(prefix):]:digest for p,digest in scratch_build['source_sha256'].items()}==source
assert scratch_manifest['build-comparison.json']['sha256']==identity['scratch_build_report_sha256']
v=saved['independent-verification.json'];assert not v['mismatches']and v['candidate_sha256']==candidate and not v['full_byte_equality']
assert v['original_sha256']==build['comparison']['original_sha256']
assert len(saved['differential/run.json'])==37 and all(row['returncode']==0 and row['bound_hashes_match']and not row['mismatches']for row in saved['differential/run.json'])
assert len(saved['surfpool/run.json'])==28 and all(row['returncode']==0 and row['runner_unchanged']and row['candidate_sha256']==candidate for row in saved['surfpool/run.json'])
diff_results=v['differential_suites'];surf_results=v['surfpool_suites']
assert len(diff_results)==37 and sum(row['case_count']for row in diff_results)==9217
assert len(surf_results)==28 and sum(row['cases']for row in surf_results)==1024
expected={row['receipt_sha256']:row for row in diff_results+surf_results};assert len(expected)==65
original_bindings={row['receipt']:row for row in saved['receipt-build-bindings.json']};bindings=data('receipt-build-bindings.json');copymap=data('receipt-copy-map.json')
assert len(bindings)==len(original_bindings)==len(copymap)==65
counts={'differential':{'transactions':0,'signatures':0},'surfpool':{'transactions':0,'signatures':0}}
for binding in bindings:
 old=original_bindings[binding['receipt']]
 for key,value in old.items():assert binding[key]==value,(binding['receipt'],key)
 assert binding['actual_main_compiler_inputs_sha256']==source and binding['main_build_report_sha256']==sha(raw('build-comparison.json'))
 assert binding['actual_compiler_inputs_sha256']==scratch_build['source_sha256']
 entry=copymap[binding['receipt']];stored=raw(entry['path']);assert sha(stored)==entry['stored_sha256']==binding['published_receipt_sha256']
 original=stored if entry['original_storage']=='identity'else gzip.decompress(stored)
 assert sha(original)==entry['original_sha256']==old['receipt_sha256']==scratch_manifest[entry['archive_member']]['sha256']
 assert saved['receipt-copy-map.json'][binding['receipt']]['path']==entry['archive_member']==binding['archived_receipt_member']
 receipt=json.loads(gzip.decompress(original)if original.startswith(b'\x1f\x8b')else original)
 if binding['kind']=='surfpool':
  assert receipt['candidate_sha256']==candidate and receipt['original_sha256']==v['original_sha256']and not receipt['mismatches']
  value={'original':receipt['original'],'candidate':receipt['candidate']}
 else:value=receipt
 verified=verify_transactions(value);assert verified==expected[sha(original)]['verified']
 for key,count in verified.items():counts[binding['kind']][key]+=count
assert counts=={'differential':{'transactions':15830,'signatures':24216},'surfpool':{'transactions':2048,'signatures':2980}}
assert sha(raw('all-differential.json.gz'))==scratch_manifest['all-differential.json.gz']['sha256']
match=data('function-match.json');assert match['normalized_body_equal']and match['all_25_direct_target_bodies_match']and not match['full_byte_equality']
assert match['original_body']['bytes']==match['candidate_body']['bytes']==1840
assert len(match['direct_target_checks'])==25 and len({row['candidate_target']for row in match['direct_target_checks']})==6
assert all(row['full_target_body_matches']for row in match['direct_target_checks'])
assert match['original_body']==saved['function-match.json']['original_body']and match['candidate_body']==saved['function-match.json']['candidate_body']
current=False
if a.current_main:
 R=next(p for p in P.parents if(p/'evidence/upstream/pump.json').is_file())
 maps=data('source-harness-sha256.json')
 for group in ['source','harness','runtime','documentation','build_helpers']:
  for name,digest in maps[group].items():assert sha((R/name).read_bytes())==digest,(group,name)
 assert sha((R/maps['surfpool']['path']).read_bytes())==maps['surfpool']['sha256']
 sys.path.insert(0,str(P));from elf_reader import Elf
 o=Elf(R/'evidence/original/pump/deployed.so');c=Elf(P/'candidate.so');s=Elf(P/'unstripped.so')
 assert sha(o.b)==v['original_sha256']and sha(c.b)==candidate
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
 start=match['candidate_body']['start'];origin=match['original_body']['start'];size=1840
 assert o.normalized[origin:origin+size]==c.normalized[start:start+size]and o.pattern(origin,size)==c.pattern(start,size)
 funcs={(f['start'],f['size'])for f in s.funcs};ranges={p:(o.entries[i+1]if i+1<len(o.entries)else o.hi)-p for i,p in enumerate(o.entries)}
 for call in c.callsites(start,size):
  dest=o.calls[origin+call['offset']];sizes=[n for at,n in funcs if at==call['target']];assert len(sizes)==1
  n=sizes[0];assert ranges[dest]==n and o.normalized[dest:dest+n]==c.normalized[call['target']:call['target']+n]and o.pattern(dest,n)==c.pattern(call['target'],n)
 assert c.pattern(start,size)==[{'offset':248,'type':8,'symbol':''}]
 for elf,at in [(o,origin),(c,start)]:
  at+=248;ptr=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
  assert elf.b[ptr:ptr+8]==bytes.fromhex('17b7f83760d8ac60')
 current=True
print(json.dumps({'payload_files':len(manifest),'scratch_sealed_files':len(seen),'source_inputs':36,'candidate_sha256':candidate,'main_scratch_whole_file_equal':True,'differential_suites':37,'differential_cases':9217,'surfpool_runners':28,'surfpool_comparisons':1024,'receipt_bindings':65,'verified':counts,'current_main_and_static_match_checked':current,'full_original_byte_equality':False},indent=2))
