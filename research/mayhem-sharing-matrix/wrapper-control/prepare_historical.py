from pathlib import Path
import hashlib,json,os,subprocess,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-source-data-native';O=P/'wrapper-control'
L=json.loads((P/'alloc-provider/build-01/launch.json').read_bytes())
env={k:os.environ[k]for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(L['environment_overrides'])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf8',newline='\n')
assert not(O/'wrapper.exe').exists()
compiler=Path(L['environment_overrides']['RUSTC']);assert sha(compiler)==L['checked_executables'][str(compiler)]
cmd=[str(compiler),'--crate-name','sharing_wrapper','--edition=2021','-C','opt-level=2',str(O/'wrapper.rs'),'-o',str(O/'wrapper.exe')]
save(O/'compile-launch.json',dict(command=cmd,environment=env,source_sha256=sha(O/'wrapper.rs'),compiler_sha256=sha(compiler)))
p=subprocess.run(cmd,env=env,capture_output=True,timeout=120,creationflags=subprocess.CREATE_NO_WINDOW)
(O/'compile.stdout.log').write_bytes(p.stdout);(O/'compile.stderr.log').write_bytes(p.stderr)
save(O/'compile-result.json',dict(returncode=p.returncode,wrapper_sha256=sha(O/'wrapper.exe')if(O/'wrapper.exe').exists()else None));assert p.returncode==0,p.stderr.decode(errors='replace')
for label,mode in [('passthrough','passthrough'),('omit','omit-sysvar-no'),('omit-repeat','omit-sysvar-no')]:
 dest=O/label;dest.mkdir(exist_ok=False);src=P/'alloc-provider'
 for n in ['sources','builds']:shutil.copytree(src/n,dest/n)
 for n in ['source-inputs.json','sdk-components.json.gz','target-components.json','vendor-inputs.json']:shutil.copyfile(src/n,dest/n)
 builder=(src/'build.py').read_text();old='        env.update(extra)';assert builder.count(old)==1
 insertion="        records = output / 'wrapper-records'\n        records.mkdir()\n        wrapper = HERE.parent / 'wrapper.exe'\n        require(sha(wrapper) == "+repr(sha(O/'wrapper.exe'))+", 'wrapper differs')\n        extra.update(RUSTC_WRAPPER=str(wrapper), MAYHEM_SHARING_MODE="+repr(mode)+", MAYHEM_WRAPPER_RECORDS=str(records))\n        env.update(extra)"
 (dest/'build.py').write_text(builder.replace(old,insertion),encoding='utf8',newline='\n')
print('Host wrapper compiled; three fresh full-build controllers prepared.',sha(O/'wrapper.exe'))
