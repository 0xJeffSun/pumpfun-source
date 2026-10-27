"""Verify the composed trade-source corrections against the fixed 428 parent."""
from pathlib import Path
import argparse,difflib,gzip,hashlib,importlib.util,json,re,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];B=R/'research/mayhem-accounting-extend-recovery'
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def expected_sources(before):
 after=dict(before)
 for n in ['src/instructions/buy.rs','src/instructions/buy_v2.rs','src/instructions/sell_v2.rs']:
  old=b'let retained=10_000u16-retained_reserve_bps;';assert after[n].count(old)==1
  after[n]=after[n].replace(old,b'let retained=crate::state::retained_basis_points(retained_reserve_bps);')
 old=b'fn retained_basis_points(';assert after['src/state.rs'].count(old)==1
 after['src/state.rs']=after['src/state.rs'].replace(old,b'pub(crate) fn retained_basis_points(',1)
 n='src/instructions/sell_pump_swap.rs';old=b'let sol=after_quote-before_sol;let tokens=before_tokens-a.mayhem_token_vault.amount;';assert after[n].count(old)==1
 after[n]=after[n].replace(old,b'let (sol,tokens)=super::pump_amm_interface::sold_amounts(before_sol,after_quote,before_tokens,a.mayhem_token_vault.amount);')
 n='src/instructions/pump_amm_interface.rs'
 after[n]+=b'\n'*23+b'#[inline(always)]\npub fn sold_amounts(before_quote:u64,after_quote:u64,before_tokens:u64,after_tokens:u64)->(u64,u64) {\n   let quote_gained = after_quote-before_quote;\n    let tokens_removed = before_tokens-after_tokens;\n    (quote_gained,tokens_removed)\n}\n'
 return after

def verify(runtime=True):
 assert not any(p.is_symlink()for p in P.rglob('*'))
 assert load(P/'manifest.json')=={str(p.relative_to(P)):sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and'__pycache__'not in p.parts}
 for n,h in load(P/'external-inputs.json').items():assert sha((R/n).read_bytes())==h,n
 parent=module('origins_parent',B/'verify.py');parent.verify(root=R,runtime=False)
 for name in ['analysis.py','progress.py','reader.py','build.py']:assert(P/name).read_bytes()==(B/name).read_bytes()
 before=parent.source_inputs();after=parent.archived(P/'source.tar.gz');assert after==expected_sources(before)
 assert {n:sha(b)for n,b in after.items()}==load(P/'source-inputs.json')and len(after)==66
 names=sorted(n for n in before if before[n]!=after[n]);assert len(names)==6
 assert load(P/'source-delta.json')==dict(overrides=names,added=[],removed=[])
 assert {str(p.relative_to(P/'overrides')):p.read_bytes()for p in(P/'overrides').rglob('*')if p.is_file()}=={n:after[n]for n in names}
 patch=''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),after[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in names)
 assert(P/'source.patch').read_bytes()==patch.encode()
 outputs=[];prior=load(B/'builds/recovered/launch.json')
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json');assert launch['source_inputs']=={n:sha(b)for n,b in after.items()}
  assert launch['checked_tools']==prior['checked_tools']and launch['target_inputs']==prior['target_inputs']
  assert launch['controller_sha256']==sha((P/'build.py').read_bytes())and launch['command'][-1]=='--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs'
  assert all(x in launch['command']for x in ['--locked','--offline','sbpf-solana-solana'])
  assert result['returncode']==0 and all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz');assert all(log.count(('--crate-name '+n+' ').encode())==1 for n in ['anchor_lang','curve_accounts','mayhem_recovered'])
  output=tuple(raw(P/f'artifacts/{label}/{n}.so.gz')for n in ['candidate','symbols']);outputs.append(output)
  for n,b in zip(['candidate','symbols'],output):assert sha(b)==result[n+'_sha256']
 assert outputs[0]==outputs[1];candidate,symbols=outputs[0];assert sha(candidate)=='8b11b4a471b61c734e8e803b2901d7d39050253d7f5f73ac1409fed36369b0e7'
 for n,b in module('origins_analysis',P/'analysis.py').generate(R).items():assert(P/n).read_bytes()==b,n
 original=(R/'evidence/original/mayhem/deployed.so').read_bytes();prior_symbols=raw(B/'artifacts/recovered/symbols.so.gz')
 progress=module('origins_progress',P/'progress.py').compare(original,prior_symbols,symbols);assert progress==load(P/'progress.json')
 assert(progress['matches'],progress['raw_matches'],progress['gains'])==(428,70,[])
 with tempfile.TemporaryDirectory()as td:
  sy=Path(td)/'symbols.so';sy.write_bytes(symbols);data=module('origins_data',P/'data.py').inspect(sy);assert data==load(P/'data.json')
 helper=module('origins_extend',B/'helper.py').inspect(original,symbols);accounting=module('origins_accounting',B/'accounting.py').inspect(original,symbols);transfer=module('origins_transfer',B/'amm_transfer.py').inspect(original,symbols)
 assert helper['normalized_equal']and accounting['normalized_equal']and transfer['callee_normalized_equal']
 result=dict(matched_windows=428,raw_local_matches=70,new_complete_matches=0,changed_source_files=6,compiler_executed=False,target_executed=False)
 if runtime:
  summaries=[];deltas=[]
  trim=lambda row:[x for x in row['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
  for name in parent.EXPECTED:
   report=load(P/f'runtime/{name}.json.gz');summaries.append(parent.check_trade_receipts(name,report,candidate,R));old=load(B/f'runtime/{name}.json.gz');fixed=[];remaining=[];prior_bad=[]
   for a,b in zip(old['cases'],report['cases']):
    assert a['case']==b['case']and a['original']['transaction_base64']==b['original']['transaction_base64']and trim(a['original'])==trim(b['original'])
    x=trim(a['original'])!=trim(a['candidate']);y=trim(b['original'])!=trim(b['candidate']);assert not(y and not x)
    if x:prior_bad.append(a['case']['name'])
    if y:remaining.append(b['case']['name'])
    if x and not y:fixed.append(a['case']['name'])
   expected=['retained10001','retained65535']if name=='buy'or name.startswith(('buy-v2-','sell-v2-'))else[];assert sorted(fixed)==expected
   deltas.append(dict(family=name,before=sorted(prior_bad),after=sorted(remaining),repaired=sorted(fixed)))
  assert summaries==load(P/'runtime-summary.json')and deltas==load(P/'diagnostic-delta.json')
  result.update(trade_cases=sum(x['cases']for x in summaries),signed_transaction_records=sum(x['signed_transaction_records']for x in summaries),diagnostics_repaired=sum(len(x['repaired'])for x in deltas),diagnostics_remaining=sum(len(x['after'])for x in deltas))
  assert(result['trade_cases'],result['diagnostics_repaired'],result['diagnostics_remaining'])==(6636,14,7)
 return result

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--skip-runtime',action='store_true');a=p.parse_args();print(json.dumps(verify(not a.skip_runtime),indent=2))
