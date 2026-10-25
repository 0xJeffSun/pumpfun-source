# Route FeeConfig decoding and selector contract

Static prerequisite closure for the decoded field mapping and admitted selector numeric decisions; **conditional**, not complete operational/error-object closure. No source patch. This result connects the route context reader to serialized FeeConfig and supplies the selector contract for every quote comparison branch without following any instruction handler outside the admitted route. Allocator failure, error-constructor/formatting internals, memory validity and runtime termination remain explicit dependencies.

Checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. Original Pump ELF SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. All hexadecimal ranges are half-open ELF file offsets. `windows.json` records exact disassembly source lines, full-object Git/SHA256 identities and byte ranges. Labels here are descriptive, not original Rust symbols; boundaries are inferred, not symbol-table declarations. Encoded offsets control, not LLVM's displaced angle-bracket annotations.

## Admission chain

The unchanged `pump_route_depth` report establishes discriminator `e19a7516d756f667`, dispatcher `0x11ca08 -> 0x1295c0`, and wrapper `0x129888 -> 0x567d8`. We consume that identity, not its saved runtime observations. Wrapper account parsing at `0x1296e0..0x129750` calls `0xdb958` at `0x129728`. Thus the following reader is admitted as this route's context parser, before following its second reader.

`0xdbb08..0xdbb48` calls `0x133e0` at `0xdbb20`; the failure annotation uses the ten bytes `fee_config` at `0x1b7491`. Success copies 0x90 bytes into r9 at `0xdbc40..0xdbc80`. Context success stores r9 at context+8 (`0xdd2b0`) and Global wrapper r8 at context+0 (`0xdd2b8`). This binds the exact pointer consumed by the inherited route body, not a similarly named account in another instruction.

Reader `0x133e0..0x134a8` checks remaining account count, consumes one 48-byte AccountInfo, and calls `0x92d0` at `0x13498`. No account: constructor argument 3005 (`0x13410`). `0x92d0..0x96d0` checks owner against the two exact 32-byte constants saved under `data/owner_*.bin`; mismatch enters 3007 at `0x9378`. The first-owner match calls the opaque account-state predicate at `0x9480`; false enters 3012 at `0x94a0`. The other-owner match goes directly to borrowing. These are byte comparisons, not a newly certified deployment/program ownership model.

`0x94e0 -> 0x1a2ca8` borrows data. It rejects unsigned borrow state >`0x7ffffffffffffffe` with tag `0x800000000000000b`; success increments the count, returns tag `0x800000000000001a`, pointer to the data slice at +8 and borrow-counter pointer at +16. The account reader maps failure through its opaque existing conversion at `0x95f8`. Success extracts serialized `(pointer,length)` at `0x9520..0x9538` and calls `0x1156f0` at `0x9560`. Successful wrapper construction copies decoded bytes without adding eight: output +0/+8/+16 receive decoder +0/+8/+16; +0x18..+0x88 receive the subsequent 0x70 bytes; +0x88 stores AccountInfo (`0x9640..0x96b0`). The borrow count is decremented on this success path at `0x96b0..0x96c8`; error cleanup is not generalized here.

## Discriminator and exact wire layout

`0x1156f0..0x1159d8` requires length >=8 (otherwise constructor argument 3001 at `0x115850`) and compares the first eight bytes with `8f3492bbdb7b4c9b` (`0x115718`). Mismatch enters numeric constructor path 3002 at `0x1158f0`, annotated `FeeConfig` from `0x1b7a3f`. Match calls payload decoder `0x1159d8` at `0x1159c8`. The payload helper itself includes a checked eight-byte slicing guard (`0x1159e8..0x115a18`); it is unreachable for an admitted successful discriminator check. No successful decoder branch tests total length against 2512, 4072 or 4096.

Let n and m be the two little-endian u32 vector counts, and `p=69+40*n`, `q=p+4+40*m`. The serialized account is:

| Wire byte range | Meaning | Decoded/wrapper byte range |
|---|---|---|
| 0..8 | discriminator | not stored as a discriminator |
| 8..9 | bump | 0x80..0x81 |
| 9..41 | admin pubkey | 0x30..0x50 |
| 41..49, 49..57, 57..65 | flat LP, protocol, creator u64 bps | 0x50, 0x58, 0x60 (eight bytes each) |
| 65..69 | first count n | vector length at +0x10 |
| 69..p | n records, 40 bytes each | allocation pointed to by +8 |
| p..p+4 | second count m | vector length at +0x28 |
| p+4..q | m records, 40 bytes each | allocation pointed to by +0x20 |
| q..q+24 | exotic LP, protocol, creator u64 bps | +0x68, +0x70, +0x78 |

