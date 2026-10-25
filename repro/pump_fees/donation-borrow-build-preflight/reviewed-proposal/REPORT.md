# Fees donation remaining-body reconstruction handoff

This is a static source hypothesis against fixed Git commit `7a9cf0136087d3a6187be07660cbbfbe62ead526`, not a recovered historical source identity, security sign-off, or accepted replacement binary. No new missing application guard is established by this review. Two concrete ownership differences support the two-line `borrowed-accounts.patch`; a separate, optional owned-AccountInfo quote-extraction fragment explains another lifetime boundary. Neither proposal was built, typechecked, or executed. Root must independently review and validate any implementation before promotion. Handler/completion counts remain unchanged.

The residual is **not classified as metadata-only**. The bodies have different register allocation, aggregate copying, AccountInfo clone/drop paths, and inlined-versus-called formatting work, in addition to proven filename/line differences. Those facts neither prove a business-behavior mismatch nor establish full semantic equivalence. The 208-byte size difference cannot be assigned uniquely to one source construct.

## Fixed inputs and identity

| Input | Whole-input identity |
| --- | --- |
| Captured original | SHA-256 `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, 948,944 bytes |
| Accepted candidate | SHA-256 `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2`, 770,744 bytes |
| Exact compiled donation source | SHA-256 `a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9` |

All repository reads were `git show` at the fixed commit. The live working tree is not the checkpoint. The original was extracted only from the permitted public checkpoint's `scratch-handoff.tar.gz:analysis-method/inputs/original.so`; its parent archive whole hash and Git blob ID are recorded in `input-origins.json`. The original parent archive is not duplicated here: portable verification authenticates the retained member against its pinned digest, not the acquisition history or Git authenticity. The checkpoint's entire fresh inventories, source archive, 26-input source manifest and unchanged package manifest are retained. `source-ranges.json` identifies consumed source lines and half-open byte ranges. `ranges.json` identifies every retained code window and file offset; `body-calls.tsv` lists every body call and candidate-symbol possibilities; `inline-objects.json` binds embedded native-mint/event bytes; `handler-data.json` gives complete bounded objects rather than treating 128-byte previews as objects. Whole-input hashing does not mean all binary code was semantically reviewed.

Identity is established before interpreting the body:

| Link | Captured original | Candidate |
| --- | --- | --- |
| Donation discriminator `f48b10580eff7a1a` load / equal branch | 599184 / 599200 → 602624 | 331528 / 331544 → 333128 |
| Selected dispatch call | 602704 → 655904 | 333208 → 356136 |
| Wrapper inferred/symbol window | [655904,656832), 928 bytes | [356136,357064), 928 bytes |
| Wrapper parser call | 656064 → 425776 | 356296 → 134648 |
| Parser window | [425776,434760), 8,984 bytes | [134648,143632), 8,984 bytes |
| Wrapper body call | 656328 → 163920 | 356560 → 424568 |
| Body window | [163920,177720), 13,800 bytes | [424568,438160), 13,592 bytes |

The donation discriminator also equals the first eight bytes of SHA-256 of `global:create_donation_fee_pda`. Original boundaries are inferred analysis windows, not authenticated historical function identities. Wrapper and parser normalized hashes match; the full body normalized hashes do not. Calls are recomputed from **pc + 8 + 8 × signed operand**, except relocated external calls. An annotated symbol name never overrides that calculation. There are 77 original and 75 candidate body direct calls, three external calls on each side (two logs and abort), and no body indirect calls. The immediate helpers can themselves call indirectly; their closure is not proven.

The complete fresh inventory remains 585 original and 546 candidate windows. Original dispositions are 437 mapped patterns, 145 unattributed and three call conflicts; candidate dispositions are 438 normalized-call-consistent, 105 unmatched and three conflicts. These inventory dispositions are preserved, not security or completion counts.

## Ordered business-body reconciliation

Source references below are to the exact compiled `inputs/donation.rs`, especially `create` and its context; machine mappings supplement, rather than replace, this manual dataflow review. Instruction addresses are decimal and ranges half-open.

| Decision/effect | Original evidence | Candidate evidence and source interpretation |
| --- | --- | --- |
| Disable before idempotence | 163936–164120; bit 4 branches to disabled log, `FeeError` conversion with variant 21 | 424584–424768; same two predicates/order. Disabled log is 42 bytes; existing-state log is 31 bytes. No origin attached to direct conversion. |
| Nonzero existing version returns success | version byte at context +849; 163960–164024 | 424608–424672. No creator authorization or business writes after this early success. Do not introduce an authorization check ahead of it. Generated parsing occurs before this body. |
| Curve vs Pool | 164160–164248 tests +240, +224, +232, +216, selecting Curve if any nonzero | 424776–424800 and 425576–425624 implement same short-circuit predicate with different block placement. Source order is real SOL, virtual SOL, real token, virtual token reserves. No additional `complete`/owner/Pool check is justified on the Curve branch. |
| Raw quote extraction | 164248–165440, `data_len` call at 164864, threshold 115; borrow count guard, slice-end panic, loads covering [83,115) | 424800–425328, `data_len` at 425112; same threshold, raw bytes and borrow failure class. No token extension parser, mint-owner check, or quote whitelist is supported here. |
| Zero quote fallback | 165456–165720 compares exactly 32 bytes to zero; selects embedded native mint on zero | 425408–425568, native constant arm at 426616. Preserve raw nonzero key verbatim and short-data zero fallback. |
| Pool owner, data borrow, checked decode | 164336–164648; memcmp against 32-byte AMM key, try_borrow_data at 164440, checked Pool decoder at 164600 | 425624–425896; candidate first clones AccountInfo at 425648, then same owner/borrow/decode decisions. Borrow and codec errors propagate; they are not all remapped to InvalidPool. |
| Pool base-mint equality | 168704–168968; error block 173432–173832 | decode/copy and compare through 426176, error through 426584. Left is decoded base mint, Right is context base mint. |
| Pool creator authority | 174120–174456 derives `[pool-authority, base_mint]` under Pump and compares decoded Pool creator | 427456–428168; same ordered seeds and compared-key order. InvalidPool originates at this guard. |
| Pool address | 175480–175816 derives `[pool,index_le,creator,base_mint,quote_mint,bump]` under AMM; derivation error converts variant 8 directly. 176280–176968 compares supplied Pool key to derived key | 428168–429200; derivation error at 428504 is origin-free. Key mismatch uses supplied key Left, expected key Right. Preserve distinction between derive failure and key mismatch. |
| Creator selection | 177056–177232 copies Pool coin_creator/quote_mint, releases Pool data borrow, rejoins at 165784 | candidate rejoins before creator comparison at 429896. Curve uses curve.creator; Pool uses coin_creator, not Pool authority creator. |
| Direct creator authorization | 165784–166696; if creator differs from sharing PDA key, payer vs creator comparison at 166056 | comparison at 430048, error with compared keys at 430744; source is `require_keys_eq!(payer.key(),creator,NotAuthorized)`. |
| Sharing admission | 166696–166768 owner, 168464–168696 nonempty, 173152–173432 borrow and checked decode | candidate clones sharing AccountInfo at 430776–431024, compares owner at 431048, nonempty call at 432376, borrow at 435960, decoder at 436096. Original accesses the existing sharing AccountInfo directly. |
| Sharing authorization/order | mint comparison at 175048, payer/admin comparison at 175984; revoked flag at 176968; Active flag at 177240 | mint compare at 436368; payer/admin at 437192; direct revoked conversion at 437472; inactive error finishes at 438088. Mint error includes compared keys; admin mismatch does **not**. Revoked precedes inactive and is origin-free. |
| State update | 167160–167768, shared-success join from 176264 | 431280–431760. Context offsets: reserved [640,704), config_id [704,736), base_mint [736,768), quote [768,800), creator [800,832), totals [832,848), bump +848, version +849. Both write bump, version=1, four keys, two zero counters and 64 zero reserved bytes. These are in-memory layout offsets, not serialized offsets. |
| Time and two event deliveries | Clock at 167784; 208-byte logged event at 171072; Instruction::new_with_bytes at 172648; invoke_signed at 172968 | Clock at 431776; event log at 433872; instruction at 435424; invoke_signed at 435744. Same source event fields: timestamp, payer, donation PDA, config ID, base, quote, creator. Event CPI uses 216 bytes (8-byte event-instruction prefix plus 208-byte event); event-authority seed is 17 bytes plus bump. |

Pool data borrow release at 177184–177208 precedes sharing/direct authorization. Sharing data borrow is released at 176232–176256 before the common state-write join. The candidate holds additional Rc clones around these scopes; that is a concrete ownership difference, not evidence that the original omits owner, mint, or creator checks. Error formatting and event construction include allocator/formatter paths; the hypothesis explicitly imports their bounded successful operation rather than pretending to prove all failures.

State writes precede Clock and CPI errors in both bodies. Transaction-level persistence on error depends on the runtime's rollback contract. This review does not execute or prove that runtime contract, and does not infer persisted partial writes solely from instruction order.

## Grounded source proposals and residual classification

`borrowed-accounts.patch` changes only:

```rust
let info = &ctx.accounts.pool;
let sharing = &ctx.accounts.sharing_config;
```

The patch replaces the corresponding two `to_account_info()` clones. The original Pool path loads the context account pointer and owner, then borrows its data directly; candidate call 425648 → 51424 is a complete AccountInfo::clone window. The original sharing path likewise passes the original account pointer to owner/data helpers, whereas candidate 430776–431024 increments two Rc strong counts and copies the AccountInfo fields, with corresponding later decrement paths. `create-body-hypothesis.rs` is the complete existing body with only these two substitutions. It retains all recovered decisions, diagnostics, state writes and event operations.

Premises: UncheckedAccount dereferences to the same AccountInfo; its `key`, owner, data and borrow methods preserve those of the prior clone; the current context owns those accounts for the entire body. The prelude's method resolution must be checked by root's later authorized build. Normal live Rc counts must be representable. Removing extra clones deliberately changes the candidate's extreme refcount-overflow abort paths and temporary reference-count operations; these have no counterpart in the original Pool/sharing path. No claim of all-input Rust behavior equivalence is made. Observable business acceptance and error-comparison order are intended to remain unchanged.

The optional `quote-helper-fragment.rs` is a second, separable source-organization hypothesis. Original 164248–164864 clones the Curve AccountInfo and calls data_len; 165200 releases the data borrow; 165312–165432 drops the clone **before** zero-key comparison at 165528. The slice/borrow panic locations point to the complete original filename `programs/pump-fees/src/common/mod.rs`, line 33 (columns 56 and 48). The candidate uses `programs/pump-fees/src/donation.rs`, lines 63 and 62, and drops the clone later in the Curve arm. A helper taking AccountInfo by value and returning the raw Pubkey naturally explains the original drop boundary. Its name, exact signature, inlining, array-copy syntax and module arrangement are not recovered identities. The fragment introduces no explicit inline attributes, source-location tricks, padding, or new checks. It leaves zero/native fallback outside the helper. It is not asserted to regenerate the peculiar original overlapping/scattered loads.

Other residuals stay unresolved rather than triggering arbitrary edits:

- The original assembles the 32 quote bytes with 4/2/8/1-byte pieces and stack reassembly; the candidate uses four u64 loads. Both traced byte unions are [83,115). That supports the same byte extraction, not a new validation rule or a unique array conversion syntax.
- Original 167152 and 167248 copy 41-byte intermediate aggregates, and 177440 copies a shared-authorization aggregate; the candidate uses different scalar/aggregate moves. No new state or event field is established by these copies. Historical compiler layout and source temporary/return shapes remain unresolved.
- Original owner/base-mint rejection blocks inline formatting work and call FeeError::Display directly; candidate Pool blocks call ToString. Both helpers and all actual operands are retained. ToString's original 38848 window itself calls Display at 38992 and unwrap_failed at 39136. This supports an inlining/placement explanation, not removing errors or replacing macros to chase byte counts.
- Complete original application diagnostic filename is 74 bytes; current filename is 34 bytes. Original application guard lines include 148,152,156,174,192,197,204,213,214,221; current lines include 74,77,79,81,86,87,90,91,95,98. These are real diagnostic differences. They are not fabricated source identities to be copied into paths or padding.
- The formatter-failure source path differs between Linux-style `/home/runner/...` and `/Users/runner/...`; vtable addresses and standard-library panic descriptors differ too. Complete bounded descriptors and filenames are decoded in `handler-data.json`. Runtime methods reached through vtables, allocator globals, nested codec data, historical toolchain linkage and all-program behavior remain outside closure.

## Actors, reachability, and security applicability

For a zero-version admitted donation account, the direct branch requires the signer payer key to equal the selected creator. The sharing branch requires the selected creator to equal the sharing PDA key, Fees ownership, nonempty decodable data, matching base mint, matching admin/payer, non-revoked admin, and Active status. An unauthorized payer is rejected at the traced comparison under those premises. A matching direct creator or active sharing admin is the authorized actor. The nonzero-version early return bypasses body authorization and performs no business update; this is not by itself an unauthorized-write finding. A Pool is examined only when all four Curve reserves are zero. Unused Pool checks on the Curve branch must not be invented as a security correction.

These statements concern this reconstruction and the bounded original dataflow, conditional on authentic generated context admission and normal helper/runtime behavior. They are not captured-original exploit claims. No malformed account, transaction, signature bypass, runtime probe or exploit was constructed. Concrete residual effects observed statically are extra clone/drop control flow, changed instruction count/placement, and diagnostic metadata; compute differences and externally reachable failure impact are unmeasured. No new theft, denial-of-service, authorization bypass, or all-input mismatch is established. Historical public audit packages were not needed to infer these source changes; no old finding or seal is modified or declared resolved.

## Portable verification and review boundary

Run `python -B verify.py` from a copied publication directory. It uses only Python standard library, reads no checkout, performs no network call, launches no target/compiler, and writes nothing. It verifies the sealed exact file inventory, hashes, archived source inputs, every retained window, normalized bytes, complete instruction decoding, direct-call operands and branch destinations, data objects and source slices. It also checks concrete identity/ordering/state evidence and that the proposed patch/body contain only the two documented substitutions. It **does not prove** that prose interpretations, Rust typing, helper premises, semantic equivalence or security conclusions follow automatically from hashes.

Root handoff: independently review the two ownership substitutions and the optional helper boundary; choose whether either merits implementation. If approved for further work, root's separate fresh build and bounded runtime acceptance must check current body/call/data results and strict diagnostics. This assignment authorizes neither that build nor transaction creation. Do not promote the hypothesis, alter old seals, increase handler counts, or describe the body as fully recovered based on this verifier.
