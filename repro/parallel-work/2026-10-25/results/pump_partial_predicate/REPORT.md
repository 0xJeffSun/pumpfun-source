# Pump partial-fill predicate: static follow-through

**Disposition: partial static closure; no source patch.** The account object can now be tied through the dispatch parser to the BondingCurve discriminator, and its serializer maps `+0x58` to the third reserve u64 (`real_token_reserves`) and `+0xa2` to the byte serialized as `is_mayhem_mode`. The latter is not an ordinary-SOL predicate. The comparison on the alternate path consumes an account key and another parsed object's `+0x288` bytes, not the curve's quote-mint slot. Their complete producer/type attribution and legacy token-program restriction remain unclosed. Consequently this package does **not** establish a correct ordinary legacy SOL replacement for ignored `partial_fill`.

This is new static evidence, not a repeat of the prior receipt summary. No receipts, fixtures, runtime probes, builds, signatures, binary changes, source patches, commits or parent edits were made. Work follows the prior report's prerequisite, retaining its no-unconditional-min conclusion. All parent inputs are tracked blobs from `517d77db988d8c63b6cf476f0be138c5a4f3128a`. `provenance.json` records full SHA256, Git blob IDs, full lengths and exact half-open consumed byte ranges; copied excerpts remain byte-exact. Original ELF SHA256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.

## Object identity and layout evidence

All addresses below are original virtual addresses, with half-open ranges. The original disassembly's printed branch annotations are unreliable; use encoded relative offsets. No historical function name is inferred merely from a window boundary.

1. At `0x128808`, the dispatch wrapper calls `0x102578` with result pointer at wrapper stack `-0xc0`. The wrapper copies its first two words and following `0x9a` bytes to `-0x170` at `0x128810..0x128898`, and puts that pointer in Context `+8` at `0x1288d8..0x1288f0`. The body obtains this accounts pointer in r9 at `0x147bc8`, then its object pointer from accounts `+0x28`.
2. The parser calls `0x13048` at `0x102a78`. That helper consumes one `0x30`-byte AccountInfo entry and calls `0x8320` (`0x130b8..0x130f8`). `0x8320` borrows data and calls `0x9b148` at `0x85b0`. At `0x9b170..0x9b188`, that decoder compares against **17b7f83760d8ac60**, the BondingCurve discriminator. Its success decoders depend on remaining data length (`0x9b250..0x9b430`). Their defaults are not independently recovered here.
3. The account result is assembled at `0x8670..0x86f0`: decoder words go to account `+8/+16`, and a `0x8d`-byte region goes to account `+0x18`. The parser allocates/copies `0xa8` bytes (`0x102a90..0x102c68`), saves the allocated pointer at stack `-0xa78` (`0x102c50`), and places it at result `+0x28` (`0x105b18..0x105b28`). This connects the discriminator-checked object to the buy body's pointer. It does not certify all decoder variants or all account constraints.
4. The known original serializer `0x5a28..0x6158` writes the discriminator from ELF `0x1b64ef..0x1b64f7`, then reads object `+0x48`, `+0x50`, `+0x58`, `+0x60`, `+0x68` for five successive eight-byte writes. The third load/write is `0x5bd8..0x5c18`, establishing wire offset 24 for `+0x58`. Next it writes `+0xa1` as one byte, `+8` as 32 bytes, and `+0xa2` as one byte (`0x5cb0..0x5d70`): the latter is wire offset 81. Source `trade_types.rs:3..22` supplies the field names. This attribution uses actual serializer order, not Rust declaration order as an assumed memory layout.
5. All these writes call `0x19b548`. Its success path copies to writer base plus cursor and advances cursor by the copied count (`0x19b558..0x19b640`). Full requested-length equality is checked before returning success. Import relocation semantics for its copying syscall are not newly certified here. The retained public serializer-recovery document supports the existing serializer identity, without establishing historical compiler/source identity.

## Predicate and amount evidence

Let A be input r3, B the input boolean r5, R the object's `+0x58` u64, M its `+0xa2` byte, S selected amount and D residual. After prior validation succeeds:

| Condition | Encoded path result before later validation |
|---|---|
| M nonzero | `D=0`; `S=R` if B is true and A>=R, else `S=A` |
| M zero, A<=R | branches back to `0x147ce8`: `D=0`, same optional clipping gate |
| M zero, A>R, comparison low word zero | same `0x147ce8` path |
| M zero, A>R, comparison low word nonzero | `D=A-R`; `S=R`, bypassing B |

Evidence: `0x147c70..0x147d28`, `0x147e10..0x147e78`. The last subtraction is safe from underflow on that branch because the preceding unsigned comparison excludes A<=R. Zero selected amount takes `0x147e78`; selected amount greater than R takes `0x147d28`. S is saved at `-0x1f0`; D travels in r1 to r8 at `0x148098`.

