# Relay 488-window ELF layout audit

Scope: read-only inspection of `repro/donation-relay/settlement-artifact-recovery`, its bound source proposal, and `evidence/dependencies/donation_relay`. No target bytes were patched, padded, trimmed, or executed; no root source was edited. The capture hash is `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. The recovered stripped candidate hash is `e98ef5d4453ea93ab8189b35d7183a0777b2bf3ee46f87497a11700c263f55a3`.

## What differs

Both files are ELF64 little-endian ET_DYN, machine263, flags0, with four program headers and nine section headers. The candidate already has the same strip/layout *format* as the capture. The unstripped candidate has12 sections, including `.comment`, `.symtab`, and `.strtab`; all three are absent from both compared stripped files. Those unstripped tables need not match anything in the capture and do not explain its tail.

| Section | Original file offset | Candidate file offset | Original bytes | Candidate bytes | Current result |
| --- | ---: | ---: | ---: | ---: | --- |
| `.text` |288|288|752488|752600|112 bytes longer;357608 differing common positions|
| `.rodata` |752776|752888|19863|19863|Raw-equal full section|
| `.data.rel.ro` |772640|772752|6928|6928|462 differing bytes; pointer graph already corresponding|
| `.dynamic` |779568|779680|176|176|Only three pointer-valued entries differ|
| `.dynsym` |779744|779856|408|408|Same17 names/types/order; three symbol values differ|
| `.dynstr` |780152|780264|247|247|Raw-equal|
| `.rel.dyn` |780400|780512|37232|37232|Same2327 r_info entries; differing relocation sites|
| `.shstrtab` |817632|817744|72|72|Raw-equal|
| Section header table |817704|817816|576|576|Addresses/offsets reflect preceding layout|

All downstream section offsets and allocated addresses are currently +112. Segment structure, flags and alignment match. The first RX segment's size differs by112; the other segment sizes match. The `.text` surplus is exactly the arithmetic sum of the four remaining body size differences: native handlers92/93 are6344 versus6272 (+72 each), and token handlers94/95 are2552 versus2568 (-16 each). Net:112. All other function sizes match as a multiset, although ordering differs.

This means recovering these four bodies is expected to fix the final section-size delta. It does **not** by itself fix placement of every already-matching function.

## Code ordering remains a real source/build problem

Many complete normalized bodies occupy different addresses because groups of emitted functions are permuted. The largest clear example is the block around entrypoint:

| Logical body | Original ordinal/address | Candidate ordinal/address |
| --- | --- | --- |
| entrypoint |194 /566024|199 /581552|
| `__rust_alloc` |195 /566472|200 /582000|
| `__rust_dealloc` |196 /566680|201 /582208|
| `__rust_realloc` |197 /566688|202 /582216|
| `__rust_alloc_zeroed` |198 /566952|203 /582480|
| custom panic |199 /567192|204 /582720|
| non-swap program function |200 /567392|198 /578568|
| after-swap program function |201 /570376|197 /575584|
| just-swap program function |202 /573360|196 /572488|
| combined program function |203 /576456|195 /569368|
| close-epoch program function |204 /579576|194 /566136|

Consequently the ELF entry differs by15528 rather than112. The original orders the runtime functions first and these five program functions non/after/just/combined/close; the candidate orders close/combined/just/after/non before the runtime functions. Smaller permutations occur among Account generic helpers, RawVec helpers, reference-formatting implementations and drop helpers. These are not missing semantic functions and should not be replaced with padding or copied instructions.

The current source still uses the reconstructed crate name `donation_relay_source_proposal` and an `anchor_framework::relay_anchor_idl_reconstruction_probe` namespace. They are not authenticated historical names. Inference: crate/module paths, generated-item placement, monomorphization and codegen-unit ordering are credible causes of these permutations. A controlled source-shape build that restores ordinary root `#[program]` placement while preserving line36 and actual module structure is more principled than an arbitrary linker-order list. A crate-name test may be useful if a real historical name can be independently justified. Do not accept new names just because one local permutation improves.

The retained build log records one root `rustc`, `-C codegen-units=1`, `--crate-type cdylib --crate-type lib`, target `sbpf-solana-solana`, `-C strip=debuginfo`, followed by `/sdk/llvm/bin/llvm-objcopy --strip-all`. The current segment/section format and equal strings support retaining these controls while measuring source ordering. The log does not prove the historical build used the same flags or crate names.

## Relocations and data

All2327 `.rel.dyn` r_info values match position-for-position. There are2228 relative relocations and99 symbol relocations, with the same symbol/type counts. Of the relocation-site offsets,136 already match;2108 differ by exactly112. The rest lie in locally permuted or unmatched function blocks. This is evidence for layout-driven relocation differences, not a need for a new relocation encoding or symbol table.

The `.dynamic` tags and nonpointer values agree. Only DT_REL, DT_SYMTAB and DT_STRTAB target addresses differ, each by112. DT_RELSZ stays37232 and the relative count stays2228.

The17 dynamic symbol records preserve names, binding/type, visibility, section index and size. Only `SECURITY_TXT`, `custom_panic` and `entrypoint` values differ. SECURITY_TXT is +112; the runtime function values differ by15528 because of the permutation above. `.dynstr` and `.shstrtab` are already exact. Changing exported names, deleting SECURITY_TXT or altering strip flags would move away from observed evidence.

