from pathlib import Path
import argparse,json,hashlib,tarfile,tomllib,struct,difflib,gzip
P=Path(__file__).resolve().parent;ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);R=ap.parse_args().repo.resolve();H=lambda b:hashlib.sha256(b).hexdigest()
records=json.loads((P/'source-provenance.json').read_text());lock=tomllib.loads((P/'Cargo.lock').read_text());locked={(x['name'],x['version']):x.get('checksum')for x in lock['package']}
for row in records:
 full=row['package']+'-'+row['version'];archive=P/'archives'/(full+'.crate');meta=json.loads((P/'registry'/(full+'.json')).read_text());assert H(archive.read_bytes())==meta['cksum']==row['archive_sha256']==row['registry_checksum']
 assert meta['name']==row['package'] and meta['vers']==row['version']
 if row['current_lock_checksum']:assert locked[(row['package'],row['version'])]==row['archive_sha256']
 with tarfile.open(archive,'r:gz')as t:
  for n,h in row['members'].items():assert H(t.extractfile(full+'/'+n).read())==H((P/'sources'/full/n).read_bytes())==h
base=P/'sources/solana-pubkey-2.4.0';hist=(P/'sources/solana-pubkey-2.2.1/src/lib.rs').read_text();i=hist.index('fn write_as_base58(');j=hist.index('\n}\n',i)+2;old=(base/'src/lib.rs').read_text();start=old.index('fn write_as_base58(');end=old.index('\n}\n',start)+2
new=old[:start]+hist[i:j]+old[end:];new=new.replace('str::{from_utf8_unchecked, FromStr}','str::{from_utf8, FromStr}');assert new==(P/'proposal/solana-pubkey-2.4.0/src/lib.rs').read_text()
manifest=(base/'Cargo.toml').read_text();newmanifest=manifest.replace('[dependencies.bytemuck]','[dependencies.bs58]\nversion = "0.5.1"\ndefault-features = false\n\n[dependencies.bytemuck]',1);assert newmanifest==(P/'proposal/solana-pubkey-2.4.0/Cargo.toml').read_text();assert tomllib.loads(newmanifest)['dependencies']['five8']==tomllib.loads(manifest)['dependencies']['five8']
patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/solana-pubkey-2.4.0/src/lib.rs',tofile='b/solana-pubkey-2.4.0/src/lib.rs'))+''.join(difflib.unified_diff(manifest.splitlines(True),newmanifest.splitlines(True),fromfile='a/solana-pubkey-2.4.0/Cargo.toml',tofile='b/solana-pubkey-2.4.0/Cargo.toml'));assert patch==(P/'restore-pubkey-formatter.patch').read_text()
O=(R/'evidence/original/pump_amm/deployed.so').read_bytes();C=(R/'repro/pump_amm/accumulator-order-v144/candidate.so').read_bytes();assert H(O)=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7';assert H(C)=='8ce5f9588bdf7ca3d357a542518ad47aa1376fd8f3d242c37f18f55cef766a0e'
led=json.loads((P/'admitted-ledger-excerpts.json').read_text())
for side,b in [('original',O),('candidate',C)]:
 for row in led[side]:assert H(b[row['start']:row['end']])==row['raw_sha256']
I=lambda p:struct.unpack_from('<BBhi',O,p)
assert I(0x10e410)==(0xb7,1,0,32);assert I(0x10e450)[3]==40;assert I(0x10e500)==(0x37,3,0,58);assert I(0x10e568)==(0x37,3,0,58);assert I(0x10e558)[3]==44;assert I(0x10e5f0)[3]==32;assert I(0x10e7a8)==(0x71,0x51,128,0)
alpha=b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';decode=bytearray([255]*128)
for i,b in enumerate(alpha):decode[b]=i
assert O[0x120c57:0x120c57+186]==bytes(decode)+alpha
for row in json.loads((P/'bounded-original-data.json').read_text()):assert O[row['start']:row['start']+row['bytes']].hex()==row['hex']
for row in json.loads((P/'diagnostic-source-observations.json').read_text()):
 a=row['descriptor_address'];path=struct.unpack_from('<II',O,a)[1];n=struct.unpack_from('<Q',O,a+8)[0];line,col=struct.unpack_from('<II',O,a+16);assert O[path:path+n].decode()=='src/lib.rs';text=hist.splitlines()[line-1];assert text==row['retained_source_line'] and text.index('unwrap')+1==col==row['column']
assert O[0x10e698:0x10e69a]==bytes([0x85,0x10]);assert 0x10e6a0+struct.unpack_from('<i',O,0x10e69c)[0]*8==0x112f98
assert 0x10e710+struct.unpack_from('<i',O,0x10e70c)[0]*8==0x1168a0
print('PASS: primary archive/source provenance, exact narrow restoration, original base58/error/UTF8 witnesses; no build or runtime')
