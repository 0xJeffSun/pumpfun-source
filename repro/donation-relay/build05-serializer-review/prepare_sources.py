#!/usr/bin/env python3
"""Populate only this static review package from already-public repository inputs."""
import difflib,hashlib,json,shutil,tarfile
from pathlib import Path
P=Path(__file__).resolve().parent
R=P.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
def save(n,v):(P/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
provenance=json.loads((P/'input-provenance.json').read_text())
def copy(src,dst):
 b=(R/src).read_bytes();p=P/dst;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);provenance[src]={'copy':dst,'sha256':sha(b)}
copy('repro/pump_fees/donation-business-source-proposal/inputs/archives/anchor-lang-0.31.1.crate','upstream/anchor-lang-0.31.1.crate')
copy('repro/pump_fees/donation-business-source-proposal/dependency-source.json','upstream/prior-dependency-source.json')
copy('repro/pump_fees/donation-business-source-proposal/manifest-sha256.json','upstream/prior-manifest.json')
copy('repro/pump_fees/social-ata-helper-source-proposal/inputs/locked-archives/solana-program-2.2.1.crate','upstream/solana-program-2.2.1.crate')
records=[]
for arch,members in [('anchor-lang-0.31.1',['src/bpf_writer.rs','Cargo.toml.orig']),('solana-program-2.2.1',['src/lib.rs','Cargo.toml'])]:
 with tarfile.open(P/f'upstream/{arch}.crate') as t:
  for m in members:
   b=t.extractfile(f'{arch}/{m}').read();out=P/'upstream'/arch/m;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b);records.append({'archive':f'upstream/{arch}.crate','archive_sha256':sha((P/f'upstream/{arch}.crate').read_bytes()),'member':f'{arch}/{m}','output':str(out.relative_to(P)),'sha256':sha(b)})
shutil.copytree(P/'source',P/'source-proposal',dirs_exist_ok=True)
p=P/'source-proposal/src/generated_exit.rs';base=p.read_text();new=base.replace('use std::io::{Cursor, Write};','use std::io::Write;\n#[path="bpf_writer.rs"] mod bpf_writer;\nuse bpf_writer::BpfWriter;').replace('Cursor::new(data)','BpfWriter::new(data)');assert base.count('Cursor::new(data)')==4;p.write_text(new)
w=(P/'upstream/anchor-lang-0.31.1/src/bpf_writer.rs').read_text();(P/'source-proposal/src/bpf_writer.rs').write_text(w)
patch=''.join(difflib.unified_diff(base.splitlines(True),new.splitlines(True),fromfile='a/src/generated_exit.rs',tofile='b/src/generated_exit.rs'))+''.join(difflib.unified_diff([],w.splitlines(True),fromfile='/dev/null',tofile='b/src/bpf_writer.rs'))
(P/'source-proposal.patch').write_text(patch)
save('upstream/extraction.json',records);save('input-provenance.json',provenance)
for name in ['source','source-proposal']:
 save(name+'-sha256.json',{str(p.relative_to(P/name)):sha(p.read_bytes()) for p in sorted((P/name).rglob('*')) if p.is_file()})
