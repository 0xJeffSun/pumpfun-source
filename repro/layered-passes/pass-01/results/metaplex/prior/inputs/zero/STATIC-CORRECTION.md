# Metaplex candidate10: final three static windows

Candidate10 has a **known behavioral mismatch**: both original use handlers reject a requested use count of zero with `MetadataError::NotEnoughUses` (86), while candidate10 permits zero past that guard. The earlier static mapping incorrectly read these branch targets as success continuations. Its conclusions at lines 98 and 104 are superseded here; the old report is retained unchanged as `prior-mapping.unmodified.md` and is hash-bound in `exact-evidence.json`.

One coherent behavioral source correction is justified across the two use handlers: reject zero using `n == 0 || ...`, at the existing guard positions. A separate, directly evidenced evaluation-order difference remains in the inlined edition-conversion branch: original reads the account data length before serialization; candidate10 reads it afterward. Moving the existing length-read statement before the writer reconstructs that order, but no runtime failure for ordinary valid state has been established for this difference. Register allocation and error-block movement are not additional source fixes.

This is read-only static analysis. No program source was edited, no build or runtime fixture was run, and no executable bytes were changed. Existing 135 runtime regressions do not cover these use-count boundaries; this report does not add runtime coverage or claim exact historical source recovery.

## Bound inputs and method

| Input | Bytes | SHA-256 |
|---|---:|---|
| Original `evidence/dependencies/token_metadata/deployed.so` | 793991 | `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011` |
| Candidate10 `work/metaplex-recovered-build-40157158772/metaplex-rebuild-40157158772/token_metadata.so` | 707496 | `13b529d692608f1a4f6ebaa3b6819d9d1056315032c2e40f1e51cdde9b3ebb22` |

The original and candidate have 1251 inferred instruction windows. Independently rerunning the retained ELF reader's in-memory address normalization, relocation-pattern and direct-call matching confirms 1248 matches and exactly three unmatched ordinals: 344, 346, 350. This metric is not a semantic or whole-file equality proof. The three sizes are 3776/3784, 5104/5152 and 20088/20088 bytes respectively.

All six parent-provided raw disassembly extracts were checked instruction-by-instruction against the actual ELF bytes, including every 16-byte `lddw`. Annotated dumps preserve raw addresses, call-window ordinals and **decoded absolute branch targets**. The `diff-*.txt` files intentionally erase addresses/displacements only to assist alignment and must not be used alone to infer control flow. LLVM's `<.text+...>` label is a section-relative label; the annotated `branch` field is the computed file/virtual byte address. For each jump, the target is `instruction_address + 8 + signed_i16_displacement * 8`.

Public source revision `17e99434af5ead3e989c08f32af33609821d0bc0` was read through `git show`, without changing its checkout. Seven public source snapshots and seven candidate snapshots were checked against candidate10's upstream and built-source manifests. Candidate snapshots came from the existing trial source, with unchanged public files used where no trial file exists. The retained candidate manifest, patch, upstream manifest, patch-input manifest, tool versions and comparison are hash-bound in `inputs.json`. The toolchain is recorded there through its existing build artifact; no new toolchain or optimizer experiment was attempted.

## 344: approve use authority

Function: `processor/uses/approve_use_authority.rs::process_approve_use_authority`. Both windows start at `0x38240`. The original and candidate share all 36 direct calls in the same order; the 8-byte size difference is one extra unconditional branch after accounting for relocated blocks.

**Argument and field dataflow.** Entry `0x38240` copies the fifth argument `r5` (number of uses) into `r7`. At `0x38328`, it is saved at `r10-0x4f8`; `0x38ac8` restores it to `r2` immediately before the guard. Metadata uses are unwrapped by unchanged helper96 at `0x386f8`, with output at `r10-0x140`. The public `#[repr(C)] Uses` layout is a use-method enum at offset0, remaining u64 at offset8, total u64 at offset16. Consequently `r10-0x138` is remaining; `r10-0x140` is use method. This matches the later burn-method test and record `allowed_uses` write.

