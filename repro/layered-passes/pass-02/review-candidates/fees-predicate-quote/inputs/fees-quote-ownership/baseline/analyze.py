"""Read only static ELF bytes and frozen JSON. No target execution or external tools."""
from pathlib import Path
import hashlib,json,struct,tarfile,difflib
H=lambda b:hashlib.sha256(b).hexdigest()
def readjson(p):return json.loads(p.read_text())
def sections(b):
 o=struct.unpack_from('<Q',b,40)[0];z,n,si=struct.unpack_from('<HHH',b,58)
 ss=[struct.unpack_from('<IIQQQQIIQQ',b,o+i*z) for i in range(n)];s=ss[si];names=b[s[4]:s[4]+s[5]]
 return {names[x[0]:].split(b'\0')[0].decode():(x[3],x[4],x[5]) for x in ss}
def raw(b,va,size):
 for a,o,n in sections(b).values():
  if a<=va and va+size<=a+n:return b[o+va-a:o+va-a+size]
 raise ValueError((va,size))
def decode(b,start,end,relocs):
 rows=[];pc=start
 while pc<end:
  x=raw(b,pc,8);op,regs,off,imm=struct.unpack('<BBhi',x);size=16 if op==24 else 8
  x=raw(b,pc,size);r=dict(pc=pc,opcode=op,dst=regs&15,src=regs>>4,offset_signed=off,immediate_signed=imm,size=size,raw=x.hex())
  if op==24:r['imm64_unsigned']=struct.unpack_from('<I',x,4)[0]|struct.unpack_from('<I',x,12)[0]<<32
  if pc in relocs:r['relocation']=relocs[pc]
  if op==133 and pc not in relocs:r['direct_target']=pc+8+8*imm
  if op==141:r['indirect_register']=imm
  if op&7 in [5,6] and op not in [133,141,149]:r['branch_target']=pc+8+off*8
  rows.append(r);pc+=size
 assert pc==end
 return rows
# Complete objects consumed by the handler's relocated pointer references.
# ABI vtables/locations are bounded premises, not transitive implementation proofs.
SPECS={
 'original':{803512:(31,'log'),803543:(42,'log'),806716:(32,'AMM pubkey'),821888:(24,'panic location'),802396:(4,'FeeError discriminant'),821240:(48,'fmt::Write vtable'),803599:(74,'application source filename'),806573:(32,'Fees pubkey'),802304:(4,'FeeError discriminant'),802440:(4,'FeeError discriminant'),800893:(55,'format failure message'),821288:(32,'Debug vtable'),821320:(24,'panic location'),802498:(17,'event authority seed'),803585:(14,'pool authority seed'),806605:(32,'Pump pubkey'),802316:(4,'pool seed'),802372:(4,'FeeError discriminant'),821912:(24,'panic location')},
 'candidate':{701555:(31,'log'),701586:(42,'log'),719760:(24,'panic location'),703203:(32,'AMM pubkey'),701332:(4,'FeeError discriminant'),701144:(34,'application source filename'),701541:(14,'pool authority seed'),703121:(32,'Pump pubkey'),701204:(4,'pool seed'),701292:(4,'FeeError discriminant'),719320:(48,'fmt::Write vtable'),699826:(55,'format failure message'),719368:(32,'Debug vtable'),719400:(24,'panic location'),703089:(32,'Fees pubkey'),701192:(4,'FeeError discriminant'),701524:(17,'event authority seed'),701268:(4,'FeeError discriminant'),719784:(24,'panic location')}}
