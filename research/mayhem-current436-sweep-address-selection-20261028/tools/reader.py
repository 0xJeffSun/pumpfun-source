#!/usr/bin/env python3
"""Offline static analysis. Never executes ELF inputs or decodes opaque windows.
Normalization follows the retained elf_reader.py; only a window-local copy is
normalized. ELF input bytes are never written or changed.
"""
import collections,gzip,hashlib,json,pathlib,struct,sys,re
P=pathlib.Path(__file__).resolve().parent
I=P/'inputs'
INV='repro/function-inventory/2026-10-24-374fcf0/work/fees-mayhem-function-inventory'
ABI='repro/parallel-work/2026-10-24/results/mayhem_abi/evidence'
CALL='repro/parallel-work/2026-10-25/results/mayhem_error_abi'
FIELD='repro/parallel-work/2026-10-24/wave2-results/mayhem_state_roles'
MACRO='repro/parallel-work/2026-10-25/followup-results/mayhem_macro_bindings'
REV='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
def sha(b):return hashlib.sha256(b).hexdigest()
def read(s):return json.loads((I/s).read_text())
def ranges(indices):
 out=[]
 for x in indices:
  if out and out[-1][1]==x:out[-1][1]=x+1
  else:out.append([x,x+1])
 return out
def diff(a,b):
 n=min(len(a),len(b));rr=ranges(i for i in range(n) if a[i]!=b[i]);tail=[n,max(len(a),len(b))] if len(a)!=len(b) else None
 return dict(equal=a==b,original_bytes=len(a),candidate_bytes=len(b),overlap_mismatches=sum(e-s for s,e in rr),mismatch_ranges=rr,excess_tail=tail,tail_owner=('original' if len(a)>len(b) else 'candidate') if tail else None,total_mismatches_including_tail=sum(e-s for s,e in rr)+(max(len(a),len(b))-n))
def complement(lo,hi,spans):
 out=[];pos=lo
 for a,b in sorted(spans):
  a=max(lo,a);b=min(hi,b)
  if b<=a:continue
  if a>pos:out.append([pos,a])
  pos=max(pos,b)
 if pos<hi:out.append([pos,hi])
 return out
