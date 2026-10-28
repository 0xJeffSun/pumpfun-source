from build_composition import *
import concurrent.futures,sys,importlib.util
C=W/'composed-linked/candidate.so';O=W/'runtime';O.mkdir(exist_ok=False)
parent=json.loads((R/'research/mayhem-initializer-current-recovery-20261027/runtime/trades/commands.json').read_bytes())
env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1',PYTHONPYCACHEPREFIX=str(W/'never-created-pycache'))
assert not Path(env['PYTHONPYCACHEPREFIX']).exists()
def launch(row):
 name=row['family'];cmd=[str(sys.executable)]+[str(R/a.split('/pumpfun-source/',1)[1])if '/pumpfun-source/'in a else a for a in row['command'][1:]]
 cmd[cmd.index('--candidate')+1]=str(C);cmd[cmd.index('--output')+1]=str(O/(name+'.json'))
 inputs={a:sha(Path(a))for a in cmd if Path(a).is_file()};start=time.monotonic()
 with(O/(name+'.log')).open('wb')as f:p=subprocess.run(cmd,cwd=R,env=env,stdout=f,stderr=subprocess.STDOUT)
 data=dict(command=cmd,returncode=p.returncode,seconds=time.monotonic()-start,inputs=inputs)
 write(O/(name+'-command.json'),data);p.check_returncode()
 report=json.loads((O/(name+'.json')).read_bytes());assert report['case_count']==row['cases'] and not report['mismatches'] and report['candidate_sha256']==sha(C)
 assert all(sha(Path(a))==h for a,h in inputs.items());print(name,row['cases'],flush=True);return data
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as ex:results=list(ex.map(launch,parent['runs']))
write(O/'commands.json',results)
producer=R/'research/mayhem-historical-macro-linux/controllers/initializer_replay.py'
cmd=[sys.executable,'-B',str(producer),'--repository-root',str(R),'--candidate',str(C),'--output',str(O/'initializer')]
with(O/'initializer.log').open('wb')as f:p=subprocess.run(cmd,cwd=R,env=env,stdout=f,stderr=subprocess.STDOUT)
write(O/'initializer-command.json',dict(command=cmd,returncode=p.returncode,producer_sha256=sha(producer)));p.check_returncode();print('initializer 69 pairs',flush=True)
