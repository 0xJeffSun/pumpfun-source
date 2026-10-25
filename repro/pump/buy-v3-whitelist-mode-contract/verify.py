#!/usr/bin/env python3
"""Portable static evidence validation; no Rust, SBF, transaction or network."""
from pathlib import Path
import argparse,difflib,hashlib,importlib.util,json,subprocess,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def load(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 manifest=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()};assert actual==set(manifest)|{'manifest.json','manifest.sha256'}
 assert not any(p.is_symlink()or p.name=='__pycache__'or p.suffix=='.pyc'for p in P.rglob('*'))
 for n,h in manifest.items():assert H(P/n)==h,n
 for n,r in J(P/'input-bindings.json').items():
  assert H(P/r['copy'])==r['sha256'],n
  if repo:assert H(repo/n)==r['sha256'],n
 for name in ['b5','b6']:
  r=subprocess.run([sys.executable,'-B',str(P/'prior'/name/'verify.py')],cwd=P/'prior'/name,capture_output=True,text=True);assert r.returncode==0,r.stderr
  v=json.loads(r.stdout);assert v['historical_rows']==117
  assert v.get('successes',v.get('historical_successes'))==105
 c=load('mode_compute',P/'compute.py');out=c.compute()
 for n,v in out.items():assert v==J(P/n),n
 assert out['mode-contract.json']['overflow_error_name']==J(P/'error-name-24.json')
 d=load('mode_disasm',P/'disasm.py');e=d.a.Elf((P/'prior/b6/evidence/original.so').read_bytes());expected=set()
 for w in out['function-ledger.json']['windows']:
  n=f'{w["start"]:x}.asm';expected.add(n);assert(P/'evidence'/n).read_text()==d.render(e,w['start'],w['end'])
 for n,w in out['function-ledger.json']['slices'].items():
  n+='.asm';expected.add(n);assert(P/'evidence'/n).read_text()==d.render(e,w['start'],w['end'])
 assert{f.name for f in(P/'evidence').iterdir()}==expected
 with tarfile.open(P/'prior/b5/dependencies/anchor-lang-0.31.1.crate')as t:
  assert t.extractfile('anchor-lang-0.31.1/src/accounts/interface_account.rs').read()==(P/'inputs/interface_account.rs').read_bytes()
 m=J(P/'inputs/typed-parent-manifest.json');row=m['dependencies/anchor-spl-0.31.1/src/token_interface.rs.L1-82'];assert H(P/'inputs/token_interface.rs.L1-82')==(row['sha256']if isinstance(row,dict)else row)
 old=(P/'prior/b5/proposal/fee_mode.rs').read_text();new=(P/'source/fee_mode.rs').read_text();hook=(P/'source/whitelist_continuation.rs').read_text()
 diff=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='frozen-b5-proposal/fee_mode.rs',tofile='new-proposal/fee_mode.rs'))+''.join(difflib.unified_diff([],hook.splitlines(True),fromfile='/dev/null',tofile='new-proposal/whitelist_continuation.rs'))
 assert diff==(P/'source/proposal.patch').read_text()
 assert new.index('let serialized_len')<new.index('require!(curve.virtual_token_reserves != 0')<new.index('let selected_supply')<new.index('fee_selection::ordinary_leg')<new.index('drop(info)')
 assert 'if curve.is_mayhem_mode {\n        curve.token_total_supply\n    } else {\n        a.base_mint.supply' in new
 assert hook.index('associated_base_bonding_curve.reload()?')<hook.index('associated_base_user.reload()?')<hook.index('let quote_mint')
 assert 'if curve.complete || !curve.is_mayhem_mode' in hook
 assert 'u128::from(circulating) + u128::from(curve.virtual_token_reserves)' in hook
 assert 'let virtual_quote: u64 = quotient.try_into()?;' in hook and 'PumpError::Truncation' not in hook
 assert hook.count('.ok_or(PumpError::Overflow)?')==5
 assert hook.index('quotient.try_into()?')<hook.index('let cap')<hook.index('curve.virtual_quote_reserves =')
 assert '1_000_000_000_000' in hook and '2_000_000_000_000' in hook and '160_000_000_000' in hook
 assert 'trade_v3.rs' not in hook and '#[inline' not in hook and 'buy_domain(a)?' in (P/'prior/b5/proposal/buy_v3_body.rs').read_text()
 return {'status':'PASS','windows':len(out['function-ledger.json']['windows']),'direct_call_sites':len(out['function-ledger.json']['edges']),'outside_frontier':len(out['function-ledger.json']['outside_frontier']),'source_files':2,'preserved_rows':117,'preserved_success_obligations':105,'preserved_failure_obligations':12,'new_builds':0,'new_runtime_cases':0,'integratable_main':False}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args();print(json.dumps(verify(args.repo.resolve()if args.repo else None),sort_keys=True,indent=2))
