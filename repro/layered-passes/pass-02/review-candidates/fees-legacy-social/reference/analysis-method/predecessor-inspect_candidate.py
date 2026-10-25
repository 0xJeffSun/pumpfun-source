#!/usr/bin/env python3
"""Fresh complete-window/static comparison against original and frozen 8f baseline."""
from pathlib import Path
import collections,hashlib,json,re,struct,sys
W=Path(__file__).resolve().parent;M=W/'analysis-method';sys.path.insert(0,str(M))
from inventory_method import catalogue
from elf_reader import Elf
from window_tools import window,instructions,comparison,data_refs,extent
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def run():
 C=Elf(W/'build-02/artifacts/pump_fees_candidate.so');S=Elf(W/'unstripped.so');O=Elf(M/'inputs/original.so');B=Elf(M/'inputs/baseline-symbols.so')
 current=catalogue(C.path,S.path);baseline=J(M/'inputs/baseline-catalog.json')
 assert baseline['inputs']['candidate']['sha256']=='8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e'
 assert len(current['original_rows'])==len(baseline['original_rows'])==585
 changes=[]
 for a,b in zip(baseline['original_rows'],current['original_rows'],strict=True):
  assert all(a[k]==b[k] for k in ['start','end','bytes','raw_sha256','normalized_sha256'])
  changes.append({'original_start':a['start'],'original_end':a['end'],'bytes':a['bytes'],'baseline_status':a['status'],'candidate_status':b['status'],'baseline_matches':a['candidate_matches'],'candidate_matches':b['candidate_matches'],'transition':a['status']+' -> '+b['status']})
 cmp={'baseline_inputs':baseline['inputs'],'candidate_inputs':current['inputs'],'baseline_summary':baseline['summary'],'candidate_summary':current['summary'],'original_rows':changes,'transitions':dict(collections.Counter(r['transition'] for r in changes)),'limits':current['limits']}
 canon=lambda n:re.sub(r'17h[0-9a-f]{16}E$','E',n)
 def find(old):
  names={f['name'] for f in B.funcs if f['start']==old};exact={(f['start'],f['size']) for f in S.funcs if f['name'] in names}
  if len(exact)==1:return next(iter(exact))
  names={canon(n) for n in names};matched={(f['start'],f['size']) for f in S.funcs if canon(f['name']) in names};assert len(matched)==1,(old,matched,names);return next(iter(matched))
 accepted=J(M/'inputs/baseline-caller-static-proof.json');rows={};ledger={};refs={};targets={}
 for name,old in accepted['windows'].items():
  a,n=old['original']['start'],old['original']['size'];b,m=find(old['candidate']['start'])
  rows[name]={'original':window(O,a,n,[]),'candidate':window(C,b,m,S.funcs),'comparison':comparison(O,C,a,b,n,m)}
  ledger[name]={'original':instructions(O,a,n),'candidate':instructions(C,b,m)};refs[name]={'original':data_refs(O,a,n),'candidate':data_refs(C,b,m)}
  if name not in ['wrapper','parser','handler']:continue
  for side,e,start,size,syms in [('original',O,a,n,[]),('candidate',C,b,m,S.funcs)]:
   for call in e.callsites(start,size):
    at=call['target'];k=side+':'+str(at)
    if k in targets:continue
    ns={f['size'] for f in syms if f['start']==at};size=next(iter(ns)) if len(ns)==1 else extent(e,at)
    targets[k]={'side':side,'window':window(e,at,size,syms),'data_refs':data_refs(e,at,size),'bound':'candidate symbol' if len(ns)==1 else 'original inferred entry'}
 # Compare direct targets at equal offsets only when complete roots actually match.
 pairs={}
 for name in ['wrapper','parser','handler']:
  r=rows[name];a,n=r['original']['start'],r['original']['size'];b,m=r['candidate']['start'],r['candidate']['size']
  if not r['comparison']['normalized_equal'] or not r['comparison']['relocation_pattern_equal']:
   pairs[name]={'same_offset_pairing_permitted':False,'reason':'complete roots do not match; target inventories remain exhaustive'};continue
  os=O.callsites(a,n);cs=C.callsites(b,m);assert [q['offset'] for q in os]==[q['offset'] for q in cs];out=[]
  for x,y in zip(os,cs):
   z=targets['candidate:'+str(y['target'])]['window']['size'];on=extent(O,x['target'])
   out.append({'offset':x['offset'],'original':x,'candidate':y,'comparison':comparison(O,C,x['target'],y['target'],on,z)})
  pairs[name]={'same_offset_pairing_permitted':True,'pairs':out}
 # The complete original target set is matched against every fresh symbol window,
 # retaining ambiguity and whether the match is actually reached by these roots.
 reached={r['window']['start'] for r in targets.values() if r['side']=='candidate'};mapping=[]
 for r in targets.values():
  if r['side']!='original':continue
  a,n=r['window']['start'],r['window']['size'];matches=[]
  for f in S.funcs:
   b=f['start']
   if f['size']==n and O.normalized[a:a+n]==C.normalized[b:b+n] and O.pattern(a,n)==C.pattern(b,n):matches.append({'candidate':f,'raw_equal':O.b[a:a+n]==C.b[b:b+n],'reached_from_relevant_roots':b in reached})
  mapping.append({'original_start':a,'bytes_inferred':n,'matches':matches,'transitive_closure_proven':False})
 # Exact consumed log spans identified through the actual pointer/length/syscall ABI.
 logs=[]
 for label,e in [('original',O),('candidate',C)]:
  r=rows['handler'][label]
  for ref in data_refs(e,r['start'],r['size']):
   pc=ref['pc'];ptr=ref['target']
   for msg in [b'donation_fee_pda already exists',b'CreateDonationFeePda is currently disabled']:
    if e.b[ptr:ptr+len(msg)]!=msg:continue
    assert e.b[pc+16:pc+20]==bytes([0xb7,2,0,0]) and struct.unpack_from('<i',e.b,pc+20)[0]==len(msg)
    assert e.relocations[pc+24]['symbol']=='sol_log_'
    logs.append({'side':label,'pc':pc,'pointer':ptr,'length':len(msg),'text':msg.decode(),'sha256':H(msg),'consumed_by':'r1 pointer, r2 length, sol_log_'})
 assert len(logs)==4
 wrapper=rows['wrapper']['candidate'];parser=rows['parser']['candidate'];handler=rows['handler']['candidate']
 assert any(x['target']==parser['start'] for x in wrapper['direct_calls']) and any(x['target']==handler['start'] for x in wrapper['direct_calls'])
 ep=rows['entrypoint']['candidate'];dispatch=rows['dispatch']['candidate'];assert any(x['target']==dispatch['start'] for x in ep['direct_calls'])
 d=int.from_bytes(hashlib.sha256(b'global:create_donation_fee_pda').digest()[:8],'little');di=[x for x in ledger['dispatch']['candidate'] if x.get('imm64_unsigned')==d];assert len(di)==1
 at=di[0]['pc'];branch=instructions(C,at+16,8)[0];assert branch['opcode']==0x1d
 selected=branch['branch_target'];calls=[x for x in C.callsites(selected,112) if x['target']==wrapper['start']];assert len(calls)==1
 sections=[]
 for name in sorted(set(C.secs)&set(S.secs)):
  x,y=C.secs[name],S.secs[name];a,b=C.b[x[4]:x[4]+x[5]],S.b[y[4]:y[4]+y[5]];sections.append({'name':name,'allocated':bool(x[2]&2),'candidate_sha256':H(a),'unstripped_sha256':H(b),'equal':a==b})
 assert all(x['equal'] for x in sections if x['allocated'])
 proof={'candidate_sha256':H(C.b),'candidate_bytes':len(C.b),'symbols_sha256':H(S.b),'original_sha256':H(O.b),'baseline_sha256':baseline['inputs']['candidate']['sha256'],'whole_original_equal':C.b==O.b,'whole_baseline_equal':C.b==(M/'inputs/baseline-candidate.so').read_bytes(),'instruction_identity':{'discriminator_hex':d.to_bytes(8,'little').hex(),'discriminator_pc':at,'branch':branch,'selected_wrapper_call':selected+calls[0]['offset'],'wrapper':wrapper['start'],'parser':parser['start'],'handler':handler['start']},'windows':rows,'same_offset_direct_targets':pairs,'direct_target_inventory':targets,'all_original_direct_targets_against_fresh_symbols':mapping,'exact_handler_logs':logs,'strip_sections':sections,'limits':['Full raw/normalized window results preserved even when false. Mechanical sequence partitions do not prove control-flow correspondence.','All immediate calls and data previews retained; general data extents and transitive/indirect closure unproved.','Candidate names are current symbol evidence; no original historical names inferred from shape.','No runtime result inherited from any previous candidate.']}
 return {'full-function-inventory.json':current,'inventory-vs-8f.json':cmp,'caller-static-proof.json':proof,'fresh-instruction-ledger.json':ledger,'fresh-data-reference-ledger.json':refs}
if __name__=='__main__':
 result=run()
 for n,v in result.items():(W/n).write_text(json.dumps(v,indent=2)+'\n')
 print(json.dumps({'candidate_sha256':result['caller-static-proof.json']['candidate_sha256'],'candidate_bytes':result['caller-static-proof.json']['candidate_bytes'],'windows':{n:{'bytes':r['candidate']['size'],'normalized_equal':r['comparison']['normalized_equal'],'relocations_equal':r['comparison']['relocation_pattern_equal']} for n,r in result['caller-static-proof.json']['windows'].items()},'inventory_summary':result['full-function-inventory.json']['summary']},indent=2))
