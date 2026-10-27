# Relay: exact ELF reproduction through an explicit linker layout

Two Rust builds reproduce **all 818,280 bytes of the original Relay ELF extent**.
No byte inside that extent differs: ELF headers, all sections, instructions,
call targets, read-only data, pointers and relocation records compare literally.
All **492 original function windows are raw byte-equal**.

The captured file is 830,448 bytes. Its remaining **12,168 bytes are a zero-filled
allocation tail outside the ELF extent**. The compiler output does not include
that tail, and it has not been appended or padded. Thus the meaningful ELF is
identical; the compiler artifact and complete capture remain different files.

A fresh offline deployment through the real upgradeable loader now reproduces
**all 830,448 captured payload bytes**, including loader-created capacity. Its
912 signed transactions pass, and the resulting payload SHA-256 equals the
capture. No padding is appended by a script. ProgramData metadata, authority,
slot and historical transaction sequence are not claimed identical.

This is a **reconstructed build recipe, not a recovered historical recipe**.
It uses the previously verified ordinary Rust source and an explicit linker
script to reproduce the observed function layout. It does not establish the
original source names, natural compiler ordering, or historical linker flags.
The four core selected programs remain byte-unequal; this result is Relay research.

## What changed

The accepted source already had the same multiset of 492 complete normalized
function bodies as the capture. A one-to-one correspondence preserving every
direct call and the recorded code-pointer constraints supplies a section order.
The ELF symbol table and an ordinary baseline linker map identify the owning
object/archive member for each function section. The script retains the SDK's
normal program-header and output-section rules, replacing only `.text` input
section ordering. It contains symbol/section names, not original instructions.

A symbol-name-only trial failed because five local names occur in multiple object
files; it grouped unrelated copies. The final script distinguishes object and
archive members. The first quoted-file-selector trial matched no sections;
its output remained the baseline. The final unquoted file patterns are the
actual tested layout in `layout/ordered.ld`.

The wrapper passes that script to the pinned SDK's `rust-lld`. The linker itself
resolves every address, call displacement and relocation. No original executable
is read by the compiler or linker. No assembly, binary fragment, post-link byte
patch or output padding is added. Normal `llvm-objcopy --strip-all` produces the
retained stripped artifact; all allocated sections are checked against symbols.

LLD supports archive/member input-section patterns; this is documented in the
[LLVM implementation](https://reviews.llvm.org/D75100) and the
[GNU input-section syntax](https://sourceware.org/binutils/docs/ld/Input-Section-Basics.html).
The layout is inferred evidence, not proof that the historical build used it.

## Independent build and runtime evidence

The first root build reused verified dependencies. A second build started with
an empty target directory in a separate network-disabled container, mounting
only the 60-file source tree, two linker configuration files, SDK, registry,
target and output directories. Sources/configuration/SDK/registry were read-only.
**No original binary was mounted.** Both stripped and unstripped outputs agree
exactly across builds. All 253 locked registry archives and 7,968 extracted files
were checked before and after the fresh build. Sources were unchanged.

The source is the `complete492` state from the
[wrapper source proposal](../donation-wrapper-source-proposal/README.md).
`builds/fresh/build.py` is the actual build controller, with launch, registry,
container, linker arguments/map and result records alongside it. The captured
SDK/image/cache paths are local locators: adapting them on another host must
preserve the pinned tool hashes, dependencies and configuration. The controller
expects a fresh workspace containing `source/` and `config/`; it does not download
SDKs or packages. Originals are needed only for post-build verification.

Fresh signed offline replay passes **536 records / 534 unique fixtures** with the
same comparator and exclusions as the parent study. This is not a new assertion
of protected relayer success coverage or security of the original program.

```sh
python3 -B repro/donation-relay/linked-elf-reproduction/verify.py
python3 -I -B repro/donation-relay/linked-elf-reproduction/test_scope.py
```

The verifier rechecks the layout correspondence, source/build/configuration
bindings, literal full-ELF equality, all function windows and saved signed replay.
It requires the replay harness's `solders` dependency, but compiles and executes
no target program. The stdlib negative tests reject a changed call immediate,
appended allocation padding and a tampered layout selector.

Candidate SHA-256 (also the original ELF-extent SHA-256):
`56d81ec64a0ba070d3d23f3c1547b31d659e85716dfa2198ec4b0ce6cd355333`.
Unstripped SHA-256:
`07ab4ac487727385a3b5ec0d4bc1139e10f701c3fac2f95b88d89701a38ab9e1`.

## Loader-backed payload reproduction

The [allocation history](../allocation-provenance/README.md) derives the final
capacity from the initial deployment and five extensions. The existing
[offline loader implementation](../offline-loader-allocation/README.md) writes
the exact Rust ELF and requests that derived capacity. The recorded fresh run
in `loader-receipt.json` produces payload SHA-256
`367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.
It uses only synthetic local balances and no RPC. It deploys directly at final
capacity, rather than replaying the historical upgrades and extensions.

```sh
python3 -B repro/donation-relay/linked-elf-reproduction/verify_loader.py --execute
```

The default verifier checks this bound receipt statically; `--execute` independently
replays the 912 signed transactions in a fresh LiteSVM instance.

The reused static parser reports `runtime_cases: 0` and `execution_suitable: false`
in its comparison summary because it does not execute or certify programs. Those
static fields are not the replay result; `runtime.json.gz` and `loader-receipt.json`
retain the actual bounded executions, checked by the separate verifiers.