| Side / instruction | Raw 8 bytes | Decoded edge |
|---|---|---|
| Original `0x38ad0`: `if r2 == 0` | `15 02 35 00 00 00 00 00` | displacement +53 → `0x38c80`, error86 |
| Original `0x38ae0`: `if r2 > r1` | `2d 12 33 00 00 00 00 00` | displacement +51 → `0x38c80`, error86 |
| Candidate `0x38ad0`: `if r2 == 0` | `15 02 0f 00 00 00 00 00` | displacement +15 → `0x38b50`, use-method continuation |
| Candidate `0x38ae0`: `if r2 > r1` | `2d 12 01 00 00 00 00 00` | displacement +1 → `0x38af0`, error86 |

Original `0x38c80` and candidate `0x38af0` both load `0x5600000000`, the custom ProgramError representation for error86, and jump to the shared return path at `0x38418`. The original zero branch therefore rejects; it does not bypass the remaining-use comparison to success. Candidate zero branches directly into the use-method path and can reach record writing or burner approval, subject to subsequent checks.

The original guard is `n == 0 || n > remaining`. The current candidate source at line93 is `n > 0 && n > remaining`, which is equivalent to `n > remaining` over unsigned counts and allows zero. **Supported correction:** replace only that predicate with `number_of_uses == 0 || number_of_uses > metadata_uses.remaining`. Keep it after `create_or_allocate_account_raw` and before the burn-method branch, matching the original order and preserving all earlier validations/CPI behavior.

The allocation-error copy block moves from original `0x38c38–0x38c78` to candidate `0x38b08–0x38b48`; the error86 block also moves. The rest of the diff consists of these block placements and corresponding branches. These movements do not erase the differing zero-edge destination and are not themselves additional behavioral fixes.

## 346: utilize

Function: `processor/uses/utilize.rs::process_utilize`. Original starts `0x39c58`; candidate starts `0x39c60`. Both contain the same 51 direct calls, with cleanup helper59 appearing at a different linear position.

**Argument and field dataflow.** Original entry `0x39c58` stores the fifth argument `r5` directly in `r9`; this remains the number of uses at the guard. Helper96 at `0x3a4c8` unwraps Uses to `r10-0xc0`: method at `-0xc0`, remaining at `-0xb8`, total at `-0xb0`. Original `0x3a4d8` loads total into `r1`; `0x3a4e8` loads remaining into `r7`. On successful comparison, subtraction at `0x3a550–0x3a560` computes `remaining - n`. The candidate uses the same fields and unsigned comparisons.

| Side / instruction | Raw 8 bytes | Decoded edge |
|---|---|---|
| Original `0x3a4d0`: `if r9 == 0` | `15 09 04 00 00 00 00 00` | displacement +4 → `0x3a4f8`, error86 |
| Original `0x3a4e0`: `if r9 > r1` | `2d 19 02 00 00 00 00 00` | displacement +2 → `0x3a4f8`, error86 |
| Original `0x3a4f0`: `if r7 >= r9` | `3d 97 07 00 00 00 00 00` | displacement +7 → `0x3a530`, success; otherwise falls into error86 |
| Candidate `0x3a4e8`: `if r9 == 0` | `15 09 0a 00 00 00 00 00` | displacement +10 → `0x3a540`, loads remaining |
| Candidate `0x3a548`: unconditional | `05 00 f8 ff 00 00 00 00` | displacement −8 → `0x3a510`, subtraction-overflow guard |
| Candidate `0x3a510`: `if r9 > r7` | `2d 79 01 00 00 00 00 00` | displacement +1 → `0x3a520`, error86; zero falls through |

Candidate zero travels `0x3a4e8 → 0x3a540 → 0x3a510 → 0x3a518 → 0x3a550`; because remaining is unsigned, `0 > remaining` is false. It therefore continues to metadata rewriting and later authority/record/burn logic, subject to later checks. Original zero goes directly to the error86 load at `0x3a4f8`, stores the result at `0x3a508`, invokes cleanup59 at `0x3a520`, then exits through `0x3a160`.

The original effective predicate is `n == 0 || n > total || n > remaining`. Candidate source lines83–85 use `n > 0 && (n > total || n > remaining)`, followed by checked subtraction. **Supported correction:** reject zero with `number_of_uses == 0 || number_of_uses > metadata_uses.total || number_of_uses > metadata_uses.remaining`. Retain this check before the existing checked subtraction, without changing authorization, account, owner, PDA, burner, serialization or error handling.

