# Metaplex Utilize: retained-evidence static review

Candidate 11 already implements the supported zero-use correction. This review identifies **no further justified source correction**. The remaining Utilize body differs in branch/block and cleanup placement. Equal predicates and direct-call multisets do not establish complete semantic equivalence or authentic historical source. Whole-byte reconstruction remains incomplete.

This assignment used existing local evidence only. No build, runtime probe, network request, transaction execution, signer changes, executable patch, source padding, or parent-repository write occurred. The aborted extra runtime lane was not resumed. `inputs/` preserves byte-for-byte copies of the reviewed material. `result.json` and `complete-body-decode.json` are machine-readable evidence; all ranges below are half-open **file byte offsets**, unless explicitly labeled source lines.

## Baseline and complete-body bounds

The supplied core publication checkpoint is `8099031` (Pump 92575cd, Fees e501ca2, AMM 5a68db, Mayhem 9e4e19). This review concerns retained **Metaplex candidate 11**, not a newly compiled candidate. The cross-program dependency inventory is a prior baseline and does not certify later Pump/Fees candidates.

| Artifact | Bytes | SHA-256 |
|---|---:|---|
| Captured original, `inputs/original.so` | 793991 | `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011` |
| Candidate 11 ELF | 707448 | `3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec` |
| Candidate plus retained allocation tail | 793991 | `2c26e081f3faabf00592a9615fdb19d0115ff1c0ded5acf29548e214704d5283` |
| Complete original window, `original-utilize.bin` | 5104 | `0b57c8b38b3b6395fe223e99d29c48258f481d496491cb13b7abe065a49fb70d` |
| Complete candidate window, `candidate11-utilize.bin` | 5104 | `e4c0a6ac6741fdcdafb381eeff0f1626bf9a0ae8f650c8b44beb1176c69ca4d5` |

The retained ordinal-346 window is `[236632,241736)` in both files. It has 638 eight-byte slots, decoded as 626 instructions (wide immediate loads consume two slots), 51 direct calls and 91 branch instructions in each. Every instruction and raw byte is retained, including all branch targets computed from signed displacements. The direct-call target multisets match; their position/order differs. This is **complete entry-bounded window evidence**, not a recovered debug-symbol boundary or proof of a complete historical source function.

Independent raw-call anchors support the bounds: a call at file offset 259704 targets 236632, while calls at 243296 and 246432 target the next entry 241736, identically in both binaries. Prior attribution to Utilize also uses dispatcher/source analysis and diagnostic records; window correspondence alone does not prove identity.

There are 1,509 differing positions overall: 1,477 in `.text` `[288,628328)`, all within the Utilize range; 30 in `.data.rel.ro` `[649384,662136)`; and two in `.rel.dyn` `[662816,706800)`. The first differing position is 238802. The recorded inventory's other 1,250 of 1,251 inferred windows remain raw equal. This verifier independently establishes confinement of every text difference, rather than claiming a new historical function census. Original and rebuilt allocation tails `[707448,793991)` are exactly 86,543 zeros. Every differing run appears in `result.json`.

## Exact retained source semantics

`utilize.rs` is copied from the retained source archive and bound to candidate 11's source manifest: SHA-256 `9ce4753676e73e6565b957d86eecf113ce16cade3f782d849e2f7a97b640bed7`. These are **candidate source semantics**, not a claim that the historical source spelling is recovered:

- Lines 35–54 consume eight required accounts, optionally consume Rent, and select delegated-use handling by exact account count (11 with Rent, 10 without).
- Lines 56–79 parse metadata; reject absent Uses; admit the four named nonfungible standards; require the SPL Token program, user signature, and the existing holding assertion. Earlier dispatcher rejection can precede these checks.
- Lines 80–97 reparse metadata, unwrap Uses, retain the Burn method flag, reject `n == 0 || n > total || n > remaining` with NotEnoughUses, perform checked subtraction and update the Uses value.
- Lines 98–122 preserve delegated record borrow/validation, program ownership, PDA derivation, bump migration/validation, checked allowed-use subtraction and serialization; the nondelegated path requires user and owner keys to match.
- Lines 123–151 save metadata, then burn one token only when remaining uses become zero and the method is Burn. The delegated branch validates burner derivation and supplies signer seeds; the owner branch supplies none.

The raw guard is directly confirmed on both sides:

| Check at file offset | Original | Candidate 11 |
|---|---|---|
| `0x3a4d0`: `r9 == 0` | branch to `0x3a4f8` | branch to `0x3a588` |
| `0x3a4e0`: `r9 > r1` (total) | branch to `0x3a4f8` | branch to `0x3a588` |
| `0x3a4f0`: remaining bound | `r7 >= r9` branches to `0x3a530`; otherwise error | `r9 > r7` branches to `0x3a588`; otherwise success |

Both error destinations load `0x5600000000` (custom error 86). Original emits error storage and cleanup before the successful subtraction block; candidate places successful work first and routes error handling into a shared cleanup path. Branch labels printed in old disassembly are not used as absolute file targets. The former candidate-10 claim that zero bypasses rejection was already corrected in retained `STATIC-CORRECTION.md`; it is not a new result of this assignment.

