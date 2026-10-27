from pathlib import Path
import json,hashlib,re,subprocess,sys,gzip
P=Path(__file__).resolve().parent;label='layout-access-control';q=P/label;q.mkdir(exist_ok=True);base=P/'full492/source';src={str(f.relative_to(base)):f.read_bytes()for f in base.rglob('*')if f.is_file()};s=src['src/lib.rs'].decode()
subjects=('close_donation_epoch_v1','swap_then_distribute_v1','just_swap_v1','distribute_after_just_swapping_v1','distribute_non_swap_output_mint_v1','upsert_mint_whitelist_v1')
for name in subjects:
 start=s.index('pub fn '+name);brace=s.index('{',start);check='\n            check_relayer(&ctx.accounts.signer)?;';assert s.startswith(check,brace+1)
 s=s[:brace+1]+s[brace+1:].replace(check,'',1)
 s=s[:start]+'#[access_control(check_relayer(&ctx.accounts.signer))]\n        '+s[start:]
src['src/lib.rs']=s.encode();H=lambda b:hashlib.sha256(b).hexdigest();inputs={}
for n,raw in src.items():
 f=q/'source'/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw);inputs[n]=H(raw)
(q/'source-inputs.json').write_text(json.dumps(inputs,indent=2,sort_keys=True)+'\n')
with (q/'runner.log').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'run_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
with (q/'analysis-output.json').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'analyze_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
print(json.loads(gzip.decompress((q/'comparison-summary.json.gz').read_bytes())))
