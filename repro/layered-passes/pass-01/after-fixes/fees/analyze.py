#!/usr/bin/env python3
"""Static-only deterministic Fees residual analysis. Never runs an input executable."""
from pathlib import Path
import argparse,collections,hashlib,json,struct,tarfile
import inventory_method as method
from elf_reader import Elf
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):return json.loads((W/p).read_text())
def dump(obj):return json.dumps(obj,sort_keys=True,separators=(',',':'))+'\n'
def ranges(indices):
 out=[]
 for i in indices:
  if out and out[-1][1]==i:out[-1][1]+=1
  else:out.append([i,i+1])
 return out
def diff(a,b):
 n=min(len(a),len(b)); rr=ranges(i for i in range(n) if a[i]!=b[i]); tail=[] if len(a)==len(b) else [[n,max(len(a),len(b))]]
 return dict(original_bytes=len(a),candidate_bytes=len(b),original_sha256=sha(a),candidate_sha256=sha(b),equal=a==b,shared_prefix_length=n,shared_length_mismatches=sum(y-x for x,y in rr),mismatch_ranges=rr,excess_tail_ranges=tail,excess_side='original' if len(a)>len(b) else 'candidate' if len(b)>len(a) else None,total_positional_mismatches=sum(y-x for x,y in rr)+abs(len(a)-len(b)))
SECF=['name_index','type','flags','address','file_offset','size','link','info','alignment','entry_size']
def sections(e):return [dict(name=n,**dict(zip(SECF,s)),payload_sha256=sha(e.b[s[4]:s[4]+s[5]]) if s[1]!=8 else None) for n,s in e.secs.items()]
def headers(e):
 b=e.b
 fields=dict(zip(['type','machine','version','entry','program_header_offset','section_header_offset','flags','header_size','program_header_entry_size','program_header_count','section_header_entry_size','section_header_count','section_name_table_index'],struct.unpack_from('<HHIQQQIHHHHHH',b,16)))
 ph=[]
 for i in range(fields['program_header_count']):
  p=fields['program_header_offset']+i*fields['program_header_entry_size']
  ph.append(dict(index=i,offset=p,**dict(zip(['type','flags','file_offset','vaddr','paddr','file_size','memory_size','alignment'],struct.unpack_from('<IIQQQQQQ',b,p)))))
 return dict(ident_hex=b[:16].hex(),fields=fields,program_headers=ph,sections=sections(e))
def owner(rows,x):
 # Linear is deterministic and small (at most 585 windows).
 for r in rows:
  if r['start']<=x<r['end']:return r['start']
 return None
def section_at(e,x):
 return [n for n,s in e.secs.items() if s[1]!=8 and s[4]<=x<s[4]+s[5]]
def classify(names):
 if not names:return 'ambiguous/unattributed'
 if any('pump_fees' in n for n in names):return 'source organization/ownership'
 return 'linked dependency/helper'
