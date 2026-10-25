# Pump route account and selector provenance

Substantive partial static result at frozen checkpoint `517d77db988d8c63b6cf476f0be138c5a4f3128a`. No source patch. O2's ordinary successful-hop identity transition is now connected to the parser and return producers. This is a conditional identity induction, not proof that every proposed route succeeds or a basis to remove source guards. Selector caller inputs and rate-override field identities are grounded below. Fee-config decoded-vector construction, numeric primitives, full transfer effects, and final/native settlement remain unclosed.

Original Pump: SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. All ranges are half-open original ELF file offsets. `windows.json` gives exact full disassembly SHA256/blob, line ranges, and byte ranges; `provenance.json` gives frozen source provenance. Names of windows are descriptive, not historical Rust symbol identities. Encoded branch/call offsets control; LLVM angle-bracket annotations are displaced.

The four reviewed predecessor reports/results/provenance and exact seals are retained in `prior/`. Only copied members were checked against those seals; uncopied members were not recertified. `pump_partial_types` is explicitly **buy_v3**, not legacy buy. Its Global/curve layout evidence is reusable as type evidence, not as route-handler identity. Route identity remains the discriminator/wrapper chain in `pump_route_depth`. No excluded instruction body was followed. Mint helpers were admitted only through the five-account parser's mint-reader edge; only the 82-byte ordinary success path is interpreted. Adjacent exploratory overshoots were trimmed. Whole known route windows contain branches whose semantics are outside this result.

## Five accounts and time-dependent stack views

The parser at `0xdd700` consumes five accounts. Its labels and success stores `0xde478..0xde4b0` fix this layout of H:

| H offset | Account | Parser evidence |
|---:|---|---|
| 0 | base mint wrapper | first reader `0xdd738 -> 0x288`, label `0xdd828`, store `0xde4a8` |
| 8 | quote mint wrapper | second reader `0xdd8c8 -> 0x288`, label `0xdd990`, store `0xde4a0` |
| 16 | curve wrapper | reader `0xdda10 -> 0x13048`, store `0xde490` |
| 24 | base token-vault wrapper | reader `0xddb68 -> 0x1d0`, label `0xddc40`, store `0xde480` |
| 32 | quote-vault AccountInfo pointer | raw fifth consumption `0xddcd0..0xddd18`, store `0xde478` |

The curve key is compared with the derived `bonding-curve`/base-mint PDA at `0xddf08..0xddf28`; writable checks follow. The parser compares curve wrapper+0x28 with the quote mint key at `0xde088..0xde130`, or admits zero curve quote with WSOL at `0xde130..0xde218`. Thus the zero sentinel is normalized by the account relation, not by replacing the serialized curve field.

At body entry `0x5b3d0`, r9=H[16]. Stores `0x5ba28/0x5ba38` put that curve wrapper at fp-0xab0. **At the arithmetic phase** `0x5caf8..0x5cb88`, fp-0xab8 becomes fp-0xab0+8, the decoded BondingCurve. Earlier fp-0xab8 (`0x5bd00`) is an unrelated temporary from quote-token-program selection; describing the stack slot as a curve pointer for the whole function would be wrong. Likewise fp-0xad0 begins as the base-vault wrapper (`0x5bd78..0x5bd90`) and later is reused for a numeric fee amount (`0x5da78`). fp-0xae8 preserves base-vault-wrapper+0x20 before this reuse (`0x5cb90..0x5cc60` / `0x5ce78`).

Base mint is fp-0xaa8 after `0x5ba80..0x5ba90`; quote mint is fp-0xac0 after `0x5bb60..0x5bc98`. Each mint wrapper's +0x58 points to AccountInfo, whose +0 is the key pointer; the mint reader stores this at `0x36b8`. No Rust declaration-order assumption supplies these offsets.

## Direction, output identity and authority induction

`0x5c5c8..0x5c660` compares the carried mint with the quote mint, retaining the comparison in fp-0xa68. Equality selects buy at `0x5cbc0 -> 0x5cc60`. Non-equality must then match base mint (`0x5c688..0x5c728`) and selects sell. Distinct base/quote keys are a hypothesis here; equality/alias behavior is not generalized.

On a successful non-completing leg, the return producer is now explicit:

