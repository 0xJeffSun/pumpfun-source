# Donation Relay reconstruction

Reconstructed Rust for `RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu`. Complete original byte identity is still unachieved. The captured comparison ELF is `evidence/dependencies/donation_relay/deployed.so` (830448bytes, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`); it is never a compiler input.

The current23 source/lock inputs equal the message-and-tip snapshot in [decoded-business-origins](../../repro/donation-relay/decoded-business-origins/README.md). That packet freezes the Rust changes, source builds, complete ELF/function/call/data ledgers and signed local comparisons. The prior source-build-11 package remains an immutable earlier checkpoint.

The new owned error6009 and6018 constructors reconstruct the original diagnostic Source data (`programs/contracts/src/tools/checks.rs`, lines55 and192) directly from captured constructor instructions and string extents. These are explicit reconstructed program values, not a claim about this new Rust file's historical location. Owned name/message/origin fields survive propagation, logging and consuming lowering. Earlier documentation incorrectly claimed these tuples were absent from the binary; the evidence proves they are present.

All15 existing finite differential cases pass for the packet's compiled source: five ordinary donations, seven reserved IDL operations, and three business rejections. The exact same normally signed transaction is submitted to original and candidate in isolated LiteSVM instances with public deterministic test fixtures. Comparisons include error, normalized logs, CPI trace, return data and before/after state, with independent success-effect and failure-rollback checks. The frozen comparator omits compute-metering log lines and executable-image account bytes; compute or all-input equivalence is not claimed. The harness/fixtures were unchanged; only its candidate hash binding changed. Saved signatures independently reverify.

The message-and-tip build is475744bytes, SHA256 `836d2ffbec4c437cf9447138e4e54de886744cf4841aeadb34aaeaf7e0249a8f`. A separate fresh build directly from this current source location reproduces both the stripped and unstripped tested ELF exactly; its source/command/log/result are retained in current-source-proof/. This binds these current23 inputs to the tested bytes, without establishing a unique historical recipe. The measured recipe requests the official v1.44 target compiler and uses the retained SDK's v1.52 strip phase. The original capture's historical compiler, dependency closure and complete build recipe remain unresolved. Its SBF ELF header constrains a compiler family, not one unique version.

The source implements11 business selectors plus reserved IDL and event-CPI dispatch, including account/context decoding, donation/settlement arithmetic, token/runtime adapters, generated exits, owned error handling, state/event serialization and return data. Six fixed-relayer/swap/distribution success routes still lack complete runtime validation. Private historical authority is not substituted. Indirect-call/vtable, allocator-failure, remaining diagnostic and generated-context fidelity are open.

Full static comparison retains492 inferred original windows,330 candidate windows,33 raw/122 normalized original matches and370 unmatched original windows. Those figures are evidence inventory counts, not a percentage of recovered source. The full candidate remains unequal; no identity counter increases from these finite results. Subsequent work must recover complete unmatched functions, data, relocations and layout with reconstructed Rust builds.

Verify retained evidence and saved signatures without executing programs:

```
python3 -B repro/donation-relay/decoded-business-origins/verify.py
work/test-env/bin/python -B repro/donation-relay/decoded-business-origins/verify.py --runtime
```
