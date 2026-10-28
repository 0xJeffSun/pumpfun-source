# AMM native transfer-fee calculation: one complete recovered function

This source proposal recovers the original **368-byte / 46-instruction** native
transfer-fee calculation at `0xf2d60`. A normal full contract build increases
injective normalized matches from **731 to 732 of 785**, preserving all **148 raw
matches** and every previous normalized match. The gain is one complete helper,
not a decoder gain, a new test count, or whole-ELF identity.

## Source and compiler cause

The old source converts the decoded native fee into SPL's packed `TransferFee`
before calling its calculation. That emits a 360-byte packed-layout helper.
The original reads basis points at native offset 16 and maximum fee at offset 8,
checks `amount == 0` first, and checks basis points separately. The proposed
source retains checked multiplication, ceiling division by 10,000, conversion
and the maximum-fee cap.

A standalone normal Rust control with the ordered zero guards matches the
original instruction shape. Putting it into the same program crate does not:
LLVM promotes the private method's reference argument to scalar maximum-fee and
basis-point arguments, producing a 376-byte helper. The source proposal therefore
uses one small, real `no_std` path dependency owning `DecodedTransferFee` and its
non-inlined method. Existing `lto = false` preserves that reference ABI. The AMM
module reexports the type and keeps its SPL conversion in a local trait for the
unchanged inverse-fee path. The dependency is used by the actual program caller;
there is no dummy export, unsafe/assembly shim, binary patch, or compiler-flag
change. Existing error-source coordinates are preserved.

This crate boundary is a proposed reconstruction of the observed ABI. Its chosen
name and exact historical source organization are **not authenticated**. The
original caller at `0x74648` is still unmatched: its candidate shrinks from 696
to 640 bytes. It is not counted as another gain.

Review `source.patch` and `proposed/`. Four existing inputs change and two real
crate files are added, taking the complete workspace from 52 to 54 files. All
prior locked package records and 393 pre-existing dependency artifacts remain
unchanged. Only the local package is added to the lock graph. The maintained
checkpoint remains separate while this source proposal is reviewed.

## Measured baseline and attribution

