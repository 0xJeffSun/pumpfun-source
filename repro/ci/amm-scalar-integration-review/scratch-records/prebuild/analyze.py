#!/usr/bin/env python3
"""Bounded read-only AMM setter evidence; no compiler, VM, network or initializer."""
from pathlib import Path
import argparse,bisect,gzip,hashlib,json,re,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent;I=W/'inputs';sha=lambda b:hashlib.sha256(b).hexdigest()
parser=argparse.ArgumentParser();parser.add_argument('--verify',action='store_true');args=parser.parse_args()
def read(path):
 b=(I/path).read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def identity(path):
 b=(I/path).read_bytes();return {'path':path,'sha256':sha(b),'bytes':len(b)}
def ins(elf,at):
 b=elf.b[at:at+8];opcode,reg,off,imm=struct.unpack('<BBhi',b)
 r={'address':at,'hex':hex(at),'bytes_hex':b.hex(),'opcode':opcode,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm}
 if opcode==0x18:r['wide_immediate']=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
 if opcode&7 in [5,6]and opcode not in[0x85,0x8d,0x95]:r['branch_target']=at+8+off*8
 if at in elf.calls:r['call_target']=elf.calls[at]
 return r
def window(elf,start,size):
 return {'start':start,'start_hex':hex(start),'end':start+size,'bytes':size,'raw_sha256':sha(elf.b[start:start+size]),'normalized_sha256':sha(elf.normalized[start:start+size]),'relocations':elf.pattern(start,size),'calls':elf.callsites(start,size),'instructions':[ins(elf,at)for at in range(start,start+size,8)]}
def literal(elf,start,size,why):
 b=elf.b[start:start+size];return {'address':start,'bytes':size,'hex':b.hex(),'sha256':sha(b),'ascii':b.decode(errors='replace'),'consumption_evidence':why}
paths={'original':'evidence/original/pump_amm/deployed.so','candidate':'repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so','symbols':'repro/pump_amm/pool-serialization-thirty-seven/unstripped.so'}
o=Elf(I/paths['original']);c=Elf(I/paths['candidate']);symbols=Elf(I/paths['symbols'])
assert sha(o.b)=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
assert sha(c.b)=='5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216'
assert c.b[c.lo:c.hi]==symbols.b[symbols.lo:symbols.hi]and c.pattern(c.lo,c.hi-c.lo)==symbols.pattern(symbols.lo,symbols.hi-symbols.lo)
catalog=read('work/pump-amm-current-body-inventory/pump_amm-bodies.json');orig={x['start']:x for x in catalog['original_windows']};cand={x['start']:x for x in catalog['candidate_functions']}
def match(a,b):
 row=orig[a];size=row['bytes'];assert b in cand and cand[b]['bytes']==size
 assert o.normalized[a:a+size]==c.normalized[b:b+size]and o.pattern(a,size)==c.pattern(b,size)
 return {'original':window(o,a,size),'candidate':window(c,b,size),'candidate_names':cand[b]['names'],'raw_equal':o.b[a:a+size]==c.b[b:b+size],'normalized_equal':True}
idl=read('evidence/upstream/pump_amm.json');ix=next(x for x in idl['instructions']if x['name']=='update_fee_config');disc=int.from_bytes(bytes(ix['discriminator']),'little')
assert [x['type']for x in ix['args']]==['u64','u64',{'array':['pubkey',8]},'u64','pubkey']
dispatch={}
for label,elf,at,branch,block,call,wrapper in [('original',o,0xdbd98,0xdbda8,0xdc468,0xdc4b8,0xe2230),('candidate',c,0x8a448,0x8a458,0x8b368,0x8b3b8,0x97bd8)]:
 assert ins(elf,at)['wide_immediate']==disc
 assert ins(elf,branch)['opcode']==0x1d and ins(elf,branch)['branch_target']==block
 assert elf.calls[call]==wrapper
 dispatch[label]={'discriminator':window(elf,at,24),'selected_block':window(elf,block,call+8-block),'wrapper':wrapper}
wrapper=match(0xe2230,0x97bd8);assert o.calls[0xe2230+1600]==0x1d8a0 and c.calls[0x97bd8+1600]==0xc2100
assert any('__global17update_fee_config'in n for n in cand[0x97bd8]['names'])and any('recovered17update_fee_config'in n for n in cand[0xc2100]['names'])
assert o.b[0x11e75d:0x11e75d+28]==c.b[0x109811:0x109811+28]==b'Instruction: UpdateFeeConfig'
handler=window(o,0x1d8a0,0x1e400-0x1d8a0);current_handler=window(c,0xc2100,5832)
expected=[(0x1d8f0,0x61630),(0x1d958,0x61898),(0x1d9a0,0x61d68),(0x1d9e8,0x61b00)]
assert [(x['offset']+0x1d8a0,x['target'])for x in handler['calls'][:4]]==expected
# Exact result gates prevent later setters from running after any earlier error.
for at,target in [(0x1d900,0x1daf0),(0x1d968,0x1d978),(0x1d970,0x1db00),(0x1d9b0,0x1d9c0),(0x1d9b8,0x1db10),(0x1d9f8,0x1da08),(0x1da00,0x1db20)]:assert ins(o,at)['branch_target']==target,(hex(at),ins(o,at))
scalar=[]
for name,start,offset,line in [('lp',0x61630,0x380,220),('protocol',0x61898,0x388,230),('creator',0x61b00,0x390,243)]:
 row=window(o,start,616);guard=ins(o,start+16);store=ins(o,start+24)
 assert guard['opcode']==0x25 and guard['immediate']==1000 and guard['branch_target']==start+48
 assert store['opcode']==0x7b and store['dst']==2 and store['src']==7 and store['offset']==offset
 assert ins(o,start+440)['immediate']==6000 and ins(o,start+456)['immediate']==line and ins(o,start+464)['immediate']==44
 assert ins(o,start+552)['opcode']==0xb7 and ins(o,start+552)['dst']==4 and ins(o,start+552)['immediate']==1000
 assert ins(o,start+560)['opcode']==0xbf and ins(o,start+560)['dst']==5 and ins(o,start+560)['src']==7
 assert o.calls[start+568]==0x1840
 assert [x['target']for x in row['calls']]==[0x753f8,0x7aba0,0x112f98,0x102fb8,0x1840]
 scalar.append({'name':name,'body':row,'unsigned_u64_guard':guard,'successful_u64_field_store':store,'observed_source_line':line,'error_code':6000,'error_values_order':[1000,'supplied u64 fee'],'current_complete_body_match':False})