class Elf:
 def __init__(self,path):
  self.b=(I/path).read_bytes();b=self.b
  assert b[:6]==b'\x7fELF\x02\x01'
  vals=struct.unpack_from('<HHIQQQIHHHHHH',b,16)
  names=['type','machine','version','entry','phoff','shoff','flags','ehsize','phentsize','phnum','shentsize','shnum','shstrndx']
  self.header=dict(zip(names,vals));h=self.header
  raw=[struct.unpack_from('<IIQQQQIIQQ',b,h['shoff']+i*h['shentsize']) for i in range(h['shnum'])]
  strs=raw[h['shstrndx']];st=b[strs[4]:strs[4]+strs[5]];self.sections=[]
  for i,x in enumerate(raw):
   row=dict(zip(['name_offset','type','flags','address','offset','size','link','info','alignment','entry_size'],x));row.update(index=i,name=st[x[0]:].split(b'\0',1)[0].decode(),header_offset=h['shoff']+i*h['shentsize']);self.sections.append(row)
  self.sec={x['name']:x for x in self.sections};t=self.sec['.text'];self.lo=t['offset'];self.hi=self.lo+t['size'];assert t['address']==self.lo
  self.ph=[dict(offset=h['phoff']+i*h['phentsize'],values=list(struct.unpack_from('<IIQQQQQQ',b,h['phoff']+i*h['phentsize']))) for i in range(h['phnum'])]
  self.symbols=[];tables={}
  for s in self.sections:
   if s['type'] not in [2,11]:continue
   st=self.sections[s['link']];strings=b[st['offset']:st['offset']+st['size']];rows=[]
   for p in range(s['offset'],s['offset']+s['size'],s['entry_size']):
    n,info,other,idx,val,size=struct.unpack_from('<IBBHQQ',b,p);row=dict(table=s['name'],index=len(rows),record_offset=p,name=strings[n:].split(b'\0',1)[0].decode(),info=info,other=other,section_index=idx,value=val,size=size);rows.append(row);self.symbols.append(row)
   tables[s['index']]=rows
  self.relocations=[]
  for s in self.sections:
   if s['type'] not in [4,9]:continue
   for p in range(s['offset'],s['offset']+s['size'],s['entry_size']):
    at,info=struct.unpack_from('<QQ',b,p);row=dict(section=s['name'],record_offset=p,address=at,type=info&0xffffffff,symbol_index=info>>32,raw_hex=b[p:p+s['entry_size']].hex());ts=tables.get(s['link'],[]);row['symbol']=ts[row['symbol_index']]['name'] if row['symbol_index']<len(ts) else None
    if s['type']==4:row['addend']=struct.unpack_from('<q',b,p+16)[0]
    self.relocations.append(row)
  self.rel={x['address']:x for x in self.relocations}
 def norm(self,start,end):
  n=bytearray(self.b[start:end]);pat=[]
  for at in range(start,end,8):
   op,reg,off,imm=struct.unpack_from('<BBhi',self.b,at);r=self.rel.get(at);i=at-start
   if op==0x85 and reg==0x10 and (not r or r['type']!=10):n[i+4:i+8]=bytes(4)
   if r:
    pat.append(dict(offset=i,type=r['type'],symbol=r['symbol']))
    if r['type']==8 and op==0x18:n[i+4:i+8]=bytes(4);n[i+12:i+16]=bytes(4)
    elif r['type']==10 and op==0x85:n[i+4:i+8]=bytes(4)
  return bytes(n),pat
 def window(self,start,end):
  assert self.lo<=start<end<=self.hi and start%8==end%8==0
  direct=[];indirect=[];external=[];data=[];branches=[];exits=[];othercalls=[];continuation=None
  for at in range(start,end,8):
   if at==continuation:continue
   op,reg,off,imm=struct.unpack_from('<BBhi',self.b,at);r=self.rel.get(at);item=dict(pc=at,offset=at-start,raw_hex=self.b[at:at+8].hex())
   if op==0x18:
    continuation=at+8
    if r and r['type']==8:
     ptr=(struct.unpack_from('<I',self.b,at+4)[0] | struct.unpack_from('<I',self.b,at+12)[0]<<32);data.append(dict(**item,target=ptr,kind='code' if self.lo<=ptr<self.hi else 'data',extent=None,equality='unresolved',relocation=r))
   if op==0x85:
    if r and r['type']==10:external.append(dict(**item,relocation=r,status='external_symbol_only_implementation_unclosed'))
    elif reg==0x10:direct.append(dict(**item,signed_immediate=imm,target=at+8+imm*8,status='address_only_transitive_unclosed'))
    else:othercalls.append(dict(**item,status='unrecognized_call_encoding'))
   elif op==0x8d:indirect.append(dict(**item,status='indirect_register_target_unresolved'))
   elif op==0x95:exits.append(item)
   elif op&7 in [5,6]:branches.append(dict(**item,target=at+8+off*8,within_window=start<=at+8+off*8<end,feasibility='unresolved'))
  n,pat=self.norm(start,end)
  return dict(start=start,end=end,raw_sha256=sha(self.b[start:end]),normalized_sha256=sha(n),normalization_pattern=pat,direct=direct,indirect=indirect,external=external,unrecognized_calls=othercalls,data_references=data,branches=branches,exits=exits,semantic_equality='unresolved')
def category(names):
 s=' '.join(names).lower()
 if any(x in s for x in ['mayhem_recovered','mayhemrecovered','globalparams','mayhemstate']):return 'source organization/ownership'
 if any(x in s for x in ['anchor','solana','spl','core','alloc','std','rust']):return 'linked dependency/helper'
 return 'ambiguous/unattributed'
