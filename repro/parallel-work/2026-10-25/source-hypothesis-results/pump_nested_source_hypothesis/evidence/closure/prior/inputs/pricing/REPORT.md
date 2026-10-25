# Native-root nested creation: Global identities and pricing consumers

Substantive static recovery, **not an integration-ready source patch**. This package closes the two Global identities and the pool inactive-tail question, and recovers the pricing callers' integer operations, widths, branch conditions and numeric error order. It retains a specific proof obligation for the general wide-division primitive and the previously unclosed account-context contract. No source was changed in the parent. No Rust proposal is supplied under the complete-evidence requirement.

The accepted checkpoint is `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Original Pump ELF SHA256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. The assembly blob is `4c37a9b4931438cfab0311bea6c6398c5d909321`, SHA256 `d4a29dc6921d25d9d2e8e7a0f8b4d68027005f2ab74a8151d5ac8a8ab575ba0d`. Full provenance is in `provenance.json`; exact inclusive source lines and half-open ELF byte ranges are in `windows.json`. Every retained assembly row is checked against the ELF. Numeric addresses, not displaced angle-bracket annotations, determine branches. These are inferred analysis windows, not historical Rust function names.

The two root-reviewed packages are copied exactly, with their seals, under `inputs/pump_create_nested` and `inputs/pump_nested_types`. Their contents are public evidence explicitly authorized for this task; the followup package is not misrepresented as committed at the checkpoint. `prior-packages.json` records their seal hashes. Prior ancestor decoding is consumed, not reimplemented or rerun.

## Global identity closure

The permitted call chain is create wrapper -> context `0xac6c8` (prior package), context call `0xac928 -> 0x13270`, account cursor call `0x13318 -> 0x96d0`, Global account decode call `0x9960 -> 0x15fdd0`, and discriminator-accepted call `0x160098 -> 0x1600a8`. At `0x15fdf8..0x15fe10` the literal is `a7e8e8b1c86c727f`, exactly Global's IDL discriminator. The cursor and account wrappers are independently visible; this is not a flat Rust declaration-layout inference.

| Decoded Global byte offset | Serialized account byte offset | Field | Decoder dataflow |
|---|---:|---|---|
| +0x3e0 | 73 (0x49) | initial_virtual_token_reserves | load 0x1602e0; save -0x550 at 0x1603f8; reload/store 0x161400..0x161410 |
| +0x3e8 | 81 (0x51) | initial_virtual_sol_reserves | load/save 0x160320..0x160330; reload/store 0x1613f0..0x161400 |
| +0x3f0 | 89 (0x59) | initial_real_token_reserves | load/save 0x160368..0x160378; reload/store 0x1613e0..0x1613f0 |
| +0x408 | 146 (0x92) | pool_migration_fee | cursor established at 113 at 0x160410..0x160438; pubkey reader at 0x160460 consumes 32, boolean reader at 0x160508 consumes one; load/save at 0x160620..0x160638; reload/store 0x1613b0..0x1613c0 |

The primitive targets are `0xfab0` and `0xd068`, whose consumed sizes and boolean validation were already byte-grounded in the copied typed package. The account wrapper copies decoded +16 to wrapper +24 at `0x9a20..0x9a88`; its first two decoded words go to wrapper +8/+16. Global offsets above are **decoded**, not wrapper or serialized offsets. The decoder window ends at its first retained exit and is not claimed to recover all Global failure paths or its serializer.

For ordinary native root selection, the existing `curve-update.asm` has zero quote comparison `0x60f28..0x60f70` selecting the Global +0x3e8 load at `0x61070`. Walk call `0x19048` uses that helper, stores its scalar at `0x19070`, and reloads it at `0x19528` for the fold. Thus the native seed S below is initial_virtual_sol_reserves, not pool_migration_fee or a guessed field.

## Exact caller contract notation

All inputs and intermediate values are unsigned. `U64=2^64-1`, `U128=2^128-1`. Two words mean `lo + 2^64*hi`. `D(N,Q)` denotes the two quotient words returned by the concrete byte routine `0x1b4088`; it invokes `0x1b40d0`, discards the remainder words, and returns low then high. Mathematical formulas below identify D with unsigned floor division, which is the recovered interpretation of its unsigned divide/modulo and quotient-correction code; the remaining all-input proof boundary is explicit below. The byte-level caller contract remains exact with D uninterpreted.

`M(x,y)` at `0x1b55c8..0x1b5728` returns the low 128 bits of the product. Its 32-bit partial products and carry accumulation implement full u64*u64 -> u128 for the zero-high-word uses here. Callers multiply a u128 by a u64 by multiplying each limb and checking the discarded upper limb and the carry into it. No floating-point instruction is used in the retained pricing path. No intermediate u64 truncation is justified.

Numeric errors map through the copied IDL: **6024 Overflow**, **6026 DivisionByZero**, **6104 QuoteReservesOutOfRange**. The final u64 range failure is Overflow, not Truncation. Error-object allocation/formatting failure semantics are outside this numeric-return contract.

### Initial amount: 0x61348..0x617e8

Let V=Global.initial_virtual_token_reserves, R=Global.initial_real_token_reserves and S=the root seed scalar (all u64).

1. Compute R*S as u128 (`0x61360..0x61398`); it fits without a product error.
2. If V<R, return Overflow (`0x613a0`, code store `0x615b8`).
3. If V=R, return DivisionByZero (`0x614b8`, code store `0x61760`).
4. Return u128 `D(R*S,V-R)` (`0x614c0..0x61538`). There is no +1, ceiling correction, or narrowing.

Mathematical interpretation: floor(R*S/(V-R)). R=0 with V>0 produces zero here; it does not fail until later operations require it.

### Shared constant-product consumer: 0x62170..0x62aa0

Inputs: B:u64, Q:u128, A:u128. Return u128 or the first error below.

1. Q=0 -> DivisionByZero (`0x62180..0x62198`, code at `0x62570`), even when A or B is zero.
2. Checked u128 T=Q+A; overflow -> Overflow (`0x622a8..0x62330`, code `0x62718`).
3. Checked u128 N=B*A; overflow -> Overflow (`0x62330..0x62430`, code `0x62870`). Multiplication is **not** allowed to wrap and then divide, nor promoted to an unbounded product accepted after division.
4. T=0 -> DivisionByZero (`0x62780..0x62798`, code `0x62a18`). This is redundant for successful steps 1–2, but is the emitted order.
5. Return `D(N,T)` (`0x62798..0x627f8`). No +1, fee, or narrowing.

Mathematical interpretation: floor(B*A/(Q+A)), subject to those prior overflow checks.

### Variant consumer: 0x62aa0..0x63530

The producer emits tag 0 (Pool) or 1 (Curve); the consumer tests zero versus nonzero. It does not validate an independently supplied arbitrary enum tag.

Pool: reads tag at +0, B at +8, Qlo at +16, Qhi at +24. It calls shared constant-product with A, and directly returns that result (`0x62aa0..0x62b08`, jump to exit `0x62bf8`). **Words +32, +40, +48 are inactive for this consumer.** The record pointer is overwritten by B before the call, is never passed to it, and is not read after the call. No hidden record-tail access occurs inside the callee because it receives only the three scalar values and a caller frame holding A's two words. The verifier checks this exact short route and the complete callee's frame reads. This is a proof for the create-linked pricing consumer, not a global assertion about every possible consumer of the storage.

Curve: interpret +8=VT, +16=VQ, +24=RT, +32=RQ, +40=PB, +48=F. All six are u64. The prior producer and Global closure identify PB=token_total_supply-R and F=pool_migration_fee for zero quote mint, otherwise 0. Record construction checks supply>=R before this fold; do not postpone that error until migration is needed.

1. Y=constant_product(VT,VQ,A). Propagate its error before RT comparison (`0x62b08..0x62c00`). If Y<=RT return Y (`0x62c28..0x62c90`, return `0x62de8..0x62e10`). Comparison uses both limbs; a nonzero high limb exceeds any RT.
2. On Y>RT, compute RT*VQ (u128). VT<RT -> Overflow; VT=RT -> DivisionByZero (`0x62c90..0x62ce0`, `0x62e10`, codes `0x62f58`, `0x63278`). Otherwise C=`D(RT*VQ,VT-RT)+1` (`0x62fc0..0x63060`). This is **floor plus one even for an exact division**, not ceil. The emitted increment carries into the high limb. With VT>RT the bounded u64 operands make C fit u128.
3. L=saturating_sub(A,C), implemented by subtracting with borrow then replacing both limbs with zero on underflow (`0x63068..0x63148`). If L<=1 return RT as u128 (`0x63148..0x631f8`). No migration-fee subtraction or pool division happens on this return path.
4. Form Qp=C+RQ as u128; if Qp<F return Overflow (`0x632e0..0x63398`, helper `0x63530`, code `0x636c0`). With the step-2 bounds C+RQ fits u128. Compute Qp-F and L-1 as two-word subtracts (`0x63398..0x63418`).
5. Z=constant_product(PB,Qp-F,L-1). Propagate its error (`0x63418..0x63430`, propagation `0x634e0..0x63508`). Checked u128 result RT+Z; overflow -> Overflow via `0x63738` (`0x63430..0x634d8`, code `0x638c8`); otherwise return both limbs (`0x63508..0x63530`).

All three curve-tail words are active only on the Y>RT/L>1 route, even though they are eagerly loaded in the curve branch. The Pool variant has no RT/RQ/PB/F interpretation. A natural source representation should therefore use separate variants, not a seven-field flat memory-layout assertion.

### Final rescaling and fold

`0x617e8..0x62170` takes A:u128 and decoded Global:

1. V<R -> Overflow (`0x61800`, code `0x61ca0`). Compute d=V-R.
2. Checked u128 N=A*d; overflow -> Overflow (`0x61918..0x61b08`, code `0x61e50`).
3. R=0 -> DivisionByZero (`0x61b18`, code `0x61ff8`). This check follows product overflow.
4. Q=D(N,R). Nonzero quotient high limb -> Overflow (`0x61b40..0x61b60`, code `0x620f8`). Otherwise return its u64 low limb (`0x62060..0x62080`).

The fold `0x63940..0x63cf0` calls initial once, then consumes 56-byte records **last to first**, stopping at the first pricing error (`0x63978..0x63a20`); it calls final once (`0x63a20..0x63a68`). Only after successful final narrowing does zero trigger QuoteReservesOutOfRange (`0x63a70`, code `0x63c48`). Thus intermediate zeros and values exceeding u64 must not be rejected early. The fold consumes an already-built record slice, not remaining accounts, and neither variant pricing nor the shared math helper performs account reads or token CPIs.

## What remains unclosed, precisely

* **Wide division all-input proof:** the complete retained quotient/remainder core is `0x1b40d0..0x1b5518`, with right shift `0x1b5518..0x1b55c8`, low-product `0x1b55c8..0x1b5728`, and left shift `0x1b5948..0x1b59f0`. The unsigned 64-bit fast route (`0x1b4630..0x1b4678`), 32-bit limb division route (`0x1b4758..0x1b4850`), estimate/decrement correction (`0x1b4878..0x1b4ad8`, `0x1b51a0..0x1b5238`) and iterative residual route (`0x1b4ad8..0x1b5518`) support floor division. This package does not supply a complete invariant proof across every normalization and correction branch. Next prerequisite: a static proof that each nonzero-divisor exit preserves N=q*Q+r with 0<=r<Q, including shift counts and the estimate correction bounds. This needs no runtime probe, fixture, source build, or excluded handler. Until then use D in the exact contract and label the floor formula as the recovered mathematical interpretation, not a verified theorem.
* **Whole nested-source admission:** retained prior obligations about complete create account-context error precedence, ancestor depth consistency and excess-account handling remain outside these pricing helpers. The next source proposal must combine the existing cursor/typed evidence with a bounded static trace of the create-linked context/walk, without following stopped handlers. This package does not silently waive those requirements or turn an arithmetic contract into handler completeness.
* **Error ABI:** numeric successful/error paths are mapped; logging/allocation panic paths and all dynamic error payload bytes are not certified. No runtime evidence was generated. The verifier checks byte integrity and selected dataflow/control assertions, not all input semantics.

Compared with frozen `programs/pump/src/create_v2.rs:121–142` (copied by the prior package), the required future change must preserve u128 intermediate values, distinguish DivisionByZero from Overflow, use saturating post-completion remainder with the <=1 early return, retain product overflow before division, and delay u64 narrowing until final rescaling. Simply iterating the current one-root function or deleting the depth guard would not implement these contracts.

All four original whole-file comparisons remain false; current reconstructed Pump/Fees drift and the 140 bounded / five partial / five unrecovered accounting are unchanged. No source builds, runtime/security probes, new fixtures, signatures, broadcasts, binary patching, staging, commits, or parent writes occurred. No excluded handler body is part of this publication.

## Verification and consumed ranges

Run `python3 verify.py` from any working directory. It verifies both prior package seals, full copied Git blobs, exact assembly bytes and contiguous windows, direct-call edges, Global field dataflow anchors, numeric errors, and the Pool route's inactive-tail proof. It does not execute original program instructions. The copied-directory run is retained outside the seal as `verification-outcome.json` in the worker directory. The manifest seals every publication file except itself, including nested historical manifests. No CLI telemetry or mutable verification output is sealed.

| Window | Frozen assembly lines (inclusive) | ELF bytes (half-open) |
|---|---|---|
| initial | 48053–48189 | 0x61348..0x617e8 |
| final | 48190–48475 | 0x617e8..0x62170 |
| constant-product | 48476–48750 | 0x62170..0x62aa0 |
| variant | 48751–49077 | 0x62aa0..0x63530 |
| migration-sub-error | 49078–49135 | 0x63530..0x63738 |
| migration-add-error | 49136–49193 | 0x63738..0x63940 |
| fold | 49194–49304 | 0x63940..0x63cf0 |
| global-context-edge | 85063–85068 | 0xac910..0xac940 |
| global-account-cursor | 9329–9351 | 0x13270..0x13328 |
| global-account-decode | 4581–4696 | 0x96d0..0x9aa8 |
| global-discriminator | 173549–173630 | 0x15fdd0..0x1600a8 |
| global-decoder-prefix | 173631–174299 | 0x1600a8..0x1615b0 |
| wide-mul | 215761–215804 | 0x1b55c8..0x1b5728 |
| wide-div-wrapper | 215093–215101 | 0x1b4088..0x1b40d0 |
| wide-div-core | 215102–215738 | 0x1b40d0..0x1b5518 |
| wide-shr | 215739–215760 | 0x1b5518..0x1b55c8 |
| wide-shl | 215863–215883 | 0x1b5948..0x1b59f0 |
