"""Portable read-only verification of a qualified linker-order control."""
from pathlib import Path
from collections import Counter
import argparse,gzip,hashlib,importlib.util,json,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def manifest(packet=None):
 p=packet or P;assert not any(x.is_symlink()for x in p.rglob('*'))
 assert load(p/'manifest.json')=={str(x.relative_to(p)):sha(x.read_bytes())for x in p.rglob('*')if x.is_file()and x!=p/'manifest.json'and '__pycache__'not in x.parts}

def check_invocation(invocation):
 before=invocation['incoming'];after=invocation['forwarded'];assert len(before)==len(after)
 changed=[i for i,(a,b)in enumerate(zip(before,after))if a!=b];assert len(changed)==1;i=changed[0]
 assert (i>0 and before[i-1]in ['--script','-T'])or before[i].startswith('--script=')
 assert after[i].endswith('/qualified-layout-01/ordered.ld')
 assert invocation['script_sha256']==sha((P/'config/ordered.ld').read_bytes())
 assert invocation['real_sha256']=='79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af'
 return dict(only_script_argument_changed=True,real_linker_sha256=invocation['real_sha256'])

def verify(root=None,runtime=True):
 root=Path(root or ROOT).resolve();B=root/'research/mayhem-trade-source-origins';manifest()
 for n,h in load(P/'external-inputs.json').items():assert sha((root/n).read_bytes())==h,n
 parent=module('qualified_parent_verify',B/'verify.py');parent.verify(runtime=False)
 for n in ['source.tar.gz','source-inputs.json','reader.py','analysis.py','progress.py','build.py']:assert(P/n).read_bytes()==(B/n).read_bytes(),n
 for n in ['candidate','symbols']:assert raw(P/f'artifacts/baseline/{n}.so.gz')==raw(B/f'artifacts/recovered/{n}.so.gz')
 outputs=[];baseline_launch=load(B/'builds/recovered/launch.json');invocations=[]
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');inv=load(P/f'builds/{label}/linker-invocation.json');invocations.append(check_invocation(inv))
  assert launch['source_inputs']==load(P/'source-inputs.json')and len(launch['source_inputs'])==66
  assert launch['checked_tools']==baseline_launch['checked_tools']and launch['target_inputs']==baseline_launch['target_inputs']
  assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
  args=launch['command'][launch['command'].index('--')+1:];assert len(args)==4 and args[:2]==['--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
  assert args[2].endswith('/qualified-layout-01/linker.py')and args[2].startswith('-Clinker=')and args[3].startswith('-Clink-arg=-Map=')
  assert result['returncode']==0 and all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz')
  for n in ['anchor_lang','curve_accounts','mayhem_recovered']:assert log.count(('--crate-name '+n+' ').encode())==1
  output=tuple(raw(P/f'artifacts/{label}/{n}.so.gz')for n in ['candidate','symbols']);outputs.append(output)
  for n,data in zip(['candidate','symbols'],output):assert sha(data)==result[n+'_sha256']
 assert outputs[0]==outputs[1];candidate,symbols=outputs[0]
 assert sha(candidate)=='dffea119edb8ce5033dc9e41c167ec082a2488310db2283442a250b47a3e6c73'and sha(symbols)=='14325ed294f3c11cbe43795cd71f83ed1d55a65df32ed31e9b53d5acebc7017f'
 translate=module('qualified_translation',P/'translation.py');configuration=module('qualified_configuration',P/'config.py');proofs=[]
 with tempfile.TemporaryDirectory()as td:
  t=Path(td)
  for kind in ['candidate','symbols']:
   before=t/('before-'+kind);after=t/('after-'+kind);before.write_bytes(raw(P/f'artifacts/baseline/{kind}.so.gz'));after.write_bytes(raw(P/f'artifacts/recovered/{kind}.so.gz'));proofs.append(translate.compare(before,after,P/'maps/baseline.map',P/'maps/recovered.map',kind))
  before=t/'before-symbols';after=t/'after-symbols';before_sections=translate.sections(P/'maps/baseline.map');after_sections=translate.sections(P/'maps/recovered.map');repeat_sections=translate.sections(P/'maps/repeat.map')
  assert[(x['owner'],x['section'],x['address'],x['size'])for x in after_sections]==[(x['owner'],x['section'],x['address'],x['size'])for x in repeat_sections]
  config=configuration.check((P/'config/default.ld').read_text(),(P/'config/ordered.ld').read_text(),load(P/'config/plan.json'),before_sections,after_sections)
  original=(root/'evidence/original/mayhem/deployed.so').read_bytes();progress=module('qualified_progress',P/'progress.py').compare(original,before.read_bytes(),symbols);assert progress==load(P/'progress.json')
  mapping=module('qualified_mapping_review',P/'mapping_review.py').inspect(root/'evidence/original/mayhem/deployed.so',before)
  assert mapping==load(P/'mapping-review.json')
 assert proofs==load(P/'translation.json')and config==load(P/'configuration.json')
 assert(progress['baseline_matches'],progress['matches'],progress['baseline_raw_matches'],progress['raw_matches'])==(428,428,70,100)and not progress['gains']
 for n,data in module('qualified_analysis',P/'analysis.py').generate(root).items():assert(P/n).read_bytes()==data,n
 audit=load(P/'audit.json');assert audit['summary']['statuses']==dict(normalized_only=328,raw_local_match=100,unmatched=13)and not audit['summary']['whole_file_equal']
 old=load(P/'inputs/parent-audit.json.gz');oldraw={r['id']for r in old['rows']if r['status']=='raw_local_match'};newraw={r['id']for r in audit['rows']if r['status']=='raw_local_match'};assert not oldraw-newraw and len(newraw-oldraw)==30
 result=dict(source_inputs=66,source_changed=False,normalized_matches=428,raw_matches=100,new_raw_matches=30,function_sections=456,preserved_direct_calls=4929,preserved_relocations=2542,moved_data_pointers=74,entrypoint_before=436728,entrypoint_after=483016,compiler_executed=False,target_executed=False)
 if runtime:
  assert not(P/'PENDING-RUNTIME.txt').exists(),'Runtime seal pending.'
  rv=module('qualified_runtime',P/'runtime_check.py').verify(root,candidate);assert rv==load(P/'runtime-summary.json');result.update(rv)
 return result

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,default=ROOT);p.add_argument('--skip-runtime',action='store_true');a=p.parse_args();print(json.dumps(verify(a.repository_root,not a.skip_runtime),indent=2))
