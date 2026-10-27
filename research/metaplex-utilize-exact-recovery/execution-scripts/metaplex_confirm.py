"""Independent clean-target confirmation of the selected Rust-only hypothesis."""
from pathlib import Path
import subprocess,json,hashlib,shutil,time,tomllib
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex');H=lambda b:hashlib.sha256(b).hexdigest()
D=B/'fresh-confirmation2';D.mkdir(exist_ok=False);source=D/'source';source.mkdir()
manifest=json.loads((B/'control-source-manifest.json').read_text());n='programs/token-metadata/program/src/processor/uses/utilize.rs'
for name,h in manifest.items():
 b=(B/'source'/name).read_bytes();assert H(b)==h
 q=source/name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
(source/n).write_bytes((B/'variants/admission-early-cleanup.rs').read_bytes())
planned={name:H((source/name).read_bytes()) for name in manifest}
assert planned==json.loads((B/'builds/admission-early-cleanup/source-manifest.json').read_text())
(D/'source-manifest.json').write_text(json.dumps(planned,indent=2)+'\n')
lock=tomllib.loads((source/'programs/token-metadata/Cargo.lock').read_text());expected={p['name']+'-'+p['version']:p['checksum'] for p in lock['package'] if p.get('source','').startswith('registry+')}
registry=B/'cargo/registry';archives={};extracted=0
for f in registry.glob('cache/*/*.crate'):
 name=f.name[:-6];assert name in expected and H(f.read_bytes())==expected[name];archives[str(f.relative_to(registry))]=expected[name]
assert len(archives)==len(expected)
for checksum in registry.glob('src/*/*/.cargo-checksum.json'):
 info=json.loads(checksum.read_text());assert info['package']==expected[checksum.parent.name]
 for name,h in info['files'].items():assert H((checksum.parent/name).read_bytes())==h,(checksum.parent.name,name)
 extracted+=1
git=[]
for cargo in (B/'cargo/git/checkouts').glob('*/*/Cargo.toml'):
 p=cargo.parent;head=subprocess.check_output(['git','-C',str(p),'rev-parse','HEAD'],text=True).strip();status=subprocess.check_output(['git','-C',str(p),'status','--porcelain'],text=True)
 assert not status
 git.append({'path':str(p),'commit':head})
tools={str(f.relative_to(B/'sdk')):H(f.read_bytes()) for f in [B/'sdk/rust/bin/rustc',B/'sdk/rust/bin/cargo',B/'sdk/llvm/bin/llvm-objcopy',B/'sdk/llvm/bin/llc']}
(D/'dependencies.json').write_text(json.dumps({'registry_archives':archives,'extracted_packages_verified':extracted,'git_checkouts':git,'tools':tools},indent=2)+'\n')
target=D/'target';target.mkdir();cargo=D/'cargo';cargo.mkdir();(source/'programs/token-metadata/target').mkdir()
cmd=json.loads((B/'builds/control/command.json').read_text())
for i,v in enumerate(cmd):
 if v==str(B/'source')+':/build:rw':cmd[i]=str(source)+':/build:ro'
 if v==str(B/'target')+':/build/programs/token-metadata/target:rw':cmd[i]=str(target)+':/build/programs/token-metadata/target:rw'
 if v==str(B/'cargo')+':/usr/local/cargo:rw':cmd[i]=str(cargo)+':/usr/local/cargo:rw'
pos=cmd.index('-w');cmd[pos:pos]=['-v',str(B/'cargo/registry')+':/usr/local/cargo/registry:ro','-v',str(B/'cargo/git')+':/usr/local/cargo/git:ro','-e','CARGO_NET_OFFLINE=true']
(D/'command.json').write_text(json.dumps(cmd,indent=2)+'\n');start=time.time()
with (D/'build.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
result={'returncode':r.returncode,'seconds':time.time()-start,'source_unchanged':all(H((source/name).read_bytes())==h for name,h in planned.items()),'target_initially_empty':True,'source_mount_readonly':True,'registry_and_git_readonly':True,'build_network':'none'}
if r.returncode==0:
 shutil.copy2(target/'sbf-solana-solana/release/token_metadata.so',D/'compiler-output.so')
 image='solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
 subprocess.run(['docker','run','--rm','--network','none','-v',str(B/'sdk')+':/sdk:ro','-v',str(D)+':/out:rw',image,'/sdk/llvm/bin/llvm-objcopy','--strip-all','/out/compiler-output.so','/out/candidate.so'],check=True)
 result['sha256']=H((D/'candidate.so').read_bytes());result['exact_selected_candidate']=result['sha256']=='99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
(D/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2),flush=True)
if r.returncode:print((D/'build.log').read_text()[-6000:])
assert r.returncode==0 and result['source_unchanged'] and result['exact_selected_candidate']
