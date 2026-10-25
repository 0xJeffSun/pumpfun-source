"""UNEXECUTED post-success README and publication operations, no compiler/target."""
from common import *
import argparse
p=argparse.ArgumentParser();p.add_argument('--reviewed-control-sha256',required=True);p.add_argument('--repo',type=Path,required=True);p.add_argument('--apply-readme',action='store_true');p.add_argument('--package',action='store_true');a=p.parse_args();g=control(a.reviewed_control_sha256);M=a.repo.resolve();R=Path(g['original_repo']);C=R/'work/pump-admin-cto-remaining-main-control';B=R/'work/pump-admin-cto-remaining-main';S=Path(g['scratch_package'])
scratch(g);sources(g,M,g['source_proposed37']);external(g,M)
assert J(C/'runner-exit.json')['returncode']==J(C/'build-exit.json')['returncode']==0
outer=J(C/'outer-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed']
i=J(C/'identity.json');assert i['whole_candidate_equal']and i['whole_symbols_equal']
assert (B/'artifacts/pump_recovered.so').read_bytes()==(S/'candidate.so').read_bytes()and(B/'target/sbf-solana-solana/release/pump_recovered.so').read_bytes()==(S/'unstripped.so').read_bytes()
if a.apply_readme:
 record=C/'README-finalized.json';assert not record.exists();assert H(M/'programs/pump/README.md')==i['README_sha256_during_build']
 shutil.copyfile(P/'README.proposed.md',M/'programs/pump/README.md');assert H(M/'programs/pump/README.md')==g['readme_proposed_sha256'];sources(g,M,g['source_proposed37'])
 with record.open('x')as f:f.write(json.dumps({'passed':True,'before_sha256':i['README_sha256_during_build'],'after_sha256':H(M/'programs/pump/README.md'),'only_after_builder_and_identity_success':True,'not_compile_input':True},indent=2)+'\n')
if a.package:
 assert H(M/'programs/pump/README.md')==g['readme_proposed_sha256']and J(C/'README-finalized.json')['passed']
 D=R/'work/pump-admin-cto-remaining-main-publication/public';assert not D.exists();D.mkdir(parents=True)
 def cp(src,n):
  dest=D/n;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dest)
 for src,n in [(B/'artifacts/pump_recovered.so','main/candidate.so'),(B/'target/sbf-solana-solana/release/pump_recovered.so','main/unstripped.so')]:cp(src,n)
 for n in ['build-comparison.json','build-attempt.json','build.log']:cp(B/n,'main/'+n)
 for f in C.iterdir():assert f.is_file()and not f.is_symlink();cp(f,'main/controls/'+f.name)
 for n in g['source_proposed37']:cp(M/n,'main/source/'+n)
 cp(M/'programs/pump/README.md','main/README.final.md');cp(P/'verify-main.py','verify.py');cp(P/'strict_evidence.py','strict_evidence.py');cp(P/'controller.py','main/controller.py');cp(P/'common.py','main/common.py')
 shutil.copytree(P,D/'promotion-control')
 for n in ['manifest.json','manifest.sha256','summary.json','runtime-controls/summary.json','runtime-controls/controller-exit.json','runtime-controls/readonly-after.json','runtime-controls/changed-domain-coverage.json','verification/disposition.json','verification/portability-exit.json']:cp(S/n,'scratch/'+n)
 integration={'candidate_artifact':'repro/pump/remaining-guards-main-fortyeight/main/candidate.so','comparison_report':'repro/pump/remaining-guards-main-fortyeight/main/build-comparison.json','build_log':'repro/pump/remaining-guards-main-fortyeight/main/build.log','candidate_build_identity_report':'repro/pump/remaining-guards-main-fortyeight/main/controls/identity.json','scratch':'repro/pump/remaining-guards-fortyeight','scratch_seal':g['scratch_seal'],'candidate_sha256':g['candidate'],'symbols_sha256':g['symbols'],'source_inputs':37,'README_excluded_from_compile_inputs':True,'validated_cases':9269,'surfpool_comparisons':1024,'targeted_coverage':J(S/'runtime-controls/changed-domain-coverage.json')['counts']}
 (D/'integration.json').write_text(json.dumps(integration,indent=2)+'\n');(D/'README.md').write_text('Portable main identity companion. Actual main compiler/runner exit0 and complete ELF+symbols equal sealed corrective scratch71ec; source37 unchanged during build, README applied only afterward. Run python3 -B verify.py, --expected-seal KNOWNSEAL, optionally --current-root PATH and --scratch PATH. Full receipts/ledgers remain in bound scratch. No target/build execution by verifier. All prior failure and finite coverage limits remain.\n')
 m={str(f.relative_to(D)):{'sha256':H(f),'bytes':f.stat().st_size}for f in sorted(D.rglob('*'))if f.is_file()};assert not any(f.is_symlink()or f.name=='__pycache__'or f.suffix=='.pyc'for f in D.rglob('*'));(D/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(D/'manifest.sha256').write_text(H(D/'manifest.json')+'  manifest.json\n');print(json.dumps({'seal':H(D/'manifest.json'),'files':len(m),'integration':str(D/'integration.json')}))
else:print('PASS postbuild gates; package UNRUN unless --package; README changed only with --apply-readme')
