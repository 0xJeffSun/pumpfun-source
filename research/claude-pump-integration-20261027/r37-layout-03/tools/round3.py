#!/usr/bin/env python3
"""round3.py <crate dir>: round-3 lane deliveries (all based on r37g4) and pump-hi patches, re-applied on the
integ-layout composite AFTER the coordfiles / coordlib / nearmiss2 genuine steps (some target code those steps moved).
  pump-hi  anchor-lang feature `allow-missing-optionals` (Cargo.toml): missing trailing optional accounts become None,
           so DistributeFeeToHolders::try_accounts builds AccountNotEnoughKeys only twice (orig 0xc5650).
  bodyloB-04 (cumulative, +7 on r37g4): transfer helpers with the original parameter shapes, wired to the original callers'
           counterparts.  The legacy buy / sell hunks are applied to BOTH copies of the legacy bodies: buy.rs's generic
           `execute` (still used by buy_exact_sol_in) and the lib.rs `buy` / `sell` #[program] handlers that coordlib's
           changes4.py inlined (same statements, path-qualified there).
             0x56658 migrate_v2::refund_pool_authority seeds as one nested temporary passed to an inlined closure
             0x8c2d8/0x8e908/0x90e60/0x91690/0x92820/0x93898: user_quote_payments::transfer_native_unchecked /
             transfer_native_curve_unchecked (lib.rs), collect_v2::transfer_vault_tokens / transfer_user_tokens_ref /
             transfer_user_quote_tokens (collect_creator_fee.rs), token_transfers::transfer_curve_tokens_ref
             (v2_token_transfers.rs), and their call sites (legacy buy/sell, trade_v3 buyback quote transfers, admin_cto
             pay_token).
"""
import re, sys
from pathlib import Path
C = Path(sys.argv[1]); S = C / 'src'


def rd(p): return (S / p).read_text()
def wr(p, t): (S / p).write_text(t)


def rep(t, old, new, n=1, what=''):
    assert t.count(old) == n, (what or old[:80], t.count(old), n)
    return t.replace(old, new)


# ---------------------------------------------------------------- pump-hi: anchor-lang allow-missing-optionals
ct = (C / 'Cargo.toml').read_text()
ct = rep(ct, 'anchor-lang = {version = "=0.31.1", features = ["event-cpi", "init-if-needed"]}',
         'anchor-lang = {version = "=0.31.1", features = ["event-cpi", "init-if-needed", "allow-missing-optionals"]}', what='Cargo.toml anchor-lang')
(C / 'Cargo.toml').write_text(ct)

# ---------------------------------------------------------------- bodyloB-04
# migrate_v2 refund_pool_authority (bodyloB-01)
t = rd('migrate_v2.rs')
t = rep(t, " let mint=a.base_mint.key();let bump=[bump];let signer_seeds:&[&[&[u8]];1]=&[&[b\"pool-authority\",mint.as_ref(),&bump]];\n"
           " crate::migrate::transfer_native(a.system_program.as_ref(),&a.pool_authority,destination,amount,signer_seeds)\n",
           " let transfer=|signer_seeds:&[&[&[u8]];1]|crate::migrate::transfer_native(a.system_program.as_ref(),&a.pool_authority,destination,amount,signer_seeds);\n"
           " transfer(&[&[b\"pool-authority\",a.base_mint.key().as_ref(),&[bump]]])\n", what='refund_pool_authority')
wr('migrate_v2.rs', t)

