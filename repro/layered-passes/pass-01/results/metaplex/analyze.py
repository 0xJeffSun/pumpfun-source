#!/usr/bin/env python3
"""Deterministic static ELF inventory. Standard library; never executes ELF inputs.
Addresses below are file offsets unless qualified as virtual addresses.
Normalization only masks signed call immediates and relocation-address immediates.
"""
import bisect,collections,hashlib,json,struct,sys,tarfile
from pathlib import Path
P=Path(__file__).resolve().parent
SHA=lambda b:hashlib.sha256(b).hexdigest()
def dump(x):return json.dumps(x,indent=2,sort_keys=True)+'\n'
def ranges(ns):
 out=[]
 for n in ns:
  if out and out[-1][1]==n:out[-1][1]+=1
  else:out.append([n,n+1])
 return out
def difference(a,b):
 n=min(len(a),len(b));rs=ranges(i for i in range(n) if a[i]!=b[i])
 if len(a)!=len(b):rs.append([n,max(len(a),len(b))])
 return dict(original_size=len(a),candidate_size=len(b),original_sha256=SHA(a),candidate_sha256=SHA(b),equal=a==b,overlap_mismatches=sum(y-x for x,y in rs if y<=n),excess_tail=[n,max(len(a),len(b))] if len(a)!=len(b) else None,total_mismatch_positions=sum(y-x for x,y in rs),ranges=rs)
