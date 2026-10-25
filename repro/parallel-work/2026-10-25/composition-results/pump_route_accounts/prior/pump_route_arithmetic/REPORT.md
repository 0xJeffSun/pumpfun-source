# Ordinary Pump route arithmetic continuation

This is a substantive **partial static result**, not a deeper-route implementation. No source patch is supplied. O1 is narrowed to specific transitive arithmetic, error-ABI and caller-data obligations; O3 now has both reserve directions and their exact field-check order. O2 and O4 remain open. Preserve the current route guards.

Checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Original Pump ELF SHA256: `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`; Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. `provenance.json` records full hashes, blob IDs and exact extraction ranges. All addresses below are original ELF file offsets, and interval ends are exclusive. Names below describe observed interfaces, not recovered historical function names. CFG extents are inferred from direct branch/fallthrough reachability; they are not symbol-table boundaries.

## Permitted identity and evidence boundary

The reviewed `pump_route_depth` package establishes `multi_hop_curve_swap` through discriminator, dispatcher and wrapper to body `0x5b3b0`. Its exact report, result, provenance, range metadata and manifest are retained under `prior/`; the source-package seal is recorded. The copied subset is checked against that seal. This does not claim verification of uncopied prior files or independently repeat the receipt experiment.

Before interpreting the new callees, their admission basis is the numeric/state ABI in that established body: `0x5ce20..0x5ce50` passes a result buffer, curve pointer, two rates and an amount to `0x806c8`; `0x5cf90..0x5cfb8` and `0x5d0e0..0x5d118` pass a result buffer and three scalars to `0x80488`; `0x5d138..0x5d160` passes result, curve and scalar to `0xa0838`. These are internal arithmetic dependencies, not instruction dispatch/wrapper entrypoints. The first two reference `programs/pump/src/trade_v3.rs` at `0x1b723b`; this path does not identify a historical function or authorize token-extension analysis. The buy adapter loads only reserve fields before forwarding to another numeric ABI. Fee selection at `0x89ec8` is the previously identified internal selector, not the Fees program handler.

Additional followed dependencies were admitted from those numeric calls: `0x88f90` receives amount/rate; `0x88908` receives two limb pairs; `0x880b0` receives limb pairs and reserve scalars; `0x89b48` receives a table pointer/count and a two-limb threshold. Buy reserve helper `0xa0bf0` is admitted by `0x5e050..0x5e078`, which passes the same curve pointer and two quantities as the already identified opposite reserve helper. No unrelated handler body was used. Whole bounded known-function windows can contain excluded branches; no holder, cashback, Mayhem or extension branch semantics are claimed here.

`asm/` contains exact instruction bytes checked against the frozen ELF, plus decoded absolute branch/call targets. LLVM's original `<.text+...>` annotations are section-relative; use the appended absolute targets. `data/` preserves 64-byte windows at directly referenced constants, including the two 32-byte quote constants at `0x1b5cc8` and `0x1b5a88`, error/source strings and formatting descriptors. These are context windows, not proof of all transitive descriptor reads. Dynamic account data is **not** invented: its pointer/offset dependencies are listed below and remain inputs to the contract.

## Producer/consumer map: rates are not fee amounts

Let selector result S be the caller buffer at `fp-0x6d0`. On success its tag is zero. Selector `0x8a4a8..0x8a4d0` writes:

| S offset | Producer | Consumer |
|---|---|---|
| +8 | first fee amount, from `0x88f90` at `0x8a3c8` | sell-side first subtraction input, masked by flag bit 0 at `0x5cf28..0x5cf50` |
| +16 | second fee amount, zero when curve's first 32 bytes compare equal to zero, otherwise `0x88f90` at `0x8a480` | sell-side second subtraction input, masked by bit 1 at `0x5cf58..0x5cf78` |
| +24 | first selected rate | buy budget r3, masked by bit 0 at `0x5cdd0..0x5ce00`; sell event-rate spill `fp-0xb18` |
| +32 | second selected rate | buy budget r4, masked by bit 1 at `0x5ce08..0x5ce18`; sell event-rate spill `fp-0xb20` |

The flag bits come from `0x5c480..0x5c498` (bit 0) and `0x5b448..0x5b470` (bit 1). Thus flag 0 masks both components, flag 1 retains only the first, and flag 2 retains only the second. Selector failure is tested before every mask. Even the buy path computes selector fee amounts before using its rates. A masked-out oversized selected fee can therefore still fail inside selection; eliminating selection or its fee calculations is unsupported.

Ordinary non-special quote fallback: after comparisons at `0x8a060..0x8a160`, `0x8a168..0x8a1e8` uses configuration `+0x68/+0x70/+0x78` if the supplied length is greater than `0x1000` and those three words are not all zero; otherwise it uses `+0x50/+0x58/+0x60`. The selected rate words are +8 and +16 within that record. The length is an actual caller input, not a constant to replace with a current account size. The special quote path calls `0x89b48` with pointer/count from configuration +8/+16 and caller-provided two-limb threshold. Its 40-byte records contain a two-limb threshold at +0/+8 and returned rates at +24/+32 (`0x89c68..0x89d78`, `0x89e80..0x89eb8`): it searches backwards and falls back to the first record; empty table takes an error path. This is an offset contract, not a proof of table deserialization or threshold construction.

