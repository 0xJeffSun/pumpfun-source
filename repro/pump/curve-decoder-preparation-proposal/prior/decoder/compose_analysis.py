"""Recompute bounded static contracts from immutable ELF bytes; no execution."""
from pathlib import Path
import bisect, hashlib, struct, sys
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'prior/short'))
from elf_reader import Elf
from decoder import window, decoded
from analyze_closure import VERSIONS, FIELDS
H=lambda b:hashlib.sha256(b).hexdigest()

def run():
 e=Elf(P/'prior/short/inputs/composition/evidence/original.so')
 c=Elf(P/'prior/short/inputs/current/candidate.so')
 s=Elf(P/'prior/short/inputs/current/unstripped.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 roots=[0x13048,0x8320,0x4238,0x9b148,0x9b430,0x3b68,0x5a28,0x10d80]+[v[2]for v in VERSIONS]
 rows=[]
 for a in roots:
  z=e.entries[e.entries.index(a)+1];r=window(e,a,z);r['scope']='complete inferred function window';rows.append(r)
 for a,z,role in [(0x102a60,0x102b40,'actual checked read, result branch and box allocation'),(0x102bd0,0x102c68,'actual bonding_curve error label or successful box copy'),(0x105b18,0x105b28,'successful context box-pointer store')]:
  r=window(e,a,z);r['scope']='bounded actual BuyV3 parser slice: '+role;rows.append(r)
 targets=sorted({i['target']for r in rows for i in r['instructions']if i.get('kind')=='direct_call'})
 callees=[]
 for a in targets:
  z=e.entries[e.entries.index(a)+1];r=window(e,a,z)
  r['current_normalized_matches']=[{'name':f['name'],'start':f['start'],'bytes':f['size']}for f in s.funcs if f['size']==z-a and e.normalized[a:z]==c.normalized[f['start']:f['start']+f['size']] ]
  callees.append(r)
 def ins(pc,op,reg,off,im):assert e.b[pc:pc+8]==struct.pack('<BBhi',op,reg,off,im),hex(pc)
 def call(pc,t):assert e.calls[pc]==t,hex(pc)
 for pc,t in [(0x102a78,0x13048),(0x130f0,0x8320),(0x85b0,0x9b148),(0x44c8,0x9b430),(0x9b4b8,0x19bbb8),(0x9b510,0x19bbb8),(0x102c08,0x2930),(0x102c60,0x1b3610),(0x102b38,0x1ab1b0)]:call(pc,t)
 unchecked_calls=[0x9b560,0x9b588,0x9b5b0,0x9b5d8,0x9b600,0x9b628,0x9b650,0x9b678,0x9b690]
 for pc,v in zip(unchecked_calls,VERSIONS):call(pc,v[2])
 for pc,op,off,n in [(0x9b440,0xa5,18,8),(0x9b470,0xa5,1,41),(0x9b548,0xa5,1,73),(0x9b570,0x15,1,73),(0x9b598,0xa5,1,75),(0x9b5c0,0xa5,1,107),(0x9b5e8,0xa5,1,116),(0x9b610,0x15,1,116),(0x9b638,0xa5,1,133),(0x9b660,0xa5,1,158)]:ins(pc,op,1,off,n)
 for pc,op,reg,off,im in [(0x9b450,7,3,0,8),(0x9b458,0x7b,0x32,0,0),(0x9b460,7,1,0,-8),(0x9b468,0x7b,0x12,8,0),(0x130c0,0x7b,0x32,8,0),(0x130d8,7,4,0,48),(0x130e0,0x7b,0x42,0,0),(0x13078,0xb7,2,0,3005),(0x42e0,0xb7,2,0,3007),(0x4408,0xb7,2,0,3012),(0x4600,0x7b,0x76,0,0),(0x4608,0x79,0x81,0,0),(0x4610,7,1,0,-1),(0x4618,0x7b,0x18,0,0),(0x102ab0,7,3,0,-168),(0x102b28,0xb7,1,0,8),(0x102b30,0xb7,2,0,168),(0x102c50,0x7b,0x1a,-2680,0),(0x102c58,0xb7,3,0,168),(0x105b18,0x79,0xa1,-2680,0),(0x105b20,0x7b,0x16,40,0)]:ins(pc,op,reg,off,im)
 unchecked=next(r for r in rows if r['start']==0x9b430)
 invalid=[i['pc']for i in unchecked['instructions']if i.get('immediate_u64')==0x8000000000000003]
 assert invalid==[0x9b480,0x9b4d8]
 assert next(i['immediate_u64']for i in decoded(e,0x9b170,0x9b180))==0x60acd86037f8b717
 # Full structure match is not sufficient on its own: compare actual call identities.
 assert e.normalized[0x4238:0x4628]==e.normalized[0x8320:0x8710]
 u=e.callsites(0x4238,1008);k=e.callsites(0x8320,1008)
 assert [i['offset']for i in u]==[i['offset']for i in k]
 differences=[{'offset':x['offset'],'unchecked':x['target'],'checked':y['target']}for x,y in zip(u,k)if x['target']!=y['target']]
 assert differences==[{'offset':656,'unchecked':0x9b430,'checked':0x9b148}]
 call_graph=[]
 for t in [0x9b430,0x9b148,0x4238,0x8320,0x13048,0x3b68]:
  callers=[]
  for pc,target in sorted(e.calls.items()):
   if target==t:
    idx=bisect.bisect_right(e.entries,pc)-1
    callers.append({'pc':pc,'inferred_owner':e.entries[idx],'inferred_end':e.entries[idx+1],'scope':'actual BuyV3 path'if pc==0x102a78 else 'decoder/account wrapper'if e.entries[idx]in roots else 'opaque other caller; business semantics not inspected'})
  call_graph.append({'target':t,'direct_callers':callers})
 assert next(x for x in call_graph if x['target']==0x9b430)['direct_callers'][0]['pc']==0x44c8
 data=[]
 for a,n,role in [(0x1b5ba8,32,'System owner comparison'),(0x1b79df,32,'Pump owner comparison and expected key'),(0x1b73d8,13,'outer parser account name'),(0x1b61c0,18,'ProgramError InvalidAccountData identity')]:
  b=e.b[a:a+n];data.append({'start':a,'bytes':n,'role':role,'sha256':H(b),'hex':b.hex(),'text':b.decode(errors='replace')})
 assert data[0]['hex']=='00'*32 and data[2]['text']=='bonding_curve'
 data.append({'start':0x9b170,'bytes':8,'role':'checked discriminator immediate; eight little-endian bytes','hex':struct.pack('<Q',0x60acd86037f8b717).hex(),'sha256':H(struct.pack('<Q',0x60acd86037f8b717))})
 # Four immediate chunks copied into with_pubkeys are the exact owner key.
 chunks=[next(i['immediate_u64']for i in decoded(e,pc,pc+16))for pc in [0x4340,0x4358,0x4370,0x4388]]
 assert b''.join(struct.pack('<Q',v)for v in chunks)==e.b[0x1b79df:0x1b79ff]
 for t,needle in [(0x2930,'with_account_name'),(0x19c1b8,'with_pubkeys'),(0x1a29f0,'lamports'),(0x1a2ca8,'try_borrow_data'),(0x1ab1b0,'handle_alloc_error'),(0x19bbb8,'From$LT$solana_program_error..ProgramError')]:
  assert any(needle in m['name']for r in callees if r['start']==t for m in r['current_normalized_matches']),hex(t)
 known={r['start']for r in rows+callees}
 frontier=[]
 for r in callees:
  for i in r['instructions']:
   if i.get('kind')=='direct_call'and i['target']not in known:frontier.append({'owner':r['start'],'pc':i['pc'],'target':i['target'],'status':'transitive target not semantically closed in this packet'})
 pointers=[{'owner':r['start'],'pc':i['pc'],'value':i['immediate_u64'],'relocation':e.relocations.get(i['pc']),'extent':'explicit consumed data above where proven; no guessed length for other operands'}for r in rows+callees for i in r['instructions']if i['opcode']==0x18]
 return {'identities':{n:{'sha256':H(x.b),'bytes':len(x.b)}for n,x in [('original',e),('current_candidate',c),('current_symbols',s)]},'windows':rows,'complete_direct_callees':callees,'unchecked_version_calls':[{'pc':pc,'target':v[2]}for pc,v in zip(unchecked_calls,VERSIONS)],'unchecked_invalid_constant_sites':invalid,'account_reader_comparison':{'bytes_each':1008,'full_normalized_equal':True,'actual_call_differences':differences,'unchecked_actual_calls':u,'checked_actual_calls':k},'direct_caller_graph':call_graph,'consumed_data':data,'lddw_operands':pointers,'unclosed_transitive_calls':frontier,'contract':{'actual_buy_path':[0x102a78,0x13048,0x8320,0x9b148],'unchecked_account_path':[0x4238,0x9b430],'account_cursor':'Empty:3005,no change. Otherwise consume exactly one48-byte AccountInfo before owner/borrow/decoder.','owner_order':'System owner then zero lamports=>3012; otherwise compare Pump owner=>3007 with actual,expected Pubkeys. Correct Pump owner with zero lamports is not rejected by this wrapper.','byte_cursor':'Checked short/wrong discriminator unchanged; unchecked short header unchanged. Both skip8 before payload<41 rejection; valid payload consumes selected version only.','borrow_lifetime':'Successful immutable data Ref is released on decode success or error; no such release if borrow failed. Result Account stores the input AccountInfo reference, not a cloned AccountInfo.','box':'BuyV3 uses checked Account reader then success-only168-byte/alignment8 Box allocation; field error label occurs before error return. Box pointer stored context+40.','wrapper_errors':'Account errors 3005/3012/3007, ProgramError BorrowFailed, and original decoder InvalidAccountData/BorshIoError remain distinct. Outer with_account_name decorates each propagated field error.','remaining_constraints':'Typed parser seeds/mutability/quote constraints remain separate, after field reads; never replaced by this decoder.','cleanup_frontier':'Local data Ref release proven. The full parser aggregate failure destructor, allocator internals, all Borsh formatting internals, and every other handler use remain outside complete semantic closure.'},'limits':['No build or runtime execution, no main source edits, no fence removal.','Original function labels inferred through actual call/data behavior and locked dependency correspondence, not original symbol recovery.','Full immediate callee bytes retained; transitive frontier and unbounded pointer extents are explicit, not claimed closed.','117 historical BuyV3 rows remain mandatory preservation requirements; no full BuyV3 integration or whole-ELF equivalence claimed.']}

if __name__=='__main__':
 import json
 r=run();(P/'composition-ledger.json').write_text(json.dumps(r,indent=2)+'\n')
 print(json.dumps({'windows':len(r['windows']),'complete_direct_callees':len(r['complete_direct_callees']),'transitive_frontier':len(r['unclosed_transitive_calls'])},indent=2))
