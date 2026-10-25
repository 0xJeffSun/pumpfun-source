# Compilation and static comparison

`build-03` is the current review candidate. The clean target build returned zero, preserved source and lock hashes, and emitted no Rust warnings or stack-size diagnostics. The SBF packaging tool emitted its undefined-syscall warning because the inherited SDK's `syscalls.txt` is empty. All twelve undefined candidate symbols also occur in the captured original; that observation explains the local inventory mismatch but does not establish runtime acceptance. No executable was run.

| Item | Recorded result |
|---|---|
| Candidate | `build-03/artifacts/mayhem_burn_draft.so` |
| Candidate bytes | 159,064 |
| Candidate SHA-256 | `5e691d88cddb8de134dbb456347b33e8e46d1afbafdb230005474f76b83cfa1d` |
| Original bytes | 777,408 |
| Whole-file equality | false; first differing file offset 24 |
| Selected platform tools | v1.52 |
| rustc | 1.89.0-dev, aarch64-apple-darwin, LLVM 20.1.7 |
| rustc executable SHA-256 | `c58ec8ad482a40216152a4e4a6172f485be22a7f4482623e7e3cdf6c7085beb8` |
| Cargo.lock SHA-256 | `169d611684c058c7d2edb98baf9895b117e867af2de2c3363060831855483a6b` |
| Rust build duration | 43.18 seconds, from compiler log |

The installed cargo-build-sbf is 2.1.21. Its `--version` banner reports its bundled/default v1.43 and Rust 1.79 metadata; the recorded explicit selection, rustc executable hash and direct rustc version establish that this build used v1.52. `build-03/build-attempt.json`, `build-comparison.json`, and `build.log` retain actual commands and environment. The target, Rustup alias and Cargo cache are isolated inside this scratch directory; the external verified platform-tools installation is reused.

Build command, from repository root (choose a new output directory):

```sh
CARGO_HOME="$PWD/work/mayhem-burn-static/cargo-home" python3 scripts/build_partial_candidate.py \
  --manifest work/mayhem-burn-static/crate/Cargo.toml \
  --program mayhem --artifact-name mayhem_burn_draft.so \
  --output work/mayhem-burn-static/build-next --tools-version v1.52
```

The helper passes `--locked --offline` to Cargo. `anchor-pin-attempts.json` records successful exact 1.0.0 macro and anchor-syn pins, and the fetch logs record prior cache preparation. The complete lock is required: the direct Anchor constraints alone permit newer macro releases.

## What the static comparison establishes

`compare_static.py` reads candidate symbols from the unstripped compiler output and verifies that its `.text` is identical to the stripped candidate. It searches complete function bodies in the original after masking **only** relative internal-call immediates and ELF relocation immediates, in memory. It requires identical relocation offsets/types/symbol names, excludes R10 syscalls from internal-call inference, and checks mapped helper-call targets where a match independently identifies them. It writes no executable or patched bytes. This comparison does not compare every referenced rodata value or resolve every callee, so its matches establish instruction-shape compatibility rather than complete semantic identity.

Among 46 selected program/framework/Borsh/token functions, 12 have such matches bounded by inferred original function entries; one is also raw-byte equal (the 16-byte log syscall wrapper). Representative matches:

| Candidate helper | Bytes | Original start | Result |
|---|---:|---|---|
| Three-tag MayhemStatus Borsh decoder | 384 | `0x68470` | complete body and relocation-pattern match; one of three callees independently mapped and consistent |
| SPL TokenInstruction::pack | 2,840 | `0x929f8` | complete body and relocation-pattern match |
| BpfWriter::write_all | 280 | `0x97730` | complete body and relocation-pattern match |
| Anchor ErrorCode::name | 3,072 | `0x999e8` | complete body and relocation-pattern match |
| Anchor ErrorCode Display | 2,552 | `0x9a830` | complete body and relocation-pattern match |
| sol_log_data wrapper | 16 | `0x999d8` | raw-byte equal |

`build-03-static-comparison.json` records all positives and negatives, raw hashes, relocation patterns and mapped-call checks. Negative results are material:

| Function | Original bytes | Candidate bytes | Body match |
|---|---:|---:|---|
| Burn body | 5,752 | 6,016 | no |
| Accounts parser | 10,568 | 12,784 | no |
| Accounts exit | 2,736 | 4,528 | no |
| Anchor token burn wrapper | 1,672 | 1,736 | no |
| SPL burn instruction constructor | 1,576 | 1,680 | no |

The draft's complete state account deserializers also do not match as bodies. The three-tag enum decoder matches, and independent assembly review confirms the serialized widths and relevant reordered memory offsets. After declaring borrowed event accounts explicitly, the compiled body loads deadline at context `0x1a8`, status at `0x1c0`, and vault amount at `0xe8`, then stores burned amount at `0x1b8` and ended tag 2 at `0x1c0`, matching the original offsets. This is useful consistency evidence, not a substitute for whole-body equality.

Original and candidate event signer tables independently decode to the same two byte strings: `__event_authority` and `fc`; `event-seeds.json` records exact table and target offsets. Neither ELF header nor instruction body was altered.

## Preserved earlier attempts

- `build-01`: compiler failure E0614 from the initial dereferenced attribute expression. Its before/after hashes and complete failure log remain intact.
- `build-02`: successful 159,840-byte ELF, SHA-256 `23a1ff31f18d509c2bf4374f92d69581396199562bf4ba8cfcf91e34154438e7`, plus a frozen source snapshot. Static comparison exposed the event-wrapper/constraint mismatch; the draft subsequently replaced the convenience attribute with explicit recovered declarations.
- `build-03`: current corrected draft. Partial-source scope, dependency/compiler uncertainty and missing runtime validation remain. It is not ready to replace the deployed program or to be marked behaviorally verified.

Run `python3 work/mayhem-burn-static/collect_evidence.py`, `python3 work/mayhem-burn-static/compare_static.py` and `python3 work/mayhem-burn-static/verify_draft.py` for static reproduction. Existing original evidence and retained compiler artifacts are the only inputs. `verify_draft.py` performs byte and metadata checks; it never invokes the program.