Minimum successful parsed prefix is `97+40*(n+m)` bytes, subject to allocation and readable memory. Trailing bytes are accepted; no end-of-input equality check exists here. Names are corroborated by exact, bounded `FeeConfig`, `FeeTier`, `Fees` type-object excerpts from the checkpoint's upstream Pump JSON. These names do not establish historical symbols; the offsets come from original loads/stores (`0x115a60..0x115b78`, `0x115c70..0x115d88`). The disassembly/source excerpt line ranges and hashes are machine-readable.

The first vector is `(capacity,pointer,length)` at wrapper +0,+8,+16; second at +24,+32,+40. A decoded record preserves the wire layout: threshold u128 at +0/+8, LP rate +16, protocol rate +24, creator rate +32. AccountInfo is +0x88. **Here wrapper+8 is the vector's heap pointer field. It is neither the serialized slice nor an extra eight-byte discriminator prefix.** The other account types' wrapper+8 conventions cannot be applied to FeeConfig. Selector r4 is this wrapper, whereas r2 is decoded Global and r3 is decoded BondingCurve (inherited account package).

## Checked cursor and length behavior

Payload decoding checks bump/admin availability (33 bytes after discriminator), then each of three flat u64s. All short-prefix branches target `0x115d90`; they enter constructor argument 3003 at `0x115dc0`. After flat fees, a local mutable cursor starts at serialized+65. Both calls (`0x115ba0`, `0x115c08`) target vector reader `0x112f0`. Failure of either maps into that same payload 3003 path, with existing opaque error destruction/conversion behavior preserved. There is no zero-default substitution on malformed or absent vector/trailing fields.

Vector `0x112f0..0x11758` requires four count bytes before advancing cursor by four (`0x11300..0x11330`). n=0 succeeds with `(0,8,0)` at `0x116f0..0x11708`; 8 is an aligned empty-vector pointer sentinel, not account data. For n>0, initial capacity is min(n,102), with an eight-aligned heap reservation of 40*capacity (`0x11388..0x11448`). 102 is an allocation hint, **not** a maximum admitted count. Each record checks 16 bytes for its threshold, then 8/8/8 for rates (`0x11518..0x11608`), advancing the local cursor after each successful component. Insufficient bytes return tag `0x8000000000000000` and an opaque error value at +8 (`0x11668..0x116e8`). Successful records are copied without sorting, rate caps, threshold monotonicity validation or arithmetic conversion (`0x11480..0x11510`). Success returns actual length at +16 (`0x11710..0x11740`).

When length equals capacity, call `0x11630 -> 0xe2e8` grows storage. The admitted growth wrapper checks capacity+1 wrap, selects max(2*capacity,capacity+1,4), gates the 40-byte layout bound using `0x333333333333334`, and calls allocation dependency `0xd878` at `0xe400`. Error arm enters `0x1ab198` at `0xe428`; success updates capacity/pointer (`0xe430..0xe448`). Initial heap exhaustion enters that same target at `0x11750`. Full allocation semantics/termination are not recovered; valid successful allocation is a precondition for the layout theorem. Inferred vector boundary ends at that terminal dependency, excluding adjacent routines. Exploratory extent overshoots were trimmed and are not interpreted or sealed.

After both vectors, `0x115c38..0x115c60` rejects remaining lengths <24: it first tests <8, then masked floor-to-eight lengths equal to 8 or 16. The three exotic words are loaded without advancing the caller's original slice (`0x115c70..0x115c90`). Cursor progress above is local decoding state, not a promise that the external serialized slice is updated on error.

## Complete admitted selector decision and numeric contract

Assume decoded/readable FeeConfig, Global and curve; supplied serialized account length L; threshold T an unsigned two-limb integer; amount A a u64. The inherited caller proves L comes from AccountInfo data length, including discriminator. Its ordinary threshold is floor(base-mint supply * virtual-quote reserve / virtual-token reserve), conditional on positive divisor and the imported arithmetic contracts. This package does not generalize the excluded mode that produces T.

