# Social V2: original admission and helper Source coordinates

This two-file ordinary-Rust proposal starts from all 43 authenticated source
inputs of [PR222](https://github.com/lalalune/pumpfun-source/pull/222), revision
`0e8fa80aa560862bb8d2ed1df6e48add8271959b`. It preserves **570/585 complete
normalized counterparts, 143 raw local counterparts, 423 unique pairs and 168
previously equal Location uses**. It adds no complete matched function. The
actual V2 business body remains unequal (9,848 versus original 10,664 bytes),
as does the associated-token admission helper. Whole binary identity remains
false.

## Source correction and attribution

- Disabled-feature handling uses the original diagnostic and source-free error.
- Rate limiting excludes zero-rate/never-claimed states and compares against a
  saturating deadline, emitting the original rate-limit diagnostic.
- Executable-recipient admission occurs before choosing the token/native path.
- Native and token zero-amount paths emit the original no-op diagnostic.
- Native debit and credit use saturating arithmetic; token recipient and lifetime
  amounts retain the recovered saturating operations.
- The real associated-token helper's ordinary macros occupy lines 273, 278, 299
  and 306 of `instructions/fee_sharing/mod.rs`. The existing preprocessing and
  authorization bodies and physical lines 51–88 and 94–101 are preserved.

The exact legacy Social claim and account declarations remain unchanged. Public
PR219 already owns the native credit saturation and native executable/zero
messages; PR220 composes that work and PR222 owns the borrowed-payer adapter.
Those are preserved, not claimed as new discoveries here. The remaining V2
admission/deadline/token diagnostic and helper-coordinate corrections are the
separate subject. Later PR225/PR227 finish-helper recoveries and PR224 Sweep
corrections are not composed into this pinned source; 570 is an isolated source
counter, not a claim about the moving global frontier. Helper names/layout are
sufficient reconstructed source, not proof of historical spelling.

## Exact source and observed native outputs

Every public parent file was independently authenticated against its Git blob,
published compressed SHA-256 and decompressed UTF-8 source hash. `manifest.json`
separately labels gzip storage hashes and the actual compiler-input hashes.
Materialization uses an already-expanded exact parent source directory, never
ELF bytes or an encoded executable as compiler input.

Two root-clean builds of the exact-public-parent source reproduce candidate SHA-256
`8f9579c5aa7b21ccc5881acfbb90f667d6b609219cf53089c8f99822e1c41384`
and symbols SHA-256
`f85acb41fbf5318bd6d810c089137b38da20d2d6b3b78f659fd753cb27d22342`.
The independently compiled exact parent produces the published PR222 hashes
`fb5d4251dfe349660fa6b69a2f355045efbf46b334560064f4c7473021130bd8`
and `e7fd8857df7afbee8f12ef1c1f5a15c0478631b77295d75c9bcc64f75f3b0e44`.
Builds use official Linux platform-tools v1.44, locked/offline mode, the pinned
registry/math dependency cache. These local builds use official platform-tools
v1.48 `llvm-objcopy --strip-all`; the public PR222 recipe records its v1.52
stripper. Despite that difference, both parent outputs match the exact published
hashes. A real root compiler invocation is required. These are not all-dependency-clean builds or complete
host-library authentication. The exact-public candidate and a separately tested
source-order control have identical **full stripped and symbol output files**;
their source maps are nevertheless different and are not conflated.

## Bounded local checks, not downloadable execution proof

The finite local acceptance comparison covers 640 V2 cases against the actual
current-parent ELF: three outcome and 283 application-log mismatches become
zero. The obsolete earlier-parent five/290 counts are not used. The broader
17,331-case/18-suite regression also passes its defined predicates. These
observations are linked by full output-byte equality to the exact-public source;
they must not be read as a separately repeated replay from a different source
path. Their receipts, transaction/log fixtures and derived case data are not
included or downloadable in this source-only packet. Finite synthetic coverage
is not exhaustive semantics, raw compute-log equality or proof of reachability.
The focused snapshots omit executable-account bytes: eight executable-recipient
cases still compare errors, events, non-executable account snapshots and logs.
The separate sharing scope retains 78 known application-log mismatches; neither
this proposal nor the broader regression claims all program logs are equal.

Independent local static remeasurement binds the actual matched wrapper to the
unmatched V2 body, checks three early complete callees, four whole diagnostic
strings and four actual helper Source constructions. Read-only interpretation
of the actual bounded instruction graphs checks 729 deadline combinations and
343 saturation combinations. These are not executions of the whole contract
and do not close later calls, data, events, transfers or complete control flow.
The audit results are described as local observations; this packet's default
source tools do not verify native outputs or runtime evidence.

The compiler ELF shrinks from 877,768 to 877,248 bytes, still **3,992 bytes longer**
than the original meaningful ELF. Relative section sizes are `.text +3,328`,
`.rodata +4`, `.data.rel.ro +128` and `.rel.dyn +528`. Common-position differing
bytes **increase 462,922 → 470,275**. This is not a raw identity improvement.
The full capture is 948,944 bytes. All four core whole identities remain
unresolved; selected checkpoints are unchanged.

## Verify and materialize

```sh
P=research/fees-social-v2-current-source-proposal
python3 -B "$P/verify.py"
python3 -B "$P/test_scope.py"
python3 -B "$P/materialize.py" --parent-source /exact/pr222-expanded-source --output /fresh/source
```

Fifteen stdlib tests cover exact reversible patches, altered source and paths,
false runtime claims, existing outputs, symlinks and compressed-source provenance.
Materialization checks every one of the 43 actual source files; default
verification checks the full declared maps and both overrides, which must reverse
to the exact public parent. Verification performs no network, subprocess, compiler or
target execution. It reports `native_build_verified=false`,
`runtime_verified=false` and `whole_binary_identity_verified=false`.

For native reproduction use the [public PR222 recipe and pinned parent chain](https://github.com/lalalune/pumpfun-source/blob/0e8fa80aa560862bb8d2ed1df6e48add8271959b/research/fees-v2-transfer-source-recovery/README.md):
unchanged 252 registry packages, default Anchor/SPL features, source-path mappings,
release profile and dependency cache. Authenticate that cache or perform real
compiler invocations for rebuilt dependencies. Fresh dependency and relocated-path
reproduction are separate checks. Never patch or substitute a produced binary to
repair its hash.
