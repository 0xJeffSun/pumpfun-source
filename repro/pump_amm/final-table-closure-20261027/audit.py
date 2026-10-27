#!/usr/bin/env python3
"""Constrain actual body pairs with complete formatter-table and EOF-descriptor data."""
from pathlib import Path
import collections,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
CANDIDATE=ROOT/'work/amm-parallel-fee-gates-20261027/build/artifacts/pump_amm_recovered.so'
SYMBOLS=CANDIDATE.with_name('unstripped.so')
CLOSURE=ROOT/'repro/pump_amm/final-closure-audit-20261027/closure.json'
MEASUREMENT=ROOT/'work/amm-parallel-fee-gates-20261027/measurement.json'

def pimm(e,a):return struct.unpack_from('<I',e.b,a+4)[0]|(struct.unpack_from('<I',e.b,a+12)[0]<<32)
def word(e,a):return struct.unpack_from('<Q',e.b,a)[0]
def relocated(e,a):
 assert e.relocations[a]=={'type':8,'symbol':''};raw=word(e,a);assert raw&0xffffffff==0;return raw>>32

def audit(candidate=CANDIDATE,symbols=SYMBOLS,closure_path=CLOSURE,measurement=MEASUREMENT):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);cl=json.loads(closure_path.read_text());m=json.loads(measurement.read_text());assert cl['candidate_sha256']==hashlib.sha256(c.b).hexdigest()==m['candidate_sha256']
 pairs={(p['original'],p['candidate']):p for p in cl['pairs']};windows={r['start']:r for r in m['rows']};functions=collections.defaultdict(list)
 for f in s.funcs:functions[f['start']].append(f)
 def direct_difference(ot,ct):
  w=windows.get(ot);fs=functions.get(ct,[])
  if w is None or not fs:return {'status':'unknown','reason':'missing complete original/candidate target bounds'}
  size=w['end']-ot
  if any(f['size']==size and o.normalized[ot:ot+size]==c.normalized[ct:ct+size] and o.pattern(ot,size)==c.pattern(ct,size)for f in fs):
   assert (ot,ct)in pairs;return None
  return {'status':'disproven','reason':'known complete target bodies differ in size, normalized instructions, or relocation shape','original_target':ot,'original_bytes':size,'candidate_target':ct,'candidate_functions':fs,'original_normalized_sha256':hashlib.sha256(o.normalized[ot:ot+size]).hexdigest(),'candidate_normalized_sha256':{str(f['size']):hashlib.sha256(c.normalized[ct:ct+f['size']]).hexdigest()for f in fs}}
 def code_status(ot,ct):
  initial=pairs.get((ot,ct))
  if initial and initial['in_internal_direct_closure']:return {'status':'verified','original_target':ot,'candidate_target':ct}
  direct=direct_difference(ot,ct)
  if direct:return direct
  todo=collections.deque([((ot,ct),[])]);seen=set();unknown=[]
  while todo:
   key,path=todo.popleft()
   if key in seen:continue
   seen.add(key)
   for edge in pairs[key]['edges']:
    target=(edge['original_target'],edge['candidate_target']);nextpath=path+[{'caller_original':key[0],'caller_candidate':key[1],**edge}]
    result=direct_difference(*target)
    if result:
     if result['status']=='disproven':return {**result,'path':nextpath}
     unknown.append({**result,'path':nextpath})
    elif not pairs[target]['in_internal_direct_closure']:todo.append((target,nextpath))
  return {'status':'unknown','reason':'closure frontier lacks a complete target comparison','frontier':unknown}
 def insection(e,p,n,name):
  section=e.secs[name];return section[4]<=p and p+n<=section[4]+section[5]
 def table_pair(op,cp):
  assert insection(o,op,48,'.data.rel.ro')and insection(c,cp,48,'.data.rel.ro')
  scalar=[{'offset':i,'original':word(o,op+i),'candidate':word(c,cp+i),'status':'verified'if word(o,op+i)==word(c,cp+i)else'disproven'}for i in [8,16]]
  functions_data=[{'offset':i,**code_status(relocated(o,op+i),relocated(c,cp+i))}for i in [0,24,32,40]]
  statuses=[x['status']for x in scalar+functions_data];status='disproven'if'disproven'in statuses else('verified'if all(x=='verified'for x in statuses)else'unknown')
  return {'original_pointer':op,'candidate_pointer':cp,'bytes':48,'scalar_fields':scalar,'function_fields':functions_data,'status':status}
 refs=[]
 for key,p in pairs.items():
  a,b=key
  if p['bytes']!=40 or o.b[a:a+8]!=bytes.fromhex('bf23000000000000')or o.calls.get(a+24)!=0x1144e0:continue
  assert o.b[a+8]==c.b[b+8]==0x18
  op,cp=pimm(o,a+8),pimm(c,b+8)
  if not insection(o,op,48,'.data.rel.ro')or not insection(c,cp,48,'.data.rel.ro'):continue
  refs.append({'original_window':a,'candidate_window':b,'original_pointer':op,'candidate_pointer':cp})
 wrapper_refs=refs
 original_tables=sorted({r['original_pointer']for r in wrapper_refs});candidate_tables=sorted({r['candidate_pointer']for r in wrapper_refs})
 assert len(original_tables)==len(candidate_tables)==5 and len(wrapper_refs)==25
 refs=[]
 for (a,b),p in pairs.items():
  for at,rel in o.relocations.items():
   if rel['type']!=8 or not a<=at<a+p['bytes']or o.b[at]!=0x18:continue
   op=pimm(o,at)
   if op in original_tables:refs.append({'original_window':a,'candidate_window':b,'offset':at-a,'original_pointer':op,'candidate_pointer':pimm(c,b+at-a)})
 matrix={(r['original_pointer'],r['candidate_pointer']):table_pair(r['original_pointer'],r['candidate_pointer'])for r in refs}
 counterparts=[]
 for op in original_tables:
  verified=[v for v in matrix.values()if v['original_pointer']==op and v['status']=='verified'];assert len(verified)==1
  counterparts.append({'original_pointer':op,'candidate_pointer':verified[0]['candidate_pointer']})
 assert len({r['candidate_pointer']for r in counterparts})==5
 descriptor_refs=[]
 for key,p in pairs.items():
  a,b=key
  for at,rel in o.relocations.items():
   if rel['type']!=8 or not a<=at<a+p['bytes']or o.b[at]!=0x18 or pimm(o,at)!=0x1221c8:continue
   cp=pimm(c,b+at-a);assert insection(o,0x1221c8,24,'.data.rel.ro')and insection(c,cp,24,'.data.rel.ro')
   optr,cptr=relocated(o,0x1221c8),relocated(c,cp);n,cn=word(o,0x1221d0),word(c,cp+8)
   assert insection(o,optr,n,'.rodata')and insection(c,cptr,cn,'.rodata')
   equal=n==cn and word(o,0x1221d8)==word(c,cp+16)and o.b[optr:optr+n]==c.b[cptr:cptr+cn]
   descriptor_refs.append({'original_window':a,'candidate_window':b,'original_pointer':0x1221c8,'candidate_pointer':cp,'message_length':n,'message_hex':o.b[optr:optr+n].hex(),'status':'verified'if equal else'disproven'})
 disproven={(r['original_window'],r['candidate_window'])for r in refs if matrix[(r['original_pointer'],r['candidate_pointer'])]['status']=='disproven'}
 disproven|={(r['original_window'],r['candidate_window'])for r in descriptor_refs if r['status']=='disproven'}
 active={key for key,p in pairs.items()if p['in_internal_direct_closure'] and key not in disproven};rounds=[]
 while True:
  bad={key for key in active if any((e['original_target'],e['candidate_target'])not in active for e in pairs[key]['edges'])}
  if not bad:break
  rounds.append(len(bad));active-=bad
 return {'original_sha256':hashlib.sha256(o.b).hexdigest(),'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'closure_sha256':hashlib.sha256(closure_path.read_bytes()).hexdigest(),'counts':{'table_reference_pairs':len(refs),'wrapper_reference_pairs':len(wrapper_refs),'verified_table_pairs':sum(v['status']=='verified'for v in matrix.values()),'disproven_table_pairs':sum(v['status']=='disproven'for v in matrix.values()),'unknown_table_pairs':sum(v['status']=='unknown'for v in matrix.values()),'verified_eof_references':sum(r['status']=='verified'for r in descriptor_refs),'initial_direct_closed_pairs':sum(p['in_internal_direct_closure']for p in pairs.values()),'explicitly_disproven_body_pairs':len(disproven),'data_constrained_direct_closed_pairs':len(active),'data_constrained_direct_closed_windows':len({a for a,b in active})},'counterparts':counterparts,'table_references':refs,'table_matrix':list(matrix.values()),'eof_descriptor_references':descriptor_refs,'pruning_rounds':rounds,'remaining_pairs':[list(k)for k in sorted(active)],'scope':'Adds exact bounded table/descriptor constraints to established body/direct-call pairs. Disproven means incompatible complete normalized-code/data identity, not a behavioral bug. Missing target bounds remain unknown and are never used to prune. No global indirect-call equivalence claim.'}
if __name__=='__main__':
 r=audit();p=Path(__file__).resolve().parent/'results.json';assert not p.exists();p.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r['counts'],indent=2))
