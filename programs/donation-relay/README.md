# Donation Relay reconstructed Rust

The deployed capture is `evidence/dependencies/donation_relay/deployed.so` (830448bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`). Full captured-byte identity is still unachieved. Captured instructions and assembly are analysis inputs only, never compiler inputs.

The current27 source/config files match the selected snapshot in [framework-crate-recovery](../../repro/donation-relay/framework-crate-recovery/README.md). It preserves actual Rust builds, complete function/call/data comparisons, rejected controls, all111 decoded framework/program error names/messages, and normally signed local receipts. Prior [business-origin recovery](../../repro/donation-relay/decoded-business-origins/README.md) and source-build-11 remain immutable historical checkpoints.

The reconstructed `error-model` dependency restores the framework crate boundary. It owns AnchorError/ProgramError representations, logging, origin replacement, consuming lowering and boxing; program-specific constructors stay here. The77-variant framework enum follows the authenticated Anchor0.31.1 macro-generated API. The34-variant program enum follows the decoded6000–6033 catalog. The IDL3002 path constructs Source(lib.rs:36) before boxing, then replaces the origin with an owned IdlAccount name and later the outer parser's name. Business errors6009/6018 carry the decoded checks.rs:55/:192 values. These are explicit reconstructed program metadata, not claims about this new Rust source's historical file locations.

The strongest measured Relay recipe is platform-tools v1.48 (Rust1.84.1-dev). Its tracked allocation-error caller and stable-quicksort source family agree with the capture. Controlled v1.44/v1.50/v1.51 source builds are weaker. This is specific to Relay and does not change the core programs' research defaults or uniquely prove the original toolchain. Explicit SDK cargo/rustc and same-SDK objcopy controls reproduce the selected artifact, without relying on installer/strip-script selection state.

The selected native artifact is535536bytes, SHA256 `3a0acce9ba33b33132cb4fe40d909cd8e7524ffbea0e488a567b12d94724c46f`. A separate fresh build from this source location reproduces both its stripped and unstripped bytes exactly. Full ledgers retain492 inferred original windows and367 candidate symbol windows,57 raw/238 normalized original matches,254 unmatched windows. All seven targeted error bodies match fully under documented call/relocation normalization, totaling16240bytes. These inventory counts are not a percentage of recovered source, complete call/data closure or whole-byte identity.

All15 existing finite ordinary/business-rejection comparisons pass. Six additional malformed-header cases cover every checked IDL caller by changing exactly eight bytes in otherwise unchanged owned fixtures. The same normally signed transaction runs in original, previous control and selected candidate VMs with signature, blockhash and history checks. All six match; the old candidate also matches their visible errors, so these cases do not prove the new allocation/drop schedule. Full raw receipts are retained. The comparator excludes compute-metering log lines and executable-account image differences as before; successes have independent effect checks and failures have rollback checks. Allocator/OOM and all-input equivalence remain unproved.

The completed Linuxv1.48 source build uses these same27 inputs with a read-only official SDK in an isolated Ubuntu22.04 container. It emits535528bytes, SHA256 `024d556ae2a21229f26b75414e8255e95a961d224e90ab49c5de3208acaa5212`, with58 raw/238 normalized matches and254 unmatched windows. All21 cases and all111 name/message data proofs pass. Its executable size equals native; every corresponding named function has the same normalized instructions. Full raw bytes still differ, including platform diagnostic data/layout. Linux evidence is retained separately inside the recovery packet.

Remaining work includes complete IDL return/error ABI, original generated account/context code, business handlers/error origins, indirect/data/allocator closure, full ELF/relocation/layout reproduction, and stronger runtime coverage for fixed-relayer/swap/distribution success routes. No historical authority is substituted. No whole-contract/dependency identity counter increases from the finite results.

Verify saved evidence and signatures without executing programs:

```
python3 -B repro/donation-relay/framework-crate-recovery/verify.py
work/test-env/bin/python -B repro/donation-relay/framework-crate-recovery/verify.py --runtime --current
```
