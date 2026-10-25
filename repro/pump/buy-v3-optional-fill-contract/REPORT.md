# BuyV3 optional-fill contract — original-byte static recovery

The scalar optional-fill/whitelist merge is closed at the encoded-control-flow level. A complete BuyV3 replacement is **not** closed. This packet supplies a standalone uncompiled scalar helper and precise application/error contracts; it does not wire into main, create a compatibility mux, or certify the incomplete ordinary proposal. No compiler, target execution, transactions, network, new runtime fixtures, or other-handler edits were used. Excluded mode/token-extension internals remain opaque.

Original allocation SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` is retained whole (10,485,715 bytes). Baseline candidate SHA256 `731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93` is 1,579,424 bytes. Whole files remain unequal. No new raw or normalized candidate-body equality is claimed; there is no compiled proposal. The reviewed parser packet and prior manifest seals remain immutable and are bound here. `evidence/COMPLETION.md` retains the 140/150 bounded and 0/4 whole-original measures.

## Decode and passage

All intervals below are half-open and original virtual addresses. Every instruction in the retained assembly is rechecked against the original ELF. `analysis.json` derives signed relative branch/call targets from bytes, respecting relocation bindings; displayed `<.text+...>` labels are not used.

* `128718` rejects argument lengths below eight to `128a20`; `128730` rejects lengths 8..15 to the same path. The two u64 loads are `128740` and `128750`. Length 16 goes directly from `128758` to `128780` with r5 zero. Longer input reads byte16 at `128760`: zero also goes to `128780`; one sets r5=1; any other value goes from `128770` to `128b58`. There is no exact-length-17 requirement in this decoder; later trailing bytes are unused here.
* Truncated input and invalid bool eventually construct Anchor error102 via `128a98`/`128aa0`, with the latter path first constructing its formatting/I/O error. Allocation/formatter failure edges remain real and are not replaced by a scalar helper. The packet does not claim all transitive decoder internals.
* Flag r5 is stored at frame-0x1c8 (`128780`), restored to r5 (`128928`), and passed at `128930` to actual target `147ba0`. Body entry retains it in r6; r8 holds requested amount; maximum cost from r4 is saved at frame-0x1e0. The current wrapper's `let _ = partial_fill` loses this input. The ordinary proposal's unconditional minimum loses two distinct contracts below.
* Authentic parser runs once before the body, and body success gates exit. This patch boundary must not move any check before that parser or retry another context.

## Entry operands and preflight boundaries

The body gets accounts through `r9 = *(context+8)`. It calls preparation `147c08 -> 3cd50`. Only tag2 continues; failure at `147c18` goes to `147df0`, then `148600`. Next `147c50 -> 7e0b0` receives bytes at decoded curve+0xa1 (r2) and +0xa3 (r3), plus zero in r4. Tag2 continues to `147c70`; failure goes through `147e00` to the same return block. The implementation of this mode preflight is not reopened here. Successful scalar selection is conditional on its successful completion, not a substitute for it.

At `147c70..147cd8`, the decoded Global pointer is accounts+0, curve pointer is accounts+0x28, reserve R is curve+0x58, requested A remains r8, and M is byte curve+0xa2. The 32-byte key reached through accounts+0x40 then +0 is copied to frame-0xa8. The prior reviewed account/layout attribution identifies these as signer user, real token reserves, and the mode flag used later by the event/settlement code. Ordinary means M=0 for this scalar contract, not Tokenkeg ownership. No owner-based domain restriction is introduced.

If M=0, `147ce0` goes to `147e10`, adding 0x288 to Global in r2. `147e30` calls **1b3678**, with r1=user-key copy, r2=Global+0x288 and r3=32. This is not a guessed Pubkey method: `1b3678..1b36b8` zeros a stack i32, puts its address in r4, calls a relocation bound to **sol_memcmp_** at `1b3690`, loads the i32 and sign-extends it. Caller `147e40..147e50` uses only its low32 bits for equality. Global+0x288 is the prior layout's `whitelist_pda`, not the quote-mint whitelist. Actual comparison operands are retained independently of this source name.

## Exact scalar merge

Let W mean those two 32-byte keys compare equal, P be the decoded bool, A the request and R the real reserve. Define D (residual) and B (curve amount):

```
if M == 0 and not W and A > R:
    D = A - R
    B = R
