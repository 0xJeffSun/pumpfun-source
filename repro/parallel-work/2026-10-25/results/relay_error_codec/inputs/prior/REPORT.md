# Donation relay fixed account wire parsers

Four standalone scratch Rust parsers are provided in `wire.rs`. They check exact account discriminators, accept lower-bound lengths and retain trailing bytes, validate state tags 0/1, and read the fixed wire fields. They are **pure wire parsers with local diagnostic errors**, not recovered historical source, Anchor-compatible error objects, or deployable handlers. No Rust/SBF build, execution, emulation or runtime probe was performed.

The accepted implementation checkpoint remains **8099031** (Pump92575cd, Fees e501ca2, AMM5a68db, Mayhem9e4e19). The prior relay inventory is the older dependency-function-gap baseline; it predates newer Pump/Fees candidates. No current core candidate inventory or implementation percentage is changed. Whole-byte recovery remains incomplete; inferred window boundaries do not prove recovered function identity. Prior outputs were read only. No excluded security directories or stopped probe lanes were opened.

## Frozen evidence and reproducibility

`inputs/deployed.so` is the unchanged 830,448-byte captured relay, SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. `inputs/idl.json` is retained IDL evidence, SHA256 `b075f7b39b019630067e5f6a67015396ccbd66d282c7da048753660506472d6c`. The prior codec and window ledgers are frozen solely as attribution/boundary evidence. `manifest.json` hashes every publication artifact except itself. Mutable CLI telemetry is neither copied nor sealed.

All ranges below are decimal half-open ELF byte offsets. `static-evidence.json` has every complete wrapper/body instruction, selected complete error-helper windows, raw descriptor bytes, individual operand assertions, exact hashes and call PCs. `complete-windows.txt` is the corresponding readable opcode ledger. These are re-decoded directly from the raw ELF by `analyze.py`, not copied disassembly snippets. Data descriptors are preserved raw; relocations and final pointer representations are not presumed solved.

Run `python3 verify.py` in a copy of this entire publication directory. It uses Python standard-library static analysis only, checks all hashes, re-derives the instruction ledger and asserts the branch/load/call operands supporting this report. It has no absolute parent paths or external dependencies. It checks Rust discriminator/length literals but does not parse or compile Rust or prove handwritten semantic equivalence. A copied-directory run is recorded in `verification.json`.

## Fixed account contracts

| IDL account | Checked wrapper | Body | Minimum bytes | Discriminator hex |
|---|---|---|---:|---|
| DebouncerV1 | [505216,506304) | [506304,507440) | 82 | 8989c04d6eb8bd1c |
| DistributionV1 | [507440,508560) | [508560,509800) | 98 | e4af7289a5120b0e |
| EpochTrackerV1 | [509800,510920) | [510920,512088) | 90 | 820c32e2aa6da09b |
| SwapReceiptV1 | [513680,514800) | [514800,515416) | 49 | e6ee2c1cfc1b42de |

For the first three, bump is [8,9), state [9,10), config_id [10,42), mint [42,74). Debouncer total_amount is little-endian u64 [74,82). Distribution epoch is little-endian u128 [74,90), total_amount u64 [90,98). EpochTracker current_epoch is u128 [74,90). SwapReceipt has bump [8,9), distribution pubkey [9,41), output_amount u64 [41,49); it has no state tag. Field names/types are IDL attribution corroborated by the complete decoder loads; they are not recovered original Rust symbols.

The state loads are at 506376, 508632, 510992. Branch pairs at 506392/506400, 508648/508656, 511008/511016 accept 0 and 1 and divert other bytes before checking later field lengths. Lengths 8 or 9 fail earlier. The original stateful body error tag uses byte 2 at output offsets 73/89/81 respectively; success writes the decoded state at that slot. These are internal output representations, not input byte offsets or portable Rust layout guarantees.