def produce(P):
 I=P/'inputs';proof=readjson(I/'caller-static-proof.json');ledger=readjson(I/'fresh-instruction-ledger.json');refs=readjson(I/'fresh-data-reference-ledger.json');inv=readjson(I/'full-function-inventory.json')
 bins={'original':(I/'original.so').read_bytes(),'candidate':(I/'pump_fees_candidate.so').read_bytes()}
 assert H(bins['original'])==proof['original_sha256']=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 assert H(bins['candidate'])==proof['candidate_sha256']=='fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2'
 windows=[];calls=[];instructions={};data=[]
 for name,pair in proof['windows'].items():
  for side in bins:windows.append((name,side,pair[side]))
 for name,t in proof['direct_target_inventory'].items():windows.append((name,t['side'],t['window']))
 ranges=[]
 for name,side,w in windows:
  b=bins[side];st,en=w['start'],w['end'];assert H(raw(b,st,en-st))==w['raw_sha256']
  rel={st+x['offset']:{'type':x['type'],'symbol':x['symbol']} for x in w['relocations']}
  rows=decode(b,st,en,rel);instructions[name+':'+side]=rows
  if name in ledger:
   old=ledger[name][side];assert len(rows)==len(old)
   for a,v in zip(rows,old):
    for k,value in a.items():assert v[k]==value,(name,side,k,a,v)
  direct=[dict(pc=r['pc'],target=r['direct_target'],raw_signed_operand=r['immediate_signed'],offset=r['pc']-st) for r in rows if 'direct_target' in r]
  assert direct==w['direct_calls']
  norm=bytearray()
  for r in rows:
   x=bytearray.fromhex(r['raw'])
   if r['opcode']==133:x[4:8]=bytes(4)
   if r.get('relocation',{}).get('type')==8:x[4:8]=bytes(4);x[12:16]=bytes(4)
   norm.extend(x)
  assert H(norm)==w['normalized_sha256'],(name,side)
  ranges.append(dict(name=name,side=side,start=st,end=en,size=en-st,sha256=H(raw(b,st,en-st)),normalized_sha256=H(norm),file_offset=next(o+st-a for a,o,n in sections(b).values() if a<=st< a+n)))
  for r in rows:
   if r['opcode'] not in [133,141]:continue
   row=dict(window=name,side=side,**r)
   if 'direct_target' in r:
    t=proof['direct_target_inventory'].get(side+':'+str(r['direct_target']))
    row['target_window']=None if not t else {k:t['window'][k] for k in ['start','end','raw_sha256','named_symbols']}
    row['target_status']='recorded immediate window' if t else 'outside retained immediate window set; no transitive claim'
   calls.append(row)
 for side,b in bins.items():
  assert set(r['target'] for r in refs['handler'][side])==set(SPECS[side])
  for target,(size,role) in SPECS[side].items():
   x=raw(b,target,size);r=dict(side=side,target=target,end=target+size,bytes=size,role=role,hex=x.hex(),sha256=H(x),referenced_by=[v['pc'] for v in refs['handler'][side] if v['target']==target])
   if role=='panic location':
    # R_BPF_64_RELATIVE data relocations store the address in the high u32.
    addr=struct.unpack_from('<Q',x)[0]>>32;n,line,col=struct.unpack_from('<QII',x,8);s=raw(b,addr,n)
    r['filename']=dict(target=addr,end=addr+n,hex=s.hex(),text=s.decode(),sha256=H(s));r['line']=line;r['column']=col
   elif 'vtable' in role:
    r['abi_premise']='drop, size, align, method pointers; fmt::Write has three method slots, Debug one'
    r['words']=[struct.unpack_from('<Q',x,k)[0] for k in range(0,size,8)]
    r['method_targets']=[v>>32 for i,v in enumerate(r['words']) if i==0 or i>=3]
    r['transitive_implementation_proven']=False
   elif role=='FeeError discriminant':r['value']=struct.unpack('<I',x)[0]
   else:
    try:r['text']=x.decode('utf-8')
    except UnicodeDecodeError:pass
   data.append(r)
 # Complete six business-error literals, length from each actual formatter arm.
 for side,st,pcs in [('original',290384,[291448,290880,291384,291480,291728,291192]),('candidate',555712,[556776,556208,556712,556808,557056,556520])]:
  rows=instructions[f'{side}:{st}:{side}'];by={r['pc']:i for i,r in enumerate(rows)}
  for pc in pcs:
   i=by[pc];r=rows[i];n=rows[i+1];assert n['opcode']==183 and n['dst']==3
   size=n['immediate_signed'];addr=r['imm64_unsigned'];x=raw(bins[side],addr,size)
   data.append(dict(side=side,target=addr,end=addr+size,bytes=size,role='business error message',referenced_by=[pc],hex=x.hex(),sha256=H(x),text=x.decode()))
 source=readjson(I/'source-sha256.json')
 with tarfile.open(I/'source-snapshot.tar.gz') as t:
  content={m.name:t.extractfile(m).read() for m in t if m.isfile()}
 assert {n:H(b) for n,b in content.items()}==source
 assert content['programs/pump-fees/src/donation.rs']==(I/'donation.rs').read_bytes()
 inline=[]
 for side,pcs in [('original',[165696,165672,165648,165624]),('candidate',[426688,426664,426640,426616])]:
  by={r['pc']:r for r in instructions['handler:'+side]};x=b''.join(by[pc]['imm64_unsigned'].to_bytes(8,'little') for pc in pcs)
  inline.append(dict(side=side,role='native mint fallback ordered low-to-high bytes',instruction_pcs=pcs,hex=x.hex(),sha256=H(x)))
 for side in bins:
  for value,role in [(16996951285410894942,'DonationFeePdaCreated event discriminator'),(int.from_bytes(bytes.fromhex('e445a52e51cb9a1d'),'little'),'Anchor event CPI prefix')]:
   pcs=[r['pc'] for r in instructions['handler:'+side] if r.get('imm64_unsigned')==value]
   assert pcs, (side, role)
   if pcs:inline.append(dict(side=side,role=role,instruction_pcs=pcs,hex=value.to_bytes(8,'little').hex()))
 return {'inline-objects.json':inline,'ranges.json':ranges,'calls.json':calls,'instructions.json':instructions,'handler-data.json':data,'inventory-summary.json':inv['summary']}
if __name__=='__main__':
 P=Path(__file__).resolve().parent
 for n,v in produce(P).items():(P/n).write_text(json.dumps(v,indent=2)+'\n')