# helpers: lib.rs user_quote_payments
t = rd('lib.rs')
t = rep(t, "    #[inline(never)]\n    pub fn transfer_from_user<'info>(\n",
        "    #[inline(never)]\n"
        "    pub fn transfer_native_unchecked<'info>(\n"
        "        system_program: &AccountInfo<'info>,\n"
        "        payer: &Signer<'info>,\n"
        "        destination: &AccountInfo<'info>,\n"
        "        amount: u64,\n"
        "    ) -> Result<()> {\n"
        "        anchor_lang::system_program::transfer(\n"
        "            CpiContext::new(system_program.clone(), anchor_lang::system_program::Transfer {\n"
        "                from: payer.to_account_info(),\n"
        "                to: destination.clone(),\n"
        "            }), amount,\n"
        "        )\n"
        "    }\n"
        "\n"
        "    #[inline(never)]\n"
        "    pub fn transfer_native_curve_unchecked<'info>(\n"
        "        system_program: &AccountInfo<'info>,\n"
        "        payer: &Signer<'info>,\n"
        "        destination: &Account<'info, BondingCurve>,\n"
        "        amount: u64,\n"
        "    ) -> Result<()> {\n"
        "        anchor_lang::system_program::transfer(\n"
        "            CpiContext::new(system_program.clone(), anchor_lang::system_program::Transfer {\n"
        "                from: payer.to_account_info(),\n"
        "                to: destination.to_account_info(),\n"
        "            }), amount,\n"
        "        )\n"
        "    }\n"
        "\n"
        "    #[inline(never)]\n    pub fn transfer_from_user<'info>(\n", what='user_quote_payments helpers')
wr('lib.rs', t)

# helpers: collect_creator_fee.rs (collect_v2)
t = rd('creator/collect_creator_fee.rs').rstrip('\n') + '\n'
t += '''
#[inline(never)]
pub fn transfer_vault_tokens<'info>(
 token_program:&Interface<'info,anchor_spl::token_interface::TokenInterface>,
 source:&UncheckedAccount<'info>,destination:&UncheckedAccount<'info>,authority:&AccountInfo<'info>,
 decimals:u8,mint:&AccountInfo<'info>,amount:u64,signer_seeds:&[&[&[u8]];1],
)->Result<()>{
 anchor_spl::token_interface::transfer_checked(
  CpiContext::new_with_signer(token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{
   from:source.to_account_info(),to:destination.to_account_info(),authority:authority.clone(),mint:mint.clone(),
  },signer_seeds),amount,decimals,
 )
}

#[inline(never)]
pub fn transfer_user_tokens_ref<'info>(
 token_program:&Interface<'info,anchor_spl::token_interface::TokenInterface>,
 source:&InterfaceAccount<'info,anchor_spl::token_interface::TokenAccount>,
 destination:&InterfaceAccount<'info,anchor_spl::token_interface::TokenAccount>,
 authority:&&Signer<'info>,decimals:u8,mint:&AccountInfo<'info>,amount:u64,
)->Result<()>{
 anchor_spl::token_interface::transfer_checked(
  CpiContext::new(token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{
   from:source.to_account_info(),to:destination.to_account_info(),authority:authority.to_account_info(),mint:mint.clone(),
  }),amount,decimals,
 )
}

#[inline(never)]
pub fn transfer_user_quote_tokens<'info>(
 token_program:&Interface<'info,anchor_spl::token_interface::TokenInterface>,
 source:&UncheckedAccount<'info>,destination:&UncheckedAccount<'info>,authority:&AccountInfo<'info>,
 decimals:u8,mint:&AccountInfo<'info>,amount:u64,
)->Result<()>{
 if amount==0{return Ok(());}
 anchor_spl::token_interface::transfer_checked(
  CpiContext::new(token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{
   from:source.to_account_info(),to:destination.to_account_info(),authority:authority.clone(),mint:mint.clone(),
  }),amount,decimals,
 )
}
'''
wr('creator/collect_creator_fee.rs', t)