Candidate's repeated `if r9 > r7` at `0x3a508` and `0x3a510` represents the explicit range guard and the checked-subtraction underflow path merged with the zero branch. It is redundant on an already successful positive-count path, but the zero branch itself is **not** semantically redundant relative to the original. Candidate also hoists method storage to `0x3a4d8–0x3a4e0`, reloads total/method at `0x3a550–0x3a568`, and shares cleanup59 at `0x3afd0–0x3afe0`. These are compiler dataflow/cleanup placement effects around the changed predicate, not evidence for further checks.

## 350: dispatcher, inlined V1-to-V2 edition conversion

Original starts `0x3cce8`; candidate starts `0x3cd20`, each 20088 bytes. Both contain the same 193 direct calls. The entire direct-call sequence difference is helper980 moving from before the first mutable borrow to after successful serialization. The prior master-edition system-program comparison is now present in both; the remaining difference is in the neighboring **convert master edition V1 to V2** arm, not the create-master-edition arm.

| Operation | Original | Candidate10 |
|---|---|---|
| Read `master_edition_info.data_len()` (helper980) | `0x40f08` | `0x41060` |
| First `try_borrow_mut_data()` (helper986) | `0x40f30` | `0x40f48` |
| Serialize MasterEditionV2 (helper166) | `0x40fc0` | `0x40fd8` |
| Release first mutable borrow | `0x41020–0x41030` | `0x41038–0x41048` |
| Second `try_borrow_mut_data()` (helper986) | `0x41050` | `0x41088` |
| Clear byte at original length−2 | `0x410d0` | `0x41108` |
| Clear byte at original length−1 | `0x41108` | `0x41140` |

Helper980 reads AccountInfo's data RefCell, obtains an immutable borrow, returns the slice length, then releases that borrow. Helper986 requires borrow state zero, marks a mutable borrow and returns the data slice or ProgramError borrow failure. Helper166 is the retained MasterEditionV2 serializer wrapper. The five helper windows retained in this package, including these three, match their original normalized bodies. Their role is supported by instruction dataflow and the source call sites; no debug names are assumed.

The current source `processor/edition/convert_master_edition_v1_to_v2.rs` has the new `let data_len = master_edition_info.data_len();` at line55, after the writer at lines46–53. Original calls it immediately before the first writer borrow. **Grounded evaluation-order reconstruction:** move that existing statement immediately before `borsh::to_writer`, leaving both mutable borrows, their scopes, and both clearing writes intact. Do not replace it with a different length expression or merge borrows.

Original retains the length in `r7` across serialization and uses `r6` for the account/borrow flag. Candidate first uses `r6` for the borrow flag, then keeps the account pointer in `r7` and the later length in `r6`; this explains the changed register operands in subsequent bounds checks, offsets and panic blocks. No register-directed source edit is justified.

Serialization does not resize this slice, so no normal successful-state difference is established from the later read. Borrow/panic ordering can in principle be observable, and the instructions differ, so this analysis does not claim universal semantic equivalence. No conflicting-borrow fixture, new failure experiment or runtime probe was created. This ordering adjustment is distinct from the proven zero-use correction above and does not prove eventual compiled identity.

## Handoff and limitations

The strongest immediate correction is the zero-use rejection shared by approve and utilize. Candidate10 should remain labeled as statically mismatched even if its existing 135 regressions pass. The data-length move is supported as source evaluation-order recovery; whether a subsequent compiler produces identical register/block choices is untested. No arbitrary source padding, optimizer flag search, compiler variant matrix, binary patch, relocation edit or source syntax guessing is supported.

`inputs.json` binds ELF/source/build inputs. `windows.json` binds sizes, hashes and calls. `exact-evidence.json` retains all 18 decoded branches, four error loads, matching helper hashes, and the exact old incorrect claims. Full raw/annotated dumps and JSON instruction records remain available for independent review. `manifest.json` closes the diagnostic files, excluding itself. Original/candidate byte hashes and the built-source snapshot hashes were rechecked when finalizing this package.
