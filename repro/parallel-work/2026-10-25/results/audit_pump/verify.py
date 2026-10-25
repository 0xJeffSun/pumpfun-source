#!/usr/bin/env python3
"""Offline package integrity verifier. Does not run/build programs or prove security."""
import hashlib,json,pathlib,re,tarfile,tomllib
ROOT=pathlib.Path(__file__).resolve().parent
SHA='517d77db988d8c63b6cf476f0be138c5a4f3128a'
def digest(b):return hashlib.sha256(b).hexdigest()
def readj(p):return json.loads((ROOT/p).read_text())
def safe(p):
 q=ROOT/p
 assert q.resolve().is_relative_to(ROOT),p
 assert not q.is_symlink(),p
 return q
def checks():
 manifest=readj('manifest-sha256.json')
 actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest-sha256.json'}
 assert actual==set(manifest),'Manifest file set differs'
 for p,h in manifest.items():assert digest(safe(p).read_bytes())==h,p
 provenance=readj('provenance.json')
 for r in provenance:
  b=safe('inputs/'+r['path']).read_bytes()
  assert r['commit']==SHA
  assert len(b)==r['bytes'] and digest(b)==r['sha256'],r['path']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['blob'],r['path']
 lock=tomllib.loads((ROOT/'inputs/programs/pump/Cargo.lock').read_text())
 archives={}
 for r in provenance:
  if r['path'].endswith('.crate'):
   stem=pathlib.Path(r['path']).stem;name,version=stem.rsplit('-',1)
   matched=[p for p in lock['package'] if p['name']==name and p['version']==version]
   assert len(matched)==1 and matched[0]['checksum']==r['sha256'],stem
   archives[stem]=r['sha256']
 for r in readj('dependency-provenance.json'):
  b=safe(r['path']).read_bytes();assert digest(b)==r['sha256']
  with tarfile.open(safe(r['archive'])) as t:assert t.extractfile(r['member']).read()==b
 result=readj('result.json');assert result['checkpoint']==SHA and not result['whole_program_signoff']
 for r in result['functions']+result['contexts']:
  s=safe('inputs/'+r['path']).read_text();span=s[r['char_start']:r['char_end_exclusive']]
  assert digest(span.encode())==r['span_sha256'],r
  assert s.count('\n',0,r['char_start'])+1==r['line_start'],r
  assert s.count('\n',0,r['char_end_exclusive'])+1==r['line_end'],r
  assert len(s[:r['char_start']].encode())==r['byte_start']
  assert len(s[:r['char_end_exclusive']].encode())==r['byte_end_exclusive']
 for p in (ROOT/'inputs/programs/pump').rglob('*.rs'):
  name=str(p.relative_to(ROOT/'inputs'))
  declarations=re.findall(r'\bfn\s+(\w+)\s*(?:<|\()',p.read_text())
  got=[f['name'] for f in result['functions'] if f['path']==name]
  assert sorted(declarations)==sorted(got),name
 assert not (ROOT/'inputs/programs/pump/src/sell_v2.rs').exists()
 published=readj('inputs/repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/coverage.json')
 assert sorted(h['handler'] for h in published['handlers'] if h['program']=='pump')==sorted(h['handler'] for h in result['handlers'])
 assert len([h for h in result['handlers'] if h['published_recovery_status']=='partial'])==5
 source_map=readj('inputs/repro/pump/tokenkeg-two-curve-fortyeight/source-sha256.json');bound=[]
 for p,h in source_map.items():
  if p=='programs/pump/src/sell_v2.rs':continue
  assert digest(safe('inputs/'+p).read_bytes())==h,p;bound.append(p)
 windows=[]
 folder='inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-tokenkeg-two-curve-static/'
 for name in ['pump-intermediate_transfer.json','pump_amm-caller_route.json']:
  x=readj(folder+name);b=bytearray();offset=x['start']
  for ins in x['instructions']:
   assert ins['at']==offset,name
   raw=bytes.fromhex(ins['raw']);b.extend(raw);offset+=len(raw)
  assert offset==x['end'] and len(b)==x['bytes'] and digest(b)==x['raw_sha256'],name
  windows.append({k:x[k] for k in ['program','label','start','end','bytes','raw_sha256','entry_bounded']})
 evidence=readj('evidence-checks.json')
 assert evidence['source_map_matched_paths']==bound
 assert evidence['crate_lock_matches']==archives
 assert evidence['saved_windows']==windows
 return dict(ok=True,kind='offline_integrity_and_review_inventory_not_security_signoff',checkpoint=SHA,manifest_files=len(manifest),public_input_blobs=len(provenance),functions=len(result['functions']),contexts=len(result['contexts']),handlers=len(result['handlers']),partial_handlers=5,crate_lock_matches=len(archives),saved_windows=len(windows),source_map_matches=len(bound),runtime_probes=0,source_builds=0)
if __name__=='__main__':
 print(json.dumps(checks(),indent=2))
