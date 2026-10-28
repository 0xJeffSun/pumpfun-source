# Fees: recover CreateDonationFeePda from Rust — 584/585 normalized

**Result: 584 / 585 normalized original Fees functions (+1 vs the 583-function parent), 200 raw-local, 585 compiled windows.**
Newly matched original windows: 163920. No normalized match is lost
(raw-local lost: none). Whole-ELF and capture equality remain false; 1 original
function(s) remain unmatched: 147944.

Parent: the 583-function Fees research frontier (PR #301 / #308 qualified Sweep on research/fees-extend-integration) (Linux symbols `f150b4c68704c445…`, rebuilt here byte-for-byte). Only the files listed in
`source.patch` change.

## CreateDonationFeePda source recovery

The reconstructed `instructions::fee_sharing::create_donation_fee_pda::create` matches the complete original window
**163920 (1,641 instructions / 13,800 bytes)** under the repository normalizer. The candidate-only
`<DonationFeePdaCreated as anchor_lang::Event>::data` helper (648 bytes) is gone: like the original, the event
serialization is inlined, so the build has the original's **585 compiled windows**. Only
`instructions/fee_sharing/create_donation_fee_pda.rs` changes, and every `require!`/`require_keys_eq!` site stays on
its original source line (148/152/156/174/192/197/204/213/214/221).

Source form (ordinary safe Rust):
- `fn is_graduated(curve: &BondingCurve) -> bool`: the four reserve tests. With `curve` as a dereferenceable
  parameter they fold into the original's four-test chain.
- The creator / quote-mint resolution and the Sharing-config checks move into a helper,
  `fn get_creator_and_quote_mint(bonding_curve, pool, payer, base_mint, sharing_config) -> Result<(Pubkey, Pubkey)>`,
  with `let (creator, quote_mint) = if is_graduated(curve) { ..; (pool.coin_creator, pool.quote_mint) } else { ..;
  (curve.creator, quote) };`. The Sharing branch compares payer first (`require!(payer.key() == config.admin, ..)`)
  and ends with an explicit `return Ok((config.admin, quote_mint));` inside the borrow scope.
- Pool data is deserialized through a named slice local (`let mut slice: &[u8] = &data;`).
- `create` writes `pda.creator` before `pda.quote_mint`, builds the event after `Clock::get()`, then `emit!` and
  `emit_cpi!`.

Why these forms reproduce the original body (measured):
- **Inlining.** Keeping validation in a separate helper keeps the handler's event emission on warm paths. LLVM's
  cold-callsite inliner (block frequency < 2% of caller entry, threshold 45) then inlines `Event::data`, `from_iter`,
  `AccountInfo::clone` and `exchange_malloc` there. It also reproduces the original split per error site between an
  inlined `<FeeError as Display>::fmt` and an outlined `ToString`.
- **Block order.** SBF's `analyzeBranch` cannot analyze conditional branches, so block order follows IR order.
  `if is_graduated(..)` gives the original four-test chain and pool-chain placement.
- **Frame slots.** The tuple binding lets SROA split the pair into adjacent `creator`/`quote_mint` slots at the
  original frame offsets (-96/-128). The named slice local keeps the Pool-deserialize slice in its own slot
  (-784) instead of being merged by StackColoring.
- **Load order.** Helper parameters follow the order the original loads the account wrappers
  ([r7+872], [r7+88], [r7+272]) after ArgumentPromotion.

Found in parallel by three fees100 lanes. create-c supplied the helper/`is_graduated` form, payer-first, the explicit
return and the write order. create-b supplied the tuple, slice-local and parameter-order steps; its spelling
`let mut data: &[u8] = &info.try_borrow_data()?;` builds a byte-identical ELF. create-a contributed the chain-order
analysis. Building on the open PR #304 tree (13,448 B, which first eliminated the extra helper) and on PRs #301/#302.

## Build and validation

- Canonical Linux v1.44 build (`sbpf-solana-solana`, `cargo rustc --release --locked --offline`, vendored macro at the
  parent's `/work/next637/vendor/used-public` path, `layout/ordered.ld` re-bound to the changed sections with
  `relayout.py` from research/claude-fees100-whole-elf-endstate-20261027 and applied through a linker wrapper,
  pinned v1.52 `llvm-objcopy --strip-all`): candidate `6257a5edade018935ea0876ac6b7bdde0864b28b388cc08cd75ff5ddd9eb2b68`, symbols `404a734e539dab4645d99d6cda7ed009d09d865b3bbdcc220b9d6a157686d695`. A second build reproduced both hashes.
- Runtime: `scripts/fees_validate_all.py` passes **17,331 cases across 18 suites** with
  zero mismatches against the captured original.
- No assembly, captured instruction fragments, padding or post-link rewriting. `source/` is the complete workspace
  (program inputs, layout recipe and the vendored `anchor-attribute-program` with `#[used]`, inherited from the parent).

```sh
python3 -B research/claude-fees100-create-donation-20261027/verify.py
```

The verifier rejects extra/symlinked/special files and optimized Python, re-hashes both ELFs, recomputes the
normalized/raw window sets with `research/fees-composed-frontier188/window_map.py`, checks the gained windows against
the included parent ELF, re-derives `source.patch`, and checks the runtime summary binding.
