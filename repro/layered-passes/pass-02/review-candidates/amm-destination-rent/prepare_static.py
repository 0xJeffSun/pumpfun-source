from pathlib import Path
import json,hashlib,shutil
W=Path(__file__).resolve().parent
Q=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/layered-passes/pass-01/followup-results/amm-transfer-creator')
m=json.loads((Q/'manifest.json').read_text())
files=['layer01/analyze.py','layer01/elf_reader.py','layer01/inputs/repro/pump_amm/update-event-borrow-v144/static-comparison.json','layer01/inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json']
for n in files:
 p=Q/n;row=m['files'][n];h=hashlib.sha256(p.read_bytes()).hexdigest();assert h==(row['sha256'] if isinstance(row,dict)else row)
 d=W/'static-tool'/Path(n).relative_to('layer01');d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,d)
(W/'static-tool-provenance.json').write_text(json.dumps({n:m['files'][n]for n in files},indent=2)+'\n')
