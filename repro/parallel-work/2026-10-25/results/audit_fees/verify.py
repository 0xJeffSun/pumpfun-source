#!/usr/bin/env python3
"""Offline package-integrity/static-evidence verifier. Never executes program code."""
from pathlib import Path
import hashlib,json,re,tarfile,tomllib
ROOT=Path(__file__).resolve().parent
def read(path):
 p=ROOT/path
 assert not p.is_symlink(),str(p)
 assert p.resolve().is_relative_to(ROOT),str(p)
 return p.read_bytes()
def js(path):return json.loads(read(path))
def sha(b):return hashlib.sha256(b).hexdigest()
def check_span(s,prefix=''):
 b=read(prefix+s['path']);lines=b.splitlines(keepends=True)
 a=s['line_start'];z=s['line_end'];assert 1<=a<=z<=len(lines),(s['path'],a,z)
 lo=sum(map(len,lines[:a-1]));hi=sum(map(len,lines[:z]));assert (lo,hi)==(s['byte_start'],s['byte_end_exclusive']),s
 assert sha(b[lo:hi])==s['sha256'],s
manifest=js('manifest-sha256.json')
files={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
assert files==set(manifest)|{'manifest-sha256.json'},(files-set(manifest),set(manifest)-files)
for p,h in manifest.items():assert sha(read(p))==h,p
prov=js('provenance.json');assert prov['checkpoint']=='517d77db988d8c63b6cf476f0be138c5a4f3128a'
for r in prov['files']:
 b=read('inputs/'+r['path']);assert len(b)==r['size'] and sha(b)==r['sha256'],r['path']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
assert {str(p.relative_to(ROOT/'inputs')) for p in (ROOT/'inputs').rglob('*') if p.is_file()}=={r['path'] for r in prov['files']}
for r in js('derived-provenance.json'):
 with tarfile.open(ROOT/'inputs'/r['archive']) as t:b=t.extractfile(r['member']).read()
 assert b==read(r['path']) and sha(b)==r['sha256'] and len(b)==r['size']
lock=tomllib.loads(read('inputs/Cargo.lock').decode())
archive='inputs/repro/parallel-work/2026-10-24/wave2-results/fees_context_layout/inputs/anchor-lang-0.31.1.crate'
package=next(x for x in lock['package'] if x['name']=='anchor-lang');assert package['version']=='0.31.1' and package['checksum']==sha(read(archive))
for name in ['anchor-syn','anchor-attribute-program','anchor-attribute-event','anchor-derive-accounts']:
 assert next(x for x in lock['package'] if x['name']==name)['version']=='0.31.2'
r=js('result.json');assert r['handler_count']==31 and r['builds']==0 and r['new_runtime_cases']==0 and not r['security_signoff']
assert len(r['functions'])==62 and len(r['contexts'])==30
seen=[]
for f in sorted((ROOT/'inputs/programs/pump-fees/src').glob('*.rs')):
 text=f.read_text()
 for m in re.finditer(r'\bfn\s+(\w+)\s*(?:<|\()',text):seen.append(f.stem+':'+m[1]+':'+str(text.count('\n',0,m.start())+1))
assert set(seen)=={f['id'] for f in r['functions']} and len(seen)==len(r['functions'])
families={'authorization_accounts','dynamic_accounts_layout','cpi_events','arithmetic','lifecycle_rent','token_assets','state_time_configuration','errors_order_rollback'}
for f in r['functions']:
 check_span(f['source'],'inputs/')
 if f['handler']:
  assert families<=set(f['review']) and f['contexts']
  for s in f['review']['evidence']:check_span(s,'inputs/')
for c in r['contexts']:
 check_span(c['source'],'inputs/');assert c['handlers']
 assert c['declaration'] in read('inputs/'+c['source']['path']).decode()
for s in js('dependency-review.json'):check_span(s)
i=js('identity.json');a=read('inputs/'+i['candidate']['path']);b=read('inputs/'+i['original']['path'])
for k,data in [('candidate',a),('original',b)]:assert sha(data)==i[k]['sha256'] and len(data)==i[k]['bytes'] and i[k]['consumed_byte_range']==[0,len(data)]
assert a!=b and i['whole_file_equal'] is False
assert next(n for n,(x,y) in enumerate(zip(a,b)) if x!=y)==i['first_difference']==24
assert sum(x!=y for x,y in zip(a,b))==i['different_positions_in_shared_length']
assert len(a)-len(b)==i['length_difference']
assert sha(a)==r['candidate_sha256']=='01fedce5878ec14618233c4683bcb4149e471775acb48ffb69614d9df570bb95'
base='inputs/repro/pump_fees/initializer-inline-v144/'
build=js(base+'build-comparison.json');assert build['comparison']['candidate_sha256']==sha(a)
assert build['comparison']['original_sha256']==sha(b)
assert len(build['source_sha256'])==22
for p,h in build['source_sha256'].items():assert sha(read('inputs/'+p))==h,p
for row in i['build_input_matches']:assert row['equal'] and row['expected']==row['actual']==sha(read('inputs/'+row['path']))
rt=js(base+'runtime-summary.json');assert rt['candidate_sha256']==sha(a) and rt['comparison_receipts']==17441 and not rt['mismatches']
assert sum(x.get('case_count') or 0 for x in rt['reports'])==17441
assert all(x['executed_candidate_sha256']==sha(a) and not x['mismatches'] for x in rt['reports'])
vr=js(base+'runtime-verification-result.json');assert vr['comparison_receipts']==17441 and vr['repeat_input_comparisons']==69 and vr['new_unique_cases']==0
assert {x['id'] for x in js('findings.json')}=={'F1','F2','F3','F4','F5'}
assert all(not x['original_vulnerability_established'] and not x['externally_disclosed'] for x in js('findings.json'))
print(json.dumps(dict(result='PASS',checkpoint=prov['checkpoint'],manifest_files=len(manifest),git_blobs=len(prov['files']),handlers=31,explicit_functions=62,accounts_contexts=30,current_build_input_matches=22,candidate_sha256=sha(a),original_sha256=sha(b),whole_file_equal=False,new_builds=0,new_runtime_cases=0,verified='integrity, static spans, source and identity bindings, saved report metadata only',not_verified='manual conclusions, full historical semantics, fresh runtime or signature validation'),indent=2))
