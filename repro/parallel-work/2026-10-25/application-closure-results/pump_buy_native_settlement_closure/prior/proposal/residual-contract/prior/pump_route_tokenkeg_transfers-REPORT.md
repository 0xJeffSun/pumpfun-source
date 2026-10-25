# Ordinary Tokenkeg route transfer interfaces

**Conditional static interface closure, not full transfer execution or route closure.** The admitted input call at `0x5b390` and output/buyback dependencies `0x8eda0`, `0x93050`, `0x940c0` all reach `0x17fcc8`. Their ordinary Tokenkeg path constructs TransferChecked data/metas and reaches the original `sol_invoke_signed_rust` relocation at `0x1a2068`. Native endpoints, upstream account/program acceptance, external token execution, allocator/drop behavior and complete serialized error conversion remain separate obligations. No source patch is proposed.

Accepted checkpoint: `4d3c19e3c58427f3604caede144b3322fa56d2b5`. Pump original Git blob `85cb0059f2814c86224fdfea778c56df770dd920`, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. Disassembly blob `5b5e301459060ae51ddca1594584f7f470e92e48`, SHA256 `b77243c4614b2d03761480f1ed52faab7be906650fcdb706590e5585c89ac360`. Provenance records each bounded byte interval and corresponding full-disassembly line range. All byte ranges here are ELF file offsets, end-exclusive. Except relocation symbols, helper names are descriptive; no historical Rust symbol or whole-function boundary is asserted. Encoded relative offsets take precedence over displaced LLVM annotations.

## Admission and inherited contracts

The immutable `pump_route_accounts` report admits the input helper from the route and fixes H: base mint +0, quote mint +8, curve wrapper +16, base-vault wrapper +24, quote-vault AccountInfo pointer +32. The immutable settlement report supplies the three exact output callsites and their amount/flag order. Copies of these reports and their original seals are retained. Only copied members are verified against their seals; entire old packages are not recertified.

The common CPI record was admitted from these callers' account copies, amount, decimals and seed descriptors before following its builder or invoke dependencies. Builder `0x1936d0` receives keys plus amount/decimals and an explicitly empty multisig-key list. Packer `0x191338` is admitted only for its tag-12 arm; other serialization arms are not analyzed. Invoke `0x1a0530` receives that instruction, four AccountInfos and the original caller's seed slice. Its four borrow dependencies are admitted only by those AccountInfo arguments. No extension processor or stopped handler was followed. Mechanical excerpt overshoots were trimmed; adjacent instructions are not a semantic premise.

Consume `prior/pump_route_wide/CONTRACTS.md` as **manual instruction-ledger/algebra contracts**, not automated proof. Its exact u64-product/u128-positive-division contracts support the inherited buyback `floor(G[0x418]*P/10000)` under settlement's guard and checked ordering. This worker does not re-prove arithmetic or change amounts. The prior partial-types chain is buy_v3, not legacy buy.

## Exact admitted caller arguments

Notation: F is the route frame, A=`*(F-0xa48)` its context, H=`*(F-0xa40)`, C=`*(F-0xab0)` its curve wrapper. Base/quote mint wrappers are `*(F-0xaa8)` / `*(F-0xac0)`. A mint wrapper's AccountInfo is +0x58 and decimals byte is +0x30. Selected program AccountInfos are the 48-byte values at F-0x7f8 (base) and F-0x7c8 (quote). Their valid selection is an upstream obligation, not proved by assuming a helper name.

| Edge | Program, source, mint, destination, authority | Amount / signer seeds |
|---|---|---|
| `0x5d360 -> 0x5a260` | base program; initial source or previous output vault; base mint; base-vault AccountInfo `*(*(F-0xae8))`; initial authority or previous curve | `*(F-0xa78)`; initial empty outer slice or previous-curve seeds |
| `0x5dd38 -> 0x5a260` | quote program; initial source or previous output vault; quote mint; quote-vault AccountInfo `*(F-0xae0)` | same carried input amount and authority selection |
| `0x5d518 -> 0x8eda0` | quote program; `*(H+32)`; quote mint; `*(*(A+0x30)+0x20)`; `*C` | caller r8, inherited net sell output; current-curve seeds |
| `0x5e1d0 -> 0x93050` | base program; `*(*(F-0xad0)+0x20)` at this phase; base mint; same destination; `*C` | `*(F-0xa70)`, inherited base output; current-curve seeds |
| `0x5e398 -> 0x940c0` | quote program; `*(H+32)`; quote mint; `*(A+0x38)`; `*C` | caller r7, inherited summed buyback; current-curve seeds |

