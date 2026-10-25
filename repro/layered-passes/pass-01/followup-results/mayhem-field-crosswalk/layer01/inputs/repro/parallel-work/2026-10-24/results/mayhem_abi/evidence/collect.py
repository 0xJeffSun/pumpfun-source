from pathlib import Path
import json,hashlib,shutil
ROOT=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source')
OUT=Path(__file__).resolve().parent
items={
'inventory.json':'work/fees-mayhem-function-inventory/mayhem-functions.json',
'inventory-report.md':'work/fees-mayhem-function-inventory/REPORT.md',
'abi-analysis.json':'work/mayhem-error-abi-provenance/analysis.json',
'abi-report.md':'work/mayhem-error-abi-provenance/REPORT.md',
'codec-analysis.json':'work/mayhem-burn-codec-followup/analysis.json',
'codec-report.md':'work/mayhem-burn-codec-followup/REPORT.md',
'field-crosswalk.json':'repro/mayhem/field-role-crosswalk/crosswalk.json',
'field-inputs.json':'repro/mayhem/field-role-crosswalk/inputs.json',
'source-snapshot.tar.gz':'repro/mayhem/twentyfour/source-snapshot.tar.gz',
'build-comparison.json':'repro/mayhem/twentyfour/build-comparison.json',
'lib.rs':'programs/mayhem/src/lib.rs',
'completion.md':'docs/COMPLETION.md',
'status.json':'repro/status.json',
}
for f in ['original.so','candidate.so','anchor-error-1.0.0.rs','official-anchor-error-1.0.0.rs','official-anchor-source-provenance.json','anchor-error-codegen-1.0.0.rs','reference-anchor-error-0.31.1.rs','platform-v1.52-fmt.rs']:
 items[f]='work/mayhem-error-abi-provenance/inputs/'+f
for f in ['burn','buy','sell','buy_v2','sell_v2','buy_pump_swap','sell_pump_swap']:
 items[f+'.rs']='programs/mayhem/src/instructions/'+f+'.rs'
(OUT/'inputs').mkdir(exist_ok=True)
manifest=[]
for name,src in items.items():
 data=(ROOT/src).read_bytes(); dest='inputs/'+name
 (OUT/dest).write_bytes(data)
 manifest.append(dict(source=src,copy=dest,bytes=len(data),sha256=hashlib.sha256(data).hexdigest()))
(OUT/'inputs.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Frozen',len(manifest),'inputs')
