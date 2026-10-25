from pathlib import Path
import json,hashlib,re,argparse
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
p=argparse.ArgumentParser();p.add_argument('--current-source',type=Path);a=p.parse_args()
for n,h in J(P/'source-sha256.json').items():
 assert H(P/'source'/n)==h
 if a.current_source:assert H(a.current_source/n)==h
assert len(J(P/'source-sha256.json'))==26 and J(P/'source-sha256.json')==J(P/'evidence/source-proposed.json')
for n,h in J(P/'dependency-source-sha256.json').items():assert H(P/'dependencies'/n)==h
s=(P/'source/programs/pump-fees/src/lib.rs').read_text();names=set(re.findall(r'    pub fn (\w+)',s));rows=J(P/'coverage.json');assert len(rows)==31 and names=={r['instruction']for r in rows}
for r in rows:
 for k in ['entry','context','body']:
  x=r[k]
  if x:assert 0<x['line']<=len((P/'source'/x['path']).read_text().splitlines())
assert J(P/'evidence/identity.json')['whole_candidate_equal']and J(P/'evidence/identity.json')['whole_symbols_equal']
t=(P/'source/programs/pump-fees/src/types.rs').read_text();assert 'buf.len() >= 4073' in t and 'else { vec![] }' in t
assert 'space = 2512' in(P/'source/programs/pump-fees/src/contexts.rs').read_text()
assert 'tiers[0]'in s and 'after=before.saturating_add(amount)'in(P/'source/programs/pump-fees/src/social.rs').read_text()
# Pure type-size accounting, not an execution fixture.
assert 8+1+32+24+4+4+24==97
assert 97+40*(50+50)==4097 and 97+40*(1+1)<=2512
if (P/'manifest.json').exists():
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'source_files':26,'instruction_paths':31,'source_only':True,'builds':0,'target_executions':0,'original_vulnerability_claims':0}))
