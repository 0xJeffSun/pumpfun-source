# BuyV3 preparation and short-growth source contract

The two original functions close a concrete preparation dependency: fund rent for
`max(current data length, 166)` first, then grow a shorter account to 166 bytes
using `AccountInfo::realloc(166, false)`. Growth does not reload the decoded curve,
write its fields, serialize it, zero its new tail explicitly, or emit an event.
A minimal source proposal now expresses this complete preparation sequence and
the separate rent/fee helpers. It is a patch against the **unaccepted partial
composition**, not a patch for main and not a complete BuyV3 replacement.

No build, target execution, new transaction, fixture, compiler variation or main
source change occurred. The 117 saved BuyV3 rows, including all 105 successes and
all Token-2022 base owners, remain exact preservation requirements. The inherited
domain fences remain untouched; consequently this proposal still cannot claim to
preserve those successes. No compatibility mux or fallback is introduced.

## Inputs and identities

The unmodified original allocation is 10,485,715 bytes with SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
Selected inputs come from the sealed public `buy-v3-authentic-partial-composition`
package; its seal and selected-member hashes are retained. Current main's 37
input hashes are bound to the accepted `2aa18c` metadata checkpoint, but no
candidate instructions were analyzed or built here. The actual source-level
proposal is limited to `source/admission.rs` in that prior composition.

`closure-ledger.json` recomputes four complete/bounded original windows and all
15 unique direct target windows relevant to preparation, including raw
instructions, actual signed-relative calls, relocations, branches and data.
Original inferred entry boundaries are not asserted historical function names.
No normalized binary or executable byte patch is produced. Locked public
`solana-account-info 2.3.0`, `solana-rent 2.2.1`, `solana-program-error 2.2.2` and
`anchor-lang 0.31.1` archive checksums and selected source members provide concrete
API correspondence; these are the current accepted dependencies, not proof of the
historical build graph.

## Caller and sequencing

At `0x147bc8`, BuyV3 obtains the admitted context from `context+8`. It passes the
boxed decoded curve from `accounts+0x28`, System field at `accounts+0x70`, and payer
field at `accounts+0x40` to `0x147c08 -> 0x3cd50`. These field identities agree with
the retained typed context/crosswalk, not merely nearby strings. The result tag
must equal 2 at `0x147c18`. Failure reaches the existing return path; it cannot
continue to mode checks or amount selection. Only success reaches mode-preflight
call `0x147c50 -> 0x7e0b0`. That target is an opaque boundary in this task.

The preparation entry `[0x3cd50,0x3d250)` is 1,280 bytes:

1. It clones the curve's AccountInfo and increments both Rc strong counts, with
   overflow-abort paths retained in the raw ledger. `0x3ce88 -> 0x1a2a68` reads
   `data_len()`. Both counts are decremented at `0x3ce98..0x3cf10` before rent.
   Weak-count cleanup on the zero-strong-count branch is retained. The temporary
   immutable RefCell borrow ends inside `data_len`; it is not held during CPI.
2. `0x3cf20` compares length to 166 and passes the greater length, or 166, in r5
   to `0x3cf48 -> 0x3d250`. Both short and already-long accounts take this call.
3. At `0x3cf60`, rent failure propagates. Success then skips growth when the
   original length is greater than 165 (`0x3cf70`). Long accounts therefore still
   receive rent preparation. The original length is retained across the call.
4. The short branch makes a fresh AccountInfo clone. `0x3d098` places 166 in r3;
   `0x3d0a0` places false in r4; `0x3d0a8` calls the full 472-byte realloc body at
   `0x1a2db0`. Success drops both Rc references and returns tag2. Failure passes
   the actual ProgramError through `0x3d198 -> 0x19bbb8`, then drops the same
   temporary references and returns the converted error. There is no reader,
   serializer, field-store, event or token-program call after resizing.

The minimal proposal uses separate `.to_account_info()` temporaries for the data
length, lamports and realloc calls. It does not keep the earlier proposal's single
clone alive across rent funding. All allocations remain within the admitted
runtime account; no manual raw-memory growth is proposed.

## Rent, reserve and transfer contract

The rent helper `[0x3d250,0x3dd78)` is 2,856 bytes. Its only currency decision is a
32-byte comparison of the **stored** quote key against zero at `0x3d2c0`. There is
no base-mint owner, Tokenkeg/Token-2022 program, whitelist or extension inspection
in either preparation function.

