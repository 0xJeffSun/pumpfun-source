# Relay stack source-repair proposal

This is an **uncompiled, unexecuted two-file source proposal** responding to the exact build02 diagnostics. It does not modify the prior sealed source, launcher, build, original ELF, current programs or dependencies. No retry is performed or authorized by this packet.

Build02 returned success but emitted 301 critical backend diagnostics across six functions. Its candidate `da8f51f8…`, symbol ELF `ad491a94…` and full inventory remain frozen under build seal `578f7ae0e2a8eba157159c4fbf7d4dc488b32860bd82102d0d85b9db95021326`. The selected build records and original bytes are included here and hash-bound to that seal. The build artifact is unsuitable for execution.

The proposed repair makes two ordinary source changes:

1. **Separate the eleven instruction wrappers.** Original169 directly calls wrappers178–188. The proposal routes each discriminator into an individual Rust function containing that instruction's log, argument decode, admission, body, event/return sequence and exit. The old branch bodies are copied exactly; five donation wrappers share the same copied donation branch. Program-ID, short input, unknown selector, reserved IDL and event-recursion behavior remain unchanged. No `inline` attributes, path tricks, compiler flags or source padding are introduced. Compiler inlining is still possible, so the source separation is not a promise that a future build meets stack limits.
2. **Give each decoded account a single heap owner.** `Loaded<T>` becomes a type alias for `Box<LoadedValue<T>>`; the existing `info` and `value` fields remain together. Only the three successful token/mint/state constructor expressions allocate the box. Raw contexts and final frames move ownership of that box, while body and generated exit borrow the same decoded value. This reduces the large by-value objects diagnosed in admission without changing the Account arena or inventing independent lamports/data cells. Native Box field projection is used; no custom dereference implementation or unsafe code is added.

The Box change is an explicit **candidate engineering repair**, not recovered historical allocation provenance. It adds allocation sites after successful decoding and changes heap consumption, OOM/panic timing and deallocation behavior. No original Box layout or exact resource equivalence is claimed. Every `Loaded` allocation and existing error still occurs in the original source order except for the newly disclosed allocation step itself. `structural-ownership.json` counts source fields only; it does not claim compiled Rust struct sizes.

| Failing source role | Reported frame | Candidate lowest direct r10 access | Original role lowest direct r10 access |
| --- | ---: | ---: | ---: |
| Dispatch | 6,720 | -6,696 | -4,096 (169) |
| Epoch admission | 5,760 | -5,728 | -3,096 (142) |
| After-swap admission | 5,568 | -5,520 | -2,808 (146) |
| Non-swap admission | 5,184 | -5,184 | -2,400 (148) |
| Just-swap admission | 7,552 | -7,528 | -3,544 (150) |
| Combined admission | 6,976 | -6,936 | -3,240 (154) |

The direct-access values are recomputed from complete retained instruction windows, not inferred complete frame sizes. Original and candidate rows have corresponding application roles; they are not matching bodies. The full build02 comparison found 29 raw/112 normalized-shape original windows and 380 unmatched original windows, without semantic equivalence claims.

`review.json` records the field borrowing, ownership, drop, allocation and wrapper-order review. `source-repair.patch` is the exact minimal file delta. `derive.py` reproduces the proposal from the bound base tree and preserves each old handler branch textually. All 21 source/lock files are retained before and after; exactly two change. No business handler, codec, generated exit, mint policy, key metadata, signer seed, CPI bytes, AccountInfo operation or diagnostic source-origin policy changes.

The eight inherited diagnostic/runtime gaps are retained verbatim as historical source-proposal evidence in `inherited-diagnostic-gaps.json`. Their old D08 statement that no build had occurred is superseded only by build02's emitted but stack-invalid artifact. This new repair remains uncompiled. Historical dependency/ABI, error metadata, source origins, exceptional-resource behavior and exact compiled equivalence remain open; no gap is silently closed by boxing.

Run `python3 -B verify.py`, optionally `--repo /path/to/repository`. The verifier uses only Python's standard library: checks the package seal, bound selected build/N09 records, exact source transform and patch, all original dispatcher branch/call/discriminator anchors, all six diagnostic symbols/windows and unchanged non-owned inputs. It runs no Rust compiler, typecheck, transaction or VM. A new build requires parent review and must reject backend stack/overwritten-frame errors even if Cargo returns zero.
