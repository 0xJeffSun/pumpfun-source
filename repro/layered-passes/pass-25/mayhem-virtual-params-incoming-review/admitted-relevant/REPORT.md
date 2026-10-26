# Pump `set_mayhem_virtual_params`: static recovery only

This package recovers the captured Pump instruction's dispatch, wrapper, typed account parser, reserve-update arithmetic, and event sequence. It does **not** implement or validate a new current handler. No crate, build, transaction, runtime fixture, RPC request, privileged signer substitution, or main-source change was made. The stopped Mayhem initializer body and its callers were not examined.

The direct-call testing prerequisite is not satisfiable with an ordinary trader/admin keypair: account 0 must equal Mayhem's off-curve `sol-vault` PDA **and** have signer privilege. A genuine Mayhem CPI that signs its own PDA would be required. Such an authorized invocation path has not been established in this task. No workaround is proposed.

## Input binding

- Frozen source Git revision: `49e4ccc17ab45308ff3160d20c3d580512b772af`. All 31 tracked Pump Rust/Cargo inputs were compared with `git show` and remained identical.
- Separate published Pump42 candidate ELF: `repro/pump/holder-nested-fortytwo/candidate.so`, 1,405,520 bytes, SHA-256 `c07e67b055c87da881b33c9e07bddf913d5b0beffa1cfe52169ba1bc3f6d2bbf`. `c07e67…` is a binary hash, **not** the Git revision.
- Captured original ELF: `evidence/original/pump/deployed.so`, 10,485,715 bytes, SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
- Captured IDL: `evidence/upstream/pump.json`, SHA-256 `7616681ea557975f9f623ac211080f22a93060781eaf4765b0a488d980997207`.
- `inputs.json` records all source/input/window hashes. Every instruction byte in every selected assembly window was checked against the captured ELF. `.json` windows preserve raw bytes, direct call targets, external relocations, and signed branch displacements with computed absolute targets. The imported disassembler's `<.text+…>` labels are not used as absolute addresses.
- `full_bytes_equal: false`; recovered handler-count increment: **0**; runtime receipts: **0**.

## Dispatch, arguments, and account order

The captured IDL gives discriminator `3da9bcbf99952a61`, no arguments, and eight accounts. The dispatch record links the matching comparison to a direct call at decimal 1,164,712 targeting `0x1255a8`. The wrapper logs `Instruction: SetMayhemVirtualParams`, calls the context parser at `0x125648 → 0xcd3d8`, the body at `0x125750 → 0x137fc0`, and successful account exit at `0x125798 → 0xcf510`. No argument decoder is visible in the wrapper. This does not establish a claim about rejection of arbitrary trailing instruction bytes.

| Index | Account | Captured requirements |
|---|---|---|
| 0 | `sol_vault_authority` | Writable, signer, PDA `[b"sol-vault"]` under Mayhem |
| 1 | `mayhem_token_vault` | Writable typed token account; ATA of account 0, account 2, and account 5 |
| 2 | `mint` | Typed mint |
| 3 | `global` | Typed Pump Global; Pump PDA `[b"global"]` |
| 4 | `bonding_curve` | Writable typed Pump BondingCurve; Pump PDA `[b"bonding-curve", mint]` |
| 5 | `token_program` | Executable fixed Token-2022 program `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb` |
| 6 | `event_authority` | Pump PDA `[b"__event_authority"]` |
| 7 | `program` | Unchecked account consumed by event-CPI plumbing |

The external Mayhem program is `MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e`. Pure public-address derivation produces PDA `BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s`, bump 253, off the Ed25519 curve. `pda-evidence.json` records this derivation; no keypair or signature was constructed.

## Parser and constraint order

All eight accounts are consumed and typed parsing runs before the explicit PDA/associated-token constraints. Account 1 token parsing is called at `0xcd548`; account 2 mint parsing at `0xcd680`; account 3 Global parsing at `0xcd928`; account 4 curve parsing at `0xcda00`; fixed Token-2022 parsing at `0xcdae8`. Thus invalid typed account data/program ownership can fail before the later signer constraint. The fixed program parser emits 3016 for the wrong program ID and 3017 for non-executable data (`0x140f0`, `0x14210`). The ordinary typed account parsers are retained as evidence; their entire malformed-input error surface is not claimed as recovered.

