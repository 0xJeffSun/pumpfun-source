#!/usr/bin/env python3
"""Portable, read-only evidence verifier. No target/source execution or Rust tooling."""
import hashlib,json,re,struct,sys
from pathlib import Path
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent

def need(condition,message):
 if not condition: raise ValueError(message)
def read(name): return (P/name).read_bytes()
def digest(b): return {'size':len(b),'sha256':hashlib.sha256(b).hexdigest()}
def js(name): return json.loads(read(name))
def main():
 seal=read('manifest.sha256').decode().strip().split()
 need(seal==[hashlib.sha256(read('manifest.json')).hexdigest(),'manifest.json'],'manifest seal')
 m=js('manifest.json'); actual=set()
 for p in P.rglob('*'):
  need(not p.is_symlink(),'symlink: '+str(p))
  if p.is_file(): actual.add(p.relative_to(P).as_posix())
 need(actual==set(m['files'])|{'manifest.json','manifest.sha256'},'sealed file set differs')
 for name,expected in m['files'].items(): need(digest(read(name))==expected,'file digest: '+name)
 ranges=js('consumed-ranges.json'); B=read('inputs/deployed.so'); W=js('inputs/windows.json')
 for x in ranges['inputs']: need(digest(read(x['path']))=={k:x[k] for k in ('size','sha256')},'input '+x['path'])
 for x in ranges['binary_code']+ranges['binary_data']:
  need(digest(B[x['start']:x['end']])=={k:x[k] for k in ('size','sha256')},'byte range '+str(x['start']))
  if 'ordinal' in x:
   w=W[x['ordinal']];need((w['start'],w['end'],w['sha256'])==(x['start'],x['end'],x['sha256']),'inventory range')
  else: need(B[x['start']:x['end']].hex()==x['hex'],'literal')
 for x in ranges['source_ranges']:
  b=read(x['path']); ls=b.splitlines(keepends=True)
  need(sum(map(len,ls[:x['line_start']-1]))==x['start'] and sum(map(len,ls[:x['line_end']]))==x['end'],'source offsets')
  need(digest(b[x['start']:x['end']])=={k:x[k] for k in ('size','sha256')},'source range')
 for prior in ranges['predecessors']:
  prefix='inputs/predecessors/'+prior['name']+'/'
  pm=js(prefix+'manifest.json');need(digest(read(prefix+'manifest.json'))==prior['manifest'],'prior seal bytes')
  for name in prior['selected_files']:
   if name in pm['files']: need(digest(read(prefix+name))==pm['files'][name],'prior selected file '+name)
  if 'manifest.sha256' in prior['selected_files']:
   need(read(prefix+'manifest.sha256').decode().split()[0]==hashlib.sha256(read(prefix+'manifest.json')).hexdigest(),'prior manifest seal')
 import disasm
 A=js('anchors.json')
 for path,ordinals in A['listings'].items():
  need(read(path).decode()==''.join(disasm.render(o)+'\n' for o in ordinals),'listing '+path)
 def ins(pc):return struct.unpack_from('<BBhi',B,pc)
 flow=[]
 for w in ranges['binary_code']:
  for pc,raw,text in disasm.instructions(w['start'],w['end']):
   op,r,off,imm=ins(pc)
   if op==133 and r>>4==1:flow.append({'pc':pc,'kind':'relative_call','target':pc+8+imm*8})
   elif op&7 in (5,6) and op not in (133,141,149):flow.append({'pc':pc,'kind':'branch','target':pc+8+off*8})
 need(flow==A['control_flow'],'complete static control-flow ledger')
 # Independent hand-reviewed anchors, not inferred from names in inventory.
 for pc,target in {115560:28824,115696:652528,116056:629120,116160:630256,116776:643240,117584:643240,117704:643240,118368:27600,118520:643240,118600:26376,118712:25160,28912:641312,134336:115456}.items():
  op,r,off,imm=ins(pc);need((op,r>>4,pc+8+imm*8)==(133,1,target),'signed relative call '+str(pc))
 for pc,target in {115776:115792,115784:118776,115952:118752,116072:116872,116792:116840,116832:116872,117600:117728,117720:117736,117728:116840,118320:116840,118408:118560,118544:118776,118640:118680,118664:118680,118744:118776,132184:132416,132256:132416,132272:134304,132352:132416,134352:134520,134384:134536,134488:132560,134512:132560,134528:132416}.items():
  op,r,off,imm=ins(pc);need(op&7==5 and pc+8+off*8==target,'branch '+str(pc))
 # Exact widths/register operands for lengths, option tests and fee offsets.
 anchors={28832:(0x15,3,355),28840:(0x25,3,81),29608:(0xa5,1,85),29992:(0x71,0x11,0),30000:(0x55,1,1),116280:(0x15,1,1),116648:(0x15,2,108),117152:(0x15,1,14),117456:(0x15,2,64),118016:(0x15,1,12),118320:(0x15,2,32),27992:(0x15,2,3),26768:(0x15,2,6),25552:(0x15,2,9),27472:(0x55,2,1),28696:(0x55,2,32),118664:(0x15,1,1),134848:(0x62,0x0a,6031)}
 for pc,(op,r,imm) in anchors.items():
  got=ins(pc);need((got[0],got[1],got[3])==(op,r,imm),'policy operand '+str(pc))
 for pc,r,offset in [(116800,0x61,88),(116808,0x62,106)]:
  op,reg,off,imm=ins(pc);need((op,reg,off)==(0x69,r,offset),'fee field '+str(pc))
 need(ins(29992)[2]==165,'account type offset')
 mint_types={1,3,4,6,9,10,12,14,16,18,19,20,21,22,23,24,25,26}
 mask=sum(1<<i for i in mint_types)
 need(mask==0x07fd565a,'mint mask')
 expected=[(1,116232,108),(14,117104,64),(12,117968,32),(3,27912,32),(6,26688,1),(9,25472,0)]
 need([(x['tag'],x['mask_pc'],x['exact_size']) for x in A['scans']]==expected,'six scan order')
 for x in A['scans']:
  op,r,off,imm=ins(x['mask_pc']);need(op==0x57 and imm==x['skip_mask']==mask^(1<<x['tag']),'skip mask')
 for pc in [116264,117136,118000,27944,26720,25504]:need(ins(pc)[3]==134392228,'wrong-category mask')
 source=read('source/mint_policy.rs').decode()
 need('const MINT_TYPES: u32 = 0x07fd565a;' in source,'source mint mask binding')
 need([(int(a),int(b)) for a,b in re.findall(r'lookup\(tlv, (\d+), (\d+)\)',source)]==[(t,n) for t,p,n in expected],'source scan order and sizes')
 result=js('result.json');need(result['accepted_handler_delta']==result['whole_binary_match_delta']==0,'unchanged acceptance counts')
 print(json.dumps({'status':'pass','files':len(m['files']),'code_ranges':len(ranges['binary_code']),'control_flow_operands':len(flow),'policy_scans':6,'target_execution':False,'scope':'integrity and static evidence consistency, not semantic equivalence'},sort_keys=True))
if __name__=='__main__':
 try: main()
 except (ValueError,KeyError,OSError,struct.error) as e:
  print('FAIL: '+str(e),file=sys.stderr);sys.exit(1)
