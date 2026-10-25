#!/usr/bin/env python3
"""Static decoding only; never loads or executes the target program."""
import hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def derive():
 b=(P/'inputs/deployed.so').read_bytes(); w=json.loads((P/'inputs/windows.json').read_text())
 ordinals=sorted(int(p.stem.split('-')[1]) for p in P.glob('window-*.txt'))
 shoff=struct.unpack_from('<Q',b,40)[0];size,num,si=struct.unpack_from('<HHH',b,58)
 secs=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*size) for i in range(num)]
 st=secs[si];names=b[st[4]:st[4]+st[5]]
 byname={names[s[0]:].split(b'\0')[0].decode():s for s in secs}
 relsec=byname['.rel.dyn'];rels={}
 for p in range(relsec[4],relsec[4]+relsec[5],16):
  at,info=struct.unpack_from('<QQ',b,p);rels[at]=(info&0xffffffff,p)
 ranges=[];rows=[]
 for n in ordinals:
  r=w[n];lo,hi=r['start'],r['end'];ranges.append({'start':lo,'end':hi,'role':f'inferred window {n}','sha256':H(b[lo:hi])})
  assert H(b[lo:hi])==r['sha256']
  p=lo;instructions=[];calls=[];branches=[]
  while p<hi:
   op,reg,off,imm=struct.unpack_from('<BBhi',b,p);sz=16 if op==24 else 8
   inst={'pc':p,'raw':b[p:p+sz].hex(),'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm}
   if op==24:inst['u64']=struct.unpack_from('<I',b,p+4)[0]+(struct.unpack_from('<I',b,p+12)[0]<<32)
   if op==133:
    if rels.get(p,(None,))[0]==10:
     inst['external_relocation_record']=rels[p][1]
    elif reg>>4==1:
     inst['target']=p+8+8*imm;calls.append({'pc':p,'target':inst['target']})
   elif op in (5,21,29,37,45,53,61,69,77,85,93,101,109,117,125,165,173,181,189,197,205,213,221):
    inst['branch_target']=p+8+off*8;branches.append(inst['branch_target'])
   instructions.append(inst);p+=sz
  assert calls==[{'pc':x['pc'],'target':x['target']} for x in r['direct_calls']]
  rows.append({'ordinal':n,'start':lo,'end':hi,'instructions':instructions,'calls':calls,'branch_targets':branches})
 # Explicitly selected constants/seeds/names/descriptors, not a scan of other code.
 constants=[(754592,754596,'payer equality code'),(752896,752928,'relayer'),(752960,752992,'ATA program'),(753024,753056,'Token2022 program'),(753088,753120,'system owner'),(753152,753184,'Tokenkeg program'),(754776,754788,'debouncer seed'),(754884,754899,'distribution seed'),(756832,756848,'tracker seed'),(756941,756958,'whitelist seed'),(756958,756975,'event seed'),(757549,757581,'account discriminators'),(758342,758374,'relay program'),(773760,773776,'event seed descriptor')]
 for d in json.loads((P/'inputs/dispatch.json').read_text()):
  if d['name'] in ('close_donation_epoch_v1','upsert_mint_whitelist_v1'):
   for key,sz in [('constant_pc',16),('comparison_pc',8),('dispatch_call_pc',8)]:
    pc=d[key];constants.append((pc,pc+sz,d['name']+' '+key))
 constants += [(r[4],r[4]+r[5],f'ELF metadata {name}') for name,r in byname.items() if name in ('.rel.dyn','.dynsym','.dynstr')]
 constants += [(0,64,'ELF header'),(shoff,shoff+size*num,'section headers'),(st[4],st[4]+st[5],'section names')]
 for lo,hi,role in constants:ranges.append({'start':lo,'end':hi,'role':role,'sha256':H(b[lo:hi])})
 literal={role:b[lo:hi].hex() for lo,hi,role in constants if not role.startswith('ELF') and role not in ('section headers','section names')}
 # Instruction PCs with directly relevant operand facts (not semantic execution).
 checks={112584:(165,1,52,33),112904:(98,10,-128,6032),113056:(115,66,24,0),
  87896:(121,151,408,0),88224:(98,10,-224,6012),89288:(98,10,-224,6011),
  91352:(122,9,408,0),88688:(114,9,329,1),91752:(114,7,88,1),
  495104:(183,2,0,1037),495416:(21,0,1,1037),388360:(183,2,0,98),
  504184:(183,3,0,1),504312:(183,3,0,4),504392:(183,3,0,32),
  639416:(98,10,-80,12),632696:(114,0,0,12),632680:(115,32,9,0)}
 for pc,expected in checks.items():
  assert struct.unpack_from('<BBhi',b,pc)==expected,(pc,expected)
 # Store checked bytes alongside independently reviewable PC labels.
 evidence={str(pc):{'raw':b[pc:pc+8].hex(),'decoded':list(struct.unpack_from('<BBhi',b,pc))} for pc in checks}
 return {'schema':1,'checkpoint':'476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40','binary_sha256':H(b),'ranges':ranges,'windows':rows,'literals':literal,'key_operands':evidence}
if __name__=='__main__':
 (P/'static-evidence.json').write_text(json.dumps(derive(),indent=2)+'\n')
