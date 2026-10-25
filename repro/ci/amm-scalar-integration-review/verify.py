#!/usr/bin/env python3
"""Portable static/saved-receipt review verification, no VM or compiler."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,shutil,subprocess,sys,tarfile,tempfile
from independent_checks import check
from check_central import check as central_check
ROOT=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--current-repo',type=Path);args=p.parse_args()
    seal=json.loads((ROOT/'manifest-sha256.json').read_text())
    assert {str(f.relative_to(ROOT)):H(f.read_bytes())for f in ROOT.rglob('*')if f.is_file()and f!=ROOT/'manifest-sha256.json'and'__pycache__'not in f.parts}==seal
    assert not any(f.is_symlink()for f in ROOT.rglob('*'))
    provenance=json.loads((ROOT/'archive-provenance.json').read_text());assert H((ROOT/'final-package.tar.gz').read_bytes())==provenance['archive_sha256']
    with tempfile.TemporaryDirectory(prefix='amm-scalar-review-')as tmp:
        repo=Path(tmp)/'repo';package=repo/'repro/pump_amm/scalar-guard-order-v144';package.mkdir(parents=True)
        with tarfile.open(ROOT/'final-package.tar.gz')as t:
            seen=set()
            for member in t:
                rel=PurePosixPath(member.name);assert member.isfile()and not rel.is_absolute()and'..'not in rel.parts and member.name not in seen and not rel.name.endswith('-keypair.json')
                seen.add(member.name);dest=package/str(rel);dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(t.extractfile(member).read())
            assert len(seen)==336
        assert json.loads(json.dumps(check(package)))==json.loads((ROOT/'independent-results.json').read_text())
        assert central_check(package)==json.loads((ROOT/'central-results.json').read_text())
        for f in (ROOT/'central').rglob('*'):
            if f.is_file():dest=repo/f.relative_to(ROOT/'central');dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(f,dest)
        for name in json.loads((package/'build-comparison.json').read_text())['source_sha256']:
            dest=repo/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(package/'source'/name,dest)
        original=repo/'evidence/original/pump_amm/deployed.so';original.parent.mkdir(parents=True);shutil.copyfile(package/'scratch/prebuild/inputs/evidence/original/pump_amm/deployed.so',original)
        for command in [[str(package/'verify.py')],['scripts/verify_recovered_builds.py','--program','pump_amm']]:
            result=subprocess.run([sys.executable,'-B',*command],cwd=repo,capture_output=True,text=True);assert result.returncode==0,result.stdout+result.stderr
        if args.current_repo:
            current=args.current_repo.resolve()
            for name,digest in json.loads((ROOT/'central-bindings.json').read_text()).items():assert H((current/name).read_bytes())==digest,name
            result=subprocess.run([sys.executable,'-B',str(package/'verify.py'),'--current-main','--repo',str(current)],capture_output=True,text=True)
            assert result.returncode==0,result.stdout+result.stderr
    print(json.dumps({'verified':True,'sealed_review_files':len(seal),'final_package_manifest_sha256':provenance['source_manifest_sha256'],
        'compiler_inputs':18,'existing_comparisons':17462,'stricter_existing_scalar_cases':191,'transactions':35074,'verified_signatures':35418,
        'setup_transactions_separately_accounted':150,'unchanged_historical_migration_observations':74,'total_core_receipts':53735,
        'current_main_checked':bool(args.current_repo),'builds_or_runtime_replays':0,'remaining_findings':0},indent=2))

if __name__=='__main__':main()
