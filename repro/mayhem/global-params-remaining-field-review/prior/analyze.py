#!/usr/bin/env python3
"""Deterministic, offline exact-token source attribution; never runs SBF or rustc."""
import copy,hashlib,json,pathlib,re,struct,sys
P=pathlib.Path(__file__).resolve().parent
I=P/'layer01/inputs'
CROSS='repro/mayhem/field-role-crosswalk/crosswalk.json'
ROLE='repro/parallel-work/2026-10-24/wave2-results/mayhem_state_roles/result.json'
def read(p):return json.loads(p.read_text())
def sha(b):return hashlib.sha256(b).hexdigest()
def tokens(b):
 # Mask comments and strings without moving bytes. Nested Rust block comments supported.
 out=bytearray(b);i=0
 while i<len(b):
  start=i
  if b[i:i+2]==b'//':
   j=b.find(b'\n',i);i=len(b) if j<0 else j
  elif b[i:i+2]==b'/*':
   i+=2;depth=1
   while i<len(b) and depth:
    if b[i:i+2]==b'/*':depth+=1;i+=2
    elif b[i:i+2]==b'*/':depth-=1;i+=2
    else:i+=1
   assert depth==0
  elif re.match(rb'(?:b?r)(#*)"',b[i:]):
   m=re.match(rb'(?:b?r)(#*)"',b[i:]);end=b'"'+m[1];j=b.find(end,i+m.end());assert j>=0;i=j+len(end)
  elif b[i:i+1]==b'"':
   i+=1
   while i<len(b):
    if b[i]==92:i+=2
    elif b[i]==34:i+=1;break
    else:i+=1
  else:i+=1;continue
  for k in range(start,i):
   if out[k]!=10:out[k]=32
 return list(re.finditer(rb'[A-Za-z_][A-Za-z_0-9]*',bytes(out))),bytes(out)
