from pathlib import Path
import subprocess,json,hashlib
ROOT='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source'
REV='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
p=Path('publication'); paths=subprocess.check_output(['git','-C',ROOT,'ls-tree','-r','--name-only',REV],text=True).splitlines()
base='repro/pump/nested-ancestry-fortyeight/'
sel=['docs/COMPLETION.md','docs/PARALLEL_WORK.md','repro/status.json','repro/completion.json','evidence/original/pump/deployed.so','evidence/original/pump/capture.json']
sel += [base+n for n in ['README.md','candidate.so','unstripped.so','elf_reader.py','function-match.json','depth-guard-match.json','current-bindings.json','inputs-before.json','source-sha256.json','main-scratch-identity.json','build-comparison.json','toolchain-phases.json','owned-program-files-sha256.json']]
sel += [x for x in paths if x.startswith('programs/pump/') and (x.endswith('.rs') or x.endswith('Cargo.toml') or x.endswith('Cargo.lock'))]
sel += [x for x in paths if x.startswith(base+'source/')]
sel += [x for x in paths if x.startswith('repro/pump/mayhem-virtual-params-static/') and (x.endswith('.json') or x.endswith('README.md'))]
sel += [x for x in paths if x in ['repro/pump/general-route-focused-comparison/README.md','repro/pump/nested-general-route-build-preflight/README.md','repro/pump/general-route-label-proposal/README.md','repro/pump/buy-v3-source-composition/REPORT.md','repro/pump/wide-runtime-attribution/ledger.json','repro/pump/wide-runtime-attribution/README.md']]
rows=[]
for x in sorted(set(sel)):
 b=subprocess.check_output(['git','-C',ROOT,'show',REV+':'+x]); dest=p/'inputs'/x;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b)
 rows.append(dict(path='inputs/'+x,repository_path=x,revision=REV,sha256=hashlib.sha256(b).hexdigest(),bytes=len(b),git_blob=subprocess.check_output(['git','-C',ROOT,'rev-parse',REV+':'+x],text=True).strip()))
(p/'provenance.json').write_text(json.dumps(dict(revision=REV,files=rows),indent=2)+'\n')
(p/'elf_reader.py').write_bytes((p/'inputs'/base/'elf_reader.py').read_bytes())
print(len(rows),'frozen inputs')
