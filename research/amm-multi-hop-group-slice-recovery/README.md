# PumpSwap checked group slice: one complete fallback recovery

The requested Token-2022 decoder at `0xf31d8..0xf3470` remains unmatched. The
maintained native-owner control is 656 bytes versus the original 664 bytes. Five
additional natural source controls ranged from 456 to 784 bytes; the best new
control was 648 bytes and was weaker than the maintained candidate. No decoder
source is changed and no decoder recovery is claimed. Exact failed-control
sizes and hashes are retained in `decoder-controls.json`.

The fallback investigation recovered one separate, previously unclaimed
PumpSwap function. The original 520-byte window at `0x40100..0x40308` is an
Anchor error closure for `NotEnoughRemainingAccounts` at
`programs/pump-amm/src/instructions/swap/multi_hop_swap.rs:307`. The maintained
source indexed the five-account hop group directly, so it did not emit this
closure. Using `slice::get` with the observed error at the same source line
reproduces the complete normalized body without padding, forced inlining,
assembly, binary patching, or relaxed comparison.

## Complete inventory

The baseline is the maintained V2 quote-mint ownership checkpoint, stripped hash
`dbb5dcfd1a1487e22d61ae68d22a9b74087b78a868a08ab974c7bdbb127f1500`.
The same 785 original windows are compared injectively in both rows.

| v1.44 workspace build | Normalized | Raw | New normalized | Lost normalized |
|---|---:|---:|---:|---:|
| Maintained baseline | 660/785 | 159 | - | - |
| Checked group slice | 661/785 | 159 | 1 (`0x40100`, 520 bytes) | 0 |

There are no raw gains or losses. Raw equality for the recovered closure is
false because absolute pointers and call displacements differ; normalized
equality is exact. Its seven relocation offsets and types agree. All four
direct-call targets are complete normalized matches. The two error records both
contain discriminant 44, both vtables have identical size/alignment metadata
and normalized method targets, the display-error message is exact, the Rust
panic location is exact, and the 57-byte PumpSwap source path is exact.

## Reproducible build and offline execution

Two package-clean builds used the official Linux v1.44 platform archive under
the pinned amd64 container with network disabled, `--locked --offline`, the
maintained two-member workspace, opt-level 3, overflow checks, panic abort, one
codegen unit and LTO disabled. Both produced:

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Unstripped | 1,813,360 | `d35beab66073f1739d7d371a67160675d5b0a2f047605325b9cda189167ad947` |
| Stripped | 1,291,424 | `7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3` |

The inherited `admin_update_token_incentives` frame-overwrite diagnostic remains
visible; Cargo completed successfully on both builds. Tool, image, workspace and
artifact hashes are in `build-provenance.json`.

The existing offline MultiHopSwap differential runner executed 735 signed
original-versus-candidate cases with zero reported return, log, event, inner
instruction, return-data or account-state mismatches. Sixteen malformed
remaining-account cases return error 6044 before the recovered line-307 branch;
the suite therefore validates the enclosing route but does not claim direct
runtime reachability of the new closure. Compute consumption is outside this
runner's equality fields.

## Reachability of the recovered closure

The instruction first requires a remaining-account length `n` with `n > 0` and
`n % 5 == 0`, then sets `count = n / 5`. At every outer-loop entry,
`0 <= i < count`. Therefore `5*i <= n-5` and `5*(i+1) <= n`, so the checked
five-account range is valid. These products cannot overflow `usize`: even at
the maximum representable accepted `n`, `count = n/5` and the largest endpoint
is exactly `n`. The curve branch increments `i` before consuming a maximal run
of curve hops; the AMM branch increments it once. Both preserve the invariant
or terminate at `i == count`, and `remaining` is never mutated.

Consequently empty and nonmultiple lengths reject before the loop, one-hop and
multi-hop routes always present a full group, and all ordinary error exits occur
without changing the invariant. The line-307 `ok_or_else` closure is defensive
source structure but is unreachable through this validated instruction path.
This is a source/control-flow conclusion, not authentic execution coverage of
the deployed closure.

## Audit

With repository requirements installed:

```sh
python -I -B research/amm-multi-hop-group-slice-recovery/verify.py
python -I -B research/amm-multi-hop-group-slice-recovery/test_reachability.py
```

The verifier checks an exact packet inventory, artifact and source hashes, the
complete 785-window comparison, target relocations and referenced records, all
four direct callees, and reruns the 735-case offline suite. It does not rebuild
the program. Rebuild inputs and limitations are recorded rather than treating a
saved artifact as historical build provenance.

For a lightweight revalidation that does not replay the already-qualified
735-case suite, pass `--skip-runtime`. The reachability tests inspect the exact
source precondition, loop bounds, both index-advance paths and line 307; model
32-bit and 64-bit maximum bounds; enumerate all curve/AMM shapes through eight
hops; and reject five mutations of the proof obligations. They are source-level
tests and do not execute the original program.

The Token-2022 decoder, raw/whole-ELF equality, 124 other unmatched windows,
full transitive data/call closure, uncovered behavior and original historical
source organization remain open.
