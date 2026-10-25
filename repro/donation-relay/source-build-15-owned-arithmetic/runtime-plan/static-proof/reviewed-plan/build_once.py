"""UNEXECUTED one exact v1.44 compile/v1.52 strip; runtime absent."""
from pathlib import Path
import json,hashlib,importlib.util,argparse,sys,shutil,re,traceback,os,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def after(D,R,launcher,seal):
 out={};fail=[]
 def check(n,fn):
  try:out[n]={'passed':True,'observed':fn()}
  except BaseException:out[n]={'passed':False,'failure':traceback.format_exc()};fail.append(n)
 def source():
  actual=launcher.source_hashes(D/'attempt/source');assert actual==J(P/'freeze.json')['source'];return actual
 def sdk():
  actual=launcher.sdk_snapshot(D/'attempt/sdk');assert actual==J(P/'launcher/tool-witness/sdk-files.json');return actual
 def tools():
  actual={}
  for n,r in J(P/'launcher/tool-witness/tool-files.json').items():
   p=Path(r['path']);actual[n]={'sha256':H(p),'path':str(p),'resolved_path':str(p.resolve())};assert actual[n]['sha256']==r['sha256']
  return actual
 def deps():return launcher.inventory_extracted_sources(D/'attempt/cargo-home')
 def caches():
  expected={p.name:H(p) for p in(P/'launcher/registry/archives').glob('*.crate')};actual={}
  for ns in launcher.NAMESPACES:
   base=D/'attempt/cargo-home/registry/cache'/ns;actual[ns]={p.name:H(p) for p in base.iterdir()};assert actual[ns]==expected
  return actual
 def index():
  expected={}
  with tarfile.open(P/'launcher/registry/index.tar.gz') as t:
   for r in t:
    assert r.isfile();expected[r.name]=hashlib.sha256(t.extractfile(r).read()).hexdigest()
  base=D/'attempt/cargo-home/registry/index';actual={str(p.relative_to(base)):H(p) for p in base.rglob('*') if p.is_file()};assert actual==expected;return actual
 def full_tool_caches():
  observed=load(P/'verify_plan.py','full_cache_reader').cache_snapshots();assert observed==J(P/'complete-existing-cache-snapshots.json');return observed
 check('full_existing_tool_cache_bytes',full_tool_caches);check('registry_index',index);check('source23',source);check('SDK53',sdk);check('tool_bytes',tools);check('extracted_dependencies',deps);check('private_cache_archives',caches);check('immutable_plan_and_selected_baseline',lambda:load(P/'verify_plan.py','after_plan_gate').verify(seal,R));save(D/'independent-after-gates.json',{'checks':out,'failed':fail,'compiler_runs_by_collector':0,'runtime_runs':0});return fail

def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');args=a.parse_args();R=args.repo.resolve();gate=load(P/'verify_plan.py','gate');pre=gate.verify(args.reviewed_plan_sha256,R)
 if not args.execute:print(json.dumps(pre));return
 assert args.output is not None;D=args.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D=D.resolve();D.relative_to(R/'work');assert not D.exists() and D!=P and P not in D.parents;D.mkdir();save(D/'controller-launch.json',{'reviewed_plan_sha256':args.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'attempt_limit':1,'runtime_authorized':False});save(D/'preflight.json',pre);launcher=load(P/'launcher/relay_build_once.py','exact_accepted_launcher');code=1
 try:
  launcher.execute(D/'attempt');actual=J(D/'attempt/build-result.json');assert actual['returncode']==0
  diagnostics=(D/'attempt/build.stdout').read_text(errors='replace')+'\n'+(D/'attempt/build.stderr').read_text(errors='replace');bad=[s for s in diagnostics.splitlines() if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',s,re.I)];save(D/'backend-diagnostics.json',{'failures':bad});assert not bad,'Backend rejection despite child exit; no runtime/static acceptance'
  Q=D/'static';Q.mkdir();shutil.copytree(P/'baseline-static',D/'baseline-static')
  for n in['original.so','original-windows.json']:shutil.copyfile(P/'method'/n,Q/n)
  for n in['candidate.so','unstripped.so']:shutil.copyfile(D/'attempt/retained'/n,Q/n)
  method=load(P/'method/analyze.py','same_complete_inventory');method.write(Q);rows=J(Q/'candidate-function-ledger.json');selected=[f for f in rows if any(token in n for n in f['names'] for token in['arithmetic12fair_amounts','handlers15distribution108','core5slice4sort','exit_error','error_report'])];names=[n for f in selected for n in f['names']]
  elf=method.Elf((Q/'unstripped.so').read_bytes());dis=load(P/'method/disasm.py','bounded_candidate_disasm');(Q/'bounded').mkdir()
  for f in selected:(Q/'bounded'/f"{f['start']}.asm").write_text(dis.render(elf,f['start'],f['end']))
  save(Q/'bounded-review-pending.json',{'full_candidate_rows':selected,'role_presence':{token:any(token in n for n in names) for token in ['arithmetic12fair_amounts','handlers15distribution108']},'required_emitted_review':['all three arithmetic errors use owned6008 name/message/None metadata','quotient low64 truncation and stores before allocated overflow preserved','underflow before no-leftover sort guard and increment before store','caller propagates owned error before recipient CPI; temporary weights release and retained buffers','borrow log before consuming lower, constructor/name/message/drop ordering','unchanged numeric global overflow and untouched sort58/59 original boundaries'],'original58_59_newly_decoded':False,'emitted_acceptance_pending':True,'runtime_authorized':False});code=0
 except BaseException as e:
  code=e.code if isinstance(e,SystemExit) and isinstance(e.code,int) and e.code!=0 else 1;(D/'failure.txt').write_text(traceback.format_exc())
 finally:
  failures=after(D,R,launcher,args.reviewed_plan_sha256)
  if failures:code=1
  if code==0:
   try:save(D/'build-only-result.json',{'candidate_sha256':H(D/'static/candidate.so'),'symbols_sha256':H(D/'static/unstripped.so'),'source_inputs':23,'compile':'v1.44','strip':'v1.52','emitted_acceptance_pending':True,'runtime_executions':0})
   except BaseException:code=1;(D/'failure.txt').write_text(traceback.format_exc())
  save(D/'controller-exit.json',{'returncode':code,'one_compile_attempt_limit':True,'runtime_executions':0})
 if code:raise SystemExit(code)
if __name__=='__main__':main()
