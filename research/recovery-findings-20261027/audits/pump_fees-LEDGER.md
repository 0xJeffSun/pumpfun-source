# pump_fees Reconstruction Completion Ledger
Repo: /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source
Date: 2026-10-27 | Read-only audit | NO builds run | Toolchain evidence: platform-tools v1.44
Candidate: repro/pump_fees/sharing-authorize-main-v144/main/candidate.so
Oracle: evidence/original/pump_fees/deployed.so

## 1. Artifact identity
- Candidate: size **863808 B**, sha256 `2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af` == expected in status.json (MATCH).
- Original: size **948944 B**, sha256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
- e_machine: candidate **263 (0x107 EM_SBF)** CONFIRMED; original also 263. Both ELF64 DYN. Entry: cand 0x9B548, orig 0xA14C8.
- `.text` (llvm-objcopy -O binary --only-section=.text): candidate **789416 B** (sha `f124452b…f53f6`), original **799648 B** (sha `904fe764…53735`). Delta = orig − cand = **+10232 B** (original larger, +1.28%). My extraction sha256 == pass-23 inventory hashes (verified).
- Whole-file: `full_byte_equality=false`, `first_difference=24` (ELF header e_shoff region, not code), 468986/863808 shared-length bytes differ, length_difference −85136 (src: main/build-comparison.json). Whole-file % is dominated by header/section-table/dynsym/rel.dyn layout, not code.

## 2. Dispatch / handler completeness
- 31 handlers in `#[program] pub mod pump_fees_candidate` (programs/pump-fees/src/lib.rs) == status.json `implemented_handlers` (31). Full list audited.
- Anchor discriminant `sha256("global:"+name)[:8]` for all 31 names: **present in BOTH candidate and original**, every one as **lddw split-immediate** (low4 @ p, high4 @ p+8); 0 contiguous. Candidate **31/31**, original authoritative set = **same 31**, **0 mismatches**. (cand dispatch cluster .text off ~418948–419924; orig ~598276–599252.)
- Deprecated pair IS present in the ORIGINAL dispatch: `revoke_fee_sharing_authority` (orig split @598804), `transfer_fee_sharing_authority` (orig split @598836). The original still routes them; candidate correctly keeps them as stubs returning `FeeError::DeprecatedInstruction` (=enum 23, lib.rs). "dispatch-removed" ⇒ they return the deprecated error, not that the discriminant is absent.
- Caveat: discriminant-immediate presence proves each dispatch arm's compare constant exists (strong), not that the match tree routes byte-identically; routing equivalence rests on the runtime corpus below.
- Behavioral: runtime-result.json `passed=true`, 17461 comparisons + focused20 + 10 sequence steps; new_builds=0, new_fixtures=0 (inherited/bounded corpus, no new target execution this publication). controls/identity.json `whole_candidate_equal=true` ⇒ committed candidate.so IS the byte-exact output of building the committed source (provenance, not hand-edited).

## 3. Byte-gap root cause (core)
(a) `.text` size delta **+10232 B** (orig larger).
(b) Instruction multiset Jaccard (8-byte slots):
  - RAW: **0.6733** (inter 79926 / union 118707).
  - **SPEC-masked** (call 0x85 imm[4:8]; branch jmp-class offset[2:4]; lddw 0x18 both imm halves) = **0.7911** (inter 87730 / union 110903)  ← requested order-independent structural match.
  - OPCODE[0] histogram = **0.9712** (inter 97866 / union 100767) — instruction *mix* nearly identical.
  - AGGRESSIVE-mask (spec + mem-access offset[2:4] on LD/LDX/ST/STX + ALU/mov immediates) = **0.9186**.
  - Masked symmetric diff (only-in-cand 10947 / only-in-orig 12226 slots) is dominated by memory-access slots whose *offset* field differs — 0x79 LDX 3292/3846, 0x7b STX 2763/3150, 0x71/0x73/0x7a/0x72, plus ALU64-imm 0x07 1243/1568, mov-reg 0xbf 433/234, mov-imm 0xb7 229/287. These = stack-frame slot / struct-field offset / regalloc, i.e. codegen.