def analyze():
 old=read(I/CROSS);prior=read(P/'layer01/residual-ledger.json');roles=read(I/ROLE)
 corrected=copy.deepcopy(old);corrections=[]
 for row in corrected['mayhem_state_fields']:
  refs=[]
  for idx,r in enumerate(row['trade_read_write_references']):
   b=(I/r['path']).read_bytes();assert sha(b)==r['source_sha256'];ls=b.splitlines(keepends=True);line=ls[r['line']-1];assert line.decode().rstrip('\r\n')==r['text']
   ts,_=tokens(line);exact=[t for t in ts if t[0].decode()==row['field']]
   if exact:refs.append(r);continue
   actual=[t for t in ts if t[0]==b'field_89'];assert row['field']=='field_8' and len(actual)==1
   t=actual[0];base=sum(map(len,ls[:r['line']-1]));corrections.append(dict(historical_pointer=f'/mayhem_state_fields/0/trade_read_write_references/{idx}',historical_row=r,claimed='MayhemState.field_8',actual='MayhemState.field_89',token_byte_range=[base+t.start(),base+t.end()],column_byte_range=[t.start()+1,t.end()+1],token='field_89',left_byte=line[t.start()-1:t.start()].hex(),right_byte=line[t.end():t.end()+1].hex(),action='remove_false_attribution; retain existing field_89 row without duplication',category='source organization/ownership'))
  row['trade_read_write_references']=refs
 assert len(corrections)==12
 target=next(x for x in corrected['mayhem_state_fields'] if x['field']=='field_89')['trade_read_write_references']
 assert all(x['historical_row'] in target for x in corrections)
 # Physical Borsh storage, not native Rust member layout. No padding inferred.
 storage={'reset_prefix':(8,40),'paused':(48,1),'admin':(49,32),'trader':(81,32),'sol_deployed':(113,16),'preserved_middle_a':(129,8),'reset_middle':(137,25),'version':(162,4),'field_10':(166,8),'max_sol_per_sweep':(174,8),'reset_stable_prefix':(182,24),'stable_deployed':(206,16),'reset_stable_suffix':(222,24),'max_stable_per_sweep':(246,8)}
 fields=[]
 for r in old['global_params_arguments']:
  role=next((x for x in roles['fields'] if x['argument']==r['argument']),None)
  fields.append(dict(owner='GlobalParams',field=r['argument'],range=[r['account_offset'],r['account_offset']+r['serialized_width']],storage=r['candidate_storage'],role=role['semantic_role'] if role else r['observed_role'],role_evidence=role,historical_name_recovered=False))
 for name,(at,n) in storage.items():
  if name.startswith('reset_') or name in ['field_10','preserved_middle_a']:continue
  fields.append(dict(owner='GlobalParams',field=name,range=[at,at+n],storage=name,role='candidate named storage; source uses recorded separately',historical_name_recovered=False))
 for name,at,store in [('last_sol_withdraw_timestamp',138,'reset_middle[1..9]'),('last_quote_withdraw_timestamp',238,'reset_stable_suffix[16..24]')]:
  fields.append(dict(owner='GlobalParams',field=name,range=[at,at+8],storage=store,role='signed i64 withdrawal timestamp; candidate read/write and retained rate witnesses',historical_name_recovered=False))
 for r in corrected['mayhem_state_fields']:
  fields.append(dict(owner='MayhemState',field=r['field'],range=[r['account_offset'],r['account_offset']+r['serialized_width']],storage=r['field'],role=r['observed_role'],historical_name_recovered=False))
 # Assert the field partition covers every serialized payload byte exactly once.
 for owner,end in [('GlobalParams',254),('MayhemState',106)]:
  spans=sorted(x['range'] for x in fields if x['owner']==owner);cursor=8
  for a,b in spans:assert a==cursor,(owner,a,cursor);cursor=b
  assert cursor==end
 ms={r['field']:(r['account_offset'],r['serialized_width']) for r in old['mayhem_state_fields']}
 accesses=[];mentions=[];source_coverage=[]
 for f in sorted((I/'programs/mayhem/src').rglob('*.rs')):
  path=f.relative_to(I).as_posix();b=f.read_bytes();lines=b.splitlines(keepends=True)
  # Frozen prior source windows admit lib 24..116,127..310,348..462.
  # Declarations at 1..23 are harmless; unadmitted middle spans remain opaque.
  permitted=[(1,116),(127,310),(348,462)] if f.name=='lib.rs' else [(1,len(lines))]
  opaque=[(117,126),(311,347)] if f.name=='lib.rs' else []
  masked=bytearray(b);pos=0
  for ln,line in enumerate(lines,1):
   if not any(a<=ln<=z for a,z in permitted):masked[pos:pos+len(line)]=bytes(10 if v==10 else 32 for v in line)
   pos+=len(line)
  ts,code=tokens(bytes(masked));source_coverage.append(dict(path=path,sha256=sha(b),allowed_lines_inclusive=[list(x) for x in permitted],opaque_lines_inclusive=[list(x) for x in opaque]))
  for t in ts:
   name=t[0].decode()
   if name not in set(storage)|set(ms)|{f'field_{i}' for i in range(16)}:continue
   a,z=t.span();ln=b[:a].count(b'\n')+1;base=b.rfind(b'\n',0,a)+1;line=lines[ln-1];left=code[max(base,a-100):a].decode();tail=code[z:b.find(b'\n',z) if b.find(b'\n',z)>=0 else len(b)].decode()
   owner=None;receiver=None
   if re.search(r'\bmayhem_state\s*\.\s*$',left):owner='MayhemState';receiver='mayhem_state'
   elif re.search(r'\bglobal_params\s*\.\s*$',left):owner='GlobalParams';receiver='global_params'
   elif f.name=='lib.rs' and re.search(r'\bstate\s*\.\s*$',left):owner='GlobalParams';receiver='state (lexical alias in admitted handlers)'
   item=dict(path=path,source_sha256=sha(b),line=ln,token=name,token_byte_range=[a,z],column_byte_range=[a-base+1,z-base+1],line_byte_range=[base,base+len(line)],line_sha256=sha(line),text=line.decode().rstrip('\r\n'),owner=owner)
   if owner and name in (ms if owner=='MayhemState' else storage):
    st,width=(ms if owner=='MayhemState' else storage)[name];extent=[st,st+width];slice_match=re.match(r'\s*\[(\d+)\s*(?:\.\.\s*(\d+))?\]',tail)
    if slice_match:lo=int(slice_match[1]);hi=int(slice_match[2]) if slice_match[2] else lo+1;extent=[st+lo,st+hi]
    dynamic=bool(re.match(r'\s*\[',tail)) and not slice_match
    op='read';post=tail
    if post.lstrip().startswith('['):post=post[post.find(']')+1:]
    if re.match(r'\s*(?:\+=|-=|\*=|/=)',post):op='read_write'
    elif re.match(r'\s*=(?!=)',post) or re.match(r'\s*\.copy_from_slice\s*\(',post):op='write'
    if dynamic:op+='; dynamic_slice';extent=None
    candidates=[x['field'] for x in fields if x['owner']==owner and (extent is None and x['storage'].split('[')[0]==name or extent is not None and x['range'][0]<extent[1] and extent[0]<x['range'][1])]
    item.update(receiver=receiver,operation=op,account_byte_range=extent,logical_fields=candidates,attribution_status='bounded_candidate_source; not binary semantic equivalence',dynamic_extent_unresolved=dynamic)
    if dynamic and f.name=='lib.rs' and ln in [132,140]:
     item['bounded_loop_map']=[{'argument':f'field_{n}','storage_offset':o,'width':8} for n,o in ([(2,8),(3,16),(4,24),(5,32)] if ln==132 else [(11,0),(12,8),(13,16)])]
     item['logical_fields']=[x['argument'] for x in item['bounded_loop_map']]
    accesses.append(item)
   elif name in ['admin','trader'] and re.search(r'has_one\s*=\s*$',left) and re.match(rb'[^\]]*\]\s*pub\s+global_params\s*:',code[z:z+150]):
    st,width=storage[name];item.update(owner='GlobalParams',receiver='Anchor has_one on declared global_params',operation='framework_constraint_read',account_byte_range=[st,st+width],logical_fields=[name],attribution_status='bounded normal Anchor macro premise; original validation not proved',dynamic_extent_unresolved=False);accesses.append(item)
   else:
    item['status']='declaration_argument_event_constraint_or_unresolved_receiver';mentions.append(item)
 # Bind existing original field witnesses to bytes, without expanding admitted windows.
 ob=(I/'evidence/original/mayhem/deployed.so').read_bytes();witnesses=[]
 allowed=[(x['start'],x['end']) for x in prior['original_rows'] if x['scope']!='opaque']+[(x['body_analysis']['start'],x['body_analysis']['end']) for x in prior['selected_original_windows']]
 for r in roles['fields']:
  pcs=[(k,v) for k,v in r.items() if k.endswith('_pc') and isinstance(v,int)]
  for fun in r['functional_reads']:pcs.extend((k,v) for k,v in fun.items() if k.endswith('_pc') and isinstance(v,int))
  for kind,pc in pcs:
   assert any(a<=pc and pc+8<=b for a,b in allowed),(kind,pc)
   raw=ob[pc:pc+8];op,reg,off,imm=struct.unpack('<BBhi',raw)
   witnesses.append(dict(field=r['argument'],kind=kind,file_byte_range=[pc,pc+8],raw_hex=raw.hex(),opcode=op,register_byte=reg,signed_offset=off,signed_immediate=imm,source_evidence=ROLE,interpretation='retained witness rebound; not an invented source-to-PC map'))
 return dict(schema='mayhem-exact-token-v1',baseline=prior['baseline'],corrected_crosswalk=corrected,corrections=corrections,fields=fields,source_accesses=accesses,other_exact_mentions=mentions,source_coverage=source_coverage,original_field_witnesses=witnesses,whole_binary_and_all_window_ledger='layer01/residual-ledger.json',inherited_summary=prior['summary'],opaque_and_uncovered=prior['coverage'],residuals=[dict(category='source organization/ownership',status='pending_documentation_correction',count=12),dict(category='ambiguous/unattributed',status='unknown_GlobalParams_roles',fields=['field_0','field_1','field_3','field_6','field_10']),dict(category='explicitly stopped',status='all inherited opaque windows unchanged'),dict(category='ambiguous/unattributed',status='No whole-original semantic closure, source-PC identity or missing binary field-use absence proof')],accepted_changes=0,program_patch=None)
if __name__=='__main__':
 out=analyze();(P/'residual-ledger.json').write_text(json.dumps(out,indent=2,sort_keys=True)+'\n');(P/'corrected-crosswalk.json').write_text(json.dumps(out['corrected_crosswalk'],indent=2,sort_keys=True)+'\n');print(json.dumps({'corrections':len(out['corrections']),'fields':len(out['fields']),'source_accesses':len(out['source_accesses']),'other_mentions':len(out['other_exact_mentions']),'byte_witnesses':len(out['original_field_witnesses'])}))
