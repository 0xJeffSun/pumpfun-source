from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,sys,json,lzma,hashlib
R=Path.cwd();W=R/'work/mayhem-legacy-sell-next'
# The already compiled seed control is byte-bound; final repeats are compared
# against it independently before accepting these observations.
def run(role):
 d=W/'runtime'/role;d.mkdir(parents=True,exist_ok=False)
 binary=W/('baseline' if role=='control' else 'inline-seeds')/'build/candidate.so'
 cmd=[sys.executable,'-B',str(R/'scripts/mayhem_sell_differential.py'),'--candidate',str(binary),'--output',str(d/'sell.json')]
 (d/'command.json').write_text(json.dumps(cmd,indent=2)+'\n')
 with (d/'run.log').open('w') as log:r=subprocess.run(cmd,stdout=log,stderr=log)
 assert r.returncode==0
 cmd=[sys.executable,'-B',str(R/'scripts/verify_mayhem_sell.py'),'--candidate',str(binary),'--receipts',str(d/'sell.json'),'--output',str(d/'independent-verification.json')]
 (d/'check-command.json').write_text(json.dumps(cmd,indent=2)+'\n')
 with (d/'check.log').open('w') as log:r=subprocess.run(cmd,stdout=log,stderr=log)
 assert r.returncode==0
 report=json.loads((d/'sell.json').read_bytes());(d/'sell.json.xz').write_bytes(lzma.compress((json.dumps(report,separators=(',',':'))+'\n').encode()))
 print(role,report['case_count'],report['successful_original_cases'],report['mismatches'],flush=True)
with ThreadPoolExecutor(max_workers=2) as e:list(e.map(run,['control','candidate']))
