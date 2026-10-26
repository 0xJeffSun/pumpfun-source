"""Pure AST controller tests: subprocess.run is a local mock; no VM/library import."""
import ast,argparse,contextlib,copy,hashlib,io,json,os,sys,tempfile,types
from pathlib import Path
P=Path(__file__).resolve().parent
PLAN=P.parent/'pumpfun-source/work/cto-wallet-preservation-plan'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run():
 src=(PLAN/'controller.py').read_text();t=ast.parse(src);fn=next(x for x in t.body if isinstance(x,ast.FunctionDef)and x.name=='main');code=compile(ast.Module(body=[fn],type_ignores=[]),'saved-controller-main','exec')
 good={'candidate_sha256':'candidate','case_count':1,'cases':[{'match':True,'original':{'signatures_verified':True,'pool_authority_top_level_signer':False},'candidate':{'signatures_verified':True,'pool_authority_top_level_signer':False}}],'mismatches':[]}
 kinds=['pass','missing','malformed','wrong-candidate','child-nonzero','launch-failure','wrong-count','mismatch','row-false','bad-signature','pool-signer','after-input-failure'];results=[]
 for kind in kinds:
  with tempfile.TemporaryDirectory()as d:
   p=Path(d);(p/'manifest.json').write_text('{}');out=p/'out';calls=[]
   def check():
    calls.append('check')
    if kind=='after-input-failure'and len(calls)>1:raise AssertionError('changed')
   def child(*a,**k):
    if kind=='launch-failure':raise OSError('mock launch failure')
    data=copy.deepcopy(good)
    if kind=='wrong-candidate':data['candidate_sha256']='wrong'
    if kind=='wrong-count':data['case_count']=2
    if kind=='mismatch':data['mismatches']=['oldcase']
    if kind=='row-false':data['cases'][0]['match']=False
    if kind=='bad-signature':data['cases'][0]['candidate']['signatures_verified']=False
    if kind=='pool-signer':data['cases'][0]['original']['pool_authority_top_level_signer']=True
    if kind!='missing':(out/'receipt.json').write_text('{'if kind=='malformed'else json.dumps(data))
    return types.SimpleNamespace(returncode=1 if kind=='child-nonzero'else 0)
   ns=dict(Path=Path,argparse=argparse,hashlib=hashlib,json=json,os=os,sys=sys,P=p,R=p/'repo',OUT=out,CAND=p/'candidate',EXPECTED='candidate',PYTHON='MOCK-NOT-A-PYTHON',H=H,J=lambda p:json.loads(p.read_text()),check=check,subprocess=types.SimpleNamespace(run=child))
   exec(code,ns);argv=sys.argv;sys.argv=['test','--execute','--expected-seal',H(p/'manifest.json')]
   try:
    with contextlib.redirect_stdout(io.StringIO()):rc=ns['main']()
   finally:sys.argv=argv
   receipt=json.loads((out/'exit.json').read_text());assert rc==(0 if kind=='pass'else 2);assert receipt['passed']==(kind=='pass');assert len(calls)==2
   results.append(dict(case=kind,cli=rc,passed=receipt['passed'],exit_retained=True))
 return results
if __name__=='__main__':print(json.dumps(run(),indent=2))
