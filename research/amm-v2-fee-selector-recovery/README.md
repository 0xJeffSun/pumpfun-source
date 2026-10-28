# Recover the complete AMM v2 fee selector

Ordinary Rust source now reproduces the complete original **0x14088**, a
**1,656-byte / 195-instruction** fee selector. Identical normal builds advance
the same research cohort from **736 to 737/785 normalized function windows**,
with no previous normalized or raw losses and **159 raw matches** retained.
Only `programs/pump-amm/src/curve/fees.rs` changes. Review `source.patch` and
`proposed/fees.rs`; the full authenticated workspaces are in `sources/`.

This is a compiled source recovery proposal for the research cohort. It does
not replace the maintained workspace or relabel its score. The latest separate
755-window union still lacks this target, confirmed against its actual saved
ELF in `union755-overlap-review.json`. Integration into that union has not yet
been built or claimed.

## Cause and source change

The baseline already imports upstream's borrowed quote-mint comparison. That
existing change removes an old 32-byte copy and changes this cohort's selector
from 1,760 to 1,632 bytes, without a new matching function. It is not credited
as this contribution. The new source addresses the remaining code generation:

- Limit the temporary PDA's lifetime to the creator comparison. MIR and LLVM
  IR then retain the comparison before the length guard and reuse its stack
  storage for error formatting, as in the original.
- Return owned `TradeFees` from a selection helper that contains the length
  guard and tier selection, while market-cap calculation stays in the caller.
  This merges the original guard/tier error paths without merging the outer
  market-cap error or adding a borrowed-result niche check.
- Pass the selected value through the complete success consumer, including
  creator override and fee application. This restores the three rate loads
  before the global flag and the original register allocation.
- Use guarded `match` arms for quote routing. Their lowering restores the
  original forward branches and normal/exotic/fallback block placement.

The length error's source location is restored from line181 to original
line184. Earlier functions and their source coordinates are unchanged. The
blank-line budget before that guard preserves its observed source record.
No assembly, executable patch, forced inline annotation, dependency change,
or compiler-flag change is in the successful source.

## Compiler evidence and rejected hypotheses

The normal baseline and candidate each have a diagnostic MIR/LLVM capture
whose stripped ELF equals the corresponding ordinary build. The capture's
symbol-bearing artifact is kept separately from the normal artifact.

Qualified `llc` controls reproduced a 1,656-byte intermediate source body.
Changing only its basic-block order reduced 46 positional differences to
16 register differences. These modified IR objects were diagnostic only;
none was executed or substituted for the ordinary source candidate. A full
success-consumer helper fixed those registers in Rust, and guarded `match`
lowering then produced the complete matching body in a normal build.

`rejected.tar.gz` retains failed source variants, exact launch/results/logs,
prior compressed-evidence review, and an intermediate status snapshot. In
particular, a borrowed-result boundary added an unwanted discriminant check;
including market-cap calculation in the owned helper merged too many errors;
direct creator-override spelling and `inline(always)` produced identical ELFs
to their controls; inverted tests and early returns did not restore placement.
One generated variant failed to parse due to a duplicate closing brace; its
record is retained separately from the corrected build. No failed result is
relabelled as successful. Controller paths describe the original local run.

## Actual calls and data

`analyze.py` recomputes the 785-window census and resolves **all 13 direct
calls** in the recovered selector. Each actual callee body matches its
original counterpart. It also checks **all 12 typed data references**,
including seed bytes, program/mint keys, error discriminants, panic text,
source filename, two vtable layouts and their **six method targets**, and a
nested panic `Location`. The Source record is `fees.rs:184`, error6083.

The already-recovered hop helper remains matched and its actual call at
offset208 now reaches this newly matched selector. This does not establish
recursive data/call closure for every descendant, raw selector identity,
identical compute usage, or whole-ELF equality.

## Normal builds and local execution

| Artifact | SHA-256 |
|---|---|
| Original | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Baseline736 with existing borrowed-quote import | `988946f1170a92b68448bc21a251deba7c47698efeb5a4386b15c800c7c8cbd3` |
| Candidate/repeat737 | `7ab5045aa72dcf20bb98d4f13058e80809d6599c6c4163f5bb6643257a16b3b7` |
| Normal candidate/repeat with symbols | `ed53afcfc80cd83475f9cb3b6624ee0ae14a5e0cbf6bd004919625c721c85108` |

Two normal offline Linux v1.44 builds produce identical stripped and symbol
ELFs. All 54 source inputs and 396 unchanged dependency artifacts are bound.
The baseline includes the inherited H11 incentive-guard fix; the earlier
735 artifact with 128 known failures is not used here.

The local replay executes **735 scenarios as original/baseline/candidate
triples**: **2,205 observed transactions**, **2,217 verified signature fields**,
and 306 original successful cases. It covers mixed one/two/three-hop routes,
fee-table and amount boundaries, permissions, malformed accounts, and token
transfer-fee behavior. Recorded errors, account states, events, return data,
and inner instructions agree across all three images.

Two `FeeConfigTooShort` cases improve from `fees.rs:181` to original
`fees.rs:184`. The audit explicitly checks this exact change and agreement
with original logs; it does not broadly mask source locations. Existing raw
non-compute log mismatches against original fall **157 -> 155**. The other
733 cases introduce no non-compute log change. Those 155 inherited differences
remain a limitation. This is bounded coverage, not exhaustive equivalence.

A fresh Python cache prefix with bytecode writes disabled ensures imported
producer sources are read and hashed. An independent observer binds signed
transaction bytes, result/log hashes, and actual loaded program hashes.
Original binaries and previous sealed evidence remain unchanged. All
transactions run in local LiteSVM; there are no live-chain transactions.

## Reproduce

With Python and `solders==0.27.1`, run the frozen-evidence checks:

```sh
python -I -B research/amm-v2-fee-selector-recovery/verify.py
python -I -B research/amm-v2-fee-selector-recovery/test_runtime_controls.py
```

`materialize.py NEW_DIRECTORY` extracts the 54 candidate inputs; add
`--baseline` for the baseline. `rebuild.py --help` describes explicit SDK,
populated Cargo-home, target-cache and output paths. It reuses the recorded
offline Docker command and verifies both resulting ELF hashes; it does not
download tools or dependencies.

For a fresh signed local replay, use the observer around `replay.py`:

```sh
python -I -B -X pycache_prefix=/ABSENT/CACHE/PATH \
  research/amm-v2-fee-selector-recovery/controllers/observer.py \
  NEW_OBSERVER.json.gz research/amm-v2-fee-selector-recovery/replay.py \
  --baseline BASELINE.so --candidate CANDIDATE.so --output NEW_DIRECTORY
```

The exact original execution command is in `runtime/command.json`.
New runs belong in new output directories; do not overwrite this packet.
