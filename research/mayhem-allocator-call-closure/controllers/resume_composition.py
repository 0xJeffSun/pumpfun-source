from build_composition import *
macro=W/'libanchor_attribute_program.so';shutil.copyfile(W/'historical-macro.so',macro)
H=W/'historical-source';historical=inv(H);tools=json.loads((W/'tools.json').read_bytes());base=json.loads((W/'baseline/launch.json').read_bytes());env=base['environment']
cmds={}
for line in (W/'baseline/stderr').read_text().splitlines():
 if 'Running `' not in line:continue
 q=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
 if '--crate-name'in q:
  name=q[q.index('--crate-name')+1]
  if name in ['curve_accounts','mayhem_recovered']:cmds[name]=q
for label,name in [('curve-named','curve_accounts'),('composed','mayhem_recovered'),('repeat','mayhem_recovered')]:
 out=W/label;cmd=list(cmds[name]);cmd[cmd.index('--out-dir')+1]=str(out);cmd=[a.replace(str(W/'source'),str(H))for a in cmd]
 if name=='curve_accounts':cmd+=['--extern','historical_anchor_program='+str(macro)]
 else:
  lib=next((W/'curve-named').glob('libcurve_accounts-*.rlib'));cmd=[('curve_accounts='+str(lib))if a.startswith('curve_accounts=')else a for a in cmd];cmd+=['-L','dependency='+str(W/'curve-named')]
 deps={a.split('=',1)[1]:sha(Path(a.split('=',1)[1]))for a in cmd if '='in a and Path(a.split('=',1)[1]).is_file()}
 extraenv=dict(env,CARGO_MANIFEST_DIR=str(H/'curve-accounts'if name=='curve_accounts'else H),CARGO_MANIFEST_PATH=str((H/'curve-accounts'if name=='curve_accounts'else H)/'Cargo.toml'),CARGO_PKG_NAME='curve-accounts'if name=='curve_accounts'else'mayhem-recovered',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='',CARGO_FEATURE_DEFAULT='1')
 d=run(label,cmd,H,extraenv,dict(source_inputs=historical,dependency_inputs=deps,macro_sha256=sha(macro),tools=tools,fresh_dependencies=False))
 assert inv(H)==historical and all(sha(Path(p))==v for p,v in deps.items())
 if name=='mayhem_recovered':
  shutil.copyfile(d/'mayhem_recovered.so',d/'symbols.so');subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'),'--strip-all',str(d/'symbols.so'),str(d/'candidate.so')],check=True)
for label in ['baseline','composed','repeat']:
 d=W/label;write(d/'artifacts.json',dict(source_unchanged=True,checked_tools_unchanged=all(sha(SDK/n)==v for n,v in tools.items()),**{n+'_sha256':sha(d/(n+'.so'))for n in ['candidate','symbols']}))
assert (W/'composed/symbols.so').read_bytes()==(W/'repeat/symbols.so').read_bytes()
assert (W/'composed/candidate.so').read_bytes()==(W/'repeat/candidate.so').read_bytes()
print('complete: baseline, composed and repeat',flush=True)
