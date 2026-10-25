#!/usr/bin/env python3
"""Portable offline static verifier: Python 3 stdlib, no subprocess/network/build."""
import sys,json,hashlib,struct,collections
from pathlib import Path
sys.dont_write_bytecode=True
H=Path(__file__).resolve().parent
load=lambda p:json.loads((H/p).read_text())
sha=lambda b:hashlib.sha256(b).hexdigest()
for m in load('input-manifest.json'):
 b=(H/'evidence'/m['path']).read_bytes();assert len(b)==m['bytes'] and sha(b)==m['sha256'],m['path']
if (H/'output-manifest.json').exists():
 for m in load('output-manifest.json'):
  assert sha((H/m['path']).read_bytes())==m['sha256'],m['path']
sys.path.insert(0,str(H/'evidence/work/pump-amm-current-body-inventory'))
from elf_reader import Elf
c=load('evidence/work/pump-amm-current-body-inventory/pump_amm-bodies.json')
o=Elf(H/'evidence'/c['original']['path']);b=Elf(H/'evidence'/c['candidate']['path'])
assert o.text[3]==o.text[4] and b.text[3]==b.text[4]
for e,key in [(o,'original'),(b,'candidate')]:assert sha(e.b)==c[key]['sha256']
rows=load('all-row-dispositions.json');res=load('residual-rows.json');result=load('result.json')
assert len(rows)==785 and len(res)==319 and sum(r['bytes'] for r in res)==790024
assert res==[r for r in rows if r['residual_body']]
entries=sorted(set(o.entries)|{o.lo});assert entries==[r['start'] for r in rows]
for i,(r,a) in enumerate(zip(rows,c['original_windows'])):
 assert r['index']==i and r['start']==a['start'] and r['end']==a['end']
 assert r['end']==(entries[i+1] if i+1<len(entries) else o.hi)
 assert sha(o.b[r['start']:r['end']])==r['raw_sha256']
 assert sha(o.normalized[r['start']:r['end']])==r['normalized_sha256']
 assert r['data_gap']==bool(a['data_references']) and r['indirect_call_count']==len(a['indirect_calls'])
 assert r['unresolved_direct_call_targets']==a['unresolved_direct_call_targets']
 matches=[x for x in c['candidate_functions'] if x['bytes']==r['bytes'] and b.pattern(x['start'],x['bytes'])==o.pattern(r['start'],r['bytes']) and b.normalized[x['start']:x['end']]==o.normalized[r['start']:r['end']]]
 assert r['residual_body']==(not matches)
 for d in r['data_previews']:
  raw=o.b[d['file_offset']:d['file_offset']+d['preview_bytes']];assert sha(raw)==d['sha256'] and raw.decode()==d['preview']
near=load('near-shape-candidates.json');actual=[]
for r in res:
 for f in c['candidate_functions']:
  if f['bytes']!=r['bytes'] or o.pattern(r['start'],r['bytes'])!=b.pattern(f['start'],f['bytes']):continue
  dif=[i for i in range(0,r['bytes'],8) if o.normalized[r['start']+i:r['start']+i+8]!=b.normalized[f['start']+i:f['start']+i+8]]
  if len(dif)<=4:actual.append((r['index'],f['start'],dif))
assert actual==[(n['original_index'],n['candidate_start'],n['different_instruction_offsets']) for n in near]
for n in near:
 for off,oi,ci in zip(n['different_instruction_offsets'],n['original_instructions'],n['candidate_instructions']):
  assert o.b[n['original_start']+off:n['original_start']+off+8].hex()==oi
  assert b.b[n['candidate_start']+off:n['candidate_start']+off+8].hex()==ci
for d in load('diagnostic-deltas.json'):
 for key,elf in [('original',o),('candidate',b)]:
  s=d[key];start=d[key+'_start'];x,y=s['filename_file_range'];raw=elf.b[x:y]
  assert raw.decode()==s['filename'] and sha(raw)==s['filename_sha256'] and len(raw)==s['filename_length']
  a,z=s['raw_local_range'];assert elf.b[a:z].hex()==s['raw_local_hex']
  at=start+d['different_instruction_offsets'][0];assert elf.b[at]==0x62 and elf.b[at+8]==0x7a
  assert struct.unpack_from('<I',elf.b,at+4)[0]==s['line']
  assert struct.unpack_from('<I',elf.b,at+12)[0]==s['filename_length']
  p=start+s['pointer_instruction_offset'];assert elf.relocations[p]['type']==8
  pointer=struct.unpack_from('<I',elf.b,p+4)[0]|struct.unpack_from('<I',elf.b,p+12)[0]<<32
  sec=next(v for v in elf.secs.values() if v[3]<=pointer<v[3]+v[5] and v[1]!=8)
  assert sec[4]+pointer-sec[3]==x
assert dict(collections.Counter(r['classification'] for r in res))==result['classification_counts']
assert result['near_shape_original_windows']==len(set(n['original_index'] for n in near))==57
assert result['residual_with_data_gap']==sum(r['data_gap'] for r in res)==260
assert result['residual_with_indirect_calls']==sum(bool(r['indirect_call_count']) for r in res)==32
print(json.dumps({'verified':True,'original_windows':785,'residual_windows':319,'residual_bytes':790024,'local_diagnostic_deltas':10,'near_shape_pairs_not_identities':409,'builds':0,'runtime_probes':0}))
