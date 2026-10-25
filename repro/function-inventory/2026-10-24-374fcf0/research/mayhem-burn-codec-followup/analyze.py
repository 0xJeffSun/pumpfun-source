#!/usr/bin/env python3
"""Static burn-codec boundary review; no program execution or variants."""
from pathlib import Path
import hashlib, importlib.util, json, struct
ROOT=Path(__file__).resolve().parent
def sha(b):return hashlib.sha256(b).hexdigest()
def analyze():
 rows=json.loads((ROOT/'inputs.json').read_text())
 for r in rows:assert sha((ROOT/r['copy']).read_bytes())==r['sha256']
 spec=importlib.util.spec_from_file_location('er',ROOT/'elf_reader_portable.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 o=m.Elf(ROOT/'inputs/original.so');c=m.Elf(ROOT/'inputs/candidate.so');s=m.Elf(ROOT/'inputs/symbols.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 build=json.loads((ROOT/'inputs/build-attempt.json').read_text())
 for fn,src in [('state.rs','programs/mayhem/src/state.rs'),('burn.rs','programs/mayhem/src/instructions/burn.rs'),('Cargo.lock','programs/mayhem/Cargo.lock'),('Cargo.toml','programs/mayhem/Cargo.toml')]:assert sha((ROOT/'inputs'/fn).read_bytes())==build['source_sha256'][src]
 def ins(e,pc):
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pc)
  return {'pc':pc,'bytes':e.b[pc:pc+8].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'signed_imm':imm}
 def call(e,pc):
  r=ins(e,pc);assert r['opcode']==0x85 and r['src']==1
  r['target']=pc+8+r['signed_imm']*8;assert e.calls[pc]==r['target'];return r
 def literal(e,pc,n):
  assert e.b[pc]==0x18 and e.relocations[pc]['type']==8
  a=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
  return {'pc':pc,'address':a,'length':n,'hex':e.b[a:a+n].hex()}
 def window(e,start,end):return {'start':start,'end':end,'size':end-start,'raw_sha256':sha(e.b[start:end]),'raw_hex':e.b[start:end].hex()}
 widths=[8,8,8,32,16,16,1,8,1,8]
 oc=[r for r in o.callsites(427504,776) if r['target']==620336]
 cc=[r for r in c.callsites(22056,1288) if r['target']==518176]
 assert len(oc)==len(cc)==10
 writes=[];serial=0
 for i,(a,b,n) in enumerate(zip(oc,cc,widths)):
  op=427504+a['offset'];cp=22056+b['offset']
  for e,p in [(o,op),(c,cp)]:assert ins(e,p-8)['opcode']==0xb7 and ins(e,p-8)['dst']==3 and ins(e,p-8)['signed_imm']==n
  writes.append({'index':i,'serialized_offset':serial,'width':n,'original_call':call(o,op),'candidate_call':call(c,cp)});serial+=n
 assert serial==106
 fields=[('field_8',8,64,[0x68630],[2806]),('end_timestamp',8,72,[0x68670],[2815]),('mint',32,0,[],[]),('field_56',16,32,[0x686d8,0x686e0],[2832,2833]),('field_72',16,48,[0x68728,0x68730],[2844,2845]),('flag_88',1,97,[0x68778],[2855]),('field_89',8,80,[0x687b8],[2864]),('status',1,96,[0x687f8],[2873]),('burned_amount',8,88,[0x68838],[2882])]
 field_rows=[]
 for name,n,mem,ops,cslots in fields:
  a=[ins(o,p) for p in ops];b=[ins(c,p*8) for p in cslots]
  for j,(x,y) in enumerate(zip(a,b)):
   assert x['offset']==mem+j*8 and y['offset']==mem+8+j*8
  field_rows.append({'field_label_from_current_source':name,'width':n,'state_relative_offset':mem,'candidate_account_relative_offset':mem+8,'original_loads':a,'candidate_loads':b})
 # Mint uses a direct state-base pointer rather than scalar loads.
 assert ins(o,0x686b8)['opcode']==0xbf
 assert ins(c,2825*8)['opcode']==0x07 and ins(c,2825*8)['signed_imm']==8
 disc_o=literal(o,0x68608,8);disc_c=literal(c,2801*8,8);assert disc_o['hex']==disc_c['hex']=='b1fdbf7dcb16866b'
 matched=[]
 for label,cp,op,n in [('BpfWriter_write_all',518176,620336,280),('MayhemStatus_decoder',161696,427120,384),('unexpected_eof_helper',564392,665904,416)]:
  assert c.normalized[cp:cp+n]==o.normalized[op:op+n] and c.pattern(cp,n)==o.pattern(op,n)
  matched.append({'label':label,'candidate_start':cp,'original_start':op,'size':n,'normalized_equal':True,'raw_equal':c.b[cp:cp+n]==o.b[op:op+n],'candidate_calls':c.callsites(cp,n),'original_calls':o.callsites(op,n),'recursive_closure_proven':False})
 writer_error_o=literal(o,77569*8,28);writer_error_c=literal(c,64799*8,28);assert writer_error_o['hex']==writer_error_c['hex']
 # Full-account cursor, bool and enum checkpoints in the unchecked decoders.
 checks=[('unchecked_disc_min',0x68cf8,20021*8,8),('remove_disc',0x68d10,20024*8,-8),('bool_load_offset',0x68f40,20093*8,88),('bool_zero',0x68f80,20101*8,0),('bool_one',0x68f88,20102*8,1),('remaining_before_enum',0x69010,20119*8,-97),('enum_pointer',0x69030,20123*8,97),('last_u64_min',0x69168,20162*8,7)]
 checkpoints=[]
 for name,op,cp,value in checks:
  a=ins(o,op);b=ins(c,cp)
  if name=='bool_load_offset':assert a['offset']==b['offset']==value
  else:assert a['signed_imm']==b['signed_imm']==value
  assert a['opcode']==b['opcode']
  checkpoints.append({'name':name,'original':a,'candidate':b})
 assert call(o,0x69060)['target']==427120 and call(c,20129*8)['target']==161696
 # Serialization error and decoder error numbers agree; return ABI differs.
 assert ins(o,0x688d0)['signed_imm']==ins(c,2904*8)['signed_imm']==3004
 assert ins(o,0x68e30)['signed_imm']==ins(c,20062*8)['signed_imm']==3003
 assert call(o,0x688d8)['target']==call(o,0x68e38)['target']==632296
 assert call(c,2905*8)['target']==call(c,20063*8)['target']==530416
 macro=(ROOT/'inputs/anchor-attribute-account.rs').read_text()
 assert 'if writer.write_all(#disc).is_err()' in macro and 'if AnchorSerialize::serialize(self, writer).is_err()' in macro
 assert '.map_err(|_| anchor_lang::error::ErrorCode::AccountDidNotDeserialize.into())' in macro
 return {'conclusion':'No justified state-codec source correction from this bounded evidence. Preserve current source; resolve framework/compiler return-ABI provenance separately.',
  'original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'candidate_text_matches_symbols':True,'inputs':len(rows),'selected_toolchain':build['selected_toolchain'],
  'scope':'Burn path only; stopped initializer excluded; zero builds/source edits/runtime probes.',
  'ranges':[{'kind':k,'label':l,**window(o if k=='original' else c,a,b)} for k,l,a,b in json.loads((ROOT/'ranges.json').read_text())],
  'serialization':{'writes':writes,'total_bytes':serial,'fields':field_rows,'original_discriminator':disc_o,'candidate_discriminator':disc_c,'original_serializer_called_from_burn_exit':call(o,0x3b360),'candidate_generic_exit_called_from_burn_exit':call(c,177224),'original_state_pointer_setup':window(o,0x3b340,0x3b360),'candidate_account_pointer_setup':window(c,177176,177200)},
  'matched_direct_helpers':matched,'writer_error_literals':[writer_error_o,writer_error_c],
  'decoder_checkpoints':checkpoints,'enum_calls':[call(o,0x69060),call(c,20129*8)],
  'error_return_abi':{'original_error_from_range':[632296,632880],'candidate_error_from_range':[530416,531008],
   'original_serialization_caller':window(o,0x688d0,0x688e8),'candidate_serialization_caller':window(c,2902*8,2908*8),
   'original_decoder_caller':window(o,0x68e30,0x68e48),'candidate_decoder_caller':window(c,20060*8,20066*8),
   'observation':'Original code argument in r1, return pair in r0/r1; candidate return-buffer pointer in r1, code in r2, then output reloads. Dependency-shape versus compiler attribution remains open.'},
  'rejected_proposals':['No field-width/order/tag correction supported.','No manual serializer, noinline attribute, source-location remapping or source-layout variant justified.'],
  'limits':['Normalized helpers do not establish complete transitive data/call closure.','Full checked/unchecked decoder CFG equivalence is not asserted.','Field labels and 128-bit signedness are not recovered from widths alone.','Historical compiler/framework identity is unresolved.']}
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
