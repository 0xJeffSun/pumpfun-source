from pathlib import Path
import tarfile,hashlib,json,tomllib,shutil,difflib
R=Path.cwd();W=R/'work/amm-format-dependency-review';H=lambda b:hashlib.sha256(b).hexdigest();root=Path('/Users/shawwalters/.cargo/registry');lock=tomllib.loads((R/'programs/pump-amm/Cargo.lock').read_text());locked={(p['name'],p['version']):p.get('checksum')for p in lock['package']}
packages={'solana-pubkey-2.4.0':['src/lib.rs','Cargo.toml','Cargo.toml.orig'],'solana-pubkey-2.2.1':['src/lib.rs','Cargo.toml','Cargo.toml.orig'],'bs58-0.5.1':['src/encode.rs','src/alphabet.rs','src/lib.rs','Cargo.toml'],'five8-0.2.1':['src/encode.rs','src/lib.rs','Cargo.toml'],'five8_core-0.1.2':['src/lib.rs','Cargo.toml'],'solana-program-1.18.26':['src/pubkey.rs','Cargo.toml']};records=[]
for full,members in packages.items():
 name,version=full.rsplit('-',1);archive=next(root.glob('cache/index.crates.io-*/'+full+'.crate'));raw=archive.read_bytes()
 # Exact cached primary registry metadata, not inferred from a filename/string.
 if len(name)==1:part='1/'+name
 elif len(name)==2:part='2/'+name
 elif len(name)==3:part='3/'+name[0]+'/'+name
 else:part=name[:2]+'/'+name[2:4]+'/'+name
 index=next(root.glob('index/index.crates.io-*/.cache/'+part));rows=[json.loads(p)for p in index.read_bytes().split(b'\0')if p.startswith(b'{')];row=next(p for p in rows if p['vers']==version)
 assert H(raw)==row['cksum'];known=locked.get((name,version));assert known is None or known==H(raw)
 d=W/'archives'/archive.name;d.parent.mkdir(exist_ok=True);d.write_bytes(raw)
 (W/'registry').mkdir(exist_ok=True);(W/'registry'/(full+'.json')).write_text(json.dumps(row,indent=2)+'\n')
 selected={}
 with tarfile.open(archive,'r:gz')as t:
  for member in members:
   b=t.extractfile(full+'/'+member).read();p=W/'sources'/full/member;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);selected[member]=H(b)
 records.append({'package':name,'version':version,'archive_sha256':H(raw),'registry_checksum':row['cksum'],'current_lock_checksum':known,'source_archive_path':str(archive),'source_registry_index_path':str(index),'members':selected})
(W/'source-provenance.json').write_text(json.dumps(records,indent=2)+'\n')
(W/'Cargo.lock').write_bytes((R/'programs/pump-amm/Cargo.lock').read_bytes())
# Narrow restoration proposal inside the current dependency, not a global downgrade.
base=W/'sources/solana-pubkey-2.4.0';old=(base/'src/lib.rs').read_text();oldbody='''fn write_as_base58(f: &mut fmt::Formatter, p: &Pubkey) -> fmt::Result {
    let mut out = [0u8; MAX_BASE58_LEN];
    let len = five8::encode_32(&p.0, &mut out) as usize;
    // any sequence of base58 chars is valid utf8
    let as_str = unsafe { from_utf8_unchecked(&out[..len]) };
    f.write_str(as_str)
}'''
hist=(W/'sources/solana-pubkey-2.2.1/src/lib.rs').read_text();i=hist.index('fn write_as_base58(');j=hist.index('\n}\n',i)+2;replacement=hist[i:j];assert old.count(oldbody)==1
new=old.replace('str::{from_utf8_unchecked, FromStr}', 'str::{from_utf8, FromStr}').replace(oldbody,replacement)
manifest=(base/'Cargo.toml').read_text();assert '[dependencies.bs58]'not in manifest
newmanifest=manifest.replace('[dependencies.bytemuck]','[dependencies.bs58]\nversion = "0.5.1"\ndefault-features = false\n\n[dependencies.bytemuck]',1)
patch=''
for n,b,a in [('src/lib.rs',old,new),('Cargo.toml',manifest,newmanifest)]:
 p=W/'proposal/solana-pubkey-2.4.0'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(a)
 patch+=''.join(difflib.unified_diff(b.splitlines(True),a.splitlines(True),fromfile='a/solana-pubkey-2.4.0/'+n,tofile='b/solana-pubkey-2.4.0/'+n))
(W/'restore-pubkey-formatter.patch').write_text(patch)
# Existing build feature fingerprint: read only, no cargo invocation.
f=next((R/'work/amm-accumulator-order-main/build-01/target/sbf-solana-solana/release/.fingerprint').glob('solana-pubkey-*/lib-solana_pubkey.json'));(W/'current-feature-fingerprint.json').write_bytes(f.read_bytes())
(W/'current-feature-origin.json').write_text(json.dumps({'path':str(f),'sha256':H(f.read_bytes()),'scope':'Existing accepted build metadata only; no new build or feature search.'},indent=2)+'\n')
