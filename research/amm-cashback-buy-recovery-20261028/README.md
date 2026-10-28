# AMM buy cashback: 784/785 normalized windows

This source-only packet recovers the complete 8,104-byte buy cashback helper at original `0x351a8`. Relative to the frozen [union12 control (#558)](https://github.com/lalalune/pumpfun-source/pull/558), normalized coverage increases **783 → 784 of 785**, with **zero losses**. Raw-equal bodies increase **236 → 267**, also with zero losses. Whole-ELF identity remains false; sell cashback `0x4c750` remains unmatched.

Only `programs/pump-amm/src/instructions/swap/buy.rs` changes. The maintained program tree and global progress selection are untouched. [source.patch](source.patch) is the complete source difference; both complete workspaces are archived under `sources/`.

## Cause and recovered source

The private helper now accepts typed signer, mint and program references, allowing the compiler to promote their actual fields into the original physical argument ABI. Its real callers still provide the separately consumed mint-decimals argument. It takes the first remaining account with `.first()` and materializes the base-mint key before pool-v2 validation.

That source shape recovered 995 of 1,013 instructions. The only substantive residual was two result branches: ATA creation and self-transfer validation each emitted an extra jump. Propagating the ATA-creation result **after** its empty/nonempty conditional recovers all 1,013 instructions. CPI order, account checks, self-transfer validation, transfer amount/decimals, accumulator update and exit, pool-v2 validation and errors remain in the same order.

The complete linked helper and relocation pattern match under the unchanged official normalizer. All **25 actual outgoing direct calls** resolve to exact corresponding original callee bodies and relocation patterns. Both **actual incoming callers** match their entire original bodies, with the helper call at the original offset. The helper's one directly referenced panic `Location` also matches (`alloc/src/string.rs:2559:14`). These checks are recomputed by `verify.py`.

The work retains union12's inherited synthetic source positions and blank/comment layout; it does not establish historical source provenance. The changed file remains 993 lines, with no added comment-only positioning lines. Retaining the genuinely consumed decimals argument also preserves the caller's existing Source records. The typed-boundary investigation was informed by the sibling [Pump sell recovery (#555)](https://github.com/lalalune/pumpfun-source/pull/555); all inherited union12 source and evidence retain their attribution.

## Build and finite runtime evidence

The control and candidate use official native Linux v1.44 `sbpf-solana-solana` tools/libraries, locked offline dependencies, the retained physical-source registry wrapper, and `-Zremap-cwd-prefix=`. Both local crates (`pump-amm-recovered` and `native-transfer-fee`) are explicitly cleaned and freshly compiled. External dependency artifacts are reused. Build records seal all workspace files, tools and target libraries; source and target libraries are checked unchanged. No linker layout layer, executable patching or padding is used.

The portable reproducer rebuilds the archived candidate independently and produces both ELFs byte-for-byte:

| Output | SHA-256 |
| --- | --- |
| Stripped candidate | `a775c319eefbb30c3134b46f452dc9c0286bb45c0eb65e96d0f73bb0f524ac68` |
| Symbol-bearing ELF | `73d952aa51324e0ba17395a30f746e8b933cf739ae86bcb26675b4db69fbe126` |

The unchanged maintained legacy-buy suite executes **1,011 paired cases** through the actual `buy` and `buy_exact_quote_in` dispatchers. It includes 76 cashback-named cases, with 32 successes, covering new/existing ATAs, Token/Token-2022 transfers, transfer fees, missing/substituted/readonly accounts and overflow controls. It reports **zero state, error, event, inner-CPI, return-data or transaction mismatches**. Ordered logs also match after excluding only runtime compute-meter lines. Every one of the **2,022 outer transactions and 2,022 Ed25519 signatures** is independently decoded and verified again by `verify.py --signatures`. All execution uses isolated synthetic accounts and balances; no live transaction is sent.

These finite cases and static matches do not prove exhaustive behavior, whole-program identity or security clearance. The inherited admin-incentive stack-frame diagnostic remains in the compiler log and is outside this changed helper. The complete 25-suite corpus is not rerun or claimed by this packet.

## Recheck

From the repository root:

```sh
python3 research/amm-cashback-buy-recovery-20261028/verify.py --signatures
```

A rebuild requires the recorded official SDK and an offline Cargo registry/dependency cache:

```sh
python3 research/amm-cashback-buy-recovery-20261028/reproduce.py \
  --sdk /path/to/v1.44 --cargo-home /path/to/cargo-home \
  --target-dir /path/to/disposable-target --out /path/to/new-output
```

`--source control` rebuilds the frozen parent. The target directory is explicitly disposable; the reproducer cleans both local crates with the manifest, release, target and offline options. Runtime reports, normally signed transaction sidecars, harness source snapshots, full 785-window ledgers, source inventories and build receipts are retained and sealed by `MANIFEST.json`.
