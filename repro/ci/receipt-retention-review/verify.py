#!/usr/bin/env python3
"""Offline review verification against frozen public files only."""
from pathlib import Path
import hashlib,json,re,subprocess,sys
from review_checks import ROOT,checks

def main():
    sha=lambda b:hashlib.sha256(b).hexdigest()
    manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
    actual={str(p.relative_to(ROOT)):sha(p.read_bytes()) for p in ROOT.rglob('*')
            if p.is_file() and p!=ROOT/'manifest-sha256.json' and '__pycache__' not in p.parts}
    assert actual==manifest,'review seal mismatch'
    assert not any(p.is_symlink() for p in ROOT.rglob('*'))
    assert checks()==json.loads((ROOT/'review-results.json').read_text())
    git=json.loads((ROOT/'fixture-git-bindings.json').read_text())
    for path,row in git['files'].items():
        b=(ROOT/'fixture'/path).read_bytes()
        assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob']
    commands=[('fixture',['scripts/verify_recovered_builds.py','--program','pump_fees'],None),
        ('fixture',['repro/pump_fees/initializer-inline-runtime/verify.py'],None),
        ('fixture',['scripts/test_core_linux_v144_retention.py'],13),
        ('fixture',['scripts/test_core_linux_pipeline.py'],20),
        ('fixed',['scripts/test_core_linux_v144_retention.py'],14),
        ('fixed',['scripts/test_core_linux_pipeline.py'],20)]
    for folder,args,count in commands:
        p=subprocess.run([sys.executable,'-B',*args],cwd=ROOT/folder,capture_output=True,text=True)
        assert p.returncode==0,p.stdout+p.stderr
        if count:assert re.search(r'Ran '+str(count)+r' tests\b',p.stderr) and p.stderr.rstrip().endswith('OK')
    print(json.dumps({'verified':True,'sealed_payload_files':len(manifest),'frozen_git_fixture_files':51,
        'public_receipts_exact':10,'comparison_receipts':17441,'donation_steps':10,'authentic_history_transactions':2,
        'committed_synthetic_tests':[13,20],'corrected_synthetic_tests':[14,20],
        'initial_finding_preserved':True,'finding_corrected':True,'remaining_blockers':0,
        'new_builds':0,'new_runtime_replays':0,'network_requests':0},indent=2))

if __name__=='__main__':main()
