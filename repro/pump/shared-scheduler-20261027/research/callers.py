from pathlib import Path
import csv,json,struct,sys,hashlib,argparse
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_quote_control_function_match import sections,candidate_functions
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,default=ROOT/'work/pump-shared-day-recovery/shared/unstripped.so');parser.add_argument('--output',type=Path,default=ROOT/'work/pump-shared-day-recovery/callers.json');args=parser.parse_args()
original=ROOT/'evidence/original/pump/deployed.so';candidate=args.candidate
obj=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
cf=candidate_functions(candidate,obj,'.');helpers=[x for x in cf if 'end_day17h' in x[2]]
assert len(helpers)==1,helpers
windows=[x for x in csv.DictReader((ROOT/'repro/reconstruction-status-2026-10-26/functions.tsv').open(),delimiter='\t') if x['program']=='pump' and x['variant']=='selected']
def callers(path,target,original=False):
 b=path.read_bytes();t=sections(b)['.text'];out=[]
 for p in range(t['offset'],t['offset']+t['size'],8):
  op,reg,off,imm=struct.unpack_from('<BBhi',b,p);a=p-t['offset']+t['addr']
  if op!=0x85 or reg>>4!=1 or a+8+imm*8!=target:continue
  if original:
   row=next(x for x in windows if int(x['original_start'])<=a<int(x['original_end']));name='captured-'+hex(int(row['original_start']));start=int(row['original_start']);end=int(row['original_end'])
  else:
   start,n,name=next(x for x in cf if x[0]<=a<x[0]+x[1]);end=start+n
  out.append({'call':a,'caller_start':start,'caller_end':end,'caller':name})
 return out
left=callers(original,0x7dfc8,True);right=callers(candidate,helpers[0][0])
out={'original_sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'original_target':0x7dfc8,'candidate_target':helpers[0][0],'candidate_target_bytes':helpers[0][1],'original_calls':left,'candidate_calls':right,'scope':'Static direct calls to the one day-index helper; no whole-program equivalence claim.'}
args.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