Evidence: `route_input_sell`, `route_input_buy`, `sell_call`, `buy_call`, `buyback_call`, and each wrapper's `entry/continue/exit` excerpts. A+0x30 and A+0x38 are exact destination selectors; their destination/buyback labels are corroborated by reconstruction declarations (`source-declarations.rs:19-25`), not a fresh full context-parser proof. The offset interface remains authoritative.

At `0x5a260..0x5a2b0`, outgoing stack -0x1000/-0xff8/-0xff0/-0xfe8 becomes target AccountInfo / decimals / mint AccountInfo / amount. Initial context source is `*(*(A+0x28)+0x20)` and authority `*(A+0x20)`; the first clone chain starts `0x5a2f8`, `0x5a378`. At `0x5aa60`, previous record P supplies a source key pointer at P+0x20, with its AccountInfo fields at P+0x20..+0x50; previous authority is at P+0x50..+0x80. `0x5aa60..0x5ab40` compares source and target account keys; equality returns tag 2 without CPI. Non-equality forms `["bonding-curve" (13), P[0..32], P.byte[0x80] (1)]` at `0x5ab68..0x5abe8`, then skips transfer if amount zero at `0x5abf8`. Thus previous **base mint**, not necessarily the transferred mint, supplies the seed. First-leg amount-zero skips before account cloning (`0x5a2c0`).

Current-curve seeds are `["bonding-curve", base_mint.key, bump_byte]`: `0x5c650..0x5c720` selects the base mint AccountInfo in either direction; `0x5c940..0x5c958` clones it; `0x5c958..0x5c9e8` forms three seed descriptors of lengths 13,32,1. The bump is the saved incoming stack -0x1000 value (load `0x5b4b8`, save `0x5b770`, low byte `0x5c9b8`); the upstream parser's validity of that bump is imported, not regenerated. The three output wrappers pass one seed group. The first input transfer passes zero groups at `0x5a9e8`; previous-hop input passes one at `0x5b340`.

## Shared instruction and CPI ABI

The record K passed as r2 to `0x17fcc8` contains 48-byte AccountInfos at +0x18 program, +0x48 source, +0x78 mint, +0xa8 destination, +0xd8 authority; +0x108/+0x110 is signer-seed pointer/count. The first 24 bytes are an empty remaining-account vector. r3 is amount; r4 supplies decimals (serialized low byte).

`0x17fcc8..0x17fd60` loads the five keys and calls `0x1936d0` with program in r2, source in r3, mint in r4, and destination/authority/empty multisig list/amount/decimals on its outgoing stack. `0x1936f8..0x1937e0` compares program bytes first against Token-2022 and then Tokenkeg; the ordinary Tokenkeg inequality/equality sequence reaches `0x1937e0`. Only the ordinary path is claimed. Neither this key comparison nor being non-Token-2022 proves upstream account ownership.

`0x1937e8..0x193828` forms in-memory variant 12. The admitted dispatch is `0x191338..0x191390`, `0x1913e8..0x1913f8`, `0x191548`, then `0x1917a8..0x1917e0`; return is `0x191d30..0x191d70`. It produces exactly:

```
byte[0]    = 12
byte[1:9]  = amount.to_le_bytes()
byte[9]    = decimals as u8
length     = 10
```

The 34-byte meta layout is key[32], signer byte, writable byte. `0x1938d8..0x193a50` builds:

| Order | Key | Signer | Writable |
|---:|---|---:|---:|
| 0 | source | 0 | 1 |
| 1 | mint | 0 | 0 |
| 2 | destination | 0 | 1 |
| 3 | authority | 1 | 0 |

The authority signer bit is one because multisig-key count is explicitly zero (`0x17fd20`, `0x1939c8..0x1939e0`). No additional signer-key metas are traversed. Program key is copied into the instruction separately at `0x193b80..0x193c48`.

`0x17fde0..0x17ff68` copies four AccountInfos in **source,mint,destination,authority** order, sets account count four, forwards K+0x108/+0x110 unchanged and calls `0x1a0530`. The program AccountInfo is not a fifth entry in this four-entry slice. The instruction's program key is still present. `0x1a0818..0x1a0868` passes the same seed pointer/count to `0x1a1d70`, which copies instruction metas/data, keeps the AccountInfo slice, and calls the ELF relocation **sol_invoke_signed_rust** at `0x1a2068` with `(instruction, infos, 4, seeds_ptr, seeds_count)`. `relocations.json` binds the relocation/symbol/name bytes and ELF section metadata. This is an actual imported-symbol identity, not inference from call -1.

