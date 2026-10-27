"""Replay the existing bounded instruction models against the shared-helper build."""
from pathlib import Path
import sys,json,hashlib,importlib.util,argparse
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from pump_quote_control_function_match import candidate_functions
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=Path,required=True);parser.add_argument('--output',type=Path,required=True);args=parser.parse_args();args.output.mkdir(exist_ok=False)
original=ROOT/'evidence/original/pump/deployed.so';ob,cb=original.read_bytes(),args.candidate.read_bytes()
functions=candidate_functions(args.candidate,str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'),'.');names={a:n for a,z,n in functions}
for a,n in list(names.items()):
 if 'volume_accumulator7end_day17h' in n:names[a]='end_day'
worker_path=ROOT/'work/pump-claim-byte-recovery/worker_microcheck.py';worker=module('shared_worker_model',worker_path)
base_path=ROOT/'work/pump-claim-byte-recovery/worker-microcheck.json';base=json.loads(base_path.read_text());orig_names={int(k):v for k,v in base['original_call_names'].items()};a,n,_=next(x for x in functions if 'volume_accumulator6update17h' in x[2]);rows=[]
for row in base['cases']:
 left=worker.run(ob,0x7bfd8,1864,orig_names,row['input']);right=worker.run(cb,a,n,names,row['input']);assert left==row['original']
 rows.append({'input':row['input'],'original':left,'candidate':right,'matches':left==right})
record={'scope':worker.__doc__,'original_sha256':sha(original),'candidate_sha256':sha(args.candidate),'model_sha256':sha(worker_path),'base_cases_sha256':sha(base_path),'candidate_start':a,'candidate_bytes':n,'original_call_names':orig_names,'candidate_call_names':names,'case_count':len(rows),'mismatches':[i for i,r in enumerate(rows) if not r['matches']],'cases':rows};(args.output/'worker.json').write_text(json.dumps(record,indent=2)+'\n');assert not record['mismatches']
day_path=ROOT/'work/pump-claim-byte-recovery/day_microcheck.py';day=module('shared_day_model',day_path);base_path=ROOT/'work/pump-claim-byte-recovery/day-microcheck-v2.json';base=json.loads(base_path.read_text());a,n,_=next(x for x in functions if 'volume_accumulator7end_day17h' in x[2]);panics={a:('conversion-panic' if 'unwrap_failed' in name else 'schedule-panic') for a,z,name in functions if 'core6result13unwrap_failed' in name or 'core6option13expect_failed' in name};rows=[]
for row in base['cases']:
 left,lp=day.run(ob,0x7dfc8,232,row['inputs'],{0x1ace18:'conversion-panic',0x1ac528:'schedule-panic'});right,rp=day.run(cb,a,n,row['inputs'],panics);assert left==row['original']
 rows.append({'inputs':row['inputs'],'original':left,'candidate':right,'original_path':lp,'candidate_path':rp,'matches':left==right})
record={'scope':day.__doc__,'original_sha256':sha(original),'candidate_sha256':sha(args.candidate),'model_sha256':sha(day_path),'base_cases_sha256':sha(base_path),'candidate_start':a,'candidate_bytes':n,'candidate_panic_targets':panics,'case_count':len(rows),'mismatches':[i for i,r in enumerate(rows) if not r['matches']],'cases':rows};(args.output/'day.json').write_text(json.dumps(record,indent=2)+'\n');assert not record['mismatches']
print('645 worker and 4515 day-index cases match')