def analyze():
 O=Elf('evidence/original/mayhem/deployed.so');C=Elf('repro/mayhem/twentyfour/mayhem_recovered.so');S=Elf(INV+'/inputs/mayhem-symbols.so')
 old=read(INV+'/mayhem-functions.json');abi=read(ABI+'/result.json');oc={x['original_start']:x for x in old['original_rows']};ac={x['start']:x for x in abi['candidate_rows']}
 assert sha(O.b)==old['inputs']['original']['sha256'] and sha(C.b)==old['inputs']['candidate']['sha256']
 assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 group=collections.defaultdict(set)
 for s in S.symbols:
  if s['info']&15==2 and s['size']>=8 and S.lo<=s['value']<S.hi:group[(s['value'],s['value']+s['size'])].add(s['name'])
 assert len(group)==len(old['candidate_rows'])
 rows=[];allowed_original={};pairs=[]
 for idx,x in enumerate(old['candidate_rows']):
  a,b=x['candidate_start'],x['candidate_end'];assert group[a,b]==set(x['names'])
  excluded='metadata' in ac[a]['disposition'];r=dict(id=f'C{idx:04}',start=a,end=b,names=x['names'],category='explicitly stopped' if excluded else category(x['names']),prior_row=idx,prior_disposition=ac[a]['disposition'],original_matches=[],known_counterparts=x['known_unmatched_counterparts'],scope='opaque' if excluded else 'static_window')
  if excluded:r['reason']=ac[a]['disposition'];r['body_analysis']=None
  else:
   r['work_group']=r['category'];r['category']='ambiguous/unattributed' if r['category']=='source organization/ownership' else r['category']
   r['body_analysis']=C.window(a,b);assert r['body_analysis']['raw_sha256']==x['candidate_raw_sha256']
   assert r['body_analysis']['normalized_sha256']==x['candidate_normalized_sha256']
   assert [(d['pc'],d['target']) for d in r['body_analysis']['direct']]==[(d['pc'],d['target']) for d in x['dependencies']['direct']]
   for m in x['original_matches']:
    at,end=m['original_start'],m['original_end'];assert at!=528112
    allowed_original[at]=('candidate_pattern_correspondence',end)
    on,op=O.norm(at,end);cn,cp=C.norm(a,b)
    p=dict(candidate_start=a,original_start=at,original_end=end,raw_body_equal=C.b[a:b]==O.b[at:end],normalized_instruction_equal=cn==on,relocation_pattern_equal=cp==op,actual_call_targets_equal=None,referenced_data_equal=None,semantic_equality=None,prior_claim=m)
    assert p['normalized_instruction_equal'] and p['relocation_pattern_equal'];p['raw_body_comparison']=diff(O.b[at:end],C.b[a:b]);r['original_matches'].append(p);pairs.append(p)
   for m in x['known_unmatched_counterparts']:
    allowed_original[m['original_start']]=('inherited_non_initializer_handler',m['original_end'])
    m['fresh_raw_comparison']=diff(O.b[m['original_start']:m['original_end']],C.b[a:b]);m['category']='ambiguous/unattributed';m['actual_source_gap_established']=False
  rows.append(r)
 # Additional selected original windows: already justified by withdrawal, error,
 # state-role and codec studies. Do not expand them to enclosing unknown rows.
 selected=[]
 for source in [CALL,FIELD]:
  for w in read(source+'/windows.json'):
   if w.get('kind','code')!='code' or w['label'].startswith('candidate'):continue
   a,b=w['start'],w['end'];bb=(I/source/w['path']).read_bytes();assert O.b[a:b]==bb
   selected.append(dict(source=source+'/windows.json',label=w['label'],body_analysis=O.window(a,b)))
 original=[]
 for idx,x in enumerate(old['original_rows']):
  a,b=x['original_start'],x['original_end'];r=dict(id=f'O{idx:04}',start=a,end=b,bounds=x['bounds'],prior_row=idx,prior_status=x['status'],prior_candidates=x['candidate_matches'],scope='opaque',category='explicitly stopped' if a==528112 else 'ambiguous/unattributed',body_analysis=None)
  if a in allowed_original:
   reason,end=allowed_original[a];assert b==end;r.update(scope='static_window',category='linked dependency/helper' if reason=='candidate_pattern_correspondence' else 'ambiguous/unattributed',admission=reason,body_analysis=O.window(a,b))
  if r['body_analysis']:
   assert r['body_analysis']['raw_sha256']==x['original_raw_sha256']
   assert r['body_analysis']['normalized_sha256']==x['original_normalized_sha256']
   assert [(d['pc'],d['target']) for d in r['body_analysis']['direct']]==[(d['pc'],d['target']) for d in x['dependencies']['direct']]
  original.append(r)
 byc={r['start']:r for r in rows};byo={r['start']:r for r in original}
 for r in rows+original:
  w=r['body_analysis']
  if not w:continue
  targetmap=byc if r['id'][0]=='C' else byo
  for d in w['direct']:
   t=targetmap.get(d['target']);d['target_row']=t['id'] if t else None;d['target_scope']=t['scope'] if t else 'outside_catalogue';d['actual_target_equality']=None
 for p in pairs:
  cw=byc[p['candidate_start']]['body_analysis'];ow=byo[p['original_start']]['body_analysis'];od={d['offset']:d for d in ow['direct']};checked=[]
  for d in cw['direct']:
   other=od.get(d['offset']);tr=byc.get(d['target']);poss=[m['original_start'] for m in tr['original_matches']] if tr else []
   checked.append(dict(candidate_pc=d['pc'],original_pc=other['pc'] if other else None,candidate_target=d['target'],original_target=other['target'] if other else None,possible_original_targets=poss,status='mapped_target_supported' if other and other['target'] in poss else 'unresolved',unique_target_mapping=bool(other and poss==[other['target']])))
  p['direct_target_pairs']=checked;p['all_direct_target_correspondences_supported']=all(x['status']=='mapped_target_supported' for x in checked)
  p['actual_call_targets_equal']=None # symbolic correspondence is not address or full implementation equality
  p['numeric_direct_targets_equal']=all(x['candidate_target']==x['original_target'] for x in checked)
  p['transitive_closure']=False
  p['referenced_data_pairs']=[]
  odat={d['offset']:d for d in ow['data_references']}
  for d in cw['data_references']:
   other=odat.get(d['offset']);p['referenced_data_pairs'].append(dict(candidate_pc=d['pc'],original_pc=other['pc'] if other else None,candidate_target=d['target'],original_target=other['target'] if other else None,extent=None,equal=None,status='extent_and_identity_unresolved'))
 # Every section, relocation and uncovered interval remains explicit.
 secdiff=[]
 for name in sorted(set(O.sec)|set(C.sec)):
  os,cs=O.sec.get(name),C.sec.get(name);item=dict(name=name,original=os,candidate=cs,category='toolchain/build provenance')
  if os and cs and os['type']!=8 and cs['type']!=8:item['payload_comparison']=diff(O.b[os['offset']:os['offset']+os['size']],C.b[cs['offset']:cs['offset']+cs['size']])
  else:item['payload_comparison']=None
  for tag,ss,ee in [('original',os,O),('candidate',cs,C)]:
   if ss and ss['type']!=8:item[tag+'_payload_sha256']=sha(ee.b[ss['offset']:ss['offset']+ss['size']])
  secdiff.append(item)
 coverage={}
 for side,e,rs in [('original',O,original),('candidate',C,rows)]:
  spans=[(r['start'],r['end']) for r in rs];reviewed=[(r['start'],r['end']) for r in rs if r['body_analysis']]
  if side=='original':reviewed += [(r['body_analysis']['start'],r['body_analysis']['end']) for r in selected]
  file_spans=[(0,e.header['ehsize']),(e.header['phoff'],e.header['phoff']+e.header['phnum']*e.header['phentsize']),(e.header['shoff'],e.header['shoff']+e.header['shnum']*e.header['shentsize'])]+[(s['offset'],s['offset']+s['size']) for s in e.sections if s['type']!=8]
  coverage[side]=dict(text=[e.lo,e.hi],uncatalogued_text_intervals=complement(e.lo,e.hi,spans),body_analysis_uncovered_intervals=complement(e.lo,e.hi,reviewed),outside_header_or_section_intervals=complement(0,len(e.b),file_spans))
 # Attach every relocation to a row, selected window, or unresolved data boundary.
 for side,e,rs in [('original',O,original),('candidate',C,rows)]:
  for rel in e.relocations:
   rel['owner_rows']=[r['id'] for r in rs if r['start']<=rel['address']<r['end']]
   rel['category']='linked dependency/helper' if rel['type']==10 else 'diagnostic/data metadata'
   rel['target_equality']=None
 # Recheck exact bounded witnesses against full binaries; previous analysers
 # additionally verify instruction/data assertions in the portable verifier.
 witnessed=[]
 for root in [CALL,FIELD]:
  for w in read(root+'/windows.json'):
   a,b=w['start'],w['end'];e=C if w['label'].startswith('candidate') else O;raw=(I/root/w['path']).read_bytes();assert e.b[a:b]==raw
   witnessed.append(dict(package=root,label=w['label'],start=a,end=b,kind=w.get('kind','code'),sha256=sha(raw),full_binary_rebound=True))
 data_pairs=[]
 for ow in witnessed:
  if ow['package']!=CALL or ow['kind']=='code' or not ow['label'].startswith('original_'):continue
  cw=next((w for w in witnessed if w['package']==CALL and w['label']=='candidate_'+ow['label'][9:]),None)
  if cw:
   data_pairs.append(dict(label=ow['label'][9:],original=[ow['start'],ow['end']],candidate=[cw['start'],cw['end']],raw_equal=O.b[ow['start']:ow['end']]==C.b[cw['start']:cw['end']],original_sha256=ow['sha256'],candidate_sha256=cw['sha256'],scope='bounded_bytes_only_no_recursive_closure'))
 edges=[]
 for r in rows:
  if not r['body_analysis']:continue
  for d in r['body_analysis']['direct']:
   if d['target']==530416:edges.append(dict(row=r['id'],**d,abi_argument_return_status='previous_bounded_witness' if d['pc'] in [0x59078,0x58d48] else 'unresolved'))
 assert len(edges)==494
 predicates=[]
 for f in abi['formatter_predicates']:
  a,b=f['original_range'];c,d=f['candidate_range'];assert O.b[a:b].hex()==f['original_hex'] and C.b[c:d].hex()==f['candidate_hex'];predicates.append(f)
 diagnostics=[];receipts=[]
 for f in sorted((I/'repro/mayhem/twentyfour').glob('*-pump-swap-*-differential.json.gz')):
  j=json.loads(gzip.decompress(f.read_bytes()));assert j['candidate_sha256']==sha(C.b) and j['original_sha256']==sha(O.b)
  receipts.append(dict(path=str(f.relative_to(I)),case_count=len(j['cases']),normalized_log_differences=j['normalized_log_differences'],scope='saved_finite_regression_not_reexecuted'))
  for idx,c in enumerate(j['cases']):
   if not c.get('normalized_log_difference'):continue
   logs={s:c[s]['metadata']['logs'] for s in ['original','candidate']};pan={s:[v for v in logs[s] if 'panicked' in v.lower() or 'Program log:' in v and ('overflow' in v or 'unwrap' in v)] for s in logs}
   diagnostics.append(dict(source=str(f.relative_to(I)),json_pointer=f'/cases/{idx}',case=c['case'],error={s:c[s]['error'] for s in logs},panic_logs=pan,unwrap_detail_difference=any('unwrap' in v for v in pan['candidate']) and not any('unwrap' in v for v in pan['original']),category='diagnostic/data metadata',full_logs_sha256={s:sha(json.dumps(logs[s],sort_keys=True).encode()) for s in logs},status='retained_observation_no_source_patch_justified'))
 assert len(diagnostics)==26 and sum(d['unwrap_detail_difference'] for d in diagnostics)==8
 source_refs=[]
 for f in sorted((I/'programs/mayhem/src').rglob('*.rs')):
  raw=f.read_bytes();pos=0
  for n,line in enumerate(raw.splitlines(keepends=True),1):
   if any(t in line for t in [b'.unwrap(',b'fn math(',b'->Result',b'-> Result',b'field_8',b'field_15']):
    if b'initialize_mayhem_state' not in line:source_refs.append(dict(path=str(f.relative_to(I)),line=n,byte_start=pos,byte_end=pos+len(line),sha256=sha(line),text=line.decode().rstrip()))
   pos+=len(line)
 source_binding=[]
 build=read('repro/mayhem/twentyfour/build-comparison.json')
 for path,h in build['source_sha256'].items():
  f=I/path
  source_binding.append(dict(path=path,build_sha256=h,current_sha256=sha(f.read_bytes()) if f.exists() else None,equal=sha(f.read_bytes())==h if f.exists() else None))
 assert all(r['equal'] for r in source_binding)
 # Exact-token crosswalk correction is a documentation-only pending proposal.
 cross=read('repro/mayhem/field-role-crosswalk/crosswalk.json');bad=next(r for r in cross['mayhem_state_fields'] if r['field']=='field_8')['trade_read_write_references']
 assert len(bad)==12
 for r in bad:
  b=(I/r['path']).read_bytes();line=b.splitlines()[r['line']-1].decode();assert sha(b)==r['source_sha256'] and line==r['text'];assert re.search(r'\bfield_89\b',line) and not re.search(r'\bfield_8\b',line)
 header_comparison=dict(elf_header=diff(O.b[:O.header['ehsize']],C.b[:C.header['ehsize']]),program_headers=diff(O.b[O.header['phoff']:O.header['phoff']+O.header['phnum']*O.header['phentsize']],C.b[C.header['phoff']:C.header['phoff']+C.header['phnum']*C.header['phentsize']]),section_headers=diff(O.b[O.header['shoff']:O.header['shoff']+O.header['shnum']*O.header['shentsize']],C.b[C.header['shoff']:C.header['shoff']+C.header['shnum']*C.header['shentsize']]))
 summary=dict(original_sha256=sha(O.b),candidate_sha256=sha(C.b),original_size=len(O.b),candidate_size=len(C.b),whole_file_equal=O.b==C.b,candidate_rows=len(rows),original_rows=len(original),candidate_opaque_rows=sum(r['scope']=='opaque' for r in rows),original_opaque_rows=sum(r['scope']=='opaque' for r in original),raw_equal_candidate_bodies=sum(any(p['raw_body_equal'] for p in r['original_matches']) for r in rows),normalized_candidate_bodies=sum(bool(r['original_matches']) for r in rows),constructor_edges=len(edges),constructor_caller_rows=len(set(d['row'] for d in edges)),panic_rows=len(diagnostics),unwrap_detail_rows=sum(d['unwrap_detail_difference'] for d in diagnostics),accepted_changes=0,new_builds=0,new_runtime_executions=0)
 return dict(schema='mayhem-layer01-static-v1',baseline=REV,summary=summary,whole_file_comparison=diff(O.b,C.b),pending_documentation_proposal=dict(category='source organization/ownership',field='MayhemState.field_8',incorrect_reference_count=12,action='Generate a new crosswalk using exact identifier tokens; preserve immutable historical crosswalk.',accepted=False,program_source_patch=None),header_comparison=header_comparison,elf=dict(original_header=O.header,candidate_header=C.header,original_program_headers=O.ph,candidate_program_headers=C.ph,sections=secdiff,original_relocations=O.relocations,candidate_relocations=C.relocations,symbols_binding=dict(symbol_sha256=sha(S.b),text_equal=True,all_symbols=S.symbols)),candidate_rows=rows,original_rows=original,selected_original_windows=selected,coverage=coverage,bounded_witnesses=witnessed,bounded_data_pairs=data_pairs,all_field_inventory=cross,macro_bindings={k:read(MACRO+'/result.json')[k] for k in ['contracts','contexts','handlers','obligations']},constructor_edges=edges,formatter_predicates=predicates,diagnostics=diagnostics,receipt_inventory=receipts,source_refs=source_refs,source_binding=source_binding,field_dispositions=read(FIELD+'/result.json')['fields'],macro_findings=read(MACRO+'/result.json')['new_findings'],limits=['No original initializer or mixed-entry body decoded; original unknown rows remain opaque.','All prior raw rows remain sealed in inputs; prior claims do not become fresh semantic proof.','Inferred boundaries can merge or split historical functions; every branch feasibility remains unresolved.','Normalized data pointers have unknown extent unless covered by bounded witness.','Local internal-return ABI evidence is not a unique historical compiler fingerprint.'])
if __name__=='__main__':
 result=analyze();dest=pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else P/'residual-ledger.json';assert dest.resolve().is_relative_to(P)
 dest.write_text(json.dumps(result,indent=2,sort_keys=True)+'\n');print(json.dumps(result['summary'],sort_keys=True))
