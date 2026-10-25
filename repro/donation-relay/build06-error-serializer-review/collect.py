#!/usr/bin/env python3
"""Copy only named public evidence; never executes a target or changes its bytes."""
import hashlib,json,shutil,tarfile,tomllib
from pathlib import Path
P=Path(__file__).resolve().parent
R=P.parents[1]
B=R/'repro/donation-relay/source-build-06-bpf-writer'
H=lambda b:hashlib.sha256(b).hexdigest()
def put(path,b):
 q=P/path;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
def jput(path,v):put(path,(json.dumps(v,indent=2,sort_keys=True)+'\n').encode())
bindings={}
def copy(src,dst):
 b=src.read_bytes();put(dst,b);bindings[str(src.relative_to(R))]={'copy':dst,'bytes':len(b),'sha256':H(b)}
names=['manifest.json','README.md','original.so','candidate.so','unstripped.so','original-windows.json','original-function-ledger.json','candidate-function-ledger.json','match-ledger.json','serializer-fields.json','writer-comparison.json','comparison-summary.json','review-summary.json','launcher/resolved-source-sha256.json','attempt/tool-phase-before.json','attempt/tool-phase-after.json','attempt/dependency-source-after.json','launcher/tool-witness/tool-files.json','proposal/upstream/anchor-lang-0.31.1.crate','proposal/upstream/extraction.json']
for n in names:copy(B/n,'inputs/build06/'+n)
for n in ['analyze.py','disasm.py']:copy(B/n,n)
for n,h in json.loads((B/'launcher/resolved-source-sha256.json').read_text()).items():
 assert H((B/'source'/n).read_bytes())==h;copy(B/'source'/n,'source/'+n)
for n in ['manifest.json','README.md','run/ordinary.json','run/launch.json','run/process-result.json','verify.py']:
 copy(R/'repro/donation-relay/build06-ordinary12'/n,'inputs/ordinary12/'+n)
crate=R/'work/relay-source-build-06/cargo-home/registry/cache/index.crates.io-6f17d22bba15001f/solana-program-entrypoint-2.3.0.crate'
copy(crate,'upstream/solana-program-entrypoint-2.3.0.crate')
lock=tomllib.loads((P/'source/Cargo.lock').read_text());pkg=next(p for p in lock['package'] if p['name']=='solana-program-entrypoint')
assert pkg['version']=='2.3.0' and pkg['checksum']==H(crate.read_bytes())
dep=next(x for x in json.loads((B/'attempt/dependency-source-after.json').read_text()) if x['package']=='solana-program-entrypoint-2.3.0')
with tarfile.open(crate) as t:
 b=t.extractfile('solana-program-entrypoint-2.3.0/src/lib.rs').read();assert H(b)==dep['files']['src/lib.rs'];put('upstream/entrypoint.rs',b)
with tarfile.open(B/'proposal/upstream/anchor-lang-0.31.1.crate') as t:
 for n in ['src/bpf_writer.rs','src/accounts/account.rs','src/error.rs']:
  b=t.extractfile('anchor-lang-0.31.1/'+n).read();put('upstream/anchor-'+n.replace('/','-'),b)
 assert H(t.extractfile('anchor-lang-0.31.1/src/bpf_writer.rs').read())==H((P/'source/src/bpf_writer.rs').read_bytes())
archive=R/'work/fees-compat/platform-tools-osx-aarch64.tar.bz2'
provenance=json.loads((R/'work/fees-compat/v144-toolchain-provenance.json').read_text())
h=hashlib.sha256()
with archive.open('rb') as f:
 while b:=f.read(1024*1024):h.update(b)
assert h.hexdigest()==provenance['asset_sha256']=='66e20d135fddd70ff519baf7ff320d762957f9aedf93a50e23756db23ad79351'
selected=['alloc/src/boxed.rs','alloc/src/alloc.rs','alloc/src/raw_vec.rs','std/src/io/error.rs','std/src/io/error/repr_bitpacked.rs','core/src/error.rs']
found={}
with tarfile.open(archive,mode='r|bz2') as t:
 for m in t:
  for n in selected:
   suffix='rust/lib/rustlib/src/rust/library/'+n
   if m.isfile() and m.name.endswith(suffix):
    b=t.extractfile(m).read();installed=R/'work/fees-compat/toolchains/v1.44'/suffix
    assert b==installed.read_bytes();dest='upstream/rust/'+n;put(dest,b)
    found[n]={'archive_member':m.name,'copy':dest,'sha256':H(b),'bytes':len(b)}
  if len(found)==len(selected):break
assert set(found)==set(selected),(set(selected)-set(found))
jput('upstream/provenance.json',{'platform_tools':{'url':provenance['url'],'archive_sha256':h.hexdigest(),'archive_bytes':archive.stat().st_size,'selected_members':found,'claim':'Exact members of retained selected official artifact, equal to installed source. This does not identify the original historical compiler.'},'entrypoint':{'locked_package':pkg,'source_manifest':dep,'artifact_url':'https://static.crates.io/crates/solana-program-entrypoint/solana-program-entrypoint-2.3.0.crate'},'anchor':{'archive_sha256':H((B/'proposal/upstream/anchor-lang-0.31.1.crate').read_bytes()),'claim':'Retained official reference implementation, not a dependency of build06 or a unique historical version identification.'}})
jput('input-bindings.json',bindings)
print('Copied',len(bindings),'named inputs; six selected official Rust members.')