| Direction | Input mint / input vault argument | Returned mint | Returned AccountInfo |
|---|---|---|---|
| buy | quote / H[32], for nonnative quote at `0x5dcb8..0x5dd38` | base, loaded `0x5f470..0x5f4c8` | base vault: saved fp-0xae8=H[24]+0x20; dereference and clone `0x5f4c8..0x5f508` |
| sell | base / base vault at `0x5d2b8..0x5d360` | quote, loaded `0x5eac8..0x5eb20` | quote vault: H+32 selected `0x5eb20..0x5eb30`, dereferenced at common `0x5f4d8` |

Common stores `0x5f508..0x5f588` write output key at result+0..32, amount at +32, buyback at +40, and cloned output AccountInfo at +48..96. This is **the curve vault even on a final leg**, not a claim that the result AccountInfo is the user's destination. The final destination transfer is a separate effect. Non-completion is tested via wrapper real-token reserve +0x58 at `0x5ea90..0x5eaa8`; completion paths are excluded from this theorem.

The inherited loop copies this output and the current base mint/curve/bump into its previous-hop record (`0x57590..0x57908`). Its input helper `0x5a260` compares the previous output key to target (`0x5aa60..0x5ab40`), and its non-equal path constructs seeds `bonding-curve`, **previous base mint**, previous bump at `0x5ab68..0x5abe8`. Source and authority copies at `0x5aca8..0x5b0a0` feed `0x5b390`. The first leg uses source/source_authority through `0x5aa40`. The raw helper bytes are included, but the downstream token CPI implementation is not newly certified.

For distinct mints M0,...,Mn, let curve Ci have base Mi and normalized quote M(i-1), and let Bi/Qi be its base/quote vaults. Conditional on successful parsing, ordinary non-completing execution and the imported PDA/memcmp contracts:

* Ascending buys M0→...→Mn return (Mi,Bi) after Ci. The next leg consumes Mi from Bi, under Ci authority and seeds [bonding-curve,Mi,bump_i], into Q(i+1). The next return is (M(i+1),B(i+1)).
* Descending sells Mn→...→M0 return (M(i-1),Qi) after Ci. The next leg consumes M(i-1) from Qi, **still under Ci authority with seed Mi**, into B(i-1). The next return is (M(i-2),Q(i-1)).

The base case is the fixed source and its signer; each step follows the just-proved return mapping plus the loop record. Distinct vaults/curves exclude the helper's equal-key no-transfer shortcut. This proves carried identities/authority arguments, not arbitrary route success, balances, alias safety, native lamport behavior or full CPI authorization. A zero normalized native endpoint requires the separately retained native-transfer obligations. No holder, cashback, Mayhem or extension case is covered.

Base-vault canonical-address checking is also connected: `0x5bd78..0x5bec8` passes (base-vault key, curve key, base mint key, selected token-program key) into `0x58bf0`. It compares against `0x1991e0`'s derived address. The latter assembles three 32-byte seeds in order **curve authority, token program, mint** and an embedded associated-token-program ID (`0x1991e8..0x1993a8`). Quote-vault validation/creation goes through `0x14910` at `0x5c0b8`; that body is not followed, so full canonical quote-vault acceptance is explicitly not closed.

## Selector inputs from actual layouts

At `0x5ca68..0x5caa8`, context+8 is fee-config wrapper; wrapper+0x88 supplies its AccountInfo. `0x10c78` clones AccountInfo (stores at `0x10d38..0x10d80`), then `0x1a2a68` reads its data RefCell and returns its slice length (+0x20) at `0x1a2a90`, with a borrow-state guard. This is total serialized account length, including discriminator, not curve length or vector count. The returned value is fp-0xa98 and is passed at outgoing stack -0x1000 to both selector calls (`0x5cd70..0x5cdb8`, `0x5cec0..0x5cef8`). The selector checks length >=2512 at `0x89ed8..0x89ee8`, and exotic fallback length >4096 at `0x8a168..0x8a1e8`.

