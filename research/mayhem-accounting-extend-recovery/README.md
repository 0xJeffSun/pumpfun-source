# Accounting, ExtendAccount and native transfer recovery

This standalone successor to [the shared sell-quote checkpoint](../mayhem-sell-quote-call-recovery/README.md) recovers complete **O0072 ExtendAccount (4,272 bytes)** and **O0090 shared post-buy accounting (2,544 bytes)** bodies under the unchanged instruction normalizer. The inventory is **428/441 normalized matches: 70 raw-local, 358 normalized-only and 13 unmatched**. Whole-ELF identity remains unproved.

The source uses an inlined account-size helper returning `Result<usize>`, a named `Rent` value and an inlined funding helper that constructs and calls the real system transfer. This recovers the original Result boundaries, Rent lifetime and stack allocation order. Both helpers serve the actual handler. No unused synthetic helpers, extra masks, output patching or machine-code padding are used. The original names of these helpers are not authenticated.

The complete 66-file source map is in `source.tar.gz`; the exact 65-file parent map is in `parent-source.tar.gz`. `source.patch`, four override files and one added module and both inventories bind their relationship. The five changed paths are the root handler, module declaration, new ExtendAccount module, shared accounting helper in `state.rs`, and native AMM Buy transfer call. Existing source outside the precisely checked regions is retained. Error origins are `instructions/extend_account.rs` lines 89 and 108; the slice origin is line 94, column 57.

## Static evidence

`analysis.py` rederives all 441 original windows, complete candidate counterparts, raw-local status and direct edges. No code is omitted from the original text inventory. O0072 and O0090 are the only new complete matches; their 6,816 bytes reduce unmatched original text from 119,400 to **112,584 bytes**.

`progress.py` checks preservation against the exact parent, including all 426 prior normalized matches, all 70 raw-local matches, all 4,234 positive direct-callee observations, all 441 matching typed Source observations and every previously observed Source profile. No observation is lost. The previously unmatched entry-wrapper edge to ExtendAccount now matches as well. These counts use any proving counterpart for an original observation; they are distinct from the unique-counterpart counts in `audit.json`.

`helper.py` checks all **33 immediate callees** of O0072 as complete matching windows and all **19 relocated data observations** with explicit bounds. The latter include error discriminants, counted strings, two formatting vtables and their actual target bodies, a formatting function, the event-CPI prefix, program key, nested signer seeds, and Rust Source records. Addresses are compared through their typed targets, not treated as equal raw pointer bytes. This is bounded immediate call/data evidence, not recursive or unrestricted indirect closure.

`accounting.py` independently checks all twelve immediate callees and twelve bounded data references of O0090. The source factors the risk checks into an actual inlined helper and preserves the positive-deployment condition; its full original instruction body now matches. `amm_transfer.py` binds the native AMM Buy handler's actual call at candidate offset 3,488 to the complete 1,016-byte system-transfer helper. The original call is at offset 3,344. All sixteen immediate targets of the helper match; the helper has no relocated data references. The AMM Buy handler itself remains unmatched. No complete-body gain is credited for that caller change.

## Builds and runtime

The saved original clean controller and its independent repeat reproduce identical stripped and symbol ELFs:

- Parent candidate: `fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4`
- Parent symbols: `cc56231724a7973fb9cecfd3c24ab390875dd828925f79b33388a05c71f12d25`
- New candidate: `4a606bc28e73200660fd736419688c070b804179bd979947a974bab91f6965b8`
- New symbols: `3971b5de1e074fb5a6fec54b8c3805f98b5de88ef528570960aafcb6a0c5ab8f`

The receipts bind all source inputs, compiler/stripper/tool hashes, flags, target-library inventory and build logs. Each records one root, Anchor and external-account crate compilation; cached dependencies are reused. The toolchain is the unchanged macOS v1.54 compiler with official Linux v1.54 target libraries and v1.52 stripper. This is a mixed host/target recipe, not a claim that the original historical build environment has been recovered. `build.py` preserves the actual historical build controller and its local paths; the verifier does not run it.

A fresh focused runtime run compares **301 cases and 602 signature-verified transaction records** against the original: all account effects, errors, events, inner instructions, return data and non-compute logs agree. There are 84 successful original cases. Cases cover all three account types, lengths around both the discriminator and target sizes, funding, invalid ownership/accounts/signers, extra/trailing input, unknown discriminators and extreme timestamps. Record counts are not unique-signature counts. The checker rederives the exact case vectors from the saved pure fixture generator and validates every captured signature.

Fresh combined execution passes all **6,636 trade comparisons across fourteen suites**, with **13,272 signature-verified transaction records** and 2,123 successful original cases. All checked account effects, errors, events, inner instructions and return data agree. Non-compute diagnostics agree in 6,615 cases; the 21 previously recorded differences remain and no new diagnostic mismatch appears. These fresh trade receipts are bound to this combined candidate. Older admin, sweep, Burn and initializer receipts retain their parent-artifact bindings. The verifier executes no compiler, target VM, network request or mainnet operation.

## Verify or materialize

From the repository, with its prepared Python environment including `solders`:

```sh
python3 -B research/mayhem-accounting-extend-recovery/verify.py
python3 -B research/mayhem-accounting-extend-recovery/test_scope.py
python3 -B research/mayhem-accounting-extend-recovery/analysis.py --check
python3 -B research/mayhem-accounting-extend-recovery/verify.py --skip-runtime --materialize /absolute/new/source-directory
```

When reviewing the packet outside `research/`, pass `--repository-root /absolute/repository` to the three scripts. The read-only verifier requires the pinned original ELF and parent receipts already in the repository; it has no Git or network fallback. `--skip-runtime` is standard-library-only, including under `python3 -I -S -B`.

Mutation controls reject wrong opcodes/call targets, discriminants, vtable routing, counted payloads and panic origins; they also reject lost raw/positive-edge observations, path traversal, an unrelated source edit after its hashes are resealed, parent-binary substitution, missing/duplicate cases, corrupted signatures, altered account effects and changed non-compute diagnostics. All mutations operate on copies.
