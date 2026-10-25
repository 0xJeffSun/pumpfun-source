#!/usr/bin/env python3
"""Portable static verifier. Default writes nothing; --derive writes analytical JSON only."""
import sys,json,hashlib,struct
from pathlib import Path
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent; I=W/'inputs'
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
for x in J(W/'input-references.json'):
 b=(I/x['path']).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes'],x['path']
source=I/'work/ata-provenance-followup'
for n,x in J(source/'sources.json').items():assert H((source/n).read_bytes())==x['sha256']
for row in J(W/'provenance-matrix.json'):
 raw=(I/row['path']).read_bytes();assert H(raw)==row['sha256']
 lines=raw.decode().splitlines()
 for (lo,hi),expected in zip(row['line_ranges_inclusive'],row['excerpt_sha256']):
  assert 1<=lo<=hi<=len(lines)
  assert H(('\n'.join(lines[lo-1:hi])+'\n').encode())==expected
old=J(I/'work/dependency-function-gap-inventory/ata-functions.json')
a=Elf(I/old['original']['path']);b=Elf(I/old['candidate']['path'])
assert len(a.b)==len(b.b)==105032
assert H(a.b)==old['original']['sha256'] and H(b.b)==old['candidate']['sha256']
def mp(v):
 if 28592<=v<29032:return v+352
 if 29032<=v<29384:return v-440
 return v
rows=[]
assert len(a.entries)==len(b.entries)==len(old['functions'])==159
for k,s in enumerate(a.entries):
 e=a.entries[k+1] if k+1<len(a.entries) else a.hi;t=mp(s);n=e-s
 assert t in b.entries
 assert next((p for p in b.entries if p>t),b.hi)==t+n
 prior=old['functions'][k]
 assert (s,e,t,t+n)==tuple(prior[f] for f in ['original_start','original_end','candidate_start','candidate_end'])
 assert H(a.b[s:e])==prior['original_sha256'] and H(b.b[t:t+n])==prior['candidate_sha256']
 calls=[]
 for pc in range(s,e,8):
  cp=mp(pc);x=a.b[pc:pc+8];y=b.b[cp:cp+8]
  if pc in a.calls:
   assert x[:4]==y[:4] and mp(a.calls[pc])==b.calls.get(cp)
   if x!=y:calls.append({'original_pc':pc,'candidate_pc':cp,'original_target':a.calls[pc],'candidate_target':b.calls[cp],'original_hex':x.hex(),'candidate_hex':y.hex()})
  else:assert x==y,(pc,cp)
 raw=a.b[s:e]==b.b[t:t+n];assert raw==prior['raw_equal_at_mapped_body']
 rows.append({'ordinal':k,'original_range':[s,e],'candidate_range':[t,t+n],'original_sha256':H(a.b[s:e]),'candidate_sha256':H(b.b[t:t+n]),'mapped_raw_equal':raw,'correspondence_verified':True,'changed_direct_calls':calls,'same_address_differing_bytes':sum(x!=y for x,y in zip(a.b[s:e],b.b[s:e])),'historical_source_identity_proven':False})
assert [x['ordinal'] for x in rows if not x['mapped_raw_equal']]==[38,39,41,44,46,47]
diffs=[]
for pc,(x,y) in enumerate(zip(a.b,b.b)):
 if x!=y:
  sec=next((n for n,s in a.secs.items() if s[4]<=pc<s[4]+s[5]),None)
  diffs.append({'offset':pc,'original':x,'candidate':y,'section':sec})
assert len(diffs)==307
assert sum(x['section']=='.text' for x in diffs)==304
assert sum(x['section']=='.rel.dyn' for x in diffs)==3
s=a.secs['.rel.dyn'];off,size=s[4:6]
ar=[struct.unpack_from('<QQ',a.b,p) for p in range(off,off+size,16)]
br=[struct.unpack_from('<QQ',b.b,p) for p in range(off,off+size,16)]
assert sorted((mp(p),kind) for p,kind in ar)==sorted(br)
rel=[{'index':k,'file_range':[off+k*16,off+(k+1)*16],'original':x,'candidate':y} for k,(x,y) in enumerate(zip(ar,br)) if x!=y]
candidates=[]
for k in range(1,6):
 d=I/('repro/pump/ata-candidate-build-'+str(k) if k<5 else 'repro/pump/dependency-exactness/ata-candidate-build-5')
 raw=(d/'spl_associated_token_account.so').read_bytes();c=J(d/'comparison.json')
 assert H(raw)==c['candidate_sha256']
 n=sum(x!=y for x,y in zip(a.b,raw))+abs(len(a.b)-len(raw));assert n==[1199,307,1506,307,1506][k-1]
 candidates.append({'candidate':k,'sha256':H(raw),'bytes':len(raw),'differing_bytes':n,'recorded_source_commit':c['source_commit']})
result={'baseline':'ATA candidate 2 and pre-new-Pump/Fees dependency inventory; no assertion about current core candidates','scope':'static bytes and retained provenance only','full_byte_equality':False,'historical_recipe_reconstructable':False,'inferred_windows':159,'mapped_raw_equal_windows':153,'corresponding_windows':159,'text_differing_bytes':304,'relocation_differing_bytes':3,'total_differing_bytes':307,'text_range':[a.lo,a.hi],'changed_relocations':rel,'candidates':candidates,'missing_inputs':['asset-linked original source revision and resolved lockfile','original feature/dependency graph and Cargo unit metadata','host and BPF Cargo/rustc identities and full invocations including spl_token_2022 -Cmetadata','original release-upload to build/CI association','historical bootstrap image digest and resolved Rust/SDK/link/strip inputs'],'new_builds':0,'new_runtime_probes':0,'reconstructable_historical_recipe':None}
outputs={'windows.json':rows,'byte-differences.json':diffs,'result.json':result}
for name,obj in outputs.items():
 data=json.dumps(obj,indent=2)+'\n'
 if '--derive' in sys.argv:(W/name).write_text(data)
 else:assert (W/name).read_text()==data,name
if (W/'manifest.json').exists():
 for n,h in J(W/'manifest.json').items():assert H((W/n).read_bytes())==h,n
print(json.dumps({'verified_inputs':len(J(W/'input-references.json')),'windows':len(rows),'differing_bytes':len(diffs),'full_byte_equality':False,'historical_recipe_reconstructable':False}))
