#!/usr/bin/env python3
"""Finite saved-verifier gates in a copied minimal Git fixture, never main."""
from pathlib import Path
import json,shutil,subprocess,sys,tempfile
ROOT=Path(__file__).resolve().parent

def check():
    results=[]
    with tempfile.TemporaryDirectory(prefix='sharing-review-fixture-')as temporary:
        repo=Path(temporary)/'repo';shutil.copytree(ROOT/'inputs',repo)
        subprocess.run(['git','init','-q',str(repo)],check=True)
        subprocess.run(['git','-C',str(repo),'add','--all'],check=True)
        assert not(repo/'work').exists()
        def run(name,command,expected):
            p=subprocess.run([sys.executable,'-B',*command],cwd=repo,capture_output=True,text=True)
            assert (p.returncode==0)==expected,(name,p.returncode,p.stdout,p.stderr)
            result={'name':name,'passed':True,'expected_accept':expected,'returncode':p.returncode}
            if not expected:result['rejection_excerpt']='\n'.join(p.stderr.replace(str(repo.resolve()),'FIXTURE').replace(str(repo),'FIXTURE').splitlines()[-2:])
            results.append(result)
        current=['scripts/verify_current_bindings.py','fees'];generic=['scripts/verify_recovered_builds.py','--program','pump_fees']
        run('current tracked fixture',current,True);run('generic direct schema',generic,True)
        cases=[('missing new module','programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs',current,'missing'),('tampered helper','scripts/build_source_manifest.py',current,'tamper'),('missing runtime original','evidence/original/pump_fees/deployed.so',current,'missing'),('missing canonical historical harness','repro/pump_fees/fee-config-serialization-v144/signed_transfers.py',current,'missing'),('missing direct receipt','repro/pump_fees/sharing-module-v144/donation-sequence.json.gz',generic,'missing')]
        for label,name,command,mode in cases:
            p=repo/name;raw=p.read_bytes()
            try:
                if mode=='missing':p.unlink()
                else:p.write_bytes(raw+b'\n# independent fixture mutation\n')
                run(label,command,False)
            finally:p.write_bytes(raw)
        run('restored current tracked fixture',current,True);run('restored generic schema',generic,True)
    return {'minimal_fixture_without_work':True,'main_index_untouched':True,'checks':results,'new_builds':0,'new_runtime_replays':0}
if __name__=='__main__':print(json.dumps(check(),indent=2))
