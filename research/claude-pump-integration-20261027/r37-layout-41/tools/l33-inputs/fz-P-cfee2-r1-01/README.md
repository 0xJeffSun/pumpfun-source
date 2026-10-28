# fz-P-cfee2-r1-01: +0x2fa60 (v2 distribute_tokens), L31 -> 991/1035, raw 166

Base L31 (source-only, unstripped ccb52f1f...). One file changed: `src/creator/distribute_creator_fee_v2.rs`
(`distribute_tokens` at lines 335-381 and its one call in execute_v2, line 231; same line count before line 335).
Build: identity recipe via lanes/mg-P-int/tools/nbuild.py; 0 losses, 0 raw losses, no stack warnings, runtime_valid.

## What changed (all ordinary source)
1. Parameter types: `payer:&Signer<'info>`, `system_program:&Program<'info,System>`,
   `associated_token_program:&Program<'info,AssociatedToken>`, `quote_mint:&InterfaceAccount<'info,Mint>`
   (were noalias `&AccountInfo`). Inside: `.to_account_info()` for the Create{} inputs and the CpiContext program;
   transfer_tokens gets `AsRef::<AccountInfo>::as_ref(quote_mint)` (the same AccountInfo pointer as before).
   The call in execute_v2 passes `&a.quote_mint` instead of `a.quote_mint.as_ref().as_ref()`.
   Evidence: with noalias &AccountInfo params LICM hoisted all six AccountInfo field loads of quote_mint into the
   loop preheader (19 extra instructions + spills); the original loads them inside the create block.
   Ratio steps: 0.376 (z02 dt_a) -> 0.598 (payer/system/atp typed) -> 0.626 (+key before clone) -> 0.9959 (+quote_mint
   typed; only line constants left) -> 1.0 with lines placed.
2. Statement form (mg-P-z02 dt_a): `let sharing_config_key=sharing_config.key(); let creator_vault=creator_vault.to_account_info();`
   before the loop, `for (i,_shareholder) in sharing_config.shareholders.iter().enumerate()`, recipient get, `transfers[i]`
   destructure, ATA get at `transfers.len()+i`, `if initialize_ata {create}`, transfer_tokens with `&creator_vault`.
3. Source coordinates: original sites are 340 (recipient get), 346 (ATA get), 378 (checked_add Overflow);
   two `// layout-pad` blocks inside the function put them there (synthetic_layout: true). The function is the last
   item of the file, so no other site moves.

## Behaviour
Same CPIs in the same order (optional ATA create, then transfer_checked with the creator-vault seeds), same accounts.
`transfers` is built by get_token_distribution_amounts with exactly one push per shareholder, so
`transfers.len()+i` == the old `count+i` and `transfers[i]` cannot panic; both remaining_accounts lookups were already
validated there, so their error paths are unreachable and unchanged (NotEnoughRemainingAccounts). The authority
passed to transfer_tokens is a clone of the same creator_vault AccountInfo. Only Anchor error-origin line numbers
differ from L31 (now equal to the original's 340/346/378). Byte-identical to the original's function (normalized).
