from build_composition import *
import re
P=R/'research/mayhem-allocator-call-closure';records={}
for label in ['curve-baseline','curve-composed']:
 baseline=label=='curve-baseline';source=W/('source'if baseline else'historical-source')
 if baseline:
  record=json.loads((W/'baseline/launch.json').read_bytes());env=record['environment'];env=dict(env,CARGO_MANIFEST_DIR=str(source/'curve-accounts'),CARGO_MANIFEST_PATH=str(source/'curve-accounts/Cargo.toml'),CARGO_PKG_NAME='curve-accounts',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='')
  lines=(W/'baseline/stderr').read_text().splitlines();cmd=next(shlex.split(l.split('Running `',1)[1].rsplit('`',1)[0])for l in lines if 'Running `'in l and '--crate-name curve_accounts 'in l)
 else:record=json.loads((W/'curve-named/launch.json').read_bytes());env=record['environment'];cmd=record['command']
 out=W/(label+'-ir');cmd=list(cmd);cmd[cmd.index('--out-dir')+1]=str(out);cmd=['--emit=llvm-ir'if a.startswith('--emit=')else a for a in cmd]
 d=run(label+'-ir',cmd,source,env,dict(source_inputs=inv(source),scope='Additional optimized curve crate LLVM IR emission only; no linked artifact or runtime.'))
 ll=list(d.glob('*.ll'));assert len(ll)==1;text=ll[0].read_text();functions={}
 for match in re.finditer(r'^define [^\n]*@([^ (]+)[^\n]*\{\n.*?^\}',text,re.M|re.S):
  name=match[1]
  if 'finish_grow'in name:functions[name]=match[0]
 q=P/'ir'/label;q.mkdir(parents=True)
 for f in ['launch.json','result.json','stdout','stderr']:shutil.copyfile(d/f,q/f)
 (q/'optimized.ll.gz').write_bytes(gzip.compress(ll[0].read_bytes(),mtime=0));write(q/'finish-grow.json',functions)
 records[label]=dict(ir_sha256=sha(ll[0]),finish_grow_functions=len(functions),source_unchanged=inv(source)==record['source_inputs'])
 print(label,[(n,len(b.splitlines()))for n,b in functions.items()],flush=True)
write(P/'ir/curve-summary.json',records)
