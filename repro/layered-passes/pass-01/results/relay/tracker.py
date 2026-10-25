#!/usr/bin/env python3
"""Deterministic static inventory; never executes an ELF or compiles source."""
import argparse, bisect, collections, hashlib, importlib.util, json, re, struct, sys
from pathlib import Path
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parent
OLD=ROOT/'inputs/repro/parallel-work/2026-10-24/results/donation_relay/evidence'
CTX=ROOT/'inputs/repro/donation-relay/context-source-proposal'
IDL=ROOT/'inputs/repro/donation-relay/idl-source-proposal'
DSP=ROOT/'inputs/repro/donation-relay/dispatch-source-proposal'
REV='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
def h(b):return hashlib.sha256(b).hexdigest()
def js(p):return json.loads(p.read_text())
def enc(x):return (json.dumps(x,indent=2,sort_keys=True)+'\n').encode()
def gap(intervals,lo,hi):
 out=[];at=lo
 for a,z in sorted(intervals):
  a=max(a,lo);z=min(z,hi)
  if z<=a:continue
  if a>at:out.append([at,a])
  at=max(at,z)
 if at<hi:out.append([at,hi])
 return out
def differences(a,b):
 ranges=[];start=None
 for i in range(max(len(a),len(b))):
  diff=i>=min(len(a),len(b)) or a[i]!=b[i]
  if diff and start is None:start=i
  if not diff and start is not None:ranges.append([start,i]);start=None
 if start is not None:ranges.append([start,max(len(a),len(b))])
 return {'equal':a==b,'mismatch_bytes_including_tail':sum(z-a for a,z in ranges),'ranges':ranges,'original_tail':[len(b),len(a)] if len(a)>len(b) else None,'candidate_tail':[len(a),len(b)] if len(b)>len(a) else None}
def elf(b):
 if b[:6]!=b'\x7fELF\x02\x01':raise ValueError('Only ELF64 little-endian supported; no implicit conversions')
 fields=struct.unpack_from('<HHIQQQIHHHHHH',b,16)
 names='type machine version entry phoff shoff flags ehsize phentsize phnum shentsize shnum shstrndx'.split();header=dict(zip(names,fields));sections=[]
 for i in range(header['shnum']):
  at=header['shoff']+i*header['shentsize'];v=struct.unpack_from('<IIQQQQIIQQ',b,at)
  s=dict(zip('name_offset type flags address offset size link info alignment entsize'.split(),v));s.update(index=i,record_offset=at,record_hex=b[at:at+header['shentsize']].hex());sections.append(s)
 strings=sections[header['shstrndx']];st=b[strings['offset']:strings['offset']+strings['size']]
 def cstr(buf,n):return buf[n:].split(b'\0',1)[0].decode('utf8','backslashreplace')
 for s in sections:
  s['name']=cstr(st,s['name_offset']);s['file_extent']=None if s['type']==8 else [s['offset'],s['offset']+s['size']]
  s['sha256']=None if s['type']==8 else h(b[s['offset']:s['offset']+s['size']])
 def fileof(addr):
  for s in sections:
   if s['type']!=8 and s['address']<=addr<s['address']+s['size'] and s['flags']&2:return s['offset']+addr-s['address']
  return None
 symbols=[];tables={};relocs=[];programs=[]
 for s in sections:
  if s['type'] in (2,11):
   strings=sections[s['link']];st=b[strings['offset']:strings['offset']+strings['size']];rows=[]
   for n,at in enumerate(range(s['offset'],s['offset']+s['size'],s['entsize'] or 24)):
    no,info,other,idx,val,size=struct.unpack_from('<IBBHQQ',b,at)
    r={'table':s['index'],'index':n,'record_offset':at,'name':cstr(st,no),'info':info,'other':other,'section_index':idx,'value':val,'size':size,'file_offset':fileof(val),'raw':b[at:at+24].hex()};rows.append(r);symbols.append(r)
   tables[s['index']]=rows
 for s in sections:
  if s['type'] in (4,9):
   for n,at in enumerate(range(s['offset'],s['offset']+s['size'],s['entsize'] or (24 if s['type']==4 else 16))):
    target,info=struct.unpack_from('<QQ',b,at);si=info>>32;t=tables.get(s['link'],[])
    relocs.append({'section_index':s['index'],'index':n,'record_offset':at,'offset':target,'file_offset':fileof(target),'type':info&0xffffffff,'symbol_index':si,'symbol':t[si] if si<len(t) else None,'addend':struct.unpack_from('<q',b,at+16)[0] if s['type']==4 else None,'raw':b[at:at+(24 if s['type']==4 else 16)].hex()})
 for n in range(header['phnum']):
  at=header['phoff']+n*header['phentsize'];v=struct.unpack_from('<IIQQQQQQ',b,at)
  programs.append(dict(zip('type flags offset vaddr paddr filesz memsz align'.split(),v),index=n,record_offset=at,raw=b[at:at+header['phentsize']].hex()))
 return {'header':header,'header_hex':b[:header['ehsize']].hex(),'program_headers':programs,'sections':sections,'symbols':symbols,'relocations':relocs}
