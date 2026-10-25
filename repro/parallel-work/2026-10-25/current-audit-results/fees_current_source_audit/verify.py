#!/usr/bin/env python3
"""Portable integrity and saved-data checks only. No VM, Git, shell or network."""
import hashlib,json,pathlib,gzip,sys,tarfile,io
P=pathlib.Path(__file__).resolve().parent
C='7a9cf0136087d3a6187be07660cbbfbe62ead526'
K='inputs/'+C+'/repro/pump_fees/donation-business-v144/'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(p):
 q=P/p
 assert not q.is_symlink() and q.resolve().is_relative_to(P),p
 return q.read_bytes()
def js(p):return json.loads(read(p))
def gz(p):return json.loads(gzip.decompress(read(p)))
def checkref(r):
 b=read(r['path']);a=r['byte_start'];z=r['byte_end_exclusive']
 assert 0<=a<=z<=len(b),r
 assert sha(b[a:z])==r['sha256'],r
 assert b[:a].count(b'\n')+1==r['line_start'],r
 assert b[:z].count(b'\n')+bool(z and b[z-1:z]!=b'\n')==r['line_end'],r
 return b[a:z]
def refs(x):
 if isinstance(x,dict):
  if all(k in x for k in ['path','byte_start','byte_end_exclusive','sha256']):checkref(x)
  else:
   for v in x.values():refs(v)
 elif isinstance(x,list):
  for v in x:refs(v)
manifest=js('manifest-sha256.json')
# Nested older manifests are inputs and must remain covered.
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and str(p.relative_to(P))!='manifest-sha256.json' and '__pycache__' not in p.parts}
assert actual==set(manifest),('file-set',actual^set(manifest))
for p,h in manifest.items():assert sha(read(p))==h,p
for row in js('archive-members.json'):
 with tarfile.open(fileobj=io.BytesIO(read(row['archive']))) as archive:
  assert archive.extractfile(row['member']).read()==read(row['path'])
prior=js('prior-seal-subset.json');oldseal=js(prior['manifest']);base=str(pathlib.PurePosixPath(prior['manifest']).parent)
for path in prior['verified_present_entries']:assert sha(read(base+'/'+path))==oldseal[path]
source=js(K+'source-sha256.json');assert len(source)==26
for p,h in source.items():assert sha(read('inputs/'+C+'/'+p))==h,p
f=js('functions.json');c=js('contexts.json');assert (len(f),sum(bool(x['handler']) for x in f),len(c))==(62,31,30)
for x in f+c:refs(x['current_source'])
for filename in ['claims.json','moved-declarations.json','citation-mapping.json','dependency-windows.json']:refs(js(filename))
for m in js('moved-declarations.json'):assert checkref(m['old'])==checkref(m['current'])
for m in js('citation-mapping.json'):
 if m['mode']=='exact-content':assert checkref(m['old'])==checkref(m['current'][0])
 for part in m.get('equal_fragments',[]):assert checkref(part['old'])==checkref(part['current'])
d=gz(K+'differential.json.gz');assert d['candidate_sha256']==js('result.json')['candidate_sha256']
for r in js('saved-case-index.json'):
 row=d
 for k in r['json_pointer'].split('/')[1:]:row=row[int(k)] if isinstance(row,list) else row[k]
 assert sha(json.dumps(row,sort_keys=True,separators=(',',':')).encode())==r['canonical_sha256']
 assert js(r['path'])==row and row['match'] is True
 assert row['original']['error']==row['candidate']['error']
# F1: decode existing saved initializer output only; no transactions executed.
h=gz(K+'initializer-history.json.gz');assert h['case_count']==2
for row in h['cases']:
 for side in ['original','candidate']:
  x=row[side];b=bytes.fromhex(x['state_data_hex']);assert len(b)==2512 and x['error'] is None
  assert int.from_bytes(b[65:69],'little')==0
  assert x['signed_message_and_signature_unchanged'] and x['signature_verification']
# F2: saved authorized short stable write actually fits and retains two encoded tiers.
for i in [298,299]:
 for side in ['original','candidate']:
  x=d['suites']['configuration']['cases'][i][side];b=bytes.fromhex(x['data_hex']);assert len(b)==2512 and x['error'] is None
  offset=69+40*int.from_bytes(b[65:69],'little');assert int.from_bytes(b[offset:offset+4],'little')==2
# F3: readonly funding branch fails; no-op extension and explicitly writable social funding succeed.
for suite,i,err in [('extension',202,'PrivilegeEscalation'),('extension',204,'PrivilegeEscalation'),('extension',206,None),('social_claim_v2',9,'PrivilegeEscalation'),('social_claim_v2',43,None)]:
 for side in ['original','candidate']:
  e=d['suites'][suite]['cases'][i][side]['error'];assert (e is None if err is None else err in e)
# F4: recorded authorized alias, no net SOL movement, counter and time advance.
for side in ['original','candidate']:
 x=d['suites']['buyback']['cases'][1244][side];a=x['before']['buyback_vault'];b=x['after']['buyback_vault'];assert x['error'] is None and a['lamports']==b['lamports']==3338560
 a=bytes.fromhex(a['data']);b=bytes.fromhex(b['data']);assert int.from_bytes(b[40:48],'little')-int.from_bytes(a[40:48],'little')==1000000
 assert int.from_bytes(b[64:72],'little')>int.from_bytes(a[64:72],'little')
# F5: native and token dust survive successful replacement in retained data.
for i in [56,203,325]:
 for side in ['original','candidate']:
  x=d['suites']['sharing_update']['cases'][i][side];assert x['error'] is None
  a=bytes.fromhex(x['before']['sharing_config']['data']);b=bytes.fromhex(x['after']['sharing_config']['data'])
  assert a!=b and b[75]==1 and int.from_bytes(a[76:80],'little')==2
  if i==325:assert int.from_bytes(bytes.fromhex(x['after']['pump_creator_vault_ata']['data'])[64:72],'little')==1
  else:assert x['after']['pump_creator_vault']['lamports']==890881
focused=gz(K+'focused20.json.gz');assert focused['case_count']==20 and focused['mismatches']==[]
assert all(x['match'] and x['expected_failures']=={'original': [], 'candidate': []} and not x['mismatches'] for x in focused['cases'])
r=js('result.json');assert r['security_signoff'] is False and r['whole_original_equal'] is False and r['new_runtime_cases']==0
print(json.dumps({'verified':True,'files':len(manifest),'source_inputs':26,'functions':62,'handlers':31,'contexts':30,'observations_resolved':0,'mode':'integrity and inert saved-data assertions only; no semantic security certification'}))