The existing data-graph verifier proves507 raw-equal nonpointer qwords and359 corresponding `.data.rel.ro` pointer slots:282 pointers into byte-identical `.rodata`,74 targets of complete normalized direct-call shapes, and3 same-relative-offset data pointers. Five text targets include indirect calls; these are not behavioral closure proofs. Pointer raw values should recover automatically as authentic text/data placement recovers, and should not be rewritten by a patch.

## Capture allocation versus meaningful ELF

The original ELF's last declared structure ends at818280 = shoff817704 +9×64. No program or section header covers later bytes. All12168 bytes from818280 through830447 are zero. The recovered candidate ends exactly at its section-header end818392, with no extra tail. The current whole-file comparison's12056 original-only tail is **not** the original unused capacity:12168 original capacity minus the candidate's112 extra meaningful bytes produces that comparison length.

This tail has a concrete capture provenance. `capture.py` takes an upgradeable loader ProgramData account and writes `d[45:]` unchanged as deployed.so; it does not parse or trim its ELF. The bound ProgramData file is830493 bytes and exactly satisfies `programdata-account.bin[45:] == deployed.so`. Its ProgramData discriminant is3 and recorded deployment slot415422992. `capture.json` binds the ProgramData address `5QH8Ay11KgpRMyECYofHwAr6SzfFEGkbtPoM6eXv8V7B`, owner `BPFLoaderUpgradeab1e11111111111111111111111`, payload length830448 and full digest. Thus the comparison target is an account-capacity payload, not only the compiler/linker's meaningful ELF bytes.

Do not quietly narrow acceptance to818280 or append12168 zeros to a candidate. Full user acceptance still requires the entire830448-byte capture. The authentic next provenance question is how this ProgramData capacity was chosen: original DeployWithMaxDataLen / ExtendProgram / upgrade history or a captured deployment buffer/build artifact. It may reflect a previous larger program allocation rather than a compiler option. Read-only transaction/deployment provenance can distinguish this. Even an exact meaningful Rust ELF would not prove that allocation history. A future deployment-payload reproduction step must be documented as such and be supported by actual loader state, not represented as raw compiler output.

## Prioritized next actions

1. Finish four genuine donation bodies92–95. Require complete bytes under existing normalization and verify net.text length returns to752488 without a pad or patch.
2. Measure code placement separately: root/generated module boundaries, authentic crate identity if available, and codegen-unit/monomorphization ordering. Preserve the raw-equal.rodata/dynstr/shstrtab controls. Reject linker-order scripts made solely from target addresses.
3. Once meaningful text placement matches, recompute all full sections, ELF/segment headers, dynamic symbol values, dynamic pointers and every relocation record. The current count/type equalities are strong diagnostics, not acceptance.
4. Recover the ProgramData allocation history or original deployment artifact to explain12168 trailing zero bytes. Keep full capture equality open until a provenance-backed reproduction exists.

No historical compiler provenance was newly authenticated by this audit. The current packet's SDK and registry identity are measured reproduction inputs. The original stripped ELF carries neither an unstripped symbol table nor a compiler comment section. Full-byte identity remains false.

## Motivation and outcome of the generated-entrypoint control

The subsequent entrypoint control tested a narrower source-origin hypothesis than flattening the whole namespace: remove the manual root `entrypoint!(process_instruction)` footer and trivial forwarder, and enable the existing Anchor-generated `entrypoint!(entry)` by changing the default features from no-entrypoint to empty. This is supported by `anchor-syn-0.32.2/src/codegen/program/entry.rs`: its generated entrypoint is the first generated item and is gated by `cfg(not(feature = "no-entrypoint"))`.

The current manual forwarder can inline into the same448-byte wrapper, so current normalized-entrypoint equality cannot distinguish the two source constructions. Their definition placement differs and is directly relevant to the observed runtime/program-function permutation. The original stripped ELF cannot authenticate the intermediate Rust name `process_instruction`. The upstream macro already emits the exported `entrypoint` and standard heap/panic definitions, so enabling it need not change exported names or immutable strings.

A bounded search of `work/*/source/Cargo.toml` for Relay/REA variants found no previous `default = []` or `default=[]` snapshots. The folder `work/relay-entrypoint-next-review` is an older IDL-header review, not this experiment. This search does not claim that every nested/historical checkout was examined.

Acceptance for this probe: verify complete body matches survive, then compare runtime/program-function ordering, entrypoint address, all17 dynamic symbols, `.rodata`, positional `.data.rel.ro`, and all2327 relocation records. A matching entrypoint address alone is insufficient. The capture-allocation tail remains a separate provenance problem even if this source change restores meaningful ELF layout.

The completed [three-control study](../entrypoint-layout-controls/README.md) retains488 normalized matches in each variant but does not restore the runtime/program-function order. The generated entrypoint alone gains one raw-local match; the crate-name and instruction-module variants each lose raw matches. The accepted artifact remains unchanged.

The later [allocation provenance packet](../allocation-provenance/README.md) resolves the capacity history: the original546944-byte allocation plus five observed extensions totals830448. Its13 retained successful transactions explain the zero-capacity tail and agree with deployment/authority metadata. Rust byte identity and loader-backed payload reproduction remain open.
