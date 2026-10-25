# Independent reconciliation of commit 347aec7 dependency claims

The raw counts are corroborated. The proposed Utilize edit is a natural, source-level redundant-check removal, but **is not demonstrated to recover historical source or close 1,479 bytes**. No new correction is selected. The ATA claims that all differences are in `custom_panic` and that Solana 1.10.33 requires an earlier bpf-tools than v1.27 are contradicted by the retained artifacts. Neither dependency is byte-identical to its captured original.

This static-only review read the complete original and candidate Utilize bodies, checked every assembly byte against the actual ELFs, inspected the captured candidate source and processor module, and recomputed the preceding pass's byte, window, archive and diagnostic findings. No compiler, target program, runtime probe, network, or build was used. Original and candidate artifacts remain unchanged. Excluded lanes were not opened. No main-tree writes occurred.

## Claim dispositions

| New C-dependencies claim | Independent disposition |
| --- | --- |
| Metaplex has 1,509 differing positions: 1,477 text, 30 diagnostic data, two relocation | Corroborated for the capture-sized candidate. Raw candidate ELF additionally lacks the captured 86,543-byte zero tail. |
| Utilize has 626 instructions in 5,104 bytes; masked instruction multisets differ by one JGE/JGT | Corroborated, with precisely stated masking. A multiset discards instruction order, branch destinations and actual callees. |
| Remaining differences reflect block scheduling, branch polarity and relative displacements | Stronger local support obtained here: full labeled control-flow correspondence covering all 580 non-unconditional-jump instructions per side, with actual direct targets retained. Referenced diagnostic data still differ. |
| Therefore historical source omitted the remaining-bound disjunct | Unproved. Corresponding compiled computation does not uniquely invert to Rust spelling, optimization history, or compiler identity. |
| Guard removal closes 1,479 bytes | Unproved prediction. No binary for the proposed source exists in these inputs. Do not count these bytes as closed. |
| Rust 1.69 generated the target code | Incorrect attribution of the recorded tool identities: host 1.69.0, selected target rustc 1.68.0-dev / LLVM 15.0.7. |
| All Metaplex diagnostic columns match | False: the retained conversion tuple has original 60:30, candidate 57:10. Utilize itself is 85:39 versus 81:39. |
| Remaining diagnostic differences are unreachable without whitespace fabrication | Unproved. Authentic missing historical source could explain them naturally; current evidence does not identify it. No padding is warranted. |
| ATA has 307 differences: 304 text, three relocation | Corroborated. |
| All ATA text differences belong to the single custom_panic function | False against the actual symbol extent and six-window inventory. Zero differing text bytes lie inside that symbol. |
| Candidate v1.27 differs from Solana 1.10.33's earlier bpf-tools | Contradicted: captured v1.10.33 SDK build-bpf.rs line 730 explicitly selects v1.27. Original uploader execution remains unauthenticated. |
| Best ATA source is proven historical source because it is closest | Unproved. Body/address correspondence and a small byte score do not recover original source, lock, metadata, or upload-linked recipe. |

## Exact artifact identity and accounting

| Artifact | SHA-256 | Bytes |
| --- | --- | ---: |
| Metaplex original | 31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011 | 793991 |
| Metaplex candidate 11 raw ELF | 3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec | 707448 |
| Existing capture-sized candidate | 2c26e081f3faabf00592a9615fdb19d0115ff1c0ded5acf29548e214704d5283 | 793991 |
| ATA original | 6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d | 105032 |
| ATA best candidate 2/4 | ba8dd8a42ca7bff4b668c72e1b5614e9363b271924d520253f5724760ba2d65b | 105032 |

For Metaplex the common ELF extent differs at 1,509 positions; including absent raw-ELF tail positions gives 88,052. The already-existing capture-sized candidate differs at 1,509. The zero tail is inspected, never generated. All 1,251 inferred windows are rehashed: 1,250 raw paired windows equal; Utilize [236632,241736) does not. Windows remain inferred, not authenticated historical function boundaries. The preceding full inventories retain 460 ambiguous normalized matches per side and 81 unresolved indirect calls per side.

ATA's five candidate failures remain 1,199 / 307 / 1,506 / 307 / 1,506; candidates 2=4 and 3=5. No historical failure is replaced by this verifier's success.

