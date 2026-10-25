from pathlib import Path
import json,hashlib,re,argparse
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--current-source',type=Path);args=a.parse_args()
m=J(P/'compiled-source-sha256.json');assert len(m)==37 and m==J(P/'evidence/main-identity.json')['source']
for n,h in J(P/'source-view-sha256.json').items():assert H(P/'source-view'/n)==h,n
red=J(P/'redactions.json')
for n in red['opaque_files']:assert not(P/'source-view'/n).exists()
for n,v in red['redacted_files'].items():
 lines=(P/'source-view'/n).read_text().splitlines()
 for start,end in v['line_ranges']:assert all(x=='// OPAQUE: excluded sell/old V3 extension-related closure.'for x in lines[start-1:end])
if args.current_source:
 for n,h in m.items():assert H(args.current_source/n)==h,n
 for n,v in red['redacted_files'].items():
  lines=(args.current_source/n).read_text().splitlines(True)
  for start,end in v['line_ranges']:
   for i in range(start-1,end):lines[i]='// OPAQUE: excluded sell/old V3 extension-related closure.\n'
  assert ''.join(lines)==(P/'source-view'/n).read_text()
for n,h in J(P/'dependency-source-sha256.json').items():assert H(P/'dependencies'/n)==h
rows=J(P/'coverage.json');dispatch=J(P/'dispatch.json');assert len(dispatch)==53 and {x['name']for x in dispatch}=={x['instruction']for x in rows if x['entry']}
assert len(rows)==55
for r in rows:
 if r['body']:
  x=r['body'];assert 0<x['line']<=len((P/'source-view'/x['path']).read_text().splitlines())
if(P/'manifest.json').exists():
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'compiled_inputs':37,'current_dispatch_entries':53,'coverage_rows':55,'excluded_bodies_opaque':True,'new_builds':0,'new_target_executions':0,'deployed_vulnerability_claims':0}))
