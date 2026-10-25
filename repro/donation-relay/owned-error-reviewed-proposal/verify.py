#!/usr/bin/env python3
"""Verify this uncompiled source proposal without a compiler or target runtime."""
import argparse,difflib,hashlib,json,tarfile
from pathlib import Path
from review import generate
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args()
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q not in [P/'manifest.json',P/'manifest.sha256']and '__pycache__'not in q.parts};assert actual==set(m['files'])
 for n,h in m['files'].items():assert H((P/n).read_bytes())==h,n
 for n,v in generate().items():assert (P/n).read_text()==(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n'),n
 base=json.loads((P/'base-source-sha256.json').read_text());new=json.loads((P/'source-sha256.json').read_text());assert len(base)==22 and len(new)==23
 for group,files in [('base-source',base),('source',new)]:
  assert {str(q.relative_to(P/group))for q in (P/group).rglob('*')if q.is_file()}==set(files)
  for n,h in files.items():assert H((P/group/n).read_bytes())==h,n
 changed=sorted(n for n,h in new.items()if base.get(n)!=h);assert changed==['src/error_report.rs','src/exit_error.rs','src/generated_exit.rs','src/solana_runtime.rs']
 patch=''
 for n in changed:
  old=(P/'base-source'/n).read_text()if n in base else '';after=(P/'source'/n).read_text()
  patch+=''.join(difflib.unified_diff(old.splitlines(True),after.splitlines(True),fromfile='a/'+n if n in base else '/dev/null',tofile='b/'+n))
 assert patch==(P/'source.patch').read_text()
 assert base['Cargo.lock']==new['Cargo.lock'] and base['Cargo.toml']==new['Cargo.toml']
 # Actual upstream source authentication and exact preserved owned declarations.
 archive=P/'upstream/anchor-lang-0.31.1.crate';assert H(archive.read_bytes())=='e6bab117055905e930f762c196e08f861f8dfe7241b92cee46677a3b15561a0a'
 with tarfile.open(archive)as t:assert t.extractfile('anchor-lang-0.31.1/src/error.rs').read()==(P/'upstream/anchor-error.rs').read_bytes()
 upstream=(P/'upstream/anchor-error.rs').read_text();newtext=(P/'source/src/exit_error.rs').read_text()
 for declaration in ['pub enum Error {','pub struct ProgramErrorWithOrigin {','pub enum ComparedValues {','pub enum ErrorOrigin {','pub struct AnchorError {','pub struct Source {']:
  start=upstream.index(declaration);end=upstream.index('\n}',start)+2;assert upstream[start:end]in newtext,declaration
 assert 'repr('not in newtext and '#[inline'not in newtext
 s=(P/'source/src/generated_exit.rs').read_text();assert 'write(data).map_err(|error| {drop(error);write_error()})'in s
 assert 'r.map_err(|e| e.with_account_name(name))'in s
 assert 'Failure::Exit(e)=>e.log(),'in (P/'source/src/error_report.rs').read_text()
 assert 'Failure::Exit(e)=>e.into(),'in (P/'source/src/error_report.rs').read_text()
 if args.repo:
  b=args.repo/'repro/donation-relay/source-build-06-bpf-writer'
  for n,h in base.items():assert H((b/'source'/n).read_bytes())==h,n
  for n in ['original.so','candidate.so','unstripped.so','manifest.json']:assert (b/n).read_bytes()==(P/'inputs/build06'/n).read_bytes(),n
  assert (args.repo/'repro/donation-relay/build06-ordinary12/manifest.json').read_bytes()==(P/'inputs/ordinary12/manifest.json').read_bytes()
 print(json.dumps({'status':'PASS','payloads':len(m['files']),'base_inputs':22,'proposal_inputs':23,'source_paths_changed':4,'builds':0,'new_runtime_cases':0}))
if __name__=='__main__':verify()
