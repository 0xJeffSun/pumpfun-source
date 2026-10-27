"""Portable read-only check of source, saved builds, static proof and signatures."""
from pathlib import Path, PurePosixPath
import argparse,ast,base64,difflib,gzip,hashlib,importlib.util,io,json,re,sys,tarfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
EXPECTED = {'buy': 486, 'sell': 396,
            **{f'buy-amm-{f}': 419 for f in ('native', 'token', 'token22')},
            **{f'sell-amm-{f}': 413 for f in ('native', 'token', 'token22')},
            **{f'buy-v2-{f}': 613 for f in ('native', 'token', 'token22')},
            **{f'sell-v2-{f}': 473 for f in ('native', 'token', 'token22')}}
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=lambda p:gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes()
load=lambda p:json.loads(raw(p))

def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def archived(path):
 result={}
 with tarfile.open(fileobj=io.BytesIO(path.read_bytes()),mode='r:gz')as tar:
  for m in tar.getmembers():
   n=PurePosixPath(m.name);assert m.isfile()and not n.is_absolute()and '..'not in n.parts and str(n)==m.name and m.name not in result
   result[m.name]=tar.extractfile(m).read()
 return result

def source_inputs(packet=None):
 p=packet or P;a=archived(p/'parent-source.tar.gz');b=archived(p/'source.tar.gz')
 assert len(a)==65 and len(b)==66
 assert {n:sha(v)for n,v in a.items()}==load(p/'parent-source-inputs.json')
 assert {n:sha(v)for n,v in b.items()}==load(p/'source-inputs.json')
 delta=load(p/'source-delta.json');assert delta==dict(overrides=['src/instructions/buy_pump_swap.rs','src/instructions/mod.rs','src/lib.rs','src/state.rs'],added=['src/instructions/extend_account.rs'],removed=[])
 changed=sorted(n for n in a.keys()|b.keys()if a.get(n)!=b.get(n));assert changed==['src/instructions/buy_pump_swap.rs','src/instructions/extend_account.rs','src/instructions/mod.rs','src/lib.rs','src/state.rs']
 for n in changed:assert (p/'overrides'/n).read_bytes()==b[n]
 assert sorted(f.relative_to(p/'overrides').as_posix()for f in(p/'overrides').rglob('*')if f.is_file())==changed
 patch=''.join(''.join(difflib.unified_diff(a.get(n,b'').decode().splitlines(True),b[n].decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in changed)
 assert(p/'source.patch').read_text()==patch
 for name,lo,hi in [('src/state.rs',235,242),('src/instructions/buy_pump_swap.rs',104,106)]:
  oldlines,newlines=a[name].splitlines(True),b[name].splitlines(True);assert len(oldlines)==len(newlines)and oldlines[:lo]==newlines[:lo]and oldlines[hi:]==newlines[hi:]
 assert b['src/instructions/mod.rs']==a['src/instructions/mod.rs']+b'\npub mod extend_account;\n'
 old,new=a['src/lib.rs'].decode(),b['src/lib.rs'].decode();start='    pub fn extend_account(';end='    pub fn initialize_fee_recipient('
 assert old[:old.index(start)]==new[:new.index(start)]and old[old.index(end):]==new[new.index(end):]
 body=new[new.index(start):new.index(end)];assert [l.strip()for l in body.splitlines()if l.strip()]==['pub fn extend_account(ctx: Context<ExtendAccount>) -> Result<()> {','instructions::extend_account::handler(ctx)','}']
 assert len(old.splitlines())==len(new.splitlines())
 assert b['src/state.rs'].count(b'validate_amm_buy_risk(global_params,state,quote_mint)?;')==1 and b['src/state.rs'].count(b'if global_deployed!=0 && global_deployed>=0 {')==1
 assert b['src/instructions/buy_pump_swap.rs'].count(b'anchor_lang::system_program::transfer(CpiContext::new_with_signer(')==1
 helper=b['src/instructions/extend_account.rs'];assert helper.count(b'account_size(ctx.accounts.account.as_ref())?')==1 and helper.count(b'fund_account(&ctx, required)?')==1 and helper.count(b'let rent = Rent::get()?;')==1
 return b

def check_receipts(report,candidate):
 from solders.transaction import Transaction
 expected=module('extend_pure_cases',P/'runtime/cases.py').cases()
 # Bind the pure copied generator to the original saved fixture definitions.
 def definitions(path):
  tree=ast.parse(path.read_text());return[ast.dump(n,include_attributes=False)for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='cases'or isinstance(n,ast.Assign)and any(isinstance(t,ast.Name)and t.id=='TYPES'for t in n.targets)]
 assert definitions(P/'runtime/cases.py')==definitions(P/'runtime/fixtures/mayhem_validate_extend.py')
 assert report['candidate_sha256']==sha(candidate)and report['original_sha256']=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
 assert report['case_count']==len(report['cases'])==len(expected)==301 and report['signed_transactions']==602
 assert [r['case']for r in report['cases']]==expected and len({r['case']['name']for r in report['cases']})==301
 assert not report['mismatches']and not report['noncompute_log_mismatches']
 for n,d in report['harness_sha256'].items():assert sha((P/'runtime/fixtures'/Path(n).name).read_bytes())==d
 assert sha((P/'runtime/capture.py.txt').read_bytes())==report['script_sha256']
 exact=success=0
 for row in report['cases']:
  a,b=row['original'],row['candidate'];assert set(a)==set(b)=={'error','accounts','events','inner_instructions','return_data','logs'}
  assert not row['different_fields']and row['noncompute_logs_equal']
  for k in set(a)-{'logs'}:assert a[k]==b[k],(row['case']['name'],k)
  normalize=lambda ls:[l for l in ls if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',l)]
  assert normalize(a['logs'])==normalize(b['logs'])
  assert row['original_transaction_base64']==row['candidate_transaction_base64']
  for kind in ['original','candidate']:
   transaction=Transaction.from_bytes(base64.b64decode(row[kind+'_transaction_base64']));assert all(transaction.verify_with_results())
  exact+=1;success+=a['error']is None
 return dict(cases=301,signed_transaction_records=602,exact_noncompute_logs=exact,successful_original_cases=success)

def check_trade_receipts(name, report, candidate,root):
    R=Path(root)
    from solders.transaction import Transaction
    assert report['case_count'] == len(report['cases']) == EXPECTED[name]
    assert report['candidate_sha256'] == sha(candidate)
    assert report['original_sha256'] == sha((R / 'evidence/original/mayhem/deployed.so').read_bytes())
    assert not report['mismatches']
    cases = ('nineteen/sell' if name == 'sell' else 'twenty/buy' if name == 'buy' else
             'twentyone/sell-v2' if name.startswith('sell-v2') else 'twentytwo/buy-v2' if name.startswith('buy-v2') else
             'twentyfour/sell-pump-swap' if name.startswith('sell-amm') else 'twentyfour/buy-pump-swap')
    expected_cases=load(R / ('repro/mayhem/' + cases + '-cases.json'))['cases']
    if name not in ('buy','sell'):
        family=name.rsplit('-',1)[1]
        expected_cases=[dict(c,token_quote=family!='native',quote_token22=family=='token22') for c in expected_cases]
        if '-amm-' in name:
            for c in expected_cases:
                c['instruction']='buy_pump_swap' if name.startswith('buy-') else 'sell_pump_swap'
                c.setdefault('tokens',10**11 if name.startswith('buy-') else 10**9)
    assert [r['case'] for r in report['cases']] == expected_cases
    assert len({r['case']['name'] for r in report['cases']}) == EXPECTED[name]
    for path, digest in report['harness_sha256'].items():
        assert sha((R / path).read_bytes()) == digest
    exact = successes = 0
    for row in report['cases']:
        a, b = row['original'], row['candidate']
        assert not row['different_fields'] and a['error'] == b['error']
        assert a['transaction_base64'] == b['transaction_base64']
        for result in (a, b):
            if 'case' in result: assert result['case']==row['case']
            tx = Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
            assert all(tx.verify_with_results())
            for phase in ('before', 'after'):
                for account in result[phase].values():
                    if account is not None and not account['executable']:
                        assert sha(base64.b64decode(account['data_base64'])) == account['data_sha256']
        for phase in ('before', 'after'):
            omit = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
            assert {k: v for k, v in a[phase].items() if k != omit} == {k: v for k, v in b[phase].items() if k != omit}
        for field in ('inner_instructions', 'return_data'):
            assert a['metadata'][field] == b['metadata'][field]
        events = lambda result: [s for s in result['metadata']['logs'] if s.startswith('Program data: ')]
        assert events(a) == events(b)
        logs = lambda result: [s for s in result['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', s)]
        exact += logs(a) == logs(b)
        successes += a['error'] is None
    diagnostics=[r['case']['name'] for r in report['cases'] if [x for x in r['original']['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)] != [x for x in r['candidate']['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]]
    assert report.get('normalized_log_differences',diagnostics)==diagnostics
    return {'family': name, 'cases': EXPECTED[name], 'signed_transaction_records': EXPECTED[name] * 2,
            'successful_original_cases': successes, 'exact_noncompute_logs': exact}


def check_manifest(packet=None):
 p=packet or P
 actual={f.relative_to(p).as_posix():sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'and '__pycache__'not in f.parts}
 assert actual==load(p/'manifest.json')

def verify(root=None,runtime=True):
 root=Path(root or ROOT).resolve();assert not any(p.is_symlink()for p in P.rglob('*'))
 check_manifest()
 for n,h in load(P/'inputs.json').items():assert sha((root/n).read_bytes())==h,n
 assert raw(P/'inputs/parent-audit.json.gz')==(root/'research/mayhem-sell-quote-call-recovery/audit.json').read_bytes()
 assert load(P/'parent-source-inputs.json')==load(root/'research/mayhem-sell-quote-call-recovery/source-inputs.json')
 assert(P/'reader.py').read_bytes()==(root/'repro/mayhem/global-params-layout-recovery/tools/layer01.py').read_bytes()
 archive=load(P/'provenance/archive.json');checked=load(P/'provenance/archive-check.json');target=load(P/'provenance/target-libraries.json')
 assert archive['sha256']==checked['archive_sha256']==target['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
 assert archive['bytes']==checked['archive_bytes']==520154357 and checked['verified_target_files']==target['files']and len(target['files'])==26
 sources=source_inputs();outputs=[];parent_launch=load(P/'provenance/parent-build.json')
 for label in ['recovered','repeat']:
  launch=load(P/f'builds/{label}/launch.json');result=load(P/f'builds/{label}/result.json')
  assert launch['source_inputs']=={n:sha(v)for n,v in sources.items()}
  assert launch['controller_sha256']==sha((P/'build.py').read_bytes())
  assert launch['checked_tools']==parent_launch['checked_tools']and launch['target_inputs']==parent_launch['target_inputs']==load(P/'provenance/target-libraries.json')
  assert launch['command'][-1]=='--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs'
  assert all(x in launch['command']for x in ['--locked','--offline','sbpf-solana-solana','2'])
  assert result['returncode']==0 and all(result[k]for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
  for n in ['stdout','stderr']:assert sha(raw(P/f'builds/{label}/{n}.gz'))==result[n+'_sha256']
  log=raw(P/f'builds/{label}/stderr.gz')
  for name in ['anchor_lang','curve_accounts','mayhem_recovered']:assert log.count(('--crate-name '+name+' ').encode())==1
  out=tuple(raw(P/f'artifacts/{label}/{n}.so.gz')for n in ['candidate','symbols']);outputs.append(out)
  for n,b in zip(['candidate','symbols'],out):assert sha(b)==result[n+'_sha256']
 assert outputs[0]==outputs[1];candidate,symbols=outputs[0]
 assert sha(candidate)=='4a606bc28e73200660fd736419688c070b804179bd979947a974bab91f6965b8'and sha(symbols)=='3971b5de1e074fb5a6fec54b8c3805f98b5de88ef528570960aafcb6a0c5ab8f'
 parent_candidate,parent_symbols=[raw(P/f'artifacts/parent/{n}.so.gz')for n in ['candidate','symbols']]
 assert sha(parent_candidate)=='fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4'and sha(parent_symbols)=='cc56231724a7973fb9cecfd3c24ab390875dd828925f79b33388a05c71f12d25'
 for n,data in module('extend_analysis',P/'analysis.py').generate(root).items():assert(P/n).read_bytes()==data,n
 original=(root/'evidence/original/mayhem/deployed.so').read_bytes()
 progress=module('extend_progress',P/'progress.py').compare(original,parent_symbols,symbols);assert progress==load(P/'progress.json')
 assert(progress['baseline_matches'],progress['matches'],progress['gains'],progress['baseline_raw_matches'],progress['raw_matches'])==(426,428,['O0072','O0090'],70,70)
 helper=module('extend_helper',P/'helper.py').inspect(original,symbols);assert helper==load(P/'helper.json')
 assert helper['normalized_equal']and len(helper['direct_calls'])==33 and len(helper['data'])==19 and all(r['same']for r in helper['direct_calls']+helper['data'])
 accounting=module('accounting_proof',P/'accounting.py').inspect(original,symbols);assert accounting==load(P/'accounting.json')and len(accounting['direct_calls'])==len(accounting['data'])==12
 transfer=module('amm_transfer_proof',P/'amm_transfer.py').inspect(original,symbols);assert transfer==load(P/'amm-transfer.json')and transfer['callee_normalized_equal']and not transfer['handler_normalized_equal']
 audit=load(P/'audit.json');assert audit['summary']['statuses']==dict(normalized_only=358,raw_local_match=70,unmatched=13)and audit['summary']['unmatched_window_bytes']==112584 and not audit['summary']['whole_file_equal']
 result=dict(source_inputs=66,changed_source_files=5,matched_windows=428,raw_local_matches=70,new_complete_matches=['O0072','O0090'],body_bytes=4272,immediate_callees=33,typed_data_references=19,accounting_body_bytes=2544,accounting_callees=12,accounting_data_references=12,native_transfer_callees=16,compiler_executed=False,target_executed=False)
 if runtime:
  assert not(P/'PENDING-RUNTIME.txt').exists(),'Runtime seal is pending; use --skip-runtime only for the static review.'
  rt=check_receipts(load(P/'runtime/extend.json.gz'),candidate);assert rt==load(P/'runtime-summary.json');result.update(rt)
  summaries=[];diagnostics=[]
  for family in EXPECTED:
   report=load(P/f'runtime/{family}.json.gz');summaries.append(check_trade_receipts(family,report,candidate,root))
   before=load(root/f'research/mayhem-sell-quote-call-recovery/runtime/{family}.json.gz')
   differences=lambda r:{z['case']['name']for z in r['cases']if [x for x in z['original']['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]!=[x for x in z['candidate']['metadata']['logs']if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]}
   a,b=differences(before),differences(report);assert not b-a;diagnostics.append(dict(family=family,before=sorted(a),after=sorted(b),repaired=sorted(a-b)))
  assert summaries==load(P/'trade-runtime-summary.json')and diagnostics==load(P/'diagnostic-delta.json')
  result.update(trade_cases=sum(z['cases']for z in summaries),trade_signed_records=sum(z['signed_transaction_records']for z in summaries))
 return result

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,default=ROOT);p.add_argument('--skip-runtime',action='store_true');p.add_argument('--materialize',type=Path);a=p.parse_args();result=verify(a.repository_root,not a.skip_runtime)
 if a.materialize:
  t=a.materialize.absolute();assert not t.exists()and all(not f.is_symlink()for f in t.parents);t.mkdir(parents=True)
  for n,b in source_inputs().items():f=t/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
 print(json.dumps(result,indent=2))
