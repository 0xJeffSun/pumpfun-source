# Mayhem allocator compilation context

A controlled Rust source addition produces the missing 328-byte `finish_grow`
form and restores the matching 640-byte reserve helper's call to it. This is a
compiler-context experiment, **not recovered historical source** or a promoted
reconstruction. It is based on the qualified checkpoint reproduced in
[PR #250](https://github.com/lalalune/pumpfun-source/pull/250), commit
`c268a71bce3047f8b700673fec9f5d86af13c516`, whose source comes from
`21bf0cf41ffed3c753630235969b6f183efabf35`.

The newer [provider-sharing checkpoint](../mayhem-provider-sharing/README.md)
removes other duplicate helpers but explicitly leaves this allocator relationship
open. This experiment has not been composed with that successor.

The sole source addition to `curve-accounts/src/lib.rs` is:

```rust
pub fn allocation_context_probe(length: usize) -> Vec<u8> { vec![0; length] }
```

An unchanged-source compile reproduces the complete reference object. Adding the
zeroed vector changes exactly one existing executable section: `finish_grow`
grows from 312 to 328 bytes and equals the existing Token-2022 helper's raw object
body. Changing only `0` to `1` leaves every existing executable section unchanged.
Both added functions are diagnostic probes; the positive probe is absent from
the final linked function map. No executable-byte patch or assembly is used.

The retained LLVM pass traces give a narrower explanation than a general flag
guess. At `IPSCCPPass`, `Global::alloc_impl` loses its zeroed-allocation branch in
the curve baseline and nonzero control, but retains it in Token-2022 and the
zeroed control. At inlining, `finish_grow` receives different allocation-result
control flow. The 312-byte form retains a size-result phi/select; the 328-byte
form stores the requested size directly. Diagnostic trace builds reproduce the
complete ordinary compiler objects. A separate LLVM-IR emission control preserves
executable sections but changes other object sections; it is not called an exact
object replay. This establishes a reproducible sufficient source context, not a
unique cause or the original program's allocation source.

Two fresh offline native Windows builds, using the parent's pinned compiler,
Linux target libraries, vendor set, metadata mapping and qualified linker script,
produce identical raw ELF and separately stripped output:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Raw compiler/linker ELF | 867,760 | `76736c2a81601ffa64746a25dce92db4ac6271ee2c7d3e997ab9c09da604bed8` |
| Separately stripped ELF | 733,368 | `56bd28a9c5956c01df8495647a4ea953840640a0f15fe3a260547d86efafe3a3` |

All 456 linked function sections remain. Only the curve helper changes normalized
shape; text grows by 16 bytes. Both original 328-byte windows, O0209 and O0237,
now have two candidates instead of one. The maximum injective local-shape matching
rises from 427 to 428. Candidate reserve at 487224 calls the new helper at 486896
at byte offset 528, matching the original relationship's local shapes.

The inventory remains **428/441 normalized**, with the same thirteen unmatched
bodies. Raw-local matches rise from 100 to 139 under this diagnostic layout;
these local byte matches include displacement/layout effects and do not establish
whole-ELF identity, transitive call/data closure, runtime equivalence or security.
No target program was executed. No allocation image is produced or compared.

## Recheck and retained controls

```sh
python -I -B research/mayhem-allocator-context/verify.py
python -I -B research/mayhem-allocator-context/test_verify.py
```

Verification is offline and uses the Python standard library. It checks 19 direct
compiler runs, two full 163-crate compiler traces, source scope, complete diagnostic
objects, raw output hashes, maps, call edges and matching capacity. The packet
retains all direct archives/IR/logs, full-build logs, linker invocations and their
temporary inputs, the changed archive, all linker-input identities, full source
and the build controller. Other full-build dependency archives are reproducible
from the pinned inputs; their hashes are retained, not a duplicate archive set.
Seventeen regression checks cover the evidence and reject unlisted files,
including cache-directory contents and nested manifests, as well as symlinks.

The first curve replay used the workspace manifest environment and changed eight
executable sections. Those failed controls remain under `direct/curve_accounts-baseline`
and `direct/curve_accounts-llvm-ir`; corrected controls reproduce the reference
object. Direct source additions used LF; the two full-build additions use CRLF.
Both exact source forms and hashes are retained; their emitted curve objects are
equal. `provenance.json` and `verification-notes.json` record these distinctions.

To rebuild, run `controller/build.py --help` and supply the same pinned Windows
SDK/toolchain, target sysroot, vendor directory and host linker. Each output
directory must be absent. The next reconstruction step is to identify a justified
zeroed-allocation source/use relationship and compose it with provider sharing;
the diagnostic probe itself is not historical-source evidence.
