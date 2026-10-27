# Mayhem initializer machine paths and compiler constraints

The original initializer and two native reconstructions satisfy the same **conditional subroutine contract** under the explicit memory, object and immediate-call assumptions below. This is new machine-path evidence for the still-unmatched O0193 initializer, not another recovered body. It adds **zero normalized or raw-local matches** and does not promote a source candidate. Whole core identity remains **0/4**; the other three core programs were not freshly compiled or compared here.

Five successful native Rust builds and one compiler rejection are retained. Every successful control preserves the same 429/441 normalized original windows and 84 native raw-local windows. The upstream qualified recipe's 100 raw-local windows are a different measurement and are not added to these counts. Credit `research/mayhem-trade-origins-validator` for the 429-window source baseline and O0095 recovery.

| Source control | Initializer bytes | Result |
| --- | ---: | --- |
| Previously captured native control | 920 | Still unmatched |
| Pre-clock key copy and explicit dereference to the state object | 960 | Still unmatched |
| Pre-clock key copy and in-place timestamp addition | 968 | Still unmatched |
| Pre-clock key copy and `set_inner` aggregate assignment | 968 | Still unmatched |
| Pre-clock key copy and direct aggregate assignment | 968 | Same complete candidate and symbols as `set_inner`; still unmatched |
| Ordinary non-tracing repeat of the explicit-dereference control | 960 | Both complete ELFs reproduce the tracing build exactly |
| Attempted `Account::as_mut()` spelling | No artifact | Actual E0599 compiler rejection retained |

The original body is 960 bytes / 116 instruction rows. Equal size is not equality. All six retained successful Mayhem artifacts, including the historical control, differ from both the complete original capture and its meaningful ELF extent. No initializer instruction, register, scalar, branch, stack displacement or data pointer is changed in the interpreter's inputs. The existing window matcher retains its existing relocation/call normalization and is not relaxed.

## What the machine check establishes

`machine.py` executes the decoded instructions themselves. It enumerates all 256 duration bytes and both Clock Result outcomes, while retaining affine symbolic values for the entire signed 64-bit timestamp domain and both positive 64-bit Rc strong counts. Comparisons split at every modular wrap, signed boundary and equality root. Each branch partitions its parent interval box; leaf weights are checked against the full input-domain weight and an independently derived five-outcome distribution. Arbitrary mint-key bytes and untouched state bytes remain symbolic.

The original, the historical native control and the explicit-dereference control each produce 10,483 terminal interval cells with the same five-outcome distribution. **These cells are not VM executions, signed transactions or a reconstruction-completion percentage.** The checker compares all modeled non-stack bytes, including untouched state and input bytes, rather than only the returned status.

For non-overflowing reference counts and a successful Clock read, the contract is:

- Write `field_8 = now as u64` before checking the timestamp addition.
- If `now > i64::MAX - duration_hours * 3600`, reach the bound add-overflow panic without completing the other state updates.
- Otherwise write the end timestamp, arbitrary 32-byte mint key, zero both 128-bit accounting fields, set both initial flags/status bytes to zero, write `field_89 = now as u64`, zero the burned amount, restore both Rc counts and return the existing `Ok` tag 2.
- A failed Clock read reaches the bound unwrap panic with the same opaque eight-byte ProgramError payload. Either Rc count wrapping on clone reaches the imported abort before the subsequent work.

The two panic locations retain the exact counted 37-byte filename, including its trailing NUL, and `state.rs:532:32` / `state.rs:531:43`. The add panic's counted 28-byte message is independently read through its relocated formatting tuple. The unwrap path checks its counted message, ProgramError payload, 32-byte vtable fields and immediate Debug-method shape. All six immediate call roles are bound to the actual original/candidate bodies or the `abort` import. Recursive formatting/callee/data equivalence is **not** inferred from these bindings.

