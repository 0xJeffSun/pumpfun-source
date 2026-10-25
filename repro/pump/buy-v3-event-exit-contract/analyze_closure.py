"""Static event/wire/exit ledger only. No ELF execution or synthetic accounts."""
from pathlib import Path
import bisect,gzip,hashlib,json,struct
from elf_reader import Elf
from decoder import window
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def run():
 e=Elf(P/'inputs/composition/evidence/original.so')
 specs=[('event_body',0x859b0,0x87ca0),('post_complete_constructor',0x81aa0,0x82128),('trade_serializer',0x1624b0,0x1639e8),('post_complete_serializer',0x163bf0,0x163ea8),('volume_init',0x105b78,0x107b38),('generated_exit',0x107b38,0x107f78),('volume_exit',0x6158,0x66f0),('volume_checked_decode',0x101c20,0x101ef8),('volume_decode',0x101ef8,0x102578),('wrapper_success_exit',0x128938,0x128980),('body_event_boundary',0x148920,0x1489f8),('common_volume_write',0x83fa8,0x84068),('whitelist_continuation',0x84578,0x84590)]
 rows=[];targets=set()
 for role,a,z in specs:
  r=window(e,a,z);r['role']=role;rows.append(r);targets.update(i['target']for i in r['instructions']if i.get('kind')=='direct_call')
 opaque={0xa23f0:'Whitelist late validator retained opaque; B6 owns its incomplete predicates.'}
 callees=[]
 for t in sorted(targets):
  z=e.entries[e.entries.index(t)+1]
  if t in opaque:callees.append({'start':t,'end':z,'bytes':z-t,'raw_sha256':H(e.b[t:z]),'scope':opaque[t]});continue
  r=window(e,t,z);r['scope']='Complete immediate target bytes; not a transitive semantic proof.';callees.append(r)
 covered={(r['start'],r['end'])for r in rows+callees if 'instructions'in r};frontier=[]
 for r in rows+callees:
  for i in r.get('instructions',[]):
   if i.get('kind')not in ['direct_call','external_call','indirect_call']:continue
   target=i.get('target');is_covered=target is not None and any(a<=target<z for a,z in covered)
   if not is_covered:frontier.append({'pc':i['pc'],'kind':i['kind'],'target':target,'relocation':i.get('relocation'),'status':opaque.get(target,'External runtime or unclosed transitive target; no unconditional success premise.')})
 # Deduplicate shared root/callee intervals' frontier edges.
 frontier=list({x['pc']:x for x in frontier}.values());frontier.sort(key=lambda x:x['pc'])
 def ins(pc,op,reg,off,imm):assert e.b[pc:pc+8]==struct.pack('<BBhi',op,reg,off,imm),hex(pc)
 def call(pc,t):assert e.calls[pc]==t,hex(pc)
 def branch(pc,t):op,_,off,_=struct.unpack_from('<BBhi',e.b,pc);assert op&7 in [5,6] and pc+8+8*off==t,hex(pc)
 for p,t in [(0x1489d8,0x859b0),(0x128978,0x107b38),(0x107b80,0x5a28),(0x107d80,0x6158),(0x859e8,0x1a0938),(0x86188,0x1624b0),(0x86360,0x1624b0),(0x87658,0x81aa0),(0x876f0,0x163bf0),(0x87778,0x163bf0),(0x867c0,0x1a0530),(0x873b0,0x1a0530),(0x879f0,0x1a0530),(0x6180,0x1b3678),(0x61b8,0x19bac0),(0x61e0,0x1a2d38)]:call(p,t)
 for p,t in [(0x128940,0x128950),(0x128948,0x128ad8),(0x1488d8,0x148920),(0x84588,0x83fa8),(0x86890,0x86958),(0x81ab8,0x81bd0),(0x81c20,0x81f68)]:branch(p,t)
 for p,op,reg,off,im in [(0x86958,0x72,1,161,1),(0x105da8,0xb7,2,0,137),(0x1067b0,0xb7,4,0,137),(0x1072e8,0xb7,3,0,137),(0x105f78,0x15,0,1,137)]:ins(p,op,reg,off,im)
 fields=json.loads((P/'inputs/event/fields.json').read_text());trade={f['field']:f for f in fields['TradeEvent']['fields']}
 for name,event in fields.items():
  assert event['discriminator']==H(('event:'+name).encode())[:16];offset=8
  for f in event['fields']:assert f['wire_offset']==offset;offset+=f['wire_size']
  assert offset==event['length'] and offset+8==event['cpi_length']
 assert len(trade)==36 and [fields[n]['length']for n in fields]==[390,144,232]
 for f in trade.values():
  op,reg,off,im=struct.unpack_from('<BBhi',e.b,f['producer_store_site']);assert op in [0x7b,0x7a,0x72,0x73]and reg&15==10 and off==f['object_offset']-0x560
  op,reg,off,im=struct.unpack_from('<BBhi',e.b,f['load_site']);assert (op==7 and im==f['object_offset'])if f['source_type']=='pubkey'else(op in [0x79,0x71]and off==f['object_offset'])
 volume=[('user','pubkey',32,8,0x6330),('needs_claim','bool',1,104,0x6378),('total_unclaimed_tokens','u64',8,40,0x63c0),('total_claimed_tokens','u64',8,48,0x6408),('current_sol_volume','u64',8,56,0x6450),('last_update_timestamp','i64',8,64,0x6498),('has_total_claimed_tokens','bool',1,105,0x64e0),('cashback_earned','u64',8,72,0x6528),('total_cashback_claimed','u64',8,80,0x6570),('stable_cashback_earned','u64',8,88,0x65b8),('total_stable_cashback_claimed','u64',8,96,0x6600)]
 vrows=[];offset=8;call(0x6268,0x19b548);ins(0x6260,0xb7,3,0,8)
 for name,typ,n,mem,pc in volume:
  call(pc,0x19b548);ins(pc-8,0xb7,3,0,n);vrows.append({'field':name,'type':typ,'wire_offset':offset,'bytes':n,'object_offset':mem,'writer_call':pc});offset+=n
 assert offset==106
 for name,off,load,store,spill in [('total_unclaimed_tokens',40,0x85c60,0x85ff0,-0x608),('total_claimed_tokens',48,0x85c50,0x85fe0,-0x610),('current_sol_volume',56,0x85c40,0x85fd0,-0x618),('last_update_timestamp',64,0x85c30,0x85fc0,-0x620)]:
  ins(load,0x79,0x61,off,0);ins(load+8,0x7b,0x1a,spill,0);ins(store-8,0x79,0xa5,spill,0);ins(store,0x7b,0x5a,trade[name]['object_offset']-0x560,0)
 data=[{'role':'volume discriminator','start':0x1b64af,'bytes':8,'hex':e.b[0x1b64af:0x1b64b7].hex()},{'role':'event name','start':0x1b6862,'bytes':3,'hex':e.b[0x1b6862:0x1b6865].hex()}]
 assert data[0]['hex']==H(b'account:UserVolumeAccumulator')[:16]and bytes.fromhex(data[1]['hex'])==b'buy'
 data.extend([{'role':'event authority seed','start':0x1b6807,'bytes':17,'hex':e.b[0x1b6807:0x1b6818].hex()},{'role':'self program ID','start':0x1b79df,'bytes':32,'hex':e.b[0x1b79df:0x1b79ff].hex()}])
 assert bytes.fromhex(data[2]['hex'])==b'__event_authority'
 for pc in [0x864a0,0x870b0]:
  assert e.b[pc]==0x18;value=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32;assert value==int.from_bytes(bytes.fromhex('e445a52e51cb9a1d'),'little')
 for args in [(0x86630,0x6a,1,32,1),(0x86750,0x7a,10,-80,2),(0x86758,0x7a,10,-880,1),(0x86760,0x7a,10,-896,17),(0x867b8,0xb7,4,0,1),(0x6690,0xb7,2,0,3004)]:ins(*args)
 # Data references are exact machine operands. Unknown spans stay unresolved;
 # no nearest-string naming is promoted to a consumed-literal claim.
 refs=[]
 for r in rows:
  for i in r['instructions']:
   if i['opcode']==0x18:refs.append({'pc':i['pc'],'value':i['immediate_u64'],'relocation':e.relocations.get(i['pc']),'interpretation':'Exact operand only unless separately identified in consumed_data/field ledger.'})
 ledger=json.loads((P/'inputs/composition/preservation-ledger.json').read_text());saved=json.loads(gzip.decompress((P/'inputs/composition/evidence/v3_configured_fee.json.gz').read_bytes()));vstates=[]
 for row in ledger['rows']:
  r=saved['cases'][row['index']];assert H(json.dumps(r,sort_keys=True,separators=(',',':')).encode())==row['saved_row_sha256'];a=r['original']['accounts'][row['volume_key']];b=bytes.fromhex(a['data_hex']);assert len(b)==137 and H(b)==a['data_sha256'];assert a==r['candidate']['accounts'][row['volume_key']]
  vstates.append({'index':row['index'],'saved_row_sha256':row['saved_row_sha256'],'volume_data_sha256':H(b),'prefix_sha256':H(b[:106]),'tail_sha256':H(b[106:]),'tail_bytes':len(b[106:]),'tail_nonzero':any(b[106:]),'original_success':r['original']['error']is None})
 return {'original_sha256':H(e.b),'windows':rows,'immediate_callees':callees,'unclosed_frontier':frontier,'exact_lddw_operands':refs,'consumed_data':data,'event_fields':fields,'volume_wire':{'allocation':137,'prefix':106,'tail':31,'fields':vrows,'tail_is_not_a_new_serialized_field':True},'historical_volume_poststates':vstates,'coverage':{'rows':len(vstates),'successes':sum(r['original_success']for r in vstates),'nonzero_tail_rows':sum(r['tail_nonzero']for r in vstates),'new_transactions':0},'limits':['B7 remains partial: upstream descriptor quantities and recursive runtime/error targets are not recovered.','Current baseline typed source is preserved, not compiled by this task.','Neither whole program equivalence nor acceptance of the retained Token2022 rows is proved.']}
if __name__=='__main__':
 r=run();(P/'closure-ledger.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'windows':len(r['windows']),'immediate_callees':len(r['immediate_callees']),'frontier_edges':len(r['unclosed_frontier']),'coverage':r['coverage']},indent=2))
