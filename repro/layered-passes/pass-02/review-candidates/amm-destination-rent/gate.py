from pathlib import Path
import json,hashlib,re,gzip,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'))
from elf_reader import Elf
from analyze import instructions
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(n,x):(W/n).write_text(json.dumps(x,indent=2)+'\n')
B=W/'build-01';s=Elf(B/'target/sbf-solana-solana/release/pump_amm_recovered.so');c=Elf(B/'artifacts/pump_amm_recovered.so');o=Elf(W/'source/evidence/original/pump_amm/deployed.so')
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi] and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
by={f['start']:f for f in s.funcs}
find=lambda text:next(f for f in s.funcs if text in f['name'])
f=find('unwrap_and_move');dl=find('AccountInfo8data_len');rent=find('Rent15minimum_balance')
ins=list(instructions(s,f['start'],f['size']));calls=[dict(address=x['address'],target=s.calls[x['address']],symbol=by.get(s.calls[x['address']]))for x in ins if x['address']in s.calls]
idx=next(i for i,x in enumerate(ins)if s.calls.get(x['address'])==dl['start'])
a=ins[idx-1];b=ins[idx+1];d=ins[idx+2];e=ins[idx+3]
assert a['opcode']==191 and a['dst']==1 and a['src']==9
assert b['opcode']==191 and b['dst']==1 and b['src']==6
assert d['opcode']==191 and d['dst']==2 and d['src']==0
assert s.calls[e['address']]==rent['start']
assert ins[idx+5]['opcode']==191 and ins[idx+5]['dst']==1 and ins[idx+5]['src']==9
assert 'AccountInfo8lamports'in by[s.calls[ins[idx+6]['address']]]['name']
assert len([x for x in calls if x['target']==rent['start']])==2
# Complete normalized target correspondence against inferred original windows.
ledger=json.loads((W/'static/residual-ledger.json').read_text())
targets={}
for name,x in [('data_len',dl),('minimum_balance',rent)]:
 matches=[r['start']for r in ledger['original']if any(m['start']==x['start']for m in r['candidate_matches'])];assert matches;targets[name]={'candidate':x,'original_complete_normalized_matches':matches}
order=[x for x in calls if x['symbol'] and any(y in x['symbol']['name']for y in ['token_202213close_account','associated_token6create17','system_program8transfer17'])];assert len(order)==3
assert 'close_account' in order[0]['symbol']['name']and 'associated_token' in order[1]['symbol']['name']and 'system_program' in order[2]['symbol']['name']
source=json.loads((W/'proposed-source-sha256.json').read_text());attempt=json.loads((B/'build-attempt.json').read_text());assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==source
before=json.loads((W/'tools-before.json').read_text());after=json.loads((W/'tools-after.json').read_text());assert all(before[k]==after[k]for k in ['tools','sdk_source'])
for p,h in source.items():assert sha(W/'source'/p)==h
log=(B/'build.log').read_text();stack=[l for l in log.splitlines()if re.search(r'stack (offset|frame|size)|exceed.*stack|LLVM ERROR|error:',l,re.I)];assert not stack,stack
old=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/repro/pump_amm/update-event-borrow-v144/build.log.gz')
prior=gzip.decompress(old.read_bytes()).decode();warnings=lambda t:[x.split('WARN  cargo_build_sbf]')[-1].strip()for x in t.splitlines()if 'WARN  cargo_build_sbf]'in x]
assert warnings(log)==warnings(prior)
ri=json.loads((B/'target/.rustc_info.json').read_text());stdout='\n'.join(x['stdout']for x in ri['outputs'].values());assert '/toolchains/v1.44/rust' in stdout and 'target_arch="sbf"' in stdout
strip=(B/'sdk/dependencies/platform-tools').resolve();assert '/v1.52/' in str(strip)
for p,h in before['sdk_source'].items():assert sha(B/'sdk'/p)==h
save('targeted-static.json',{'pass':True,'helper':f,'instructions':ins,'calls':calls,'data_len_rent_chain':ins[idx-1:idx+7],'actual_targets':targets,'cpi_order':order,'scope':'Fresh symbols and actual signed direct-call targets. Same r9 account supplies data_len and lamports; returned length passes to Rent in r2. Exact source-only one-argument difference preserves other source semantics. Finite/static checks do not prove all behavior.'})
save('toolchain-phases.json',{'compile':'v1.44','compile_rustc_info_sha256':sha(B/'target/.rustc_info.json'),'strip':'v1.52','strip_resolved':str(strip),'strip_tool_sha256':sha(strip/'llvm/bin/llvm-objcopy'),'tools_before_after_equal':True,'sdk_before_after_equal':True,'candidate_sha256':sha(B/'artifacts/pump_amm_recovered.so'),'symbol_sha256':sha(B/'target/sbf-solana-solana/release/pump_amm_recovered.so')})
save('runtime-gate.json',{'pass':True,'returncode':0,'backend_stack_failures':stack,'compiler_deprecation_warnings':10,'retained_sdk_warnings':warnings(log),'sdk_warnings_same_as_accepted':True,'correct_named_elf_and_symbol_text':True,'source_22_before_after_equal':True,'tools_sdk_before_after_equal':True,'targeted_static_sha256':sha(W/'targeted-static.json'),'candidate_sha256':sha(B/'artifacts/pump_amm_recovered.so'),'limitations':['No real nonempty-destination coverage in unchanged suite.','External 8/267 claim unverified.','No main acceptance without root review.','Whole-original equality false.']})
print(json.dumps({'gate':'PASS','helper':f,'data_len':dl,'rent':rent}))