def decode(b,e,start,end,va):
 calls=[];branches=[];data=[];normal=bytearray(b[start:end]);p=start
 rel={r['file_offset']:r for r in e['relocations'] if r['file_offset'] is not None}
 def dst(addr):
  return [s['offset']+addr-s['address'] for s in e['sections'] if s['type']!=8 and s['flags']&2 and s['address']<=addr<s['address']+s['size']]
 while p+8<=end:
  op,reg,off,imm=struct.unpack_from('<BBhi',b,p);pc=va+p-start;r=rel.get(p)
  base={'file_offset':p,'pc':pc,'raw':b[p:p+8].hex(),'relocation':r}
  if op==0x18 and p+16<=end:
   val=struct.unpack_from('<I',b,p+4)[0]+(struct.unpack_from('<I',b,p+12)[0]<<32)
   data.append(dict(base,value=val,possible_file_offsets=dst(val),extent=None,status='address-shaped immediate; semantic extent unresolved'))
   if r:normal[p-start+4:p-start+8]=b'\0'*4;normal[p-start+12:p-start+16]=b'\0'*4
   p+=16;continue
  if op==0x85:
   internal=reg>>4==1 and not (r and r['type']==10);target=pc+8+8*imm if internal else None
   calls.append(dict(base,kind='relative' if internal else 'external_or_absolute',signed_immediate=imm,source_register=reg>>4,target=target,target_file_offsets=dst(target) if target is not None else []))
   if internal:normal[p-start+4:p-start+8]=b'\0'*4
  elif op==0x8d:calls.append(dict(base,kind='indirect',register=imm,target=None,target_file_offsets=[]))
  elif op&7 in (5,6) and op!=0x95:branches.append(dict(base,target=pc+8+8*off,target_file_offsets=dst(pc+8+8*off),conditional=op!=5))
  p+=8
 return {'calls':calls,'branches':branches,'address_immediates':data,'normalized_sha256':h(normal),'undecoded_tail':[p,end] if p<end else None}
def static_rows(b,e,windows):
 out=[]
 for w in windows:
  r=dict(w);r['historical_row']=dict(w);r.update(decode(b,e,w['start'],w['end'],w.get('address',w['start'])));out.append(r)
 return out
BUSINESS=[('donate_v1',178,121,190,94,125),('donate_pubkey_config_id_v1',179,135,190,94,125),('donate_native_v1',180,126,191,92,130),('donate_native_pubkey_config_id_v1',181,131,192,93,130),('donate_pubkey_config_id_with_payer_v1',182,138,193,95,141),('close_donation_epoch_v1',183,142,204,96,145),('swap_then_distribute_v1',184,154,203,100,155),('just_swap_v1',185,150,202,99,153),('distribute_after_just_swapping_v1',186,146,201,97,147),('distribute_non_swap_output_mint_v1',187,148,200,98,149),('upsert_mint_whitelist_v1',188,156,105,101,158)]
def sources():
 out=[]
 for root in (CTX/'source',IDL/'proposal'):
  for p in sorted(root.rglob('*.rs')):
   b=p.read_bytes();lines=b.splitlines(keepends=True);at=0;decl=[]
   for n,line in enumerate(lines,1):
    if re.search(rb'\b(fn|trait|struct|enum|mod)\s+',line):decl.append({'line':n,'byte_range':[at,at+len(line)],'text':line.decode().rstrip(),'sha256':h(line),'status':'pending source declaration; no compiled correspondence'})
    at+=len(line)
   out.append({'path':str(p.relative_to(ROOT)),'sha256':h(b),'size':len(b),'lines':[1,len(lines)],'declarations':decl,'status':'uncompiled proposal, not accepted baseline source'})
 return out

