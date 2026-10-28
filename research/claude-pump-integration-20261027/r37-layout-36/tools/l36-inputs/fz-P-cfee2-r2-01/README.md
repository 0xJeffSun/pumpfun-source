# fz-P-cfee2-r2-01: 0x34558 distribute_fee_to_holders (holder_distribution::execute, 14512 B)

Base L33 (1010/1035, raw 168, unstripped 9392550f...). Result: 1011/1035, raw 168, gains [0x34558], 0 normalized and
0 raw losses, runtime_valid, no stack warnings (clean single build of src/ with mg-P-int/tools/nbuild.py, baseline
base/L33/inventory.json). Only src/creator/distribute_fee_to_holders.rs changes (patch.diff vs base/L33/pump).
The file keeps 166 lines; the five Source sites sit on the original lines 82 (require), 120 (ok_or_else), 122
(require_keys_eq), 157 (checked_add), 164 (rent floor) through regenerated `// layout-pad` blocks -> synthetic_layout true.

## Source changes (all ordinary Rust; behaviour = original by the byte match of the whole window)
1. `let a=&ctx.accounts;let remaining_accounts=ctx.remaining_accounts;let holder_rewards=&a.holder_rewards;` BEFORE the
   line-82 require. Evidence: the original spills the remaining_accounts length (-0x390) before the require branch and
   starts the ok block with the remaining ptr load, the accounts load and accounts+0x20 (= &holder_rewards) in IR order
   (MachineSink of entry-block values).
2. holder_rewards is passed BY VALUE to a generic `authority: impl ToAccountInfo<'info>` helper param (and used for the
   close destination/authority, migrate::transfer_native source and the final lamports()). No coercion reborrow, so MIR
   keeps the local: one GEP, spilled at -0x3b8 and reloaded by every use, exactly as in the original (mechanism of
   fz-P-cfee1-r1's 0x298b0 win).
3. Token transfer through a private (LLVM-inlined) helper
   `fn transfer_tokens(token_program:&Interface<TokenInterface>, from:impl ToAccountInfo, mint:&InterfaceAccount<Mint>,
   to:&AccountInfo, authority:impl ToAccountInfo, amount, signer_seeds)` with `if amount==0{return Ok(())}` and
   `TransferChecked{from:from.to_account_info(),to:to.clone(),authority:authority.to_account_info(),mint:mint.to_account_info()}`,
   `amount, mint.decimals`; the caller passes `source.to_account_info()` by value. Evidence: the original clones the
   source before the amount test and drops it on the amount==0 path; the skip/drop block is the IR successor of the test
   (BPF analyzeBranch cannot analyze conditional branches, so MachineBlockPlacement keeps IR fallthrough order) giving
   the original `jne amount,0 -> transfer` layout; clone order token_program, from, to, authority, mint and the late
   decimals load match the original. The field order is the one used by the matched collect_v2::transfer_tokens.
4. `let amount=*amount;let recipient=&accounts[0];` (amount first) and, in the native branch,
   `let signer=&[seeds];crate::migrate::transfer_native(a.system_program.as_ref(),holder_rewards,recipient,amount,signer)?;`
   (seeds slice stored before the system_program load, as in the original).
Call sequence of the window (42 calls) resolves to the same callees in the same order as the original (tools/calls.py).

## How it was found (lane dir claude-pump-work/lanes/fz-P-cfee2-r2)
Multiplexed variant builds (gen/hv10..hv16.py, mux.sh), frame/drift/call-sequence summaries (tools/frame.py, calls.py),
and clang -O3 on the pre-opt bitcode for branch-weight probes (irb.sh, tools/prof.py, pv2.sh).
Ratios: 0.6230 (r1 best/hAp) -> 0.7861 (1,2) -> 0.8429 (3 by-value from) -> 1.0000 (field order, amount-first, signer let).