The threshold producer is `0x5cb40..0x5cb88 -> 0xa08f8`. Ordinary mode passes decoded curve and **base mint wrapper**. `0xa0900..0xa09d8` rejects zero virtual-token reserve, loads base mint+0x28 and curve virtual-quote reserve+0x48, multiplies via `0x1b55c8`, divides by virtual-token reserve+0x40 via `0x1b4088`, and stores low/high at result+8/+16. The caller saves low to fp-0xac8 and high in r6, forwarding them in outgoing -0xff8/-0xff0. Selector stores these at fp-0x148/-0x140 (`0x8a000..0x8a020`). Therefore, conditional on the wide primitive contracts, the ordinary threshold is floor(mint_supply * virtual_quote_reserves / virtual_token_reserves), with both limbs preserved. This is not current circulating balance or necessarily curve.token_total_supply. The excluded mode branch is not generalized.

The mint supply is grounded through the actual ordinary decoder: parser `0x288 -> 0x32d8`; reader `0x3508 -> 0x1862f0`; raw 82-byte reader `0x186348 -> 0x1940c0`. Raw serialized +36 is loaded at `0x1941d0` and stored at result+40 (`0x194338`). The caller's staging `0x186370..0x186380` and `0x186478..0x186488` leads to decoded +40 at `0x1866b0..0x1866c0`; length exactly 82 jumps directly to success at `0x1864e8 -> 0x1866a0`. The outer reader copies that same word into mint wrapper+40 through `0x3648..0x3678`. Decimals independently propagate from wire +44 to decoded +48. Extension-path code between the ordinary length gate and success is not consumed or interpreted.

| Field | Serialized account offset | Decoded offset | Wrapper offset | Binding |
|---|---:|---:|---:|---|
| curve.creator_fee_bps | 115 (8 bytes) | 0x68 | 0x70 | nested ledger; serializer `0x5df8..0x5e38` |
| curve.quote_mint | 83 (32 bytes) | 0x20 | 0x28 | nested ledger; serializer `0x5dc0..0x5df8` |
| Global.creator_fee_configurable | 1045 (1 byte) | 0x436 | 0x43e | Global serializer `0x7668..0x76b0`; wire sequence in global-wire-layout.json |

Global names are corroborated by the frozen declaration excerpt, but decoded offsets come from serializer loads and the reviewed +8 account-wrapper binding. The Global serializer writes this boolean immediately after whitelisted_quote_mints and before max_configurable_creator_fee_bps; it is not is_holder_reward_enabled (the later wrapper+0x43f). Thus `0x8a370..0x8a3a0` overrides the second selected rate iff Global.creator_fee_configurable and curve.creator_fee_bps != 0. Neither ordinary Tokenkeg nor non-Mayhem alone eliminates it. Older curve decoder branches default absent override fields to zero as recorded in the unchanged nested/partial ledgers.

The selector's flat/exotic record offsets and 40-byte tier records are retained as the arithmetic predecessor's offset contracts. This package does **not** elevate FeeConfig +8/+16 to an independently decoded serialized Vec mapping: the fee-config reader and variable-length wire vectors must still be bound. Nor does length >=2512 prove all table contents or pointer validity. The caller supplies a fee-config wrapper in r4 and decoded Global (context[0]+8) in r2; their offsets must not be conflated.

## Remaining concrete prerequisites

1. Bind the route context's fee-config reader and its decoded vector/flat/exotic fields to serialized data, including historical length-selected defaults. Then close selector table/error contracts; no new fixture is prerequisite to this static task.
2. Close quote-vault validation/creation `0x5c0b8 -> 0x14910` on ordinary Tokenkeg only, and the downstream transfer wrapper from `0x5b390`; establish ordinary program selection `0x58668`. This is required for an unconditional accepted-account/authority claim beyond the conditional identity induction.
3. Retain arithmetic primitive, `0x950e0`, fee-accrual `0xa1bd8`, output transfer, native endpoint and event-order obligations from pump_route_arithmetic. O2 identity progress is not O1/O3 effect closure. No >2 observation or flag-zero runtime result was added.

Source changes: none. All four whole-file comparisons remain false; 140 bounded / five partial / five unrecovered is unchanged. No build, runtime probe, fixture, signature work, broadcast, source/binary patch, staging, commit, push or parent mutation occurred. No test or seal certifies exhaustive semantics/security.

`python3 verify.py` verifies exact file inventory/hash, copied predecessor seals, whole-source Git blobs, bounded assembly against original bytes, selected direct edges and wire offsets. It does not execute SBF or prove prose, and portable slices cannot independently reconstruct their full-ELF binding; full-object hashes were checked during frozen extraction. Copied-directory outcome is outside this seal in `verification-outcome.json`.
