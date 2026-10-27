# AMM transfer helpers and mint-policy recovery

The maintained candidate `132f05e7233cd17a666dadf157018d3976732a066a15194ff737d093a79382ef` matches **569/785 normalized original windows**, including **115 raw matches**, with **216 unmatched windows**. All previous normalized matches remain. Matched original text is **602,448/1,162,040 bytes (51.8%)**. Whole-ELF equality is false.

Four complete helper bodies now match under the retained normalization:

| Original | Bytes | Recovered operation |
| --- | ---: | --- |
| `0x72128` | 888 | Pool-authorized transfer with reconstructed signer seeds |
| `0x73118` | 1,928 | Pool-authorized LP mint |
| `0x70280` | 2,272 | Typed source to raw destination, signed by user |
| `0x716b8` | 2,672 | Typed source to raw destination, signed by pool |

The source uses these helpers in legacy and v2 trades, creation, deposits and withdrawals. Creation initializes the pool before its mint helper, matching the original state dependency. This does not assert that the complete caller bodies match.

The reconstructed fee accrual now follows the original sequence: output transfer, state accrual, input transfer, then buyback payout. Buyback preview arithmetic and transfer-fee checks remain before minimum-output checks and transfers. Frozen negative receipts demonstrate the earlier overflow ordering, invalid-rate preview and self-transfer failures. The 2,496-byte accrual helper still differs at four source-origin metadata pairs and is not counted as matched.

Mint policy now rejects duplicate or malformed TLVs, preserves the observed numeric extension allowlist, and restricts extra quote extensions to canonical Pump pools. The special mint bypass is retained. The parser implementation has behavioral evidence but does not yet match the original helper bodies; no speculative external-crate boundary was promoted.

```sh
work/test-env/bin/python -B repro/pump_amm/parallel-helper-recovery-20261027/verify_saved.py --current-source
```

The verifier authenticates the saved 38-file source/build snapshot and recomputes static matching. Runtime evidence includes the existing 17,462-case corpus; 1,281 account/fee cases; 273 legacy trade cases; 1,996 trade boundaries; 72 buyback cases; 91 controlled CPI cases; 18 liquidity cases; 40 square-root cases; 134 new transfer/preview-order cases; and 58 mint-policy cases. Counts can overlap in coverage and are not a unique-scenario total. The corpus contains 35,074 executions and 35,418 verified signature fields. All recorded fields and available logs are compared, excluding only compute lines and exact source coordinates. Some original harnesses omit full logs; those gaps are not treated as proof.

The mint-policy group includes 46 direct creation cases and 12 canonical Pump migration CPIs. Those canonical cases reach token transfer after accepted policy; extended classic-token fixtures intentionally fail in the token program. They are evidence for policy order, not live chain acceptance. Invalid-rate, synthetic balance and malformed account fixtures are also deliberate local tests.

Paired direct-call closure covers 506 original windows (1,301 pairs); 264 exclude indirect calls and 72 exclude static/external/indirect boundaries. All 591 observed bounded literal uses are equal. Full data identity, indirect/external targets, the remaining 216 windows, historical provenance and authentic fixed-administrator `create_config` success remain unresolved.

The full replay driver uses eight isolated workers and schedules larger suites first. A short trade/changed-path gate runs before the complete replay. Pinned compiler/dependency bytes and immutable source snapshots remain checked.
