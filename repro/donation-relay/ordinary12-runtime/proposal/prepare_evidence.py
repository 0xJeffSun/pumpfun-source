#!/usr/bin/env python3
"""One-time public-input capture; no VM or transaction execution."""
import base64,gzip,hashlib,json,shutil
from pathlib import Path
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'work/relay-source-build-04-handoff'
H=lambda b:hashlib.sha256(b).hexdigest()
refs={}
def copy(src,dst):
 src=R/src;dst=P/dst;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst);refs[str(src.relative_to(R))]={'copy':str(dst.relative_to(P)),'sha256':H(src.read_bytes())}
for src,dst in [
 ('evidence/dependencies/donation_relay/deployed.so','artifacts/original.so'),
 ('work/relay-source-build-04-handoff/candidate.so','artifacts/candidate.so'),
 ('evidence/dependencies/spl_token/deployed.so','artifacts/spl_token.so'),
 ('evidence/dependencies/associated_token/deployed.so','artifacts/associated_token.so'),
 ('research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json','inputs/amm-v2-trade-fixture.json'),
 ('repro/pump_fees/donation-business-v144/donation-sequence.json.gz','inputs/donation-sequence.json.gz'),
 ('repro/pump_fees/initializer-history/transactions/admin-success-80.json','inputs/admin-success-80.json'),
 ('repro/pump_fees/initializer-history/transactions/admin-success-81.json','inputs/admin-success-81.json'),
 ('localnet/relay/idl.json','inputs/idl.json'),
 ('localnet/relay/idl-capture.json','inputs/idl-capture.json'),
 ('evidence/dependencies/donation_relay/capture.json','inputs/relay-capture.json'),
 ('work/relay-source-build-04-handoff/manifest.json','inputs/build04-manifest.json'),
 ('work/relay-source-build-04-handoff/source-inputs.json','inputs/build04-source-inputs.json')]:
 if (R/src).is_file():copy(src,dst)
for src in sorted((B/'source').rglob('*')):
 if src.is_file():copy(src.relative_to(R),Path('build04-source')/src.relative_to(B/'source'))
for name in ['README.md','build-assessment.json','diagnostic-gaps.json','corrected-wrapper-correspondence.json']:
 if (B/name).is_file():copy((B/name).relative_to(R),Path('inputs/build04')/name)
# Preserve exact public fixture/harness evidence without running it.
for src in ['scripts/fees_donation_create_differential.py','scripts/fees_donation_crank_probe.py','scripts/fees_donation_sequence.py','localnet/donation_transactions.py']:
 copy(src,Path('inputs/existing-harness')/Path(src).name)
(P/'repository-bindings.json').write_text(json.dumps(refs,indent=2,sort_keys=True)+'\n')
print(json.dumps({'public_files_copied':len(refs),'vm_calls':0,'transaction_execution':0}))
