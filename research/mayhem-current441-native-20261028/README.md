# Fresh native reproduction of merged Mayhem441

This packet independently rebuilds the merged PR432 source with fresh Cargo
target dependencies on Windows and reproduces **both complete archived files
exactly**. The shipped linker script contains cache-specific Cargo artifact
names; adapting 18 archive/member selectors to the fresh cohort is sufficient.
Section names and order, program source, metadata/path maps and compiler flags
are unchanged. This closes the fresh-dependency reproduction gap identified in
the upstream packet; it does not recover a new program function.

- Compiler ELF, 907,776 bytes: `5fda674541c8a39caf95d304d4cfb14fe5b0493a0c57e16a4dd78447b7169448`.
- Ordinary stripped ELF, 775,416 bytes: `380157fa6a63e717bd1630c6c4a86a4b66b596caedab6769d4497c8fa2b8d2a9`.

The result retains all **441 normalized, 441 raw-local and 441 recursively
direct-call-closed windows**, 4,768 positive direct-call observations and 519
Source observations. The original meaningful ELF still differs in exactly
**30 bytes**: `.dynsym` 1, `.dynstr` 20 and `.rel.dyn` 9. The original allocation
image additionally has 1,992 trailing zero bytes. No allocation image is
fabricated, and neither whole original file equality nor historical source/build
identity is claimed. There is no new runtime or security qualification.

## Inputs and literal filename adaptation

The full 67-file source, generated linker script and archived outputs are bound
to Git revision `dc8f791d32ae7fd6d9660cd1bf003fb02737f78f`, which includes
PR432's merge `7cc712993638b98a22f66ceca1e82f232b84f03d`. The native build recipe
and analysis helpers are separately bound to previously merged material at
`fcd0365f411661db3a9c1b08740dfd60a05daa14`. All source bytes match the upstream
inventory. The inferred inline attributes, source-coordinate budgets and
**target-derived linker layout** remain part of that source/build input.

The original script selects archive members using literal Cargo filenames.
For example, its `libanchor_lang-946a3f017ffdc240.rlib` member becomes
`libanchor_lang-f9a98358274b17c0.rlib` in this native cohort. Only the artifact
hash in the archive basename and the matching member prefix changes. The crate
name, codegen-unit suffix and parenthesized section selector remain unchanged.

`selector-map.json` records all 36 explicit object/member selectors, including
the 18 changed selectors. Every archive member was observed exactly once with
the pinned SDK `llvm-ar`; its object bytes are retained. The second fresh cohort
was queried independently, and all 36 selected object contents agree. Sixteen
whole archive hashes differ between cohorts, so **whole archive identity is not
asserted**. The receipts bind each archive hash to its own build's input
inventory. Archive containers remain external; the standalone verifier checks
the saved membership observations and object identities, not archive containment
by re-extracting complete external archives or live loader state.

## Two fresh builds and retained negative evidence

| Build | Normalized | Raw-local | Direct-call closed | Complete archived files |
| --- | ---: | ---: | ---: | --- |
| 01 unchanged shipped selectors | 441 | 90 | 441 | Different |
| 02 literal native filenames | 441 | 441 | 441 | Both identical |

Both runs compile 163 Cargo units, including 85 target units, in separate fresh
target directories: **326 compilation records, 170 target records**. The source
tree, dependency metadata seeds and path maps are identical. The only recipe
difference is the linker selector filenames. No linker input order, section
order, IR, instruction bytes or ELF output is edited. Ordinary `--strip-all`
preserves the allocated sections.

The SDK v1.54 compiler, Linux target sysroot, vendor sources and existing host
tools are pinned inputs. The historical host macro and its 61 dependency files
are reused; this is not a fresh build of the sysroot or every host component.
Compilation uses `--locked --offline`. All builds succeeded without stack-offset
warnings. Original ELF bytes are read only by subsequent static verification;
no target executable, VM, transaction or deployed account is used.

Build01 is retained because otherwise the platform-specific selector failure is
hidden by the successful reproduction. A first preparation probe tried to read
an ephemeral root object after Cargo removed it; the saved linker-wrapper copy
resolved that read, before build02 started. The first verifier incorrectly
required equal full archive hashes across the two fresh cohorts. Independent
second-cohort member observations corrected that assumption. Both failure logs
are retained under `provenance/`.

## Verification and rebuilding

Using only the Python standard library, from this directory:

```text
python -I -B verify.py
python -I -B test_verify.py
```

Replay checks Git bindings, all source/output pins, actual compile cohorts and
metadata delivery, wrapper/linker transformations, saved member observations,
literal-only selector changes, all 441 windows and direct-call closure, both
whole archived files, and the remaining raw differences. Counterexamples cover
a rebound section-selector change, missing member/target records, altered member
bytes, metadata, source/output, unlisted files and relocation of the packet with
network and subprocess creation blocked.

`controller/build.py` contains the successful recipe and exact source inputs.
Its `--help` lists the required SDK, target sysroot, vendor, MSVC, Windows SDK,
historical-macro directory and fresh output directory. The prerequisites are the
same as [the previously merged native recipe](../mayhem-current437-native-20261028/README.md).
The large pinned tool/dependency trees are external. `provenance/native_selectors.py`
records the observed adaptation procedure; offline verification needs neither
that workspace nor an archiver executable.

Full compiler/stripped files, source archives, stdout/stderr, actual wrapper
records, linker maps and copied ephemeral inputs are retained. Post-build input
hashes and saved logs do not attest historically loaded compiler libraries.