## Utilize: actual control flow and failure order

All offsets below are decimal file offsets, equal to virtual addresses in these text sections. Old dump decimal slots multiplied by eight give actual offsets. The dump's `.text+...` annotations are not trusted as absolute destinations.

The entry moves input r5 into r9. The unchanged prefix parses eight accounts, conditionally consumes Rent and selects the delegated-account-count branch; deserializes metadata; checks use availability, token standard, token-program identity, signer and current holding; and deserializes metadata again. Candidate source lines 35–81 express these checks. Their failures precede the new-report guard site. The Option unwrap helper call at 238792 targets 17088, before the numeric guard, and receives diagnostic pointer 652112.

| Operation | Original | Candidate 11 |
| --- | --- | --- |
| n == 0 | 238800 → 238840 on true | 238800 → 238984 on true |
| load total | 238808 from stack -0xb0 | identical |
| n > total | 238816 → 238840 on true | 238816 → 238984 on true |
| load remaining | 238824 from stack -0xb8 | identical |
| remaining bound | 238832: unsigned r7 >= r9 → 238896 success; false falls to 238840 error | 238832: unsigned r9 > r7 → 238984 error; false falls to 238840 success |
| error 86 load | 238840, encoded 86 << 32 | 238984, same encoding |
| remaining - n | 238936 | 238880 |
| delegated allowed_uses bound | 239880: n > allowance → 239896 error | 239856: n > allowance → 239872 error |
| allowance - n | 239920 | 239896 |

The first subtraction executes only after zero/total/remaining admission, before delegated-record parsing or owner-key rejection. On the nondelegated path the key comparison calls target 11480 (original site 238992, candidate 238936); rejection is encoded error 98. On the delegated path the next account, mutable borrow, data-length validation, ownership, canonical PDA derivation, record decoding, bump migration/check precede the second checked subtraction. An empty/invalid record can therefore fail before allowance underflow; global remaining underflow fails before reaching any of those checks.

The delegated record is serialized only after successful allowance subtraction (target 28200, sites 239976/239952). Metadata mutable borrow and save follow authority admission (save target 273992, sites 240192/240168). Exhausted Burn handling follows save. The original tests use-method zero and r7 == r9; because prior admission establishes remaining >= n, that equality means remaining-n == 0. The delegated burner path then consumes/validates the burner and constructs seeds; the owner path uses owner authority. Both burn calls target 485296 (original 240720/241448, candidate 240696/241424). Failures propagate through explicit cleanup blocks. This is source/body correspondence, not new execution evidence.

The original error path calls cleanup target 12448 at 238880 then jumps to outer cleanup at 237920; the candidate shares the same cleanup call at 241576, then reaches the same outer cleanup. Physical instruction order alone would incorrectly suggest different failure work. Both direct target windows are raw-equal; dynamic allocator outcomes and externally supplied state are not certified.

### Stronger check than the multiset

`facts.json` retains all 626 decoded instructions per side, their raw bytes, branch successors, operands and actual direct-call destinations. The decoder handles 16-byte LDDW records, so these represent 638 eight-byte slots rather than 626 slots. It checks every instruction against the full retained original/candidate assembly dumps.

The report's mask zeroes branch offsets and call immediates. Under that mask only `3d97000000000000` versus `2d79000000000000` differs in the unordered multisets. This alone proves neither path correspondence nor source identity.

The new verifier additionally traverses the two labeled instruction graphs from their entries. It follows unconditional jumps without counting them as computation, retains all other operands and actual direct-call targets, and swaps the true/false successors only at the complementary unsigned comparison at 238832. Every one of the 580 non-unconditional-jump instructions on each side is covered, with no label or successor mismatch. The 46 unconditional jumps per side remain present in the full decode. No source or binary is rewritten to obtain this result.

This establishes a local compiled control-flow correspondence under those explicitly stated transformations. It is stronger than an unordered histogram and explains the moved cleanup/success paths. It does not establish equal instruction counts along paths, compute consumption, whole bytes, historical source, transitive data equality, or exhaustive runtime behavior. Equality of labels includes pointer values, not the bytes behind them.

