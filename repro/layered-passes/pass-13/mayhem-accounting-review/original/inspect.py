"""Static attribution of two prior opaque windows; no SBF execution."""
from pathlib import Path
import sys,json,struct,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'method'));import disasm
O=disasm.a.Elf((P/'inputs/original.so').read_bytes());H=lambda b:hashlib.sha256(b).hexdigest()
assert H(O.b)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
def ins(pc):return struct.unpack('<BBhi',O.at(pc,8))
def call(pc,target):
 op,r,off,imm=ins(pc);assert op==0x85 and pc+8+imm*8==target
 return {'pc':pc,'target':target,'hex':O.at(pc,8).hex()}
def branch(pc,target):assert pc+8+ins(pc)[2]*8==target
assert ins(181984)==(0x7b,0x61,64,0) and ins(181992)==(0x7b,0x91,72,0)
assert ins(182120)==(0x7b,0x61,80,0) and ins(182128)==(0x7b,0x91,88,0)
assert ins(182280)==(0x7b,0x92,32,0) and ins(182288)==(0x7b,0x32,40,0)
assert ins(182752)==(0x7b,0x62,48,0) and ins(182760)==(0x7b,0x42,56,0)
assert ins(184456)==(0x7b,0x51,64,0) and ins(184464)==(0x7b,0x61,72,0)
assert ins(184576)==(0x7b,0x51,80,0) and ins(184584)==(0x7b,0x61,88,0)
assert ins(184712)==(0x7b,0x12,32,0) and ins(184720)==(0x7b,0x02,40,0)
assert ins(185184)==(0x7b,0x12,48,0) and ins(185192)==(0x7b,0x32,56,0)
for pc,code in [(182680,6002),(183568,6007),(183992,6006),(185128,6002)]:assert ins(pc)[3]==code
assert O.at(708712,4)==struct.pack('<I',7);assert O.at(708764,4)==struct.pack('<I',6)
branch(183080,183688);branch(183256,184104)
# Full edge/data retention only for newly attributed windows; callees unresolved.
windows=[]
for label,lo,hi in [('buy_post_accounting',181656,184200),('sell_post_accounting',184200,185296)]:
 calls=[];data=[];branches=[];pc=lo
 while pc<hi:
  op,r,off,imm=ins(pc)
  if op==0x85:calls.append({'pc':pc,'target':pc+8+imm*8,'callee_semantics':'unclosed except separately recorded source/error support'})
  elif op==0x18:
   value=struct.unpack_from('<I',O.at(pc,16),4)[0]|struct.unpack_from('<I',O.at(pc,16),12)[0]<<32
   data.append({'pc':pc,'value':value,'bounded_prefix_hex':O.at(value, min(32,len(O.b)-value)).hex() if 0<value<len(O.b) else None,'extent':'unknown'})
  elif op&7 in [5,6] and op!=0x95:branches.append({'pc':pc,'target':pc+8+off*8,'feasibility':'conditional'})
  pc+=16 if op==0x18 else 8
 windows.append({'label':label,'start':lo,'end':hi,'raw_sha256':H(O.at(lo,hi-lo)),'prior_classification':'opaque; ambiguous/unattributed; next-entry boundary','new_classification':'post-trade signed-i128 accounting with quote-family selection; buy additionally checks risk limits','calls':calls,'data':data,'branches':branches})
r={'original_sha256':H(O.b),'caller_edges':[call(124896,181656),call(156240,181656),call(137992,184200),call(174352,184200)],'windows':windows,'source_patch':None,'reason':'Current source already expresses the attributed ordered accounting/risk operations; these are not sizing helpers and do not justify changing Option unwrap at sizing sites.','limits':['No original initializer or other opaque windows decoded.','Only these two newly authorized full windows and previously admitted callers analyzed.','Error allocator/formatter/compared-values callees remain transitive obligations.','No current binary whole-function identity or runtime equivalence claim.']}
(P/'attribution.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'windows':2,'caller_edges':4,'patch':None}))
