# Independent review: natural Fees donation creation proposal

**Recommend one isolated build after accepting the separate one-expression correction below.** The proposed business flow is supported by the captured handler and the actual locked APIs. I found no other source/API/type blocker in this bounded review. Compilation and original equivalence remain untested. Neither this review nor the source proposal supplies runtime acceptance.

The frozen proposal is copied unchanged under `proposal/`, retaining seal `69e1830d5d10b1153f801b3634104e406594904cdec51bb5777c9f866e48d0c1`. Its accepted source baseline is candidate `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e`. The original ELF is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`. This review independently rebinds the complete 13,800-byte original handler disassembly, all 31 retained original ranges and all 49 bounded data previews to that whole original ELF. Preview verification is not an assertion of complete data extents.

## One actionable retained mismatch

The pool PDA failure expression in the frozen proposal is inherited from current source:

```rust
.map_err(|_| error!(FeeError::InvalidPool))?
```

The original calls the PDA helper at **175744 → 752592**. Its non-success branch sets enum index **8** at **175784**, then directly calls FeeError conversion at **175792 → 289880**. Instructions 175800–175840 only load the two returned error words and decrement the pool data-borrow count. The jump at 175848 reaches 164104, which stores those words at caller output +8/+0 and exits at 164120. There is no intervening call or error-origin/compared-values augmentation.

The full original conversion [289880,290384) matches current candidate [553368,553872) after the established normalization, with matching relocation pattern and supported immediate targets. The current symbol identifies `From<FeeError> for anchor_lang::error::Error`. Locked `anchor-syn` 0.31.2 generates `error_origin: None` and `compared_values: None` for that conversion. Conversely, locked **anchor-attribute-error 0.31.2**, included from an authentic checksum-matched archive, makes `error!` insert `Source { filename: file!(), line: line!() }`.

`correction.patch` therefore changes only this expression to:

```rust
.map_err(|_| FeeError::InvalidPool)?
```

`map_err` produces a `Result<Pubkey, FeeError>`; `?` uses the generated `From<FeeError>` conversion into the enclosing Anchor `Result` error. This is a natural source correction supported by the exact original return path, not an attempt to reproduce historical source coordinates. The corrected full donation file is `correction/donation.rs`, SHA-256 **`5e2af176c8c5f627602fb276d240aa48958d9dd45758fec553e9173e56df32c8`**. Patch SHA-256: **`622bdf9f63a522828862a2f7aa00477995f31ab3e9fbd2aa058d3240591cad32`**. It is an additional proposal, not applied to the frozen proposal or main source.

## Other source findings

| Area | Independent conclusion |
|---|---|
| APIs and typed accounts | `Account<T>` dereferences to the decoded value and exposes `AsRef<AccountInfo>`; blanket `to_account_info` clones it. AccountInfo's public `data` is `Rc<RefCell<&mut [u8]>>`. `data_len` and `data_is_empty` use infallible shared borrows; `try_borrow_data` returns AccountBorrowFailed. Pubkey is Copy and `new_from_array` preserves the 32 bytes. These support the proposed expressions without changing the IDLs, context types or dependencies. |
| Early exits | Original 163936–164128 establishes disable bit 4 before version, the exact 42/31-byte logs, direct FeatureDeactivated conversion, and existing-account success. The proposal retains that precedence. Parser/init_if_needed effects still precede the handler. |
| Curve selection and creator | Context offsets 240,224,232,216 select the curve when any reserve is nonzero, in the proposed order. Decoded creator at context +184 is independent of extension length. No supply/complete/mode predicate is introduced. |
| Quote selection | Original 164864–165200 establishes length 115 and exactly data[83..115]; short data yields zero. Only the curve path applies zero → native mint. Nonzero curve keys and pool quote keys remain unchanged. The untyped extension is not inserted into the typed BondingCurve IDL. |
| Shared authorization | Creator-vs-sharing-key, owner, nonempty data, borrow/decode, mint, payer/admin, revoked, active status is the original order. Direct creator authorization compares payer to the selected creator. Direct revoked conversion and the explicit empty-data error are grounded. |
| Borrow scopes | The curve RefCell count is restored at 165200 before quote selection; the proposal's inner borrow ends before it too. Pool success decrements its data-borrow count at 177184–177208 before common authorization. Sharing success passes through 176232–176256 to release its data borrow before state initialization at 167160. The proposed branch/block scopes preserve these releases. AccountInfo Rc cleanup may be placed differently around pure key operations; exact generated cleanup remains a post-build comparison, not a demonstrated source blocker. |
| Effects and scope | The tuple carries only the chosen creator and quote. Existing state initialization, zero counters/reserved bytes, Clock, event log then event CPI remain. Context declarations, accepted event-authority AccountInfo, crank body, locks, IDs and account types are unchanged. No reserve mutation, transfer or relay operation is added. |

The original Pool and SharingConfig decoder/typed-layout assumptions are preserved rather than replaced. This is sufficient to justify a source build without first proving every allocator or standard-library descendant. It does not establish exact code generation, all malformed-input/drop behavior, nested data closure, error serialization, PDA/event syscall behavior, final serialization or runtime rollback. Those are acceptance limits; they are not reasons to reject this grounded build hypothesis. No harness proposal or new fixture is included here.

## Whole-function comparison baseline

**Yes:** the frozen current inventory is a meaningful static baseline for the next candidate. `inputs/current-inventory.tar.gz` preserves it unchanged with seal **`7c1bd0902fb1e71fd0c074758d75d627b10b35ec1c0646f687f98cd067de8b63`**. Its verifier reproduces all 585 inferred original rows and 548 current symbol windows, including 438 call-consistent candidate windows, 107 unmatched windows, three call-conflict windows, all ambiguous alternatives and immediate-target residuals.

For a fresh candidate, use the same generic `catalogue(candidate, symbols)` matching method with the frozen original ELF, then make a separately version-bound comparison to the 8f catalog. Preserve the old package and do not merely replace the SHA hardcode in its `run()`/verifier. Its older-prior projection check is specifically tied to e501ca2; a new comparison adapter must explicitly use 8f as the before-version. Fresh symbol-window counts may change, so retain all new candidate windows and all 585 original rows rather than assuming 548 forever.

Keep terminal-boundary exclusions, raw equality, normalized equality, sizes, ambiguities and call contradictions separate. Truthful source-line movement can lose strict matches without establishing a behavioral regression. Window counts are not original function identities or a semantic completion percentage. This inventory complements the targeted handler/parser/wrapper/callee/data checks; it cannot replace them or attach old runtime receipts to a new executable.

Run `python3 -B verify.py` from any directory. It verifies the exact copied proposal, authentic dependency member, correction-only diff, original raw bindings, complete failure-return path, conversion helper and immutable inventory. No compiler, ELF execution, runtime case, fixture or main-source edit occurs.