At `0x8a370..0x8a3a0`, a nonzero global byte `+0x436` and nonzero curve word `+0x68` override the second rate. The complete source-level meaning and exclusion predicate of this override are not assigned here. An ordinary proposal must establish whether its admitted state reaches this override; it cannot silently delete it. The subsequent first fee calculation precedes the curve-zero check and optional second calculation. The excluded special branch at `0x8a4f8` was not interpreted.

## Arithmetic and return layouts

**Checked fee subtraction, fully local.** `0x80488..0x806c8` receives `(out, A, P, C)`. It first rejects `A<P` at `0x80490`, then subtracts P, then rejects `A-P<C` at `0x804a0`. Success stores `(tag=2, A-P-C)` at `0x806a8..0x806c0`. Both underflows construct numeric code `0x1788` (6024) at `0x80630`. No sum P+C is computed, no saturation and no rounding occurs. The constructor/formatting ABI itself is not re-proved. This success tag differs from the zero-tag arithmetic results below.

**Fee amount.** `0x88f90..0x89258` multiplies amount and rate through `0x1b55c8`, passes that limb pair and denominator 10000 to `0x88908`, then rejects a nonzero high result limb before returning `(2, low)`. The high-limb failure constructs 6025 at `0x891c8`. `0x88908..0x88f90` first checked-adds numerator and denominator, tests the sum, tests denominator, subtracts one with borrow, then calls `0x1b4088` (`0x88920..0x88a00`). Conditional on the multiply/divide primitive contracts, this is `ceil(amount*rate/10000)`, with checked intermediate arithmetic, not a wrapping `u64` product. The full primitive bodies and their complete error behavior were not consumed: rounding is a supported expression derivation with an explicit transitive obligation, not certified primitive closure.

**Buy budget.** `0x806c8..0x80df8` zeros the effective second rate when the curve's first 32 bytes are zero (`0x80710..0x80760`), checked-adds rates before testing amount (`0x80768..0x80798`), and conditionally forms `E=floor(B*10000/(10000+P_rate+C_effective))` with a carry into the denominator's high limb (`0x807a8..0x80858`). Sum-rate overflow calls the error constructor with 24 at `0x80a28`. A zero estimate takes code 6041 at `0x80bd0`. First fee computation precedes second (`0x80880`, `0x808c8`). The two additions used for `E+fee1+fee2` saturate on overflow (`0x808e8..0x80978`); if their result exceeds B, the excess is subtracted from E, with a prior underflow check (`0x80980..0x809d0`, `0x80ca0`). A zero corrected estimate constructs 6042 at `0x80d38`.

The successful result at `0x80db0..0x80df0` is `(tag=0, corrected_E, fee1, fee2, first_rate, requested_second_rate)`. The last field preserves the requested rate even if the zero-curve-key check disabled its effective amount. Crucially, the route consumes **+16 and +24 as fees**, then computes `Q=B-fee1-fee2` using `0x80488`; it does **not** use corrected_E as the net quote amount (`0x5d0c0..0x5d138`). Confusing these fields changes rounding. For flag 0 and positive B, conditional on successful selector and numeric primitives, both fees are zero, corrected_E=B and Q=B. Selector errors still precede this result.

**Buy output adapter.** `0xa0838..0xa08f8` rejects Q=0 through constructor argument 24, then loads curve +0x48, curve +0x40, and passes Q-1 to `0x880b0`. Subtraction is guarded, not unconditional saturation. The downstream helper builds its numerator and denominator with limb carries and checks numerator overflow before denominator overflow/zero (`0x880d8..0x88328`, `0x883f0..0x88458`). Under this caller's zero high-limb arguments the derived expression is `floor((Q-1)*curve[0x40]/(curve[0x48]+Q-1))`, conditional on the same wide primitive contracts. Return is a zero tag plus low/high limbs; the route rejects nonzero high limb at `0x5d540`, then rejects zero low limb at `0x5d638`, then compares with real reserve at `0x5d648..0x5d668`. Completing/capped branches are outside this ordinary non-completing claim.

**Sell quote.** `0xa0538..0xa0838` adds input to curve +0x40 using an explicit carry limb, forms input*curve[0x48], divides, and returns a zero tag and two result limbs (`0xa0548..0xa0620`). A 64-bit denominator carry is **not** itself an overflow error. The derived expression is `floor(A*curve[0x48]/(curve[0x40]+A))`, conditional on the wide primitive contracts. The route rejects nonzero high limb before selection (`0x5cd00..0x5cd38`), masks selected fee amounts, subtracts them, checks zero net at `0x5d010..0x5d020`, then calls `0x950e0` and checks its result against net (`0x5d028..0x5d088`). No extension branch of that callee was followed; its exact Tokenkeg-only identity/return remains an obligation.

