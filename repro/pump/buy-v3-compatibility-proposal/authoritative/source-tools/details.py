#!/usr/bin/env python3
"""Additional static evidence, selected operand chains and invalidation graph."""
from pathlib import Path
import sys,json,struct,collections,re
sys.dont_write_bytecode=True
from analyze import HERE,BASE,Elf,sha,ptr,sec_for,differences

def build():
 r=json.loads((HERE/'residual-ledger.json').read_text());o=Elf(HERE/'inputs/evidence/original/pump/deployed.so');c=Elf(HERE/BASE/'candidate.so');cs={x['start']:x for x in r['candidate_symbol_windows']};os={x['start']:x for x in r['original_windows']}
 def targets(ca,oa):
  oc={x['offset']:x for x in os[oa]['calls']};out=[]
  for x in cs[ca]['calls']:
   y=oc.get(x['offset']);ct=x.get('target');ot=y.get('target') if y else None
   out.append({'offset':x['offset'],'candidate':x,'original':y,'target_pattern_relation':ot in cs[ct]['pattern_candidates'] if ct in cs else None,'target_call_consistent_relation':ot in cs[ct]['call_consistent_candidates'] if ct in cs else None,'unresolved':y is None or (x['kind']!='relocated_external' and (ct not in cs or ot not in os))})
  return out
 def refs(e,a,size):
  out=[]
  for rel in e.pattern(a,size):
   site=a+rel['offset'];q=ptr(e,site) if rel['type']==8 else None
   out.append({**rel,'site':site,'pointer':q,'section':sec_for(e,q) if q is not None else [],'preview_64_hex':e.b[q:q+64].hex() if q is not None else None,'extent':'unknown, preview not consumed extent'})
  return out
 near=[{**x,'calls':targets(x['candidate'],x['original']),'original_references':refs(o,x['original'],x['bytes']),'candidate_references':refs(c,x['candidate'],x['bytes'])} for x in r['near_pattern_hypotheses']]
 # Inventory all lddw operands, even those without pointer relocations. They are not assumed pointers.
 lddw={}
 for label,e in [('original',o),('candidate',c)]:
  lddw[label]=[{'site':at,'raw':e.b[at:at+16].hex(),'value':ptr(e,at),'relocation':e.relocations.get(at),'interpretation':'relocated address, extent unresolved' if at in e.relocations else 'unclassified immediate; may be scalar or pointer'} for at in range(e.lo,e.hi,8) if e.b[at]==0x18]
 # Complete byte ownership partitions: header, tables, sections, holes, allocation suffix.
 partitions={}
 for label,e in [('original',o),('candidate',c)]:
  h=r[label]['header'];regions=[(0,h['ehsize'],'ELF header'),(h['phoff'],h['phoff']+h['phnum']*h['phentsize'],'program header table'),(h['shoff'],h['shoff']+h['shnum']*h['shentsize'],'section header table')]
  regions += [(s[4],s[4]+s[5],'section '+n) for n,s in e.secs.items() if s[1]!=8 and s[5]]
  end=max(b for a,b,n in regions);bounds=sorted({0,len(e.b),*[x for a,b,n in regions for x in (a,b)]});out=[]
  for a,b in zip(bounds,bounds[1:]):
   owners=[n for l,h,n in regions if l<=a and b<=h];data=e.b[a:b]
   out.append({'start':a,'end':b,'bytes':b-a,'owners':owners or ['unclaimed trailing allocation' if a>=end else 'unclaimed ELF gap'],'sha256':sha(data),'all_zero':not any(data),'category':'toolchain/build provenance'})
  partitions[label]=out
 # Concrete data witnesses. Length comes from consumed slice construction, not a C-string preview.
 witnesses=[]
 for title,ca,oa,size,sites,length_sites in [
  ('CurveHop account labels',0xa2b20,0xdd700,3512,[1344,2976,3248,3392],[1360,2992,3264,3408]),
  ('PumpError final variant Debug name (candidate ordinal 110)',0x12ef70,0x15eca8,4392,[2104],[2120]),
  ('QuoteControl space source path',0x9a4b0,0x68918,704,[560],[608]),
  ('QuoteControl set_mint_reserves source path',0x9bac0,0x69f28,696,[504],[552])]:
  entries=[]
  for ps,ls in zip(sites,length_sites):
   z={}
   for label,e,a in [('original',o,oa),('candidate',c,ca)]:
    assert e.b[a+ps]==0x18
    p=ptr(e,a+ps);length=struct.unpack_from('<i',e.b,a+ls+4)[0];assert 0<length<256
    z[label]={'pointer_site':a+ps,'pointer_raw':e.b[a+ps:a+ps+16].hex(),'pointer':p,'length_site':a+ls,'length_raw':e.b[a+ls:a+ls+8].hex(),'length':length,'consumed_hex':e.b[p:p+length].hex(),'consumed_text':e.b[p:p+length].decode(),'source_bytes_sha256':sha(e.b[p:p+length])}
   z['referenced_data_equal']=z['original']['consumed_hex']==z['candidate']['consumed_hex'];entries.append(z)
  witnesses.append({'title':title,'candidate':ca,'original':oa,'bytes':size,'candidate_names':cs[ca]['names'],'window_match_kind':'near-pattern hypothesis; see complete differences and calls','calls':targets(ca,oa),'entries':entries})
 # Recompute known serializer evidence against this exact candidate, not historical addresses.
 old=json.loads((HERE/BASE/'function-match.json').read_text());ser=[x for x in r['pattern_comparisons'] if x['original']==0x5a28 and x['bytes']==1840];assert len(ser)==1
 ser=ser[0];assert len(ser['calls'])==25 and all(x['state']=='target_pattern_relation' for x in ser['calls'])
 d=ptr(o,0x5a28+248);q=ptr(c,ser['candidate']+248);assert o.b[d:d+8]==c.b[q:q+8]==bytes.fromhex('17b7f83760d8ac60')
 serializer={'comparison':ser,'original_discriminator_pointer':d,'candidate_discriminator_pointer':q,'consumed_discriminator_hex':o.b[d:d+8].hex(),'all_25_immediate_target_patterns_recomputed':True,'transitive_data_equality':None,'published_candidate_start_agrees':ser['candidate']==old['candidate_body']['start']}
 # Invalidation closure follows all concrete signed-call edges, preserving unresolved edges separately.
 invalid={}
 for key,terms in [('route',['multi_hop_curve','CurveHop','MultiHopCurve']),('buy_v3',['BuyV3','SellV3','5trade','TradeEvent','VolumeAccumulator','buy_v3','buy_exact_quote_in_v3']),('error_metadata',['PumpError'])]:
  seeds={a for a,v in cs.items() if any(t in ' '.join(v['names']) for t in terms)};edges={a:{x['target'] for x in v['calls'] if x.get('target') in cs} for a,v in cs.items()}
  def closure(start,reverse=False):
   seen=set(start)
   while True:
    nxt=seen|({a for a,ts in edges.items() if ts&seen} if reverse else {t for a in seen for t in edges[a]})
    if nxt==seen:return sorted(seen)
    seen=nxt
  down=closure(seeds);up=closure(seeds,True)
  invalid[key]={'seed_candidate_windows':sorted(seeds),'transitive_callees':down,'transitive_callers':up,'symbol_names':{str(a):cs[a]['names'] for a in sorted(seeds)},'references_to_recheck':[{'window':a,'relocations':cs[a]['relocations']} for a in down],'unresolved_calls':[{'window':a,'call':x} for a in down for x in cs[a]['calls'] if x.get('target') not in cs and x['kind']!='relocated_external'],'global_requirement':'Every new accepted ELF invalidates ALL positions, hashes, mapping, sections, relocations and data witnesses; rerun entire inventory. Graph is minimum source-focused review scope, not a stale-offset whitelist.'}
 wide_old=json.loads((HERE/'inputs/repro/pump/wide-runtime-attribution/ledger.json').read_text())
 wide=[]
 for old in wide_old['complete_bodies']:
  found=[x for x in r['pattern_comparisons'] if x['original']==old['original_start'] and x['bytes']==old['bytes']]
  assert len(found)==1
  x=found[0];assert x['call_consistent_fixed_point'];wide.append({'label':old['label'],'fresh_comparison':x,'raw_differences':differences(o.b[x['original']:x['original']+x['bytes']],c.b[x['candidate']:x['candidate']+x['bytes']])})
 obligations=[]
 for h in r['handler_dispositions']:
  if h['status']=='bounded_implementation':continue
  n=h['instruction'];terms=[n]
  if n=='create_v2':terms+=['CreateV2','nested_create']
  if n=='multi_hop_curve_swap':terms+=['multi_hop_curve','CurveHop']
  if n in ('buy_v3','sell_v3','buy_exact_quote_in_v3'):terms+=['SellV3','trade3buy','trade4sell']
  matches=[v for v in cs.values() if any(t in ' '.join(v['names']) for t in terms)]
  obligations.append({**h,'category':'explicitly stopped' if n in ('admin_update_token_incentives','claim_token_incentives') else 'concrete application-source gap','exclusion':'inventory only; stopped' if n in ('admin_update_token_incentives','claim_token_incentives') else 'active static inventory; no implementation in this worker','candidate_window_hypotheses':[{'start':v['start'],'end':v['end'],'names':v['names'],'original_pattern_candidates':v['pattern_candidates']} for v in matches],'identity_limit':'substring/source-role selection; shared SellV3 context is intentional; no missing original handler is declared matched'})
 return {'handler_obligations':obligations,'wide_runtime_fresh':wide,'near_hypothesis_details':near,'all_lddw_operands':lddw,'byte_partitions':partitions,'data_witnesses':witnesses,'serializer_recheck':serializer,'next_pass_invalidation':invalid}
if __name__=='__main__':
 d=build();p=HERE/'details.json'
 if '--check' in sys.argv:assert d==json.loads(p.read_text())
 else:p.write_text(json.dumps(d,indent=2,sort_keys=True)+'\n')
 print(json.dumps({'witnesses':len(d['data_witnesses']),'near_hypotheses':len(d['near_hypothesis_details']),'serializer_rechecked':True}))