## Conditional error and side-effect order

1. Caller gates and input zero/equal-key shortcuts precede cloning/CPI. Buy output `0x93070` and buyback `0x940e0` skip immediately on zero amount, writing success tag 2 via their common return. Quote output `0x8eda0` has **no amount-zero shortcut**: if the caller invokes it, zero still reaches the builder and CPI. Do not normalize these wrappers into a universal early-return transfer helper.
2. Non-skipped wrappers increment reference counts in program, source, destination, authority, mint order. Each increment is stored before its wrap-to-zero check; failure reaches the imported `abort` relocation (`0x8ee00`, `0x93108`, `0x94178`; input has the analogous local shape). These are ownership bookkeeping effects, not token balances or recoverable Anchor errors.
3. Program-key check precedes packing; packing allocation precedes meta allocation. On the admitted Tokenkeg key, the unsupported-program branch cannot be taken. Allocation/terminal helper failure behavior is not promoted to a fully reconstructed error ABI.
4. `0x1a0530..0x1a0818` walks metas in order, scans AccountInfos in order for the first equal key, and checks lamports before data for the match. If none matches, it advances to the next meta; it does not synthesize a missing-account error there. The external invoke remains responsible for its own validation. No alias or arbitrary-account acceptance theorem follows.
5. Writable source/destination use `0x1a2c30` then `0x1a2d38`: borrow counter must be zero; set to -1, then caller releases by adding one. Readonly mint/authority use `0x1a2ba0` then `0x1a2ca8`: unsigned counter must be <=0x7ffffffffffffffe; increment, then release by subtracting one. Lamports borrow is released before the data check. Failure returns raw sentinel `0x800000000000000b` before syscall. Success sentinel is `0x800000000000001a`. This is exact local borrow precedence, not a claim about the serialized outer error variant.
6. After borrow checks, instruction-copy allocations precede syscall. Syscall r0=0 yields success sentinel at `0x1a2078..0x1a2098`; nonzero passes through converter `0x1a20b0`. `0x17ff78..0x17ffd8` preserves success as tag 2 or calls another error converter before cleanup and return. Constructor/cleanup dependencies are retained as opaque edges; no complete byte-for-byte error object is asserted.
7. Imported settlement order remains input transfer before reserve mutation, conditional output transfer before fee accrual, then conditional buyback transfer before event construction. Result checks at `0x5d520`, `0x5e1d8`, `0x5e3a0` gate continuation. The flag-zero branch suppresses buyback transfer, not accrual/event construction. No token balance mutation is implemented locally by these wrappers; token effects occur beyond the invocation boundary. Failed transactions are not claimed to commit intermediate stores.

## Residual obligations and publication limits

- The other worker owns `0x14910` quote-vault validation/creation and `0x58668` program selection. Required interface: H[32] must be the accepted ordinary quote vault; selected program AccountInfos must have Tokenkeg keys with appropriate upstream owner/mint/authority/account validation; curve/base-mint/bump and destination selectors must retain the admitted identities. These helper bodies were not analyzed here.
- Native endpoint operations (including `0x58f58` and native output paths), external Tokenkeg processor/runtime semantics, transaction rollback, runtime signer derivation/privilege enforcement, and arbitrary aliases remain unclosed. The supplied signer seeds are established; their authorization is not simulated or bypassed.
- Complete allocator, refcount cleanup/drop and error-conversion semantics remain opaque. This result closes the ordinary instruction/metas/invoke/seed interface and local conditional precedence, not every transitive exceptional path. A genuine source patch needs those contracts plus upstream acceptance and existing source-order reconciliation; none is supplied.
- All four whole-byte comparisons remain false. The 140/150 bounded, five partial, five unrecovered status is unchanged. No exhaustive semantics/security claim follows from this package or prior saved tests.

Only frozen public tracked objects were consumed. No runtime, fixtures, builds, network, signatures, chain actions, binary patches, staging, commits, pushes or parent writes occurred. `verify.py` checks exact inventory/seal, copied predecessor members, byte/disassembly agreement, decoded selected edges, constant bytes and ELF relocation linkage. It executes no SBF and is not an automated proof of prose or imported arithmetic. Whole-object hashes were checked during extraction; the portable slices cannot independently rebind themselves to an absent whole ELF. Copied-directory verification is recorded in the sibling `verification-outcome.json`, outside this seal.
