# BuyV3 whitelist and alternate-mode continuation

This packet supplies an uncompiled, unintegrated Rust continuation for the whitelist path and the alternate fee-threshold input. It does not broaden main's admission fence or claim any new transaction coverage. All 117 prior BuyV3 rows remain obligations. No build, typecheck, target execution, new fixture, network request, signer workaround or main edit was performed.

The key new finding is that original `0xa23f0` is **not merely a validator**. After two real token-account reloads, it may write a newly calculated and capped `virtual_quote_reserves`. Its checked arithmetic produces origin-free Pump Overflow **6024**, while its u128-to-u64 narrowing produces Anchor InvalidNumericConversion **4102**, not Pump Truncation 6025. The new source uses actual typed `reload()`, ordinary Rust checked arithmetic and `try_into()?`; it has no successful runtime callback, cached-amount substitute, source-line spoof or handwritten extension implementation.

## Inputs and methods

The complete public B5 fee-mode and B6 settlement packages are preserved in `prior/b5` and `prior/b6`, with original manifests unchanged. Original full Pump allocation SHA-256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. The B5 retained candidate is `2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`; its unstripped artifact is `78cbc62e21a5df9f16ee346f0609441168f52088157bc601851d10e7e3cf757d`. This is a frozen comparison artifact, not a claim that it remains current main.

The fresh ledger contains 32 entry-bounded windows and 168 direct-call sites, with 20 outside-frontier targets. Five caller slices bind input roles and order. Every selected assembly is regenerated from the ELF; branch labels in older assembly are not trusted. Actual signed displacements and relocations govern. A relocated call is classified before any direct-target calculation. Immediate callees, all relocated data prefixes, imported/indirect calls and unresolved outgoing edges are retained. Bounded 64-byte prefixes do not prove complete data-object or vtable extents.

Most function ends are inferred from the next actual entry reference, not historical symbols. `0x1ab8e8` is a relocated function-pointer target rather than a direct-call entry: its branch-free formatter ends at its `exit` at `0x1ab910`, giving extent `[0x1ab8e8,0x1ab918)`. Using the next direct entry would include adjacent functions. This boundary correction and the initial missing-entry lookup are recorded, not hidden.

## Exact input and effect order

The comparison at `0x83f88` passes the user key and **Global wrapper+0x288 (648 decimal)** to the memcmp wrapper. This is `Global.whitelist_pda`, corroborated by the retained Global serializer/decoder account contract. B6's unprefixed prose “+288” must be read as hexadecimal; decimal 288 is not the observed operand. Fee exemption uses the same field earlier at `0x7fe80`. It does not bypass parsing, constraints, fees' early checked account decode, or normal signature requirements.

After first-leg reserve mutation and a successful combined base transfer, whitelist equality branches `83fa0 -> 84468`. The sequence is:

1. `84490 -> 7890` reloads the base-vault typed token account. The saved pointer derives from context+0x30 and is also the source of the preceding base CPI.
2. Only on success, `844d0 -> 7890` reloads the user's base typed token account, context+0x48, the destination of that CPI.
3. The caller copies the current curve quote key (wrapper+0x28..+0x48), reads **newly reloaded** amounts at both token wrappers+0x68, and calls `84578 -> a23f0`. Arguments are return pointer, mutable decoded curve, vault amount, user amount, quote-key copy.
4. The helper has a `Result<()>`-style return: success tag2, no meaningful returned quantity. Success tag2 takes `84588 -> 83fa8`, the same zero-user-volume initialization as nonwhitelist. Failure exits before that initialization, first/second fee accrual, quote funding or event calls. The curve's first-leg writes and base CPI occurred earlier; transaction rollback remains a runtime premise, not a claim that these earlier effects commit on failure.

The reloads are not skipped because the inner helper will return early. This includes a complete curve or a curve with alternate mode false. `InterfaceAccount::reload` delegates to the real `Account::reload`, which fallibly borrows account data, deserializes the typed account and replaces its decoded value only on success. Original `7890` exhibits that borrow/decode/replace/release sequence. The first reload is already complete if the second fails; no simultaneous data borrow or stale pre-CPI balance is substituted.

The copied pinned Anchor source and existing anchor-spl TokenAccount excerpt support these APIs. The token reader remains an external library contract; no extension branch is reimplemented or newly tested here. Account owner/authority/program admission remains upstream. There is no new signer or CPI in this continuation.

## Alternate-mode adjustment body

The following are **decoded** BondingCurve offsets: virtual base+0x40, virtual quote+0x48, real base+0x50, real quote+0x58, total supply+0x60, complete+0x99, alternate mode+0x9a. Account wrapping adds eight. The first five fields are independently bound to their serializer loads, so source field names are not guessed from native Rust declaration order. The quote key supplied by the caller is the stored key; zero means native denomination here, not merely a supplied WSOL mint.

`a23f0..a2880` returns success immediately if complete is nonzero, then if alternate mode is zero. Otherwise:

```
twice_supply = checked_u64(total_supply * 2)
outside_curve = checked_u64(twice_supply - reloaded_vault_amount)
circulating = checked_u64(outside_curve - reloaded_user_amount)
```

