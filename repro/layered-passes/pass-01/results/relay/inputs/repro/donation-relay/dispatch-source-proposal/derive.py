"""Static raw-byte/source contracts only; never executes hypothesis or target."""
from pathlib import Path
import hashlib,json,struct
from disasm import instructions,render
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
ORDINALS=[74,77,78,79,105,117,118,119,120,169,170,*range(178,194),*range(200,205),285,286,287,290,295,297,300,302,339,341,352,382,403,406,475]
def derive():
 b=(P/'inputs/deployed.so').read_bytes();assert len(b)==830448 and H(b)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 allw=json.loads((P/'inputs/prior-windows.json').read_text());business=json.loads((P/'inputs/integrated/instruction-ledger.json').read_text())
 windows=[]
 for o in ORDINALS:
  w=allw[o];lo,hi=w['start'],w['end'];assert H(b[lo:hi])==w['sha256']
  windows.append({**w,'raw':b[lo:hi].hex(),'listing_sha256':H(render(o).encode())})
 # Every discriminator is a retained lddw + register comparison, then suffix
 # pointer/length adjustment and a real wrapper call in169.
 selectors=[]
 for r in business:
  wrapper=r['phases']['wrapper'];call=next(c for c in allw[169]['direct_calls'] if c['target']==wrapper['range'][0]);disc=bytes(r['discriminator'])
  sites=[pc for pc,raw,txt in instructions(515416,517632) if b[pc]==0x18 and b[pc+4:pc+8]+b[pc+12:pc+16]==disc];assert len(sites)==1
  pc=sites[0];cmp=next(q for q,_,_ in instructions(pc+16,pc+48) if b[q:q+2]==bytes([0x1d,0x43]));op,reg,off,imm=struct.unpack_from('<BBhi',b,cmp)
  dest=cmp+8+off*8;assert call['pc']==dest+80
  assert struct.unpack_from('<BBhi',b,dest)==(7,2,0,-8)
  assert struct.unpack_from('<BBhi',b,dest+16)==(7,1,0,8)
  w=allw[wrapper['ordinal']];log=next(c for c in w['external_calls'] if c['relocation']['symbol']=='sol_log_');data=next(c for c in w['data_references'] if c['pc']<log['pc']);n=struct.unpack_from('<i',b,log['pc']-4)[0]
  phases={'instruction_log':{'pc':log['pc'],'literal_start':data['target'],'literal_end':data['target']+n,'text':b[data['target']:data['target']+n].decode(),'relocation':log['relocation']}}
  for role in ['parser','adapter','body','event_serializer','exit']:
   if not r['phases'][role]:continue
   target=r['phases'][role]['range'][0]
   calls=[x for x in w['direct_calls'] if x['target']==target]
   if calls:phases[role]=calls
  phases['set_return']=[x for x in w['direct_calls'] if x['target']==669720]
  phases['decode_error_102']=[{'pc':x,'raw':b[x:x+8].hex()} for x,_,_ in instructions(w['start'],w['end']) if struct.unpack_from('<BBhi',b,x)==(0xb7,2,0,102)]
  assert len(phases['decode_error_102'])==1
  if r['phases']['adapter']:
   a=allw[r['phases']['adapter']['ordinal']];serializer=r['phases']['event_serializer']['range'][0]
   phases['adapter_calls']=[x for x in a['direct_calls'] if x['target'] in [serializer,662240,668496,114568,r['phases']['body']['range'][0]]]
   assert len([x for x in phases['adapter_calls'] if x['target']==serializer])==2
  selectors.append({'name':r['instruction'],'discriminator':r['discriminator'],'constant_pc':pc,'comparison_pc':cmp,'taken_target':dest,'wrapper_call':call,'wrapper':wrapper,'phases':phases})
 anchors={515536:(0xa5,2,55,8),516000:(0xb7,2,0,101),516056:(0xb7,2,0,4100),552056:(0x15,4,42,0),552064:(0x71,0x31,40,0),552072:(0x55,1,1,0),552144:(0xb7,3,0,1),552512:(0xb7,2,0,2002),552824:(0xb7,2,0,2006),552352:(0x67,0,0,32),552368:(0x55,0,54,0),695416:(0x15,0,12,0)}
 for pc,expected in anchors.items():assert struct.unpack_from('<BBhi',b,pc)==expected,(pc,struct.unpack_from('<BBhi',b,pc),expected)
 calls={515488:743448,516008:665312,516064:665312,516168:652688,516200:657016,517528:517632,517600:552048,552152:695296,552336:743448,552464:652528,552520:665312,552832:665312,553296:652752,695512:716000}
 for pc,target in calls.items():
  op,reg,off,imm=struct.unpack_from('<BBhi',b,pc);assert (op,reg,off)==(0x85,0x10,0) and pc+8+8*imm==target
 # Locate the real ELF relocation entry, keeping raw words explicit rather than
 # asserting a loader algorithm for a data relocation's pre-relocation encoding.
 shoff=struct.unpack_from('<Q',b,40)[0];shsize,shnum=struct.unpack_from('<HH',b,58);relocations=[]
 for k in range(shnum):
  s=struct.unpack_from('<IIQQQQIIQQ',b,shoff+k*shsize)
  if s[1]!=9:continue
  for pc in range(s[4],s[4]+s[5],s[9]):
   offset,info=struct.unpack_from('<QQ',b,pc)
   if offset in [515464,552120,773760,695408]:relocations.append({'record_pc':pc,'offset':offset,'type':info&0xffffffff,'symbol_index':info>>32,'raw':b[pc:pc+16].hex()})
 assert len(relocations)==4
 literals=[{'start':a,'end':z,'hex':b[a:z].hex(),'sha256':H(b[a:z])} for a,z in [(758342,758374),(756958,756975),(773760,773776),(756300,756343)]]
 return {'original_sha256':H(b),'windows':windows,'selectors':selectors,'operand_anchors':[{'pc':pc,'expected':list(v),'raw':b[pc:pc+8].hex()} for pc,v in anchors.items()],'call_anchors':[{'pc':pc,'target':target,'raw':b[pc:pc+8].hex()} for pc,target in calls.items()],'relocations':relocations,'literals':literals,'scope':'Static bounded opcode/data/source correspondence; not execution, typecheck or unique historical source proof.'}
if __name__=='__main__':print(json.dumps(derive(),indent=2))