class Elf:
 def __init__(self,b):
  self.b=b;assert b[:6]==b'\x7fELF\x02\x01'
  self.header=dict(zip(['ident','type','machine','version','entry','phoff','shoff','flags','ehsize','phentsize','phnum','shentsize','shnum','shstrndx'],struct.unpack_from('<16sHHIQQQIHHHHHH',b)))
  self.header['ident']=self.header['ident'].hex();h=self.header
  self.ph=[dict(zip(['type','flags','offset','vaddr','paddr','filesz','memsz','align'],struct.unpack_from('<IIQQQQQQ',b,h['phoff']+i*h['phentsize']))) for i in range(h['phnum'])]
  rr=[struct.unpack_from('<IIQQQQIIQQ',b,h['shoff']+i*h['shentsize']) for i in range(h['shnum'])];ns=rr[h['shstrndx']];names=b[ns[4]:ns[4]+ns[5]]
  self.sections=[]
  for i,r in enumerate(rr):
   s=dict(zip(['name_offset','type','flags','address','offset','size','link','info','alignment','entry_size'],r));s.update(index=i,name=names[r[0]:].split(b'\0')[0].decode());self.sections.append(s)
  self.sec={s['name']:s for s in self.sections};t=self.sec['.text'];self.lo=t['offset'];self.hi=self.lo+t['size'];self.symbols=[];self.dyn={}
  for s in self.sections:
   if s['type'] not in (2,11):continue
   st=self.sections[s['link']];strings=b[st['offset']:st['offset']+st['size']]
   for idx,at in enumerate(range(s['offset'],s['offset']+s['size'],s['entry_size'])):
    n,info,other,section,v,size=struct.unpack_from('<IBBHQQ',b,at);r=dict(table=s['name'],index=idx,record_offset=at,name=strings[n:].split(b'\0')[0].decode(),info=info,other=other,section=section,value=v,size=size);self.symbols.append(r)
    if s['type']==11:self.dyn[idx]=r['name']
  self.relocs=[];self.rel={}
  for s in self.sections:
   if s['type'] not in (4,9):continue
   for at in range(s['offset'],s['offset']+s['size'],s['entry_size']):
    v,info=struct.unpack_from('<QQ',b,at);site=self.tofile(v);r=dict(table=s['name'],record_offset=at,virtual_site=v,site=site,type=info&0xffffffff,symbol_index=info>>32,symbol=self.dyn.get(info>>32),raw=b[at:at+s['entry_size']].hex())
    if s['type']==4:r['addend']=struct.unpack_from('<q',b,at+16)[0]
    if site is not None:
     if r['type']==8:r['pointer']=self.pointer(site)
     self.rel[site]=r
    self.relocs.append(r)
  self.instructions=self.decode(self.lo,self.hi);self.ins={r['offset']:r for r in self.instructions};self.entries=set();self.anchors=collections.defaultdict(list)
  def entry(v,why):
   if v is not None and self.lo<=v<self.hi and (v-self.lo)%8==0:self.entries.add(v);self.anchors[v].append(why)
  entry(self.tofile(h['entry']),{'kind':'elf_entry'})
  for s in self.symbols:
   if s['info']&15==2 and s['size']:entry(self.tofile(s['value']),dict(kind='symbol',record=s['record_offset'],name=s['name']))
  for r in self.relocs:
   if r['type']==8:entry(self.tofile(r.get('pointer',-1)),dict(kind='relocated_pointer',record=r['record_offset']))
  norm=bytearray(b)
  for r in self.instructions:
   at=r['offset'];rel=self.rel.get(at)
   if r['opcode']==0x85 and r['src']==1 and (not rel or rel['type']!=10):
    r['call_target']=at+8+8*r['immediate'];entry(r['call_target'],dict(kind='signed_direct_call',site=at));norm[at+4:at+8]=bytes(4)
   if rel:
    if rel['type']==8 and r['opcode']==0x18:norm[at+4:at+8]=bytes(4);norm[at+12:at+16]=bytes(4)
    elif rel['type']==10 and r['opcode']==0x85:norm[at+4:at+8]=bytes(4)
  self.normalized=bytes(norm);self.entries=sorted(self.entries)
 def tofile(self,v):
  for s in self.sections:
   if s['type']!=8 and s['size'] and s['address']<=v<s['address']+s['size'] and s['flags']&2:return s['offset']+v-s['address']
  return None
 def pointer(self,at):
  if self.lo<=at<self.hi and self.b[at]==0x18:return struct.unpack_from('<I',self.b,at+4)[0]|struct.unpack_from('<I',self.b,at+12)[0]<<32
  return struct.unpack_from('<Q',self.b,at)[0]>>32
 def decode(self,lo,hi):
  out=[];at=lo
  while at<hi:
   op,reg,off,imm=struct.unpack_from('<BBhi',self.b,at);width=16 if op==0x18 else 8
   r=dict(offset=at,opcode=op,src=reg>>4,dst=reg&15,displacement=off,immediate=imm,raw=self.b[at:at+width].hex())
   if op==0x18:r['u64']=struct.unpack_from('<I',self.b,at+4)[0]|struct.unpack_from('<I',self.b,at+12)[0]<<32
   if op&7 in (5,6) and op not in (0x85,0x95,0x8d):r['branch_target']=at+8+8*off
   out.append(r);at+=width
  assert at==hi;return out
 def owner(self,at):
  i=bisect.bisect_right(self.entries,at)-1
  return i if i>=0 and at<self.hi else None
 def dataref(self,v,other):
  at=self.tofile(v)
  if at is None:return dict(value=v,status='unmapped_immediate_or_pointer',extent=None)
  s=next(s for s in self.sections if s['size'] and s['offset']<=at<s['offset']+s['size'] and s['type']!=8)
  end=min(at+32,s['offset']+s['size']);start=s['offset'];stop=start+s['size']
  return dict(value=v,file_offset=at,section=s['name'],bounded_sample_range=[at,end],bounded_sample_hex=self.b[at:end].hex(),bounded_sample_equal=self.b[at:end]==other.b[at:end],section_raw_equal=self.b[start:stop]==other.b[start:stop],extent=None,status='address_resolves_extent_unproven')
 def window(self,lo,hi,other):
  rows=[r for r in self.instructions if lo<=r['offset']<hi];calls=[];refs=[];branches=[]
  for r in rows:
   at=r['offset'];rel=self.rel.get(at)
   if r['opcode'] in (0x85,0x8d):
    c=dict(site=at,body_offset=at-lo,raw=r['raw'])
    if rel and rel['type']==10:c.update(kind='relocated_external',symbol=rel['symbol'],relocation_record=rel['record_offset'],target_body_status='external_unresolved')
    elif 'call_target' in r:
     dest=r['call_target'];i=self.owner(dest);c.update(kind='signed_relative',target=dest,target_window=i,target_is_entry=dest in self.entries)
     if i is not None:
      a=self.entries[i];z=(self.entries+[self.hi])[i+1];c.update(target_window_range=[a,z],target_body_raw_equal=self.b[a:z]==other.b[a:z],target_body_sha256=SHA(self.b[a:z]),target_body_status='raw_equal' if self.b[a:z]==other.b[a:z] else 'different')
     else:c['target_body_status']='unresolved'
    else:c.update(kind='indirect_or_unresolved',target_body_status='unresolved',instruction=r)
    calls.append(c)
   if 'u64' in r:refs.append(dict(site=at,relocation_record=rel['record_offset'] if rel else None,**self.dataref(r['u64'],other)))
   if 'branch_target' in r:
    target=r['branch_target'];branches.append(dict(site=at,target=target,raw=r['raw'],within_window=lo<=target<hi,target_is_instruction=target in self.ins,status='decoded_condition_not_semantically_proven',classification='ambiguous/unattributed'))
  return dict(range=[lo,hi],sha256=SHA(self.b[lo:hi]),normalized_sha256=SHA(self.normalized[lo:hi]),entry_anchors=self.anchors[lo],calls=calls,immediate_references=refs,branches=branches,relocations=[r for r in self.relocs if r['site'] is not None and lo<=r['site']<hi])
