from pathlib import Path
import subprocess, tempfile, shutil, json,sys,hashlib
import argparse
a=argparse.ArgumentParser();a.add_argument('--alternate-python',type=Path);args=a.parse_args()
source=Path(__file__).resolve().parent;results=[]
def run(label,root,python,expected):
 p=subprocess.run([str(python),'-B',str(root/'verify.py')],cwd=root.parent,text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
 assert (p.returncode==0)==expected,(label,p.stdout,p.stderr)
 row={'name':label,'external_copy':True,'interpreter_version':subprocess.check_output([str(python),'--version'],text=True).strip(),'expected_accept':expected,'accepted':p.returncode==0,'returncode':p.returncode}
 if expected:
  output=json.loads(p.stdout);row['semantic_fields']={k:output[k] for k in ['status','retained_packages','selected_complete_windows','composition_contracts','next_reconstruction_units','source_built','target_executed','accepted_handler_delta','semantic_equivalence_proved']}
 else:row['rejection_last_line']=p.stderr.splitlines()[-1]
 results.append(row)
with tempfile.TemporaryDirectory(prefix='relay-composition-portability-') as td:
 p=Path(td)/'review';shutil.copytree(source,p)
 run('base Python external copied package',p,Path(sys.executable),True)
 if args.alternate_python:run('alternate Python external copied package',p,args.alternate_python.resolve(),True)
 target=p/'inputs/relay_donation_handlers.tar.gz';original=target.read_bytes();target.unlink();run('missing complete historical archive rejected',p,Path(sys.executable),False);target.write_bytes(original)
 target=p/'inputs/shared108-review/95704-95752.bin';original=target.read_bytes();target.write_bytes(bytes([original[0]^1])+original[1:]);run('altered original byte witness rejected',p,Path(sys.executable),False);target.write_bytes(original)
 target=p/'proposals/corrected-shared108-interface.json';old=target.read_bytes();data=json.loads(old);data['context'][2],data['context'][5]=data['context'][5],data['context'][2];target.write_text(json.dumps(data,indent=2)+'\n')
 seal=p/'manifest.json';oldseal=seal.read_bytes();m=json.loads(oldseal);m['files'][target.relative_to(p).as_posix()]=hashlib.sha256(target.read_bytes()).hexdigest();seal.write_text(json.dumps(m,indent=2)+'\n')
 run('self-consistent local reseal cannot hide wrong interface roles',p,Path(sys.executable),False)
 target.write_bytes(old);seal.write_bytes(oldseal)
 run('restored copied package accepted',p,Path(sys.executable),True)
result={'scope':'Only static evidence verifier copies; no program build or target execution','diagnostics':'Raw rejection lines retained; success comparison uses stable semantic fields, not interpreter-specific diagnostic equality.','tests':results}
print(json.dumps(result,indent=2))
