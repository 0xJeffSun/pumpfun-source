# LLVM stack coloring in the earlier Fees body-direct candidate

This packet records the compiler pass that merged a temporary 16-byte slice
descriptor into a 24-byte error slot in **PR75's body-direct candidate**. The
diagnostic build reproduces both complete PR75 ELF outputs byte for byte. It
does not improve their comparison with the deployed capture.

The source recovery has already advanced beyond this candidate. [PR81](https://github.com/lalalune/pumpfun-source/pull/81)
consumes the passed checked buffer and closes all stack-offset differences in
the 1,248-byte parser under its explicitly stated CALL and verified-pointer masks.
[PR83](https://github.com/lalalune/pumpfun-source/pull/83) subsequently recovers the
downstream decoder under its stated masks, and [PR169](https://github.com/lalalune/pumpfun-source/pull/169)
restores full-buffer unchecked input. This is complementary compiler-stage
evidence for the earlier candidate, not a new unresolved source frontier or a
claim that the later candidates have been traced here.

## Observed transformation

The filtered function is
`_ZN11anchor_lang8accounts7account16Account$LT$T$GT$8try_from17h35c4169a6471ee49E`.
Four complete raw MIR dumps are retained inside `trace-build.stderr.log` in the
provider ZIP: before/after `stack-coloring`, then before/after `prologepilog`.
`analysis.json` gives their exact byte ranges and SHA-256 hashes.

| Object before coloring | Size | Destination after coloring | Final destination |
| --- | ---: | --- | --- |
| 0, temporary slice descriptor | 16 | 1 | SP-24, 24-byte slot |
| 2 | 24 | 1 | SP-24, 24-byte slot |
| 3 | 24 | 4 | SP-160, 136-byte slot |
| 5 | 24 | 4 | SP-160, 136-byte slot |
| 6 | 64 | 4 | SP-160, 136-byte slot |

The descriptor's two stores and address construction change from `%stack.0`
to `%stack.1` during stack coloring. Objects 0, 2, 3, 5 and 6 become dead. The
sum of live object sizes falls from 408 to 256 bytes. Two 8-byte spill objects
appear before frame finalization, bringing that sum to 272. This is an object
size sum, not an independently measured historical frame allocation.

The verifier derives the consistent frame-ID map from the paired instruction
operands. It removes diagnostic SlotIndex prefixes and lifetime pseudo-lines
only for that descriptive comparison. Memory-operand annotations also change:
their complete before/after differences are reported separately. The raw MIR
is never replaced by this projection, and the projection is not a raw-byte or
semantic equality criterion.

The emitted candidate helper is at 28,728 and is 1,248 bytes / 143 decoded
instructions. Its original comparison window `[36072, 37320)` remains inferred.
Their local CFG and opcode/register shape agree, but their raw bodies differ:

- 22 stack operands move by +16 in the candidate.
- The descriptor's three operands at helper-relative 1,024, 1,040 and 1,072
  move by +152: original `[-176,-160)`, candidate `[-24,-8)`.
- Both images construct the error argument at -24. Of 13 acyclic local CFG
  paths, four visit the selected error sites, four visit the descriptor sites,
  and none visit both. Calls are modeled as normal fallthrough; this is a local
  path observation, not a proof about callees, memory safety or all behavior.

The observation establishes the candidate's actual slot reuse. It does not
reconstruct the original compiler's MIR, identify historical flags, attribute
every original stack object, or justify disabling stack coloring. PR81's ordinary
source change already resolves the relevant emitted stack offsets.

## Reproduction and provenance

Successful [fork run 40378096649](https://github.com/startrack3r/pumpfun-source/actions/runs/40378096649)
used controller commit `59afac1db1af021f1c5884ba4151e91d329c5bdb`.
Artifact `12678690134` is retained as the exact 624,193-byte provider ZIP, SHA-256
`039aa30294cc4c61e2ac1f8a17788b63de143c4de12e05ae32a842a1381f44ed`.
Run, job, artifact metadata and all 41 member identities are retained.
This stack-trace probe succeeded on its first run; earlier failed guard-build
probes remain in [the separate guard reproduction packet](../fees-guard-split-build/README.md).

The 26 source inputs exactly equal PR75's body-direct input map at
`5f8f2aef2a70e43642e65e10d1db3e7476a533d6`. The archive and source patch are
retained; the patch is an existing historical proposal, not a change to selected
sources. The root-only wrapper adds exactly three diagnostic arguments:

```text
-Cllvm-args=-print-before=stack-coloring,prologepilog
-Cllvm-args=-print-after=stack-coloring,prologepilog
-Cllvm-args=-filter-print-funcs=<exact symbol above>
```

The logged root input and actual argument arrays are checked. Dependency
invocations are passed through unchanged by the wrapper. No optimization flag
is added. Raw outputs equal the retained, Git-blob-bound PR75 references:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Cargo output before explicit strip | 1,238,288 | `336de06b76de9a3c14763ff2022b0ed2a670613f1041085705f06f96c3fe3fc0` |
| Explicitly stripped output | 863,904 | `53ae09c42283b3d96bf4d9c9cff42f6f3989b6c7bccca3ca15b0fb25aaacec3b` |

Both are unpadded outputs. The first uses Cargo's `strip="debuginfo"` profile
override, so “unstripped” in filenames means before the subsequent `--strip-all`.
Neither is equal to the captured allocation. No allocation image is generated.

`policy.json` pins the Linux amd64 host image, full official v1.44 compiler
archive and v1.52 strip archive, compiler/cargo/objcopy file hashes, source inputs
and expected outputs. Public input acquisition precedes an offline locked Cargo
build in Docker with network disabled, read-only rootfs, dropped capabilities and
no-new-privileges. Captured binaries are not mounted into compilation. There are
zero target-program executions. The run checked 252 locked registry archive
checksums before and after compilation. Offline verification checks their saved
receipt against Cargo.lock; it does not redownload dependencies, independently
attest process memory, or compare extracted dependency files.

`compiler-source.tar.gz` retains four exact files from
[`anza-xyz/llvm-project@08aedd64`](https://github.com/anza-xyz/llvm-project/tree/08aedd64bf3abe4f163407b7bcf680403b84b32d),
the v1.44 Rust LLVM gitlink recorded in [the compiler SDK study](../../repro/identity-audit/2026-10-25/compiler-sdk/REPORT.md).
`compiler-source-receipts.json` binds their Git blob, SHA-256 and size.
StackColoring.cpp describes merging nonoverlapping object lifetimes and remapping
frame indices; TargetPassConfig.cpp places that pass before register allocation
and distinguishes it from spill-slot coloring. Source correspondence supports
interpretation of the observed dumps; it is not historical build attribution.

The LLVM source files and `LICENSE.TXT` retain **Apache-2.0 WITH LLVM-exception**
terms. The packet's own Python and report use the repository MIT license.
Retained reconstructed program sources and binaries keep their upstream terms;
the packet does not relicense them. Hosted runner paths in raw receipts are
ordinary provenance; no contributor workstation paths are added.

## Offline verification

Python 3.12 or newer, standard library only:

```sh
python3 -B research/fees-stack-coloring/verify.py
python3 -I -B research/fees-stack-coloring/verify.py
python3 -B -m unittest discover -s research/fees-stack-coloring -p 'test_*.py'
```

Only this packet and the existing original Fees capture are needed. The verifier
never executes retained binaries, invokes the compiler, downloads inputs or
sends transactions. Tests include altered ELF bytes, artifact digest, network
mode, compiler arguments, missing/duplicate dumps, changed machine operands,
descriptor offsets, and an isolated relocated replay.

For a fresh compiler observation on Linux x86_64 with Docker, use
`python3 research/fees-stack-coloring/run.py --output <fresh-directory>`.
It downloads the pinned public inputs, then builds offline; it is separate from
verification. `executed-workflow.yml` inside the ZIP is a historical controller
receipt, not a workflow installed by this packet.

This study adds no behavioral coverage, new selected source, deployment result,
security claim or whole-program identity. Upstream context was reviewed through
`ba7883511942965c5c9def03971bdaff84963d6b` (PR169).
