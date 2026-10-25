# AMM scalar fee-guard source proposal

This prebuild package identifies two concrete differences in current `update_fee_config`: missing scalar compared-value diagnostics and an incorrect guard/store order. `scalar-guard-order.patch` changes only the scratch copy of `programs/pump-amm/src/lib.rs`. No build, runtime probe, main-source edit, new handler, new test coverage or publication occurred. The proposal remains uncompiled and requires parent review before a controlled build.

## Bound inputs and instruction identity

The captured original is `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`; the current AMM candidate is `5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`. All 18 current compiler inputs are copied and hash-bound. The current unstripped symbols have identical `.text` bytes and relocation shape to the stripped candidate. The published residual report and historical negative are preserved, not revised. The full prior body catalog is used solely to look up this bounded family and validate its direct targets; the 319 residual windows were not reinventoried.

The captured IDL discriminator is `68b867f258976b14`. Original dispatch loads it at `0xdbd98`, branches at `0xdbda8` to `0xdc468`, and calls wrapper `0xe2230` at `0xdc4b8`. Current dispatch follows `0x8a448` / `0x8a458` / `0x8b368` / `0x8b3b8` into wrapper `0x97bd8`. The complete 2,296-byte wrappers match under existing relocation normalization. Their log data is exactly the 28-byte `Instruction: UpdateFeeConfig`, and their call at wrapper offset 1,600 selects original handler `0x1d8a0` and current handler `0xc2100`. Current symbols independently identify both the wrapper and handler. Original/current handler lengths are 2,912 / 5,832 bytes; these bodies do not match.

The IDL gives LP fee, protocol fee and creator fee as `u64`, with `[Pubkey; 8]` recipients between protocol and creator arguments. This is an ordinary admin update instruction. No initializer or fixed-admin signer substitution is involved in the proposal. `evidence.json` retains the complete selected instruction windows, raw and normalized hashes, dispatch facts, call targets, argument/account definitions, and exact source-input identities.

## Original operations that justify the patch

| Operation | Original call | Complete body | Success store offset | Observed source line |
| --- | --- | --- | --- | --- |
| LP guard/store | `0x1d8f0 → 0x61630` | `0x61630..0x61898` (616 bytes) | `0x380` | 220 |
| Protocol guard/store | `0x1d958 → 0x61898` | `0x61898..0x61b00` (616 bytes) | `0x388` | 230 |
| Recipient validation/store | `0x1d9a0 → 0x61d68` | `0x61d68..0x62688` (2,336 bytes) | retained original body | — |
| Creator guard/store | `0x1d9e8 → 0x61b00` | `0x61b00..0x61d68` (616 bytes) | `0x390` | 243 |

Each scalar body captures the supplied value in `r7`, branches on unsigned `r7 > 1000` at offset 16, and stores the `u64` only on success at offset 24. The failure path constructs error 6000, loads 1000 into `r4` at offset 552 and the supplied value into `r5` at offset 560, then calls `Error::with_values` at offset 568. Thus the comparison order is exactly `(1000, supplied_fee)`.

The original handler immediately propagates each failure. LP failure branches at `0x1d900` to `0x1daf0`; protocol success is selected at `0x1d968` and failure jumps at `0x1d970`; recipient success is selected at `0x1d9b0` and failure jumps at `0x1d9b8`; creator success is selected at `0x1d9f8` and failure jumps at `0x1da00`. Authority stores and Clock/event work occur afterward. No CPI occurs between these guards. Earlier temporary account-field stores therefore precede later guards, while failed transaction changes remain subject to rollback.

Current source instead combines all three scalar guards before validating any recipients and performs the field stores afterward. The patch uses `require_gte!(1000u64, fee, ...)` immediately before each scalar store and puts the creator guard/store after the unchanged recipient validation/store. The pinned Anchor 0.31.1 macro source explicitly expands this form to `if value1 < value2 { return Err(error!(...).with_values((value1, value2))); }`; its `with_values` implementation stores the two `ToString` values in that order. Explicit `1000u64` preserves the observed unsigned argument type, including the retained `u64::MAX` observations.

