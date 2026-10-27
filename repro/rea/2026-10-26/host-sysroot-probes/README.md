# Relay standard-library provenance probes

Three additional fixed-source probes do not reproduce the captured StringError
type ID: SDK v1.48 Linux ARM, v1.48 macOS x86_64, and v1.44 Linux x86_64. The first
two extend the preceding v1.48 macOS ARM and Linux x86_64 checks. No tested v1.48
Unix-host release sysroot reproduces that ID under this probe; this does not
exclude a custom build or prove which toolchain produced the target.

The Linux ARM and macOS x86_64 archives were retrieved from the official v1.48
release assets. Asset metadata and measured archive hashes are recorded. The
v1.44 archive already existed in the earlier provenance investigation. Probes
use each matching native Rust version to read the corresponding SBF sysroot;
they do not execute the downloaded host compiler. The target libraries were
hashed before and after compilation and remained unchanged.

A fresh experimental build of the current Relay source, using native SDK v1.48
Rust with its Linux x86_64 SBF sysroot, keeps all 477 normalized original matches
and increases raw matches from 107 to 108. Only three previously unmatched type-ID
bodies change their normalized bytes, and none becomes correct. Bounded equal
data-reference witnesses increase from 1,059 to 1,101 of 2,037. These witness
counts are not complete data-object or whole-program equality. No runtime
acceptance is claimed for this alternate build and it was not promoted.

All ten unique recovered Rust library source-location tuples agree between the
captured artifact and the accepted native build once the host path prefix is
removed. That is evidence for a related source revision, not a compiler identity
proof. The `/Users/runner/...` versus `/home/runner/...` distinction and the three
unmatched type-ID windows remain concrete provenance differences.

`target-typeid-windows.json` binds the three actual original windows. The verifier
reads those bytes from the original ELF, decodes the output constants, and checks
the saved LLVM IR and probe records. `--cache` also checks every recorded cached
target-library digest. Exact build inputs and complete ELF ledgers for the
Linux x86_64 experiment remain in `work/rea-current-linux-x86-sysroot-20261026`.

```sh
python3 -B repro/rea/2026-10-26/host-sysroot-probes/verify.py --cache
```

The accepted source and artifact remain the 477-window Jupiter checkpoint.
Full byte identity is unproven for Relay and the other programs in scope.
