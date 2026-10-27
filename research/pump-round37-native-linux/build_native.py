"""Compile unchanged Round37 primary through the official native Linux SDK."""
from pathlib import Path
import fcntl
import hashlib
import json
import os
import shutil
import subprocess
import sys
import time

W=Path(__file__).resolve().parent
SDK=Path('/dev/shm/fees-585-sdk/tools')
SOURCE=W/'source'
TARGET=Path('/dev/shm/fees-585-sdk/target')
HOME=Path('/dev/shm/fees-585-sdk/cargo-home')
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
def inputs(root):
    return {str(p.relative_to(root)):sha(p) for p in sorted(root.rglob('*')) if p.is_file()}

def build(label,target):
    assert target in ['sbf-solana-solana','sbpf-solana-solana']
    out=W/'builds'/label;out.mkdir(parents=True,exist_ok=False)
    before=inputs(SOURCE);primary=inputs(W/'primary')
    cp=json.loads((W/'CHECKPOINT.json').read_text())
    assert primary==cp['primary_source_sha256']
    tools={str(p.relative_to(SDK)):sha(p)for p in sorted(SDK.rglob('*')) if p.is_file()}
    wrapper_input=W/'inputs/scripts/pump_physical_source_wrapper.py'
    assert sha(wrapper_input)==cp['input_python_sha256']['scripts/pump_physical_source_wrapper.py']
    wrapper=Path('/dev/shm/fees-585-sdk/pump_physical_source_wrapper.py')
    if wrapper.exists():assert wrapper.read_bytes()==wrapper_input.read_bytes()
    else:shutil.copyfile(wrapper_input,wrapper)
    wrapper.chmod(0o755)
    assert sha(wrapper)==sha(wrapper_input) and wrapper.stat().st_mode&0o111
    overrides=dict(RUSTC_BOOTSTRAP='1',RUSTC=str(SDK/'rust/bin/rustc'),
        RUSTDOC=str(SDK/'rust/bin/rustdoc'),RUSTC_WRAPPER=str(wrapper),
        PATH=str(SDK/'rust/bin')+':'+os.environ['PATH'],CC=str(SDK/'llvm/bin/clang'),
        AR=str(SDK/'llvm/bin/llvm-ar'),CARGO_HOME=str(HOME),CARGO_TARGET_DIR=str(TARGET),
        CARGO_BUILD_JOBS='1',CARGO_NET_OFFLINE='true',RUSTFLAGS='-Zremap-cwd-prefix=',
        PUMP_LOGICAL_REGISTRY_SRC=str(HOME/'registry/src'),
        PUMP_SOURCE_WRAPPER_LOG=str(out/'physical-source-calls.jsonl'))
    env=os.environ.copy();env.update(overrides)
    cmd=[str(SDK/'rust/bin/cargo'),'rustc','--verbose','--manifest-path',
        str(SOURCE/'programs/pump/Cargo.toml'),'--release','--target',target,
        '--locked','--offline','--jobs','1','--lib','--','-C','link-arg=-Map='+str(out/'link.map')]
    (out/'launch.json').write_text(json.dumps(dict(command=cmd,cwd=str(SOURCE),
        environment=overrides,primary_source_inputs=primary,workspace_inputs=before,
        sdk_inputs=tools,wrapper_sha256=sha(wrapper)),indent=2)+'\n')
    with Path('/workspace/scratch/08cb9746963a/fees-585-work/native-target.lock').open('a')as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        start=time.monotonic()
        with (out/'build.log').open('wb')as log:
            result=subprocess.run(cmd,cwd=SOURCE,env=env,stdout=log,stderr=subprocess.STDOUT)
        r=dict(exit_code=result.returncode,seconds=time.monotonic()-start,
            primary_unchanged=primary==inputs(W/'primary'),source_unchanged=before==inputs(SOURCE),
            sdk_unchanged=tools=={str(p.relative_to(SDK)):sha(p)for p in sorted(SDK.rglob('*'))if p.is_file()},
            root_invocations=(out/'build.log').read_bytes().count(b'--crate-name pump_recovered '),
            build_log_sha256=sha(out/'build.log'))
        if result.returncode==0:
            shutil.copyfile(TARGET/target/'release/pump_recovered.so',out/'unstripped.so')
            subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'),'--strip-all',
                str(out/'unstripped.so'),str(out/'candidate.so')],check=True)
            r.update(unstripped_sha256=sha(out/'unstripped.so'),candidate_sha256=sha(out/'candidate.so'))
        (out/'result.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r),flush=True)
        if result.returncode:print((out/'build.log').read_text()[-6000:])
        return result.returncode

if __name__=='__main__':sys.exit(build(sys.argv[1],sys.argv[2]))
