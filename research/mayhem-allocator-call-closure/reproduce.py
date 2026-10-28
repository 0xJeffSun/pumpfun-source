"""Fresh local dependencies, then historical macro composition on qualified 67 inputs."""
from pathlib import Path
import gzip, hashlib, json, os, shlex, shutil, subprocess, tarfile, time

sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inv=lambda p:{f.relative_to(p).as_posix():sha(f) for f in sorted(p.rglob('*')) if f.is_file()}
def write(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
def run(label,cmd,cwd,env,extra):
 d=W/label;d.mkdir();write(d/'launch.json',dict(command=cmd,cwd=str(cwd),environment=env,**extra));t=time.monotonic()
 with (d/'stdout').open('wb')as o,(d/'stderr').open('wb')as e:p=subprocess.run(cmd,cwd=cwd,env=env,stdout=o,stderr=e)
 write(d/'result.json',dict(returncode=p.returncode,seconds=time.monotonic()-t));print(label,p.returncode,flush=True);p.check_returncode();return d

def main():
 W.mkdir(exist_ok=False);S=W/'source';S.mkdir()
 with tarfile.open(R/'research/mayhem-amm-handler-shape-controls-20261027/base-source.tar.gz')as t:t.extractall(S,filter='data')
 expected=json.loads((R/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json').read_bytes());assert inv(S)==expected and len(expected)==67
 tools={n:sha(SDK/n) for n in ['rust/bin/rustc','rust/bin/cargo','rust/bin/rustdoc','llvm/bin/clang','llvm/bin/llvm-ar','llvm/bin/llvm-objcopy','rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld']}
 write(W/'tools.json',tools)
 env={'PATH':str(SDK/'rust/bin')+':'+str(SDK/'llvm/bin')+':/usr/bin:/bin','HOME':str(W/'home'),'LANG':'C.UTF-8','LC_ALL':'C.UTF-8','RUSTC_BOOTSTRAP':'1','RUSTC':str(SDK/'rust/bin/rustc'),'RUSTDOC':str(SDK/'rust/bin/rustdoc'),'CARGO_HOME':str(CACHE),'CARGO_TARGET_DIR':str(W/'target'),'CC':str(SDK/'llvm/bin/clang'),'AR':str(SDK/'llvm/bin/llvm-ar'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CARGO_NET_OFFLINE':'true'}
 (W/'home').mkdir()
 cmd=[str(SDK/'rust/bin/cargo'),'rustc','--manifest-path',str(S/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--jobs','3','--','--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
 baseline=run('baseline',cmd,S,env,dict(source_inputs=expected,tools=tools,fresh_dependencies=True))
 shutil.copyfile(W/'target/sbpf-solana-solana/release/mayhem_recovered.so',baseline/'symbols.so')
 subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'),'--strip-all',str(baseline/'symbols.so'),str(baseline/'candidate.so')],check=True)
 assert inv(S)==expected
 cmds={}
 for line in (baseline/'stderr').read_text().splitlines():
  if 'Running `' not in line:continue
  q=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
  if '--crate-name' in q:
   name=q[q.index('--crate-name')+1]
   if name in ['curve_accounts','mayhem_recovered']:
    # Cargo prints environment assignments before the executable on some versions.
    while q and '=' in q[0] and not Path(q[0]).exists():q=q[1:]
    cmds[name]=q
 assert set(cmds)=={'curve_accounts','mayhem_recovered'}
 H=W/'historical-source';shutil.copytree(S,H)
 P=R/'research/mayhem-native-current432-composition'
 for n in ['curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json']:(H/n).write_bytes(gzip.decompress((P/'builds/composed/overrides'/(n+'.gz')).read_bytes()))
 historical=inv(H);assert [n for n in expected if expected[n]!=historical[n]]==[n for n in expected if n in ['curve-accounts/src/interface_definition.rs','curve-accounts/idls/pump.json']]
 macro=W/'libanchor_attribute_program.so';macro.write_bytes(gzip.decompress((P/'host-macro.so.gz').read_bytes()));assert sha(macro)=='3b0a5efc2cf5a15ac9b198ab2a6aa66650ababe46ee615a1bc45c796b1a7de31'
 write(W/'historical-source-inputs.json',historical)
 for label,name in [('curve','curve_accounts'),('composed','mayhem_recovered'),('repeat','mayhem_recovered')]:
  out=W/label;cmd=list(cmds[name]);cmd[cmd.index('--out-dir')+1]=str(out)
  # Cargo's curve source path may be absolute; use the corresponding composed input.
  cmd=[a.replace(str(S),str(H)) for a in cmd]
  if name=='curve_accounts':cmd+=['--extern','historical_anchor_program='+str(macro)]
  else:
   lib=next((W/'curve').glob('libcurve_accounts-*.rlib'));cmd=[('curve_accounts='+str(lib)) if a.startswith('curve_accounts=') else a for a in cmd];cmd+=['-L','dependency='+str(W/'curve'),'-L','dependency='+str(W)]
  deps={a.split('=',1)[1]:sha(Path(a.split('=',1)[1])) for a in cmd if '=' in a and Path(a.split('=',1)[1]).is_file()}
  extraenv=dict(env,CARGO_MANIFEST_DIR=str(H/'curve-accounts' if name=='curve_accounts' else H),CARGO_MANIFEST_PATH=str((H/'curve-accounts' if name=='curve_accounts' else H)/'Cargo.toml'),CARGO_PKG_NAME='curve-accounts' if name=='curve_accounts' else 'mayhem-recovered',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='',CARGO_FEATURE_DEFAULT='1')
  d=run(label,cmd,H,extraenv,dict(source_inputs=historical,dependency_inputs=deps,macro_sha256=sha(macro),tools=tools,fresh_dependencies=False))
  assert inv(H)==historical and all(sha(Path(p))==v for p,v in deps.items())
  if name=='mayhem_recovered':
   shutil.copyfile(d/'mayhem_recovered.so',d/'symbols.so');subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'),'--strip-all',str(d/'symbols.so'),str(d/'candidate.so')],check=True)
 for label in ['baseline','composed','repeat']:
  d=W/label;write(d/'artifacts.json',dict(source_unchanged=True,checked_tools_unchanged=all(sha(SDK/n)==v for n,v in tools.items()),**{n+'_sha256':sha(d/(n+'.so')) for n in ['candidate','symbols']}))
 assert (W/'composed/symbols.so').read_bytes()==(W/'repeat/symbols.so').read_bytes()
 assert (W/'composed/candidate.so').read_bytes()==(W/'repeat/candidate.so').read_bytes()
 print('complete: baseline, composed and identical repeat',flush=True)
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser(description=__doc__)
 p.add_argument('--output',type=Path,required=True)
 p.add_argument('--sdk',type=Path,required=True)
 p.add_argument('--cargo-home',type=Path,required=True)
 a=p.parse_args()
 R=Path(__file__).resolve().parents[2];W=a.output.resolve();SDK=a.sdk.resolve();CACHE=a.cargo_home.resolve()
 main()