After typed parsing, the explicit successful path is:

| Order | Check | Representative original addresses | Failure code |
|---|---|---|---:|
| 1 | External Mayhem `sol-vault` PDA | derive `0xcde28`, compare `0xcdef8`, error `0xcdf28` | 2006 |
| 2 | Sol-vault writable | branch `0xce168 → 0xce290`, error `0xce2a0` | 2000 |
| 3 | Sol-vault signer | branch `0xce178 → 0xce308`, error `0xce318` | 2002 |
| 4 | Token-vault account owner equals token-program key | compare `0xce238`, error `0xce268` | 2023 |
| 5 | Token-vault token authority equals sol-vault key | compare ending `0xce448`, error `0xce460` | 2015 |
| 6 | Token-vault ATA address | derive `0xce660`, compare `0xce6d0`, error `0xce700` | 2009 |
| 7 | Token-vault writable | branch `0xce828 → 0xcea88`, error `0xcea98` | 2000 |
| 8 | Global PDA | derive `0xce860`, compare `0xce938`, error `0xce968` | 2006 |
| 9 | Bonding-curve PDA | derive `0xcebb8`, compare `0xcec90`, error `0xcecc0` | 2006 |
| 10 | Bonding curve writable | branch `0xcedf0 → 0xcf050`, error `0xcf060` | 2000 |
| 11 | Event-authority PDA | derive `0xcee28`, compare `0xceef8`, error `0xcef28` | 2006 |

For account 0, signer/writable flags are loaded from `AccountInfo +0x28/+0x29` at `0xcd500/0xcd4f0`. It is consistent with an unchecked account plus a signer constraint, rather than the early `Signer` typed-account failure 3010. The separate address, writable, and signer checks are all preserved. No extra admin key equality was found in this context parser.

## Field identity and memory layout

`A` below is the parsed accounts pointer loaded by the body at `0x137fd0`; `C=A+0x1f0` is the curve payload in Rust memory, **not** serialized Borsh account data. Mixing those layouts would produce incorrect field names.

| Rust memory location | Recovered field | Binding evidence |
|---|---|---|
| `C+0x40 = A+0x230` | Virtual token reserves | Serializer `0x5b48` emits first reserve after discriminator |
| `C+0x48 = A+0x238` | Virtual quote reserves; legacy event calls it SOL | Serializer `0x5b90`; only reserve-helper write |
| `C+0x50 = A+0x240` | Real token reserves | Serializer `0x5bd8` |
| `C+0x58 = A+0x248` | Real quote reserves; legacy event calls it SOL | Serializer `0x5c20` |
| `C+0x60` | Total token supply | Serializer `0x5c68` |
| `C+0x99` | Complete | Serializer `0x5cb0` |
| `C+0x9a` | Mayhem mode | Serializer `0x5d30` |
| `C+0x20` | Quote mint | Serializer `0x5dc0`/`0x5de8`; body copies `A+0x210..0x228` |
| `A+0x688` | Global initial real token reserves | Raw Global offset `0x59 → decoded +0x3f0 → A+0x688` |
| `A+0xe8` | Mayhem token-vault amount | Raw SPL amount offset `0x40 → decoded +0x40 → typed result +0x68 → A+0xe8` |

Global proof: `0x160368` reads serialized account offset `0x59` and `0x1613e8` writes decoded offset `0x3f0`; offset `0x59` is `initial_real_token_reserves` in the captured Global layout. The typed wrapper shifts the payload by 8 bytes, and context copies start from typed result `+0x10` at `0xcd9e0` into `A+0x2a0` at `0xcf2d0`. Therefore `0x688 - 0x2a0 + 8 = 0x3f0`.

Token-amount proof: unpack reads raw token account `+0x40` at `0x1943b8`, writes decoded `+0x40` at `0x194808`; three copies in `token-account-decode` preserve that offset. `token-account-parser` copies decoded bytes `+0x10` to typed result `+0x38`, making amount `+0x68`. Context result base is stack `-0xa08`; amount is therefore stack `-0x9a0`, copied to `-0xb00` at `0xcd610`, then to `A+0xe8` at `0xcf1e0`.

## Reserve-update arithmetic

