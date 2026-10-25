"""Portable stdlib saved-provenance verifier; no Git/network/compiler/runtime."""
from pathlib import Path
import hashlib,json
from analyze import analyze,hunks
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'repro/programs.json').is_file())
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda n:json.loads((P/n).read_text())
m=J('manifest.json');assert {p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and '__pycache__'not in p.parts}==set(m)
for n,h in m.items():assert H(P/n)==h,n
for n,h in J('external-inputs.json').items():assert H(R/n)==h,n
s=analyze();assert s==J('snapshot-analysis.json');assert hunks()==J('recovered-hunk-lineage.json')
assert s['total_distinct_file_snapshots']==91 and s['full_recovered_file_matches']==0
assert len(s['utilize'])==8 and not any(x['zero_use_guard']for x in s['utilize'])
assert len(J('github-utilize-pinned-history.json'))==3 and len(J('github-utilize-oldpath-history.json'))==5
assert J('github-pinned-commit.json')['sha']=='17e99434af5ead3e989c08f32af33609821d0bc0'
d=J('nearby-primary-downloads.json');assert len(d)==105 and sum('sha256'in x for x in d)==87
for x in d:
 if 'sha256'in x:assert H(P/x['saved'])==x['sha256']
 else:assert x['error']=='HTTP Error 404: Not Found'
print(json.dumps(dict(verified=True,public_snapshots=91,utilize_distinct_sources=8,zero_guard_sources_found=0,exact_recovered_file_matches=0,historical_source_identified=False,builds_or_target_executions=0),indent=2))
