"""Read-only raw operand ledger. Never executes SBF or hypothesis source."""
from pathlib import Path
import hashlib,json,struct
P=Path(__file__).resolve().parent
ORIGINAL='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
ORDINALS=[17,18,20,21,30,31,32,33,40,77,78,79,81,90,91,92,93,94,95,96,97,98,99,100,101,103,105,106,108,109,110,111,112,113,117,118,119,120,125,130,141,145,147,149,153,155,158,169,178,179,180,181,182,183,184,185,186,187,188,190,191,192,193,200,201,202,203,204,226,227,229,244,246,247,248,282,300,302]
CALLS={95744:31368,95864:31368,96112:119440,101424:31368,101544:31368,101792:119440,111288:119440,
119528:743376,119672:743376,119936:743448,121640:141384,123192:614432,
548744:669720,548792:417496,550712:669720,550760:434280,418112:651352,418960:651352,434880:651352,
531624:669720,531672:201768,534152:669720,534200:201768,536656:669720,536704:252064,
539160:669720,539208:252064,541688:669720,541736:369736,543784:669720,543832:398696,
545600:669720,545656:486200,547096:669720,547152:465512,552016:503808,
71648:661000,72432:623160,74336:131136,75976:621096,131256:114032,131320:118896,134336:115456,
140704:614432,140752:130560,91312:614432,109432:67320,67568:64824,67632:17712,67696:17712,
96240:17712,96544:127704,101920:17712,102224:127704,105576:17712,105856:127704,111440:17712,111736:127704,112032:621096,
129680:616736,128272:621096,651384:689424,651408:689424,651664:690592,651704:690144}
OPERANDS={95704:(0x79,0x32,512,0),95720:(0x07,1,0,-224),95840:(0x79,0x92,376,0),95856:(0x07,1,0,-80),96088:(0x07,2,0,-240),
101376:(0x79,0x32,456,0),101392:(0x07,1,0,-224),101520:(0x79,0x92,320,0),101536:(0x07,1,0,-80),101768:(0x07,2,0,-240),
109464:(0x79,0x72,736,0),110304:(0x79,0x73,384,0),111032:(0x7b,0x1a,-368,0),110656:(0x7b,0x1a,-224,0),111264:(0x07,2,0,-384),
119496:(0x07,2,0,16),119512:(0x07,1,0,-1088),119632:(0x07,7,0,160),119648:(0x07,1,0,-944),119824:(0x79,0xa8,-992,0),
31416:(0x79,0x24,0,0),31616:(0x7b,0x41,0,0),
108856:(0x27,3,0,48),108880:(0x1f,0x45,0,0),94360:(0x79,0x37,232,0),100456:(0x79,0x30,408,0),
59528:(0xa5,8,25,3),58864:(0xb7,3,0,113),
633904:(0x72,0,0,8),634672:(0x72,0,0,9),632696:(0x72,0,0,12),
651528:(0x7b,0x02,0,0),651608:(0x7a,2,0,0)}
LITERALS={754884:b'distribution_v1',754776:b'debouncer_v1',756832:b'epoch_tracker_v1',757048:b'donate_native_wsol_tmp_v1',756941:b'mint_whitelist_v1',756958:b'__event_authority'}

def derive():
 b=(P/'inputs/original.so').read_bytes();assert len(b)==830448 and hashlib.sha256(b).hexdigest()==ORIGINAL
 inventory=json.loads((P/'inputs/windows.json').read_text());rows=[]
 for ordinal in ORDINALS:
  w=inventory[ordinal];start,end=w['start'],w['end'];assert hashlib.sha256(b[start:end]).hexdigest()==w['sha256']
  external={x['pc'] for x in w['external_calls']};instructions=[];pc=start
  while pc<end:
   op,r,offset,imm=struct.unpack_from('<BBhi',b,pc);size=16 if op==0x18 else 8
   row={'pc':pc,'raw':b[pc:pc+size].hex(),'opcode':op,'dst':r&15,'src':r>>4,'offset':offset,'immediate':imm}
   if op==0x85:row['target']=pc+8+8*imm if r>>4==1 and pc not in external else None;row['external_relocation']=pc in external
   if op&7 in [5,6] and op not in [0x85,0x8d,0x95]:row['branch_target']=pc+8+8*offset
   instructions.append(row);pc+=size
  assert pc==end
  rows.append({'ordinal':ordinal,'start':start,'end':end,'sha256':w['sha256'],'instructions':instructions})
 for pc,target in CALLS.items():
  op,r,off,imm=struct.unpack_from('<BBhi',b,pc);assert (op,r,off)==(0x85,0x10,0) and pc+8+8*imm==target,pc
 for pc,expected in OPERANDS.items():assert struct.unpack_from('<BBhi',b,pc)==expected,pc
 for pc,value in LITERALS.items():assert b[pc:pc+len(value)]==value
 return {'original_sha256':ORIGINAL,'scope':'Complete selected-window operands and bounded literal/call anchors; manual semantic contract review, not a theorem or execution','windows':rows,'call_anchors':[{'pc':pc,'target':target,'raw':b[pc:pc+8].hex()} for pc,target in CALLS.items()],'operand_anchors':[{'pc':pc,'expected':list(value),'raw':b[pc:pc+8].hex()} for pc,value in OPERANDS.items()],'literals':[{'start':pc,'end':pc+len(value),'bytes_hex':value.hex(),'sha256':hashlib.sha256(value).hexdigest()} for pc,value in LITERALS.items()]}
if __name__=='__main__':
 print(json.dumps(derive(),indent=2))
