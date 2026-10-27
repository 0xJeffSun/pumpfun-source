"""Account for raw differences without permuting or patching either ELF."""
from pathlib import Path
from collections import Counter
import gzip,hashlib,importlib.util,json,struct,tempfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]

def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def audit_images(original,candidate,symbols,windows):
 p=module('layout_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
 with tempfile.TemporaryDirectory()as temp:
  d=Path(temp)
  for name,raw in [('original.so',original),('candidate.so',candidate),('unstripped.so',symbols),('original-windows.json',windows)]: (d/name).write_bytes(raw)
  measured=p.analyze(d)
 o,c=p.Elf(original),p.Elf(candidate);O=measured['original-function-ledger.json'];C=measured['candidate-function-ledger.json'];key=lambda f:(f['bytes'],f['normalized_sha256'])
 assert len(O)==len(C)==492 and Counter(map(key,O))==Counter(map(key,C))
 blocks=[];delta=Counter();start=None
 for i,(a,b)in enumerate(zip(O,C)):
  if start is None and key(a)==key(b):continue
  if start is None:start=i
  delta[key(a)]+=1;delta[key(b)]-=1
  if not any(delta.values()):
   assert O[start]['start']==C[start]['start']and a['end']==b['end']
   blocks.append(dict(first_ordinal=start,last_ordinal=i,start=O[start]['start'],end=a['end'],original_body_sizes=[f['bytes']for f in O[start:i+1]],candidate_body_sizes=[f['bytes']for f in C[start:i+1]],candidate_names=[f['names']for f in C[start:i+1]]));delta.clear();start=None
 assert start is None
 counts=Counter();references=[]
 for a,b in zip(O,C):
  if any(r['first_ordinal']<=a['ordinal']<=r['last_ordinal']for r in blocks):continue
  assert a['start']==b['start']and key(a)==key(b)
  mask={}
  for ref in a['direct_calls']:
   for at in range(ref['offset']+4,ref['offset']+8):mask[at]='aligned_direct_call_operand'
  for ref in a['data_references']:
   for at in [*range(ref['offset']+4,ref['offset']+8),*range(ref['offset']+12,ref['offset']+16)]:mask[at]='aligned_relocated_pointer_operand'
  raw_o=o.at(a['start'],a['bytes']);raw_c=c.at(b['start'],b['bytes'])
  differences=[at for at,(x,y)in enumerate(zip(raw_o,raw_c))if x!=y]
  assert all(at in mask for at in differences)
  counts.update(mask[at]for at in differences)
  if differences:references.append(dict(ordinal=a['ordinal'],start=a['start'],different_bytes=len(differences),categories=dict(Counter(mask[at]for at in differences))))
 for block in blocks:
  n=sum(x!=y for x,y in zip(o.at(block['start'],block['end']-block['start']),c.at(block['start'],block['end']-block['start'])));block['positionally_different_bytes']=n;counts['permuted_body_region_positions']+=n
 text_differences=sum(x!=y for x,y in zip(o.section_bytes(o.by_name['.text']),c.section_bytes(c.by_name['.text'])));assert sum(counts.values())==text_differences
 # Non-text differences are checked structurally, never erased for comparison.
 details={};other_count=0
 for name,stride in [('.data.rel.ro',8),('.dynsym',24),('.rel.dyn',16)]:
  A=o.section_bytes(o.by_name[name]);B=c.section_bytes(c.by_name[name]);assert len(A)==len(B);rows=[]
  for at in range(0,len(A),stride):
   left,right=A[at:at+stride],B[at:at+stride]
   if left==right:continue
   different=[i for i,(x,y)in enumerate(zip(left,right))if x!=y];other_count+=len(different)
   if name=='.data.rel.ro':
    low_a,target_a=struct.unpack('<II',left);low_b,target_b=struct.unpack('<II',right);assert low_a==low_b==0
    a=next(f for f in O if f['start']==target_a);b=next(f for f in C if f['start']==target_b);assert key(a)==key(b)
    row=dict(offset=at,original_target=target_a,candidate_target=target_b,original_ordinal=a['ordinal'],candidate_index=b['index'],normalized_body_equal=True)
   elif name=='.dynsym':
    x=struct.unpack('<IBBHQQ',left);y=struct.unpack('<IBBHQQ',right);assert x[:4]==y[:4]and x[5]==y[5];row=dict(offset=at,original_value=x[4],candidate_value=y[4],other_fields_equal=True)
   else:
    x,info_a=struct.unpack('<QQ',left);y,info_b=struct.unpack('<QQ',right);assert info_a==info_b;row=dict(offset=at,original_relocation_site=x,candidate_relocation_site=y,info_equal=True)
   row['different_bytes']=len(different);rows.append(row)
  details[name]=rows
 # Account for every remaining common file position, including the ELF header.
 ranges=[(s['offset'],s['offset']+s['size'])for s in o.sections if s['name']in ('.text','.data.rel.ro','.dynsym','.rel.dyn')]
 outside=[i for i,(a,b)in enumerate(zip(original,candidate))if a!=b and not any(lo<=i<hi for lo,hi in ranges)]
 assert all(24<=at<32 for at in outside)
 entry_a,entry_b=struct.unpack_from('<Q',original,24)[0],struct.unpack_from('<Q',candidate,24)[0]
 a=next(f for f in O if f['start']==entry_a);b=next(f for f in C if f['start']==entry_b);assert key(a)==key(b)
 whole=sum(a!=b for a,b in zip(original,candidate));assert whole==text_differences+other_count+len(outside)
 return dict(original_sha256=hashlib.sha256(original).hexdigest(),candidate_sha256=hashlib.sha256(candidate).hexdigest(),normalized_body_multisets_equal=True,permutation_blocks=blocks,text_byte_accounting=dict(counts),aligned_changed_windows=references,non_text_differences=details,header=dict(differing_offsets=outside,original_entry=entry_a,candidate_entry=entry_b,normalized_entry_body_equal=True),common_file_differences=whole,original_only_tail=len(original)-len(candidate),whole_file_equal=original==candidate,scope='Positional byte accounting and normalized shape only; not unique function attribution, semantic pointer identity, source recovery or a byte patch.')

def analyze():
 root=ROOT/'repro/donation-relay/donation-wrapper-artifact-recovery';meta=json.loads((root/'metadata.json').read_bytes())['variants']['recovered']['artifacts'];images={}
 for name,row in meta.items():
  raw=gzip.decompress((root/row['path']).read_bytes());assert hashlib.sha256(raw).hexdigest()==row['sha256'];images[name]=raw
 return audit_images((ROOT/'evidence/dependencies/donation_relay/deployed.so').read_bytes(),images['candidate'],images['symbols'],(ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes())
if __name__=='__main__':
 result=analyze();(HERE/'report.json').write_text(json.dumps(result,indent=2,sort_keys=True)+'\n');print(json.dumps({k:result[k]for k in ['text_byte_accounting','common_file_differences','original_only_tail']}));print('permutation blocks',len(result['permutation_blocks']))
