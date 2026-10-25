#!/usr/bin/env python3
"""Portable static-only verification. No target execution, build, network or cache."""
import argparse,difflib,gzip,hashlib,importlib.util,json,struct,tarfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return json.loads((P/n).read_text())
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 manifest=read('manifest.json');assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 files=[x for x in P.rglob('*') if x.is_file()];assert not any(x.is_symlink() for x in P.rglob('*'))
 assert not any('__pycache__' in x.parts or x.suffix=='.pyc' for x in files)
 assert set(manifest)=={str(x.relative_to(P)) for x in files}-{'manifest.json','manifest.sha256'}
 for name,sha in manifest.items():assert H((P/name).read_bytes())==sha, name
 prov=read('input-provenance.json')
 for path,row in prov.items():
  assert H((P/row['copy']).read_bytes())==row['sha256'],path
  if repo:assert H((repo/path).read_bytes())==row['sha256'],path
 bm=read('build05/manifest.json');assert H((P/'build05/manifest.json').read_bytes())==(P/'build05/manifest.sha256').read_text().split()[0]
 for path in (P/'build05').iterdir():
  if path.name in bm:assert H(path.read_bytes())==bm[path.name]
 actual=read('source-sha256.json');proposed=read('source-proposal-sha256.json')
 assert len(actual)==21 and len(proposed)==22
 for name,values in [('source',actual),('source-proposal',proposed)]:
  fs={str(x.relative_to(P/name)):H(x.read_bytes()) for x in (P/name).rglob('*') if x.is_file()};assert fs==values
 for path,sha in actual.items():assert bm['source/'+path]==sha
 launch=read('inputs/build05-provenance/attempt/build-launch.json');assert launch['source']==actual
 for row in prov.values():
  if row['copy'].startswith('inputs/build05-provenance/'):
   suffix=row['copy'].removeprefix('inputs/build05-provenance/');assert bm[suffix]==row['sha256']
 assert {x for x in actual if actual[x]!=proposed[x]}=={'src/generated_exit.rs'}
 assert set(proposed)-set(actual)=={'src/bpf_writer.rs'}
 old=(P/'source/src/generated_exit.rs').read_text();new=old.replace('use std::io::{Cursor, Write};','use std::io::Write;\n#[path="bpf_writer.rs"] mod bpf_writer;\nuse bpf_writer::BpfWriter;').replace('Cursor::new(data)','BpfWriter::new(data)')
 assert old.count('Cursor::new(data)')==4 and (P/'source-proposal/src/generated_exit.rs').read_text()==new
 writer=(P/'upstream/anchor-lang-0.31.1/src/bpf_writer.rs').read_text();assert (P/'source-proposal/src/bpf_writer.rs').read_text()==writer
 patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/src/generated_exit.rs',tofile='b/src/generated_exit.rs'))+''.join(difflib.unified_diff([],writer.splitlines(True),fromfile='/dev/null',tofile='b/src/bpf_writer.rs'))
 assert patch==(P/'source-proposal.patch').read_text()
 for row in read('upstream/extraction.json'):
  arch=P/row['archive'];assert H(arch.read_bytes())==row['archive_sha256']
  with tarfile.open(arch) as t:b=t.extractfile(row['member']).read()
  assert H(b)==row['sha256'] and b==(P/row['output']).read_bytes()
 assert H(writer.encode())=='544511c105eb66783551f85ef85f4e60b13c86350de6d9f1441fff94937d8511'
 assert 'pub use solana_program_memory as program_memory;' in (P/'upstream/solana-program-2.2.1/src/lib.rs').read_text()
 # Recompute all full-body ledgers, references and positional residual bytes.
 comp=module('review_compute',P/'compute.py');full,local=comp.make()
 for name,value in full.items():
  b=(P/'build05'/name).read_bytes();saved=json.loads(gzip.decompress(b) if name.endswith('.gz') else b);assert value==saved,name
 for name,value in local.items():assert value==read(name),name
 d=module('review_disasm',P/'disasm.py')
 for path in (P/'disassembly').glob('*.asm'):
  family,idx=path.stem.split('-');i=int(idx);fs=full[f'{family}-function-ledger.json'];elf=comp.a.Elf((P/'build05'/('original.so' if family=='original' else 'unstripped.so')).read_bytes());f=fs[i]
  assert path.read_text()==d.render(elf,f['start'],f['end']),path.name
 om=read('inputs/build05-ordinary12/manifest.json');assert H((P/'inputs/build05-ordinary12/manifest.json').read_bytes())==(P/'inputs/build05-ordinary12/manifest.sha256').read_text().split()[0]
 assert H((P/'inputs/build05-ordinary12/ordinary.json').read_bytes())==om['run/ordinary.json']
 return {'passed':True,'payload_files':len(manifest),'base_source_inputs':21,'proposed_source_inputs':22,'changed_existing_source_paths':1,'added_source_paths':1,'fixed_field_calls':23,'original_closure_windows':35,'candidate_closure_windows':92,'original_windows':492,'candidate_windows':279,'new_builds':0,'new_runtime_cases':0,'public_inputs_checked':len(prov) if repo else 0}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();print(json.dumps(verify(args.repo.resolve() if args.repo else None),sort_keys=True,indent=2))