All 51 direct calls reach 21 actual target windows whose entire bodies are raw-equal. The ordered call-site lists differ, while the target multiset agrees; graph correspondence places them on corresponding computational paths. Full hashes and site lists are in `facts.json`. It does not recursively prove those helpers' external or indirect behavior.

The fixed-address Token-program key bytes [629320,629352), Burn literal [631104,631108), and prefix [631312,631320) agree. Those bounds correspond to the Pubkey and source seed lengths, not an assumed complete allocation. The two moved relocation sites 241008→240984 and 241048→241024 load the unchanged Burn/prefix addresses. Their ordered records differ by two raw bytes. The unchanged unwrap pointer instead references an unequal 24-byte diagnostic tuple [652112,652136): same filename and column, original line 85 versus candidate 81. All 29 changed diagnostic tuples and all 30 changed bytes are independently rederived by the preserved analyzer. Thus even the stronger local CFG result cannot certify full call/data identity.

## The proposed one-file edit

The exact source under review is the captured patched member:

`programs/token-metadata/program/src/processor/uses/utilize.rs`

The source/module relationship is retained in the captured `programs/token-metadata/program/src/processor/mod.rs`: `mod uses;` at line 13, `pub use uses::*;` at 33, and the Utilize dispatcher at 277–279. The diagnostic spelling `program/src/processor/uses/utilize.rs` is the embedded build-relative filename; it is not a different source file. The two changed module members are included as complete text in `facts.json`, and all 18 changed source members remain in the immutable source archive.

External proposal hashes, verified here:

- Old candidate file: `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7`.
- Proposed file: `c52a5f72d8012a7d6d4bffb3cb1b09eb237361b12da7b42672b0235e40b2b773`.

The candidate file equals both the pass-02 captured source and candidate-11 manifest-bound archive member. The proposed file differs only by replacing the four-line three-disjunct guard with the one-line zero/total guard. Both retain the following `.remaining.checked_sub(number_of_uses).ok_or(MetadataError::NotEnoughUses)?` and the later delegated checked subtraction.

For ordinary Rust u64 source semantics, this edit preserves error precedence: zero and over-total still fail first; over-remaining now returns the same NotEnoughUses from checked_sub before any intervening effect or metadata update. If n <= remaining, the same difference is assigned. This argument does not require sampling and does not introduce a runtime fixture. It is a reasonable redundant-check simplification, but the current candidate already expresses the observed constraints. There is no demonstrated behavioral defect requiring it.

The original compare can equally express an explicit remaining guard or the checked_sub lowering after optimization. The local CFG relation cannot tell which source spelling generated it. The proposal is preserved under `claims/` as reviewed evidence, **not promoted to an accepted patch or build request**. No prediction of 1,479 closed bytes is accepted.

Also, the only Utilize diagnostic point refers to `metadata.uses.unwrap()` before the edited guard. Removing lines after that point cannot naturally fix its 85:39 versus 81:39 mismatch. The other 28 diagnostic records belong to other files/locations. Their mismatch is not evidence that arbitrary whitespace or module declarations should be added.

## ATA: the named function claim fails directly

The actual `.dynsym` entry for `custom_panic` is value 23032 (0x59f8), size 280, extent [23032,23312). **None** of the 304 differing text bytes falls inside this extent. A stripped disassembler's nearest preceding symbol label is not a function boundary.

| Original inferred extent | Candidate corresponding extent | Same-position changed bytes |
| --- | --- | ---: |
| 28592–29032 | 28944–29384 | 181 |
| 29032–29384 | 28592–28944 | 101 |
| 29704–31160 | same | 9 |
| 34296–34840 | same | 2 |
| 35936–37968 | same | 5 |
| 37968–40512 | same | 6 |

The first two are moved 440/352-byte helper windows. The retained candidate-5 `libspl_token_2022.rlib` contains matching `reserve_for_push` specializations, also present in the unstripped linked ELF. The linked pair equals candidate 2's pair raw. Seven allocated section payloads already agree between retained stripped and unstripped candidate 5, so stripping is not the demonstrated origin of that pair order. Original stripped bytes do not authenticate original mangled identities or archive ownership.

