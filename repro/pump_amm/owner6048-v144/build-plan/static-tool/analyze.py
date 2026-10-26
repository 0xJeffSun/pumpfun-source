#!/usr/bin/env python3
"""Static ELF residual inventory. Stdlib only; never executes or rewrites targets.
All offsets are file offsets; address/file identity is asserted for .text.
Use --original/--candidate/--symbols to run the same method on a later snapshot.
"""
from pathlib import Path
import argparse,collections,hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
P=Path(__file__).resolve().parent
SHA=lambda b:hashlib.sha256(b).hexdigest()
def dump(p,x): p.write_text(json.dumps(x,indent=2,sort_keys=True)+'\n')
def ranges(values):
 out=[]
 for x in values:
  if out and out[-1][1]==x:out[-1][1]=x+1
  else:out.append([x,x+1])
 return out
def delta(a,b):
 r=ranges(i for i in range(min(len(a),len(b))) if a[i]!=b[i])
 tails=[]
 if len(a)!=len(b):tails=[{'side':'original' if len(a)>len(b) else 'candidate','start':min(len(a),len(b)),'end':max(len(a),len(b))}]
 return dict(equal=a==b,original_bytes=len(a),candidate_bytes=len(b),shared_extent_mismatches=sum(y-x for x,y in r),mismatch_ranges=r,excess_tails=tails,total_differing_positions=sum(y-x for x,y in r)+abs(len(a)-len(b)))
