from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent
m=json.loads((P/'manifest.json').read_text())
assert hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest()==(P/'manifest.sha256').read_text().split()[0]
assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert hashlib.sha256((P/n).read_bytes()).hexdigest()==h,n
r=json.loads((P/'review.json').read_text());c=json.loads((P/'retained-comparison.json').read_text())
assert not c['full_byte_equality'] and r['retained_source_commit']==c['source_commit']
assert r['proposed_source_commit'] in (P/'branch.patch').read_text()
assert r['committed_candidate_build_directories']==['ata-candidate-build-1','ata-candidate-build-2','ata-candidate-build-3','ata-candidate-build-4']
print('PASS: source-history lead preserved; no new successful artifact or recipe proven; no build or execution')
