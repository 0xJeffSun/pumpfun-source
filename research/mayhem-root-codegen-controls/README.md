# Mayhem root metadata and source-path controls

Four root-only controls, each repeated exactly, separate two native Windows
build differences observed in [PR223's baseline](../mayhem-native-windows-baseline/README.md).
They reuse its historical **15-input PR214 source**, compiler, Darwin target
libraries and native dependency cache. They do not replace the newer
[native Program parser reconstruction](../mayhem-native-program-recovery/README.md).

**Neither control reproduces the published Darwin baseline or adds an original
window match.** The 720-byte instruction-size gap and both missing duplicate
function-shape copies remain. The path control isolates its effect on data.
The metadata control adds a value; it does not replace Cargo's existing value
and cannot rule out a true metadata replacement as a cause of the gap.

## Controlled observations

| Root command change | Raw Cargo output SHA-256 | Changed bytes versus native |
| --- | --- | ---: |
| Add published `e3c44ab51b8399da` metadata value | `d0db63136b6be2111c9dd788c5bad67d7416040c76003ea24f53d85242a50c52` | 23,164 |
| Add exact per-source path remaps | `2f43bbf2e6bedfd83389bf22180b6c3fbd21bff5c47b48ccd7c2a71b7a92024b` | 1,415 |
| Both changes | `c542d2fbbfd64c1f34e4e5c6059034cddc7ad2772b5eb55f56d2ff78f4947971` | 24,579 |
| Return to original root arguments | `6711f95d813be2a9f56e2b3259a4c61071c741eba0f9c6b08fdc06aae60841e6` | 0 |

Every raw output is 747,680 bytes, with symbols retained and no stripping,
padding, allocation-image construction or binary editing. The table compares
actual emitted bytes, not normalized files. All eight compiler outputs and
complete stdout/stderr/command/result receipts are retained.

Exact path remapping changes only `.rodata` and `.data.rel.ro`. The complete
558,560-byte `.text` is byte-equal to the native baseline; every other section,
header and byte outside those two data sections is also unchanged. All 18
measured Mayhem source-path occurrences use forward slashes; 14 contained a
backslash before the change. These are compiler arguments, not source edits.
String ordering and pointers change too, so this is more than replacing 14 bytes.
The published data sections still differ.

The additional root metadata value changes `.text`, `.data.rel.ro`, `.rel.dyn`,
`.symtab` and `.strtab` while leaving `.rodata` byte-equal. The combined control
has the metadata-only instruction section and the path-only read-only data
section. All four controls retain the same complete 409-function normalized
shape multiset. This does not prove equal direct callees, data or behavior.

Against the published Darwin artifact, the only multiplicity differences remain
one 312-byte `finish_grow` copy (6 versus 7) and one 408-byte `grow_one` copy
(2 versus 3). Adding the published metadata value, with or without exact
root source-path remaps, does not restore those copies in this cache.
A Mayhem build replacing the existing metadata value has not been measured.
Dependency metadata and host-built dependency artifacts have not been changed.

Every control preserves exactly the prior 58 raw-local original windows, 327
normalized counterparts and 188 examined matches. The original capture is used
only during post-build comparison. No new original-window recovery, semantic
admission, VM run, target execution or security/completeness claim follows.

## Execution and provenance

The exploratory series uses the preserved `controller/exploratory.py`.
The second series actually runs `build.py`, which checks all 15 source inputs,
144 cached host/target `.dll`/`.rlib` artifacts and the baseline executable
identities around the builds. It additionally verifies all 2,639 recorded SDK
files and 27 Darwin target components before and after the series. Each log
contains exactly one Mayhem root invocation and no dependency rustc invocation.
Both series return to the exact original raw native output at the end.

These are **eight root compilations using cached dependencies**, not fresh
all-dependency builds. PR223 retains the two separate full-build controls.
Native procedural macros execute during compilation; no target program runs.
Cargo remains locked/offline. There is no OS network-denial attestation or
exhaustive host DLL/SDK/include-file attestation.

The published root metadata value is checked against the pinned historical
Darwin compiler log. Native Cargo still supplies `c76d00b312df7907`; the control
appends a second `-C metadata=e3c44ab51b8399da`, visible in every relevant
actual rustc invocation. **Repeated flags accumulate rather than override.**
Four additional tiny object compilations with this exact compiler establish
that separate flags for the two values produce the same complete object as
one space-separated two-value flag, and a different object from either value
alone. All four instruction sections are equal; the symbol names distinguish
the three metadata lists. The four unmodified 592-byte objects, 85-byte probe
source, logs, commands and controller are retained under `metadata-option/`
and `controller/metadata-option.py`. These are separate tiny compilations,
not additional Mayhem builds.

This agrees with Rust's [metadata list parser](https://doc.rust-lang.org/stable/nightly-rustc/src/rustc_session/options.rs.html),
but the exact-compiler object control supplies the version-specific evidence.
An initial local draft incorrectly called the appended flag an override;
review caught this before publication. Its eight build outputs remain intact
and the interpretation is corrected here.

The host, source location, cache, vendor tree and
environment remain fixed. Exact per-file remaps are generated for all 12 Rust
source files. No conclusions about changing metadata throughout the dependency
graph can be drawn from changing this root argument.

Twenty-nine repository inputs are pinned by SHA-256, size and Git blob.
The source, toolchain and dependency licensing/provenance remain in the
[parent packet](../mayhem-native-windows-baseline/README.md). Unsuccessful
published-baseline comparisons are explicitly retained; no artifact is promoted.

## Verify

Python 3.12+ standard library, from the repository root:

```sh
python3 research/mayhem-root-codegen-controls/verify.py
python3 research/mayhem-root-codegen-controls/test_verify.py
```

The default verifier rehashes retained inputs, authenticates source/commands/
logs/repetitions, recomputes every function-shape and original-window comparison,
checks all changed byte ranges, and parses the tiny objects' symbols/text to
verify the additive metadata control. It executes no compiler, Git, network or
target program. It does not recheck the unavailable local SDK/cache; those are
recorded observations from the explicit second series.

To repeat compilation on the original provisioned Windows build environment,
use a new output directory:

```powershell
python research/mayhem-root-codegen-controls/build.py --baseline-launch ..\mayhem-native-build\build-01\launch.json --output ..\mayhem-root-controls\replay-new
```

This controller intentionally requires the authenticated original launch and
cache locators. It downloads/installs nothing and requires the prior SDK/MSVC/
Windows SDK tools. It is not a portable clean-build recipe; use the parent
packet's `build.py` for that separate purpose.
