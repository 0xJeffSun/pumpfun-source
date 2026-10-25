"""Static byte extraction only. Never evaluates relay instructions or Rust."""
import hashlib,json,struct
from pathlib import Path
import disasm
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
LITERALS=[('idl_discriminator',757541,8),('relay_id',758342,32),('erased_authority_and_system',753088,32),('origin_filename',758374,29),('idl_seed',758432,10),('create_log',758403,29),('resize_log',758442,29),('shrink_panic',758471,54),('close_log',758525,28),('buffer_log',758553,28),('write_log',758581,21),('authority_log',758602,28),('set_buffer_log',758630,25),('set_buffer_error_record',754568,16),('header_discriminator_error_record',754648,16),('create_with_seed_illegal_owner_suffix',768115,21)]
# Operands independently transcribed from the complete original listings.
# (pc, opcode, register byte, signed offset, signed immediate)
OPERANDS=[(522320,183,2,0,1001),(522032,7,8,0,44),(522464,183,8,0,10000),(525824,183,2,0,1002),(525432,183,7,0,10000),(527744,99,24,40,0),(528360,99,38,88,0),(528984,98,10,-128,2506),(529000,98,10,-256,36),(610224,98,10,-128,3002),(610240,98,10,-256,36),(610624,183,2,0,3001),(611096,183,2,0,3003),(593648,183,2,0,2013),(595256,183,2,0,2005),(589824,183,2,0,2003),(586488,183,2,0,2011),(607544,183,2,0,2002),(607752,183,2,0,2000),(606656,183,2,0,2006),(608424,183,2,0,2007),(690368,37,2,-20,10240),(690560,183,2,0,0),(678768,98,0,0,3),(676000,98,0,0,2),(686872,106,0,32,257),(686944,106,0,66,256),(687016,106,0,100,1)]
CALLS={517528:170,519688:215,519888:171,521024:209,521176:174,521216:210,518816:213,519032:175,519104:214,520720:207,520864:177,520944:208,518272:213,518440:176,518480:214,519224:205,519368:173,519408:206,521328:211,521512:172,521592:212,525080:216,591648:19,591728:19,587552:282,524208:300,527016:294,527096:332,528472:331,529112:3,594216:16,594584:325,521848:341,522000:340,522672:320,606408:341}
def derive():
 b=disasm.B; selected=json.loads((P/'selected-windows.json').read_text()); rows=[]; calls=[]; branches=[]; refs=[]
 external={x['pc']:x for w in disasm.W for x in w['external_calls']}
 starts={w['start']:w['ordinal'] for w in disasm.W}
 for n in selected:
  w=disasm.W[n]; assert H(b[w['start']:w['end']])==w['sha256']
  assert (P/'evidence'/f'{n}.asm').read_text()==disasm.render(n)
  ins=list(disasm.instructions(w['start'],w['end']))
  rows.append({'ordinal':n,'start':w['start'],'end':w['end'],'size':w['end']-w['start'],'sha256':H(b[w['start']:w['end']]),'instruction_count':len(ins),'source_identity':'not inferred from boundary or proposed Rust'})
  raw_calls=[]
  for pc,raw,txt in ins:
   op,regs,off,imm=struct.unpack_from('<BBhi',b,pc)
   if op==133:
    if pc in external:
     e=external[pc];rel=e['relocation'];offset,info=struct.unpack_from('<QQ',b,rel['record_pc']);assert offset==pc and info&0xffffffff==10
     calls.append({'from':n,'pc':pc,'kind':'external syscall/abort','symbol':rel['symbol'],'relocation_record':rel,'record_hex':b[rel['record_pc']:rel['record_pc']+16].hex()})
    else:
     target=pc+8+imm*8; ordinal=starts.get(target); assert ordinal is not None
     raw_calls.append({'pc':pc,'target':target,'target_ordinal':ordinal})
     calls.append({'from':n,'pc':pc,'kind':'direct','target':target,'target_ordinal':ordinal,'target_full_window_retained':ordinal in selected,'boundary':'retained full body' if ordinal in selected else 'external framework/runtime premise; not a completed source identity'})
   elif op==141: calls.append({'from':n,'pc':pc,'kind':'indirect','operand':imm,'boundary':'indirect formatter/destructor; unresolved concrete target'})
   elif op&7 in (5,6) and op!=149:
    branches.append({'from':n,'pc':pc,'raw_displacement':off,'absolute_target':pc+8+off*8,'decoded':txt})
  assert raw_calls==w['direct_calls']
  for ref in w['data_references']:
   pc=ref['pc'];assert b[pc]==24
   target=struct.unpack_from('<I',b,pc+4)[0]+(struct.unpack_from('<I',b,pc+12)[0]<<32);assert target==ref['target']
   rec=ref['relocation']['record_pc'];off,info=struct.unpack_from('<QQ',b,rec);assert off==pc and info&0xffffffff==8
   refs.append({'from':n,**ref,'raw_relocation_hex':b[rec:rec+16].hex(),'bounded_target_hex':b[target:target+16].hex(),'note':'16 raw target bytes only; not a claimed string/descriptor extent or applied relocation'})
 facts=[]
 for pc,op,r,off,imm in OPERANDS:
  actual=struct.unpack_from('<BBhi',b,pc); assert actual==(op,r,off,imm),(pc,actual,(op,r,off,imm))
  facts.append({'pc':pc,'raw':b[pc:pc+8].hex(),'opcode':op,'register_byte':r,'offset':off,'immediate':imm})
 for pc,ordinal in CALLS.items():
  assert b[pc]==133 and pc+8+struct.unpack_from('<i',b,pc+4)[0]*8==disasm.W[ordinal]['start'],(pc,ordinal)
 literals=[{'name':n,'start':a,'end':a+z,'sha256':H(b[a:a+z]),'hex':b[a:a+z].hex(),'utf8':b[a:a+z].decode('utf-8','backslashreplace')} for n,a,z in LITERALS]
 assert b[757541:757549].hex()=='184662bf3a907b9e'
 return {'original_sha256':H(b),'complete_windows':rows,'all_direct_external_indirect_calls':calls,'all_branches':branches,'all_relocated_data_references':refs,'bounded_literals':literals,'transcribed_operands':facts,'transcribed_direct_calls':[{'pc':pc,'ordinal':o,'target':disasm.W[o]['start']} for pc,o in CALLS.items()]}
if __name__=='__main__':
 print(json.dumps(derive(),indent=2,sort_keys=True))
