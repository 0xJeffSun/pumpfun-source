from pathlib import Path
import subprocess,shutil,json,hashlib
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'); C='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'; P=Path('publication');P.mkdir(exist_ok=True)
shutil.copytree(R/'work/cli-swarm-2026-10-25/pump_buy_composition_review/publication',P/'review',dirs_exist_ok=True)
inputs=[]
def get(src,dst):
 b=subprocess.check_output(['git','-C',str(R),'show',C+':'+src]);p=P/dst;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);inputs.append(dict(source=src,commit=C,path=dst,sha256=hashlib.sha256(b).hexdigest(),size=len(b)))
for f in ['lib.rs','trade.rs','trade_types.rs']:get('programs/pump/src/'+f,'inputs/current/'+f)
for f in ['Cargo.toml','Cargo.lock']:get('programs/pump/'+f,'inputs/current/'+f)
for f in ['COMPLETION.md','PARALLEL_WORK.md']:get('docs/'+f,'inputs/docs/'+f)
for name in ['anchor-syn-0.31.2','anchor-lang-0.31.1']:
 get('repro/pump_fees/donation-business-source-proposal/inputs/archives/'+name+'.crate','inputs/'+name+'.crate')
(P/'inputs.json').write_text(json.dumps(inputs,indent=2)+'\n')
