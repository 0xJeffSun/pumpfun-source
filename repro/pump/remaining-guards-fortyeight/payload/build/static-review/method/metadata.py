"""Static metadata dataflow only; never executes an ELF or inspects excluded semantics."""
from pathlib import Path
import bisect,hashlib,json,struct
from elf_reader import Elf
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()

def decoded(e,a,z):
 out=[];pc=a
 while pc<z:
  op,r,off,im=struct.unpack_from('<BBhi',e.b,pc);size=16 if op==0x18 else 8
  d={'pc':pc,'offset':pc-a,'opcode':op,'dst':r&15,'src':r>>4,'offset_signed':off,'immediate_signed':im,'raw_hex':e.b[pc:pc+size].hex()}
  if size==16:d['immediate_u64']=(im&0xffffffff)|struct.unpack_from('<I',e.b,pc+12)[0]<<32
  if pc in e.calls:d.update(kind='direct_call',target=e.calls[pc])
  elif op==0x85:d.update(kind='external_call',relocation=e.relocations.get(pc))
  elif op==0x8d:d.update(kind='indirect_call')
  elif op==0x95:d.update(kind='exit')
  elif op&7 in (5,6):d.update(kind='branch',target=pc+8+8*off)
  out.append(d);pc+=size
 return out

def window(e,a,z):
 return {'start':a,'end':z,'bytes':z-a,'raw_sha256':H(e.b[a:z]),'normalized_sha256':H(e.normalized[a:z]),'relocations':e.pattern(a,z-a),'instructions':decoded(e,a,z)}

def format_selector(e,start,value,mode):
 # This is bounded static constant propagation of a formatter selection tree.
 # No VM, ELF entrypoint, syscall, account or transaction is invoked.
 regs={1:value if mode=='debug' else 0x100000000,2:0x200000000};mem={0x100000000:value};pc=start;path=[]
 for _ in range(1000):
  op,r,off,im=struct.unpack_from('<BBhi',e.b,pc);d,s=r&15,r>>4;n=pc+8;step={'pc':pc,'raw_hex':e.b[pc:pc+(16 if op==0x18 else 8)].hex()};path.append(step)
  if op==0x85:
   assert mode=='debug';ptr,length=regs[2],regs[3]
   return {'ordinal':value,'path':path,'call_target':e.calls[pc],'pointer':ptr,'bytes':length,'text':e.b[ptr:ptr+length].decode(),'sha256':H(e.b[ptr:ptr+length])}
  if op in (0x7b,0x7a):
   assert mode=='display';at=regs[1];ptr=struct.unpack_from('<Q',e.b,at)[0]>>32;length=struct.unpack_from('<Q',e.b,at+8)[0]
   assert e.relocations[at]['type']==8
   return {'ordinal':value,'path':path,'slice_descriptor':at,'slice_raw_hex':e.b[at:at+16].hex(),'pointer':ptr,'bytes':length,'text':e.b[ptr:ptr+length].decode(),'sha256':H(e.b[ptr:ptr+length])}
  if op==0x18:regs[d]=(im&0xffffffff)|struct.unpack_from('<I',e.b,pc+12)[0]<<32;n=pc+16
  elif op in (0x79,0x61):regs[d]=mem[regs[s]+off]
  elif op in (0xb7,0xbf):regs[d]=regs[s]if op==0xbf else im
  elif op==0x67:regs[d]=(regs[d]<<im)&((1<<64)-1)
  elif op==0x77:regs[d]>>=im
  elif op==0x05:n=pc+8+off*8
  elif op in (0x15,0x25,0x35,0x65,0x55,0x75):
   a,b=regs[d],im
   if op in (0x65,0x75):a=a-(1<<64)if a>(1<<63)-1 else a
   yes={0x15:lambda:a==b,0x25:lambda:a>b,0x35:lambda:a>=b,0x65:lambda:a>b,0x55:lambda:a!=b,0x75:lambda:a>=b}[op]()
   step['branch_taken']=yes
   if yes:n=pc+8+off*8
  else:raise AssertionError(('not formatter-selection instruction',step))
  pc=n
 raise AssertionError('selection bound')

