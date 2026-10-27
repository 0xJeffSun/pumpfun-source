# Mayhem initializer Source origins

This packet corrects two panic-location records in `state::initialize` while retaining the qualified linker layout. It changes whitespace in one of 66 source inputs, `src/state.rs`. Two clean Rust builds produce the same qualified candidate and symbols:

- Candidate: `03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175`
- Symbols: `80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408`

The initializer's add-overflow record now names `state.rs:532:32`; its Clock unwrap record names `state.rs:531:43`. Each 24-byte descriptor and counted 37-byte filename matches the captured original. The add-overflow callee's counted 28-byte message is authenticated separately from its normalized body, which is also shared by other panic helpers.

Both complete qualified ELFs differ from the qualified parent at exactly three bytes. Both unqualified ELFs independently differ from their unqualified parent at the same three descriptor bytes. Every comparison has identical `.text`, and all 456 qualified function sections retain their addresses and sizes. The inventories remain 428 normalized matches and 100 raw matches, with 4280 positive immediate-call observations and 444 previously matched Source records preserved. The two newly corrected records belong to the still-unmatched initializer and are counted separately.

The initializer is still 920 bytes versus the original 960. This is a data-origin correction, not a recovered initializer body, a new function match, whole-ELF identity, or deployment.

## Reproducible evidence

`source.tar.gz` contains all 66 inputs and is checked against `source-inputs.json`. Only `src/state.rs` differs from the parent's source archive; the non-whitespace source text is unchanged. `source.patch` preserves the exact change. `build.py` is the unchanged parent build controller. The two build receipts retain independent linker-wrapper directories and map filenames, compiler output, tool hashes, input hashes and invocation records. The wrappers replace only the linker-script argument; the default script, qualified script and wrapper bytes match the parent packet.

`proof.py` rechecks the full-ELF deltas, unchanged text, exact Source values and the full matched-window/call/Source inventory. `analysis.py` rederives all 441 original windows using the unchanged `reader.py`. The linked parent is `research/mayhem-qualified-linker-layout`; `external-inputs.json` binds it and the original inputs.

## Runtime evidence

Fresh qualified replay covers 53 signed rejection cases and 16 real Pump-to-Mayhem CPI cases, including 10 successes. The 69 comparisons have no checked-field differences and contain 168 signed execution records. Every qualified execution records the actual Mayhem program account's bytes/hash before execution; Pump CPI records also authenticate the original Pump ELF. The read-only runtime checker verifies each signature and each program-account attestation.

`runtime/unqualified` preserves the earlier 69-case evidence for candidate `ce78c7f3…`. It is never relabeled as the qualified candidate. `runtime/qualified` is a separately executed and attested replay for `03f1f70e…`. Checked results and signed transactions agree between these two runs. These are local synthetic-account executions with genuine signatures and genuine Pump CPI, not historical successful transactions or live-chain acceptance.

With the repository's solders-enabled Python environment:

```sh
python -B research/mayhem-initializer-source-origins/verify.py --repository-root "$PWD"
python -B research/mayhem-initializer-source-origins/test_scope.py --repository-root "$PWD"
```

Standard Python can check static evidence with `--skip-runtime`. Verification does not compile or execute a target. To generate a new qualified runtime receipt, decompress the recorded candidate to a fresh file and run `runtime/replay.py --repository-root ROOT --candidate FILE --output FRESH_DIRECTORY`. This executes the target and writes gzip reports directly. Building requires the same pinned SDK, Cargo dependencies, source staging layout and qualified linker recipe recorded in the receipts; copied linker wrappers must be executable.