def generate(candidate=None,symbol_elf=None):
 spec=importlib.util.spec_from_file_location('retained_relay_analysis',OLD/'analyze.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
 prior=mod.derive()
 for name,value in prior.items():assert value==js(OLD/name),name
 b=(OLD/'inputs/deployed.so').read_bytes();e=elf(b);rows=static_rows(b,e,prior['windows.json'])
 evidence={}
 for p in [CTX/'consumed-code.json',IDL/'selected-windows.json']:
  data=js(p)
  if isinstance(data,list):
   for w in data:
    o=w.get('ordinal') if isinstance(w,dict) else w
    evidence.setdefault(o,[]).append(str(p.relative_to(ROOT)))
 # Mere consumption of a window is explicitly NOT source implementation.
 roles=collections.defaultdict(list)
 for name,wrapper,parser,adapter,body,exit_ in BUSINESS:
  for role,o in [('wrapper',wrapper),('parser',parser),('adapter_or_access',adapter),('body',body),('exit',exit_)]:roles[o].append({'business':name,'role':role})
 idlc=js(IDL/'contracts.json')
 for op in idlc['operations']:
  for role in ('parser','body','exit'):
   if op[role] is not None:roles[op[role]].append({'idl':op['name'],'role':role})
 for o,label in {74:'donation codec',77:'byte-vector codec',78:'shares codec',79:'pubkey-vector codec',103:'native pair predicate',106:'mint policy',108:'recipient settlement',112:'shared donation',113:'fair amounts under admitted weights',169:'dispatcher',170:'IDL dispatcher',189:'event recursion',216:'IDL writer',217:'IDL checked decoder',218:'IDL unchecked decoder'}.items():roles[o].append({'shared':label})
 for o in range(159,169):roles[o].append({'shared':'state codec'})
 for r in rows:
  o=r['ordinal'];r['source_attribution']={'historical_identity':None,'pending_roles':roles[o],'consumed_evidence':evidence.get(o,[]),'status':'bounded pending application proposal' if roles[o] else 'unattributed; evidence consumption does not establish implementation'}
  r['compiled_correspondence']={'candidate_available':False,'full_file_equal':None,'raw_body_equal_at_changed_placement':None,'normalized_instruction_equal':None,'actual_call_target_equal':None,'referenced_data_equal':None}
  r['residual_category']='concrete application-source gap' if roles[o] else 'ambiguous/unattributed'
  r['residual_obligations']=['historical source identity','compiled body mapping','all direct and indirect target identity','referenced-data extent and transitive identity','diagnostic and toolchain provenance']
  for branch in r['branches']:
   branch['target_windows']=[w['ordinal'] for w in rows if any(w['start']<=t<w['end'] for t in branch['target_file_offsets'])]
  for c in r['calls']:
   c['target_windows']=[w['ordinal'] for w in rows if any(w['start']<=t<w['end'] for t in c['target_file_offsets'])]
   c['status']='static signed operand endpoint; no candidate mapping' if c['kind']=='relative' else 'external symbol/loader binding unresolved' if c['kind']=='external_or_absolute' else 'dynamic target unresolved'
 original={'size':len(b),'sha256':h(b),'elf':e}
 comparison={'candidate_available':False,'full_file_equal':None,'raw_mismatch':None,'reason':'No source-built relay candidate at the frozen baseline; 492 windows are not 492 mismatches.'}
 candidate_rows=[];pairs=[];candidate_info=None
 if candidate:
  cb=candidate.read_bytes();ce=elf(cb);candidate_info={'size':len(cb),'sha256':h(cb),'elf':ce}
  comparison={'candidate_available':True,'full_file_equal':b==cb,'raw_mismatch':differences(b,cb),'section_pairs':[],'header_equal':e['header_hex']==ce['header_hex'],'program_headers_equal':e['program_headers']==ce['program_headers'],'relocations_equal':e['relocations']==ce['relocations']}
  # Every same-name section pairing retained (including ambiguous duplicate names).
  for s in e['sections']:
   matches=[x for x in ce['sections'] if x['name']==s['name']]
   comparison['section_pairs'].append({'original_index':s['index'],'candidate_indices':[x['index'] for x in matches],'byte_comparisons':[{'candidate_index':t['index'],'comparison':differences(b[s['offset']:s['offset']+s['size']],cb[t['offset']:t['offset']+t['size']]) if s['type']!=8 and t['type']!=8 else None} for t in matches]})
  se=elf(symbol_elf.read_bytes()) if symbol_elf else ce
  if symbol_elf:candidate_info['symbol_elf']={'size':symbol_elf.stat().st_size,'sha256':h(symbol_elf.read_bytes()),'elf':se,'binding':'per-window same-address byte verification; entire artifact not presumed equivalent'}
  for sym in se['symbols']:
   if sym['info']&15!=2:continue
   r={'ordinal':len(candidate_rows),'symbol':sym,'address':sym['value'],'start':None,'end':None,'status':'zero-sized or unmapped symbol retained'}
   sec=next((s for s in ce['sections'] if s['flags']&4 and s['address']<=sym['value']<s['address']+s['size']),None)
   if sec and sym['size'] and sym['value']+sym['size']<=sec['address']+sec['size']:
    start=sec['offset']+sym['value']-sec['address'];end=start+sym['size'];r.update(start=start,end=end,sha256=h(cb[start:end]),status='candidate symbol extent')
    if symbol_elf:
     sb=symbol_elf.read_bytes();off=sym['file_offset'];r['symbol_body_bytes_equal']=off is not None and sb[off:off+sym['size']]==cb[start:end]
     if not r['symbol_body_bytes_equal']:r['status']='symbol artifact body mismatch; correspondence untrusted'
    r.update(decode(cb,ce,start,end,sym['value']))
   candidate_rows.append(r)
  # Keep all symbol rows; infer additional starts independently in every executable section.
  for sec in ce['sections']:
   if not sec['flags']&4 or sec['type']==8:continue
   start=sec['offset'];end=start+sec['size'];d=decode(cb,ce,start,end,sec['address']);starts={start}
   for c in d['calls']:
    for at in c['target_file_offsets']:
     if start<=at<end and (at-start)%8==0:starts.add(at)
   for r in candidate_rows:
    if r['start'] is not None and start<=r['start']<end:starts.add(r['start'])
   for rel in ce['relocations']:
    at=rel['file_offset']
    if at is not None and rel['type']==8 and at+8<=len(cb):
     value=(struct.unpack_from('<I',cb,at+4)[0]+(struct.unpack_from('<I',cb,at+12)[0]<<32)) if start<=at<end and cb[at]==24 and at+16<=len(cb) else struct.unpack_from('<Q',cb,at)[0]>>32
     if sec['address']<=value<sec['address']+sec['size'] and (value-sec['address'])%8==0:starts.add(start+value-sec['address'])
   cuts=sorted(starts)+[end]
   for a,z in zip(cuts,cuts[1:]):candidate_rows.append(dict(ordinal=len(candidate_rows),start=a,end=z,address=sec['address']+a-start,status='inferred boundary, not historical function',sha256=h(cb[a:z]),**decode(cb,ce,a,z,sec['address']+a-start)))
  for c in candidate_rows:
   for call in c.get('calls',[]):
    call['candidate_target_windows']=[w['ordinal'] for w in candidate_rows if w['start'] is not None and any(w['start']<=v<w['end'] for v in call['target_file_offsets'])]
  for r in rows:
   choices=[c for c in candidate_rows if c.get('normalized_sha256')==r['normalized_sha256'] or c.get('sha256')==r['sha256']]
   for c in choices:
    paired=[]
    for a,z in zip(r['calls'],c['calls']):
     target_equal=None
     if a['kind']==z['kind']=='relative' and len(a['target_windows'])==1:
      ow=rows[a['target_windows'][0]];dest=z['target_file_offsets'];n=ow['end']-ow['start']
      if len(dest)==1 and a['target_file_offsets']==[ow['start']] and dest[0]+n<=len(cb):target_equal=b[ow['start']:ow['end']]==cb[dest[0]:dest[0]+n]
     paired.append({'original_call':a,'candidate_call':z,'bounded_target_bytes_equal':target_equal,'actual_function_identity_equal':None})
    pairs.append({'original_ordinal':r['ordinal'],'candidate_ordinal':c['ordinal'],'raw_body_equal_at_changed_placement':r['sha256']==c['sha256'],'normalized_instruction_equal':r['normalized_sha256']==c['normalized_sha256'],'actual_call_target_equal':None,'referenced_data_equal':None,'paired_calls':paired,'ambiguity_count':len(choices),'semantic_equivalence':None})
   r['compiled_correspondence'].update(candidate_available=True,full_file_equal=b==cb,candidate_options=[c['ordinal'] for c in choices],status='hypotheses only; all options retained' if choices else 'no raw/normalized option; not proof of missing semantics')
 # Exact whole-file partition outside all window bounds, including headers/data/relocations/tails.
 uncovered=[{'range':[a,z],'sha256':h(b[a:z]),'category':'diagnostic/data metadata or toolchain/build provenance','semantic_attribution':'unresolved'} for a,z in gap([(r['start'],r['end']) for r in rows],0,len(b))]
 graph={r['ordinal']:set(c['target_windows'][0] for c in r['calls'] if len(c['target_windows'])==1) for r in rows}
 closure=[]
 roots=[(x[0],x[1]) for x in BUSINESS]+[('reserved_idl_'+x['name'],x['parser']) for x in idlc['operations']]+[('reserved_idl_dispatch',170),('event_recursion',189)]
 for name,wrapper in roots:
  seen=set();todo=[wrapper]
  while todo:
   x=todo.pop()
   if x in seen:continue
   seen.add(x);todo.extend(graph[x]-seen)
  closure.append({'name':name,'root':wrapper,'direct_closure':sorted(seen),'unresolved_calls':[dict(window=o,**c) for o in sorted(seen) for c in rows[o]['calls'] if c['kind']!='relative' or len(c['target_windows'])!=1],'limits':'indirect, external, branch and fallthrough edges are not collapsed into direct-call reachability'})
 relocation_map=[]
 for r in e['relocations']:
  at=r['file_offset'];record=dict(r)
  record['containing_windows']=[w['ordinal'] for w in rows if at is not None and w['start']<=at<w['end']]
  record['raw_site_8_hex']=b[at:at+8].hex() if at is not None else None
  record['semantic_target_extent']=None
  record['status']='raw relocation retained; loader interpretation and transitive target identity remain obligations'
  relocation_map.append(record)
 region_cuts={0,len(b),e['header']['ehsize'],e['header']['shoff'],e['header']['shoff']+e['header']['shnum']*e['header']['shentsize']}
 for section in e['sections']:
  if section['file_extent']:region_cuts.update(section['file_extent'])
 regions=[];cuts=sorted(x for x in region_cuts if 0<=x<=len(b))
 for a,z in zip(cuts,cuts[1:]):
  regions.append({'range':[a,z],'sha256':h(b[a:z]),'section_indices':[s['index'] for s in e['sections'] if s['file_extent'] and s['offset']<=a and z<=s['offset']+s['size']], 'raw_only':not (288<=a and z<=752776),'identity_status':'no candidate at baseline'})
 return {'relocation_site_ledger':relocation_map,'whole_file_regions':regions,'baseline_revision':REV,'original':original,'candidate':candidate_info,'comparison':comparison,'original_windows':rows,'candidate_windows':candidate_rows,'pair_hypotheses':pairs,'uncovered_original_file_intervals':uncovered,'candidate_symbol_uncovered_intervals':gap([(r['start'],r['end']) for r in candidate_rows if r['start'] is not None and 'symbol' in r],0,candidate_info['size']) if candidate_info else None,'business_branches':[dict(zip(['name','wrapper','parser','adapter','body','exit'],x)) for x in BUSINESS],'idl_contracts':idlc,'direct_dependency_closures':closure,'source_inventory':sources(),'normalization':'Only src=1 signed relative call immediates and relocated LDDW address words are zeroed. No branch, external/indirect call or ordinary constant masking. Hash equality is a structural hypothesis, not call/data/semantic identity.','historical_group_partition':prior['groups.json']}
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--candidate',type=Path);ap.add_argument('--symbol-elf',type=Path);ap.add_argument('--output',type=Path,required=True);a=ap.parse_args()
 if a.symbol_elf and not a.candidate:ap.error('--symbol-elf requires --candidate')
 a.output.write_bytes(enc(generate(a.candidate,a.symbol_elf)))
if __name__=='__main__':main()
