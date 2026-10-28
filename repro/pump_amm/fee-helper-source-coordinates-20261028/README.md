# PumpSwap fee-helper source-coordinate recovery

This is an unqualified research-only source proposal, retained in
[`proposed/fees.rs`](proposed/fees.rs) and [`source.patch`](source.patch).
The maintained `programs/pump-amm/src/curve/fees.rs` remains at the authenticated
checkpoint. The proposal changes whitespace so the compiler assigns the original
source lines to `ceil_div` and `fee`; the whitespace-stripped file is identical
to the parent source.

The selected maintained checkpoint remains
`private-sweep-recovery-20261027`: **656/785 normalized** and **148/785 raw**.
This packet does not replace that candidate or change published metrics.

## Evidence

The selected candidate (`9278a52a...`) has only these remaining normalized
instruction differences in the two proposed windows:

- original `0x12b08`, 1,672 bytes, candidate `0x226a0`: source-line immediates
  `18 -> 19` and `19 -> 21`;
- original `0x13190`, 712 bytes, candidate `0x22d28`: source-line immediate
  `25 -> 32`.

The proposed layout puts those operations on lines 19, 21, and 32. A separate
same-host v1.44 experiment produced zero normalized instruction differences in
both complete windows and moved a 785-window cohort from 651 to 653 normalized
matches with no normalized or raw loss. `result.json` records its asserted hashes and results. The experiment's binaries
and build receipts are not archived here, so those proposed-body results cannot
be independently recomputed unless the exact external artifacts are supplied.
The authenticated Linux checkpoint build could not be run here.

The authenticated driver requires Podman, the pinned Linux/amd64 v1.44 SDK and
authenticated archive, and the retained logical dependency caches. This host is
Darwin arm64, has no Podman, and only has the Darwin v1.44 tools. Consequently
there is no maintained-checkpoint build, runtime promotion, or claim that the
selected 656/785 result has increased.

## Verification

From a full checkout:

```sh
python3 -B repro/pump_amm/fee-helper-source-coordinates-20261028/verify.py
```

The verifier checks proposal source identity, the archived patch, unchanged
maintained source, all 785 selected-checkpoint windows, the three retained
diagnostic differences, and the 17 immediate call targets. It does not prove
recursive call/data closure for the proposed bodies. In a sparse
checkout, pass the selected checkpoint artifacts explicitly:

```sh
python3 -B repro/pump_amm/fee-helper-source-coordinates-20261028/verify.py \
  --selected-candidate /path/to/candidate.so \
  --selected-symbols /path/to/unstripped.so
```

If the two exact same-host artifacts named in `result.json` are available,
`--local-baseline` and `--local-candidate` additionally recompute the recorded
651-to-653 inventory. The verifier never executes a target or writes evidence.

No live transaction was submitted. Runtime behavior is not newly claimed: the
Rust token stream is unchanged, but diagnostics are observable and therefore
must be qualified by the maintained build and existing offline runtime suites
before promotion.
