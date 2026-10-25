from pathlib import Path
import json,gzip,hashlib,tarfile,shutil,platform,subprocess,os
r=Path('work/pump-amm-v144');dest=r/'handoff';b=r/'build-03';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();dest.mkdir(exist_ok=False)
def cp(a,z):z.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,z)
def gz(a,z):z.parent.mkdir(parents=True,exist_ok=True);z.write_bytes(gzip.compress(a.read_bytes(),mtime=0))
comparison=json.loads((b/'build-comparison.json').read_text());candidate=b/'artifacts/pump_amm_recovered.so'
assert not comparison['comparison']['full_byte_equality']
for p,h in comparison['source_sha256'].items():assert sha(Path(p))==h,p
for name in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz']:cp(b/name,dest/name)
gz(b/'build.log',dest/'build.log.gz');cp(candidate,dest/'pump_amm_recovered.so')
for name in ['dependency-pins.json','msrv-evidence.json','lock-diff.json','source-copy-check.json','independent-comparisons.json','independent-compare.py','run-regressions.py','test-source-sha256.json','test-snapshot.tar.gz','inherited-Cargo.lock']:cp(r/name,dest/name)
cp(r/'cargo-home/cache-manifest.json',dest/'cache-manifest.json');cp(r/'results/regression-run.json',dest/'regression-run.json')
tests=json.loads((r/'test-source-sha256.json').read_text())
for p,h in tests.items():assert sha(Path(p))==h,p
rows={}
for p in sorted((r/'results').glob('*.json')):
 if p.name=='regression-run.json':continue
 d=json.loads(p.read_text());assert d['candidate_sha256']==sha(candidate),p;assert not d.get('mismatches',d.get('failures',[])),p;rows[p.stem]=d['case_count'];gz(p,dest/(p.stem+'-differential.json.gz'))
assert len(rows)==21 and sum(rows.values())==14635
for name in ['build','build-02']:
 failed=r/name;out=dest/'failed-attempts'/name;a=json.loads((failed/'build-attempt.json').read_text());assert a['returncode']!=0 and a['source_unchanged']
 with tarfile.open(failed/'source-snapshot.tar.gz') as t:
  for path,h in a['source_sha256'].items():
   member=str(Path(path).relative_to(r/'crate'));assert hashlib.sha256(t.extractfile(member).read()).hexdigest()==h,path
 for fname in ['build-attempt.json','source-snapshot.tar.gz']:cp(failed/fname,out/fname)
 gz(failed/'build.log',out/'build.log.gz')
cp(r/'build-console.log',dest/'failed-attempts/build/console.log')
summary={'scope':'Compiler-family compatibility control for the unchanged published 32-of-38 AMM source; candidate graph pins differ from v1.52. Neither whole-file nor ELF-extent equality established.','candidate_bytes':candidate.stat().st_size,'candidate_sha256':sha(candidate),'source_inputs':len(comparison['source_sha256']),'test_helper_inputs':len(tests),'cache_packages':len(json.loads((r/'cargo-home/cache-manifest.json').read_text())['packages']),'full_byte_equality':False,'validated_cases':sum(rows.values()),'suites':rows,'mismatches':[],'main_source_changed':False,'runtime':{'python':platform.python_version(),'solders':subprocess.check_output([str(Path('work/test-env/bin/python').absolute()),'-c','import solders; print(solders.__version__)'],text=True).strip()}}
(dest/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