The comparison's exact consumed operands are: 32 bytes loaded through `*(accounts+0x40)` then its `+0` pointer into stack `-0xa8`, versus `( *(accounts+0) )+0x288`. `0x1b3678..0x1b36b8` initializes a result word, passes its address to an imported call, and returns that signed 32-bit word. The caller tests only zero/nonzero. The imported call's name/contract and both semantic key identities are not fully established here. Neither operand is a direct load from BondingCurve quote-mint memory `+0x28` identified by the serializer. Calling this comparison an ordinary-SOL test would overstate the evidence.

## Downstream evidence and exact limits

| Direct helper | Grounded dataflow / consequence | Still unclosed |
|---|---|---|
| `0xa0070` | At `0x148248..0x148278`, r2=object+8, r3=S. Loads helper-relative `+0x48/+0x40`, hence object's virtual quote/base slots. It rejects base<S and base==S; subtracts S at `0xa03c8`, invokes wide arithmetic and adds one with carry at `0xa03f0..0xa0428`. Caller rejects a nonzero high word at `0x1482a0..0x1482e0`. | Transitive wide multiply/divide bodies and exact error precedence; formula is not independently certified. |
| `0x7fde8` | Receives accounts and first-leg low quote in r3 at `0x148300`. Repeats key comparison; equality returns zero result components (`0x800f0..0x80118`); other success path calls `0x89ec8` at `0x80180`. | Fee selection, component types and rounding through that callee. |
| `0x82128` | Only called for D!=0 (`0x1483a8` skips to `0x148538` otherwise). Inputs are r2=object real-quote slot, r3=other object+0x410, r4=accounts+0x30 object's +0x68; stack inputs include S and first quote. Entry checks r4>=S and checked-adds real quote plus first quote (`0x82250..0x82290`). | Global threshold, mint/supply attribution, mode branch and remaining arithmetic. |
| `0x82af8` | Receives r5=D and previous result in r3/r4. Entry compares result against D, forms their difference (`0x82b10..0x82b68`), and passes computed quote through `0x7fde8` at `0x82ff0`. Its output contains D at +0x28 (`0x83060`). | Wide quotient helper, output component meanings and residual fee basis. |
| `0x80df8` | Receives mode byte, other object+0x420, first-leg result components and optional residual pointer. Zero mode path uses 10,000 as divisor (`0x80e98..0x80ed8`); residual components are handled separately. | Rate identity, exact rounding and output component types across all success/error branches. |
| `0x81848` | Checked unsigned addition of r2+r3. Overflow is detected by sum<r2; success returns tag 2 and sum at +8 (`0x81848..0x818a0`). Caller compares that sum to saved max cost at `0x148688..0x1486a8`; excess enters the error path constructing 6002 at `0x148730`. | Upstream meanings of both addends; do not call this a fully proven quote-plus-all-fees formula yet. |
| `0x83c00` | Receives S in caller stack `-0x1000`. Optional residual data contributes stores to curve `+0x90/+0x98` at `0x840d0..0x84108`, corresponding via serializer to post_complete_base_out/post_complete_quote_in. | Full alias/liveness proof and transitive funding, transfer amounts/order, and overflow/error paths. |
| `0x859b0` | Called only after successful `0x83c00`; receives S in r4 and result pointers through stack. Contains completion-byte and reserve stores and logging/event-related calls. | Event payload types, ordering, all reserve changes, CPI/funding effects and transitive callees. No event identity is asserted from window location alone. |

The copied windows contain the full bounded evidence used above. Ends selected by the next known direct-call target are **inferred windows**, not proof of complete function boundaries; imported `call -1` sites are excluded from boundary selection. No unknown transitive handler was followed or assigned a historical name. No token-extension or stopped-handler body was analyzed.

## Concrete remaining prerequisite

Close the applicable length-dispatched BondingCurve decoders from `0x9b148`, including defaults. Follow the already identified dispatch parser producers of accounts `+0` and `+0x40`, and prove the corresponding object's `+0x288` layout through its own decoder/serializer. Bind its imported comparison and the legacy token-program/quote validation path before restricting this table to ordinary legacy SOL. Then close the named arithmetic, fee, transfer and event targets above using their call arguments and data dependencies. Only this combined evidence can select the correct partial-fill source change. Existing explicit-true above-reserve public evidence would then be needed for reconciliation; this package does not claim to have located such a witness.

Accepted `entry.rs` (source line 100) still discards partial_fill. `buy.rs` (source lines 114..180) uses requested amount throughout. No patch is included: even the newly grounded mode-byte identity does not establish which residual/funding/event consequences an ordinary SOL correction must preserve. Whole-file equality and exhaustive semantics/security remain unproven; none of the four original whole-file comparisons is reclassified.

Run `python3 verify.py` from any copy. It verifies the manifest, provenance hashes/full-input Git blobs, every copied instruction against ELF section bytes, specified call/branch destinations, register instructions and discriminator. It does not execute program bytes or prove semantic closure. Verification outcome is retained outside the publication seal in `verification.json` and summarized in `final.txt`.