This is a source-operation correction supported by guards, stores, call ordering and saved error logs. It is not a claim that the original used this exact macro spelling. No new helper function, inline attribute, source-line padding, forged source path, compiler flag or optimizer variation is proposed. Whether a controlled build produces a standalone 616-byte body or a closer complete handler remains unknown.

## Complete helpers and bounded data

All five scalar direct callees have complete normalized current matches: error-name `0x753f8 → 0xc8630` (21,936 bytes), error Display `0x7aba0 → 0xcddd8` (2,936), `unwrap_failed` `0x112f98 → 0xff8f8` (232), `From<AnchorError>` `0x102fb8 → 0xee570` (136), and `Error::with_values` `0x1840 → 0xdd0` (1,336). The package also recomputes complete target-body matches at their 94 immediate direct-call sites, including all eight calls inside `with_values`. This is bounded direct-target evidence, not unlimited transitive code/data equivalence.

Four data spans have explicit consumers and lengths: the four-byte zero error-enum discriminant at `0x11bf88`; the 44-byte source path at `0x11ce9f`; the 28-byte instruction log at `0x11e75d`; and the 55-byte Display panic text at `0x11c0fa`. The first item is an enum input, not a string. Formatting and panic tables beyond those proven consumed spans remain unresolved. The recipient body is retained to establish intervening validation and errors 6011/6012; its implementation is unchanged, and complete recipient-body equivalence is not claimed.

## Existing receipts expose a bounded validation gap

The preserved 356-case receipt is bound to these exact original/current ELFs. Its old comparison accepts error, state, event-log and rollback equality; it does **not** compare all runtime logs. Cases 4, 5, 24, 30, 144 and 180 contain invalid creator, protocol or LP fees of 1001 or `u64::MAX`. Every original log includes `Left: 1000` and the complete supplied `Right` value. The current logs omit both lines. These six rows are saved evidence, not new executions or new coverage. Source-coordinate log differences also remain; the patch does not imitate historical coordinates.

Static control flow additionally predicts that, with LP/protocol valid but both recipients and creator fee invalid, original recipient error 6011 or 6012 precedes creator error 6000. The current compound guard returns 6000 first. The existing corpus does not contain that mixed-invalid combination; it has **not** been executed here. That prediction is outside the proposed next runtime scope, which is limited to stricter assertions on existing fee-config cases and unchanged regressions. No new fixture is proposed for this mixed-invalid condition.

## Historical negative and remaining limits

The retained historical static trial has a 608-byte LP setter versus the 616-byte original: constant 1000 was specialized into a different `with_values` callee, changing its argument convention. The current `with_values` body and all eight immediate targets already match the original. Therefore that historical negative does not establish a present compiler blocker or justify compiler/version/attribute variations. The old narrow source excerpt and its archive/member hashes are retained as provenance only; inline annotations and line-position choices are not copied. Its original archive is referenced, not required by the portable verifier or included wholesale.

This proposal leaves complete handler/body equality, original source spelling and broader data provenance unresolved. Original full-file equality remains false and the audit remains incomplete. Recipient behavior beyond the ordered call, initializer behavior, stopped Pump transfer-fee/incentive work, Mayhem initialization, v3/extensions and all other program paths are outside this task.

## Portable verification and next step

Run `python3 verify.py` from any directory. It uses only Python's standard library and the retained ELF reader; it verifies the copied inputs, exact 18-input maps, one-file patch, macro evidence, bounded ELF facts and saved receipts. It launches only the bundled read-only analyzer, never a compiler or VM. `--current-source /absolute/repo` additionally checks the live baseline source hashes. The final `manifest.json` seals the payload, and verification rejects deployment-keypair paths before any file read.

`prebuild-plan.json` is explicitly unexecuted. A future parent-approved run should preserve this package, use one unchanged pinned build recipe in a separate workspace, compare complete newly located bodies/targets/data, and strengthen assertions on existing normally signed fee-config cases and run the unchanged regression corpus if authorized. No build is authorized by this report itself.

The first local verifier attempt exposed only a tuple-versus-JSON-list comparison bug in the analyzer verification mode. `verification-attempt-01.log` preserves the assertion; comparison now applies JSON canonicalization, with no evidence or source-proposal change caused by that fix. `verification.json` records the successful pre-seal check. Final seal verification is rerunnable and does not modify the package.
