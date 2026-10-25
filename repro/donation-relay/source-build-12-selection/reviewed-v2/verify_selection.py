"""Saved publication/current-selection check, no build or target execution."""
from pathlib import Path
import argparse,json,hashlib
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--checkpoint',type=Path,required=True);a.add_argument('--current-root',type=Path);args=a.parse_args();m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
Q=args.checkpoint.resolve();cm=J(P/'checkpoint-manifest.json');assert H(Q/'manifest.json')==H(P/'checkpoint-manifest.json')=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
assert set(cm)=={str(f.relative_to(Q))for f in Q.rglob('*')if f.is_file()and f not in[Q/'manifest.json',Q/'manifest.sha256']}
for n,h in cm.items():assert not(Q/n).is_symlink()and H(Q/n)==h,n
src=J(P/'source-map.json');assert len(src)==23 and src==J(Q/'launcher/resolved-source-sha256.json')
for n,h in src.items():assert H(Q/'source'/n)==h
c=J(P/'current.proposed.json');assert H(Q/'candidate.so')==c['candidate_sha256'] and H(Q/'unstripped.so')==c['symbols_sha256']and c['full_original_byte_equality']is False
r=J(P/'publication-identity.json');assert r['whole_source_and_artifact_copy_identity']and r['new_compiler_builds']==r['new_runtime_executions']==0
for n,h in r['draft_sha256'].items():assert H(P/n)==h
if args.current_root:
 assert (args.current_root/'repro/donation-relay/current.json').read_bytes()==(P/'current.proposed.json').read_bytes()
 assert (args.current_root/'repro/donation-relay/README.md').read_bytes()==(P/'README.proposed.md').read_bytes()
print(json.dumps({'passed':True,'scope':'publication and optional current selection identity; no main build invented','new_target_executions':0}))
