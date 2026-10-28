# PumpSwap native transfer-fee diagnostics: four complete recoveries

The maintained PumpSwap source had four complete functions whose only remaining
instruction differences were Anchor `Source` line immediates. Moving decoded
fee ownership into `native-transfer-fee` shortened this module without changing
the PumpSwap-owned error construction. The candidate therefore reported lines
13, 22, 28 and 35 where the captured program records lines 32, 49, 57 and 67.

This change restores those coordinates with ordinary Rust structure: useful
module/type/function documentation and normal multiline formatting. It adds no
empty positioning blocks, forced inline attributes, dead assertions, assembly,
binary bytes or comparison exceptions. The arithmetic, ownership boundary and
error expressions are unchanged. `rustfmt` is deliberately not run over this
recovered source-coordinate layout.

Commit `044de248d` independently shows the same four original line coordinates
before the native helper extraction, but this packet does not claim that its
exact source organization is historical. Merged PR #426 contains a separate
research union that reaches these lines using blank positioning and forced
`inline(never)` controls; it does not change maintained source and is not reused
here.

## Complete inventory

The baseline is merged PR #424's maintained 661-window artifact. The comparison
uses the same injective 785 original windows.

| Linux v1.44 build | Normalized | Raw | New normalized | Lost normalized |
|---|---:|---:|---:|---:|
| PR #424 baseline | 661/785 | 159 | - | - |
| Fee diagnostics | 665/785 | 159 | 4 | 0 |

The four gains are complete normalized bodies:

| Function | Original | Bytes | Source line |
|---|---:|---:|---:|
| `from_mint` | `0x74128` | 1,312 | 32 |
| `calculate_fee` | `0x74648` | 696 | 49 |
| `amount_after_fee` | `0x74900` | 640 | 57 |
| `amount_before_fee` | `0x74b80` | 688 | 67 |

All four relocation layouts match. Of 25 direct calls, 24 target complete
normalized matches. The bounded exception is `from_mint`'s call at +200 to the
still-unrecovered standalone TLV decoder: original `0xf31d8` is 664 bytes and
the candidate target is 656 bytes. This packet recovers the caller, not that
callee. Raw equality remains false for all four bodies because relocated
addresses and call displacements differ.

Anchor's error `Source` record contains a filename and line but no column, so a
column cannot be reported for these diagnostics. This is distinct from Rust
panic `Location` records, which do encode a column.

## The 14 runtime differences

The retained fresh-VM matrix executes 216 transaction triples: original,
PR #424 control and this exact candidate. It contains 648 independently signed
offline executions and full non-executable message-account snapshots.

- Twelve malformed Token-2022 quote-mint cases (six deposit and six withdraw)
  move from control line 13 to original line 32 for
  `UnsupportedQuoteMint`/6007: partial two- and three-byte headers, value
  overrun, short fee config, duplicate fee config and a fee config followed by
  a malformed header.
- Two deposit inverse-fee cases at 100% and a `u64::MAX` cap move from control
  line 35 to original line 67 for `Overflow`/6023, at amounts 1 and 1,000,000.

Before this change those were the 14 non-compute source-coordinate differences.
After it, the original and candidate diagnostics are byte-for-byte identical in
all 14 cases. All 216 original/candidate observations match after excluding only
compute-consumption log lines; state, CPI, return data, errors and rollback
behavior are unchanged. The classification remains 182 successes, 20 earlier
account-validation rejections, 12 `UnsupportedQuoteMint` rejections and two
inverse-fee overflows.

The retained producer's `mismatches` field lists the same 14 indices because its
older success predicate required both control/candidate and original/candidate
equality. `runtime_check.py` independently proves that every original/candidate
pair matches and that the 14 control differences are exactly the intended line
corrections. No live transaction was submitted.

## Reproducible build

Two isolated, dependency-seeded builds used the retained official Linux v1.44
SDK, Rust 1.79.0-dev/LLVM 18.1.7, an amd64 container with network disabled,
`--locked --offline`, opt-level 3, overflow checks, panic abort, one codegen unit
and LTO disabled. Both compiled the PumpSwap root once and reused unaffected
dependencies.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Unstripped, both builds | 1,813,360 | `c8f754063a2aa1d0b8d6f228c46401ba85571546f0234dc81c9eb8927eb12376` |
| Stripped, both builds | 1,291,424 | `d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007` |

`materialize.py` derives the exact 62-file, two-member checkpoint workspace from
the checkout. `rebuild.py` reruns the recorded container recipe using explicit
local SDK, Cargo-cache and target paths. Both retained logs include the existing
`admin_update_token_incentives` frame-overwrite diagnostic; Cargo still exits
successfully. That inherited warning is not addressed here.

## Verification

With the repository Python requirements installed:

```sh
python -I -B research/amm-transfer-fee-diagnostic-recovery/verify.py
python -I -B research/amm-transfer-fee-diagnostic-recovery/test_negative_controls.py
git diff --check
```

To reproduce the build without downloading anything:

```sh
python -I -B research/amm-transfer-fee-diagnostic-recovery/materialize.py /tmp/fee-diagnostic-source
python -I -B research/amm-transfer-fee-diagnostic-recovery/rebuild.py \
  --source /tmp/fee-diagnostic-source --sdk /path/to/v1.44-sdk \
  --cargo-home /path/to/populated-cargo-home --target-dir /path/to/target \
  --output /tmp/fee-diagnostic-build
```

The verifier audits packet membership and hashes, reconstructs the source
workspace, recomputes all 785 windows, checks every target relocation and direct
call, and validates all 648 signed receipts. Negative controls mutate each of
the four line immediates and one retained runtime diagnostic in memory; all are
rejected. A relocated-address mutation remains normalized-equal while becoming
raw-unequal, demonstrating the intended normalization boundary.

The standalone TLV decoder, raw/whole-ELF equality, complete transitive call/data
closure and 120 other unmatched original windows remain open. Lines 49 and 57
are statically recovered complete bodies but are not directly triggered as new
error diagnostics by this 216-case matrix.