def blocks(e,lo,hi):
 rows=[r for r in e.instructions if lo<=r['offset']<hi];cuts={lo,hi}
 for r in rows:
  at=r['offset']
  if 'branch_target' in r:
   t=r['branch_target']
   if lo<=t<hi:cuts.add(t)
   cuts.add(at+8)
  elif r['opcode']==0x95:cuts.add(at+8)
 cuts=sorted(cuts);out=[]
 for a,b in zip(cuts,cuts[1:]):
  rr=[r for r in rows if a<=r['offset']<b]
  if not rr:continue
  last=rr[-1];successors=[]
  if 'branch_target' in last:successors.append(last['branch_target'])
  if last['opcode'] not in (0x05,0x95) and b<hi:successors.append(b)
  out.append(dict(range=[a,b],raw_sha256=SHA(e.b[a:b]),normalized_sha256=SHA(e.normalized[a:b]),calls=[r['call_target'] for r in rr if 'call_target' in r],successors=successors))
 return out

def analyze():
 O=Elf((P/'prior/inputs/original.so').read_bytes());C=Elf((P/'prior/inputs/build11/token_metadata.so').read_bytes());B=(P/'prior/inputs/build11/rebuilt.deployed.so').read_bytes()
 assert O.entries==C.entries and len(O.entries)==1251
 prior=json.loads((P/'prior/result.json').read_text());hist=json.loads((P/'inputs/repro/function-inventory/2026-10-24-374fcf0/work/dependency-function-gap-inventory/metaplex-functions.json').read_text())
 windows=[]
 for i,(lo,hi) in enumerate(zip(O.entries,O.entries[1:]+[O.hi])):
  a=O.window(lo,hi,C);b=C.window(lo,hi,O);raw=O.b[lo:hi]==C.b[lo:hi];normalized=O.normalized[lo:hi]==C.normalized[lo:hi]
  def key(c):return (c['kind'],c.get('target'),c.get('symbol'))
  ca=[key(x) for x in a['calls']];cb=[key(x) for x in b['calls']]
  hr=hist['functions'][i];assert hr['original_sha256']==a['sha256'] and hr['candidate_sha256']==b['sha256']
  windows.append(dict(ordinal=i,original=a,candidate=b,raw_equal=raw,placement_equal=True,normalized_instruction_equal=normalized,call_target_sequence_equal=ca==cb,call_target_multiset_equal=collections.Counter(ca)==collections.Counter(cb),all_calls_resolved=all(c['target_body_status'] not in ('external_unresolved','unresolved') for c in a['calls']+b['calls']),referenced_data_extent_equality='unproven',classifications=[] if raw else ['source organization/ownership','toolchain/build provenance','ambiguous/unattributed'],historical_row=hr))
 # Keep duplicate byte/pattern candidates explicit; same-ordinal pairing is evidence, not uniqueness.
 for side,other in [('original','candidate'),('candidate','original')]:
  rawindex=collections.defaultdict(list);normindex=collections.defaultdict(list)
  for w in windows:
   rawindex[w[other]['sha256']].append(w['ordinal']);normindex[w[other]['normalized_sha256']].append(w['ordinal'])
  for w in windows:
   w[side]['raw_candidate_ordinals']=rawindex[w[side]['sha256']]
   w[side]['normalized_candidate_ordinals']=normindex[w[side]['normalized_sha256']]
 sections=[]
 for s,t in zip(O.sections,C.sections):
  a=s['offset'];b=t['offset'];n=s['size'];m=t['size'];sections.append(dict(original=s,candidate=t,metadata_equal=s==t,bytes=difference(O.b[a:a+n],C.b[b:b+m]) if s['type']!=8 else None))
 relocs=[]
 for i in range(max(len(O.relocs),len(C.relocs))):
  a=O.relocs[i] if i<len(O.relocs) else None;b=C.relocs[i] if i<len(C.relocs) else None
  relocs.append(dict(index=i,original=a,candidate=b,record_equal=a==b,pointer_value_equal=a.get('pointer')==b.get('pointer') if a and b and a['type']==b['type']==8 else None,original_reference=O.dataref(a['pointer'],C) if a and 'pointer' in a else None,candidate_reference=C.dataref(b['pointer'],O) if b and 'pointer' in b else None))
 def classification(at):
  if O.lo<=at<O.hi:return 'ambiguous/unattributed'
  if O.sec['.data.rel.ro']['offset']<=at<O.sec['.data.rel.ro']['offset']+O.sec['.data.rel.ro']['size']:return 'diagnostic/data metadata'
  return 'toolchain/build provenance'
 diff=difference(O.b,B);runs=[]
 for a,b in diff['ranges']:
  runs.append(dict(range=[a,b],original=O.b[a:b].hex(),candidate=B[a:b].hex(),classification=classification(a),window=O.owner(a),source_decision='no_new_edit_supported',coordinates=[r for r in prior['source_locations'] if r['record_range'][0]<b and r['record_range'][1]>a]))
 symbol_windows=[]
 for side,e,other in [('original',O,C),('candidate',C,O)]:
  for s in e.symbols:
   if s['info']&15!=2:continue
   at=e.tofile(s['value']);size=s['size'];row=dict(side=side,symbol=s,status='zero_size_or_nontext_symbol_no_invented_boundary')
   if at is not None and size and e.lo<=at and at+size<=e.hi:row.update(status='sized_text_symbol',window=e.window(at,at+size,other))
   symbol_windows.append(row)
 # Partition every byte, including gaps outside sections and the captured allocation tail.
 cuts={0,len(O.b),len(C.b),O.header['ehsize'],O.header['phoff'],O.header['phoff']+O.header['phnum']*O.header['phentsize'],O.header['shoff'],O.header['shoff']+O.header['shnum']*O.header['shentsize']}
 for s in O.sections:
  if s['type']!=8:cuts.update([s['offset'],s['offset']+s['size']])
 cuts=sorted(cuts);coverage=[]
 for a,b in zip(cuts,cuts[1:]):
  if a==b:continue
  names=[s['name'] for s in O.sections if s['type']!=8 and s['size'] and s['offset']<=a and b<=s['offset']+s['size']]
  coverage.append(dict(range=[a,b],sections=names,kind='captured_allocation_tail' if a>=len(C.b) else 'section' if names else 'header_table_or_intersection_gap',raw_equal_retained_capture_candidate=O.b[a:b]==B[a:b],different_positions=sum(x!=y for x,y in zip(O.b[a:b],B[a:b]))))
 tail=O.b[len(C.b):];bt=B[len(C.b):]
 assert len(tail)==86543 and not any(tail) and tail==bt and B[:len(C.b)]==C.b
 assert [w['ordinal'] for w in windows if not w['raw_equal']]==[346]
 summary=dict(baseline='c1ffdd0667608d4755227e68aab9f27a7e9a0d37',scope='STATIC only; no accepted source changes, builds or runtime cases',original_vs_candidate_elf=difference(O.b,C.b),original_vs_retained_capture_candidate=diff,elf_headers=dict(original=O.header,candidate=C.header,equal=O.header==C.header),program_headers=dict(original=O.ph,candidate=C.ph,equal=O.ph==C.ph),counts=dict(original_windows=len(O.entries),candidate_windows=len(C.entries),raw_equal_windows=sum(w['raw_equal'] for w in windows),normalized_equal_windows=sum(w['normalized_instruction_equal'] for w in windows),original_relocations=len(O.relocs),candidate_relocations=len(C.relocs),changed_relocations=sum(not r['record_equal'] for r in relocs),symbol_windows=len(symbol_windows)),tail=dict(range=[len(C.b),len(O.b)],size=len(tail),sha256=SHA(tail),nonzero_bytes=sum(x!=0 for x in tail),captured_candidate_equal=tail==bt,method='read existing captured bytes separately; no padding created'),source_coordinates=prior['source_locations'],utilize_calls=dict(original=len(windows[346]['original']['calls']),candidate=len(windows[346]['candidate']['calls']),sequence_equal=windows[346]['call_target_sequence_equal'],multiset_equal=windows[346]['call_target_multiset_equal']),uncovered_text_ranges=[[O.lo,O.entries[0]]] if O.entries[0]>O.lo else [],limitations=['inferred boundaries are not historical debug boundaries','all branches retained but path equivalence remains unproven','pointer samples are bounded evidence, not proved object extents','unmapped constants and indirect calls retained as unresolved','matching caller bytes do not imply matching transitive diagnostics','no authentic historical recipe or exact whole-file equality','extra Metaplex runtime probe explicitly stopped'])
 # Recompute source snippets without claiming those lines were the captured original's source.
 with tarfile.open(P/'prior/inputs/zero/source-snapshot.tar.gz') as t:
  source={m.name:t.extractfile(m).read() for m in t.getmembers() if m.isfile()}
 source_rows=[]
 for r in prior['source_locations']:
  name='programs/token-metadata/'+r['file'];blob=source.get(name);line=r['candidate_line']
  source_rows.append(dict(coordinate=r,archive_member=name,source_sha256=SHA(blob) if blob else None,candidate_context=[dict(line=i+1,text=x) for i,x in enumerate(blob.decode().splitlines()) if line-3<=i<=line+1] if blob else None,original_source_status='historical_source_not_available',classification='diagnostic/data metadata'))
 cfg={side:blocks(e,236632,241736) for side,e in [('original',O),('candidate',C)]}
 for side,other in [('original','candidate'),('candidate','original')]:
  for b in cfg[side]:
   b['raw_matching_other_blocks']=[x['range'] for x in cfg[other] if x['raw_sha256']==b['raw_sha256']]
   b['normalized_matching_other_blocks']=[x['range'] for x in cfg[other] if x['normalized_sha256']==b['normalized_sha256']]
   b['semantic_equivalence']='unproven'
 unresolved=[]
 for w in windows:
  for side in ('original','candidate'):
   for c in w[side]['calls']:
    if c['target_body_status'] in ('unresolved','external_unresolved'):unresolved.append(dict(kind='call',classification='linked dependency/helper' if c['kind']=='relocated_external' else 'ambiguous/unattributed',side=side,ordinal=w['ordinal'],evidence=c))
   for r in w[side]['immediate_references']:
    unresolved.append(dict(kind='immediate_or_data_extent',classification='ambiguous/unattributed',side=side,ordinal=w['ordinal'],evidence=r))
 unresolved.append(dict(kind='excluded_activity',classification='explicitly stopped',activity='extra Metaplex runtime probe',status='not resumed or prepared'))
 summary['cfg_blocks']={s:len(v) for s,v in cfg.items()}
 summary['call_counts']={s:dict(collections.Counter(c['kind'] for w in windows for c in w[s]['calls'])) for s in ('original','candidate')}
 summary['new_source_patch']=None
 return {'pair-residuals.json':dict(captured_pair_runs=runs,unextended_elf_pair_runs=runs+[dict(range=[len(C.b),len(O.b)],original_sha256=SHA(tail),original_all_zero=True,candidate_bytes=None,classification='toolchain/build provenance',status='absent_candidate_tail_not_equal')]),'source-attribution.json':source_rows,'utilize-cfg.json':cfg,'unresolved-ledger.json':unresolved,'result.json':summary,'windows.json':windows,'sections.json':sections,'relocations.json':relocs,'symbol-windows.json':symbol_windows,'residual-ledger.json':runs,'byte-coverage.json':coverage,'utilize-decode.json':dict(original=[r for r in O.instructions if 236632<=r['offset']<241736],candidate=[r for r in C.instructions if 236632<=r['offset']<241736])}
if __name__=='__main__':
 outputs=analyze()
 for name,obj in outputs.items():
  if '--write' in sys.argv:(P/name).write_text(dump(obj))
  else:assert (P/name).read_text()==dump(obj),name
 print(json.dumps(dict(verified=True,**outputs['result.json']['counts'])))
