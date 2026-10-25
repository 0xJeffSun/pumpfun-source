# Remaining dependency function inventory

This static inventory accounts for every inferred entry-bounded `.text` window in the retained best ATA candidate, Metaplex candidate 11 and captured donation relay. It does not claim source-function boundaries are independently known: the windows are inferred from exported entries, internal call targets and relocated function pointers. The full ranges, hashes, calls and unresolved classifications are in the three `*-functions.json` files. All addresses below are decimal ELF text/file byte addresses; range ends are exclusive.

No source correction is newly justified by this pass. ATA lacks original build metadata needed to explain ordering; Metaplex retains one unresolved function shape and source-coordinate differences; the relay lacks an attributable source revision and any source-built candidate. This pass performed no network access, builds, runtime probes, source edits or executable mutation. All normalization is in-memory diagnostic comparison.

## ATA — six raw-differing mapped windows, one ordering gap

Captured SHA256 `6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d`; best candidates 2/4 SHA256 `ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b`. Both have 105,032 bytes. Actual differences remain 307 positions: 304 in `.text`, three in `.rel.dyn`. Every other section matches.

All 159 inferred windows have instruction correspondence under the existing two-specialization address mapping. Of these, 153 bodies are raw-identical at their mapped address. The six others differ only in direct-call displacements after correspondence. Exact exhaustive remaining rows:

| Ordinal | Original range | Candidate range | Classification |
| --- | --- | --- | --- |
| 38 | 28592–29032 | 28944–29384 | relocated_RawVec_specialization |
| 39 | 29032–29384 | 28592–28944 | relocated_RawVec_specialization |
| 41 | 29704–31160 | 29704–31160 | caller_displacements_only |
| 44 | 34296–34840 | 34296–34840 | caller_displacements_only |
| 46 | 35936–37968 | 35936–37968 | caller_displacements_only |
| 47 | 37968–40512 | 37968–40512 | caller_displacements_only |

The 440-byte (55-instruction) specialization moves 28592 → 28944; the 352-byte (44-instruction) specialization moves 29032 → 28592. All instructions and mapped call targets agree. Two relocation records differ in their ordered locations: record247 at102800 references original28968 versus candidate28880; record248 at102816 references original29024 versus candidate28936. Both have type/symbol value4294967306 (type10). The mapped relocation multisets agree. Actual files remain unequal; no rearranged ELF was produced.

The retained source revision is `f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca`. Historical release/Anchor0.24.2/CLI1.10.33 provenance is already documented in the frozen input report. The timestamp-supported candidate5 worsened differences to1506. The missing input is an artifact-linked original build record with source/lock/features and full Cargo/rustc invocation metadata. No source semantic correction or new path/flag/version experiment follows from the current evidence.

## Metaplex — exactly one raw-differing function window

Captured payload SHA256 `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`; candidate11 raw ELF SHA256 `3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec`. The raw candidate is707448 bytes; the captured payload adds86543 zero-allocation bytes. The raw-prefix comparison remains1509 different positions.

All1251 inferred windows have the same addresses and extents;1250 are raw-byte identical. **Utilize ordinal346 occupies236632–241736 (5104 bytes)** in both files and contains all1477 differing text bytes. The complete direct calls, relocation references and every conditional/unconditional branch's raw displacement and absolute target are recorded. Source patch input is the accepted eighteen-file candidate11 correction on public17e994; no new variant was prepared.

The first changed branch block has the same visible bounds predicate but a different branch arrangement:

| Branch PC | Original instruction / target | Candidate instruction / target |
| --- | --- | --- |
| 238800 | `r9 == 0`, +4 →238840 | `r9 == 0`, +22 →238984 |
| 238816 | `r9 > r1`, +2 →238840 | `r9 > r1`, +20 →238984 |
| 238832 | `r7 >= r9`, +7 →238896 | `r9 > r7`, +18 →238984 |

The final pair is an unsigned complement with fallthrough/branch roles exchanged. This local observation does not establish whole-function equivalence, complete error precedence or all state/CPI behavior. The previously corrected zero-use rejection is present in both; its original omission was a real source error, not a redundant guard. Earlier candidate10 diagnostic errors remain preserved outside this inventory. A new source spelling or compiler setting is not justified merely to force the branch layout.

The remaining30 `.data.rel.ro` byte differences occupy29 decoded Rust source-coordinate records, preserved and independently decoded by the verifier. The other two differing bytes are relocation-table entries: the last two Utilize pointer references move from function-relative offsets4376/4416 to4352/4392. Thus all source-coordinate and relocation differences are explicitly accounted for, not normalized away in the file-equality result. Original source text/line provenance remains incomplete; padding source lines is not a recovery correction.

The accepted135 runtime cases are historical evidence only; this pass ran none. They do not exercise the corrected zero-use boundaries. No extra runtime fixture or previously stopped probe is proposed.

## Donation relay — source missing across492 inferred windows

Captured830448-byte ELF SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`; `.text` is288–752776. The492 inferred windows cover that entire text extent, and all remain without attributable source or a source-built comparison. The only exported function names are entrypoint at566024 (448 bytes) and custom_panic at567192 (200 bytes); these names do not establish an original source revision. There is no meaningful per-function mismatch count against a nonexistent candidate.

The captured IDL advertises11 instructions. Every previously saved discriminator constant and compare/branch destination was independently revalidated from raw bytes. Each dispatch branch invokes its associated generated wrapper at branch+80. The direct callees below are instruction-associated wrapper ranges; they are not claimed to be the source handler body or a recovered implementation.

| IDL instruction | Matched dispatch branch | Direct callee range |
| --- | --- | --- |
| donate_v1 | 516216 | 529520–532048 |
| donate_pubkey_config_id_v1 | 516328 | 532048–534576 |
| donate_native_v1 | 516440 | 534576–537080 |
| donate_native_pubkey_config_id_v1 | 516552 | 537080–539584 |
| donate_pubkey_config_id_with_payer_v1 | 516664 | 539584–542112 |
| close_donation_epoch_v1 | 516776 | 542112–544128 |
| swap_then_distribute_v1 | 516888 | 544128–545792 |
| just_swap_v1 | 517000 | 545792–547224 |
| distribute_after_just_swapping_v1 | 517112 | 547224–549192 |
| distribute_non_swap_output_mint_v1 | 517224 | 549192–551160 |
| upsert_mint_whitelist_v1 | 517336 | 551160–552048 |

The embedded source URL points to CherryDevelopmentOrg/daas. Retained official Donate.gg documentation associates the captured program, but the bounded repository, release, relocation, Software Heritage, Wayback and public audit catalog checks did not recover an artifact-linked source commit or build recipe. These are dated public-access observations, not proof no source history or audit existed. No new queries were made here.

The useful next evidence would be a publisher-owned relocation or release/build manifest binding the captured artifact to a source revision, dependency lock and toolchain. The IDL and exact dispatch addresses narrow where recovery would start if such source becomes available; they do not justify inventing or building a substitute implementation.

## Reproduction and limits

Run `python3 work/dependency-function-gap-inventory/verify.py`. It checks the immutable seal, five referenced ELF hashes, all1902 inferred windows, ATA instruction/address/relocation correspondence, Metaplex's29 exact source-coordinate records and all11 relay dispatch targets. `analyze.py` documents the derivation; it only writes this scratch inventory. The original published evidence and candidates remain unchanged.

The inventory is exhaustive over this explicitly defined entry-detection method, not over independently known logical source functions or arbitrary dynamic control flow. There are zero new handlers, source builds or test receipts. SPL Token and Token2022 are already recorded as independently source-rebuilt exact matches and are outside the remaining-function gap set.
