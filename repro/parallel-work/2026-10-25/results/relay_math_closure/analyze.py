"""Static byte extraction and integer equations only. Never executes target code."""
from pathlib import Path
import sys, json, struct, hashlib
P=Path(__file__).resolve().parent
sys.dont_write_bytecode=True
sys.path.insert(0,str(P/'evidence'))
import disasm
B=disasm.B
H=lambda b:hashlib.sha256(b).hexdigest()
def span(a,z):return dict(start=a,end=z,sha256=H(B[a:z]),hex=B[a:z].hex())
def derive():
 sh=struct.unpack_from('<Q',B,40)[0];sz,n,st=struct.unpack_from('<HHH',B,58)
 ss=[struct.unpack_from('<IIQQQQIIQQ',B,sh+i*sz) for i in range(n)]
 ns=B[ss[st][4]:ss[st][4]+ss[st][5]]
 sections={ns[s[0]:].split(b'\0')[0].decode():s for s in ss}
 rel=sections['.rel.dyn']; records={}
 for p in range(rel[4],rel[4]+rel[5],16):
  a,i=struct.unpack_from('<QQ',B,p);records[a]=(p,i)
 tables=[]
 for base in [772792,774912,778488,778896]:
  a=base+24;p,i=records[a];assert i&0xffffffff==8
  raw=struct.unpack_from('<Q',B,a)[0];target=raw>>32
  w=next(w for w in disasm.W if w['start']==target)
  tables.append(dict(base=base,slot=span(a,a+8),relocation=span(p,p+16),relocation_type=8,raw_u64=raw,encoded_target=target,target_window=w['ordinal'],target_bytes=span(w['start'],w['end']),historical_source_identity=None))
 literals=[]
 for pc,h,t in disasm.instructions(152552,153944):
  if B[pc:pc+2]==b'\x18\x02' and B[pc+16:pc+18]==b'\xb7\x03':
   a=struct.unpack_from('<I',B,pc+4)[0]+(struct.unpack_from('<I',B,pc+12)[0]<<32);length=struct.unpack_from('<i',B,pc+20)[0]
   literals.append(dict(pointer_and_length=span(pc,pc+24),data=span(a,a+length),text=B[a:a+length].decode()))
 assert len(literals)==34
 ranges=[(131136,131352),(131584,131592),(138248,138400),(140648,141384),(130560,130848),(690000,690144),(624864,625920),(642024,643240),(119680,119728),(119968,120104),(121272,121744),(141384,143608),(751104,751456),(752688,752760),(749088,749160),(743872,745848),(114096,114240),(152120,152264),(152552,152592),(153936,153952),(146464,146624),(149304,149400),(152016,152048),(152360,152472),(35648,36192),(721496,722624),(725688,725736),(692120,692296),(691464,691720),(733456,733808)]
 arithmetic_calls=[
 dict(pc=140896,target=752688,args=['out=frame-864','delta','0','u16(entry_arg3+64)','0'],result='low at frame-864, high at frame-856; reject high!=0'),
 dict(pc=141784,target=752688,args=['out=frame-64','count','0','24','0'],result='allocation extent, reject high!=0 before signed capacity bound'),
 dict(pc=142400,target=752688,args=['out=frame-80','u16(weights+2*i)','0','total','0'],result='exact 80-bit-or-smaller product'),
 dict(pc=142472,target=749088,args=['out=frame-96','product.low','product.high','10000','0'],result='quotient.low/high; wrapper discards helper remainder'),
 dict(pc=142536,target=752688,args=['out=frame-112','quotient.low','quotient.high','10000','0'],result='full quotient times denominator; subtracted with borrow at 142904..142936')]
 for c in arithmetic_calls:
  pc=c['pc'];assert B[pc]==133 and pc+8+8*struct.unpack_from('<i',B,pc+4)[0]==c['target']
 vectors=[];M=(1<<64)-1
 for total,weights in [(1,[5000,5000]),(7,[3333,3333,3334]),(10,[0,0]),(M,[10000]),(M,[65535]),(10,[10000,10000]),(M,[10000,10000])]:
  prods=[total*w for w in weights];qs=[v//10000 for v in prods];rs=[v%10000 for v in prods];lo=[q&M for q in qs];s=0;err=None
  for q in lo:
   if s+q>M:err='floor_sum_overflow';break
   s+=q
  if err is None and s>total:err='floor_sum_exceeds_total'
  out=None
  if err is None:
   out=lo[:]
   for i in sorted(range(len(weights)),key=lambda i:-rs[i])[:min(total-s,len(weights))]:
    if out[i]==M:err='increment_overflow';out=None;break
    out[i]+=1
  vectors.append(dict(total=total,weights=weights,products=prods,quotients=qs,quotient_low64=lo,remainders=rs,output=out,error=err))
 baseline=json.loads((P/'evidence/inputs/baseline.json').read_text())
 dispatch=baseline['idl_instruction_dispatch_targets']
 assert len(dispatch)==11
 return dict(format='relay-math-static-v1',checkpoint='517d77db988d8c63b6cf476f0be138c5a4f3128a',relay_sha256=H(B),source_changes=False,relay_reconstructed=False,historical_source_identities_resolved=0,inferred_windows=492,dispatch_count=11,dispatch_evidence=dispatch,callback_tables=tables,literals_116=literals,witnesses=[span(a,z) for a,z in ranges],arithmetic_calls=arithmetic_calls,static_equation_vectors=vectors,limits=['Encoded relocation targets are file-offset identities, not historical function names or a loader execution result.','All-context indirect closure remains open, including nested writer407 indirect calls.','No runtime, source build, account admission, invocation effect, large-sort tie or security claim.'])
if __name__=='__main__':
 (P/'result.json').write_text(json.dumps(derive(),indent=2)+'\n')