The lower-bound subtract/unsigned-less-than pairs are explicitly asserted in the JSON. Debouncer checks remaining lengths after offsets 10,42,74 against 32,32,8; Distribution adds the 16-byte epoch and 8-byte amount checks; EpochTracker ends with the 16-byte epoch. SwapReceipt checks len-8 >=33 and len-41 >=8. Complete bodies contain no final equality/exhaustion requirement and no input-slice cursor write. The scratch API returns the unused suffix as a convenience; it does not claim the original returned that slice.

Parser check order is discriminator availability, discriminator equality, then body fields in wire order with state checked before later short fields. Thus a wrong discriminator takes precedence over a short body; an available invalid state takes precedence over missing later body bytes. The local `WireError` values describe these parser decisions, not original numeric codes or resource-failure precedence. Bump values are unrestricted here. State names `Zero`/`One` deliberately make no business-state admission claim.

## Original error construction traced, ABI deliberately not implemented

Each checked wrapper first compares input length with 8, then loads and compares the discriminator constant. Short-discriminator branches set r2=3001 and call [665312,665904): call PCs 506000,508240,510600,514480. The two returned words are copied into the account-specific output, with error tag 2 for the three stateful accounts or tag 1 for SwapReceipt. The unchecked bodies instead branch on len<8 to a call at their last instruction to [730592,730600), which directly calls 741976. This panic-oriented edge is unreachable through the checked wrapper and is not exposed by the scratch API.

Mismatch paths are longer than returning a scalar 3002. At 505312/507536/509896/513776 they call [662256,665312) using the numeric constant at [754648,754652), which is 3002. They also call [665904,668456), assemble stack fields including an explicit 3002 store at 505592/507816/510176/514056, attach the embedded account source path/line metadata, and call [652392,652528). They then allocate/copy the account name and update the returned object before setting the account error tag. Both formatting failure and allocation failure edges remain in the full windows. These source paths and diagnostics are evidence, not permission to fabricate matching source coordinates.

Short-body branches converge at 506448,508704,511064,514936. They load descriptor address 772768 and call [705216,705560), preserve its result, then set r2=3003 and call [665312,665904). Before returning that numeric-error object they inspect low tag bits of the prior helper result and conditionally perform an indirect cleanup call (506616,508872,511232,515096). Therefore constructing a literal Anchor error or returning an integer is not an exact translation.

Invalid states enter [507208,507408), [509568,509768), [511856,512056). Each builds formatting arguments referencing the rejected byte and descriptor 773288, with a callback address 31632. Calls at 507368/509728/512016 enter [712408,713000); r1 is then set to 20 and calls at 507392/509752/512040 enter [30840,31136). That helper allocates 24 bytes and calls 707248 with descriptor 773096. The body then joins the short-body path *after* its initial helper call, preserving the formatted object for the same cleanup and 3003 construction. The intermediate 20 is not claimed as the outward program error code.

The shared [665312,665904) builder preserves the incoming code in r7, calls the two string/formatting helpers, requests allocation size 160/alignment 8 via 566472 at PC665640, and has a failure call to 712256. It writes 2 at object+0, string-related triples at +32..+72, the supplied code as u32 at +152, byte 2 at +80, and returns output words 0/pointer at +0/+8 (PCs665800/665808). These stores are verified raw facts. They do not establish every object field's meaning, Rust enum identity, relocation-resolved vtable, complete formatter/destructor behavior, allocator-failure behavior, or the eventual caller's external error conversion. Full error ABI parity is **not recovered**.

## Explicit gaps and non-goals

MintWhitelist is not extended and no variable-length parser is shipped. Its [513224,513680) decoder and [60320,61568) vector helper remain prior evidence only; complete allocation/growth/error behavior is not proved here. Original source revision, compiler/dependencies, instruction account policy, serializers, handler semantics, complete error call closure and runtime acceptance remain open. No count of assertions or covered windows is semantic/security proof. No main repository edits, commits, pushes, external chats, network calls, chain calls or additional workers were made. Parent retains publication authority.
