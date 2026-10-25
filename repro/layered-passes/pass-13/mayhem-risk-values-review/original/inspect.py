from pathlib import Path
import sys,struct,json,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));import disasm
O=disasm.a.Elf((P/'inputs/original.so').read_bytes());C=disasm.a.Elf((P/'inputs/current.so').read_bytes())
H=lambda b:hashlib.sha256(b).hexdigest()
assert H(O.b)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
def ins(e,pc):return struct.unpack('<BBhi',e.at(pc,8))
def edge(e,pc,to):assert ins(e,pc)[0]==0x85 and pc+8+ins(e,pc)[3]*8==to
edge(O,183664,11776);edge(O,184088,11776);edge(C,87552,7264);edge(C,89416,7264)
# Original scalar argument order limit then counter-low; current output-pointer ABI shifts it by one.
for e,pc,expected in [(O,183648,(0xbf,0x73,0,0)),(O,183656,(0xbf,0x64,0,0)),(O,184072,(0xbf,0x93,0,0)),(O,184080,(0xbf,0x84,0,0)),(C,87520,(0x79,0x15,72,0)),(C,87528,(0x79,0x14,128,0)),(C,89376,(0x79,0x15,40,0)),(C,89392,(0x79,0x14,136,0))]:assert ins(e,pc)==expected,(pc,ins(e,pc))
assert ins(O,11840)[3]==20 and ins(O,12528)[3]==20
edge(O,11848,695288);edge(O,12536,695288)
assert ins(C,7360)[3]==20;edge(C,7368,595080)
assert ins(O,183568)[3]==6007 and ins(O,183992)[3]==6006
assert ins(C,87448)[3]==6006
# retain complete selected bodies and every direct outgoing call, without asserting transitive semantics.
windows=[('original-values',O,11776,13768),('original-decimal-u64',O,695288,695944),('original-name',O,190160,196056),('original-display',O,196056,196888),('original-box',O,620712,620848),('candidate-values',C,7264,9272),('candidate-decimal-u64',C,595080,595768),('candidate-name',C,231984,232976),('candidate-box',C,519448,519592)]
rows=[]
for name,e,lo,hi in windows:
 calls=[];data=[];pc=lo
 while pc<hi:
  op,r,off,imm=ins(e,pc)
  if op==0x85:calls.append({'pc':pc,'target':pc+8+imm*8,'relocation':e.relocations.get(pc),'status':'direct edge; target closure not automatically accepted'})
  elif op==0x8d:calls.append({'pc':pc,'indirect':True,'status':'unresolved formatter/callback'})
  elif op==0x18:
   v=struct.unpack_from('<I',e.at(pc,16),4)[0]|struct.unpack_from('<I',e.at(pc,16),12)[0]<<32
   data.append({'pc':pc,'value':v,'extent':None})
  pc+=16 if op==0x18 else 8
 rows.append({'name':name,'start':lo,'end':hi,'sha256':H(e.at(lo,hi-lo)),'calls':calls,'data_references':data})
(P/'closure-ledger.json').write_text(json.dumps({'scope':'Complete selected function bodies and full direct outgoing edges; unresolved transitive/indirect boundaries explicit, not a recursively closed equivalence proof.','original_sha256':H(O.b),'candidate_symbols_sha256':H(C.b),'windows':rows,'source_correction':None,'compared_values_order':'unsigned u64 limit first; unsigned low64 counter second','unsigned_decimal_capacity':20},indent=2)+'\n')
print('Compared-value argument order and unsigned64 conversion confirmed; no source discrepancy established.')
