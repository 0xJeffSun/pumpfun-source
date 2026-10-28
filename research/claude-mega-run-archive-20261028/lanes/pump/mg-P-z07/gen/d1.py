import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; base=sys.argv[2] if len(sys.argv)>2 else L+'/src'
root=clone(name,base=base)
ATA='anchor_spl::associated_token::get_associated_token_address_with_program_id'
t=F(root,'trade_v3.rs')
t.put(168,'''/// Buyback fee recipient admission (native: global membership of the account key; token: owner program, mint, membership of the token owner, canonical ATA).
pub fn validate_buyback_fee_recipient_account(global:&Global,recipient:&AccountInfo,is_native:bool,quote_mint:&Pubkey,quote_token_program:&Pubkey)->Result<()>{
 if is_native{return global.validate_buyback_fee_recipient(&recipient.key());}

 require_keys_eq!(*recipient.owner,*quote_token_program,PumpError::AccountTypeNotSupported);
 let owner={
  let data=recipient.try_borrow_data()?;
  let mut slice:&[u8]=&data;
  let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;



  require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
  token.owner
 };
 global.validate_buyback_fee_recipient(&owner)?;




 require_keys_eq!(recipient.key(),%s(&owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}'''%ATA)
t.sub('a.global.validate_buyback_fee_recipient(a.buyback_fee_recipient.key())','a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())',count=3)
t.sub('a.global.validate_buyback_fee_recipient(token.owner)','a.global.validate_buyback_fee_recipient(&token.owner)')
t.save()
b=F(root,'buy_v2.rs')
b.sub('a.global.validate_buyback_fee_recipient(a.buyback_fee_recipient.key())','a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())',count=2)
b.save()
s=F(root,'sell_v2.rs'); s.sub('a.global.validate_buyback_fee_recipient(*bb.key)','a.global.validate_buyback_fee_recipient(&bb.key())'); s.save()
s=F(root,'sell.rs'); s.sub('global.validate_buyback_fee_recipient(account.key())','global.validate_buyback_fee_recipient(&account.key())'); s.save()
g=F(root,'lib.rs')
g.sub('pub fn validate_buyback_fee_recipient(&self,buyback_fee_recipient:Pubkey)->Result<()>{\n  require_keys_neq!(buyback_fee_recipient,Pubkey::default(),','pub fn validate_buyback_fee_recipient(&self,buyback_fee_recipient:&Pubkey)->Result<()>{\n  require_keys_neq!(*buyback_fee_recipient,Pubkey::default(),')
g.sub('require!(self.buyback_fee_recipients.contains(&buyback_fee_recipient),PumpError::BuybackFeeRecipientNotAuthorized);','require!(self.buyback_fee_recipients.contains(buyback_fee_recipient),PumpError::BuybackFeeRecipientNotAuthorized);')
g.save()
m=F(root,'multi_hop_curve_swap.rs')
m.sub('''            preflight_buyback_recipient(&a.global,&a.buyback_fee_recipient.to_account_info(),
                &h.quote_mint.key(),h.quote_mint.to_account_info().owner)?;''','''            crate::trade::validate_buyback_fee_recipient_account(&a.global,&a.buyback_fee_recipient.to_account_info(),false,
                &h.quote_mint.key(),h.quote_mint.to_account_info().owner)?;''')
# remove the now-unused multi-hop copy (replace its lines with blanks: line-neutral)
i=m.l.index('fn preflight_buyback_recipient(')-2
assert m.l[i].startswith('// R1:'),m.l[i]
j=i
while m.l[j]!='}': j+=1
for k in range(i,j+1): m.l[k]=''
m.save()
print('ok',root)
