#!/usr/bin/env python3
"""Verify the bounded source-review checkpoint without target execution."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);args=a.parse_args();R=args.repo.resolve()
seals={'pump':'4ee590011edc5b0aa8fb739121563c8c30a99d015583188649b660819f144589','fees':'62fc1c6a8f7c4903e111574af8c085f133bb65cd275213c6ac1f8da2d6505a4c','amm':'b700e66d59bc09b21c3d6f4d3d2024a6cd15f7d26e49424a2ec0f310d0a84ab3','mayhem':'aae42b90d35b7130963e61617d8852f7e4db2ab3e30ee672e7919349d5dea0c5'}
for name,seal in seals.items():
    q=P/name;assert H(q/'manifest.json')==seal==(q/'manifest.sha256').read_text().split()[0]
    m=J(q/'manifest.json');assert set(m)=={str(f.relative_to(q))for f in q.rglob('*')if f.is_file()and f not in[q/'manifest.json',q/'manifest.sha256']}
    for n,h in m.items():assert not(q/n).is_symlink()and H(q/n)==h,n
    cmd=[sys.executable,'-B',str(q/'verify.py')]
    if name!='amm':cmd+=['--current-source',str(R)]
    subprocess.run(cmd,check=True)
before=J(P/'amm/compiled-source-sha256.json');after=J(R/'repro/pump_amm/claim-overflow-order-main-v144/main/build-comparison.json')['source_sha256']
changed=[n for n in before if before[n]!=after[n]];assert changed==['programs/pump-amm/src/incentives.rs']
for n,h in after.items():assert H(R/n)==h,n
n=changed[0];old=(P/'amm/source'/n).read_text();new=(R/n).read_text()
needle='    u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
replacement='    let total_claimed_tokens=u.total_claimed_tokens+amount;\n    u.total_unclaimed_tokens=0;u.total_claimed_tokens=total_claimed_tokens;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
assert old.count(needle)==1 and old.replace(needle,replacement)==new
assert after==J(R/'repro/pump_amm/claim-overflow-order-v144/proposed-source-sha256.json')
print(json.dumps({'status':'PASS','reports':4,'target_executions':0,'current_compiled_inputs':105,'amm_changed_compiled_inputs':changed,'security_complete':False}))
