from pathlib import Path
import json,hashlib,shutil,subprocess,difflib,re
root=Path('../../..').resolve(); pub=Path('publication'); pub.mkdir(exist_ok=True)
def put(p,b):
 p=pub/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def js(p,v):put(Path(p),(json.dumps(v,indent=2)+'\n').encode())
def sha(b):return hashlib.sha256(b).hexdigest()
old=json.loads((root/'repro/pump_fees/solana-family-221-v144/source-sha256.json').read_text());assert len(old)==22
inputs={}; checkpoint={}
for name in old:
 b=(root/name).read_bytes();put(Path('before')/name,b);put(Path('after')/name,b)
 historical=subprocess.check_output(['git','-C',str(root),'show','8099031:'+name])
 assert b==historical,name
 inputs[name]={'sha256':sha(b),'bytes':len(b),'accepted_8099031_equal':True,'published_build_snapshot_equal':sha(b)==old[name]}
js('source-inputs.json',inputs)
for name in ['REPORT.md','next-change.json','focused-proof.json','inputs.json']:
 put(Path('evidence/prior-fees-functions')/name,(Path('../fees_functions')/name).read_bytes())
for name in ['original.so','candidate.so']:
 put(Path('evidence')/name,(Path('../fees_functions/inputs')/name).read_bytes())
for name in ['docs/COMPLETION.md','repro/status.json']:
 put(Path('evidence/current-records')/name,(root/name).read_bytes())
put(Path('evidence/published-source-sha256.json'),(root/'repro/pump_fees/solana-family-221-v144/source-sha256.json').read_bytes())
prefix='programs/pump-fees/src/'
blocks=[];moves=[]
for typ,file in [('BuybackVault','buyback.rs'),('SocialFeePda','social.rs'),('DonationFeePda','donation.rs'),('FeeProgramGlobal','types.rs')]:
 name=prefix+file;b=(pub/'before'/name).read_bytes()
 match=re.search(rb'#\[account\]\npub struct '+typ.encode()+rb'\s*\{[^}]*\}\n',b);assert match
 block=match.group();blocks.append(block)
 replacement=f'pub use crate::state::{typ};\n'.encode()
 put(Path('after')/name,b[:match.start()]+replacement+b[match.end():])
 moves.append({'type':typ,'from':name,'before_bytes':[match.start(),match.end()],'before_lines':[b[:match.start()].count(b'\n')+1,b[:match.end()].count(b'\n')],'declaration_sha256':sha(block)})
state=b'use anchor_lang::prelude::*;\n\n'+b'\n'.join(blocks)
put(Path('after')/prefix/'state.rs',state)
for m,block in zip(moves,blocks):
 start=state.index(block);m['after_bytes']=[start,start+len(block)];m['after_lines']=[state[:start].count(b'\n')+1,state[:start+len(block)].count(b'\n')]
lib=Path('after')/prefix/'lib.rs'; b=(pub/lib).read_bytes();assert b.count(b'mod types;\n')==1;put(lib,b.replace(b'mod types;\n',b'mod types;\nmod state;\n'))
js('moves.json',moves)
patch=''
for name in sorted(set(old)|{prefix+'state.rs'}):
 a=(pub/'before'/name);b=(pub/'after'/name)
 patch+=''.join(difflib.unified_diff(a.read_text().splitlines(True) if a.exists() else [],b.read_text().splitlines(True),fromfile='a/'+name if a.exists() else '/dev/null',tofile='b/'+name))
put(Path('source.patch'),patch.encode())
js('provenance.json',{'accepted_checkpoint':'8099031','observed_packaging_head':subprocess.check_output(['git','-C',str(root),'rev-parse','HEAD'],text=True).strip(),'source_inputs':22,'after_inputs':23,'candidate_sha256':sha((pub/'evidence/candidate.so').read_bytes()),'original_sha256':sha((pub/'evidence/original.so').read_bytes()),'builds':0,'runtime_probes':0,'note':'Historical inventory baseline a9c4ea9 predates accepted e501ca2. Prior focused proof is inherited; this verifier checks raw spans, not normalized call closure.'})
print(json.dumps(moves,indent=2))
