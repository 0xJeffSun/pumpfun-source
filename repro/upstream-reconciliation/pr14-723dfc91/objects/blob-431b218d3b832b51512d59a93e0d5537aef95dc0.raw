from pathlib import Path
import subprocess,json,hashlib,shutil,sys
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
H=lambda b:hashlib.sha256(b).hexdigest()
info=json.loads((P/'container.json').read_text());container=info['id'];source=Path(info['source'])
state=json.loads(subprocess.check_output(['podman','inspect',container],text=True))[0]
image=json.loads((P/'image-inspect.json').read_text())[0]
assert state['State']['Running'] and state['Image'].removeprefix('sha256:')==image['Id'].removeprefix('sha256:')
manifest=json.loads((P/'source-manifest.json').read_text());assert all(H((source/n).read_bytes())==d for n,d in manifest.items())
expected=source/'programs/token-metadata/target/deploy/token_metadata.so';assert not expected.exists(),'reject an unexplained pre-existing candidate'
active=subprocess.check_output(['podman','exec','-w','/',container,'rustup','show','active-toolchain'],text=True).split()[0]
cmd=['podman','exec','-e','RUSTUP_TOOLCHAIN='+active,'-e','CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse','-w','/build/programs/token-metadata',container,'cargo','build-sbf','--','--config','registries.crates-io.protocol="sparse"','--locked','--manifest-path','/build/programs/token-metadata/Cargo.toml']
(P/'resume-command.json').write_text(json.dumps(cmd,indent=2)+'\n')
with (P/'resumed-build.log').open('wb') as log:run=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
unchanged=all(H((source/n).read_bytes())==d for n,d in manifest.items())
result={'scope':'Pinned Linux image under Podman with explicit sparse metadata transport; source-only SDK/cache mounts; captured target read only after compilation','returncode':run.returncode,'all_812_source_hashes_unchanged':unchanged,'source_manifest_sha256':H((P/'source-manifest.json').read_bytes()),'build_log_sha256':H((P/'resumed-build.log').read_bytes()),'container_image_id':state['Image'],'command':cmd}
if run.returncode==0:
 assert unchanged and expected.exists()
 b=expected.read_bytes();shutil.copyfile(expected,P/'candidate.so')
 a=(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so').read_bytes();o=(ROOT/'evidence/dependencies/token_metadata/deployed.so').read_bytes()
 result.update(candidate_sha256=H(b),candidate_bytes=len(b),equals_linux_candidate11=b==a,original_sha256=H(o),full_original_equality=b==o)
 result['target_rustc_version']=subprocess.check_output(['podman','exec',container,'rustup','run','solana','rustc','--version','--verbose'],text=True)
(P/'resume-result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
