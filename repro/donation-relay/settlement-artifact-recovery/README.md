# Artifact-backed Relay settlement recovery

This packet independently builds the two exact source states from the
[settlement source proposal](../settlement-bodies-source-proposal/README.md).
The recovered state matches **488/492 complete normalized windows** and
**142 raw local windows**, without losing any baseline match. Only original
ordinals 92–95 remain unmatched. Their four bodies span 17,680 of 752,488
original text bytes (2.3%); that is unresolved window size, not remaining effort.

| Original ordinal | Bytes | Recovered body | Matching direct callees |
| --- | ---: | --- | ---: |
| 97 | 5,216 | Distribution after swap | 36/36 |
| 98 | 5,696 | Distribution without swap | 38/38 |
| 100 | 5,328 | Swap then distribute | 25/25 |

The source proposal supplies a generic basis-point iterator, a borrowed-key
argument constructor and the observed argument-field order. The three files
change within two hash-bound 60-input source maps. The 485-window baseline
already contains the earlier worker, epoch-close, swap-only and module-layout
recoveries; these are not counted as new discoveries in this packet.

## Build evidence

Both variants use fresh, separate target directories, the official Linux x86_64
platform-tools v1.48 SDK and the locked release profile. All 2,873 SDK files
match the retained inventory. All 253 registry archives match their lockfile
checksums, and all 7,968 extracted files match their archive members. Builds
run with networking disabled and only source/output, SDK and registry mounts;
no original program bytes enter compilation. Logs contain one actual root
compiler invocation per build and unchanged source hashes afterward.

The local Linux build image reuses the installed native tools from the earlier
verified Ubuntu 22.04 environment. Its image identity, mount records and package
inventory are retained. Source, SDK, dependency, command and output hashes are
reproducibility evidence, not authenticated historical-toolchain provenance.
An initial attempt to install tools in a fresh base image failed on DNS before
compilation; the successful builds use the retained offline environment.

The recovered candidate is 818,392 bytes, SHA-256
`e98ef5d4453ea93ab8189b35d7183a0777b2bf3ee46f87497a11700c263f55a3`.
Its meaningful original ELF is 818,280 bytes, and the complete captured allocation
is 830,448 bytes. No padding or binary patch is added. Whole-file equality
remains false, with 383,718 differing common positions and a 12,056-byte
original-only tail.

## Data and runtime scope

The entire 19,863-byte `.rodata` section is raw-equal. The data-graph check covers
all 359 positional `.data.rel.ro` pointers and 507 nonpointer qwords. It verifies
282 offsets into the identical read-only section, 74 text targets with closed
direct-call shapes and three relative data targets. Five text targets contain
indirect calls. These checks do not prove arbitrary indirect behavior or all
referenced object semantics.

Fresh replay covers 536 signed records / 534 unique retained fixtures, with
original observations re-established before candidate comparison. The existing
comparator excludes compute-metering and executable-image fields. No new
privileged settlement success, arbitrary alias, allocation-exhaustion or
exhaustive behavior coverage is claimed.

The selected Relay source and checkpoints remain unchanged. This packet advances
only the explicitly bound research inventory. No core program is whole-file
byte-identical.

## Verification

Run `python3 -B repro/donation-relay/settlement-artifact-recovery/verify.py` to
recompute artifact/source bindings, full window comparisons, recovered callees,
read-only-data/relocation checks and retained replay comparisons. It does not
compile or execute target programs. The source proposal retains the portable
materialization/build recipe; this packet adds actual build and execution
receipts and compiled outputs.
