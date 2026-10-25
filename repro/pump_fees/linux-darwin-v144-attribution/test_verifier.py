#!/usr/bin/env python3
"""Small portable verifier tests; mutate only disposable JSON evidence copies."""
from pathlib import Path
import hashlib, json, shutil, subprocess, sys, tempfile

ROOT=Path(__file__).resolve().parent

def main():
    results=[]
    with tempfile.TemporaryDirectory(prefix='fees-static-attribution-') as tmp:
        copy=Path(tmp)/'package'
        shutil.copytree(ROOT,copy,ignore=shutil.ignore_patterns('__pycache__'))
        def run(name,expected):
            p=subprocess.run([sys.executable,'-B',str(copy/'verify.py')],cwd=tmp,text=True,capture_output=True)
            assert (p.returncode==0)==expected,(name,p.stdout,p.stderr)
            results.append({'name':name,'passed':True,'verifier_accepted':p.returncode==0,
                            'stdout':json.loads(p.stdout) if expected else None,
                            'rejection':p.stderr.splitlines()[-1] if not expected else None})
        run('copied_package_outside_repository',True)
        path=copy/'analysis/summary.json';saved=path.read_bytes();path.unlink()
        run('missing_analysis_rejected',False);path.write_bytes(saved)
        path=copy/'analysis/linux-path-improvements.json';saved=path.read_bytes();path.write_bytes(saved+b'\n')
        run('tampered_analysis_rejected',False);path.write_bytes(saved)
        run('restored_copy_accepted',True)
    print(json.dumps({'tested_seal_sha256':hashlib.sha256((ROOT/'manifest-sha256.json').read_bytes()).hexdigest(),
                      'tests':results,'elf_bytes_modified':False,'network_requests':0},indent=2))

if __name__=='__main__':main()
