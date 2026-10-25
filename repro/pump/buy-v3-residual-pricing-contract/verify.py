#!/usr/bin/env python3
"""Portable static saved-byte verifier; no compiler, source execution or VM."""
from pathlib import Path
import argparse,difflib,hashlib,importlib.util,json,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def load(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify(repo=None):
 manifest=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()};assert actual==set(manifest)|{'manifest.json','manifest.sha256'}
 assert not any(p.is_symlink()or p.name=='__pycache__'or p.suffix=='.pyc'for p in P.rglob('*'))
 for n,h in manifest.items():assert H(P/n)==h,n
 for n,r in J(P/'input-bindings.json').items():
  assert H(P/r['copy'])==r['sha256'] and (P/r['copy']).stat().st_size==r['bytes'],n
  if repo:assert H(repo/n)==r['sha256'],n
 q=subprocess.run([sys.executable,'-B',str(P/'prior/b6/verify.py')],cwd=P/'prior/b6',capture_output=True,text=True);assert q.returncode==0,q.stderr
 old=json.loads(q.stdout);assert old['historical_rows']==117 and old['historical_successes']==105 and old['runtime_execution']is False
 c=load('residual_compute',P/'compute.py');values=c.compute()
 for n,v in values.items():assert v==J(P/n),n
 d=load('residual_disasm',P/'disasm.py');e=d.a.Elf((P/'prior/b6/evidence/original.so').read_bytes())
 windows=values['function-ledger.json']['windows'];expected=set()
 for w in windows:
  name=f'{w["start"]:x}.asm';expected.add(name);assert (P/'evidence'/name).read_text()==d.render(e,w['start'],w['end']),name
 for name,(a,b)in c.SLICES.items():
  name+='.asm';expected.add(name);assert(P/'evidence'/name).read_text()==d.render(e,a,b),name
 assert {p.name for p in (P/'evidence').iterdir()}==expected
 numeric=J(P/'inputs/wide-runtime-manifest.json')
 for n,dst in [('README.md','README.md'),('ledger.json','ledger.json')]:assert H(P/('inputs/wide-runtime-'+dst))==numeric[n]
 src=(P/'source/residual_pricing.rs').read_text();prior=(P/'inputs/previous-normal-quote.rs').read_text()
 diff=''.join(difflib.unified_diff(prior.splitlines(True),src.splitlines(True),fromfile='historical-proposal/normal_quote_fragment.rs',tofile='new-uncompiled-proposal/residual_pricing.rs'))
 assert diff==(P/'source/proposal.patch').read_text()
 # Static shape checks only, not typecheck or arithmetic execution.
 assert 'requested.min(real_base)'not in src
 assert src.index('n.checked_add(d)')<src.index('sum.checked_sub(1)')<src.index('if d == 0')
 assert src.index('let total_buyback = add(b1, b2)?')<src.index('let first_gross = gross')<src.index('let residual_gross = match')
 assert 'pool.base <= remaining'in src and 'pool.base as u128, remaining as u128'in src
 assert 'max as u128, total as u128'in src and 'if total > max'in src
 assert 'pretrade.fees(quote).map_err(ResidualFailure::Fee)?'in src
 assert 'AbsentQuoteAdjustment'in src and 'pub struct OrdinaryRate(u64)'in src
 assert 'trade_v3.rs'not in src and '#[inline'not in src and 'ProgramResult'not in src
 scope=J(P/'scope.json');assert scope['new_builds']==scope['new_runtime_cases']==scope['new_fixtures']==0 and scope['main_mutations']is False
 obligations=J(P/'inputs/inherited-obligations.json');assert len(obligations)==8
 return {'status':'PASS','original_sha256':H(P/'prior/b6/evidence/original.so'),'windows':len(windows),'direct_call_sites':len(values['function-ledger.json']['edges']),'outside_frontier':len(values['function-ledger.json']['outside_frontier']),'preserved_rows':117,'preserved_success_obligations':105,'preserved_failure_obligations':12,'new_source_files':1,'new_builds':0,'new_runtime_cases':0,'integratable':False}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);args=p.parse_args();print(json.dumps(verify(args.repo.resolve()if args.repo else None),indent=2,sort_keys=True))
