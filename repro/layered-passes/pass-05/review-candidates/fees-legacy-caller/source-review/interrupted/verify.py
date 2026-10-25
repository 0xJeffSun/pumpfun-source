#!/usr/bin/env python3
"""Standalone package verifier. Reads bytes/source only; never runs a target."""
import difflib,hashlib,json,subprocess,sys
from pathlib import Path
from analyze import analyze
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 manifest=json.loads((P/'manifest.json').read_text())
 files={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
 assert not any(p.is_symlink() for p in P.rglob('*')), 'symlinks not admitted'
 assert files==set(manifest)|{'manifest.json','MANIFEST.sha256'}, 'unexpected/missing package file'
 for name,h in manifest.items():assert H((P/name).read_bytes())==h, 'hash mismatch: '+name
 seal=''.join(f'{h}  {n}\n' for n,h in sorted({**manifest,'manifest.json':H((P/'manifest.json').read_bytes())}.items()))
 assert (P/'MANIFEST.sha256').read_text()==seal, 'seal mismatch'
 owned=json.loads((P/'OWNEDMAP.json').read_text())
 assert set(owned['files'])==files, 'owned file set mismatch'
 # Revalidate the complete prior package rather than silently resealing old claims.
 subprocess.run([sys.executable,'-B',str(P/'evidence/preprocess/verify.py')],check=True,stdout=subprocess.PIPE,text=True)
 pm=json.loads((P/'evidence/payout/manifest.json').read_text())
 # Payout manifest convention is inspected rather than assumed.
 if 'files' in pm:pm=pm['files']
 for f in (P/'evidence/payout').rglob('*'):
  if f.is_file() and f.name!='manifest.json':
   name=f.relative_to(P/'evidence/payout').as_posix()
   expected=pm[name]
   if isinstance(expected,dict):expected=expected['sha256']
   assert H(f.read_bytes())==expected, 'prior payout seal: '+name
 assert analyze()==json.loads((P/'static-evidence.json').read_text()), 'static evidence changed'
 base=(P/'evidence/preprocess/inputs/source/programs/pump-fees/src/sharing_update.rs').read_text()
 proposed=(P/'proposal/sharing_update.rs').read_text()
 # Unchanged V2, shared original helpers, both account contexts and event declaration.
 untouched=base[base.index(' pub fn update_fee_shares_v2<'):]
 assert untouched in proposed
 prefix=base[:base.index('pub fn update_fee_shares<')]
 assert proposed.startswith(prefix)
 diff=''.join(difflib.unified_diff(base.splitlines(True),proposed.splitlines(True),fromfile='a/programs/pump-fees/src/sharing_update.rs',tofile='b/programs/pump-fees/src/sharing_update.rs'))
 assert diff==(P/'proposal/legacy-composition.patch').read_text(), 'patch/source disagreement'
 stages=['let quote_is_zero','require!(quote_is_zero','version!=1','legacy_authorize(','ctx.remaining_accounts = preprocess_remaining(','if ctx.accounts.bonding_curve.real_sol_reserves','let payout_accounts = legacy_payout_accounts(','if !payout_accounts.is_empty()','legacy_validate_shares(&shareholders)','state.shareholders=shareholders.clone()','Clock::get()?']
 body=proposed[proposed.index('pub fn update_fee_shares<'):proposed.index(' pub fn update_fee_shares_v2<')]
 positions=[body.index(s) for s in stages]
 assert positions==sorted(positions)
 assert 'validate_remaining(' not in body
 evidence=json.loads((P/'static-evidence.json').read_text())
 ins={q['pc']:q for w in evidence['windows']['original'] for q in w['instructions']}
 bindings=json.loads((P/'context-bindings.json').read_text())
 raw=(P/'evidence/preprocess/inputs/original.so').read_bytes()
 for b in bindings['fields']:
  assert raw[b['name_address']:b['name_address']+len(b['name'])]==b['name'].encode()
  if 'final_store_pc' in b:
   q=ins[b['final_store_pc']]
   assert q['opcode']==0x7b and q['dst']==6 and q['offset']==b['offset']
 print('PASS: exact public files and prior seals; 26-source 8ff12 binding; regenerated static windows/calls/data; legacy-only source patch and stage order. No compile/runtime claim.')
if __name__=='__main__':verify()
