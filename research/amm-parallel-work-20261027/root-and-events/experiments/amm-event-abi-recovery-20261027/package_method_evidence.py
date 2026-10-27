from pathlib import Path
import json,hashlib,shutil,struct,sys,collections
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();sys.path.insert(0,str(R/'repro/pump_amm/claim-self-transfer-v144/static-tool'));from elf_reader import Elf
D=W/'dependency-proof'
if not D.exists():shutil.copytree(R/'work/amm-post-publication-deposit-composite-20261027/dependency-proof',D)
P=W/'producers';P.mkdir(exist_ok=True)
for name,path in [('buy','work/amm-buy-event-recovery-20261027/probe.py'),('sell','work/amm-sell-event-recovery-20261027/probe.py'),('buy-order','repro/pump_amm/error-order-recovery-20261027/probe_buy_executors.py'),('sell-order','repro/pump_amm/error-order-recovery-20261027/probe_sell_transfers.py'),('observer','repro/pump_amm/diagnostic-parity-20261027/results/harness/observe_suite.py'),('comparator','repro/pump_amm/diagnostic-parity-20261027/compare_direct.py')]:shutil.copy2(R/path,P/(name+'.py'))
O=Elf(R/'evidence/original/pump_amm/deployed.so');C=Elf(W/'build-method/artifacts/unstripped.so')
def wide(e,p):return struct.unpack_from('<I',e.b,p+4)[0]|struct.unpack_from('<I',e.b,p+12)[0]<<32
out=[]
for name,a,n in [('create_sell_event',0x52c58,1784),('create_buy_event',0x52070,3048)]:
 f=next(f for f in C.funcs if name+'17'in f['name']);s=f['start'];stores=[]
 for e,at,size in [(O,a,n),(C,s,f['size'])]:
  seq=[]
  for p in range(at,at+size,8):
   op,regs,off,imm=struct.unpack_from('<BBhi',e.b,p)
   if op in [0x63,0x6b,0x73,0x7b,0x62,0x6a,0x72,0x7a]and regs&15==6:seq.append({'offset':p-at,'opcode':op,'destination_offset':off})
  stores.append(seq)
 entry={'name':name,'original':a,'original_size':n,'candidate':f,'output_stores':stores,'same_output_store_sequence':[(x['opcode'],x['destination_offset'])for x in stores[0]]==[(x['opcode'],x['destination_offset'])for x in stores[1]]}
 if name=='create_buy_event':
  desc=[]
  for e,p in [(O,a),(C,s)]:
   path=wide(e,p+118*8);length=struct.unpack_from('<i',e.b,p+124*8+4)[0];line=struct.unpack_from('<i',e.b,p+123*8+4)[0];desc.append({'filename':e.b[path:path+length].decode(),'filename_length':length,'line':line})
  entry['actual_error_source']=desc
 out.append(entry)
(W/'native-output-method-proof.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps([{'name':r['name'],'same_output_store_sequence':r['same_output_store_sequence'],'actual_error_source':r.get('actual_error_source')}for r in out],indent=2))
