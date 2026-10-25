from pathlib import Path
import json,hashlib,argparse,re,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--current-source',type=Path);args=a.parse_args()
for n,h in J(P/'review-source-sha256.json').items():
 assert H(P/'source'/n)==h,n
 if args.current_source:assert H(args.current_source/n)==h,n
assert J(P/'compiled-source-sha256.json')==J(P/'evidence/main-acceptance-inputs.json')['source'];assert len(J(P/'compiled-source-sha256.json'))==28
for n,h in J(P/'dependency-source-sha256.json').items():assert H(P/'dependencies'/n)==h
source=P/'source/programs/pump-amm/src';rows=J(P/'coverage.json');names=set(re.findall(r'    pub fn (\w+)',(source/'lib.rs').read_text()));assert len(rows)==38 and names=={x['instruction']for x in rows}
assert len([x for x in rows if x['evidence_class']=='runtime-bounded'])==37 and [x['instruction']for x in rows if x['evidence_class']=='static-only']==['create_config']
for r in rows:
 for k in ['entry','body','context']:
  x=r[k];assert 0<x['line']<=len((P/'source'/x['path']).read_text().splitlines())
assert 'quote.checked_sub(lp_fee)'in(source/'legacy_sell.rs').read_text()
assert 'InsufficientRealQuoteReserves'not in(source/'trade.rs').read_text()and'InsufficientRealQuoteReserves'not in(source/'multi_hop.rs').read_text()
# Formal coefficient check for the retained nominal conservation identity.
vault={'R':1,'Q':-1,'L':1,'P':1,'C':1,'B':-1};liability={'F':1,'P':1,'C':1,'B':-1};free={k:vault.get(k,0)-liability.get(k,0)for k in set(vault)|set(liability)};assert{k:v for k,v in free.items()if v}=={'R':1,'Q':-1,'L':1,'F':-1}
archive=P/'evidence/solana-pubkey-2.4.0.crate';assert H(archive)=='9b62adb9c3261a052ca1f999398c388f1daf558a1b492f60a6d9e64857db4ff1';changed=[]
with tarfile.open(archive)as t:
 for m in t.getmembers():
  if m.isfile():
   n=Path(m.name).relative_to('solana-pubkey-2.4.0');p=P/'source/programs/pump-amm/vendor/solana-pubkey'/n
   if t.extractfile(m).read()!=p.read_bytes():changed.append(str(n))
assert sorted(changed)==['Cargo.toml','src/lib.rs']
if(P/'manifest.json').exists():
 for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
print(json.dumps({'passed':True,'compiled_inputs':28,'runtime_bounded_entries':37,'static_only_entries':1,'new_builds':0,'target_executions':0,'original_exploit_claims':0}))
