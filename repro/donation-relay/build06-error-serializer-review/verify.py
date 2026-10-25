#!/usr/bin/env python3
"""Portable static verifier: no build, signer, VM, or target execution."""
import argparse,hashlib,json,tarfile,tomllib
from pathlib import Path
from review import generate
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args()
 m=json.loads((P/'manifest.json').read_text());assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q not in [P/'manifest.json',P/'manifest.sha256']and '__pycache__' not in q.parts}
 assert actual==set(m['files']),('inventory',actual^set(m['files']))
 for n,h in m['files'].items():assert H((P/n).read_bytes())==h,n
 for n,v in generate().items():
  expected=v if isinstance(v,str) else json.dumps(v,sort_keys=True,indent=2)+'\n'
  assert (P/n).read_text()==expected,('recomputation',n)
 for n,h in json.loads((P/'inputs/build06/launcher/resolved-source-sha256.json').read_text()).items():assert H((P/'source'/n).read_bytes())==h,n
 pins={'original.so':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','candidate.so':'522a9799bc3f73872333a16f3c95836ccfdcb816e80f159c7fc3dafa726e4fd4','unstripped.so':'09e8293709f5577e8fff5ff718a6ae746080ef9d0d898b1153ac36c9f62f4a76'}
 for n,h in pins.items():assert H((P/'inputs/build06'/n).read_bytes())==h,n
 provenance=json.loads((P/'upstream/provenance.json').read_text())
 for n,v in provenance['platform_tools']['selected_members'].items():assert H((P/v['copy']).read_bytes())==v['sha256']
 lock=tomllib.loads((P/'source/Cargo.lock').read_text());pkg=next(x for x in lock['package'] if x['name']=='solana-program-entrypoint')
 crate=P/'upstream/solana-program-entrypoint-2.3.0.crate';assert H(crate.read_bytes())==pkg['checksum']
 with tarfile.open(crate)as t:assert t.extractfile('solana-program-entrypoint-2.3.0/src/lib.rs').read()==(P/'upstream/entrypoint.rs').read_bytes()
 with tarfile.open(P/'inputs/build06/proposal/upstream/anchor-lang-0.31.1.crate')as t:
  for n in ['src/bpf_writer.rs','src/accounts/account.rs','src/error.rs']:
   assert t.extractfile('anchor-lang-0.31.1/'+n).read()==(P/('upstream/anchor-'+n.replace('/','-'))).read_bytes()
 assert (P/'source/src/bpf_writer.rs').read_bytes()==(P/'upstream/anchor-src-bpf_writer.rs').read_bytes()
 if args.repo:
  for n,v in json.loads((P/'input-bindings.json').read_text()).items():
   if not n.startswith('work/'):
    assert H((args.repo/n).read_bytes())==v['sha256'],n
 print(json.dumps({'status':'PASS','payloads':len(m['files']),'static_only':True,'source_inputs':22,'new_runtime_cases':0,'source_changes':0}))
if __name__=='__main__':main()
