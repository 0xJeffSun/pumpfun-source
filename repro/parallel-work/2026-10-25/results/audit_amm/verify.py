#!/usr/bin/env python3
"""Offline integrity/coverage verifier. Does not execute program or probe semantics."""
import hashlib,io,json,pathlib,tarfile,tomllib
B=pathlib.Path(__file__).resolve().parent

def sha(b):return hashlib.sha256(b).hexdigest()
def safe(p):
 q=pathlib.PurePosixPath(p)
 assert not q.is_absolute() and '..' not in q.parts,p
 out=B.joinpath(*q.parts)
 assert not out.is_symlink(),p
 return out

def main():
 manifest=json.loads((B/'SHA256SUMS.json').read_text())
 actual={p.relative_to(B).as_posix() for p in B.rglob('*') if p.is_file()}
 assert actual==set(manifest)|{'SHA256SUMS.json'},'file set mismatch'
 for p,h in manifest.items():assert sha(safe(p).read_bytes())==h,('SHA256',p)
 provenance=json.loads((B/'provenance.json').read_text())
 lock=tomllib.loads((B/'inputs/programs/pump-amm/Cargo.lock').read_text())
 pins={f"{p['name']}-{p['version']}.crate":p.get('checksum') for p in lock['package']}
 for r in provenance:
  b=safe(r['path']).read_bytes();assert sha(b)==r['sha256'] and len(b)==r['bytes'],r['path']
  if 'git_blob' in r:
   assert r['commit']=='517d77db988d8c63b6cf476f0be138c5a4f3128a'
   assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
   if r['path'].endswith('.crate'):assert sha(b)==pins[pathlib.PurePosixPath(r['path']).name]
  else:
   with tarfile.open(fileobj=io.BytesIO(safe(r['archive_path']).read_bytes())) as t:
    assert t.extractfile(r['archive_member']).read()==b,r['path']
 result=json.loads((B/'result.json').read_text());coverage=json.loads((B/'inputs/repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/coverage.json').read_text())
 expected={r['id'] for r in coverage['functions'] if r['path'].startswith('programs/pump-amm/')}
 assert {r['id'] for r in result['functions']}==expected and len(result['functions'])==112
 assert {r['handler'] for r in result['handlers']}=={r['handler'] for r in coverage['handlers'] if r['program']=='pump_amm'}
 assert len([r for r in result['handlers'] if 'source'in r])==37
 assert {r['name'] for r in result['contexts']}=={r['name'] for r in coverage['account_contexts'] if r['path'].startswith('programs/pump-amm/')}
 assert len(result['contexts'])==29
 spans=[]
 for k in ['handlers','functions','contexts']:
  for r in result[k]:
   if 'source'in r:spans.append(r['source'])
   for f in r.get('field_sources',[]):spans.append(f['source'])
   if 'unit'in r:assert r['unit'] in result['units']
 for s in spans:
  b=safe(s['path']).read_bytes();a,z=s['byte_start'],s['byte_end_exclusive'];assert 0<=a<z<=len(b)
  assert sha(b[a:z])==s['sha256'],s
  assert b[:a].count(b'\n')+1==s['line_start'],s
  assert b[:z].count(b'\n')+1==s['line_end'],s
 assert result['security_signoff'] is False and result['source_changes']==[]
 assert len(result['observations'])==9
 for u in result['units'].values():assert len(u['conclusions'])==8 and all(len(v)>60 for v in u['conclusions'].values())
 print(json.dumps({'status':'PASS','scope':'integrity_and_source_coverage_only_not_security_certification','sealed_files_excluding_manifest':len(manifest),'provenance_records':len(provenance),'verified_source_spans':len(spans),'implemented_handlers':37,'missing_create_config':1,'functions':112,'contexts':29,'builds':0,'runtime_probes':0,'original_binary_reverified':False},indent=2))
if __name__=='__main__':main()