Important assumptions: the current recovered Context/AccountInfo offsets are correct; input, key, state, stack and the two Rc allocations are disjoint; initial strong counts are positive; Clock writes only its supplied result buffer and obeys the caller-register ABI; and the bound Clock/panic/abort calls obey their stated contracts. Invalid objects, overlapping allocations, parser correctness, syscall implementations, gas, recursive library behavior and whole-program semantics are outside this analysis. Reachable instruction offsets are retained in the observations; unreachable negative-duration and Rc-drop code is not presented as executed or proved by runtime.

## Compiler evidence

All 67 source inputs resolve through the captured upstream source archive and one explicit `src/state.rs` override per variant. Only the initializer region changes, physical line counts remain fixed, and the complete `lib.rs`, program namespace and generated references remain unchanged. The official Linux v1.54 controllers retain actual commands, environments, six executable hashes, source maps, outputs and logs. The dependency cache is reused; this is not a clean dependency build or authenticated historical recipe.

The retained pre-optimization/optimized bitcode, full LLVM text, initializer extracts and converter inventory bind the explicit-dereference control. Optimized IR contains the pre-clock key copy, checked signed addition, a 32-byte key memcpy and a merged 32-byte accounting memset. The original instead retains different copy/store order and overflow-boolean instruction flow. The native non-tracing repeat reproduces both complete tracing ELFs, so the retained `save-temps` diagnostic flag does not explain that control's mismatch. Only these tested source forms are excluded; this does not exclude all ownership, aggregate or compiler-context hypotheses.

## Fresh runtime evidence

The explicit-dereference candidate `2ea6cdcccdc8c97692888adc445161dcfe241f3a46825400af8bd01dab6e448b` has **69 fresh original/candidate comparisons and 168 signed execution records**: 53 initializer rejection pairs, followed by 16 genuine original-Pump-to-Mayhem CPI pairs, including ten successful creations. Each execution attests the actual executable Mayhem program-account bytes/hash; CPI executions also attest the original Pump account. No synthetic signer, live-chain transaction or deployment is used.

All compared state, errors, events, inner instructions, return data and signed transaction bytes agree. Raw logs differ in nine CPI cases; after removing only precisely recognized compute-consumption lines, all 69 pairs' logs agree. Raw logs are retained. The other source controls and the historical native control have **no new VM claim** from this packet.

The combined runtime driver completed its 53 rejection pairs, then failed on an absent local Pump IDL before launching the CPI suite. That failure log and completed receipt are preserved. After restoring the exact upstream IDL, a separately retained producer ran the remaining 16 pairs; the 53 were not repeated or relabeled. The first static-record attempt also retained an overly broad IR-fragment selector assertion; the selector now explicitly chooses the optimized file. Neither failure is treated as a passing receipt.

## Verification

```sh
python3 -B research/mayhem-initializer-machine-paths/verify.py
python3 -B research/mayhem-initializer-machine-paths/test_verify.py
# With the repository's solders-enabled environment, additionally verify signatures:
python3 -B research/mayhem-initializer-machine-paths/verify.py --signatures
```

The verifier is offline and uses the standard library except for optional signature checks. It recompiles and executes no target and has no missing-fixture waiver. Only `scripts/analyze.py` is a hash-pinned external static dependency. Runtime producers preserve their actual historical source paths; regeneration also requires the exact binary/runtime inputs inventoried in `scope.json` and a solders environment. The frozen reports/checkers remain separate from any future replay.

Tests independently enumerate 35,912 scalar comparison points, reject nine actual instruction/data mutations (duration multiplier, Rc increment, state destination, key word, key register, Clock branch, flag, Source line and vtable size), and show that an unrelated capture-tail mutation is outside the subroutine check. The full artifact hash/manifest still rejects that tail change. The interval interpreter is trusted analysis code with these regression checks, not a machine-checked theorem prover.

The remaining reconstruction work is unchanged: recover the initializer's complete ordered body, the other eleven unmatched Mayhem windows, remaining call/data/sharing/layout obligations and all four original whole binaries. This packet provides constraints and a conditional machine contract, not an accepted byte-coverage gain.
