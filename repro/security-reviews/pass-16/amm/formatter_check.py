from pathlib import Path
import tarfile,hashlib,json,difflib
W=Path(__file__).resolve().parent;V=W/'source/programs/pump-amm/vendor/solana-pubkey';a=W/'evidence/solana-pubkey-2.4.0.crate'
assert hashlib.sha256(a.read_bytes()).hexdigest()=='9b62adb9c3261a052ca1f999398c388f1daf558a1b492f60a6d9e64857db4ff1'
changed=[];diff=[];unchanged=[]
with tarfile.open(a) as t:
 for m in t.getmembers():
  if not m.isfile():continue
  n=Path(m.name).relative_to('solana-pubkey-2.4.0');b=t.extractfile(m).read();p=V/n;assert p.is_file(),n
  if b!=p.read_bytes():
   changed.append(str(n));diff.extend(difflib.unified_diff(b.decode().splitlines(True),p.read_text().splitlines(True),fromfile='archive/'+str(n),tofile='vendor/'+str(n)))
  else:unchanged.append(str(n))
assert sorted(changed)==['Cargo.toml','src/lib.rs'];(W/'formatter.patch').write_text(''.join(diff));(W/'formatter-origin.json').write_text(json.dumps({'archive_sha256':hashlib.sha256(a.read_bytes()).hexdigest(),'changed_files':changed,'unchanged_files':unchanged,'scope':'Current vendor compared bytewise with published retained archive; no historical dependency-identity claim.'},indent=2)+'\n');print(changed)
