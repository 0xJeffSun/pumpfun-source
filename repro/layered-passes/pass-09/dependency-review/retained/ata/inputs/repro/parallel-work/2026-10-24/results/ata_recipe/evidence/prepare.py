from pathlib import Path
import hashlib,json,subprocess
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'); W=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
paths=['docs/COMPLETION.md','repro/status.json','work/dependency-function-gap-inventory/ata-functions.json','work/dependency-function-gap-inventory/elf_reader.py','repro/pump/ata-layout-analysis.json','repro/pump/ata-release-attribution.json','repro/pump/ata-release-v1.1.0.json','repro/pump/dependency-exactness/ata-chronology-candidate.json','evidence/dependencies/associated_token/deployed.so','repro/pump/dependency-exactness/ata-provenance-followup/REPORT.md','repro/pump/dependency-exactness/ata-provenance-followup/evidence.json']
paths += [str(p.relative_to(R)) for p in (R/'work/ata-provenance-followup').iterdir() if p.is_file()]
for i in range(1,6):
 d=R/('repro/pump/ata-candidate-build-'+str(i) if i<5 else 'repro/pump/dependency-exactness/ata-candidate-build-5')
 paths += [str(p.relative_to(R)) for p in d.iterdir() if p.is_file()]
refs=[]
for name in sorted(set(paths)):
 b=(R/name).read_bytes();dst=W/'inputs'/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(b)
 refs.append({'path':name,'bytes':len(b),'sha256':H(b),'tracked':bool(subprocess.run(['git','ls-files','--',name],cwd=R,capture_output=True,text=True).stdout.strip())})
(W/'input-references.json').write_text(json.dumps(refs,indent=2)+'\n')
# Portable adaptation removes only an unused repository-discovery global, not the parser.
s=(W/'inputs/work/dependency-function-gap-inventory/elf_reader.py').read_text()
s='\n'.join(line for line in s.splitlines() if not line.startswith('REPO='))+'\n'
(W/'elf_reader.py').write_text(s)
print('sealed input files',len(refs))
