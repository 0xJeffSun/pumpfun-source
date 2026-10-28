# claude-fees-final-mayhem-o0073

Block-placement recovery of Mayhem window **O0073** `FeeRecipient::validate_sweep`
(original start 65472, 912 bytes), the last layout residual in the Mayhem 432 parent.

Parent `research/mayhem-quotes-current-recovery-20261027` (432/441, stripped
`73dff97e…`, symbols `440b9281…`) -> with this one-function change: **433/441**, O0073
normalized-identical, +3 Source records, +7 direct edges, **no losses**, no stack-offset
warning. The change is ordinary Rust confined to `validate_sweep` (fee_recipients.rs 46–64,
total line count unchanged).

## Layout
- `source.patch` — unified diff, parent-432 -> shipped, `fee_recipients.rs` only.
- `sources/fee_recipients.rs` — shipped file; `sources/fee_recipients.parent.rs` — the parent
  file (digest equals the canonical 432 `source-inputs.json`).
- `builds/` — `candidate.so.gz` (stripped, `c8fb565e…`), `symbols.so.gz` (`63a501e0…`),
  `build-result.json`, `launch.json`, `build-stderr.gz`.
- `measurement/measure-vs-parent432.json` — progress vs the 432 parent symbols (the 433/441,
  no-losses result). `measurement/measure-mbcp2-composition.json` — same change composed onto
  mayhem-b's cp2 restructure tree (other call site), O0073 gained, no losses.
- `runtime/ratelimit-differential.json.gz` — targeted differential of validate_sweep's body (856
  cases: pass+write, `SweepFeeRateLimit` at :61, add-overflow panic at :58:32), 0 mismatches and 0
  log differences vs the deployed original, identical to the parent.
  `runtime/sweeps-differential.json.gz` / `runtime/sweeps-parent432.json.gz` — the stock 692-case
  sweep suite on the shipped ELF and on the 432 parent: 0 mismatches; the shipped ELF matches the
  parent on every case, so the 58 pre-existing log-only differences (sweep-handler diagnostic
  origins, mayhem-b's area) are unchanged. `runtime/trades-summary.json` — 14 trade families, 6,636
  cases, 0 mismatches (per-family outputs, 713 MB, not committed; rerun with
  `research/claude-mayhem-b-20261027/tools/run_trades.py ROOT candidate.so OUTDIR`).
- `tools/` — `o73.py` (window report/diff), `irs.py` + `split_checks.py` (IR block surgery + llc;
  reproduces the 18 -> 0 proof), `sbatch.py` (source-variant batch under the slot lock),
  `o73_ratelimit_differential.py` (the targeted runtime driver). They use the durable Mayhem
  environment on this machine; `verify.py` is the self-contained checker.
- `composition-cp4/` — the same `source.patch` on the current Mayhem frontier, mayhem-b
  `cp4-q04-o0075` (433/441, merged as PR #390): composed ELFs (`e0d0d0c3…` / `828751f9…`),
  **434/441** with O0073 the only gain over cp4 and no losses, cp4 reproduced bit-for-bit
  (`c1f25d01…`), stock sweep and rate-limit receipts equal to the original including logs and
  identical to cp4, and the trade summary. This is the form to integrate.
- `ir-evidence/` — the `llc` proof chain (threaded vs `-JumpThreading` vs split-checks IR, the
  MIR before/after `JumpThreading`, and `NOTES.md`).
- `verify.py` — stdlib-only, HOME-independent checker (see below).

## Build
Mixed host/target SDK, qualified `ordered.ld`, under the shared slot lock, root crate only:

    python3 claude-mayhem-work/sbf_lock.py --slots 6 --name sbf -- \
      python3 claude-mayhem-work/mayhem-b/build/build_lane.py LABEL ROOT ff-o73

`ROOT` is the 432 parent tree with `source.patch` applied. `build-result.json`/`launch.json`
record the exact command, tool digests and the 26 hash-checked Linux v1.54 target libraries.

## Verify
    HOME=$(mktemp -d) python3 -B research/claude-fees-final-mayhem-o0073/verify.py

Checks the manifest, that the patch only rewrites validate_sweep (line count preserved) off the
canonical parent, that the gzipped ELFs match the recorded build (exit 0, no stack-offset
warning), that O0073 is the only gain with no losses (432 -> 433) on both call-site forms, and
that the runtime receipts are bound to the shipped ELF.

## Prior work
`research/mayhem-sweep-rate-current-recovery` reached O0073's 912-byte extent with
`if native == false { field_34 } else { field_10 }` but left 19 slots different and claimed no
match; PR #292's Linux sweep-helper controls covered interval-load and nested-guard forms;
mayhem-b's notes record the nested-guard (904 B / 23 slots), `if !native`, casts-in-arms and
`match native` controls. None of those forms removes both causes below.

## Mechanism
Two independent effects kept the parent off O0073, each proven on rustc's own IR with `llc`
(`ir-evidence/NOTES.md`): MIR `JumpThreading` duplicating the `native` dispatch (defeated by the
address-taken `let flag = &native;`), and LLVM SimplifyCFG fusing the two zero tests (defeated by
reading the interval field lazily inside the short-circuit).
