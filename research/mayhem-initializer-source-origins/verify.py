"""Portable verification of a data-only initializer Source correction."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,importlib.util,io,json,re,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))
EXPECTED=('03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175','80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408')
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def files(archive):
 with tarfile.open(fileobj=io.BytesIO(archive),mode='r:gz')as t:
  out={}
  for m in t:
   assert m.isfile()and not m.name.startswith('/')and'..'not in Path(m.name).parts and m.name not in out
   out[m.name]=t.extractfile(m).read()
 return out
def manifest(p=P):
 assert not any(x.is_symlink()for x in p.rglob('*'))
 assert load(p/'manifest.json')=={str(x.relative_to(p)):sha(x.read_bytes())for x in p.rglob('*')if x.is_file()and x!=p/'manifest.json'and'__pycache__'not in x.parts}
def verify(root=ROOT,runtime=True):
 root=Path(root).resolve();parent=root/'research/mayhem-qualified-linker-layout';manifest()
 for name,digest in load(P/'external-inputs.json').items():assert sha((root/name).read_bytes())==digest,name
 module('parent_qualified_verify',parent/'verify.py').verify(root,runtime=False)
 for name in ['reader.py','analysis.py','progress.py','build.py']:assert(P/name).read_bytes()==(parent/name).read_bytes(),name
 for kind in ['candidate','symbols']:
  assert raw(P/f'artifacts/baseline/{kind}.so.gz')==raw(parent/f'artifacts/recovered/{kind}.so.gz')
  assert raw(P/f'artifacts/unqualified-baseline/{kind}.so.gz')==raw(parent/f'artifacts/baseline/{kind}.so.gz')
 before=files((parent/'source.tar.gz').read_bytes());after=files((P/'source.tar.gz').read_bytes());assert set(before)==set(after)
 changed=[n for n in before if before[n]!=after[n]];assert changed==['src/state.rs']
 assert re.sub(rb'\s+',b'',before[changed[0]])==re.sub(rb'\s+',b'',after[changed[0]])
 assert sha(after['src/state.rs'])=='6748aacb8451199cf8089f2f734c1373e12e9203a16f56e3be6acd16502a7d0a'
 assert len(after)==66 and {n:sha(b)for n,b in after.items()}==load(P/'source-inputs.json')
 patch=''.join(difflib.unified_diff(before['src/state.rs'].decode().splitlines(True),after['src/state.rs'].decode().splitlines(True),fromfile='baseline/src/state.rs',tofile='candidate/src/state.rs'));assert patch==(P/'source.patch').read_text()
 parent_launch=load(parent/'builds/recovered/launch.json');outputs=[];commands=[]
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');inv=load(P/f'config/{label}/invocation.json');commands.append(launch['command'])
  assert launch['source_inputs']==load(P/'source-inputs.json')
  assert launch['checked_tools']==parent_launch['checked_tools']and launch['target_inputs']==parent_launch['target_inputs']
  assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
  args=launch['command'][launch['command'].index('--')+1:];assert len(args)==4 and args[:2]==['--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
  assert args[2].startswith('-Clinker=')and args[2].endswith('/linker.py')and args[3].startswith('-Clink-arg=-Map=')
  assert result['returncode']==0 and all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
  for name in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{name}.gz'))==result[name+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz')
  for name in ['mayhem_recovered','anchor_lang','curve_accounts']:assert log.count(('--crate-name '+name+' ').encode())==1
  for name in ['default.ld','ordered.ld','linker.py']:assert(P/f'config/{label}/{name}').read_bytes()==(parent/f'config/{name}').read_bytes()
  old,new=inv['incoming'],inv['forwarded'];assert len(old)==len(new);diff=[i for i,(a,b)in enumerate(zip(old,new))if a!=b];assert len(diff)==1;i=diff[0]
  assert(i>0 and old[i-1]in ['--script','-T'])or old[i].startswith('--script=')
  assert new[i].endswith('/ordered.ld')and inv['script_sha256']==sha((P/f'config/{label}/ordered.ld').read_bytes())
  assert inv['real_sha256']=='79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af'
  output=tuple(raw(P/f'artifacts/{label}/{kind}.so.gz')for kind in ['candidate','symbols']);outputs.append(output)
  for kind,data in zip(['candidate','symbols'],output):assert sha(data)==result[kind+'_sha256']
 assert outputs[0]==outputs[1]and tuple(map(sha,outputs[0]))==EXPECTED
 for prefix in ['-Clinker=','-Clink-arg=-Map=']:
  assert next(a for a in commands[0]if a.startswith(prefix))!=next(a for a in commands[1]if a.startswith(prefix))
 unqualified_launch=load(P/'builds/unqualified/launch.json');unqualified_result=load(P/'builds/unqualified/result.json')
 assert unqualified_launch['source_inputs']==load(P/'source-inputs.json')
 assert unqualified_launch['controller_sha256']==sha((P/'build.py').read_bytes())
 assert unqualified_launch['command'][unqualified_launch['command'].index('--')+1:]==['--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
 assert unqualified_launch['checked_tools']==parent_launch['checked_tools']and unqualified_launch['target_inputs']==parent_launch['target_inputs']
 assert unqualified_result['returncode']==0 and all(unqualified_result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
 for kind in ['candidate','symbols']:assert sha(raw(P/f'artifacts/unqualified/{kind}.so.gz'))==unqualified_result[kind+'_sha256']
 for name in ['stdout','stderr']:assert sha(raw(P/f'builds/unqualified/{name}.gz'))==unqualified_result[name+'_sha256']
 mapping=module('init_source_map',parent/'translation.py');sections=lambda path:[(s['owner'],s['section'],s['address'],s['size'])for s in mapping.sections(path)]
 maps=[sections(parent/'maps/recovered.map'),sections(P/'config/recovered/clean.map'),sections(P/'config/repeat/repeat.map')]
 assert len(maps[0])==456 and maps[0]==maps[1]==maps[2]
 proof=module('init_source_proof',P/'proof.py').generate(root);assert proof==load(P/'proof.json')
 preserved=proof['preservation'];assert(preserved['matches'],preserved['raw_matches'],preserved['positive_direct_edges_after'],preserved['positive_Source_records_after'])==(428,100,4280,444)
 assert all(x['text_unchanged']and len(x['changes'])==3 for x in proof['elf_deltas'])and len(proof['elf_deltas'])==4
 for name,data in module('init_source_analysis',P/'analysis.py').generate(root).items():assert(P/name).read_bytes()==data,name
 audit=load(P/'audit.json');assert audit['summary']['statuses']==dict(normalized_only=328,raw_local_match=100,unmatched=13)and not audit['summary']['whole_file_equal']
 result=dict(source_inputs=66,changed_source_files=changed,source_change='whitespace only',normalized_matches=428,raw_matches=100,prior_positive_calls=4280,prior_positive_Source_records=444,newly_corrected_initializer_Source_records=2,initializer_bytes=920,original_initializer_bytes=960,text_bytes_changed=0,complete_ELF_changed_bytes=3,qualified_function_sections=456,compiler_executed=False,target_executed=False)
 if runtime:
  rv=module('init_source_runtime',P/'runtime_check.py').verify(root,outputs[0][0],raw(P/'artifacts/unqualified/candidate.so.gz'));assert rv==load(P/'runtime-summary.json');result.update(rv)
 return result
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,default=ROOT);p.add_argument('--skip-runtime',action='store_true');a=p.parse_args();print(json.dumps(verify(a.repository_root,not a.skip_runtime),indent=2))
