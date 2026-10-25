# Fees remaining-account preprocessing contract

The complete original inferred window **[231576,234096)** supports the separate typed proposal in `proposal/remaining_preprocess.rs`. It conditionally removes the last remaining account after checking its derived address and, for one owner, a bounded raw data word. It is not the accepted source's shareholder count/key loop. No main file was changed. This is static recovery, with no build, typecheck, runtime probe, new fixture or transaction.

## Fixed baseline and scope

Original SHA-256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
The only candidate baseline is the supplied legacy/social handoff: `8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`, symbols `ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b`. Its complete 26-entry source map and those exact public inputs are copied under `inputs/source`. Historical package seals, the prior handoff README and the read completion guidance are retained. No moving-main assumption is used.

The selected catalog is a bounded extraction from the sealed handoff inventory, not a new full inventory. It includes the preprocessing window, legacy caller, decoded-curve witness, immediate targets and relevant current symbol bodies. The verifier regenerates all retained instructions and checks actual symbol extents, raw and normalized hashes. Original boundaries remain inferred, not recovered historical symbols. No excluded extension implementation was inspected or inferred.

## Inputs, output and lifetimes

At entry, `r1` points to a 24-byte result destination; `r2` is the remaining AccountInfo slice pointer and `r3` its element count. `r4` points to a decoded curve value. The fifth argument supplies the caller stack frame: `r5-4096` holds a pointer to a 32-byte key and `r5-4088` a pointer to the quote key. They are read only after the completed-curve and nonempty checks.

The legacy caller loads the remaining slice from its Context at offsets +16/+24 (`194856/194864`). It copies the key reached through the accounts object at +192 to a stack Pubkey (`194872–194944`), passes that stack key at `194968`, and passes the fixed native quote key at `194976/194992`. It passes the decoded curve at accounts+656 (`195000/195008`), and calls this window at `195040`. Thus the core contract needs two borrowed keys; the name `base_mint` describes the role of the first key in the retained PDA seed construction, not a claimed recovered argument spelling. Its exact caller load chain is preserved even independently of that name.

The initial read `231600` tests **decoded curve offset +72**, not raw account-data byte72. The complete original deserializer [538040,539488), normalized-matched to current `BondingCurve::try_deserialize_unchecked` [325704,327152), reads wire byte48 at `538712`, retains it at stack -152 and writes it to decoded offset72 at `539400`. The fixed IDL has five u64 fields followed by `complete` at wire byte48 including the discriminator. This supports `curve.complete`; no other flag is substituted.

Success is tag0 at output+0 and the slice pointer/count at +8/+16. Error is tag1 and the two-word Anchor error payload at +8/+16. These are observed ABI layouts, not a portable Rust representation promise. The caller branches on tag0 at `195056`, then **writes the returned slice back to Context +16/+24 at `195368/195376`**. Subsequent work sees that shortened slice. The helper does not just validate and discard the result.

The returned borrow is tied only to the input slice lifetime. No references to temporary keys, PDA outputs, curve fields or a data Ref escape. The window makes no AccountInfo clones, mutates no account contents and does not allocate an account list. Error formatting can allocate. The caller's stack copy of the first key lives across the call; the quote key points to retained static data. The proposal uses ordinary borrowing and `Result<&[AccountInfo]>`, without manual ABI or Rc manipulation.

## Complete branch contract

| Condition, in execution order | Result |
| --- | --- |
| `!curve.complete` | Return the original pointer/count immediately, including an empty slice. No PDA or AccountInfo access. |
| Complete, no remaining accounts | Anchor custom error 6013 (`NotEnoughRemainingAccounts`). No subtraction, indexing or PDA call. |
| Complete and nonempty | Derive the two addresses below, then take the final 48-byte AccountInfo entry. |
| Final account key differs from derived pool key | Anchor `ConstraintSeeds` 2006, with compared public keys: actual final key first, expected PDA second. |
| Key matches, owner differs from AMM | Success with the final entry removed. No data borrow or data validation. |
| Key matches, owner is AMM, shared data borrow fails | Propagate `ProgramError::AccountBorrowFailed` through Anchor's actual conversion. |
| Borrow succeeds, data length <287 | Release borrow, succeed with final entry removed. |
| Length >=287 and little-endian u64 at [279,287) is zero | Release borrow, succeed with final entry removed. |
| Length >=287 and that word is nonzero | Construct custom error 6033 (`PoolCreatorFeesNotSwept`), release borrow, return error. |

The names of 6013 and 6033 are supported by the fixed source enum and normalized matches to its actual name/display functions. The error name/message does not prove the complete serialized account type or justify an extension interpretation. The proposal deliberately reads a neutral raw `word`. There is no pool discriminator check, full Pool deserialization, writable/signer check, lamport test or extra ownership error in this window. No additional check is introduced.

## PDAs and indexing

`231784 → 752280` is an actual `Pubkey::find_program_address` call with two seeds: ASCII `pool-authority` (14 bytes at 803585) and the supplied first key (32 bytes). Its program key at 806605 decodes to Pump's fixed ID. The bump is unused.

`232048 → 752280` derives the expected final key with five seeds: ASCII `pool` (4 bytes at 802316), two zero bytes, the first derived address, the supplied first key, and the supplied quote key. The program key at 806716 is AMM. The two zero bytes support `0u16.to_le_bytes()`, without claiming unique historical syntax. The legacy quote literal at 800576 is the native mint. All three 32-byte literals are retained, not inferred from a current address mapping.

