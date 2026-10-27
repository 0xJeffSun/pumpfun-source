#!/usr/bin/env python3
"""Build only the main Pump crate with the installed v1.44 SDK and bound inputs.

This creates a fresh target and records source/tool hashes and both ELF outputs.
It neither downloads a compiler nor uses the captured program as compiler input.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tomllib

from build_source_manifest import source_manifest
from compare import compare

ROOT=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--source-directory',type=Path,default=ROOT/'programs/pump')
    p.add_argument('--sdk',type=Path,default=Path.home()/'.cache/solana/v1.44/platform-tools')
    p.add_argument('--registry-home',type=Path,default=Path(os.environ.get('CARGO_HOME',Path.home()/'.cargo')))
    p.add_argument('--output',type=Path,required=True)
    p.add_argument('--workspace-layout',action='store_true',help='Stage identical Rust sources in an actual programs/pump Cargo workspace; preserve release settings and lockfile.')
    a=p.parse_args();crate=a.source_directory.resolve();sdk=a.sdk.resolve();out=a.output.resolve();registry=a.registry_home.resolve()
    crate.relative_to(ROOT);out.mkdir(parents=True,exist_ok=False)
    primary=crate;primary_before=source_manifest(primary,primary,ROOT)
    workspace=crate
    if a.workspace_layout:
        assert not out.is_relative_to(primary), 'workspace staging must be outside the input crate'
        text=(primary/'Cargo.toml').read_text();parsed=tomllib.loads(text)
        assert parsed.get('workspace')=={} and set(parsed.get('profile',{}))=={'release'}, 'unsupported source workspace/profile layout'
        profile_start=text.index('[profile.release]');workspace_start=text.index('[workspace]')
        assert profile_start<workspace_start and not text[workspace_start+len('[workspace]'):].strip(), 'unexpected manifest tables after release profile'
        profile=text[profile_start:workspace_start].strip()+'\n'
        crate_text=text[:profile_start].rstrip()+'\n'
        workspace=out/'source';crate=workspace/'programs/pump'
        for source_path in primary_before:
            src=ROOT/source_path
            try:relative=src.relative_to(primary)
            except ValueError:raise AssertionError('staged inputs outside the main crate need explicit handling: '+source_path)
            dest=crate/relative;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dest)
        (crate/'Cargo.toml').write_text(crate_text)
        shutil.move(crate/'Cargo.lock',workspace/'Cargo.lock')
        (workspace/'Cargo.toml').write_text('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n'+profile)
    tools={'rustc':sdk/'rust/bin/rustc','cargo':sdk/'rust/bin/cargo','objcopy':sdk/'llvm/bin/llvm-objcopy'}
    assert all(p.is_file()for p in tools.values()),'installed SDK is incomplete'
    cargo_home=out/'cargo-home';(cargo_home/'registry').mkdir(parents=True)
    for name in ['src','cache','index']:
        original=registry/'registry'/name
        if original.exists():(cargo_home/'registry'/name).symlink_to(original,target_is_directory=True)
    wrapper=ROOT/'scripts/pump_physical_source_wrapper.py'
    before=source_manifest(crate,workspace,ROOT,cwd=workspace)
    env=os.environ.copy();env.update(RUSTC_WRAPPER=str(wrapper),PUMP_LOGICAL_REGISTRY_SRC=str(cargo_home/'registry/src'),PUMP_SOURCE_WRAPPER_LOG=str(out/'physical-source-calls.jsonl'),CARGO_HOME=str(cargo_home),CARGO_TARGET_DIR=str(out/'target'),CARGO_BUILD_JOBS='2',RUSTC=str(tools['rustc']),CC=str(sdk/'llvm/bin/clang'),AR=str(sdk/'llvm/bin/llvm-ar'),OBJDUMP=str(sdk/'llvm/bin/llvm-objdump'),OBJCOPY=str(tools['objcopy']),CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=')
    command=[str(tools['cargo']),'build','--manifest-path',str(crate/'Cargo.toml'),'--release','--target','sbf-solana-solana','--locked','--offline']
    record={'scope':__doc__,'workspace_layout':a.workspace_layout,'source_directory':str(crate),'primary_source_directory':str(primary),'primary_source_sha256':primary_before,'source_sha256':before,'source_wrapper_sha256':sha(wrapper),'builder_sha256':sha(Path(__file__)),'selected_toolchain':'v1.44','tool_sha256':{k:sha(v)for k,v in tools.items()},'command':command,'environment':{k:env[k]for k in ['RUSTC_WRAPPER','PUMP_LOGICAL_REGISTRY_SRC','PUMP_SOURCE_WRAPPER_LOG','CARGO_HOME','CARGO_TARGET_DIR','CARGO_BUILD_JOBS','RUSTC','CC','AR','OBJDUMP','OBJCOPY','CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']}}
    receipt=out/'build-attempt.json';receipt.write_text(json.dumps(record,indent=2)+'\n')
    with(out/'build.log').open('w')as f:result=subprocess.run(command,cwd=workspace,env=env,stdout=f,stderr=subprocess.STDOUT)
    record.update(returncode=result.returncode,source_after_sha256=source_manifest(crate,workspace,ROOT,cwd=workspace));record['source_unchanged']=record['source_after_sha256']==before and primary_before==source_manifest(primary,primary,ROOT);receipt.write_text(json.dumps(record,indent=2)+'\n');result.check_returncode();assert record['source_unchanged']
    manifest=tomllib.loads((crate/'Cargo.toml').read_text());name=manifest.get('lib',{}).get('name',manifest['package']['name'].replace('-','_'))
    built=out/'target/sbf-solana-solana/release'/f'{name}.so';shutil.copy2(built,out/'unstripped.so');subprocess.run([str(tools['objcopy']),'--strip-all',str(built),str(out/'candidate.so')],check=True)
    record.update(unstripped_sha256=sha(out/'unstripped.so'),build_log_sha256=sha(out/'build.log'),comparison=compare((ROOT/'evidence/original/pump/deployed.so').read_bytes(),(out/'candidate.so').read_bytes()))
    (out/'build-comparison.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record['comparison'],indent=2))
if __name__=='__main__':main()