def instructions(e,rows):
 allrows=[]
 for w in rows:
  inst=[];p=w['start']
  while p<w['end']:
   op,regs,off,imm=struct.unpack_from('<BBhi',e.b,p);size=16 if op==0x18 else 8
   r=dict(pc=p,window_offset=p-w['start'],opcode=op,dst=regs&15,src=regs>>4,offset_signed=off,immediate_signed=imm,size=size,raw_hex=e.b[p:p+size].hex())
   if op==0x18:r['immediate_u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,p+12)[0]<<32)
   if p in e.calls:r.update(kind='direct_call',target=e.calls[p],target_window=owner(rows,e.calls[p]),target_semantics='unresolved')
   elif op==0x85:r.update(kind='external_or_unresolved_call',relocation=e.relocations.get(p),target_semantics='unresolved')
   elif op==0x8d:r.update(kind='indirect_call',target_semantics='unresolved')
   elif op==0x95:r.update(kind='exit',return_value_semantics='unresolved')
   elif op&7 in (5,6):
    t=p+8+off*8;r.update(kind='branch',target=t,target_window=owner(rows,t),condition_semantics='unresolved',conditional=(op&0xf0)!=0)
   inst.append(r);p+=size
  starts={r['pc'] for r in inst}
  for r in inst:
   if r.get('kind')=='branch':r['target_is_instruction_in_window']=r['target'] in starts
  allrows.append(dict(start=w['start'],end=w['end'],instructions=inst))
 return allrows

def relocation_ledger(e,rows):
 result=[]
 # Enumerate every ELF REL/RELA section; preserve raw entry and unhandled types.
 for name,s in e.secs.items():
  if s[1] not in (4,9):continue
  width=s[9] or (24 if s[1]==4 else 16)
  for p in range(s[4],s[4]+s[5],width):
   at,info=struct.unpack_from('<QQ',e.b,p);typ=info&0xffffffff;target=None
   r=dict(table=name,entry_offset=p,raw_entry=e.b[p:p+width].hex(),site=at,type=typ,symbol_index=info>>32,symbol=e.symbols.get(info>>32),site_sections=section_at(e,at),site_window=owner(rows,at),status='unresolved_relocation')
   if s[1]==4:r['addend']=struct.unpack_from('<q',e.b,p+16)[0]
   if typ==8 and at+8<=len(e.b):
    if e.lo<=at<e.hi and e.b[at]==0x18:
     target=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32;r['encoding']='lddw low/high immediates'
    else:
     word=struct.unpack_from('<Q',e.b,at)[0];target=word>>32;r['encoding']='captured R_BPF_64_RELATIVE upper word';r['stored_word']=word
    r.update(target=target,target_sections=section_at(e,target),target_window=owner(rows,target),status='code_pointer_semantics_unresolved' if e.lo<=target<e.hi else 'data_pointer_extent_unresolved')
   elif typ==10:r['status']='external_symbol_boundary'
   result.append(r)
 return result

def comparison_relocations(cat,eo,ec):
 result=[]
 for c in cat['candidate_rows']:
  for pair in c['matches']:
   for p in c['relocation_pattern']:
    off=p['offset'];cp=c['start']+off;op=pair['start']+off;typ=p['type']
    r=dict(candidate_window=c['start'],original_window=pair['start'],offset=off,type=typ,symbol=p['symbol'],original_site=op,candidate_site=cp)
    if typ==8:
     ot=struct.unpack_from('<I',eo.b,op+4)[0]|struct.unpack_from('<I',eo.b,op+12)[0]<<32
     ct=struct.unpack_from('<I',ec.b,cp+4)[0]|struct.unpack_from('<I',ec.b,cp+12)[0]<<32
     cw=next((x for x in cat['candidate_rows'] if x['start']==ct),None)
     r.update(original_target=ot,candidate_target=ct,original_target_sections=section_at(eo,ot),candidate_target_sections=section_at(ec,ct),code_target_pattern_supported=bool(cw and any(m['start']==ot for m in cw['matches'])),referenced_data_equal=None,extent=None,status='unresolved_consumed_extent')
     if eo.lo<=ot<eo.hi and ec.lo<=ct<ec.hi:r['status']='code_pointer_pattern_only' if r['code_target_pattern_supported'] else 'unresolved_code_pointer'
    elif typ==10:r.update(status='same_external_symbol_not_semantics',referenced_data_equal=None)
    result.append(r)
 return result

def bounded_objects(eo,ec):
 objects=read('inputs/bounded-objects-current.json')
 for o in objects:
  e=eo if o['side']=='original' else ec;b=e.b[o['target']:o['end']]
  assert sha(b)==o['sha256'] and b.hex()==o['hex']
  for pc in o['referenced_by']:
   assert e.b[pc]==0x18
   target=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
   assert target==o['target']
  if 'filename' in o:
   f=o['filename'];assert e.b[f['target']:f['end']].hex()==f['hex'] and sha(e.b[f['target']:f['end']])==f['sha256']
  o['extent_basis']='prior bounded dataflow/ABI premise; bytes and LDDW users independently rechecked'
  o['same_role_other_objects']=[dict(target=q['target'],end=q['end'],raw_equal=q['hex']==o['hex']) for q in objects if q['side']!=o['side'] and q['role']==o['role']]
 return objects

def coverage(e,rows,objects):
 known=[(o['target'],o['end']) for o in objects]
 known += [(o['filename']['target'],o['filename']['end']) for o in objects if 'filename' in o]
 out=[]
 for n,s in e.secs.items():
  if s[1]==8 or not s[5]:continue
  begin,end=s[4],s[4]+s[5]
  covered=[(max(begin,a),min(end,b)) for a,b in known if max(begin,a)<min(end,b)] if n!='.text' else [(r['start'],r['end']) for r in rows]
  mask=bytearray(s[5])
  for a,b in covered:mask[a-begin:b-begin]=b'\1'*(b-a)
  out.append(dict(section=n,start=begin,end=end,covered_intervals=covered,uncovered_intervals=[[begin+a,begin+b] for a,b in ranges(i for i,x in enumerate(mask) if not x)],coverage_meaning='instruction inventory only; semantics unresolved' if n=='.text' else 'bounded donation objects only; unmarked data has no consumed-extent proof'))
 return out

def analyze():
 eo,ec=Elf(W/'inputs/original.so'),Elf(W/'inputs/current/candidate.so')
 cat=method.catalogue(W/'inputs/current/candidate.so',W/'inputs/current/symbols.so')
 historical=read('inputs/current/full-function-inventory.json')
 assert cat==historical, 'Fresh whole catalog differs from frozen catalog'
 assert cat['inputs']['candidate']['sha256']==read('input-selection.json')['candidate_sha256']
 # Archived source bytes, with no extraction or execution.
 source=[];manifest=read('inputs/current/source-sha256.json')
 with tarfile.open(W/'inputs/current/source-snapshot.tar.gz','r:gz') as tar:
  members={m.name: m for m in tar.getmembers() if m.isfile()}
  for path,digest in manifest.items():
   m=members.get(path) or members.get('./'+path);assert m is not None,path
   data=tar.extractfile(m).read();assert sha(data)==digest,path
   local=W/'inputs/source'/path
   if local.exists():assert local.read_bytes()==data,path
   source.append(dict(path=path,sha256=digest,bytes=len(data),archive_member=m.name,lines=data.count(b'\n'),frozen_source_matches=local.exists()))
 raw=diff(eo.b,ec.b);secs=[]
 for name in sorted(set(eo.secs)|set(ec.secs)):
  a=eo.secs.get(name);b=ec.secs.get(name)
  r=dict(name=name,original=dict(zip(SECF,a)) if a else None,candidate=dict(zip(SECF,b)) if b else None)
  if a and b and a[1]!=8 and b[1]!=8:r['section_relative_comparison']=diff(eo.b[a[4]:a[4]+a[5]],ec.b[b[4]:b[4]+b[5]])
  r['class']='ambiguous/unattributed' if name=='.text' else 'toolchain/build provenance' if name in ('.dynsym','.dynstr','.rel.dyn','.dynamic','.shstrtab','') else 'diagnostic/data metadata'
  secs.append(r)
 objects=bounded_objects(eo,ec)
 residual=[]
 for side in ['original','candidate']:
  for r in cat[side+'_rows']:
   names=r.get('names',[]) or sorted({n for m in r.get('candidate_matches',[]) for n in m['candidate_names']})
   residual.append(dict(side=side,start=r['start'],end=r['end'],raw_sha256=r['raw_sha256'],pattern_status=r['status'],class_=classify(names),classification_basis='candidate symbol vocabulary only; not proof of mismatch cause',candidate_names=names,body_evidence='see catalog.json; raw/normalized/size/call dimensions independent',full_transitive_call_and_data_equal=None,semantic_equality=None,unknown_is_matched=False,raw_body_equal_other_starts=r['raw_bytes_equal_other_starts_including_terminal'],ambiguity=r['strict_match_ambiguous']))
 inst={side:instructions(e,cat[side+'_rows']) for side,e in [('original',eo),('candidate',ec)]}
 rel={side:relocation_ledger(e,cat[side+'_rows']) for side,e in [('original',eo),('candidate',ec)]}
 headerdiff={}
 for key,start,length in [('elf_header',0,64),('program_headers',64,224)]:headerdiff[key]=diff(eo.b[start:start+length],ec.b[start:start+length])
 oh,ch=headers(eo)['fields'],headers(ec)['fields']
 headerdiff['section_headers']=diff(eo.b[oh['section_header_offset']:oh['section_header_offset']+576],ec.b[ch['section_header_offset']:ch['section_header_offset']+576])
 summary=dict(baseline_commit=None,inputs=cat['inputs'],whole_file_equal=raw['equal'],positional_mismatches=raw['total_positional_mismatches'],shared_length_mismatches=raw['shared_length_mismatches'],excess_tail=raw['excess_tail_ranges'],catalog_freshly_reproduced=True,inventory=cat['summary'],source_inputs_verified=len(source),instructions={side:sum(len(w['instructions']) for w in ws) for side,ws in inst.items()},relocations={side:len(rs) for side,rs in rel.items()},semantic_completion_claim=False,new_accepted_handlers=0,builds_or_target_executions=0,patch_emitted=False)
 from static_details import run as details
 extra=details(cat,eo,ec,objects)
 return {**extra,'catalog.json':cat,'raw-differences.json':dict(whole_file=raw,sections=secs,headers=headerdiff,original_headers=headers(eo),candidate_headers=headers(ec)), 'residual-ledger.json':residual,'instructions.json':inst,'relocations.json':rel,'paired-relocations.json':comparison_relocations(cat,eo,ec),'bounded-objects.json':objects,'coverage.json':{side:coverage(e,cat[side+'_rows'],[o for o in objects if o['side']==side]) for side,e in [('original',eo),('candidate',ec)]},'source-provenance.json':source,'result.json':summary}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args()
 results=analyze()
 for name,obj in results.items():
  b=dump(obj).encode()
  if a.check:assert (W/name).read_bytes()==b,name
  else:(W/name).write_bytes(b)
 print(json.dumps(results['result.json'],indent=2))
