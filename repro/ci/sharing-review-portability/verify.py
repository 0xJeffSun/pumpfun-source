#!/usr/bin/env python3
"""Replay the unchanged review gates with portable semantic diagnostic comparison."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,subprocess,sys
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
EXPECTED_REVIEW_SEAL='24636578e244543be44009a51602ec2d445abfd93334021163d23508696a34f7'

def module(path,name):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def semantic(result):
    assert result['minimal_fixture_without_work'] and result['main_index_untouched'] and result['new_builds']==result['new_runtime_replays']==0
    rows=[]
    for row in result['checks']:
        assert set(row) <= {'name','passed','expected_accept','returncode','rejection_excerpt'}
        assert row['passed'] is True and (row['returncode']==0)==row['expected_accept']
        rows.append({k:row[k] for k in ['name','passed','expected_accept','returncode']})
    assert len(rows)==9 and sum(not row['expected_accept'] for row in rows)==5
    return {k:result[k] for k in ['minimal_fixture_without_work','main_index_untouched','new_builds','new_runtime_replays']}|{'checks':rows}

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--review',type=Path,default=ROOT.parent/'sharing-module-integration-review');parser.add_argument('--current-repo',type=Path);args=parser.parse_args();review=args.review.resolve()
    correction=json.loads((ROOT/'manifest-sha256.json').read_text())
    assert not any(p.is_symlink()for p in ROOT.rglob('*'))
    assert {str(p.relative_to(ROOT)):H(p.read_bytes())for p in ROOT.rglob('*')if p.is_file()and p!=ROOT/'manifest-sha256.json'and'__pycache__'not in p.parts}==correction
    sealed=(review/'manifest-sha256.json').read_bytes();assert H(sealed)==EXPECTED_REVIEW_SEAL and sealed==(ROOT/'original-review-manifest.json').read_bytes()
    assert not any(p.is_symlink()for p in review.rglob('*'))
    assert {str(p.relative_to(review)):H(p.read_bytes())for p in review.rglob('*')if p.is_file()and p!=review/'manifest-sha256.json'and'__pycache__'not in p.parts}==json.loads(sealed)
    checks=module(review/'checks.py','sharing_original_checks');assert checks.check()==json.loads((review/'check-results.json').read_text())
    recorded=json.loads((review/'fixture-check-results.json').read_text());current=module(review/'fixture_checks.py','sharing_original_fixture_checks').check()
    assert semantic(recorded)==semantic(current)
    commands=[['repro/pump_fees/sharing-module-v144/verify.py'],['scripts/verify_recovered_builds.py','--program','pump_fees']]
    command_results=[]
    for command in commands:
        p=subprocess.run([sys.executable,'-B',*command],cwd=review/'inputs',capture_output=True,text=True)
        assert p.returncode==0,(command,p.stdout,p.stderr);command_results.append({'command':command,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr})
    if args.current_repo:
        repo=args.current_repo.resolve()
        for name,row in json.loads((review/'checked-inputs.json').read_text()).items():assert H((repo/name).read_bytes())==row['sha256'],name
        p=subprocess.run([sys.executable,'-B','scripts/verify_current_bindings.py','fees'],cwd=repo,capture_output=True,text=True);assert p.returncode==0,(p.stdout,p.stderr)
        command_results.append({'command':['scripts/verify_current_bindings.py','fees'],'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr})
    excerpts=lambda result:[{'name':r['name'],'rejection_excerpt':r['rejection_excerpt']}for r in result['checks']if'rejection_excerpt'in r]
    print(json.dumps({'verified':True,'original_review_seal':EXPECTED_REVIEW_SEAL,'original_review_unmodified':True,'semantic_fixture_results':semantic(current),'recorded_rejection_excerpts':excerpts(recorded),'current_rejection_excerpts':excerpts(current),'raw_diagnostics_identical':excerpts(recorded)==excerpts(current),'saved_verifiers':command_results,'current_repository_checked':bool(args.current_repo),'interpreter':sys.executable,'new_builds':0,'new_runtime_replays':0,'remaining_findings':0},indent=2))
if __name__=='__main__':main()
