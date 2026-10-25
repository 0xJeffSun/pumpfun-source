# Controlled Pump source-path remap on `4ffe8bd`

The captured Pump ELF embeds `programs/pump/src/create_v2.rs` in
relocation-backed source-location records; this source-built candidate uses
`src/create_v2.rs`. This experiment compiles the **same 35 program source
inputs** with the same pinned v1.44 Rust compiler, adding
`--remap-path-prefix=src=programs/pump/src` only for the Pump crate through
[`pump_rustc_source_path_wrapper.sh`](../../../scripts/pump_rustc_source_path_wrapper.sh).
No program source or captured binary bytes are patched.

The unmodified candidate is 1,478,960 bytes, SHA-256 `c9c364b5…`; this
remapped [candidate](candidate.so) is 1,479,336 bytes, SHA-256
`c59ec059d82d484d1fd5da0401d1ee9189ac99b3b6d5307dca4a86411e80b787`.
The remapped source-location records now match the target's **path bytes,
length 30 and no-trailing-NUL encoding**. Their line numbers remain
11/60/61/110–112/137 versus target samples at 27/385/426/488. Both
candidate `.text` sections are 1,365,320 bytes, but differ at 7,476 raw and
265 BPF-immediate-normalized byte positions. **Neither candidate matches the
deployed Pump ELF or full ProgramData SHA.** This does not identify the
historical compiler flags.

The saved [build comparison](build-comparison.json),
[attempt](build-attempt.json), compressed log, and
[verification receipt](verification.json) pin the output. All 35 source
hashes and the v1.44 compiler hash match the `quote-control-fortyeight`
checkpoint. Of 53 SDK source hashes, 52 match; the isolated downloaded SDK
installer selected the verified cached v1.44 compiler instead of its bundled
v1.43 default. The build script records normalized command/environment but
does **not** independently attest `RUSTC_WRAPPER`; that wrapper and the
invocation are explicit research inputs.

Run `python3 scripts/verify_pump_source_path_remap.py` with the repository's
pinned Python dependencies to recheck ELF sections, source hashes, the
wrapper and location records without rebuilding. The verifier reads the 35
historical source files from immutable Git commit `4ffe8bd`; later source
changes in the checkout are outside this experiment. To repeat the source build,
use a clean `4ffe8bd` checkout with platform-tools v1.44 and its locked Cargo
dependencies cached, set `RUSTC_WRAPPER` to the absolute path of the saved
wrapper and `CARGO_HOME` to an isolated cache, prepend an Agave 2.1.21 CLI to
`PATH`, and invoke:

```sh
python3.12 scripts/build_partial_candidate.py \
  --manifest programs/pump/Cargo.toml --program pump \
  --artifact-name pump_recovered.so --tools-version v1.44 \
  --output work/path-remap-repeat
```

The output directory must be new. The wrapper applies the remap only to
`pump_recovered`; other Cargo crates' flags are left alone. No transaction,
deployment, or live funds are involved.