The measured baseline combines the source in our merged [PR388](https://github.com/lalalune/pumpfun-source/pull/388)
with SYMBaiEX's reader source from merged [PR395](https://github.com/lalalune/pumpfun-source/pull/395)
(head `323da54de872e3151a070b2bbe24e8c5eb95485f`). This baseline was actually
rebuilt. It does **not** include PR381's deposit source; PR395's separately
reported 731 result uses another composition. Coincident totals are not summed.
Only the additional native fee helper is claimed here. `verify.py` checks this
source composition byte for byte against the existing packets.

| Same recipe | Normalized bodies | Raw bodies | Target bytes |
|---|---:|---:|---:|
| Measured baseline | 731/785 | 148 | 360 (packed SPL method) |
| Same-crate native control | 731/785 | 148 | 376 (promoted ABI) |
| Actual dependency candidate | 732/785 | 148 | 368 |

At helper offsets 128 and 320, the actual direct targets are `__multi3` (352
bytes) and `__udivti3` (72 bytes). Both direct callee bodies are raw-identical to
the corresponding original bodies. The helper has no relocated data references,
imports or wide literal loads. `analyze.py` checks the complete body and actual
edges; it does not infer target correctness from masked call offsets alone.
The incoming caller is found in all three binaries but remains unmatched.

## Build and execution evidence

The offline, locked Linux v1.44 SDK recipe uses Rust 1.79.0-dev, the
`sbpf-solana-solana` target, opt-level 3, overflow checks, panic abort, one codegen
unit and LTO disabled. Every normal build actually compiles the program crate;
the candidate and repeat also compile the new dependency. The repeat recompiles
both from unchanged source and produces identical complete ELF outputs. A third
build through the published materialize/rebuild CLI also reproduces both hashes;
its command and log are retained in `builds/cli/`.

| Artifact | SHA-256 |
|---|---|
| Original deployed ELF | `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7` |
| Baseline stripped ELF | `2c3618ad9cc351fa5f35c502fa9e7e3b2541fbdcca6bb467bf5b0a3f50135267` |
| Candidate/repeat stripped ELF | `351d0d9adb40497790cd46fa992776cdeefa758041a1e50a6a29355525b4e471` |
| Candidate/repeat ELF with symbols | `adb582a787391d30466734ba6586bfdfec451cbe9abdc95a97be1764830282ec` |

All executions below use those exact original/baseline/candidate images:

- 680 liquidity, 1,011 buy and 575 sell case triples: **2,266 triples / 6,798
  signed executions** with actual loader receipts. No return, state, instruction,
  full message-account, CPI or transaction differences. These suites reuse VMs
  with restored account inputs. Existing non-compute log differences remain
  0/76/88 respectively, with no gains or regressions.
- **216 fresh-VM triples / 648 signed executions**: the 96 decoder/epoch controls
  adapted from PR395 plus 120 arithmetic combinations over deposit/withdraw,
  basis points 0/1/100/9999/10000, caps 0/1/123/u64::MAX and LP amounts 0/1/1e6.
  Actual ELF loads, all non-executable message accounts before/after, signatures,
  metadata, clock, inner CPI and return data are retained. All triples match
  except compute consumption. Of 216 cases, 182 succeed, 20 reject during account
  validation, 12 reject malformed quote-mint data with 6007 and 2 reject in the unchanged
  inverse-fee path with Overflow6023 (100% fee, u64::MAX cap, positive deposit). All 102 failed executions preserve rollback except the verified
  5,000-lamport payer fee. Rejected cases are not claimed to reach this helper.

`verify.py` independently verifies signatures and joins actual program-load
hashes to the saved triples, rather than trusting summary counts. Corpora can
overlap; no exhaustive arithmetic/Token-2022 claim is made. Compute units are
excluded explicitly, not silently normalized into equality.

## Reproduction

With repository Python requirements installed, audit retained outputs locally:

```sh
python -I -B research/amm-native-transfer-fee-recovery/verify.py
python -I -B research/amm-native-transfer-fee-recovery/test_inventory.py
python -B scripts/verify_evidence.py
python -B scripts/test_tooling.py
```

The audit recomputes source composition, patch, lock graph, ELF hashes, injective
window inventories, complete target and its real calls, and signed runtime
receipts. It does not claim to rebuild or rerun execution.
The packet inventory rejects all unlisted files, including Python caches,
and rejects symlinks and special files. Temporary-file regressions exercise
those checks without changing any retained evidence.

To materialize and rebuild using an existing compatible SDK and populated Cargo
cache, use a new output directory and explicit mounts (Docker network is off):

```sh
python research/amm-native-transfer-fee-recovery/materialize.py /tmp/amm-fee-source
python research/amm-native-transfer-fee-recovery/rebuild.py   --source /tmp/amm-fee-source --sdk /path/to/v144/sdk   --cargo-home /path/to/cargo-home --target-dir /path/to/target   --output /tmp/amm-fee-build
```

The rebuild checks captured input/tool hashes, compiles both source crates and
requires both ELF outputs to match the recorded candidate. It needs the image
and locked dependencies already available; it does not install or fetch them.
Materialize a baseline with `--baseline`, or decompress its retained ELF, to run
the focused matrix:

```sh
python -B research/amm-native-transfer-fee-recovery/focused.py   --control /path/to/baseline.so --candidate /tmp/amm-fee-build/candidate.so   --output /tmp/amm-fee-focused/report.json
```

Exact original build, stripping, suite and focused commands are preserved in
`builds/*/launch.json`, `runtime/commands.json`, `runtime/focused/command.json`
and `compiler/commands.json`. `controllers/` preserves the original local
controllers, including their historical absolute paths; the portable entry
points above accept new local locations. The focused runner records load hashes
at successful `add_program_from_file` calls and verifies signed transactions.

## Rejected controls and limits

`experiments/` retains the borrowed combined-zero control, ordered standalone
source/LLVM IR/object, same-crate 376-byte control, and initial dependency build
that failed before compilation because the new package was absent from the
locked graph. Full offline metadata resolution added only that local package,
then the successful build ran read-only source with `--locked --offline`.
`prior-archive-read.json` identifies the previously read compressed failed
experiments; equivalent combined-zero/native-value forms were not retried.
`compiler/` shows actual complete helper disassembly in original, baseline,
failed same-crate control and candidate. The standalone IR is explanatory and is
never substituted for the normally built candidate.

The decoder and inverse-fee calculation remain unresolved. There is no new
whole-ELF/raw target match, transitive closure, original source provenance,
exhaustive behavior, Clock-failure injection or global stack-safety claim.
Inherited `admin_update_token_incentives` stack-frame diagnostics remain in the
normal build logs. No original, capture, or existing sealed packet was modified.
