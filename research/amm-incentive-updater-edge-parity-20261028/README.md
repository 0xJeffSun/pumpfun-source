# PumpSwap incentive-updater edge parity

This additive packet qualifies the already-merged Union12 recovery of
`GlobalVolumeAccumulator::update_token_incentives` with fresh signed local execution. It does not
claim another function-window gain and does not replace or modify the Union12 checkpoint.

## Why this is distinct

PR #548 recovered the complete 6,312-byte window at `0x6db20`, PR #554 corrected updater panic
locations, and PR #558 incorporated the complete data-location result into Union12. Their maintained
runtime comparators intentionally exclude some raw log differences. This packet adds a bounded
1,730-case schedule-edge corpus that compares raw logs as well as errors, account state, balances,
accumulator contents, CPI observations, return data, rollback, transaction bytes, and loaded ELF
identities.

The result is zero differences across all 1,730 paired cases, including zero raw-log differences.
The five error-order controls also compare exactly. A separate fresh replay of all 25 maintained AMM
suites reports 17,462 cases, 35,074 transactions, 35,418 verified signatures, and zero comparator
mismatches.

## Bound artifacts

- Upstream base: `4a6c726aafe5886d3100483e3c00b5e542af73bf`
- Union12 stripped ELF: `97222480163636f6fc1470b71c516e89770eba0038e4e430eda30143b383abae`
- Union12 unstripped ELF: `36a94b38f3c6fbc10a1f55c6526be07cd21356f1cc9da24ebaaa4bd28c79694e`
- Original ELF: `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`
- Window census: 783/785 normalized and 236 raw; `0x6db20` is a full 6,312-byte
  normalized match and is not a raw match.

The focused corpus covers signed and unsigned conversion boundaries, negative and extreme `i64`
schedule values, day indices 0 and 30, zero and nonzero supplies, before-start and active schedules,
overflow paths, unauthorized and read-only account controls, error precedence, rollback, and state
retention. All transactions are synthetic and locally signed. No live RPC or production mutation is
used.

## Reproduction

Use the same Python environment that supplies `solders` and `LiteSVM`:

```sh
python research/amm-incentive-updater-edge-parity-20261028/verify.py --signatures
python research/amm-incentive-updater-edge-parity-20261028/test_verify.py
```

To regenerate the focused receipts, decompress the Union12 candidate and run `producer.py` and the
observer-wrapped `cases.py`. `runtime/full17462/replay_parallel.py` recreates the maintained 25-suite
replay into a new output directory.

## Limits

This is synthetic local runtime evidence, not proof of live RPC behavior. The complete ELF is not
raw-identical to the deployed original, two unrelated AMM windows remain unmatched, and the updater
window is normalized-equal rather than raw-equal. The broad 25-suite results retain their maintained
comparators; the stricter raw-log claim applies to the five focused controls and the 1,730-case edge
corpus recorded here.
