"""Pure, read-only ELF translation predictor; no matcher or input edits."""
from pathlib import Path
from collections import Counter
from bisect import bisect_right
import hashlib,importlib.util,json,re,struct
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('qualified_translation_reader',P/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
sha=lambda b:hashlib.sha256(b).hexdigest()

def sections(path):
 result=[];pattern=r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+)\s+(\S+):\((\.text[^)]*)\)\s*'
 for line in path.read_text().splitlines():
  x=re.fullmatch(pattern,line)
  if x:result.append(dict(address=int(x[1],16),size=int(x[3],16),owner=x[5].rsplit('/',1)[-1],section=x[6]))
 return result


def compare(before_path,after_path,before_map,after_map,kind="symbols"):
 before_sections=sections(before_map);after_sections=sections(after_map)
 idof=lambda r:(r['owner'],r['section'])
 left={idof(x):x for x in before_sections};right={idof(x):x for x in after_sections}
 assert len(left)==len(before_sections)==len(right)==len(after_sections)==456 and left.keys()==right.keys()
 movement=[]
 for ident,x in left.items():
  y=right[ident];assert x['size']==y['size'];movement.append(dict(file=ident[0],section=ident[1],before=x['address'],after=y['address'],size=x['size']))
 movement.sort(key=lambda x:x['before']);starts=[x['before']for x in movement]

 def translate(address):
  if not 288<=address<664672:return address
  i=bisect_right(starts,address)-1;r=movement[i];assert r['before']<=address<r['before']+r['size'];return r['after']+address-r['before']
 for key in ['before','after']:
  ordered=sorted(movement,key=lambda r:r[key]);assert ordered[0][key]==288 and ordered[-1][key]+ordered[-1]['size']==664672
  assert all(a[key]+a['size']==b[key]for a,b in zip(ordered,ordered[1:]))

 def inspect(kind):
  before=m.Elf(Path(before_path));after=m.Elf(Path(after_path))
  assert before.header['entry']!=after.header['entry'] and translate(before.header['entry'])==after.header['entry']
  assert {k:v for k,v in before.header.items()if k!='entry'}=={k:v for k,v in after.header.items()if k!='entry'}
  assert before.ph==after.ph and before.sections==after.sections
  expected=bytearray(before.b);struct.pack_into('<Q',expected,24,translate(before.header['entry']))
  calls=0;text_relocations=0;code_literals=0;branches=0
  for row in movement:
   a,b,n=row['before'],row['after'],row['size'];body=bytearray(before.b[a:a+n])
   for delta in range(0,n,8):
    pc=a+delta;op,reg,off,imm=struct.unpack_from('<BBhi',before.b,pc);rel=before.rel.get(pc)
    if op==0x85 and reg==0x10 and (rel is None or rel['type']!=10):
     old_target=pc+8+imm*8;new_target=translate(old_target);new_pc=b+delta;assert(new_target-new_pc-8)%8==0
     struct.pack_into('<i',body,delta+4,(new_target-new_pc-8)//8);calls+=1
    if rel is not None and rel['type']==8:
     assert op==0x18 and delta+16<=n;value=struct.unpack_from('<I',before.b,pc+4)[0]|struct.unpack_from('<I',before.b,pc+12)[0]<<32;new=translate(value)
     struct.pack_into('<I',body,delta+4,new&0xffffffff);struct.pack_into('<I',body,delta+12,new>>32);text_relocations+=1;code_literals+=new!=value
   for branch in before.window(a,a+n)['branches']:
    assert branch['within_window']
    branch_delta=branch['pc']-a
    _,_,jump,_=struct.unpack_from('<BBhi',after.b,b+branch_delta)
    assert translate(branch['target'])==b+branch_delta+8+jump*8
    branches+=1
   assert bytes(body)==after.b[b:b+n],('text prediction mismatch',kind,row)
   expected[b:b+n]=body
  assert calls==4929
  rel_before=Counter((translate(x['address']),x['type'],x['symbol_index'],x['symbol'])for x in before.relocations)
  rel_after=Counter((x['address'],x['type'],x['symbol_index'],x['symbol'])for x in after.relocations)
  assert rel_before==rel_after
  data_records=[]
  for sec in before.sections:
   if sec['name']in ['.text','.rel.dyn','.dynsym','.symtab']or sec['type']==8:continue
   a,n=sec['offset'],sec['size'];body=bytearray(before.b[a:a+n]);translated_ptrs=[]
   for rel in before.relocations:
    p=rel['address']
    if not(sec['flags']&2)or not sec['address']<=p<sec['address']+n:continue
    assert rel['type']==8;at=a+p-sec['address'];low,value=struct.unpack_from('<II',before.b,at);assert low==0,(kind,sec['name'],p,hex(low),hex(value),rel);new=translate(value)
    struct.pack_into('<II',body,p-sec['address'],0,new)
    translated_ptrs.append(dict(site=p,before=value,after=new,target_moved=new!=value))
   assert body==after.b[a:a+n],('data/scaffold mismatch',kind,sec['name'])
   expected[a:a+n]=body
   data_records.append(dict(section=sec['name'],flags=sec['flags'],bytes=n,pointer_sites=len(translated_ptrs),moved_pointer_sites=sum(x['target_moved']for x in translated_ptrs),byte_equal_before=before.b[a:a+n]==after.b[a:a+n],pointers=translated_ptrs))
  symbol_counts={}
  for table in ['.dynsym','.symtab']:
   if table not in before.sec:continue
   sec=before.sec[table];a,n=sec['offset'],sec['size'];body=bytearray(before.b[a:a+n]);count=0
   for p in range(a,a+n,24):
    value=struct.unpack_from('<Q',before.b,p+8)[0];new=translate(value);struct.pack_into('<Q',body,p-a+8,new);count+=value!=new
   assert body==after.b[a:a+n],('symbol table mismatch',kind,table)
   expected[a:a+n]=body;symbol_counts[table]=dict(entries=n//24,translated_values=count)
  # REL records may reorder; every complete record was independently matched above.
  sec=before.sec['.rel.dyn'];a,n=sec['offset'],sec['size'];expected[a:a+n]=after.b[a:a+n]
  assert bytes(expected)==after.b,'unexpected bytes outside the checked translation fields'
  return dict(kind=kind,before_sha256=sha(before.b),after_sha256=sha(after.b),entrypoint=dict(before=before.header['entry'],after=after.header['entry'],translation_correct=True),program_headers_identical=True,section_headers_identical=True,function_sections=456,direct_calls_exactly_translated=calls,local_branches_checked=branches,cross_section_branches=0,text_relocation_sites=text_relocations,moved_text_code_literals=code_literals,relocations=dict(total=len(before.relocations),types={str(k):v for k,v in Counter(x['type']for x in before.relocations).items()},translated_multiset_equal=True,ordering_equal=[translate(x['address'])for x in before.relocations]==[x['address']for x in after.relocations]),data_and_scaffold=data_records,symbol_tables=symbol_counts,entire_file_accounted_for=True,scope='Predicts every text byte, allocated-data pointer, symbol value and entrypoint under the independent qualified-section permutation. REL record ordering is treated as a verified multiset permutation; no ELF input or output is edited. This is baseline-to-reordered-candidate preservation, not identity with the deployed original.')
 return dict(movement=movement,result=inspect(kind))
