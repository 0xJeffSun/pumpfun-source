from pathlib import Path
import struct,json,sys,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
C=Elf(P/'candidate.so');S=Elf(P/'symbols.so');O=Elf(P/'analysis/method/inputs/original.so')
f=next(x for x in S.funcs if '19pump_fees_candidate25create_fee_sharing_config'in x['name']);start=f['start'];end=start+f['size']
def ins(pc):return struct.unpack('<BBhi',C.b[pc:pc+8])
def eq(pc,x):assert ins(pc)==x,(pc,ins(pc),x)
for pc,t in [(510760,24920),(513216,88296),(518120,88296),(518648,24920),(521344,88296),(521904,88296),(518360,632056),(518720,632056),(520680,632056)]:assert C.calls[pc]==t
for pc,x in [(518144,(0x55,4,-30,2)),(518160,(0x55,1,19,0)),(518320,(0x71,0x71,580,0)),(518328,(0x55,1,7,2)),(518352,(0xb7,2,0,19)),(518672,(0x55,4,-96,2)),(518680,(0x79,0x71,640,0)),(518688,(0x55,1,243,0)),(518712,(0xb7,2,0,19)),(520640,(0x79,0x71,648,0)),(520648,(0x55,1,7,0)),(520672,(0xb7,2,0,19))]:eq(pc,x)
assert C.normalized[632056:632560]==O.normalized[289880:290384] and C.pattern(632056,504)==O.pattern(289880,504)
assert ins(632464)==(0x72,0x0a,-192,2)
# Conservative intraprocedural CFG; calls fall through, all conditional arms retained.
def reachable(root):
 seen=set();todo=[root]
 while todo:
  pc=todo.pop()
  if pc in seen or not start<=pc<end:continue
  seen.add(pc);op,r,off,imm=ins(pc)
  if op==0x95:continue
  step=16 if op==0x18 else 8
  if op&7 in (5,6) and op not in (0x85,0x8d):
   todo.append(pc+8+off*8)
   if op&0xf0:todo.append(pc+step)
  else:todo.append(pc+step)
 return seen
non=reachable(518168);assert 518648 not in non and 518320 not in non and 521344 not in non and 521904 not in non
assert 518648 in reachable(518392) and 518680 in reachable(518392)
assert not any(ins(pc)==(0x79,0x71,640,0)or ins(pc)==(0x79,0x71,648,0) for pc in range(start,518680,8))
r={'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'application':[start,end],'CPI_calls':[513216,518120,521344,521904],'state_exit_calls':[510760,518648],'graduated_late_pool_check':518320,'program_check':518680,'event_check':520640,'no_nongraduated_second_exit':True,'nongraduated_cfg_reachable_instruction_count':len(non),'enum19_origin_none':True,'whole_cpi_equivalence':False}
(P/'static-gate.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