helper_pairs={0x753f8:0xc8630,0x7aba0:0xcddd8,0x112f98:0xff8f8,0x102fb8:0xee570,0x1840:0xdd0}
helpers=[]
for a,b in helper_pairs.items():
 m=match(a,b);targetchecks=[]
 for call in m['original']['calls']:
  ao=call['target'];bc=c.calls[b+call['offset']];ar=orig.get(ao)
  found=next((x for x in ar['candidate_matches']if x['start']==bc),None)if ar else None
  assert found is not None,(hex(a),hex(ao),hex(bc))
  size=ar['bytes'];assert o.normalized[ao:ao+size]==c.normalized[bc:bc+size]and o.pattern(ao,size)==c.pattern(bc,size)
  targetchecks.append({'offset':call['offset'],'original_target':ao,'candidate_target':bc,'bytes':size,'normalized_equal':True})
 m['direct_target_checks']=targetchecks;helpers.append(m)
# Bounded consumed data, with load/length evidence. Arbitrary formatting/panic
# table extents remain unknown rather than being declared equal from previews.
assert ins(o,0x75410)['opcode']==0x61 and ins(o,0x75410)['src']==2
assert ins(o,0x7aba0)['opcode']==0x61 and ins(o,0x7aba0)['src']==1
assert o.b[0x11bf88:0x11bf8c]==bytes(4)
assert o.b[0x11ce9f:0x11ce9f+44]==b'programs/pump-amm/src/state/global_config.rs'
literals=[literal(o,0x11bf88,4,'Enum discriminator loaded as u32 by name helper0x75410 and Display helper0x7aba0; zero identifies PumpAmmError variant0.'),literal(o,0x11ce9f,44,'Every setter loads pointer at+416 and stores source-path length44 at+464.'),literal(o,0x11e75d,28,'UpdateFeeConfig wrapper pointer at+40 and explicit log length28 at+56.'),literal(o,0x11c0fa,55,'Failure-only unwrap diagnostic pointer at+256 and length55 at+272.')]
packet=read('repro/pump_amm/pool-serialization-thirty-seven/fee_config-differential.json.gz');assert packet['candidate_sha256']==sha(c.b)and packet['original_sha256']==sha(o.b)and packet['case_count']==356 and not packet['mismatches']
selected=[]
for index in [4,5,24,30,144,180]:
 row=packet['cases'][index];payload=bytes.fromhex(row['payload_hex']);fees=[struct.unpack_from('<Q',payload,x)[0]for x in [0,8,272]]
 values={side:[x for x in row[side]['logs']if x.startswith('Program log: Left: ')or x.startswith('Program log: Right: ')]for side in ['original','candidate']}
 assert values['original']==['Program log: Left: 1000','Program log: Right: '+str(next(x for x in fees if x>1000))]and values['candidate']==[],index
 selected.append({'index':index,'fees_lp_protocol_creator':fees,'comparison_fields_passed':row['match'],'original_logs':row['original']['logs'],'candidate_logs':row['candidate']['logs'],'compared_value_lines':values,'source':'Preserved existing receipt only; no new runtime execution or strengthened old acceptance claim.'})
recipient_dependency=window(o,0x61d68,2336)
assert {i['immediate']for i in recipient_dependency['instructions']if i['opcode']==0x62}>={6011,6012}
report={'scope':'Only update_fee_config scalar guards and original immediate callees/data. No319-window re-inventory, create_config reconstruction, build or runtime. Equivalent source spelling is not uniquely recoverable.','programs':{k:identity(v)for k,v in paths.items()},'instruction':ix,'dispatch':dispatch,'wrapper_match':wrapper,'original_handler':handler,'current_handler':current_handler,'original_setter_call_order':expected,'recipient_dependency_unchanged_by_proposal':recipient_dependency,'scalar_setters':scalar,'shared_helpers':helpers,'bounded_literals':literals,'existing_receipt_log_gaps':selected,'historical_specialization':read('repro/pump_amm/create-config-static/final-build/scalar-setter-negative-analysis.json'),'historical_negative_applies_to_current_helper':False,'current_with_values_helper_matches':True,'unresolved':'No unique historical syntax, inlining annotation or compile/code-shape outcome is proven. Formatting/panic relocated tables beyond explicit consumed spans and unlimited transitive data are unresolved. Recipient-validation implementation is unchanged by this proposal.','no_build':True,'no_runtime':True}
if args.verify:assert json.loads(json.dumps(report))==json.loads((W/'evidence.json').read_text())
else:(W/'evidence.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','original_setters':3,'setter_bytes_each':616,'wrapper_bytes':2296,'original_handler_bytes':2912,'current_handler_bytes':5832,'shared_complete_helper_matches':len(helpers),'helper_direct_call_checks':sum(len(x['direct_target_checks'])for x in helpers),'bounded_literals':len(literals),'saved_log_gap_rows':len(selected),'no_build':True,'no_runtime':True},indent=2))
