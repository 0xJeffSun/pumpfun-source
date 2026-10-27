# PumpSwap buy routes and Pool decoder recovery

The maintained source reproduces **584/785 normalized original windows**, including **124 raw byte-equal bodies**. All 581 preceding matches remain; 201 windows remain unmatched. Matched original text is **642,616/1,162,040 bytes (55.3%)**. Whole-ELF equality remains false: this candidate is 1,305,800 bytes versus 1,268,504 meaningful original ELF bytes.

Candidate SHA-256: `e3ba703309eef943852f7e05f39ff6ac5110184d7cc257f056ef69603bcb28e8`.

## Recovered behavior and structure

- Normal and exact-quote V2 buys now have separate executors, sharing the recovered result, preview and transfer helpers. Checked base-output division restores the original error for zero effective quote reserves. Transfer execution precedes buyback-receipt/event calculations.
- The buy event builder receives the original explicit scalar values and instruction-name string instead of a reconstructed mode switch. Event fields remain covered by signed runtime comparisons. The builder itself remains structurally inexact.
- MultiHop applies preliminary LP, protocol and active-creator fees before masking inactive endpoint fees. It then saturates the fee-rate sum, retains the wide denominator, and uses checked base-output arithmetic. This restores both ordinary edge errors and the original precedence when several invalid conditions coincide.
- The checked/unchecked Pool decoders use the recovered ascending singleton cutoffs. Both complete frontend bodies, original `0x64e20`/712 bytes and `0x650e8`/584 bytes, now match under normalization. The same shared base-output wrapper at original `0x12310`/144 bytes also matches. These are the three added windows.
- `BuyResult::total_user_quote` follows the observed operand order. That helper still has source-origin differences; no exact-window claim is made for this change.

No source padding, synthetic diagnostic coordinates, executable-byte patching or forced compiler layout was used.

## Verification

Two strict offline Linux v1.44 SBPF builds reproduce identical stripped and unstripped binaries. All 41 source inputs and dependency artifacts remain unchanged during each build. The independently retained [target/sysroot proof](../sbpf-target-recovery-20261027/README.md) explains the selected official SDK target.

All 17,462 corpus cases pass, with 35,074 executions, 35,418 verified signature fields, 17,537 identical signed-input pairs and 15,567 captured top-level log pairs. All recorded fields are compared; recorded logs exclude only compute lines and exact source coordinates. Older fixtures missing full logs retain that limitation.

Fresh supplementary runs preserve the preceding 1,281 account/fee/whitelist cases, 273 legacy-fee cases, 1,996 boundaries, 72 buyback cases, 91 controlled CPI cases, 18 liquidity cases, 40 square-root cases, 134 transfer/preview cases, 58 mint-policy cases, 21 context cases and 44 MultiHop/sell cases.

Another **534 signed cases** cover 454 new MultiHop edges, 46 malformed/owner/discriminator Pool cases, 18 buy-executor boundaries and 16 event-field cases. The preceding candidate has 128 MultiHop mismatches and one buy-executor mismatch on the retained inputs; this candidate has none. Several configurations deliberately contain synthetic impossible or malformed states and do not represent live chain observations.

The direct-call closure now covers 522 original windows / 1,329 pairs. All 680 bounded literal observations agree. This is not complete indirect-call, data or relocation identity.

```sh
work/test-env/bin/python -B repro/pump_amm/buy-route-recovery-20261027/verify_saved.py --current-source
```

The sealed results manifest is `784f0d629fd9f921db7b776fedc5091faf8e1f10bbc351f4a1b5e2ebc733c5a2`. It covers source, build records, signed observations, failure baselines, measurements and static comparisons. The cached auditor reuses only identical transaction decoding/signature proofs within one audit; every receipt and message comparison remains checked. Its [equivalence and negative tests](../audit-runtime-cache-20261027/README.md) retain the unchanged original comparator.

## Remaining work

This is an intermediate checkpoint. The 201 residual windows, complete referenced-data/indirect-call identity, authentic original source provenance and successful fixed-admin `create_config` replay remain unresolved. Separate workers are addressing newly found legacy exact-buy and withdrawal error-order differences, sell-event structure, and an authentic older Solana dependency graph indicated by original source-location metadata. Those private trials are not included here.

Before promotion, origin/main was refreshed at `f3fcdf28a63c328e385ace16a5c72cac98671774`; no open PRs or AMM source/harness changes were found. The shared checkout's unrelated project work remains preserved.
