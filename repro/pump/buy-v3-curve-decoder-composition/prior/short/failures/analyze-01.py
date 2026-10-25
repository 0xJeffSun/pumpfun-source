"""Static decoder dispatch, byte windows and zero-store proofs; no VM execution."""
from pathlib import Path
import hashlib,json,struct
from elf_reader import Elf
from decoder import window
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
VERSIONS=[(41,72,0x9b6a0,6),(73,73,0x9bc28,7),(74,74,0x9c240,8),(75,106,0x9c8f8,9),(107,115,0x9d008,10),(116,116,0x9d850,12),(117,132,0x9e178,13),(133,157,0x9eaf0,15),(158,None,0x9f500,19)]
FIELDS=[('virtual_token_reserves','u64',8,64),('virtual_quote_reserves','u64',8,72),('real_token_reserves','u64',8,80),('real_quote_reserves','u64',8,88),('token_total_supply','u64',8,96),('complete','bool',1,153),('creator','Pubkey',32,0),('is_mayhem_mode','bool',1,154),('is_cashback_coin','bool',1,155),('quote_mint','Pubkey',32,32),('creator_fee_bps','u64',8,104),('can_edit_creator_fee','bool',1,156),('is_holder_reward','bool',1,157),('creator_fee','u64',8,112),('protocol_fees','u64',8,120),('depth','u8',1,152),('initial_virtual_quote_reserves','u64',8,128),('post_complete_base_out','u64',8,136),('post_complete_quote_in','u64',8,144)]
def run():
 e=Elf(P/'inputs/composition/evidence/original.so');c=Elf(P/'inputs/current/candidate.so');s=Elf(P/'inputs/current/unstripped.so');assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 starts=[0x13048,0x8320,0x9b148,0x5a28]+[x[2]for x in VERSIONS];rows=[];targets=set()
 for a in starts:
  z=e.entries[e.entries.index(a)+1];r=window(e,a,z);rows.append(r);targets.update(i['target']for i in r['instructions']if i.get('kind')=='direct_call')
 rows.append(window(e,0x102a60,0x102c68))
 targets.update(i['target']for i in rows[-1]['instructions']if i.get('kind')=='direct_call')
 callees=[]
 for a in sorted(targets):
  z=e.entries[e.entries.index(a)+1];r=window(e,a,z);r['current_normalized_matches']=[{'name':f['name'],'start':f['start'],'bytes':f['size']}for f in s.funcs if f['size']==z-a and e.normalized[a:z]==c.normalized[f['start']:f['start']+f['size']] ;callees.append(r)
 def ins(pc,op,reg,off,im):assert e.b[pc:pc+8]==struct.pack('<BBhi',op,reg,off,im),hex(pc)
 def call(pc,t):assert e.calls[pc]==t,hex(pc)
 for pc,t in [(0x102a78,0x13048),(0x130f0,0x8320),(0x85b0,0x9b148),(0x9b1c0,0x19bbb8),(0x9b218,0x19bbb8),(0x9b2b8,0x19bbb8),(0x102c08,0x2930)]:call(pc,t)
 for pc,t in zip([0x9b2f0,0x9b318,0x9b340,0x9b368,0x9b390,0x9b3b8,0x9b3e0,0x9b408,0x9b420],[v[2]for v in VERSIONS]):call(pc,t)
 for pc,op,n in [(0x9b270,0xa5,41),(0x9b2d8,0xa5,73),(0x9b300,0x15,73),(0x9b328,0xa5,75),(0x9b350,0xa5,107),(0x9b378,0xa5,116),(0x9b3a0,0x15,116),(0x9b3c8,0xa5,133),(0x9b3f0,0xa5,158)]:ins(pc,op,1,1,n)
 for pc in [0x9b188,0x9b1e0,0x9b280]:
  # Constant may be at different operand boundary; all actual invalid-data
  # constructor sites are located below rather than guessed by proximity.
  pass
 invalid=[]
 for i in rows[2]['instructions']:
  if i['opcode']==0x18 and i['immediate_u64']==0x8000000000000003:invalid.append(i['pc'])
 assert len(invalid)==3
 # Each absent field is zeroed explicitly in the actual selected result body.
 schemas=[]
 for lo,hi,a,count in VERSIONS:
  r=next(r for r in rows if r['start']==a);covered=set();zero_stores=[]
  for i in r['instructions']:
   size={0x7a:8,0x62:4,0x6a:2,0x72:1}.get(i['opcode'])
   if size and i['dst']==6 and i['immediate_signed']==0:
    off=i['offset_signed'];covered.update(range(off,off+size));zero_stores.append({'pc':i['pc'],'offset':off,'bytes':size})
  if a==0x9b6a0:
   for pc in range(0x9bb18,0x9bb58,8):ins(pc,0x7a,10,-160+(pc-0x9bb18),0)
   ins(0x9bb70,0xb7,3,0,64);call(0x9bb90,0x1b3610);covered.update(range(64));zero_stores.append({'pc':0x9bb90,'offset':0,'bytes':64,'source':'eight explicit zero stack words at9bb18..9bb50'})
  defaults=[]
  for name,typ,width,off in FIELDS[count:]:
   assert set(range(off,off+width))<=covered,(hex(a),name)
   defaults.append({'field':name,'value':'zero Pubkey'if typ=='Pubkey'else False if typ=='bool'else 0,'memory_offset':off})
  consumed=sum(f[2]for f in FIELDS[:count]);assert consumed==lo
  schemas.append({'payload_min':lo,'payload_max':hi,'total_min':lo+8,'total_max':None if hi is None else hi+8,'reader_start':a,'reader_end':r['end'],'field_count':count,'consumed_payload':consumed,'cursor_advance_success':consumed+8,'defaulted_fields':defaults,'zero_store_proof':zero_stores})
 fields=[];offset=0
 for name,typ,size,mem in FIELDS:fields.append({'name':name,'type':typ,'payload_offset':offset,'account_offset':offset+8,'bytes':size,'decoded_offset':mem});offset+=size
 assert offset==158
 # Primitive call identities are matched against actual current compiler symbols,
 # not a guessed name from nearby rodata.
 names={r['start']:[m['name']for m in r['current_normalized_matches']]for r in callees}
 assert any('From$LT$solana_program_error..ProgramError' in n for n in names[0x19bbb8])
 assert any('From$LT$std..io..error..Error' in n for n in names[0x19bc58])
 for t,needle in [(0xd068,'bool'),(0xce88,'u64'),(0xfab0,'Pubkey')]:assert any(needle in n for n in names[t])
 data=[]
 for start,n,role in [(0x1b5ba8,32,'System owner'),(0x1b79df,32,'Pump owner'),(0x1b73d8,13,'outer account name')]:
  b=e.b[start:start+n];data.append({'start':start,'bytes':n,'role':role,'hex':b.hex(),'text':b.decode(errors='replace')})
 refs=[{'pc':i['pc'],'value':i['immediate_u64'],'relocation':e.relocations.get(i['pc'])}for r in rows for i in r['instructions']if i['opcode']==0x18]
 return {'original_sha256':H(e.b),'current_candidate_sha256':H(c.b),'current_symbols_sha256':H(s.b),'windows':rows,'complete_direct_callees':callees,'invalid_data_constant_sites':invalid,'versions':schemas,'fields':fields,'consumed_data':data,'lddw_operands':refs,'cursor_contract':{'before_discriminator_match':'unchanged','after_valid_discriminator':'advances8 even if payload shorter than41','successful_reader':'consumes selected version only; remaining bytes retained','invalid_bool':'consumes offending byte before I/O error','owner_borrow_failure':'decoder not entered; account parser cursor already consumed account'},'limits':['Borsh/error helper symbol matches are local normalized-body attribution, not historical source or whole-program equality.','All other token/mode/semantic branch restrictions remain unchanged.','No runtime fixture, compile, main trait replacement or unchecked-reader claim.']}
if __name__=='__main__':
 r=run();(P/'closure-ledger.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'windows':len(r['windows']),'callees':len(r['complete_direct_callees']),'versions':len(r['versions']),'fields':len(r['fields']),'invalid_data_constant_sites':r['invalid_data_constant_sites']},indent=2))
