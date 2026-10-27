from pathlib import Path
import hashlib,json,os,subprocess
W=Path(__file__).resolve().parent; P=W/'mayhem-native-build'; O=W/'mayhem-root-controls/metadata-option';O.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf8',newline='\n')
source=O/'probe.rs';source.write_bytes(b'#![no_std]\n#[inline(never)]\npub fn bump(value: u64) -> u64 { value.wrapping_add(1) }\n')
launch0=json.loads((P/'build-01/launch.json').read_bytes());env={k:os.environ[k]for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(launch0['environment_overrides'])
rustc=env['RUSTC'];sysroot=env['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS'].split('--sysroot=',1)[1]
assert sha(Path(rustc))==launch0['checked_executables'][rustc]
variants={'native':['c76d00b312df7907'],'added':['c76d00b312df7907','e3c44ab51b8399da'],'combined':['c76d00b312df7907 e3c44ab51b8399da'],'published':['e3c44ab51b8399da']}
for label,values in variants.items():
 d=O/label;d.mkdir();cmd=[rustc,'--crate-name','metadata_probe','--edition=2021','probe.rs','--crate-type','lib','--emit=obj','--target','sbpf-solana-solana','--sysroot',sysroot,'-C','opt-level=3','-C','panic=abort','-Zremap-cwd-prefix=','-o',str(d/'probe.o')]
 for val in values:cmd+=['-C','metadata='+val]
 save(d/'launch.json',dict(command=cmd,cwd=str(O),metadata_values=values,source_sha256=sha(source),compiler_sha256=sha(Path(rustc)),environment_overrides=launch0['environment_overrides']))
 r=subprocess.run(cmd,cwd=O,env=env,capture_output=True,timeout=60,creationflags=subprocess.CREATE_NO_WINDOW);(d/'stdout.log').write_bytes(r.stdout);(d/'stderr.log').write_bytes(r.stderr)
 result=dict(returncode=r.returncode,source_unchanged=sha(source)==hashlib.sha256(b'#![no_std]\n#[inline(never)]\npub fn bump(value: u64) -> u64 { value.wrapping_add(1) }\n').hexdigest(),target_executions=0)
 if r.returncode==0:result['object']=dict(bytes=(d/'probe.o').stat().st_size,sha256=sha(d/'probe.o'))
 result['logs']={p.name:dict(bytes=p.stat().st_size,sha256=sha(p))for p in d.glob('*.log')};save(d/'result.json',result);print(label,result)
 assert r.returncode==0
assert (O/'added/probe.o').read_bytes()==(O/'combined/probe.o').read_bytes()
assert len({sha(O/lab/'probe.o')for lab in ['native','added','published']})==3