The nonempty branch dominates `len-1` at `232056`. `232072` multiplies by **48**, then `232088` adds it to the original slice pointer. `232160` loads the final AccountInfo key pointer at offset0. `232272 → 796464` compares exactly 32 key bytes. Only after equality does `232304` load owner at offset24 and `232336 → 796464` compare it with AMM. The successful pointer always remains the original slice start; its length becomes `n-1`. No first-element removal or shareholder-count stride applies. With n=1, success yields the empty prefix.

The proposal's subtraction and index are guarded by nonemptiness. Slice validity and its usual representable allocation bound are Rust input preconditions; invalid forged pointers or gigantic invalid slice lengths are not admitted. The data read is protected by an unsigned **JLT 287** at `233664`; length exactly287 permits the eight-byte read. `data[279..287]` and conversion to an eight-byte array are therefore bounds-safe under a valid shared borrow. No raw/unaligned pointer access is needed in the source proposal.

## Borrow and error order

`233592 → 732088` is raw-identical to current `AccountInfo::try_borrow_data` [629168,629312), rather than the infallible borrow used by the prior quote helper. Its body checks the RefCell borrow word, increments it on success and returns the data-slice reference plus borrow guard. The matching fixed `solana-account-info` source maps failure to `AccountBorrowFailed`. At `233776` the actual target is `709368`, normalized-matched to Anchor's `From<ProgramError>`. This failure occurs before any data length/load and has no acquired guard to release.

On successful borrowing, length is loaded via the returned slice descriptor at `233656`. The raw u64 is loaded at `233816`. Both the short/zero success and nonzero custom-error arms converge at `234064–234080`, which decrement the acquired shared-borrow word once; they then reach the sole return at `233560`. The nonzero path constructs the error before releasing the borrow. In ordinary Rust the proposal's local `Ref` is dropped on `require!` return and on normal scope exit, preserving that lifetime. No mutation borrow or Rc ownership transfer occurs.

Error 6013 originates at original fee_sharing/mod.rs line60; ConstraintSeeds at line74; 6033 at line83. The source path is the real 54-byte literal at 804029. All start with a Source origin and no compared values; ConstraintSeeds is then augmented through actual `709768` (`Error::with_pubkeys`) with actual/expected keys. The macro proposal explicitly supplies `ErrorCode::ConstraintSeeds`, since a default `require_keys_eq!` error would be 2502. Source coordinates in the proposal are naturally different; no line/path spoofing is offered.

The caller first performs its existing quote admission, version check, then authorization (`194824 → 234096`); only then calls preprocessing. The recovered ordering inside this window is emptiness, PDA derivations, key equality, owner comparison, shared borrow, length, word. PDA derivation failure follows the actual `find_program_address` panic path, not a custom error conversion. Error formatting also retains its possible unwrap-failure path. No general panic-free guarantee is made.

## Actual callees and identity limits

All 17 direct callsites and their **12 distinct actual destinations** are decoded from signed operands; relocated external calls are distinguished from direct calls. All 12 target bodies have normalized matches to the fixed candidate's genuine symbols. Only `try_borrow_data` and `memcmp` among these targets are raw-equal. The original PDA helper calls the relocated `sol_try_find_program_address` syscall at752392 and calls panic formatting at752496 on failure. The retained complete callee bodies preserve their own direct/external/indirect instructions; normalization alone does not close those transitive targets or data.

| Original target | Current target | Actual role |
| --- | --- | --- |
| 752280 | 649376 | Pubkey::find_program_address |
| 796464 | 698288 | memcmp (raw equal) |
| 718080 | 615160 | Anchor ErrorCode::name |
| 721728 | 618808 | Anchor ErrorCode Display |
| 709232 | 606312 | Anchor From<AnchorError> |
| 709768 | 606848 | Error::with_pubkeys |
| 280976 | 550008 | FeeError::name |
| 290384 | 559416 | FeeError Display |
| 771648 | 673704 | core::result::unwrap_failed |
| 732088 | 629168 | AccountInfo::try_borrow_data (raw equal) |
| 709368 | 606448 | Anchor From<ProgramError> |
| 38848 | 38064 | ToString implementation |

The whole preprocessing window has **no normalized candidate match**. Current `validate_remaining` is [68904,70560), not the older 70384 address. Its fixed source checks shareholder count and keys and returns `Result<()>`; it cannot stand in for this slice-transforming helper. Current legacy `update_fee_shares` remains [508680,517160). No compiled bytes exist for this proposal. Whole original/candidate equality is false. Normalized deserializer/callee matches do not establish a unique historical source or dependencies, complete caller equivalence, diagnostics, compute equivalence or whole-file identity.

## Application boundary and verification

The proposal is a minimal, separate, typed source file using the baseline's existing types/constants/errors. It does not replace `validate_remaining`, add a call to main, or claim that the current generic CPI path is the original payout implementation. A future authorized integration must consume the returned slice at the caller boundary, preserve quote/version/authorization ordering, and separately resolve any interaction with the current shareholder validator and payout work. Those broader source changes and V2 behavior are not reconstructed here.

Run `python3 -B /absolute/path/to/handoff/verify.py` from any directory. It checks the exact owned-file allowlist, final seal, previous seals, all 26 fixed source inputs, genuine artifact identities, framework source bindings and regenerated complete static evidence. It needs only Python's standard library, reads only the portable package and never executes a target. Separate-copy positive and integrity-negative verification results are recorded in `PORTABILITY.md`. These are verifier checks, not transaction or input-behavior tests.

The previous handoff's 17,461 comparisons and ten sequence steps remain historical evidence for its own candidate only. None was rerun or transferred to this proposal. Completion remains 140/150 bounded implementations and 0/4 whole-original ELF matches per the retained guidance. Historical failures/seals are not rewritten. Outstanding work is authentic build/source attribution and broader caller/transitive closure, not a newly asserted runtime success.
