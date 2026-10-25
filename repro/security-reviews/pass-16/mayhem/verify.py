from pathlib import Path
import argparse,json,hashlib,re
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--current-source',type=Path);args=a.parse_args()
for n,h in J(P/'review-source-sha256.json').items():
 assert H(P/'source'/n)==h,n
 if args.current_source:assert H(args.current_source/n)==h,n
m=J(P/'compiled-source-sha256.json');assert len(m)==14 and m==J(P/'evidence/main-acceptance-inputs.json')['compiled_source']
for n,h in J(P/'dependency-source-sha256.json').items():assert H(P/'dependencies'/n)==h,n
s=(P/'source/programs/mayhem/src/lib.rs').read_text();names=set(re.findall(r'    pub fn (\w+)',s));rows=J(P/'coverage.json');included=[x for x in rows if x['evidence_class']=='runtime-bounded'];excluded=[x for x in rows if x['evidence_class']=='excluded-opaque'];assert len(included)==24 and {x['instruction']for x in included}==names
assert len(excluded)==1 and excluded[0]['instruction']=='initialize_mayhem_state'and excluded[0]['body']is None
for x in included:
 for k in ['entry','body','context']:
  r=x[k];assert 0<r['line']<=len((P/'source'/r['path']).read_text().splitlines())
assert 'ctx.accounts.global_params.admin = ctx.accounts.admin.key()'in s
for n in ['buy.rs','buy_v2.rs','buy_pump_swap.rs']:
 q=(P/'source/programs/mayhem/src/instructions'/n).read_text();assert ' as u64,BuyError::'in q and '10_000u16-retained_reserve_bps'in q
# Mathematical truncation identity, no account or transaction execution.
assert ((1<<64)+1)&((1<<64)-1)==1
if(P/'manifest.json').exists():
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'compiled_inputs':14,'reviewed_entries':24,'excluded_opaque_entries':1,'new_builds':0,'target_or_dependency_execution':0,'deployed_vulnerability_claims':0}))
