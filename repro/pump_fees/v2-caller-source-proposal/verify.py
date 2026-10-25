#!/usr/bin/env python3
"""Portable static verifier. Reads only its own exact public package."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import json,hashlib,difflib,subprocess,tarfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 assert H((P/'manifest.json').read_bytes())==(P/'MANIFEST.sha256').read_text().split()[0], 'manifest seal'
 actual=set()
 for p in P.rglob('*'):
  assert not p.is_symlink(),f'symlink: {p}'
  if p.is_file():actual.add(p.relative_to(P).as_posix())
 assert actual==set(manifest)|{'manifest.json','MANIFEST.sha256'},'exact publication set'
 for name,h in manifest.items():
  assert not Path(name).is_absolute() and '..' not in Path(name).parts
  assert H((P/name).read_bytes())==h,f'hash: {name}'
 assert H((P/'baseline/sharing_update.rs').read_bytes())=='94a11c22bc952b060119212b7982e638f8faf56af5e565e15234f88283766956'
 assert H((P/'baseline/handoff-manifest.json').read_bytes())=='56fcdea691bae6dacc004dfe65fe0bd6835a7ed8edea60942e3f5e2e639864dc'
 for name,d in json.loads((P/'origins.json').read_text()).items():assert H((P/name).read_bytes())==d['sha256'],f'origin: {name}'
 b=(P/'baseline/sharing_update.rs').read_text();a=b.index(' pub fn update_fee_shares_v2');z=b.index('\nfn legacy_curve_quote_is_zero',a)
 s=b[:a]+(P/'fragments/v2-handler.rs').read_text()+b[z:]+'\n'+(P/'fragments/v2-payout.rs').read_text()+'\n'+(P/'fragments/v2-adapters.rs').read_text()
 assert s==(P/'proposal/sharing_update.rs').read_text(),'source composition/preserved spans'
 patch=''.join(difflib.unified_diff(b.splitlines(True),s.splitlines(True),fromfile='a/programs/pump-fees/src/sharing_update.rs',tofile='b/programs/pump-fees/src/sharing_update.rs'))
 assert patch==(P/'proposal/v2-only.patch').read_text(),'exact patch'
 facts=json.loads((P/'preservation.json').read_text())
 assert facts['prefix_sha256']==H(b[:a].encode()) and facts['suffix_sha256']==H(b[z:].encode())
 assert facts['existing_cases_required']==17461 and facts['sharing_rows_required']==417 and facts['executed_here']==0 and facts['receipt_transfer'] is False
 base=json.loads((P/'baseline/pump.json').read_text());ix=json.loads((P/'bindings/pump-v2-instruction.json').read_text());base['instructions'].append(ix)
 assert base==json.loads((P/'proposal/pump.json').read_text()),'V2-only IDL addition'
 amm=json.loads((P/'baseline/pump_amm.json').read_text())
 assert next(i for i in amm['instructions'] if i['name']=='transfer_creator_fees_to_pump_v2')==json.loads((P/'bindings/pump_amm-v2-instruction.json').read_text())
 with tarfile.open(P/'evidence/legacy-caller-reviewed-proposal/framework/anchor-lang-0.31.1.crate') as t:
  assert t.extractfile('anchor-lang-0.31.1/src/error.rs').read()==(P/'bindings/anchor-error.rs').read_bytes()
 from review import review
 assert review()==json.loads((P/'review.json').read_text()),'regenerated original static review'
 # Verify all named generated fields, independent of field declaration positions.
 import re
 handler=(P/'fragments/v2-handler.rs').read_text()
 for prog,ty in [('pump','DistributeCreatorFeesV2'),('pump_amm','TransferCreatorFeesToPumpV2')]:
  obj=re.search(r'crate::'+prog+r'::cpi::accounts::'+ty+r' \{(.*?)\n\s*\}',handler,re.S).group(1)
  pairs=dict(re.findall(r'(\w+): ctx.accounts.(\w+).to_account_info\(\)',obj))
  row=next(r for r in review()['bindings'] if r['program']==prog)
  assert pairs=={a['idl_name']:a['proposal_context_field'] for a in row['fixed_accounts']},'named CPI bindings'
 for name in ['v2-payout-contract','nonzero-quote-payout-contract','remaining-preprocess-source-proposal','legacy-caller-reviewed-proposal']:
  result=subprocess.run([sys.executable,'-B',str(P/'evidence'/name/'verify.py')],cwd=P/'evidence'/name,text=True,capture_output=True)
  assert result.returncode==0,(name,result.stdout,result.stderr)
 print('PASS: exact public seal; frozen baseline; unchanged legacy/helpers/contexts; V2-only source/IDL composition; actual static CPI/data witnesses; four preserved predecessor verifiers. No build/runtime/identity claim.')
if __name__=='__main__':main()
