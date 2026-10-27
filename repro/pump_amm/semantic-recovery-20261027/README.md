# PumpSwap semantic and compiler-target recovery

The maintained source now reproduces **581/785 normalized original windows**, including **124 raw byte-equal bodies**. All 572 previous matches remain; 204 windows remain unmatched. The matched windows cover **641,176/1,162,040 original text bytes (55.2%)**. Whole-ELF equality remains false: the reconstructed ELF is 1,316,336 bytes versus 1,268,504 meaningful original ELF bytes. The original loader allocation's trailing zeros are excluded from meaningful-ELF comparison and are not added to this candidate.

Candidate SHA-256: `ac96a53eb7fa3f24ca275ceca733b99e4a4ced20460ee41d6979d683042be797`.

This checkpoint incorporates:

- Stored fee-config bump and inline event-authority account handling in MultiHop; inline event authority in TradeV2. Their complete account-context windows and the MultiHop public wrapper now match under normalization.
- A natural `GlobalConfig::split_buyback` extraction. Its complete 328-byte original body matches under normalization, without source spacers or remap wrappers.
- Shared sell curve and net-quote helpers; real-vault cap validation occurs before creator/protocol fee subtraction and transfer-fee decoding.
- Buy transfer composition and late volume-user initialization. Sell now has a separate executor, original transfer/accrual order, late volume-user initialization, and post-transfer buyback receipt/event construction. These bodies remain structurally inexact; no exact claim is made for them.
- The official v1.44 SDK's `sbpf-solana-solana` target and sysroot. Five previously unmatched runtime type-ID windows now match exactly, and nine additional bodies are raw-equal. See the [independently verified target experiment](../sbpf-target-recovery-20261027/README.md). No executable-byte or TypeId constant patching was used.

## Verification

Two strict incremental builds produced identical stripped and unstripped artifacts. The 41 source inputs and all existing dependency artifacts remained unchanged during both builds. Builds used the same authenticated Linux compiler distribution and pinned offline dependencies as the prior checkpoint, with the recorded target/sysroot correction.

All 17,462 corpus cases pass: 35,074 executions, 35,418 verified signature fields, 17,537 identical signed-input pairs, and 15,567 captured top-level log pairs. The recorded-log comparison excludes only compute-use lines and exact source coordinates; absent logs in older fixtures remain an explicit limitation.

Fresh additional checks cover 1,281 account/fee/whitelist cases, 273 legacy-fee cases, 1,996 trade boundaries, 72 buyback cases, 91 controlled CPI cases, 18 liquidity cases, 40 square-root cases, 134 transfer/preview cases, 58 mint-policy cases, and 21 context-constraint cases. Another 44 signed cases cover MultiHop bump handling, sell real-reserve caps and sell transfer ordering. Their retained previous-candidate baselines have 8, 4 and 2 mismatches respectively; the new candidate has none. These matrices include deliberately malformed synthetic account/configuration states, not observations of live production state.

The saved direct-call closure covers 513 original windows / 1,320 pairs. All 680 bounded literal uses agree. This does not prove the remaining indirect calls, data layout or complete binary identity.

```sh
work/test-env/bin/python -B repro/pump_amm/semantic-recovery-20261027/verify_saved.py --current-source
```

The sealed results manifest is `90423eef652c44d5e974362f51d9c386d8a8522cfb30c145535354cb81a95c14`. Build records, source snapshot, paired signed observations, failure baselines, measurements, literal constraints and both build records are retained in `results/`. The test launcher initially used an incorrect square-root producer filename; that process ran no fixtures. Its corrected isolated rerun passed all 40 cases; the other successful suites were not repeated.

## Remaining work and upstream state

Completion remains unproved. The 204 residual windows, full data/relocation identity, historical source provenance, and authentic successful fixed-administrator `create_config` replay are unresolved. A read-only residual census distinguishes 69 source-origin-only bodies, 39 established call pairs with other structural differences, and 96 windows without a mapped counterpart; these are evidence categories, not completion claims. Newly discovered exact-quote and MultiHop buy edge mismatches are being addressed in separate, unpromoted trials. The 350-case MultiHop sweep includes synthetic zero effective reserves and extreme fee rates outside the passing matrices above. See the [bound residual census](residual-analysis/README.md).

Before promotion, origin/main was fetched at `670661e0de2d3b2701e232b1ed6cf709f7fd8759`. PRs #241 and #242 had merged and no PRs remained open. Neither changed AMM source, AMM harnesses or AMM evidence. The shared dirty checkout was preserved; no reset/rebase or unrelated source replacement was performed. The earlier upstream buyback evidence was inspected and its helper reproduced naturally without adopting its padding/remap approach.
