from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tarfile,importlib.util
R=Path.cwd();W=R/'work/pump-final-error-metadata-build';P=R/'work/pump-final-error-metadata/publication';B=R/'repro/pump/nested-general-route-fortyeight';T=R/'work/pump-nested-general-route-build-preflight'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert not (W/'source').exists()
assert H(P/'manifest.json')=='1771c21aedc459181abcf8ac4c664512cbc38731e930ec99a0d9bbc498f0fce9'
r=subprocess.run([sys.executable,'-B',str(P/'verify.py'),'--repo',str(R)],text=True,capture_output=True);(W/'proposal-verification.stdout').write_text(r.stdout);(W/'proposal-verification.stderr').write_text(r.stderr);assert r.returncode==0
base=J(P/'inputs/source-sha256.json');assert len(base)==37 and base==J(B/'source-sha256.json') and {n:H(R/n)for n in base}==base
shutil.copytree(P,W/'approved-proposal');shutil.copytree(P/'inputs/source',W/'source')
changes=J(P/'proposal-source-map.json')
for n,v in changes.items():
 assert H(W/'source'/n)==v['before_sha256'];shutil.copyfile(P/'proposal'/n,W/'source'/n);assert H(W/'source'/n)==v['after_sha256']
source={n:H(W/'source'/n)for n in base};assert len(changes)==4 and {n for n in base if base[n]!=source[n]}==set(changes)
save('baseline-source-sha256.json',base);save('source-sha256.json',source);save('source-change-map.json',changes)
for n in ['tools-observed.json','sdk-source-sha256.json','build-helper-sha256.json']:(W/n).write_bytes((T/n).read_bytes())
(W/'baseline-dependency-provenance.json.gz').write_bytes((B/'baseline-dependency-provenance.json.gz').read_bytes())
shutil.copytree(T/'build-helpers',W/'build-helpers')
spec=importlib.util.spec_from_file_location('closure',R/'scripts/build_source_manifest.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
actual=m.source_manifest(W/'source/programs/pump',W/'source/programs/pump',R);assert len(actual)==37 and {n[n.index('programs/pump/'):]:h for n,h in actual.items()}==source
save('actual-source-sha256.json',actual)
save('baseline.json',{'git_revision_observed':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'candidate_path':str(B/'candidate.so'),'candidate_sha256':H(B/'candidate.so'),'symbols_sha256':H(B/'unstripped.so'),'source_inputs':37,'documentation_separate':{'programs/pump/README.md':H(R/'programs/pump/README.md')},'proposal_seal':H(P/'manifest.json'),'scope':'Approved exact four-file metadata separation only; no source/runtime investigation of excluded lanes; no compatibility Buy mux.'})
for kind,path in [('source','source'),('approved-proposal','approved-proposal')]:
 with tarfile.open(W/(kind+'-snapshot.tar.gz'),'w:gz')as t:
  for p in sorted((W/path).rglob('*')):
   if p.is_file():
    assert not p.name.endswith('-keypair.json') and not p.is_symlink();t.add(p,arcname=p.relative_to(W/path),recursive=False)
print(json.dumps({'prepared':True,'inputs':len(actual),'changed':list(changes),'proposal_returncode':r.returncode}))