## Source coordinates and relocation accounting

The verifier independently decodes all 29 differing source-location records and covers every one of the 30 changed `.data.rel.ro` bytes with their line/column fields. File pointers and lengths are equal. Utilize's record is `[652112,652136)`, with coordinate fields `[652128,652136)`: original `program/src/processor/uses/utilize.rs:85:39`, candidate `:81:39`. The candidate line is the retained Uses unwrap. These differences remain observable diagnostic/source provenance gaps; formatting reconstruction or padding is not justified. Full per-file ranges are in `result.json.source_locations`.

The two changed relocation records are now individually accounted for:

| `.rel.dyn` record range | Original relocation site | Candidate site | Equal loaded address |
|---|---:|---:|---:|
| `[671616,671632)` | 241008 (`0x3ad70`) | 240984 (`0x3ad58`) | 631104 (`0x9a140`) |
| `[671632,671648)` | 241048 (`0x3ad98`) | 241024 (`0x3ad80`) | 631312 (`0x9a210`) |

Both retain relocation info/type 8 and byte-identical 16-byte address-load instructions; each site moves 24 bytes earlier. The changed bytes are the first bytes of the respective records. This accounts for relocation-site movement around the differing body; it does not authorize rewriting relocation records or establish equivalence of surrounding control flow.

## What the 135 retained receipts actually cover

The five gzip reports bind original/candidate hashes and contain 135 cases / 270 transaction records with no reported mismatches. This review parses the existing serialized legacy transactions directly, without executing them or regenerating signatures. The prior package reports independent signature verification; cryptographic verification was not repeated here.

| Family | Cases | Metadata instruction discriminator counts per side |
|---|---:|---|
| Edition | 53 | 12: 39; 17: 14 |
| Uses/standard | 35 | 33: 21; **19 (Utilize): 14** |
| Burn | 21 | 41: 21 |
| Context | 8 | 33: 8 |
| Validation | 18 | 23: 8; 35: 10 |

Utilize cases are zero-based indices 21–34 of `uses-validation.json.gz`. All request **one** use with **nine** instruction accounts; none requests zero or selects the delegated-account-count branch. The retained fixture fixes Uses to Multiple, remaining=2, total=2 when present (`use_standard_probe.py`, lines 29–39). Two cases succeed (standards 0 and 3 with Uses present); twelve reject. Standards 4/5 return error 153, including no-Uses variants, so their receipts must not be interpreted as having reached every local Utilize check. Both sides have the same saved outcomes.

Therefore these receipts cover ordinary one-use owner success and selected standard/absent-Uses rejection, not zero-use, over-total, over-remaining, exhausted-use burn, delegated record/bump/allowance behavior, all account-count permutations, or exhaustive validation order. Raw logs and compute were excluded by the original comparison contract. The saved no-mismatch fields and transaction parsing are checked here; no new full watched-state comparison or universal behavioral proof is claimed.

## Provenance and reconstruction proposal

The source build uses public baseline `17e99434af5ead3e989c08f32af33609821d0bc0` plus the retained 18-file patch. All archived changed source hashes match the before/after manifests; the patch and decompressed build-log hashes are verified. The selected program lock is recorded as `64bb1d34591c281ead97a070ef304be3f8d290a2f4c47d7c367acf51a20fc730` in `source-manifest.json`. A manifest is an identity record, not independently a reconstruction of missing original source/dependency bytes.

The retained Linux/amd64 image is `solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467`. The recorded build uses `cargo build-sbf`, sparse registry configuration and `--locked`. Host Rust 1.69.0 is distinct from the selected Solana compiler: platform-tools v1.37, rustc 1.68.0-dev / LLVM 15.0.7, executable SHA-256 `7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384`. Compiler commit/date are unknown. Retained hosted-run metadata records successful compilation and failure of final whole-byte equality, run 40157796106. These are retained provenance claims, not a new live service check or unique attribution of the deployed compiler recipe; `onchain_recipe` is null.

The existing provenance report names audit revision `4284d5d1608da887a79d64e3765efb2809ab87da` in a security repository, but also records it as unavailable. No new retrieval was attempted and no deployed identity is inferred from that audit reference.

**Proposal:** retain candidate 11's current predicates, checked arithmetic, authorization and operation order. Do not replace checked subtraction, split/reorder guards to chase blocks, fabricate diagnostic lines, or infer a compiler switch from the residual layout. No additional semantic correction or uniquely justified alternate source spelling follows from this static evidence. Authentic historical source/provenance or independently justified compiler attribution is still missing. Parent publication can preserve this package as a sharper residual-gap account; it must not mark Utilize or whole-byte reconstruction complete.

## Portable verification

Run `python3 verify.py` from this directory (Python standard library only). It checks the sealed file hashes, then recomputes binary/section differences, complete-body decodes, call anchors, guard targets, relocation records, source-coordinate accounting, source/archive/log bindings, and receipt transaction decoding against `result.json`. It performs no build, network access, or program/runtime execution. `manifest-sha256.json` seals the report, result, verifier and raw evidence; as usual, it is a local integrity manifest, not an external authenticity signature.
