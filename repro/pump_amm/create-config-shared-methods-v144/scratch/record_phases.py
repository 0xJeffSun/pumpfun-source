from pathlib import Path
import hashlib,json,shutil
W=Path(__file__).resolve().parent;B=W/'build-01'
def identity(p):
 p=p.resolve();assert not p.name.endswith('-keypair.json');d=p.read_bytes();return {'path':str(p),'sha256':hashlib.sha256(d).hexdigest(),'bytes':len(d)}
info=json.loads((B/'target/.rustc_info.json').read_text());sysroots={line for entry in info['outputs'].values()for line in entry.get('stdout','').splitlines()if line.startswith('/')and line.endswith('/rust')};assert len(sysroots)==1
compiler=Path(sysroots.pop());strip=B/'sdk/dependencies/platform-tools'
phases={'scope':'One unchanged fixed recipe. Actual v1.44 compilation from cargo rustc_info, followed by unchanged SDK strip.sh/env.sh/install.sh selecting v1.52. Final isolated rustup solana alias points to strip-installed1.52 and is not compile identity.','compile':{'selected_version':'v1.44','observed_sysroot':str(compiler),'tools':{name:identity(compiler/name)for name in ['bin/rustc','bin/cargo']},'linker':identity(compiler.parent/'llvm/bin/ld.lld')},'strip':{'observed_sdk_link':str(strip.readlink()),'resolved_distribution':str(strip.resolve()),'tool':identity(strip/'llvm/bin/llvm-objcopy'),'scripts':{p:identity(B/'sdk'/p)for p in ['scripts/strip.sh','env.sh','scripts/install.sh']}},'final_rustup_alias':str((B/'rustup/toolchains/solana').resolve()),'cli':identity(Path(shutil.which('cargo-build-sbf'))),'compiled_unstripped':identity(B/'target/sbf-solana-solana/release/pump_amm_recovered.so'),'candidate':identity(B/'artifacts/pump_amm_recovered.so'),'cargo_rustc_info':identity(B/'target/.rustc_info.json'),'excluded_generated_artifacts':[str(p.relative_to(B))for p in (B/'artifacts').iterdir()if p.name.endswith('-keypair.json')],'excluded_policy':'Only filename metadata; generated keypairs never read, hashed, copied or packaged.'}
assert phases['compile']['tools']['bin/rustc']['sha256']=='1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a'
assert phases['strip']['tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
(W/'toolchain-phases.json').write_text(json.dumps(phases,indent=2)+'\n')
print(json.dumps({'compiler':'v1.44','strip':'v1.52','candidate':phases['candidate']},indent=2))
