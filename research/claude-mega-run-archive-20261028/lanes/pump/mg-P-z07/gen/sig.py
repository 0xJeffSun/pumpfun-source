# apply the original admit/check_token_account signatures (by-value keys, original admit param order) to a tree
import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *; from xform import *
def apply(root):
    b=F(root,'buy_v2.rs')
    b.sub("pub fn admit_associated_token_account<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:&Pubkey,token_program:&Pubkey,payer:&AccountInfo<'info>,mint_info:&AccountInfo<'info>,allow_create:bool,system_program:&AccountInfo<'info>,token_program_info:&AccountInfo<'info>)->Result<()>{",
          "pub fn admit_associated_token_account<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:Pubkey,token_program:Pubkey,mint_info:&AccountInfo<'info>,token_program_info:&AccountInfo<'info>,allow_create:bool,payer:&AccountInfo<'info>,system_program:&AccountInfo<'info>)->Result<()>{")
    b.sub(" let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(&authority.key(),mint,token_program);"," let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(&authority.key(),&mint,&token_program);")
    b.sub("create_associated_token_account_idempotent(payer.key,authority.key,mint,token_program);","create_associated_token_account_idempotent(payer.key,authority.key,&mint,&token_program);")
    b.sub(" require_keys_eq!(*account.owner,*token_program,PumpError::AccountTypeNotSupported);\n let data=account.try_borrow_data()?;\n let token=TokenAccount::try_deserialize_unchecked(&mut &data[..])?;"," require_keys_eq!(*account.owner,token_program,PumpError::AccountTypeNotSupported);\n let data=account.try_borrow_data()?;\n let token=TokenAccount::try_deserialize_unchecked(&mut &data[..])?;")
    b.sub(" require_keys_eq!(token.mint,*mint,PumpError::MintDoesNotMatchBondingCurve);\n Ok(())\n}"," require_keys_eq!(token.mint,mint,PumpError::MintDoesNotMatchBondingCurve);\n Ok(())\n}")
    b.sub("pub fn check_token_account<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:&Pubkey,token_program:&Pubkey)->Result<()>{","pub fn check_token_account<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:Pubkey,token_program:Pubkey)->Result<()>{")
    b.sub(" require_keys_eq!(*account.owner,*token_program,PumpError::AccountTypeNotSupported);\n let data=account.try_borrow_data()?;\n let mut slice"," require_keys_eq!(*account.owner,token_program,PumpError::AccountTypeNotSupported);\n let data=account.try_borrow_data()?;\n let mut slice")
    b.sub(" require_keys_eq!(token.mint,*mint,PumpError::MintDoesNotMatchBondingCurve);"," require_keys_eq!(token.mint,mint,PumpError::MintDoesNotMatchBondingCurve);")
    b.save()
    tot=[0,0]
    for f in ('buy_v2.rs','sell_v2.rs','sweep_fees.rs','trade_v3.rs','multi_hop_curve_swap.rs','create_v2.rs','lib.rs'):
        x=F(root,f); t='\n'.join(x.l)
        t,n1=rewrite_calls(t,'admit_associated_token_account',admit_new)
        t,n2=rewrite_calls(t,'check_token_account',ctac_new)
        x.l=t.split('\n'); x.save(); tot[0]+=n1; tot[1]+=n2
    return tot
if __name__=='__main__':
    print(apply(sys.argv[1]))
