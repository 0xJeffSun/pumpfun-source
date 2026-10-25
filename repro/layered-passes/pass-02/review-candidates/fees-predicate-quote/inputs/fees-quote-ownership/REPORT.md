# Fees quote ownership: bounded source proposal

The original evidence supports an owned `AccountInfo` quote helper that returns the raw `Pubkey` **before** the caller compares it with zero. `quote-ownership.patch` is a complete, minimal proposal against `borrowed-base.rs`: the immutable donation source plus exactly the two Pool/Sharing AccountInfo borrow substitutions root is promoting. Those substitutions are prerequisites, not duplicated patch changes. The proposal is uncompiled and unaccepted. It does not establish historical Rust source identity or predicted binary equality.

The original first releases the data `Ref`, then destroys the cloned AccountInfo, then compares the assembled quote with zero. The accepted `fc1088` candidate releases the `Ref` at the corresponding point but retains the AccountInfo clone through the zero comparison and creator/quote aggregate construction. Moving the existing extraction into a by-value helper expresses the missing destruction boundary naturally, without attributes, wrapper experiments, invented checks, fake source coordinates or compiler/layout trials.

## Immutable inputs and exactness

All repository input is pinned to `c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. `baseline/` is the unchanged published `repro/pump_fees/donation-borrow-source-proposal` package acquired with `git show`. `layer01/` is the specifically permitted frozen `layer01_fees/publication` directory, copied unchanged with its original seal. Its `inputs/current/` contains the frozen `donation-business-v144` candidate, symbols, compiler source archive, whole-function inventory and provenance. Both original verifiers passed locally. The original bytes also equal `evidence/original/pump_fees/deployed.so` at the immutable baseline; `original-provenance.json` records that independent binding.

| Input | Bytes | SHA-256 |
|---|---:|---|
| Frozen original | 948944 | `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e` |
| Accepted donation-business candidate | 770744 | `fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2` |
| Candidate symbols | 1099416 | `0c85263619cd44252e91d412aa82294879740089e2eef3c4feb47ab9f94e8fd1` |
| Frozen donation.rs | 11699 | `a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9` |

Whole-file equality is **false**. There are 421814 unequal shared-position bytes plus 178200 excess original bytes in `[770744,948944)`, totaling 600014 positional mismatches. Every maximal interval, including the excess tail, remains in `layer01/raw-differences.json`; the zero captured allocation tail is observation only. Header/section/program-header differences, all relocation entries, uncovered data intervals, and all ambiguous alternatives remain in the original sealed ledgers. No byte, ELF header or relocation was altered.

The original donation body `[163920,177720)` is 13800 bytes; candidate `[424568,438160)` is 13592 bytes. Neither their raw bytes nor their normalized instruction sequences match. Original function ends are inferred boundaries, not authenticated historical function extents. The entrypoint/dispatch/wrapper evidence in `baseline/REPORT.md` identifies the body through the donation discriminator and **actual signed calls**, not nearest names. The 928-byte wrapper and 8984-byte parser normalized correspondence does not establish complete handler equality.

All 585 original and 546 candidate rows are retained verbatim inside `residual-ledger.json`, along with focused residual classifications. The complete catalog preserves 145 unattributed original windows, three original strict call conflicts, 105 unmatched candidate windows, three candidate conflicts, and every alternative. The larger ledger and all branches/data gaps are retained, not narrowed to the quote success path. No unknown status is promoted to matched. Previous saved comparisons remain finite regression evidence; no receipt was generated, executed or transferred to this proposal.

## Exact ownership and borrow boundary

Addresses are decimal VAs and file offsets for the verified `.text` mapping. `ownership-evidence.json` contains the raw bytes, SHA-256 and every instruction for each interval; `ownership-contract.json` separates the manual interpretation from byte facts.

| Original evidence | Consequence |
|---|---|
| `164248`: load AccountInfo from context +176 | This is the Curve's existing AccountInfo, distinct from typed creator at context +184. |
| `164256–164328`: load lamports Rc, increment strong at +0, abort on wrapped zero | First component of an owned AccountInfo clone. Do not delete this clone as part of the already-reviewed Pool/Sharing borrow changes. |
| `164664–164736`: increment data Rc strong; same abort branch | Second owned Rc component. Overflow/abort branches remain visible. |
| `164744–164840`: copy AccountInfo fields to stack | Key, both Rc handles, owner, rent epoch and three flag bytes occupy `[-512,-469)`; the natural aligned slot is 48 bytes, but only 43 field bytes are evidenced as copied. |
| `164864 → 731512` | Calls the actual complete 80-byte `data_len` body. It checks the data RefCell state before reading length. |
| `164872`: unsigned length `<115` branches to `165008` | Short account returns a zero raw quote, without the subsequent persistent `Ref` acquisition. It does **not** bypass `data_len`'s borrow check. |
| `164888–164952`: load borrow word, compare `<0x7fffffffffffffff`, increment | This is the persistent immutable data borrow. Failure branches to `177680`; it is not an Anchor `Result` error. |
| `164960–165000`: actual slice length check, end=115, Location=821888 | A separate bounds panic path is retained even though stable normal account data makes it redundant with the preceding length check. No assumption is used to remove it. |
| `165080–165192` | Only account bytes `[83,115)` are gathered. |
| `165200`: restore borrow word from pre-increment `r5` | Data `Ref` is released before AccountInfo destruction and before the key comparison. |
| `165208–165304` | Assemble the 32 raw bytes in `[-768,-736)`. Short and long paths join here. |
| `165312–165376` | Load lamports handle, decrement strong; if zero, decrement weak. |
| `165384–165432` | Decrement data strong; if zero, decrement weak. Both branches join at `165440`. |
| `165456–165520` | Reuse the former AccountInfo stack storage for a new 32-byte zero object; pass quote/zero pointers and length=32. |
| `165528 → 796464` | Actual comparison adapter, which calls relocated `sol_memcmp_` at `796488`. AccountInfo destruction is already finished. |
| `165552–165712` | Nonzero raw key is preserved; zero selects the embedded wrapped-native mint. Only then does normal creator authorization follow. |

The `data_len` helper is important: `731512` obtains the data Rc; `731520` reads its borrow word; `731528` loads `0x7ffffffffffffffe`; `731544` rejects a larger **unsigned** word. Normal return reads length at Rc +32. Failure loads Location 825552 and calls `731584 → 767672`. Thus conflicting mutable borrows and the high borrow-count boundary can fail before the `<115` decision. The proposal retains this operation exactly as source, rather than reducing the helper to an unchecked length or replacing `borrow()` with `try_borrow_data()?`.

The second borrow guard uses the unsigned `<0x7fffffffffffffff` predicate and branches to `177680 → 177696 → 767672`. It has a different source Location from the first helper check. Ordinary stable RefCell state and no intervening reentry explain why that second check normally succeeds after `data_len`; the instruction and panic path remain preserved. Bounds failure `165000 → 783752` is an 8-byte trampoline whose signed zero operand targets **783760**, a separate 200-byte body. It must not be mistaken for a self-call or nearest symbol.

On a normal helper return, an owned parameter's destructor runs before the caller resumes. The internal `data` local ends at the `if` block. The returned Pubkey contains copied bytes and has no borrow into the AccountInfo. These ordinary Rust/framework premises justify the proposed boundary. No claim is made about arbitrary corrupted Rc headers, allocator failure, panic unwinding or external runtime implementation. The original's conditional weak-count paths are recorded even though the retained context reference ordinarily prevents this temporary clone from being the last strong owner.

For comparison, the accepted candidate calls `425112 → 625816`, acquires its persistent borrow at `425128–425192`, and releases it at `425320`. It then compares at `425480 → 695512`, selects the raw/native key, and copies creator/quote fields before clone destruction beginning at `426840`. Its strong decrements are `426872` and `426928`; the data weak cleanup branch goes to `429624`. This is a concrete ownership-placement difference, not a newly established business guard failure.

## Complete quote bytes and consumed objects

`quote-byte-provenance.json` records all original account-data loads and each def-use chain into the comparison buffer. The extraction is ordered, not merely the same union of bytes:

| Input bytes | Comparison stack bytes | Final store |
|---|---|---:|
| `[83,87)` | `[-768,-764)` | 165232 |
| `[87,89)` | `[-764,-762)` | 165216 |
| `[89,90)` | `[-762,-761)` | 165304 |
| `[90,98)` | `[-761,-753)` | 165296 |
| `[98,106)` | `[-753,-745)` | 165288 |
| `[106,114)` | `[-745,-737)` | 165280 |
| `[114,115)` | `[-737,-736)` | 165256 |

The `[90,98)` fragment comes from the temporary at `[-768,-759)`: a u64 load of `[89,97)` plus byte 97, then an unaligned u64 load at temporary+1. The byte at 89 is separately retained from the original u64's low byte. The candidate instead loads four u64s at 83,91,99,107. These observations justify the same raw 32-byte copy; they do not identify a unique Rust array-conversion syntax or justify layout forcing.

Consumed memory beyond the account bytes is distinguished from complete allocation extents. AccountInfo field bytes are `[0,43)`; Rc strong/weak fields are `[0,16)`; the data RefCell/fat-slice fields are `[16,40)`. The allocator's whole allocation size is not inferred from the highest observed load. The typed creator is a separate 32-byte object. The comparison zero object and return Pubkey are each 32 bytes. Native-mint immediates and the complete downstream event payload evidence remain in `baseline/inline-objects.json` (208-byte event; CPI data adds the 8-byte prefix), without claiming the helper consumes those events.

`consumed-objects.json` expands three complete 24-byte panic Locations per side and follows their exact file pointer/length pairs. The original extraction bounds descriptor `[821888,821912)` names `programs/pump-fees/src/common/mod.rs`, 36 bytes, line 33 column 56. The borrow descriptor `[821912,821936)` names the same file, line 33 column 48. `data_len`'s descriptor `[825552,825576)` names the ten-byte `src/lib.rs`, line 94 column 19. That short name alone is not unique authenticated dependency provenance.

The actual panic bodies consume a one-entry 16-byte literal table at 826928 and a two-entry 32-byte table at 827240. Their complete referenced strings are respectively `already mutably borrowed: ` (26 bytes), `range end index ` (16), and ` out of range for slice of length ` (34). The borrow formatter code pointer leads to `[767392,767456)`, whose actual 11-byte literal is `BorrowError` and whose last formatting operation is an unresolved indirect call. Candidate literal contents equal these originals; table pointers and source Locations differ. Numeric slice arguments remain end=115 and actual length. These are bounded object equalities, not equality of all recursively referenced formatting data.

## Actual targets, ordinary errors and CPI order

`focused-windows.json` recomputes eight complete paired windows directly from bytes. Seven helper pairs normalize equally; the handler does not. The 8-byte slice-panic trampoline and 64-byte memcmp adapter are raw-equal at changed placement. That raw equality does not make their target code or the external syscall implementation identical by itself.

`actual-helper-edges.json` separately follows signed operands at corresponding slots of normalized-equal parents. It establishes the actual data_len→borrow-panic, borrow-panic→panic_fmt, slice-trampoline→slice-body, slice-body→panic_fmt, and the next two panic forwarding edges. The six recorded target-body pairs all normalize equally; only two of those target bodies are raw-equal. The source/call relationship is checked independently of annotations. `helper-closure.json` retains 14 actual reachable direct/immediate-code-pointer windows per side and 12 external/indirect boundary observations per side. Nested data-pointer graphs and indirect formatting destinations remain open. The entire whole-program graph remains in `layer01/`, including every handler call (77/75 direct plus three external each), relocation, branch and unresolved alternative.

The proposal mechanically leaves all handler source outside raw extraction unchanged relative to the borrowed base. `analyze.py` reconstructs both before/after files, regenerates the exact patch, and asserts that removing the new helper and restoring the extraction yields the borrowed base byte-for-byte. This preserves source ordering and normal error construction:

1. Generated context parsing occurs first. Disable check and its log/error precede the existing-version early success. The reserve predicate chooses Curve or Pool; no Pool owner or extension check is inserted into Curve handling.
2. Curve quote borrow/panic and clone cleanup finish before zero/native selection. Pool's owner, borrow, checked decode, base mint, authority and derived-address checks are unchanged.
3. Creator authorization follows quote selection. Sharing owner/nonempty/decode, mint, admin, revoked and Active checks remain in order, with existing compared-key ordering and direct-versus-originated error conversions intact.
4. State writes precede Clock, event log and signed event CPI. Original Clock call is 167784, logged-event call 171072, instruction construction 172648, and invoke_signed 172968. The new helper introduces no CPI, allocator, log, error conversion or state write. Any persistence-on-error conclusion would additionally require the runtime rollback premise.

Keeping ordinary diagnostics means preserving the actual `data_len`, `borrow`, range indexing, fixed-size copy and existing Anchor error macros/conversions. It does **not** mean copying the historical filename/line/column into artificial paths or metadata. The proposal naturally moves extraction diagnostics to its real helper lines in `donation.rs`; later application lines also shift. The historical `common/mod.rs` contents, line 33 construction, original aggregate lowering, formatter inlining and dependency/build origin are not recovered. Exact source-location and full diagnostic-byte equality therefore remain acceptance gates, not claims attached to this patch.

## Proposed implementation and remaining actions

Apply `quote-ownership.patch` only to source matching `borrowed-base.rs`. `source-provenance.json` gives exact whole-source hashes and consumed line/byte ranges for immutable, borrowed-base and proposed source. The complete proposed file is `proposed-donation.rs`. The patch adds a private helper in the existing module and replaces just the seven-line inline extraction. Its name is descriptive, not a recovered historical identity. It leaves native fallback outside the helper and retains exactly one Curve clone. No extra drop shim or inline attribute is introduced. The preceding Pool/Sharing borrows remain untouched.

Priorities for root:

1. Review this source ownership contract and exact base hash. If the current promoted source differs, reconcile that source explicitly; this worker did not inspect or overwrite live parent changes.
2. If accepted for further work, root owns the separately authorized build. Recompute the complete new binary inventory and confirm borrow release and both clone drops precede the 32-byte comparison. Do not reuse `fc1088` addresses or transfer prior receipts as acceptance.
3. Retain existing diagnostic, early-return, raw-short/zero/nonzero quote, authorization and CPI ordering acceptance gates under separately authorized validation. No transaction or new fixture was created here.
4. Resolve historical source/diagnostic coordinates, recursive formatting data and actual external/indirect target behavior; reconcile toolchain and whole-ELF differences. No compiler flag, version or source-layout search is proposed.

The residual ledger classifies this proposal as **source organization/ownership**. Diagnostic/data metadata and toolchain/build provenance remain open; linked helpers retain external/indirect boundaries; historical source remains ambiguous/unattributed. No additional concrete application guard gap is proved. All explicitly stopped Pump, Mayhem, token-extension and Metaplex work remains excluded and untouched. Accepted handler counts and exact-original counts are unchanged.

## Portable verification and seal

Run `python3 -B verify.py` from a separate copy of this publication. It checks the exact manifest file set and digests, pinned Git blob identities, the independent original binding, both unchanged inherited verifiers, every regenerated focused ledger and the exact source/patch transformation. It only executes static Python analysis/verifiers; it never executes input ELF files, a compiler, a VM, network request, fixture or transaction. `verification.json` outside the sealed package records the separate-copy run and seal.

`analyze.py` is repeatable for these frozen inputs. `layer01/inventory_next.py ORIGINAL CANDIDATE SYMBOLS NEW_OUTPUT_DIRECTORY` is the reusable whole-program analyzer for the next accepted pair; its output must be a new publication. Site-specific interpretation must be re-established against the new pair rather than silently applied to new addresses. The unchanged old manifests are nested provenance, not newly signed authenticity. The root manifest SHA-256 is the external integrity anchor. A passing static verifier establishes reproducibility and byte bindings, not the truth of every semantic premise, successful compilation, exhaustive behavior, security sign-off or whole-original identity.
