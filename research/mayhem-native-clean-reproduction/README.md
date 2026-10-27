# Independent native Linux reproduction of the current Mayhem source

This packet closes the native clean-build task left open by the
[426-window source/data recovery](../mayhem-source-data-recovery/README.md),
including its [shared AMM sell-quote successor](../mayhem-sell-quote-call-recovery/README.md).
The **same 65 source inputs, with no Rust or dependency changes**, compile from
empty Cargo target directories using official native Linux SDKs. Two complete
builds agree with the initial discovery build, without cached object reuse.
Each clean build records 163 rustc invocations across 132 crate names.

This is independent source/build/execution evidence, not a newly recovered
business function. It does not reproduce the mixed macOS/Linux parent's whole
ELF. It preserves all **426/441 complete normalized windows**, **4,234 supported
immediate-call observations**, **441 matching Source records**, and the account
cohort's **153 typed-equal references** under the frozen extent checker. That
checker leaves three references unclosed on this native artifact. The later
[completed cohort](../mayhem-account-cohort-complete/README.md) resolves those
references on its own published artifact; those results are not automatically
rebound to this native build.
There are still **15 unmatched windows / 119,400 original text bytes**.

The native artifact has 71 raw-local windows versus the parent's 70. The extra
48-byte raw counterpart is O0297; its immediate target shape also matches.
This is a placement-dependent observation on an already normalized-matched
formatter, not a new function recovery or a source-authorship claim. Ambiguous
counterparts and unclosed indirect/transitive dependencies remain explicit.

## Artifacts and provenance

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Native candidate | 733,312 | `9d242979b15dbac90be979732d4929ab58eb9d8b81051127424194ae3e60b291` |
| Native symbol ELF | 866,976 | `452db6e0196bae7918791987bdfd351c015289510f19619eee760d882fe9b082` |
| Original capture | unchanged | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |

The parent candidate is `fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4`.
Whole-file equality with either the parent or original is false.

Every installed regular file was checked against its exact member in the
hash-pinned official Linux archive: **3,334 files + 12 symlinks** for v1.54 and
**3,198 files + 12 symlinks** for the v1.52 stripping SDK. This includes host
compiler libraries and target libraries, beyond the parent's 26 target members.
`toolchains/` retains every member digest and symlink target. The archive hashes
are `fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e`
and `8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e`.

The Docker image is pinned by digest in `build.py`. Builds run with `--network
none`, an explicit `env -i`, read-only source/SDK mounts, and a new per-build
target directory. Locked registry archives and extracted source members are
checked before and after compilation. Original/dependency program ELFs are
runtime comparison inputs only; none is a compiler or linker input. There is
no output patching, padding, signer bypass, RPC access or selected-checkpoint
change. SDK binaries are authenticated release binaries; their own compiler
source/bootstrap history is not independently rebuilt here.

## Fresh local execution

The exact native candidate was replayed against the original in **9,586 case
comparisons**, with **19,202 saved signed transaction records** verified. Record
counts include repeated transactions and multi-transaction initialization cases.

| Coverage | Comparisons |
| --- | ---: |
| Six trade instructions, fourteen currency/instruction suites | 6,636 |
| Administrative paths | 1,032 |
| Fee-recipient, sweep and withdrawal paths | 1,601 |
| Sweep aliases, rate/counter combinations and rent boundaries | 240 |
| Initializer rejections | 53 |
| Genuine captured-Pump initializer CPI | 16 |
| Token-program validation | 2 |
| Global initialization | 6 |

All compared errors, account effects/rollback, events, CPI and return values
agree. The CPI corpus includes ten successful cases; global initialization
includes two. Five existing independent trade receipt checkers were rerun.
`validation/summary.json` reports non-compute diagnostic differences separately;
passing functional comparisons do not erase the 21 trade and 58 sweep diagnostic
differences. The inherited 692-case sweep corpus includes 12 repeated case inputs;
its exact ordered corpus is preserved rather than silently deduplicated. The 240-case
sweep probe found no new behavior defect and introduces no sweep source change.
The parent's separate Burn sequences and dedicated 150/48-case sweep matrices
were not freshly replayed in this packet; their receipts are not rebound to this
new candidate. Finite synthetic cases do not prove complete runtime equivalence.

## Reproduce and inspect

Offline saved-evidence verification requires Python 3.12 with `solders==0.27.1`
and `pyelftools==0.32` (the recorded local environment). It launches neither a
compiler nor a target VM:

```sh
python -B research/mayhem-native-clean-reproduction/verify.py
python -B research/mayhem-native-clean-reproduction/test_scope.py
python -B research/mayhem-native-clean-reproduction/analysis.py --check
```

Materialize the authenticated parent source to a new directory:

```sh
python -B research/mayhem-native-clean-reproduction/verify.py \
  --skip-runtime --materialize /absolute/new/native-source
```

Prepare an external work directory with `sdk-1.54/`, `sdk-1.52/`, the official
archives named `platform-tools-v1.54.tar.bz2` and `platform-tools-v1.52.tar.bz2`,
and `cargo-home/` containing the locked registry archives/sources. URLs and exact
hashes are in `toolchains/`; downloads are not performed by the verifier.
The pinned Docker image must already be available. Then:

```sh
python research/mayhem-native-clean-reproduction/authenticate_sdk.py --work /absolute/work
python research/mayhem-native-clean-reproduction/build.py --work /absolute/work \
  local-reproduction --source /absolute/new/native-source --fresh
```

`builds/*/launch.json`, compressed compiler logs, and `validation/*commands.json`
preserve executed commands and original paths. Runtime scripts accept explicit
candidate/output paths. The fourteen trade commands use the existing repository
harnesses and fixed corpora; change only local interpreter/repository/output
paths when replaying. Originals and prior evidence are never overwritten.

The remaining source priorities are the shared quote/admission and accounting
bodies, then larger trade/Burn/sweep handlers; initializer O0193, unbounded data,
indirect calls, layout and historical provenance also remain open. An immutable
reference hash or a normalized match is not proof that those tasks are complete.
