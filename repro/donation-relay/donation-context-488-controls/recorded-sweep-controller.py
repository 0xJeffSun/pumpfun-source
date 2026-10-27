from pathlib import Path
import itertools,json,hashlib,importlib.util,re,subprocess,sys,time
P=Path(__file__).resolve().parent;R=P.parents[1]
spec=importlib.util.spec_from_file_location('context_parent',R/'repro/donation-relay/donation-close-order-controls/verify.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
base=m.sources()['after-close'];name='src/donation_handlers.rs';original=base[name].decode();H=lambda b:hashlib.sha256(b).hexdigest()
pattern=r'debouncer_token_account:accounts.debouncer_token_account.to_account_info\(\),mint:accounts.mint.to_account_info\(\),from_token_account:accounts.(?:temp_wsol_token_account|from_token_account).to_account_info\(\),token_program:accounts.token_program.to_account_info\(\),'
assert len(re.findall(pattern,original))==5
for order in itertools.permutations('dmfp'):
 label='context-'+''.join(order);q=P/label
 if (q/'result.json').exists():continue
 q.mkdir(exist_ok=True)
 def replace(match):
  fields=match[0].rstrip(',').split(',');d=dict(zip('dmfp',fields));return ','.join(d[k]for k in order)+','
 text,count=re.subn(pattern,replace,original);assert count==5
 source=dict(base,**{name:text.encode()});inputs={}
 for n,raw in source.items():
  dst=q/'source'/n;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(raw);inputs[n]=H(raw)
 (q/'source-inputs.json').write_text(json.dumps(inputs,indent=2,sort_keys=True)+'\n')
 with (q/'runner.log').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'run_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
 with (q/'analysis-output.json').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'analyze_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
 import gzip
 s=json.loads(gzip.decompress((q/'comparison-summary.json.gz').read_bytes()))
 print(label,s['original_normalized_match_windows'],s['original_raw_match_windows'],flush=True)
 if s['original_normalized_match_windows']>488:
  print('GAIN: stopping for independent validation',flush=True);break
