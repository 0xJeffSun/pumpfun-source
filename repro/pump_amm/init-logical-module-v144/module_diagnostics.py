from pathlib import Path
import json,sys,struct,hashlib
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'unstripped.so');B=Elf(W/'baseline/unstripped.so');rows=json.loads((W/'context-static.json').read_text());r=rows['init_helper'];h=r['candidate'];old=r['baseline'];sources=[]
for label,e,f in [('original',O,{'start':0xd1290,'size':7824}),('baseline',B,old),('candidate',C,h)]:
 a=f['start'];n=f['size'];origins=[]
 for off in range(0,n-48,8):
  pc=a+off;op,regs,disp,imm=struct.unpack_from('<BBhi',e.b,pc)
  if op!=0x18:continue
  ptr=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
  # Actual source-origin encoding: pointer store, error4101, Source tag, line then length.
  if e.b[pc+24:pc+32]!=bytes.fromhex('620aa8fe05100000'):continue
  line=struct.unpack_from('<i',e.b,pc+44)[0];length=struct.unpack_from('<i',e.b,pc+52)[0]
  filename=e.b[ptr:ptr+length].decode();origins.append({'reference_pc':pc,'pointer':ptr,'line':line,'filename_length':length,'filename':filename})
 sources.append({'side':label,'helper_start':a,'helper_bytes':n,'origins':origins})
assert all(len(x['origins'])==1 for x in sources),sources
result={'source_origins':sources,'context_summary':{k:{'original_match':v['original_normalized_equal'],'baseline_match':v['baseline_normalized_equal'],'original_bytes':v['original_bytes'],'candidate_bytes':v['candidate']['size'],'baseline_shared_extent_differences':v['baseline_shared_extent_differences']}for k,v in rows.items()},'limits':['Authentic file hierarchy was restored without padding/remapping/workspace edits.','Source-origin differences are retained, never masked for acceptance.','Complete original ELF and recursive call/data identity remain unresolved.']}
(W/'module-diagnostics.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(sources,indent=2))