## Both reserve directions and a source-order obstruction

The state layout below is in-memory. The base/quote naming follows the quote operands and route arguments; it is not a newly proved serialized-account layout. Both helpers take `(out, state, base_amount, gross_quote_amount)` and return tag 2 on success. Their checked operations occur in this exact order:

| Direction | 1: +0x40 virtual base | 2: +0x50 real base | 3: +0x48 virtual quote | 4: +0x58 real quote |
|---|---|---|---|---|
| buy `0xa0bf0` | subtract base; store `0xa0d20` | subtract base; store `0xa0ef0` | add quote; store `0xa0f38` | add quote; store `0xa12d8` |
| sell `0xa13e0` | add base; store `0xa1428` | add base; store `0xa1540` | subtract quote; store `0xa1710` | subtract quote; store `0xa1ae0` |

Each operation checks underflow/overflow before its own store, but earlier stores precede later failure checks. All four local failure paths construct 6024. Do not interpret these in-memory writes as committed effects on a failed transaction.

Sell caller passes original input from `fp-0xa78` and **gross** quote from `fp-0xaf0` at `0x5d408..0x5d420`, after successful input transfer at `0x5d360..0x5d370`. Buy caller passes output base from `fp-0xb28` and net-of-fees quote Q from `fp-0xaf0` at `0x5e060..0x5e078`, after the selected input-transfer path succeeds. The common success path proceeds toward fee handling at `0x5d8b8 -> 0xa1bd8`. Its complete fee-accrual/buyback/error ABI is **not** closed here.

Frozen source `inputs/programs/pump/src/multi_hop_curve.rs:253` constructs a tuple in virtual-base, virtual-quote, real-base, real-quote order; it precomputes reserve and fee totals at lines 253-254 **before** input transfer at lines 256-261 and assigns the state at line 263. The original order above differs in both field precedence and transfer precedence. This is a static reason not to expand that bounded source unchanged. It is not a new runtime mismatch, security finding or claim about which exceptional inputs are reachable under all existing guards.

## Exact remaining obligations

The machine-readable `result.json` separates proved local contracts from conditional arithmetic expressions. The continuation does not substitute “no deeper fixtures” for static proof:

- **O1:** close `0x1b55c8` multiplication and `0x1b4088` division contracts reached from the numeric helpers, including error and narrowing behavior; establish the Tokenkeg-only contract for `0x950e0` from its known caller without entering extension branches; map selector length, threshold limbs and global/curve override inputs to decoded ordinary state. Exact nested edges are in provenance. Complete error constructors must be bound before claiming exact serialized errors, rather than just numeric constants and local precedence.
- **O2:** connect the five-account parser's fields to current input mint, output mint/vault and the `fp-0xab8` versus `fp-0xab0` state views; then prove a distinct-account monotone chain in each direction. Arithmetic scalars alone do not certify vault identity or arbitrary route shapes. The prior loop result is not re-presented as new work.
- **O3:** the two reserve-operation orders and their caller quantities are established. Remaining prerequisite is the ordinary fee/accrual helper at `0x5d8b8 -> 0xa1bd8`, output transfer and event-result producer paths, with the flag-zero/no-final-transfer branch isolated before following new callees. The event builder edge is `0x5e6a8 -> 0x8bbd0`; its complete semantics were not followed. Final per-hop return amount/buyback/output-vault mapping and error precedence after reserve mutation remain unclosed. Aliases/repeated curves remain excluded.
- **O4:** no new receipt was consumed or produced. Prior finite receipt coverage is preserved as inherited evidence only; no new >2 or flag-zero observation is claimed. Static O1-O3 completion is the concrete next prerequisite; this task neither requests nor performs a runtime probe.

No implementation, parent file, prior package, global configuration or binary was changed. No build, fixture, program execution, signature operation, broadcast, staging, commit or push occurred. Only collection, static byte inspection and package verification scripts ran. Existing whole-file inequalities and broader recovery/security limitations are unchanged.

## Portable verification

`python3 verify.py` checks the exact seal, whole-input Git blob identities, copied prior-file hashes, every retained decoded instruction against raw slices, direct call/branch targets, CFG closure for admitted helpers, selected ABI/mask/reserve assertions and bounded constant reference sites. It does not execute SBF, evaluate transaction behavior or certify prose. Full-ELF SHA256 and Git identity were verified at extraction; without the full ELF, portable verification cannot independently rebind every slice to that whole object. The full disassembly source is also represented by its provenance hash and exact bounded excerpts, not copied wholesale.

The manifest excludes itself. Copied-directory verification outcome lives outside `publication/` in `verification-outcome.json`; no mutable telemetry or logs are sealed.