All 159 inferred windows and their hashes remain checked; 153 are raw-equal at mapped placements, all 159 match under the prior normalization. Independently recomputed mapping checks cover all 581 internal direct-call destinations and all 1,638 static branch destinations. Three relocation bytes concern two ordered abort records, sites 28968→28880 and 29024→28936. These and the changed call displacements are mechanically explained by address mapping. The actual historical cause of the order is not recovered. Thirty-nine ambiguous normalized windows and 35 unresolved indirect calls remain open; no unlimited claim that all application behavior is proved follows.

The retained `inputs/ata/ata-candidate-recipe-4/build-bpf.rs` is captured from SDK tag v1.10.33 and explicitly says `let bpf_tools_version = "v1.27";` at line 730. The report's claimed mismatch of those version names is therefore invalid. This does not authenticate what the uploader actually ran. Release metadata, build source, candidate tools, and an upload-linked original build are distinct evidence levels. The preserved candidate-2 log excerpts already name Solana 1.10.33, while its tool record names v1.27. No toolchain substitution or source edit is selected.

## Frozen recipe references and acceptance boundary

The immutable Metaplex `prior/inputs/metaplex/build11/{comparison.json,build-script.py,tool-versions.json,source-manifest.json,patch-source-inputs.json}` and `prior/build-log-excerpts.json` remain authoritative candidate records. The script is data only and was not executed. Candidate 11 uses public baseline `17e99434af5ead3e989c08f32af33609821d0bc0`, the recorded 18-file patch, lock SHA-256 `64bb1d34591c281ead97a070ef304be3f8d290a2f4c47d7c367acf51a20fc730`, and image digest `43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467`. Its recorded cargo build-sbf command retains sparse configuration, --locked and the same manifest, without adding tools-version. Selected platform-tools v1.37 rustc is 1.68.0-dev, digest `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`; host 1.69.0 is distinct. No changed recipe is supplied.

ATA's candidate-2 comparison/tool/source records are likewise unchanged: source f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca; lock 3c8f402f40488908503e9cc088388c1f95848d79da5141b5cb1a14006d74428b; image ee9ad7809009a99a70f659f7cba959e0c3c124e10f771b524914fd42f2b605a8; recorded build-bpf command; host 1.59.0 and target 1.59.0-dev / LLVM 13, v1.27. Candidate 4's warnings flag already yielded candidate 2's exact bytes. These records do not establish the original historical recipe.

The preceding reports retain 135 finite Metaplex comparisons, with fourteen distinct saved Utilize cases all requesting one use. This package does not replay or republish their runtime cases, transfer acceptance to the unbuilt proposal, or close zero-use/exhaustive behavior. The standalone check rederives static evidence only. Core acceptance remains 0/4 whole-original equality and the completion guidance's 140/150 bounded implementations; this review adds neither handlers nor runtime cases.

## Portable package and verification

Run `python3 -B verify.py` from any copy, or use its absolute path. It requires only Python's standard library, reads only package-local files and writes nothing. It validates an exact allowlist, hashes, owned map, input map, retained manifest bindings, the preceding complete static derivation, fresh full-body/CFG facts and ATA symbol/mapped branch/call findings. It rejects optimization mode because derivations use assertions. It never executes retained build scripts or binaries.

`input-map.json` identifies every copied public source/evidence input by repository-relative path, package path, size, SHA-256 and calculated Git blob SHA-1. The C-dependencies files were additionally compared to their exact Git blobs at 347aec7b953a49ad21aa481e29174ec8a2215029 during packaging. Other inputs are the fixed copies named in that map, not claimed to originate at 347aec7. Historical nested manifests remain verbatim.

One previous pass-02 manifest entry names a Python cache file. That cache payload is deliberately excluded; the unchanged historical manifest still records it. The verifier checks all other prior-manifest payloads and explicitly reports the excluded cache. It does not claim to run the old package's exact-file verifier or repair that seal. No CLI events, process logs, credentials, keypairs or cache payloads are published.

`ownedmap.json` covers every package file including the seal and itself; `manifest.json` hashes all payload files, including the owned map; `manifest.sha256` seals the manifest. These are local integrity checks, not historical signatures. The separate-copy verification receipt is outside the package to avoid a self-referential seal. Only `publication/`, its explicit-file archive and that receipt are deliverables. The surrounding CLI worker directory is not an export source.