def region(e,a):
 return [{'section':k,'offset':a-s[3],'file_offset':s[4]+a-s[3]}for k,s in e.secs.items()if s[1]!=8 and s[3]<=a<s[3]+s[5] and s[2]&2]
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a); d=dict(address=a,opcode=op,dst=r&15,src=r>>4,offset=off,immediate=imm,raw_hex=e.b[a:a+8].hex())
 if op==24 and a+16<=e.hi:d['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 return d
def instructions(e,a,n):
 at=a
 while at<a+n:
  d=ins(e,at);yield d;at+=16 if d['opcode']==24 else 8

def details(e,a,n):
 calls=[];branches=[];indirect=[];refs=[];external=[];unresolved=[]
 for d in instructions(e,a,n):
  at=d['address'];op=d['opcode']
  if op==0x85:
   rel=e.relocations.get(at)
   if rel and rel['type']==10:external.append(dict(address=at,offset=at-a,**rel))
   elif at in e.calls:calls.append(dict(address=at,offset=at-a,target=e.calls[at],signed_immediate=d['immediate']))
   else:unresolved.append(d)
  elif op==0x8d:indirect.append(dict(**d,status='unresolved runtime register target'))
  elif op&7 in (5,6) and op!=0x95:
   t=at+8+8*d['offset'];branches.append(dict(**d,target=t,within_window=a<=t<a+n,target_in_text=e.lo<=t<e.hi,status='encoded target only; branch feasibility unresolved'))
  if 'wide_immediate'in d:
   t=d['wide_immediate'];rel=e.relocations.get(at)
   refs.append(dict(address=at,offset=at-a,value=t,relocation=rel,target_region=region(e,t),kind='relocated pointer'if rel and rel['type']==8 else 'literal or unproven pointer',consumed_extent=None,referenced_data_equal=None))
 return dict(direct_calls=calls,external_calls=external,indirect_calls=indirect,other_calls=unresolved,branches=branches,wide_immediates=refs,relocations=e.pattern(a,n))

def headers(e):
 b=e.b;vals=struct.unpack_from('<16sHHIQQQIHHHHHH',b)
 keys=['ident','type','machine','version','entry','phoff','shoff','flags','ehsize','phentsize','phnum','shentsize','shnum','shstrndx']
 h=dict(zip(keys,vals));h['ident']=h['ident'].hex()
 ph=[]
 for i in range(h['phnum']):
  at=h['phoff']+i*h['phentsize'];ph.append(dict(index=i,file_offset=at,fields=list(struct.unpack_from('<IIQQQQQQ',b,at)),raw_hex=b[at:at+h['phentsize']].hex()))
 sections=[]
 for i,s in enumerate(e.raw):
  name=next((k for k,v in e.secs.items()if v==s),'');sections.append(dict(index=i,name=name,fields=list(s),raw_header_hex=b[h['shoff']+i*h['shentsize']:h['shoff']+(i+1)*h['shentsize']].hex(),sha256=SHA(b[s[4]:s[4]+s[5]])if s[1]!=8 else None))
 rel=[]
 for secname,s in e.secs.items():
  if s[1]not in (4,9):continue
  size=s[9]or (24 if s[1]==4 else 16)
  for at in range(s[4],s[4]+s[5],size):
   address,info=struct.unpack_from('<QQ',b,at);typ=info&0xffffffff
   row=dict(section=secname,entry_file_offset=at,address=address,type=typ,symbol_index=info>>32,symbol=e.symbols.get(info>>32),raw_hex=b[at:at+size].hex())
   if s[1]==4:row['addend']=struct.unpack_from('<q',b,at+16)[0]
   if typ==8 and address+8<=len(b):
    if e.lo<=address<e.hi and b[address]==24:ptr=ins(e,address)['wide_immediate'];kind='lddw immediate'
    else:ptr=struct.unpack_from('<Q',b,address)[0]>>32;kind='packed relocation addend high32 (frozen reader convention)'
    row.update(pointer=ptr,pointer_encoding=kind,target_region=region(e,ptr),consumed_extent=None)
   rel.append(row)
 return dict(header=h,program_headers=ph,sections=sections,relocations=rel,symbol_windows_verbatim=e.funcs)

def coverage(e,windows):
 spans=sorted((x['start'],x['end'])for x in windows);merged=[];over=[]
 for a,b in spans:
  if merged and a<merged[-1][1]:over.append([a,min(b,merged[-1][1])])
  if merged and a<=merged[-1][1]:merged[-1][1]=max(b,merged[-1][1])
  else:merged.append([a,b])
 gaps=[];cur=e.lo
 for a,b in merged:
  if cur<a:gaps.append([cur,a])
  cur=max(cur,b)
 if cur<e.hi:gaps.append([cur,e.hi])
 return dict(covered_intervals=merged,uncovered_intervals=gaps,overlap_intervals=over)

def main():
 ap=argparse.ArgumentParser();base=P/'inputs/repro/pump_amm/update-event-borrow-v144'
 ap.add_argument('--original',type=Path,default=P/'inputs/evidence/original/pump_amm/deployed.so');ap.add_argument('--candidate',type=Path,default=base/'candidate.so');ap.add_argument('--symbols',type=Path,default=base/'unstripped.so');ap.add_argument('--out',type=Path,default=P/'analysis');args=ap.parse_args();args.out.mkdir(parents=True,exist_ok=True)
 o,c,s=map(Elf,[args.original,args.candidate,args.symbols])
 for e in [o,c,s]:assert e.text[3]==e.text[4] and e.lo%8==e.hi%8==0
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
 def row(e,a,b,names,kind):
  assert e.lo<=a<b<=e.hi and a%8==b%8==0
  return dict(start=a,end=b,bytes=b-a,names=names,boundary=kind,raw_sha256=SHA(e.b[a:b]),normalized_sha256=SHA(e.normalized[a:b]),**details(e,a,b-a))
 entries=sorted(set(o.entries)|{o.lo});original=[row(o,a,b,[f['name']for f in o.funcs if f['start']==a],'inferred entry to next entry; not verified historical function')for a,b in zip(entries,entries[1:]+[o.hi])]
 syms=collections.defaultdict(list)
 for f in s.funcs:syms[(f['start'],f['size'])].append(f['name'])
 candidate=[row(c,a,a+n,sorted(names),'symbol range; aliases retained')for (a,n),names in sorted(syms.items())]
 ci=collections.defaultdict(list)
 def key(r):return (r['bytes'],r['normalized_sha256'],json.dumps(r['relocations'],sort_keys=True))
 raw_index=collections.defaultdict(list)
 for r in candidate:
  ci[key(r)].append(r);raw_index[(r['bytes'],r['raw_sha256'])].append(r['start'])
 om={r['start']:r for r in original};cm={r['start']:r for r in candidate}
 pairs=set();hits={}
 for r in original:
  matches=ci[key(r)];hits[r['start']]=[x['start']for x in matches]
  for x in matches:pairs.add((r['start'],x['start']))
 immediate=set()
 for a,b in pairs:
  if all((x['target'],c.calls.get(b+x['offset']))in pairs for x in om[a]['direct_calls']):immediate.add((a,b))
 stable=set(immediate)
 while True:
  nex={(a,b)for a,b in stable if all((x['target'],c.calls.get(b+x['offset']))in stable for x in om[a]['direct_calls'])}
  if nex==stable:break
  stable=nex
 historical=json.loads((P/'inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json').read_text())
 hist={r['start']:r for r in historical['original_windows']}
 frozen=json.loads((base/'static-comparison.json').read_text());is_frozen=SHA(c.b)==frozen['candidate_sha256'] and SHA(o.b)==frozen['original_sha256']
 special={}
 if is_frozen:
  for k,r in frozen['roots'].items():special[r['original']['address']]=(k,r['candidate']['address'])
 def classify(names,label=None):
  if label in ['recipient_setter','init_helper']:return 'diagnostic/data metadata'
  if label and label.endswith('basis_points'):return 'toolchain/build provenance'
  if not names:return 'ambiguous/unattributed'
  if any('pump_amm_recovered' in n for n in names):return 'source organization/ownership'
  return 'linked dependency/helper'
 for r in original:
  a=r['start'];r['candidate_matches']=[];r['raw_byte_matches_independent_of_relocations']=raw_index[(r['bytes'],r['raw_sha256'])]
  for b in hits[a]:
   checks=[dict(offset=x['offset'],original_target=x['target'],candidate_target=c.calls.get(b+x['offset']),normalized_body_pair=(x['target'],c.calls.get(b+x['offset']))in pairs,recursive_direct_graph_pair=(x['target'],c.calls.get(b+x['offset']))in stable)for x in r['direct_calls']]
   r['candidate_matches'].append(dict(start=b,names=cm[b]['names'],raw_equal=r['raw_sha256']==cm[b]['raw_sha256'],normalized_equal=True,actual_direct_target_checks=checks,all_immediate_targets_normalized_equal=(a,b)in immediate,recursive_direct_graph_correspondence=(a,b)in stable,referenced_data_equality=None,semantic_equivalence=None,relocation_target_pairs=[dict(offset=x['offset'],original=x,candidate=next((z for z in cm[b]['wide_immediates']if z['offset']==x['offset']),None),consumed_extent=None,equal=None)for x in r['wide_immediates']if x['relocation']]))
  h=hist.get(a);r['historical_labels_untrusted']=sorted({n for match in (h or {}).get('candidate_matches',[])for n in match['names']})
  label,paired=special.get(a,(None,None));r['focused_label']=label;r['focused_candidate']=paired
  names=[n for m in r['candidate_matches']for n in m['names']]or r['historical_labels_untrusted']
  r['residual_category']=classify(names,label);r['category_basis']='triage only; symbol ownership does not prove causation'
  r['status']='no normalized match' if not r['candidate_matches'] else 'ambiguous normalized matches'if len(r['candidate_matches'])>1 else 'normalized correspondence only'
  r['open_obligations']=['original boundary attribution','whole-file identity','semantic and historical source provenance']
  if r['wide_immediates']:r['open_obligations'].append('consumed data extents and equality')
  if r['indirect_calls']:r['open_obligations'].append('indirect call targets')
  if r['branches']:r['open_obligations'].append('branch feasibility and input coverage')
  for call in r['direct_calls']:call['target_window']=call['target']if call['target']in om else None;call['target_candidate_options']=hits.get(call['target'],[])
 for r in candidate:
  b=r['start'];r['original_matches']=sorted(a for a,x in pairs if x==b);r['residual_category']=classify(r['names']);r['status']='no normalized match'if not r['original_matches']else'normalized correspondence only';r['semantic_equivalence']=None
  for call in r['direct_calls']:call['target_symbol_window']=call['target']if call['target']in cm else None;call['target_names']=cm.get(call['target'],{}).get('names',[])
 # All inferred candidate entries, including ranges lacking complete symbols.
 ces=sorted(set(c.entries)|{c.lo}|{r['start']for r in candidate})
 candidate_inferred=[dict(start=a,end=b,bytes=b-a,raw_sha256=SHA(c.b[a:b]),containing_symbol_windows=[r['start']for r in candidate if r['start']<=a and b<=r['end']],boundary='inferred; independent of symbol extents')for a,b in zip(ces,ces[1:]+[c.hi])]
 # Call graph closure for every focused root, never follows merely a matching body elsewhere.
 closures={}
 def closure(rows,start):
  todo=[start];seen=set();missing=set()
  while todo:
   a=todo.pop()
   if a in seen:continue
   if a not in rows:missing.add(a);continue
   seen.add(a);todo += [x['target']for x in rows[a]['direct_calls']]
  return dict(reachable_windows=sorted(seen),unresolved_direct_targets=sorted(missing),indirect_calls=[x for a in sorted(seen)for x in rows[a]['indirect_calls']],external_calls=[x for a in sorted(seen)for x in rows[a]['external_calls']],data_references=[x for a in sorted(seen)for x in rows[a]['wide_immediates']],limit='Complete static direct-call reachability only; runtime indirect edges and data consumption remain open.')
 if is_frozen:
  for k,r in frozen['roots'].items():closures[k]=dict(original=closure(om,r['original']['address']),candidate=closure(cm,r['candidate']['address']))
 layout={}
 for label,e in [('original',o),('candidate',c),('symbols',s)]:layout[label]=headers(e)
 secpairs=[]
 for name in sorted(set(o.secs)|set(c.secs)):
  a=o.secs.get(name);b=c.secs.get(name)
  secpairs.append(dict(name=name,original_header=list(a)if a else None,candidate_header=list(b)if b else None,bytes_comparison=delta(o.b[a[4]:a[4]+a[5]]if a and a[1]!=8 else b'',c.b[b[4]:b[4]+b[5]]if b and b[1]!=8 else b''),category='toolchain/build provenance'if name in ['.text','.dynsym','.dynstr']else'diagnostic/data metadata'))
 whole=delta(o.b,c.b);whole.update(original_sha256=SHA(o.b),candidate_sha256=SHA(c.b),symbols_sha256=SHA(s.b))
 summary=dict(whole=whole,original_windows=len(original),candidate_symbol_windows=len(candidate),candidate_symbol_rows_with_aliases=len(s.funcs),candidate_inferred_windows=len(candidate_inferred),original_no_normalized_match=sum(not r['candidate_matches']for r in original),candidate_no_normalized_match=sum(not r['original_matches']for r in candidate),original_with_raw_body_match=sum(any(m['raw_equal']for m in r['candidate_matches'])for r in original),original_with_normalized_match=sum(bool(r['candidate_matches'])for r in original),original_with_multiple_normalized_matches=sum(len(r['candidate_matches'])>1 for r in original),immediate_call_consistent_pairs=len(immediate),recursive_direct_graph_pairs=len(stable),symbol_text_and_relocation_identity=True,original_coverage=coverage(o,original),candidate_symbol_coverage=coverage(c,candidate),frozen_focus_applies=is_frozen)
 # Mismatch ranges can be large: keep complete exact arrays in whole-file.json.
 dump(args.out/'whole-file.json',whole);summary['whole']={k:v for k,v in whole.items()if k!='mismatch_ranges'}
 dump(args.out/'summary.json',summary);dump(args.out/'elf-layout.json',layout);dump(args.out/'section-differences.json',secpairs)
 dump(args.out/'residual-ledger.json',dict(schema=1,normalization='only actual relocation immediates and signed direct-call immediates; relocation type/symbol/offset and full length must match; not semantic equality',original=original,candidate=candidate,candidate_inferred=candidate_inferred,original_symbols_verbatim=o.funcs,candidate_symbols_verbatim=s.funcs))
 dump(args.out/'focused-transitive-closure.json',closures)
 # Retain every historical original and candidate row; do not reuse old candidate addresses.
 dump(args.out/'historical-reconciliation.json',dict(original=[dict(start=r['start'],historical=r,current_window=r['start']if r['start']in om else None,current_matches=hits.get(r['start'],[]))for r in historical['original_windows']],candidate=[dict(historical=r,current_same_name_windows=[x['start']for x in candidate if set(x['names'])&set(r['names'])],status='historical candidate only; no address transfer')for r in historical['candidate_functions']]))
 print(json.dumps({k:v for k,v in summary.items()if k not in ['original_coverage','candidate_symbol_coverage']},indent=2))
if __name__=='__main__':main()