1. L<2512 enters constructor code 6097 (`0x89ed8..0x89ff8`, `0x8a268`). This precedes all quote and table selection.
2. Compare curve.quote_mint (decoded +0x20) against zero, then exact constants at `0x1b5cc8`, `0x1b5a88`. Any equality selects first vector `(wrapper+8,wrapper+16)` (`0x8a060..0x8a128`, `0x8a2e0..0x8a318`). Exact nonzero constants are preserved in `data/quote_1.bin` and `quote_2.bin`; no unsupported currency-name inference is required.
3. Otherwise equality with exact constant `0x1b5d28` selects the second vector when L>4072; L<=4072 substitutes pointer=8,count=0 (`0x8a128..0x8a168`, `0x8a4f8..0x8a530`). Thus this old-length branch errors as an empty table even if the decoded second vector is nonempty. It does not fall back to the first vector or flat fees. This is a selector-only branch, not an excluded instruction handler.
4. Otherwise, choose exotic record when L>4096 AND any of its three u64s is nonzero; otherwise choose flat record (`0x8a168..0x8a1f0`). A nonzero exotic LP word alone enables exotic even though LP is not returned or charged by this selector. Return rates P=record+8, C=record+16.
5. Vector selection (`0x89b48..0x89ec8`): empty count enters 6096 at `0x89df8`. If T is less than first threshold, select first immediately. Otherwise scan backwards for the last record whose threshold<=T; fallback is first. Compare unsigned high limb first, low on equality. This is not 'greatest threshold' for unsorted input; duplicate thresholds favor the last qualifying record only after the first-threshold gate. Protocol/creator rates come from record +24/+32. LP +16 is ignored. No 10000-bps cap is imposed.
6. Override C iff Global+0x436 is nonzero and curve+0x68 is nonzero (`0x8a368..0x8a3a8`). Prior account provenance identifies these as creator_fee_configurable and creator_fee_bps. This applies after **every** successful selection branch.
7. Compute Fp=ceil(A*P/10000). If Fp>=2^64, enter imported fee narrowing error 6025 and forward it. This precedes checking whether creator is zero (`0x8a3a8..0x8a3f0`). Compare curve bytes +0..32 with zero: if equal set Fc=0; otherwise compute Fc=ceil(A*C/10000) with the same narrowing error (`0x8a3f0..0x8a4a8`). The returned C is retained even when Fc=0.
8. Success `(tag=0,Fp,Fc,P,C)` at offsets 0,8,16,24,32 (`0x8a4a8..0x8a4d8`). Selection errors forward `(tag=1,payload_word0,payload_word1)` at 0,+8,+16 (`0x8a338..0x8a368`); fee errors preserve their two helper words under outer tag=1 (`0x8a4d8..0x8a4f8`). Do not invent serialized Anchor-error bytes from numeric constructor arguments.

`pump_route_wide/CONTRACTS.md` is consumed as a **manual mathematical proof ledger**, not automated proof. Its exact u64-by-u64 multiplication and checked ceil establish the fee formula above, including why intermediate u128 ceil overflow is unreachable for u64 A/rate and denominator 10000. The verifier does not prove that ledger or re-run fee algorithms. Selector errors precede the route's flag masks, as already established in the arithmetic package; flag zero does not bypass selection or fee narrowing.

## Residual obligations and publication boundary

The serialized-field/selector mapping prerequisite is closed under explicit memory, allocation and imported numeric contracts. Total operational closure is not claimed: prove allocator/growth/heap failure and terminal-call behavior, account-state predicate, error-object constructors/formatting/destruction, generic memory-copy/comparison dependencies, and all relevant borrow/error cleanup before claiming an exact all-input runtime error ABI. Context's remaining constraints/PDA derivation are retained as evidence but are not newly certified; reader identity is not full accepted-account validation. No source patch is justified from this conditional result alone.

All unrelated route effects remain as prior obligations: quote-vault validation/creation, transfer/CPI authority, native settlement, fee accrual/events, completion and mode-specific threshold production. The partial-types trade chain remains **buy_v3**, not legacy buy. No excluded sell_v2 body, incentive handler, Mayhem initializer, unintegrated v3 extension lane or Metaplex runtime probe was followed. No new fixtures, runtime, network, chain action, signature work, build, binary/source patch, parent write, staging, commit or push occurred. All four whole-byte comparisons remain false; 140 bounded implementations/five partial/five unrecovered is unchanged. Saved tests, this manifest and verification do not prove exhaustive semantics or security.

Run `python3 verify.py`. It checks exact inventory/hashes, whole copied Git blob identities, copied subsets against unchanged predecessor seals, original instruction-byte agreement, direct admitted calls, selected guards and wire metadata. It does not execute SBF, emulate decoding or generate test fixtures. Full-object identity was checked while extracting frozen blobs; a portable slice cannot independently establish its association with an absent full ELF/Git object. Copy-directory verification outcome is outside the seal at `../verification-outcome.json`.
