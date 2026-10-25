# Nested depth guard: bounded diagnostic correction proposal

The original compares `min(Global.max_curve_depth, 5)` against the checked next depth and attaches those two `u8` values to `CurveDepthExceeded` in **cap, depth** order. The proposed nested source checks the same predicate but uses plain `require!`, which omits compared values. Replace exactly one line in `programs/pump/src/nested_create.rs`:

```rust
require_gte!(g.max_curve_depth.min(5), depth, PumpError::CurveDepthExceeded);
```

The compiled original proves the comparison, value types, ordered error decoration and logging behavior. It does not establish the historical macro token spelling. `require_gte!` is the natural equivalent provided by the exact locked Anchor dependency; no source-coordinate spoofing or codegen prediction is proposed.

## Retained runtime discrepancy

The prior candidate is `3c5feecfc6a009c4215169aef1d1e550abd613c48ff395e9d0d210ee5cfcf957` (1,597,144 bytes), built from the retained 37-input source manifest. No correction has been built or executed.

`retained-focused-01` preserves every complete result and journal from original-only acceptance02 and focused comparison01. Original-only acceptance contains 15 successes and the expected depth rejection. Focused01 completes all 16 comparisons: the 15 successes match; the depth rejection matches state, error6105, rollback, events, inner instructions and return data, but fails semantic-log equality. Original emits `Program log: Left: 1` followed by `Program log: Right: 2`; candidate omits these two lines. This remains an accepted **negative finding**, not a passing differential result.

The portable saved-evidence verifier independently verifies 32 original-only signatures and 64 focused signatures (96 total observations), reuses the exact retained pure result assertions, requires all 48 complete journals to agree with their aggregate rows, and requires this one precise mismatch. These are 16 unique case specifications; the original-only phase is fixture acceptance, not 16 additional unique cases. No full 9,237-case or 1,024-Surfpool regression was started after the mismatch.

The earlier packet-size attempt remains separately frozen at `work/pump-nested-source-build/attempt-01-preserved`. Its first 12 observations lacked saved full receipts and are not accepted evidence. This packet neither replaces that failure nor changes the reviewed fixture cases, universal N/N/empty metadata, normal signatures, packet-size assertion or explicit signature/blockhash checks with default history.

## Exact original control and operand evidence

The sole direct caller at `0x187e8` enters the complete depth helper `[0x60a80,0x60ee0)` (1,120 bytes). Its caller `[0x18678,0x19cc0)` is also retained. All addresses here are original ELF file/virtual offsets; branch destinations are decoded from instruction bytes, not the imported disassembler's misleading `.text+...` labels.

| Original bytes | Fact |
|---|---|
| `0x60a88..0x60aa8` | Load depth with `ldxb`, add one, truncate to `u8`, reject truncation mismatch. Overflow precedes the limit check and produces6024. |
| `0x60ab0..0x60ac0` | Load global cap with `ldxb`; retain it if unsigned `<5`, otherwise replace with5. This is the minimum expression. |
| `0x60ad8` | Reject when cap in `r8` is less than checked depth in `r1`; success continues at `0x60da0`. |
| `0x60e30` | Store error number6105. |
| `0x60e78` | Call actual `From<AnchorError>` helper at `0x19bb30`. |
| `0x60ea0..0x60eb0` | Pass `r4=r8` (cap), `r5=r7` (checked depth) to actual ordered-value helper at `0x878`. |

Both source fields are `u8` in the retained source and captured IDL. The original loads and the called formatter independently confirm that width. `evidence-to-change.json` maps each operation. The static verifier also enumerates the finite cap/depth domain mathematically to confirm that the proposed macro changes no acceptance predicate; this is not program execution or a new runtime case.

## Actual error helpers and literals

The complete called value helper is `[0x878,0x11b0)` (2,360 bytes). It saves the first argument from `r4` and the second from `r5`, formats each as an unsigned byte into an allocation sized for three decimal digits, then stores the left String followed by the right String in `ComparedValues::Values`. Both `Error` variants are retained in the full body. This call follows `From<AnchorError>`, whose complete136-byte body sets the error tag to0, selecting the AnchorError branch. The helper's actual direct targets are `String::push` at `0xd5d0`, allocation-error handling at `0x1ab198`, and memory copy at `0x1b3610`; their full windows are retained and matched to named candidate functions where normalization permits. The memory-copy body is shared by candidate `memcpy`/`memmove`, so it is not assigned a more specific identity than the evidence supports.

Neither existing `Error::with_values` instance in failed candidate3c5 has this complete2360-byte body. The evidence does **not** substitute an unused candidate helper for the actual original call.

The6105 path loads the enum discriminant105 from `0x1b5ec4`. Its actual name helper at `0x157380` follows the105 dispatch and constructs the18-byte `CurveDepthExceeded` name. Its actual Display helper at `0x15de88` follows the105 branch at `0x15e128` to descriptor `0x1be6c0`, which points to the106-byte message at `0x1b9c83`. The error has source path `programs/pump/src/pump_quote.rs` and line62. Overflow uses discriminant24, number6024 and line61; it does not call the compared-value helper. The full name helper is retained but is not claimed normalized-equal to the current named candidate name helper.

The actual conversion `[0x19bb30,0x19bbb8)` allocates160 bytes with alignment8, copies the AnchorError, and returns its tagged box. It matches the complete named candidate `From<AnchorError>` body after only the established call/relocation normalization. The full original `AnchorError::log` at `[0x19cb68,0x19d240)` also matches the named candidate body. Its Values branch reads the first String at box+88 and the second at box+112 and uses descriptors `0x1bed78`/`0x1bed88` for `Left: `/`Right: ` in that order. `literals.json` binds each bounded descriptor, message and coordinate to actual original bytes.

`windows.json` retains 13 complete original windows with raw and normalized hashes, actual direct call ledgers, relocation patterns and independently recomputed candidate-symbol matches. It is bounded evidence for this correction, not a claim of complete recursive runtime/dependency equivalence.

## Locked source equivalence and scope

The locked Anchor0.31.1 `require_gte!` custom-error arm expands to `if value1 < value2 { return Err(error!(custom).with_values((value1,value2))); }`. Its `with_values` serializes the values through `ToString` in tuple order; `AnchorError::log` emits Left then Right. The locked0.31.2 error proc macro creates the named error, number, Display message, source coordinate and initially empty compared values, then calls `Error::from`. Exact archive hashes are checked against the retained Cargo.lock, and copied dependency sources are checked against those public archive members. The0.31.1/0.31.2 package combination is the existing locked graph, not a new version selection.

`depth-guard.patch` and `proposed-source-map.json` change only this one line of nested_create.rs. The checked addition, cap expression, custom error code, Mayhem eligibility ordering, parsing, pricing and remaining traversal are unchanged. The failed build/source/tools, proposed source and all negative receipts remain separate; main source and old seals are untouched. Full original ELF equality remains false; this packet makes no new runtime-success, full nested coverage or audit-completion claim.

Run with the existing Python environment containing solders:

```sh
work/test-env/bin/python -B work/pump-nested-depth-guard-review/verify.py --repo .
```

Without `--repo`, the copied packet verifies independently of repository/work paths. Both modes verify only saved evidence. A missing/tampered file must fail the seal; even after resealing, a reversed operand patch must fail the semantic source gate, and removing the saved diagnostic difference must fail the required-negative receipt gate.

All four checks were run: copied packet outside the repository with working directory `/` passes; missing helper bytes fail; a resealed reversed-operand proposal fails the source gate; and resealed aggregate+journal removal of the original Left diagnostic fails the required-negative receipt gate. Exact results are retained in `portability-checks.json`.