def run():
 o=Elf(P/'inputs/original.so');c=Elf(P/'inputs/candidate.so');s=Elf(P/'inputs/symbols.so')
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.relocations==s.relocations
 def symbol(needle):
  r=[f for f in s.funcs if needle in f['name']];assert len(r)==1,(needle,r);return r[0]
 debug=symbol('PumpError$u20$as$u20$core..fmt..Debug');display=symbol('PumpError$u20$as$u20$core..fmt..Display');name=symbol('PumpError4name');convert=symbol('From$LT$pump_recovered..PumpError$GT$')
 known=[('Debug',1436840,1441232,debug),('Display',1433224,1436840,display),('name',1405824,1432720,name),('From',1432720,1433224,convert)]
 pairs=[]
 for role,oa,oz,f in known:
  ca=f['start'];cz=ca+f['size'];n=min(oz-oa,cz-ca)
  ds=[k for k in range(0,n,8)if o.normalized[oa+k:oa+k+8]!=c.normalized[ca+k:ca+k+8]]
  pairs.append({'role':role,'original':window(o,oa,oz),'candidate':window(c,ca,cz),'symbol':f['name'],'normalized_mismatching_offsets':ds,'same_size':oz-oa==cz-ca,'full_normalized_equal':o.normalized[oa:oz]==c.normalized[ca:cz]})
 assert pairs[0]['normalized_mismatching_offsets']==[2120]
 assert pairs[1]['full_normalized_equal'] and pairs[3]['full_normalized_equal']
 names={'original':[format_selector(o,1436840,n,'debug')for n in range(111)],'candidate':[format_selector(c,debug['start'],n,'debug')for n in range(111)]}
 messages={'original':[format_selector(o,1433224,n,'display')for n in [108,109,110]],'candidate':[format_selector(c,display['start'],n,'display')for n in [108,109,110]]}
 idl=json.loads((P/'inputs/official-idl.json').read_text())['errors'];assert len(idl)==110 and max(x['code']for x in idl)==6109
 assert all(names['original'][i]['text']==idl[i]['name']==names['candidate'][i]['text']for i in range(110))
 assert names['original'][110]['text']=='QuoteMintNotWritable' and names['candidate'][110]['text']=='ReconstructionBranchUnsupported'
 assert o.calls[1432784]==1405824 and o.calls[1432920]==1433224
 assert struct.unpack_from('<BBhi',o.b,1433112)==(0x07,7,0,6000)
 # Actual two metadata constant uses in original; no interpretation of owning handler.
 refs=[]
 for pc,r in o.relocations.items():
  if r['type']!=8 or not(o.lo<=pc<o.hi)or o.b[pc]!=0x18:continue
  ptr=struct.unpack_from('<I',o.b,pc+4)[0]|struct.unpack_from('<I',o.b,pc+12)[0]<<32
  if ptr+4<=len(o.b) and struct.unpack_from('<I',o.b,ptr)[0]==110:
   i=bisect.bisect_right(o.entries,pc)-1
   refs.append({'pc':pc,'pointer':ptr,'literal_bytes':o.b[ptr:ptr+4].hex(),'owner_window':o.entries[i:i+2],'scope':'metadata use only; surrounding business/extension semantics opaque'})
 assert [r['pc']for r in refs]==[308008,308048]
 assert o.calls[308024]==1405824 and o.calls[308064]==43320
 assert struct.unpack_from('<BBhi',o.b,308128)==(0x62,10,-400,6110)
 srcptr=struct.unpack_from('<I',o.b,308072+4)[0]|struct.unpack_from('<I',o.b,308072+12)[0]<<32
 srclen=struct.unpack_from('<i',o.b,308112+4)[0];source=o.b[srcptr:srcptr+srclen].decode()
 assert source=='programs/pump/src/migrate_v2.rs'
 # Only immediate callers and callee metadata bodies; no execution/inspection of branches that select this error.
 metadata_callees=[]
 for t in [43320,1686320,1766256]:
  z=o.entries[o.entries.index(t)+1];matches=[]
  for f in s.funcs:
   a,n=f['start'],f['size']
   if n==z-t and o.normalized[t:z]==c.normalized[a:a+n] and o.pattern(t,n)==c.pattern(a,n):matches.append({'start':a,'end':a+n,'name':f['name'],'raw_equal':o.b[t:z]==c.b[a:a+n]})
  metadata_callees.append({'original':window(o,t,z),'current_pattern_matches':matches})
 # The repeated immediate 110 in the runtime error string table is not a variant construction.
 numeric=decoded(o,1376728,1376736)[0]
 numeric['scope']='Unattributed numeric store, not claimed as an enum call site; its surrounding body remains outside this task.'
 return {'identities':{k:{'sha256':H(e.b),'bytes':len(e.b)}for k,e in [('original',o),('candidate',c),('symbols',s)]},'metadata_windows':pairs,'debug_selection':names,'last_display_selection':messages,'idl_boundary':{'entries':len(idl),'last':idl[-1],'binary_extra_ordinal':110,'binary_extra_code':6110,'official_idl_changed':False},'constant_110_uses':refs,'permitted_error_construction_metadata':{'window':window(o,307992,308208),'name_call':308024,'to_string_call':308064,'code_store':308128,'code':6110,'source_literal_pointer':srcptr,'source_literal':source,'source_line':335,'business_condition':'opaque; no new writable check inferred'},'other_numeric_110':numeric,'metadata_callees':metadata_callees,'limits':['Literal/xref enumeration is not proof that no dynamic error construction exists.','Surrounding migration/extension business semantics were not examined.','Original semantic enum/type name is inferred via current symbols and conversion/call structure, not an original symbol.','No new source build, transaction or full-binary equality.']}

if __name__=='__main__':print(json.dumps(run(),indent=2,sort_keys=True))
