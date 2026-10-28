# fz-P-mig2-r1-02 (base L31, 990 -> 992/1035, raw 166 -> 167)

Gain: 0x49888 migrate_v2::execute (8888 B) now normalized-equal to the original (win.py ratio 1.0000, sites 243/249/335 on their lines).
Raw side gain: 0xd240. Losses: none (normalized and raw). Build clean, no stack warnings.

## What changed (src/migrate_v2.rs only, line-neutral)
1. execute rewritten on the original's helper decomposition (ported from mg-P-mig v/V3 and mg-P-z04 MA1/MB12):
   pay_migration_fee(a,&a.pool_authority,native,fee) (sub_lamports/add_lamports or system transfer from user),
   create_token_account_v2 x4 (pool base, pool quote, pool-authority base, pool-authority quote; signed by pool authority
   with the bonding curve as extra account when native, else payer = user), transfer_base_to_pool_authority,
   fund_quote_token_account_v2, create_pool, init_pump_amm_boost_v2 (mayhem skip; remaining_accounts [boost,vault]
   else require !boost_enabled), close pool-authority accounts, harvest withheld fees when the quote mint has a
   transfer fee (QuoteMintNotWritable 6110 unchanged), burn LP, close LP account, refund pool authority, reset reserves,
   emit!+emit_cpi! CompletePumpAmmMigrationEvent.
2. Two source-form fixes found by a multiplexed sweep (tools/mx.py, spec/s1.py in the lane):
   - `let migrated = rq==0 && vq==0 && rt==0 && vt==0; if migrated { msg!(..); return Ok(()); }` (the `&&` chain inside
     the `if` put the 3 remaining reserve tests out of line; the bound bool reproduces the original's block order).
   - reserve reset through `let c:&mut crate::trade_types::BondingCurve=&mut ctx.accounts.bonding_curve;` (one pointer
     load for the four stores, as in the original and in v1 migrate.rs).

## Behaviour notes for the integrator (please run the runtime corpus)
Differences from L31's execute that are not purely structural (all follow the original's byte-matched execute / sites):
- quote-account size for boost funding: 165 for SPL Token, else required_quote_account_len(mint) or
  UnsupportedQuoteMint (original site migrate_v2.rs:747), where L31 returned ProgramError::InvalidAccountData.
- "quote account created" = pool_authority_quote_account owned by the system program before creation (L31: not
  (owned by quote token program and non-empty)).
- harvest condition uses transfer_fee_recovered::get_transfer_fee(quote_mint).is_some() (L31: TLV scan for extension type 1).
I did not run the 44-suite runtime corpus (needs an integration package).

## -02 addition: 0x52660 init_pump_amm_boost_v2 (9776 B) normalized-equal (sites 658/747 on their lines)
Line 664: the pool-authority-signed init_boost closure and its call are wrapped in a block, `{let init=move||(..)(&[..seeds..]);init()?;}`
(scope only; no behaviour change). The block's scope end gives the init `?` error edge its own block (orig `ldxdw r2; ja` stub)
and the refund `?` the original's `jeq ok,+1; ja err` shape (sweep spec/b2.py, multiplexed tools/mxf.py).