# helper: v2_token_transfers.rs
t = rd('v2_token_transfers.rs').rstrip('\n') + '\n'
t += '''
/// Transfer curve tokens with the curve authority passed by double reference.
#[inline(never)]
pub fn transfer_curve_tokens_ref<'info>(
    token_program: &Interface<'info, TokenInterface>,
    source: &InterfaceAccount<'info, TokenAccount>,
    destination: &InterfaceAccount<'info, TokenAccount>,
    authority: &&Account<'info, BondingCurve>,
    decimals: u8,
    mint: &AccountInfo<'info>,
    amount: u64,
    signer_seeds: &[&[&[u8]]; 1],
) -> Result<()> {
    if amount == 0 {
        return Ok(());
    }
    token_interface::transfer_checked(
        CpiContext::new_with_signer(
            token_program.to_account_info(),
            TransferChecked {
                from: source.to_account_info(),
                to: destination.to_account_info(),
                authority: authority.to_account_info(),
                mint: mint.clone(),
            },
            signer_seeds,
        ),
        amount,
        decimals,
    )
}
'''
wr('v2_token_transfers.rs', t)
t = rd('buy_v2.rs')
if '\nmod token_transfers;' in t:
    t = t.replace('\nmod token_transfers;', '\npub mod token_transfers;', 1)
assert '\npub mod token_transfers;' in t
wr('buy_v2.rs', t)

# legacy buy call sites: buy.rs generic body (`token_interface::` / `TransferChecked`) and the lib.rs buy handler
# (changes4: `anchor_spl::token_interface::` paths); same statements.
BUY = [
    (r"if amount>0\{(?:anchor_spl::)?token_interface::transfer_checked\(CpiContext::new_with_signer\(a\.token_program\.to_account_info\(\),(?:anchor_spl::token_interface::)?TransferChecked\{from:a\.associated_bonding_curve\.to_account_info\(\),mint:a\.mint\.to_account_info\(\),to:a\.associated_user\.to_account_info\(\),authority:a\.bonding_curve\.to_account_info\(\)\},&\[seeds\]\),amount,a\.mint\.decimals\)\?;\}",
     "crate::buy_v2::token_transfers::transfer_curve_tokens_ref(&a.token_program,&a.associated_bonding_curve,&a.associated_user,&&a.bonding_curve,a.mint.decimals,a.mint.as_ref(),amount,&[seeds])?;"),
    (r"if quote>0\{anchor_lang::system_program::transfer\(CpiContext::new\(a\.system_program\.to_account_info\(\),anchor_lang::system_program::Transfer\{from:a\.user\.to_account_info\(\),to:a\.bonding_curve\.to_account_info\(\)\}\),quote\)\?;\}",
     "if quote>0{crate::user_quote_payments::transfer_native_curve_unchecked(a.system_program.as_ref(),&a.user,&a.bonding_curve,quote)?;}"),
    (r"for \(to,amount\) in \[\(bb\.clone\(\),bf\),\(a\.fee_recipient\.to_account_info\(\),protocol_fee\)\]\{if amount>0\{anchor_lang::system_program::transfer\(CpiContext::new\(a\.system_program\.to_account_info\(\),anchor_lang::system_program::Transfer\{from:a\.user\.to_account_info\(\),to\}\),amount\)\?;\}\}",
     "if bf>0{crate::user_quote_payments::transfer_native_unchecked(a.system_program.as_ref(),&a.user,bb,bf)?;}\n"
     " if protocol_fee>0{anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{from:a.user.to_account_info(),to:a.fee_recipient.to_account_info()}),protocol_fee)?;}"),
]
SELL = [
    (r"(?:anchor_spl::)?token_interface::transfer_checked\(CpiContext::new\(a\.token_program\.to_account_info\(\),(?:anchor_spl::token_interface::)?TransferChecked\{from:a\.associated_user\.to_account_info\(\),mint:a\.mint\.to_account_info\(\),to:a\.associated_bonding_curve\.to_account_info\(\),authority:a\.user\.to_account_info\(\)\}\),amount,a\.mint\.decimals\)\?;",
     "crate::collect_v2::transfer_user_tokens_ref(&a.token_program,&a.associated_user,&a.associated_bonding_curve,&&a.user,a.mint.decimals,a.mint.as_ref(),amount)?;"),
]
counts = {}
for f in ['buy.rs', 'lib.rs', 'sell.rs']:
    t = rd(f)
    for i, (pat, new) in enumerate(BUY + SELL):
        indent_new = new
        def sub(m):
            # keep the line's own indentation for the second statement of the bf/protocol split
            line_start = t.rfind('\n', 0, m.start()) + 1
            ind = re.match(r'[ \t]*', t[line_start:]).group(0)
            return indent_new.replace('\n ', '\n' + ind)
        t, n = re.subn(pat, sub, t)
        counts[(f, i)] = n
    wr(f, t)
