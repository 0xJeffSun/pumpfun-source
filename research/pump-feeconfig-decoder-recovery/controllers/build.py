from pathlib import Path
import json,hashlib,subprocess,shutil,datetime
W=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder/native-amm-cache')
D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inventory=lambda p:{q.relative_to(p).as_posix():sha(q) for q in p.rglob('*') if q.is_file()}
base=json.loads((W/'baseline/launch.json').read_text())
sdk=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk')
tools={n:sha(sdk/p) for n,p in [('rustc','rust/bin/rustc'),('cargo','rust/bin/cargo'),('objcopy','llvm/bin/llvm-objcopy')]};assert tools==base['tools']
for label,source in [('baseline780',D/'source780'),('local-feeconfig',D/'source-local-feeconfig')]:
 out=D/label;out.mkdir(exist_ok=False)
 cmd=[x.replace('source='+str(W/'source')+',','source='+str(source)+',') for x in base['command']]
 inputs=inventory(source);deps={q.relative_to(W/'target').as_posix():sha(q) for q in (W/'target').rglob('*') if q.is_file() and q.suffix in ['.rlib','.rmeta','.a','.so'] and 'pump_recovered' not in q.name}
 (out/'launch.json').write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'inputs':inputs,'dependencies':deps,'tools':tools,'controller_sha256':sha(Path(__file__)),'hypothesis':'Separate route-local FeeConfig from the generated external IDL account type, retaining identical fields/order/Borsh methods. The original external unchecked decoder has inlined field reads, while the candidate shares one reader across external decoding, RouteFeeConfig and buy_exact_quote.'},indent=2)+'\n')
 with (out/'build.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
 result={'returncode':r.returncode,'source_unchanged':inventory(source)==inputs,'dependencies_unchanged':all(sha(W/'target'/k)==v for k,v in deps.items())}
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');r.check_returncode();assert result['source_unchanged'] and result['dependencies_unchanged']
 shutil.copyfile(W/'target/sbf-solana-solana/release/pump_recovered.so',out/'symbols.so')
 subprocess.run([str(sdk/'llvm/bin/llvm-objcopy'),'--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
 result.update(symbols_sha256=sha(out/'symbols.so'),candidate_sha256=sha(out/'candidate.so'))
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(label,json.dumps(result),flush=True)