The body saves old virtual reserves, calls helper `0xa23f0` at `0x138070`, then handles the returned result before reading Clock. The helper receives curve `C`, Global initial real token reserves `G`, token-vault amount `M`, and the curve's quote mint.

1. If `complete` is nonzero (`0xa2408`) or Mayhem mode is zero (`0xa2420`), succeed without changing reserves.
2. Compute `D = 2*T - G - M` with checked **u64** arithmetic, where `T` is total token supply. Doubling overflow (`0xa2430`) or either subtraction underflow (`0xa2440`, `0xa2450`) produces Pump error 6024 (`Overflow`). These checks precede threshold no-ops.
3. Let `R` be real quote reserves and `V` virtual token reserves. If quote mint is all zeros, return unchanged when `R < 10,000,000`; otherwise return unchanged when `R < 1,000,000`. In both families return unchanged when `D < 1,000,000,000,000` (`0xa2500..0xa2588`). Nonzero means **any** nonzero quote mint; no USDC-only comparison exists here.
4. Compute `N = (u128(D) + u128(V)) * u128(R)` with checked **u128** multiplication. The carry from the low-64 addition is carried into the product at `0xa2608..0xa2640`; treating `D+V` as wrapped u64 would be wrong. Multiplication overflow returns 6024. An explicit zero-divisor guard also returns 6024 (`0xa2668`), although the preceding minimum-D guard makes this branch unreachable for the successful threshold path.
5. Compute floor integer quotient `Q = N / D` through `0xa2708 → 0x1b4088`.
6. Convert Q to u64 **before** capping. Nonzero high word goes to `0x19bd08`; its literal error code is 4102 at `0x19be78`. Do not silently cap an oversized u128 quotient.
7. Write only virtual quote reserves (`C+0x48`) to `min(Q, cap)`. The all-zero quote-mint cap is **2,000,000,000,000**; the nonzero cap is **160,000,000,000** (`0xa2810..0xa2870`).

`source-hypothesis.rs` expresses this body-level logic as uncompiled research. It is not part of a crate, does not contain an entrypoint or altered authorization checks, and does not assert compiler/Anchor parser equivalence.

## Event, CPI, and account exit

On successful helper return, the body calls `0x1a0938` once at `0x1380a0`; that helper invokes `sol_get_clock_sysvar` at `0x1a0978`. Clock errors propagate before event emission. It constructs and emits the 96-byte `UpdateMayhemVirtualParamsEvent` through `sol_log_data` (`0x138358 → 0x1a04f8`). It then sends the same event payload through event CPI, with the 8-byte Anchor prefix `e445a52e51cb9a1d`. The CPI target is Pump; its sole account meta is the event-authority PDA as read-only signer. The signer seeds are `[b"__event_authority", bump]`. The call at `0x138988 → 0x1a0530` leads through `0x1a1d70` to `sol_invoke_signed_rust` at `0x1a2068`.

| Event byte offset | Field |
|---:|---|
| 0 | Discriminator `757be4b6a1a8dcd6` |
| 8 | Timestamp i64 |
| 16 | Mint pubkey (32 bytes) |
| 48 | Old virtual token reserves u64 |
| 56 | Old virtual SOL/quote reserves u64 |
| 64 | New virtual token reserves u64 |
| 72 | New virtual SOL/quote reserves u64 |
| 80 | Real token reserves u64 |
| 88 | Real SOL/quote reserves u64 |

A reserve-helper no-op still reaches Clock and both event emissions. Only a helper error short-circuits before Clock. The captured body contains no token-transfer/burn CPI. After body success, the wrapper's exit function serializes the writable curve; the readonly Global is not serialized. Runtime event delivery, rollback, and all malformed-account combinations remain unvalidated in this lane.

## Handoff

There is no integration diff and no new candidate. Preserve this static package as an explanation of the remaining handler and its invocation prerequisite. Main Pump42 and all current handler counts remain unchanged. Existing stopped lanes are outside scope. A future implementation would still need an independently authorized, ordinary invocation path, full parser/error fidelity, pinned build provenance, and original-versus-candidate receipts; none of that is claimed here.

`verify.py` independently checks the sealed package hashes, original raw instruction/window bytes, signed branch targets, direct-call targets, referenced input hashes, and all 31 frozen source bindings. It executes no recovered logic or transactions.