by = {i: sum(n for (f, j), n in counts.items() if j == i) for i in range(len(BUY) + len(SELL))}
# 3 buy statements x 2 copies (buy.rs execute + lib.rs buy handler); the sell transfer: lib.rs sell handler (+ sell.rs if kept)
assert by[0] == by[1] == by[2] == 2, counts
assert by[3] >= 1, counts

# trade_v3 buyback quote transfers (buy / buy_exact_quote)
t = rd('trade_v3.rs')
t = rep(t, "      if total_buyback!=0 {\n"
           "        token_interface::transfer_checked(CpiContext::new(a.quote_token_program.to_account_info(),TransferChecked{from:a.associated_quote_user.to_account_info(),mint:a.quote_mint.to_account_info(),to:a.buyback_fee_recipient.to_account_info(),authority:a.user.to_account_info()}),total_buyback,decimals)?;\n"
           "      }\n",
           "      crate::collect_v2::transfer_user_quote_tokens(&a.quote_token_program,&a.associated_quote_user,&a.buyback_fee_recipient,a.user.as_ref(),decimals,a.quote_mint.as_ref().as_ref(),total_buyback)?;\n",
           n=2, what='trade_v3 buyback transfers')
wr('trade_v3.rs', t)

# admin_cto pay_token
t = rd('creator/admin_cto.rs')
t = rep(t, "pay_token(a,&a.holder_creator_vault.to_account_info(),&a.holder_creator_vault_quote_token_account.to_account_info(),amount,vaultseeds)?;",
        "pay_token(a,&a.holder_creator_vault.to_account_info(),&a.holder_creator_vault_quote_token_account,amount,vaultseeds)?;", what='pay_token caller')
t = rep(t, "#[inline(never)]fn pay_token<'info>(a:&AdminCto<'info>,owner:&AccountInfo<'info>,to:&AccountInfo<'info>,amount:u64,seeds:&[&[u8]])->Result<()>{\n"
           " anchor_spl::associated_token::create_idempotent(CpiContext::new(a.associated_token_program.to_account_info(),anchor_spl::associated_token::Create{payer:a.admin_set_creator_authority.to_account_info(),associated_token:to.clone(),",
        "#[inline(never)]fn pay_token<'info>(a:&AdminCto<'info>,owner:&AccountInfo<'info>,to:&UncheckedAccount<'info>,amount:u64,seeds:&[&[u8]])->Result<()>{\n"
        " anchor_spl::associated_token::create_idempotent(CpiContext::new(a.associated_token_program.to_account_info(),anchor_spl::associated_token::Create{payer:a.admin_set_creator_authority.to_account_info(),associated_token:to.to_account_info(),",
        what='pay_token signature')
t = rep(t, " if amount>0{anchor_spl::token_interface::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{from:a.creator_vault_quote_token_account.to_account_info(),mint:a.quote_mint.to_account_info(),to:to.clone(),authority:a.creator_vault.to_account_info()},&[seeds]),amount,a.quote_mint.decimals)?;}Ok(())}",
        " if amount>0{crate::collect_v2::transfer_vault_tokens(&a.quote_token_program,&a.creator_vault_quote_token_account,to,&a.creator_vault,a.quote_mint.decimals,a.quote_mint.as_ref().as_ref(),amount,&[seeds])?;}Ok(())}",
        what='pay_token transfer')
wr('creator/admin_cto.rs', t)
print('round3 applied: pump-hi allow-missing-optionals, bodyloB-04', {f'{f}#{i}': n for (f, i), n in counts.items() if n})
