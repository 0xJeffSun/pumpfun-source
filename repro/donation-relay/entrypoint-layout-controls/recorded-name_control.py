from pathlib import Path
import json,hashlib,subprocess,sys,gzip
P=Path(__file__).resolve().parent;label='layout-contracts-name';q=P/label;q.mkdir(exist_ok=True)
base=P/'layout-native-entrypoint/source';src={str(f.relative_to(base)):f.read_bytes()for f in base.rglob('*')if f.is_file()}
for n in ['Cargo.toml','Cargo.lock']:src[n]=src[n].replace(b'donation-relay-source-proposal',b'contracts').replace(b'donation_relay_source_proposal',b'contracts')
src['src/lib.rs']=src['src/lib.rs'].replace(b'relay_anchor_idl_reconstruction_probe',b'contracts')
H=lambda b:hashlib.sha256(b).hexdigest();inputs={}
for n,raw in src.items():
 f=q/'source'/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw);inputs[n]=H(raw)
(q/'source-inputs.json').write_text(json.dumps(inputs,indent=2,sort_keys=True)+'\n')
with (q/'runner.log').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'run_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
with (q/'analysis-output.json').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'analyze_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
print(json.loads(gzip.decompress((q/'comparison-summary.json.gz').read_bytes())))
