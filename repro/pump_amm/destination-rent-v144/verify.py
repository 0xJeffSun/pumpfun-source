#!/usr/bin/env python3
"""Offline saved-evidence verification; no build or transaction execution."""
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
from pathlib import Path
sys.dont_write_bytecode=True
if not __debug__:raise SystemExit('Assertions must remain enabled')
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--current-main',action='store_true');args=a.parse_args();R=args.repo.resolve()
def safe(base,n):
 p=Path(n);assert not p.is_absolute()and '..'not in p.parts and 'keypair'not in p.name,n
 q=base/p;assert not any(x.is_symlink()for x in [q,*q.parents] if x!=base.parent),n
 return q
def seal(base,manifest):
 for n,row in manifest['files'].items():
  p=safe(base,n);assert p.is_file()and H(p)==row['sha256']and p.stat().st_size==row['bytes'],n
m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()or p.is_symlink()};assert actual==set(m['files'])|{'manifest.json','manifest.sha256'},'Unexpected or missing publication files'
seal(P,m)
ref=J(P/'scratch-reference.json');S=safe(R,ref['path']);assert H(S/'manifest.json')==ref['manifest_sha256']==H(P/'scratch-manifest.json')=='18f29d2a5208328b63e2123ab026ea270b4236ad6a241fa52fbf0620a9e834c4'
sm=J(P/'scratch-manifest.json');seal(S,sm)
i=J(P/'main-scratch-identity.json');assert J(P/'root-build.stdout')==i and J(P/'build-exit.json')['returncode']==0
for f,k,w in [('candidate.so','candidate','2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706'),('unstripped.so','symbols','3208594d62e12b12399a3a574491cc86893021547dae475d584dba49087d560c')]:
 assert (P/f).read_bytes()==(S/f).read_bytes() and H(P/f)==w==i['main_'+k+'_sha256']==i['scratch_'+k+'_sha256']
assert i['whole_candidate_equal']and i['whole_symbols_equal']and H(P/'build-comparison.json')==i['main_build_report_sha256']
sources=J(P/'source-sha256.json');b=J(P/'build-comparison.json');attempt=J(P/'build-attempt.json')
assert len(sources)==22 and sources==i['main_source']==i['scratch_source']==J(S/'proposed-source-sha256.json')==b['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
assert attempt['returncode']==0 and attempt['source_unchanged']and H(P/'build.log')==b['build_log_sha256']==attempt['build_log_sha256']
for n,h in sources.items():assert H(safe(P/'source',n))==h
before=J(P/'tools-before.json');after=J(P/'tools-after.json');assert all(before[k]==after[k]for k in ['tools','sdk_source'])
assert before==J(S/'tools-before.json')
for n,h in before['sdk_source'].items():assert H(safe(P/'sdk',n))==h
for n,h in J(P/'helpers-after.json').items():assert H(safe(P/'build-helper-snapshot',n))==h==(before['build_helpers'][n]['sha256']if isinstance(before['build_helpers'][n],dict)else before['build_helpers'][n])
assert J(P/'dependency-integrity-before.json')==J(P/'dependency-integrity-after.json')==J(S/'dependency-integrity.json')==J(S/'dependency-integrity-after.json')
ph=J(P/'toolchain-phases.json');assert ph['compiler']['sha256']==b['rustc_sha256'];assert ph['strip']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
for row in J(P/'checker-adaptations.json'):
 old=P/'accepted-checkers'/Path(row['source']).name
 text=old.read_text().replace('scratch/static-reference','static-reference').replace('scratch/inputs/evidence/original/pump_amm/deployed.so','inputs/deployed.so').replace('scratch/inputs/evidence/upstream/pump_amm.json','inputs/pump_amm.json')
 assert H(old)==row['source_sha256']and text==(P/row['adapted']).read_text()
bind=J(P/'main-receipt-bindings.json');assert bind['compiled_source']==sources and bind['main_identity_sha256']==H(P/'main-scratch-identity.json')and bind['main_build_report_sha256']==H(P/'build-comparison.json')and bind['scratch_manifest_sha256']==ref['manifest_sha256']and bind['suites']==J(S/'runtime-01/run.json')
if args.current_main:
 for group,entries in J(P/'current-main-bindings.json').items():
  for n,h in entries.items():assert H(safe(R,n))==h,(group,n)
# Copy only sealed public files. All generated temporary outputs stay beside this verifier.
with tempfile.TemporaryDirectory(prefix='.verify-',dir=P)as tmp:
 T=Path(tmp);C=T/'scratch';C.mkdir()
 for n in list(sm['files'])+['manifest.json','manifest.sha256']:
  d=C/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(safe(S,n),d)
 r=subprocess.run([sys.executable,'-B',str(C/'verify.py')],capture_output=True,text=True,cwd=C);assert r.returncode==0,r.stdout+r.stderr
 print(r.stdout)
 # Checks only read sealed static reports in --verify mode.
 for n in ['verify_serializers.py','static_compare.py','verify_update_data.py']:
  r=subprocess.run([sys.executable,'-B',str(P/n),'--verify'],capture_output=True,text=True,cwd=P);assert r.returncode==0,r.stdout+r.stderr
sys.path.insert(0,str(P/'build-helper-snapshot/scripts'))
from compare import compare
assert compare((P/'inputs/deployed.so').read_bytes(),(P/'candidate.so').read_bytes())==b['comparison']
print(json.dumps({'status':'PASS','whole_main_scratch_executable_equal':True,'whole_main_scratch_symbols_equal':True,'saved_comparisons':17462,'whole_original_equal':False,'current_main_checked':args.current_main,'runtime_replay':False,'build':False},indent=2))
