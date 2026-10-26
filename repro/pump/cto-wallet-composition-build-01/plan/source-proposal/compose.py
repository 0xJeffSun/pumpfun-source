"""Produce a review-only source file from its saved baseline; no build/execution."""
from pathlib import Path
P=Path(__file__).resolve().parent
REL='programs/pump/src/admin_cto.rs'
def compose():
 s=(P/'baseline-admin_cto.rs').read_text()
 old='a.sharing_config.owner==&FEES && !a.sharing_config.data_is_empty() && old==a.sharing_config.key()';new='old==a.sharing_config.key() && a.sharing_config.owner==&FEES && !a.sharing_config.data_is_empty()';assert s.count(old)==1;s=s.replace(old,new)
 old='let wallet=old!=Pubkey::default()&&a.current_creator.owner==&anchor_lang::system_program::ID&&!a.current_creator.executable;';new='let wallet=!shared&&!a.bonding_curve.is_holder_reward&&old!=Pubkey::default()&&!a.current_creator.executable&&a.current_creator.owner==&anchor_lang::system_program::ID;';assert s.count(old)==1;s=s.replace(old,new)
 start=s.index(' let native=a.bonding_curve.quote_mint==Pubkey::default();')
 shared=s.index(' if shared && holder && (amount>0||',start)
 ordinary=s.index(' if wallet&&!wallet_frozen{',shared)
 tail=s.index(' let pb=[ctx.bumps.pool_authority];',ordinary)
 sharedbody=s[shared:ordinary]
 # Isolate shared amount from ordinary collection: preserve its existing payout
 # body and pay_token behavior; its frozen6093 reconstruction remains unaccepted.
 sharedbody=sharedbody.replace(' if shared && holder && (amount>0||(!native&&!a.creator_vault_quote_token_account.data_is_empty())){','  if amount>0||(!native&&!a.creator_vault_quote_token_account.data_is_empty()){',1)
 prefix=' let bump=[ctx.bumps.creator_vault];let vaultseeds:&[&[u8]]=&[b"creator-vault",old.as_ref(),&bump];let mut swept=0;\n if shared&&holder{\n  let native=a.quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID;\n  let rent=Rent::get()?.minimum_balance(0);let amount=if native{a.creator_vault.lamports().saturating_sub(rent)}else{token_amount(&a.creator_vault_quote_token_account.to_account_info())?};\n'
 replacement=prefix+sharedbody+' }\n'+(P/'ordinary-wallet.rs.fragment').read_text()
 s=s[:start]+replacement+s[tail:]
 helper='fn token_raw_amount(a:&AccountInfo)->Result<u64>{let d=a.try_borrow_data()?;let t=anchor_spl::token_interface::TokenAccount::try_deserialize(&mut &d[..])?;Ok(t.amount)}\n'
 needle='#[inline(never)]fn pay_token';assert s.count(needle)==1;s=s.replace(needle,helper+needle)
 return s
if __name__=='__main__':(P/'source'/REL).write_text(compose())