For a nonzero stored quote, reserved lamports are zero. For native stored-zero,
`0x3d318 -> 0xa2188` computes the accrued creator-plus-protocol fees using checked
addition. That 616-byte helper reads offsets `0x70` and `0x78` relative to the
decoded curve payload. Back in rent preparation, the word at curve-wrapper+0x60
(the already established real quote reserves) is added with overflow detection.
The first fee addition and second reserve addition both produce Overflow/6024,
but they are separate error construction sites. Their original source metadata
is respectively `programs/pump/src/lib.rs` line2562 and
`programs/pump/src/extend_account.rs` line141. The proposal preserves separate
natural error sites; it does not forge those original filenames or line numbers.
The two fee operands are commutative for the resulting scalar; a unique historical
Rust operand naming/order is not claimed solely from their machine offsets.

After successful reserve computation:

- `0x3d4c8 -> 0x1a0a20` gets Rent, propagating its error through the actual
  ProgramError conversion when needed.
- `0x3d598 -> 0x1a0ae8` calculates minimum balance for the passed target size.
- A temporary AccountInfo clone reads `lamports()` at `0x3d6c8 -> 0x1a29f0`.
  `0x3d6d0..0x3d708` computes `lamports.saturating_sub(reserved)`, and both clone
  references are released before constructing the transfer context.
- `0x3d798` skips transfer unless minimum balance exceeds available lamports.
  The deficit calculation retains saturating subtraction, although the branch
  establishes that ordinary arithmetic would have the same scalar value.
- The helper clones System, payer and curve account references, builds the
  ordinary `CpiContext`, and calls `0x3dc50 -> 0x19e090`. The retained locked Anchor
  transfer source constructs System transfer with payer then destination account
  keys and invokes with `[from,to]` and the context's signer-seeds slice. The
  caller supplies an empty signer-seeds vector: no PDA signer substitution or
  extra authority is introduced. The original 800-byte wrapper and all its
  immediate call sites are retained; transitive CPI/runtime internals are not
  newly proved by this source correspondence.

There is no independent owner, signer, executable, discriminator or PDA check in
these two preparation bodies. Those responsibilities belong to the prior typed
parser and the runtime/System CPI. Adding another owner gate or moving rent after
mode/amount checks would change the original operation order. A short-account
realloc error follows successful rent funding in the instruction; Solana's outer
transaction rollback, rather than a local refund branch, governs the failed
transaction. No new rollback experiment was run.

## Realloc's bounded source correspondence

The original `[0x1a2db0,0x1a2f88)` body begins with a mutable data RefCell borrow.
Its busy-borrow branch returns the encoded ProgramError form. On success it
compares existing and new length, then reads the original serialized length from
four bytes preceding the account key. `0x1a2e60` rejects an increase over 10,240.
`0x1a2e70` writes the serialized length at data-pointer minus8, followed by the
local slice length at `0x1a2e78`. Its branch at `0x1a2e90` gates optional memset on
r4; the preparation caller supplies zero, so this path is not selected. The
mutable-borrow count is released before return, including equal-size and
invalid-reallocation paths. These operations correspond to the retained locked
`AccountInfo::realloc` implementation, including AccountBorrowFailed and
InvalidRealloc conversion. The unusual encoded return discriminants are retained
as bytes and are not mislabeled as public custom error numbers.

The function uses already-decoded curve fields when reserving native balances.
It does not make an otherwise-invalid short account parseable. Current
`BondingCurve` decoding and historical old-layout admission remain a separate
prerequisite: the inherited fence `data_len()<166` stays in place. Removing that
fence before original short-layout parser behavior is closed would expose an
unproved path. This is an exact boundary of the source proposal, not resolution
of the whole BuyV3 handler.

## Preservation, remaining work and verification

The copied preservation ledger is recomputed from every complete saved Buy row.
It retains 117 rows, 105 successes, 12 failures, and all Token-2022 base owners.
The success groups remain 37 native, 37 Tokenkeg quote and 31 Token-2022 quote.
No row is removed, rewritten or accepted as a reconstruction rejection. This
source-only patch does not create evidence for those modes. The typed parser,
optional-fill scalar contract, mode preflight, quote-vault/user admission,
settlement, event/exit closure and all excluded implementations remain outside
this patch. Stopped sell_v2 transfer-fee/incentive work and old extension probes
were not reopened.

The first static script named `inspect.py` accidentally shadowed Python's standard
library module when argparse imported dataclasses. The file and complete traceback
are retained under `failures/`; renaming that utility corrected the tool conflict.
No target code was executed. The original raw objdump rendering numbers instructions
rather than virtual addresses; `closure-ledger.json` is authoritative and decodes
addresses and actual branch/call targets directly from retained bytes.

Run `python3 -B verify.py` in the publication directory or a separate copy. It
checks the seal, selected prior membership, public archive/source correspondence,
all raw windows/branches/callees, exact preparation-only patch, every retained
saved row, and the explicit non-integration flags. `--repo` optionally checks
current main source hashes. The copied-directory positive and tamper/missing
negative checks perform no program execution, build, signing or network access.
