# Fees: typed Relay donation encoder

The committed556-window distribution-helper source gains the complete original1400-byte function at270136. The result is557/585 normalized windows,410 unique structural pairs,118 raw-local windows and28 unmatched windows. No prior normalized/raw match or positive call observation is lost. Whole meaningful-ELF and captured-file equality remain false.

The original function builds the Relay donation instruction payload: discriminator120,217,57,241,135,104,139,184, then amount, config key, fee basis points, message and project key. Disassembly shows a borrowed argument record whose physical layout places the String first, then amount and keys, then the u16 fee. A normal AnchorSerialize structure in that semantic field order reproduces the payload and complete body.

The first private helper control was inlined and recovered no complete window. Exposing the existing donation module and its typed encoder as a public Rust API retains the independent encoder. The accepted change replaces the manual payload expressions with a call to that encoder. This is inferred source organization, not proof of historical declarations. No inline attribute, assembly, fabricated bytes, output patch or padding is used. Existing source-line spans are retained.

All nine real outgoing calls match complete callee bodies: seven RawVec reserve helpers, memcpy and conversion of a serialization error. Duplicate reserve bodies are compared by complete signature rather than claimed as unique symbols. The encoder has no indirect calls or relocated pointer literals. Its original incoming caller at276672 is still unmatched. The candidate has a real incoming call from donation::crank; the enclosing caller body is not claimed equal. All165 existing decoded Location uses remain equal, and3284 previously equal direct-callee observations remain equal, with nine added positive observations.

## Parent and build evidence

Parent authority is commit8bbeac2d410e2eeed38b5c36ddad2c256e8aae6e, `repro/pump_fees/distribution-helper-recovery`. parent.json binds all42 actual parent source inputs and both decoded parent artifacts. A fresh isolated baseline build reproduces parent stripped hash fcb56a875b8f3a2e4805986f488b27708b77b2b66d8bbd04d71ddd3931d1cf52 and symbols573ffaa04800cec77f505bd678c4b8b6b65739fd977f383a180159fda499bd46.

Candidate stripped SHA256: d2fbc6390ef2bd37fea12f710d4bd2ec9b101b10c55d979708432a2d6971c5b6.
Candidate symbols SHA256: 727be353a7de671a366e5659b78e4b5c1d7fcb663dc1ca272e5397337d376c6f.

sources/ retains both42-input trees, source.patch is the two-file difference, and builds/ retains exact commands, input hashes, logs and outputs. These use official Linux platform-tools v1.44, the locked offline dependencies, the established three math-path mappings and this lane's private cached target. This is not a fresh all-dependency rebuild. Prior packets and public source selections are unchanged.

## Bounded runtime result

Both baseline and candidate freshly pass357 signed donation-crank cases against the captured original. Equality checks cover errors, before/after account state, inner instructions and emitted event data. Transaction bytes agree. The real captured Relay CPI is reached in159 cases, with identical original/candidate case sets, so the encoder path is exercised. These fixtures do not cover every possible argument value or allocation limit.

There are no new application-log differences versus556 after excluding explicit compute-consumption lines. Known original/candidate raw-log/compute gaps and the existing missing empty-donation application log remain outside this equality claim. The parent's 417 sharing-update cases and other historical suites are not claimed as freshly rerun here.

## Verification

```sh
python3 -B repro/pump_fees/relay-donation-encoder/verify.py
python3 -B repro/pump_fees/relay-donation-encoder/test_scope.py
```

The verifier checks exact membership, symlinks, stored hashes, decompressed evidence bytes, authoritative parent inputs and decoded artifacts checked in the immutable sibling packet against hashes pinned from the recorded Git revision, complete-body/callee/Location inventories and saved runtime comparisons. It does not compile or execute target programs. The bounded mutation test rejects changed source, changed artifacts, extra members and symlinks. Large JSON receipts, binaries and logs are deterministic gzip streams; decompress source JSON snapshots before compiling. Build paths name the original isolated environment and require equivalent pinned tools/dependencies for another host. No deployment occurs.

Validation uses the retained parent packet, so it also works in a shallow checkout with no local copy of the historical Git object. Whitespace-sensitive sources and patches are gzip-preserved without changing their decoded bytes.
