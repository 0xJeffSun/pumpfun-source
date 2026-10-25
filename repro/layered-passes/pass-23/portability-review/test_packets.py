from pathlib import Path
import json,hashlib,shutil,subprocess,sys,gzip,tempfile
R=Path.cwd();W=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
paths={'main':R/'repro/pump_fees/sharing-authorize-main-v144','scratch':R/'repro/pump_fees/sharing-authorize-v144','evidence':R/'repro/layered-passes/pass-23/fees-current-evidence'}
def inventory(p):return{str(f.relative_to(p)):H(f)for f in sorted(p.rglob('*'))if f.is_file()}
before={k:inventory(p)for k,p in paths.items()};(W/'original-before.json').write_text(json.dumps(before,indent=2)+'\n');rows=[]
def reseal(p):
 m={str(f.relative_to(p)):H(f)for f in sorted(p.rglob('*'))if f.is_file()and f not in[p/'manifest.json',p/'manifest.sha256']};(p/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(p/'manifest.sha256').write_text(H(p/'manifest.json')+'  manifest.json\n')
def mutate_json(p,fn):j=json.loads(p.read_text());fn(j);p.write_text(json.dumps(j,indent=2)+'\n')
def test(name,kind,mutation=None,flags=None,expected=True):
 with tempfile.TemporaryDirectory(prefix='p23-portability-')as d:
  q=Path(d)/'packet';shutil.copytree(paths[kind],q);elfbefore={str(f.relative_to(q)):H(f)for f in q.rglob('*.so')}
  if mutation:mutation(q);reseal(q)
  assert elfbefore=={str(f.relative_to(q)):H(f)for f in q.rglob('*.so')},'ELF mutated'
  cmd=[sys.executable,'-B',str(q/'verify.py'),*(flags or [])];p=subprocess.run(cmd,cwd='/tmp',capture_output=True,text=True)
  (W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr);ok=p.returncode==0;row={'name':name,'packet':kind,'expected_pass':expected,'actual_pass':ok,'returncode':p.returncode,'resealed':bool(mutation),'ELFs_unchanged':True,'target_executions':0};rows.append(row);assert ok==expected,row
  (W/'progress.json').write_text(json.dumps(rows,indent=2)+'\n')
# Positive checks in independent /tmp copies, no dependency on original packet location.
test('main-portable','main');test('main-current-root','main',flags=['--current-root',str(R)])
test('scratch-portable-saved-signatures','scratch',flags=['--runtime-signatures'])
test('evidence-portable','evidence');test('evidence-member-and-current-root','evidence',flags=['--scratch',str(paths['scratch']),'--repo',str(R)])
# Metadata/source changes only; outer manifest resealed so semantic bindings must reject.
for name,relative in [('main-source','source/programs/pump-fees/src/sharing.rs'),('main-README','source/programs/pump-fees/README.md'),('main-helper','helpers/scripts/build_partial_candidate.py'),('main-log','main/build.log'),('main-dependency','dependency-expected.json')]:
 test(name,'main',lambda q,n=relative:(q/n).write_bytes((q/n).read_bytes()+b'\n'),expected=False)
test('main-control-flag','main',lambda q:mutate_json(q/'controls/identity.json',lambda j:j.update(source_tool_dependency_gates_passed=False)),expected=False)
def badplan(q):
 p=q/'reviewed-plan/promote.py';p.write_bytes(p.read_bytes()+b'\n# resealed plan mutation\n');reseal(q/'reviewed-plan')
test('main-resealed-plan','main',badplan,expected=False)
test('scratch-wrong-candidate-binding','scratch',lambda q:mutate_json(q/'acceptance.json',lambda j:j.update(candidate_sha256='0'*64)),expected=False)
def exportwrong(q):
 p=q/'validation/focused20.json.gz';j=json.loads(gzip.decompress(p.read_bytes()));j['candidate_sha256']='0'*64;p.write_bytes(gzip.compress((json.dumps(j)+'\n').encode(),mtime=0));raw=gzip.decompress(p.read_bytes());b=json.loads((q/'bindings.json').read_text());key='validation/focused20.json.gz';b[key]['raw_sha256']=hashlib.sha256(raw).hexdigest();b[key]['export_sha256']=H(p);(q/'bindings.json').write_text(json.dumps(b,indent=2)+'\n')
test('evidence-wrong-candidate-resealed','evidence',exportwrong,expected=False)
def memberwrong(q):
 b=json.loads((q/'bindings.json').read_text());keys=list(b);b[keys[0]]['member']=b[keys[1]]['member'];(q/'bindings.json').write_text(json.dumps(b,indent=2)+'\n')
test('evidence-wrong-archive-member','evidence',memberwrong,flags=['--scratch',str(paths['scratch'])],expected=False)
after={k:inventory(p)for k,p in paths.items()};assert before==after;(W/'original-after.json').write_text(json.dumps(after,indent=2)+'\n');(W/'results.json').write_text(json.dumps({'status':'PASS','cases':rows,'original_packets_byte_unchanged':True,'ELFs_never_modified':True,'new_builds':0,'new_target_executions':0,'network':0},indent=2)+'\n');print('PASS',len(rows))