(c) Window inventory (pass-23 full-function-inventory.json, AUTHORITATIVE current — supersedes the task's 453/130/2 earlier checkpoint):
  - Original 585 windows → **mapped_pattern 461 / unattributed 122 / call_conflict 2**. Candidate 582 → normalized_call_consistent 463 / unmatched 117 / call_conflict 2.
  - **463/585** original windows have ≥1 normalized-equal candidate match; **100/585** have a raw byte-identical match (summary raw_equal_candidate_ranges=101).
  - **122 unattributed = the LARGE bodies**: total 418696 B (**52% of .text**), median 1688 B, max 16880 B (handlers/parsers/formatters; e.g. the 13800 B window @off163920 = donation create, cf. status.json). All have matches=0: a single differing frame-offset/immediate/line in a multi-KB body breaks its whole-window normalized hash. **461 mapped = small helpers** (median 352 B, total 380128 B).
  - **2 call_conflict are dependency-library helpers**: `solana_rent::Rent::minimum_balance` (.text off/vaddr 725664) and `::is_exempt` (.text off/vaddr 726064). Both `normalized_equal=true, size_equal=true, relocation_pattern_equal=true`; the only flaw is `unique_calls_consistent=false` at in-function offset 232 (one callee whose target couldn't be uniquely attributed). Attribution ambiguity, NOT a source-controllable logic diff.
(d) DECISION — split of the residual:
  - **No genuinely closeable logic/constant window exists.** Independent check: windows that are size_equal + relocation_pattern_equal but normalized_differ = **0**. So there is no window whose sole diff is a flippable constant; every normalized-differ window also differs in size or relocation pattern (⇒ different inlining/codegen, not a single constant).
  - Quantified: of the ~11.5k masked-differing slots, the 0.791→0.919 gain reclaims **~7374 slots (~64%) as pure mem-offset/frame/immediate** (addressing + regalloc). The remaining ~4k are opcode/register-shape differences from different inlining/scheduling (still codegen). JMP-imm compare tail (0x55 50/268, 0x15 85/114, …) ≈ a few hundred slots = panic line-number metadata + already-validated enum/threshold constants. **~0% attributable to wrong/missing business logic.**
  - Cause = **(i) layout/addressing + regalloc/scheduling/inlining** (dominant; exact historical compiler is `unresolved`, candidates v1.44/1.45/1.46/1.46.1) **+ (ii) source-file metadata** (panic `Location` path/line/col). **(iii) genuine missing/wrong logic: none found.**

## 4. Path-string recoverability (the one bounded, source-free win)
- Candidate embeds **13** distinct `programs/pump-fees/src/*.rs` path strings; original embeds **20**.
- **Already recovered: 4/20** — `lib.rs`, `state.rs`, `instructions/fee_sharing/mod.rs`, `instructions/fee_sharing/create_fee_sharing_config.rs`.
- **Missing: 16/20** — original uses a different module tree, fully disclosed by its OWN strings: `common/mod.rs`; `instructions/admin/{extend_fee_config, initialize_fee_config, initialize_fee_program_global, update_buyback_authority, update_fee_config, update_fee_program_global, upsert_fee_tiers}.rs`; `instructions/buyback/mod.rs`; `instructions/fee_sharing/{admin_cto_sharing_config, claim_social_fee_pda, create_donation_fee_pda, create_social_fee_pda, update_fee_shares, update_fee_shares_v2}.rs`; `instructions/withdraw.rs`. Candidate's flat layout (buyback.rs, contexts.rs, donation.rs, sharing*.rs, social.rs, types.rs, withdrawal.rs) emits 9 path strings the original lacks.
- `--remap-path-prefix` is ALREADY effective (candidate emits the `programs/pump-fees/src/` prefix). Residual gap = module decomposition ONLY; the reconstructed logic already exists, just filed differently. Re-splitting it into the original's (now-known) filenames would recover all 16 strings. Scope: this is **.rodata** (string blob), not `.text`; it recovers path strings but not the (line,col) `Location` immediates, so on its own it does not reach byte identity.

## 5. Verdict
(a) Behavioral/handler completion is complete to the audited bound: 31/31 handlers implemented and dispatchable, all 31 discriminants present in both binaries, 17461 bounded runtime comparisons pass — but on an inherited fixture corpus, not a proof of full historical semantic equivalence.
(b) NOT byte-identical: `.text` 789416 vs 799648 (Δ+10232), 463/585 windows normalized-match and only 100 raw-identical; the exact external blockers are the **unresolved historical compiler/toolchain + build flags** (non-reproducible regalloc/scheduling/inlining) and the **lost original source file/module layout** that fixes panic-`Location` path/line/col.
(c) Only one genuinely closeable item: the **16/20 missing `programs/pump-fees/src/*.rs` path strings**, closeable WITHOUT lost source by reorganizing existing code into the original's disclosed module tree (rodata win, no line/col or .text gain) — NO closeable `.text` window exists (0 flippable-constant windows; the 2 "conflicts" are solana_rent library helpers that already normalize-equal with one unresolved callee attribution @offset 232).
(d) The standing conclusion is **CONFIRMED**: the residual is externally bounded by lost source + non-reproducible exact codegen — evidenced by opcode-mix Jaccard 0.971, spec-masked 0.791, aggressive-masked 0.919, 463/585 normalized-equal windows, 0 size+reloc-equal-but-normalized-differ windows, and unattributed mass concentrated in large bodies rather than any attributable logic defect.

## Blockers encountered
None. All inputs present and read-only; LLVM tools present; no build attempted (hard constraint honored).
