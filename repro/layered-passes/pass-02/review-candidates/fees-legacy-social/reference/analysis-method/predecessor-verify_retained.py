"""Refresh accepted prior exact bodies and natural-location codec differences."""
from pathlib import Path
import hashlib,json,re,struct,sys
W=Path(__file__).resolve().parent;M=W/'analysis-method';sys.path.insert(0,str(M))
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def run():
 C=Elf(W/'build-02/artifacts/pump_fees_candidate.so');S=Elf(W/'unstripped.so');O=Elf(M/'inputs/original.so');B=Elf(M/'inputs/baseline-symbols.so')
 canon=lambda s:re.sub(r'17h[0-9a-f]{16}E$','E',s)
 def find(old):
  names={f['name'] for f in B.funcs if f['start']==old};a={(f['start'],f['size']) for f in S.funcs if f['name'] in names}
  if len(a)==1:return next(iter(a))
  names={canon(n) for n in names};a={(f['start'],f['size']) for f in S.funcs if canon(f['name']) in names};assert len(a)==1,(old,a);return next(iter(a))
 def cmp(a,b,n):
  return {'candidate_start':a,'original_start':b,'bytes':n,'raw_equal':C.b[a:a+n]==O.b[b:b+n],'normalized_equal':C.normalized[a:a+n]==O.normalized[b:b+n],'relocation_pattern_equal':C.pattern(a,n)==O.pattern(b,n),'candidate_raw_sha256':H(C.b[a:a+n]),'original_raw_sha256':H(O.b[b:b+n]),'different_slots':[i for i in range(0,n,8) if C.normalized[a+i:a+i+8]!=O.normalized[b+i:b+i+8]]}
 p=J(M/'inputs/baseline-retained-static-gate.json');out={'bodies':{},'direct_calls':{},'literals':{}}
 for label,r in p['bodies'].items():
  a,n=find(r['candidate_start']);b=r['original_start'];assert n==r['bytes'];q=cmp(a,b,n);assert q['normalized_equal'] and q['relocation_pattern_equal'],label;out['bodies'][label]=q
 for label,rows in p['direct_calls'].items():
  root=out['bodies'][label];out['direct_calls'][label]=[]
  for r in rows:
   offset=r['call_offset'];a=C.calls[root['candidate_start']+offset];b=O.calls[root['original_start']+offset];assert b==r['original_start']
   sizes={f['size'] for f in S.funcs if f['start']==a};assert sizes=={r['bytes']};q=cmp(a,b,r['bytes']);assert q['normalized_equal'] and q['relocation_pattern_equal'];q['call_offset']=offset;out['direct_calls'][label].append(q)
 for label,rows in p['literals'].items():
  root=out['bodies'][label];out['literals'][label]=[]
  for r in rows:
   pc=root['candidate_start']+r['offset'];assert C.b[pc]==0x18;ptr=struct.unpack_from('<I',C.b,pc+4)[0]|struct.unpack_from('<I',C.b,pc+12)[0]<<32;b=O.b[r['original_target']:r['original_target']+r['bytes']];assert C.b[ptr:ptr+r['bytes']]==b and H(b)==r['sha256'];out['literals'][label].append({**r,'candidate_target':ptr})
 codecs=[]
 for r in J(M/'inputs/baseline-candidate-codecs.json')['full_codecs']:
  a,n=find(r['candidate_start']);assert n==r['bytes'];q=cmp(a,r['original_start'],n);assert q['different_slots']==[528] and q['relocation_pattern_equal'];q['type']=r['type'];q['calls']=[]
  for t in r['calls']:
   off=t['call_offset'];ct=C.calls[a+off];ot=O.calls[r['original_start']+off];assert ot==t['original_start'];sizes={f['size'] for f in S.funcs if f['start']==ct};assert sizes=={t['bytes']};z=cmp(ct,ot,t['bytes']);assert z['normalized_equal'] and z['relocation_pattern_equal'];z['call_offset']=off;q['calls'].append(z)
  # Complete consumed diagnostic filename extent, distinguished from preview-only data.
  pc=a+488;assert C.b[pc]==0x18;ptr=struct.unpack_from('<I',C.b,pc+4)[0]|struct.unpack_from('<I',C.b,pc+12)[0]<<32
  op=r['original_start']+488;oldptr=struct.unpack_from('<I',O.b,op+4)[0]|struct.unpack_from('<I',O.b,op+12)[0]<<32
  length=struct.unpack_from('<i',C.b,a+540)[0];oldlen=struct.unpack_from('<i',O.b,r['original_start']+540)[0];assert length==oldlen;assert C.b[ptr:ptr+length]==O.b[oldptr:oldptr+length]
  q['filename']={'candidate_target':ptr,'original_target':oldptr,'bytes':length,'value':C.b[ptr:ptr+length].decode(),'sha256':H(C.b[ptr:ptr+length])};codecs.append(q)
 return {'candidate_sha256':H(C.b),'original_sha256':H(O.b),'all_retained_gates_passed':True,**out,'codecs':codecs,'limits':['Matched complete bodies and immediate target/literal extents only; no recursive semantic/data closure.','Five codec line-coordinate slots remain different; no padding or source remapping.']}
if __name__=='__main__':
 r=run();(W/'retained-static-gate.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'bodies':len(r['bodies']),'direct_calls':sum(map(len,r['direct_calls'].values())),'literals':sum(map(len,r['literals'].values())),'codecs':len(r['codecs']),'codec_calls':sum(len(x['calls']) for x in r['codecs'])}))