Overflow/underflow at these three ordered steps calls `15dc90` with enum ordinal24. That converter adds 6000 and constructs an Anchor error without source-origin or compared-value additions. The retained static formatter selection binds ordinal24 to `Overflow`. No extra amount or user guard is inserted.

Next, return success without a reserve write if real_quote < **10,000,000 for stored-zero quote**, or < **1,000,000 for nonzero quote**. Only after this quote threshold passes does it check circulating < **1,000,000,000,000**, which also returns success. These are raw units; no decimal interpretation is inferred.

On the remaining path, compute:

```
expanded = u128(circulating) + u128(virtual_base)
numerator = checked_u128(expanded * u128(real_quote))
quotient = checked_div(numerator, u128(circulating))
new_virtual_quote = try_u64(quotient)
```

Widening **before** addition matters: the original explicitly carries the sum's 65th bit into its u128 multiplication. A checked-u64 addition would introduce a false rejection. Product overflow maps to 6024. The divide-zero branch also maps to 6024, even though it is unreachable after the positive circulating threshold under the ordinary arithmetic premises. Source uses `.ok_or(PumpError::Overflow)?` for both, preserving that mapping rather than inventing DivisionByZero.

The quotient's nonzero high limb calls `19bd08`, which stores **4102** and formats through the leaf at `1ab8e8`. Its exact message is `out of range integral type conversion attempted`. This matches the retained Anchor `From<TryFromIntError>` implementation with no origin and no compared values. The source therefore uses `let virtual_quote: u64 = quotient.try_into()?;`. This is not an interchangeable `.map_err(|_| PumpError::Truncation)`.

Only after successful conversion does it cap the value: **2,000,000,000,000 for zero quote**, **160,000,000,000 for nonzero quote**. The resulting value is stored at decoded curve+0x48 (`a2838` or `a2870`). There is no write to virtual base, real reserves, total supply, complete or user state in this helper. The source repeats the quote-key comparison for cap selection, matching the two observed comparisons rather than treating a supplied mint as the selector.

## Fee-threshold mode selection

Original `a08f8` first rejects zero virtual base with 6026 and an origin. With mode zero it reads the actual mint supply; with mode nonzero it reads **curve.token_total_supply** from decoded+0x60. Both then compute floor(selected_supply * virtual_quote / virtual_base) as u128, before the fee table's length gates. No mint burn/supply update is implied by selecting this input.

`source/fee_mode.rs` makes that concrete selection in B5's existing wrapper and adds the natural origin-bearing zero-base guard before reading either supply. It preserves whitelist's four-zero return, early FeeConfig decoding, AccountInfo clone/length-read lifetime, the unchanged selector and the two pretrade call sites. The selected supply is passed through the older `Pretrade.mint_supply` field; its name is not an assertion that it always came from the mint. The original function name is retained for compatibility with the frozen draft.

The curve used for fee selection is **pretrade**. The whitelist adjustment happens only after base transfer; its new virtual quote value must not retroactively recalculate either fee leg. Alternate-mode buyback-zero/full-protocol accrual remains the already-recorded B6 contract; this packet does not duplicate that implementation or alter ordinary-mode fees.

## Concrete source integration and boundaries

The two source files and `source/proposal.patch` are the deliverable. The fee-mode diff targets the frozen unaccepted B5 fragment. Include `whitelist_continuation.rs` alongside it, and insert `buy_whitelist_after_base_transfer(a)?` **after successful combined base CPI and before common zero-user-volume initialization**. The helper's guard and reloads supply the actual missing application path; no permissive callback or fake framework success is required.

This is not an apply-ready main patch: current main's dedicated context/full authentic BuyV3 body are still incomplete. Do not delete the admission fence to make these helpers reachable. The fields/types are those of the retained typed parser proposal and BondingCurve source. Rust lifetime/type correctness has been reviewed statically but not compiled. Macro expansion, error allocation/drop equivalence, historical dependency/compiler identity and all transitive library behavior remain unproved. Source-origin bytes for the new fee guard naturally differ; none are forged.

The candidate's PumpError conversion has a unique complete normalized-body match at `0x12a598`, but its raw call/data addresses differ and complete downstream identity is not claimed. The adjustment, reload, threshold and integer-conversion helper do **not** have complete normalized symbol-body matches in this candidate. This is positive source evidence plus an honest current byte gap, not evidence that accepted main already implements this path.

All 117 saved rows (105 successes, 12 failures) and their Token2022 base owners remain mandatory preservation obligations. These old receipts are not tests of the new source. No new success, rejection, authority fixture or signature is constructed. Present quote descriptors, token-extension implementations, B7 trailing adjustment, excluded initializers and other stopped lanes remain outside scope.

Run `python3 -B verify.py` in a separate copy, optionally with `--repo /path/to/repository` to rebind public inputs. The verifier checks both original seals/117-row ledgers, exact source transformation, pinned archive membership, raw assembly, encoded call/branch targets, error fields, constants, serializer offsets and candidate comparison results. It does not execute the Rust proposal or any ELF. Tests exercise the artifact verifier, not the program. There are no cache files in this package.
