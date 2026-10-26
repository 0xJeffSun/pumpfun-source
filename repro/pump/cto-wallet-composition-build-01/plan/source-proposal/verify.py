"""Review-only source/integrity/order checks. No compiler, native, VM or target code."""
from pathlib import Path
import argparse,difflib,hashlib,json,re
from compose import compose,REL
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--baseline-repo',type=Path);args=a.parse_args()
manifest=J(P/'manifest.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
for name,row in manifest.items():b=(P/name).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes'],name
for name,row in J(P/'control-references.json').items():
 q=Path(row['path']);assert H((q/row['manifest']).read_bytes())==row['sha256']
 for n,r in J(q/row['manifest']).items():assert H((q/n).read_bytes())==(r if isinstance(r,str)else r['sha256'])
old=J(P/'source-baseline.json');new=J(P/'source-proposed.json');assert len(old)==len(new)==37 and set(old)==set(new)
assert[n for n in old if old[n]!=new[n]]==[REL]
for name,h in new.items():assert H((P/'source'/name).read_bytes())==h
if args.baseline_repo:
 for name,h in old.items():assert H((args.baseline_repo/name).read_bytes())==h,name
controls=J(P/'control-references.json');selected=J(Path(controls['pr12-selected-cto-emitted-review']['path'])/'proof.json');assert old==selected['source37'];assert J(P/'baseline.json')['candidate_sha256']==selected['candidate_sha256']
s=(P/'baseline-admin_cto.rs').read_text();t=(P/'source'/REL).read_text();assert H(s.encode())==old[REL]and t==compose()
assert(P/'proposal.patch').read_text()==''.join(difflib.unified_diff(s.splitlines(True),t.splitlines(True),fromfile='a/'+REL,tofile='b/'+REL,n=3))
# Preserve complete leading6019/6091/early6092 contexts, then untouched tail APIs.
assert s[:s.index(' let shared=')]==t[:t.index(' let shared=')]
assert s[s.index(' let pb=[ctx.bumps.pool_authority];'):s.index('fn token_frozen')]==t[t.index(' let pb=[ctx.bumps.pool_authority];'):t.index('fn token_frozen')]
assert s[s.index('#[inline(never)]fn pay_token'):]==t[t.index('#[inline(never)]fn pay_token'):]
assert s[s.index('fn token_frozen'):s.index('#[inline(never)]fn pay_token')]in t
assert t.count('error!(PumpError::CtoCreatorAccountNotWritable)')==1 and 'err(6092)'not in t
assert 'let wallet=!shared&&!a.bonding_curve.is_holder_reward&&old!=Pubkey::default()&&!a.current_creator.executable&&a.current_creator.owner==&anchor_lang::system_program::ID;'in t
assert 'let shared=old==a.sharing_config.key() && a.sharing_config.owner==&FEES && !a.sharing_config.data_is_empty();'in t
shared=t[t.index(' if shared&&holder{'):t.index(' if wallet&&!wallet_frozen{')];ordinary=t[t.index(' if wallet&&!wallet_frozen{'):t.index(' let pb=[ctx.bumps.pool_authority];')]
selector='let native=a.quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID;';assert t.count(selector)==2 and shared.count(selector)==ordinary.count(selector)==1
assert ordinary==(P/'ordinary-wallet.rs.fragment').read_text()
assert ordinary.count('associated_token::create_idempotent')==1 and 'pay_token('not in ordinary
ordered=['let amm_present=','let vault_collectible=','let amm_collectible=','if !native||amm_present{','associated_token::create_idempotent','if vault_collectible{','let collected=if native{','if let Some((amount,quote_mint))=collected{','Clock::get()?','emit!(e.clone());emit_cpi!(e);','if amm_collectible{','invoke_signed(']
assert[ordinary.index(x)for x in ordered]==sorted(ordinary.index(x)for x in ordered)
assert 'let vault_collectible=if native{true}else{'in ordinary and 'let amm_collectible=amm_present&&!token_frozen('in ordinary
assert 'saturating_sub(rent.minimum_balance(0))'in ordinary and 'if amount==0{None}else{'in ordinary and 'let post_balance=a.current_creator.lamports().saturating_add(amount);'in ordinary and 'let required=rent.minimum_balance(a.current_creator.data_len());'in ordinary and 'if post_balance<required{None}else{'in ordinary
assert 'Some((amount,Pubkey::default()))'in ordinary and 'Some((amount,a.quote_mint.key()))'in ordinary
assert ordinary.index('associated_token::create_idempotent')<ordinary.index('token_raw_amount(')<ordinary.index('token_interface::transfer_checked')<ordinary.index('Clock::get()?')
assert shared.count('pay_token(')==1 and 'token_amount('in shared
# No body mutation/invocation can intervene on !shared ordinary path between
# early writable acceptance and ordinary entry. Shared branches are false there.
span=t[t.index('let wallet='):t.index(' if wallet&&!wallet_frozen{')];assert span.count('is_writable')==1 and not re.search(r'\.is_writable\s*=',t)
assert 'if shared&&holder{'in span and 'let bump='in span
assert 'fn token_raw_amount(a:&AccountInfo)->Result<u64>{let d=a.try_borrow_data()?;let t=anchor_spl::token_interface::TokenAccount::try_deserialize(&mut &d[..])?;Ok(t.amount)}'in t
# Lexical delimiter sanity only, explicitly not a Rust syntax/type/borrow check.
clean=re.sub(r'//[^\n]*|"(?:\\.|[^"\\])*"','',t);stack=[];close={')':'(',']':'[','}':'{'}
for ch in clean:
 if ch in'([{':stack.append(ch)
 elif ch in')]}':assert stack and stack.pop()==close[ch]
assert not stack
ledger=J(P/'evidence-ledger.json');assert len(ledger['visibly_unapplied_components'])==4 and all(x['implemented']is False for x in ledger['visibly_unapplied_components'])
assert not J(P/'change-summary.json')['applied_to_checkout']and not J(P/'change-summary.json')['built']
print('PASS: exactselected37/onlyCTOsourcechanged, deterministicfullpatch, E/selector/dominance/VA/ATA/collection/event/withdrawsourceorder; shared6093/collectorheader/log/transitivegates OPEN; no build/runtime')
