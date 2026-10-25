from pathlib import Path
import shutil,json,hashlib
R=Path('../../..').resolve(); W=Path.cwd(); (W/'inputs').mkdir(exist_ok=True)
files={'original.so':'evidence/original/pump_fees/deployed.so','candidate.so':'repro/pump_fees/solana-family-221-v144/pump_fees_candidate.so','symbols.so':'repro/pump_fees/solana-family-221-v144/symbol-source.so','baseline.json':'work/fees-mayhem-function-inventory/fees-functions.json','static-gate.json':'repro/pump_fees/solana-family-221-v144/static-gate.json','family.md':'audit/pump_fees/SOLANA_FAMILY_RECOVERY.md','accepted-functions.json.gz':'repro/pump_fees/solana-family-221-v144/function-matches.json.gz'}
for p in (R/'programs/pump-fees/src').glob('*.rs'):files[p.name]=str(p.relative_to(R))
manifest={}
for dest,src in files.items():
 shutil.copyfile(R/src,W/'inputs'/dest);b=(W/'inputs'/dest).read_bytes();manifest[dest]={'origin':src,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
(W/'inputs.json').write_text(json.dumps(manifest,indent=2)+'\n')
s=(R/'work/fees-mayhem-function-inventory/inputs/elf_reader.py').read_text();s='\n'.join('REPO=Path(__file__).resolve().parent' if l.startswith('REPO=') else l for l in s.splitlines())+'\n';(W/'elf_reader.py').write_text(s)
s=(R/'work/fees-mayhem-function-inventory/inventory.py').read_text();a=s.index('def dependencies(');b=s.index('\ndef inventory(');(W/'dependency_reader.py').write_text('import struct\n'+s[a:b]+'\n')