else:
    D = 0
    B = min(A, R) if P else A
if B == 0: error6020
else if B > R: error6021(R, B)
else: continue with (B, D)
```

This is the entire scalar selection, including the byte-visible nonzero-M branch. It does not give permission to implement or claim mode preflight/settlement/extension behavior.

| Ordinary condition | P | B | D | Next outcome |
|---|---|---|---|---|
| A=0, any R/W | either | 0 | 0 | 6020 |
| 0<A<=R, any W | either | A | 0 | continue |
| A>R, W=false | either | R | A-R | 6020 if R=0; otherwise continue |
| A>R, W=true | true | R | 0 | 6020 if R=0; otherwise continue |
| A>R, W=true | false | A | 0 | 6021 with `(R,A)`, including R=0 |

For nonzero M the comparison is skipped; the scalar merge is the W=true branch. Its preconditions and subsequent mode-dependent behavior stay opaque. Notice that ordinary nonwhitelist P=true does **not** discard excess: it still sets D=A-R. Conversely, D cannot universally be computed as requested-minus-selected: whitelist clipping produces D=0.

Proof by encoded branches (not finite runtime sampling): `147e38` takes A<=R to `147ce8`, which zeros r1. If A>R, equality at `147e50`/`147e58` also goes to `147ce8`. Inequality takes `147e60..147e68`, computes r1=A-R, and `147e70` jumps **147d00**, bypassing the flag test and setting r8=R. Subtraction cannot underflow because A>R dominates it; for u64 inputs A-R<=u64::MAX. The other paths set r1=0 then reach `147cf0`: P=false goes **147d08**, skipping clipping; P=true tests unsigned A<R at `147cf8`, preserving A if true and otherwise assigning R at `147d00`. Equality A=R thus has no residual and leaves A. `147d08` checks zero before `147d18` tests unsigned R<B. The latter's non-error jump `147d20` goes **148098**, which saves residual r1 to r8. These cases partition all unsigned A,R and both flags, conditional on successful preflight and ordinary comparison semantics. `source/amount_selection.rs` expresses this algebra. No compiler identity follows from this source-level equivalence.

## Exact amount errors and real callees

* B=0: `147d08 -> 147e78`. The enum index is20 at data `1b5e34`; `147e98 -> 157380` materializes the name; `147f28 -> 15de88` formats the message. `148000` writes numeric6020, `148010` writes original line801, and `147fe8` references the 29-byte string `programs/pump/src/trade_v3.rs`. `148048 -> 19bb30` constructs the error representation. `148078 -> 340` attaches compared values: r4=0, helper supplies a u64 zero left and stores r4 as i32 right. Formatting calls are `408 -> 1b31b0` (u64) and `5a8 -> 1b30c0` (signed i32). Thus both displayed values are `"0"`; this is not a bare code-only error.
* B>R: `147d18 -> 147d28`. Enum index21 is at `1b5f40`; name call `147d48 -> 157380`; message `147dd8 -> 15de88`. After formatting success the target is **1480f0**, not an assembly annotation. `148168` writes6021; `148178` writes original line802; source path is the same at `148150`. `1481b0 -> 19bb30` constructs the representation. `1481e8 -> 11b0` gets r4=R and r5=B saved at frame-0x1f0: the pair is **(reserve, selected request)**. The helper stores and formats two u64s, in that order (`1278` and `1418` call `1b31b0`). Only P=false and a non-residual branch can reach this error.

Name reconstruction is byte-based, not current error enum inference: index20's dispatch reaches `159630`, then the normal allocation path `15b648` writes overlapping immediates `BuyZeroA` and `roAmount`, yielding **BuyZeroAmount**. Index21 reaches `15aa60` then `15d4f8`, which writes `NotEnoug`, `hTokensT` and `oBuy`, yielding **NotEnoughTokensToBuy**. Allocation exhaustion paths remain present. Message dispatch reaches `15e758` and `15eb00`, with descriptors at `1be290` and `1be2a0`. Each descriptor has a type8 relocation; its stored upper32 pointer refers to `1b8f73` length15 (**Buy zero amount**) or `1b8f82` length24 (**Not enough tokens to buy**). Analysis retains descriptor raw bytes and relocation records. It does not reinterpret raw relocated words as ordinary flat pointers.

The source helper deliberately uses semantic error variants; it does not fabricate a historical source location. `SOURCE-DELTA.md` records idiomatic Anchor adapter expressions and their missing origin. Helper return ABI, allocation/panic behavior, generated origin and full error layout are not certified by an uncompiled proposal. The old ordinary proposal's zero-error pair happens to agree in value; its missing insufficient-reserve branch and unconditional residual calculation do not.

## Continuation and preservation obligations

At `148098` residual is saved in r8 before the later quote preflight `1480b8 -> 7f010`. That helper's tagged result must be honored; no reinterpretation of its mode paths is proposed. The selected curve amount saved at frame-0x1f0 is loaded to r3 at `148268` for `148270 -> a0070`. `1483a8` tests residual r8 via r2: zero skips to `148538`, nonzero proceeds into the residual calculation (`148418 -> 82128`), then `148478` supplies r5=residual to `148480 -> 82af8`. This explains why retaining both outputs is necessary. It is not a closure of those helpers' full account/fee/settlement contracts.

The unchanged current receipt is checked against the prior regression ledger for exactly **117 BuyV3 rows, 105 successes and 12 failures**, all matches. They remain mandatory for any future implementation, including the retained Token2022 base, native/token quotes, Mayhem and holder successes described by the reviewed parser report. This packet decodes no token extensions and reruns none of those cases. The rows are not an input-domain definition, nor do they establish behavior for the recovered oversized-whitelist or zero-reserve partitions. This scalar proposal alone proves no all-input preservation and cannot waive any row.

## Remaining inputs and integration hold

The scalar helper needs original decoded A, R, P, M, user key and Global+0x288 key **after** successful typed parser, preparation and mode preflight. It produces B/D or the ordered amount error above **before** quote preflight. Required surrounding closure remains: dedicated BuyV3 context rather than SellV3 reuse, original mode/quote-vault paths and error objects, complete downstream residual/settlement handling, historical diagnostic origins and source/compiler/dependency linkage. The prior reviewed parser's gaps outside this scalar region still apply. No new full-handler replacement is offered and no unsupported-mode error or new domain fence is invented.

A metadata-only parallel patch is composable: no main file is owned or edited here. Proposed signature/body changes are described separately and do not preempt its lines. Source evidence binds Pump731003 and the prior reviewed read-time snapshot; future integration needs a fresh applicability check.

## Verification, seals and limitations

Run `python3 -B verify.py` from any directory. The standalone verifier checks the exact allowlist, file hashes, owned map, prior seals, source/input bindings, original instruction bytes, recomputed real call/branch operands, name/message construction and the 117 receipt obligations. It verifies decisive edge/constants independently of the rendered report. It does not compile or execute Rust/BPF, simulate a chain, or turn the algebraic proof into binary identity. Selected helper spans are inspection ranges, not claimed original function boundaries.

The publication is verified again from an independently copied directory; its external verification receipt records both results. Prior failure histories remain at their original sealed sources; no CLI telemetry, caches or keys are copied. During exploratory source lookup, `state.rs` and `errors.rs` did not exist (definitions are in `lib.rs`); this read-only lookup error caused no source changes or target attempt. No prior build/runtime failure is overwritten or recast as success.
