# Create-linked typed ancestor records

The typed prerequisite is materially recovered: the migration test is the four reserve fields, the next ancestor key is `quote_mint`, and the 56-byte record has separate curve and pool variants. This is static recovery of the original Pump bytes, not a complete nested-create implementation or security certification. No parent source changes or Rust patch are supplied. Arithmetic pricing remains a separate task.

All inputs are frozen at `517d77db988d8c63b6cf476f0be138c5a4f3128a` or copied exactly from the explicitly permitted root-reviewed `pump_create_nested` package. `provenance.json`, `windows.json`, and `prior-package.json` record full SHA256, Git blobs, extraction ranges and the prior seal. The complete original ELF has SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. It is not the current reconstructed Pump. No whole-file equality claim changes.

## Permitted identity and address conventions

The prior package binds create_v2 dispatch to wrapper `0x1268a8`, handler `0x1e7c0`, walk `0x18678`, and parser `0x19ec8`. The parser's call at `0x1a378` reaches `0x9b148`. That routine checks the literal BondingCurve discriminator `17b7f83760d8ac60` before selecting its decoding branch. This is independent type identity, not declaration-order inference.

The create wrapper also calls `0xb61d0` at `0x1272f8`; its call at `0xb6338` reaches the account-exit serializer `0x5a28`. The serializer writes that same discriminator from `0x1b64ef`, then the fields below. It is an independent create-exit cross-check; the read-only ancestor parser does **not** serialize the ancestor account. Its success path copies 160 decoded bytes at `0x1a788..0x1a7b0`.

Pool identity is established before following bodies: walk call `0x18d20 -> 0x65eb0`, then `0x66110 -> 0x65238`; its pool decoder `0x65590 -> 0x63cf0` checks Pool discriminator `f19a6d0411b16dbc`. The token balance reader is called at `0x65d78` and `0x65dd0`, both targeting `0x64888`.

Addresses are numeric ELF offsets for these windows, checked against the copied ELF. The disassembler's angle-bracket target annotations are displaced; encoded signed branch/call offsets govern. Window ends are bounded analysis extents, not recovered historical Rust symbols. No excluded handler body was analyzed. Small exploratory overshoots were trimmed from publication; no semantics are attributed to adjacent routines.

## Serialized data to decoded object to caller stack

`0x9b250..0x9b278` advances past the eight-byte discriminator. The latest decoder reads five u64s in order at `0x9f518..0x9f820`, validates complete at `0x9f830..0x9f858`, then consumes creator, flags, quote mint and remaining scalars through `0x9fe88`. The called primitives at `0xfab0`, `0xd068`, and `0xce88` consume respectively 32 bytes, one validated boolean, and eight bytes. Successful stores at `0x9fe90..0xa0040` establish the decoded positions.

The complete mapping is in `result.json.fields`. All serialized offsets include the discriminator. The serializer's Account wrapper places the decoded object eight bytes after its account pointer; this +8 is measured from the write operands, not assumed Rust layout.

| Field | Serialized offset | Decoded offset | Walk stack offset |
|---|---:|---:|---:|
| virtual_token_reserves | 8 | 0x40 | -0x2c0 |
| virtual_quote_reserves | 16 | 0x48 | -0x2b8 |
| real_token_reserves | 24 | 0x50 | -0x2b0 |
| real_quote_reserves | 32 | 0x58 | -0x2a8 |
| token_total_supply | 40 | 0x60 | -0x2a0 |
| complete | 48 | 0x99 | -0x267 |
| creator | 49 | 0x00 | -0x300 |
| is_mayhem_mode | 81 | 0x9a | -0x266 |
| is_cashback_coin | 82 | 0x9b | -0x265 |
| quote_mint | 83 | 0x20 | -0x2e0 |
| depth | 141 | 0x98 | -0x268 |

At `0x18758..0x187b8` the parser result at stack -0xe0 is moved to -0x300: first 16 bytes separately, 141 bytes starting at decoded +16, then the niche byte +0x9d and trailing two bytes. Ancestors repeat this at `0x18f28..0x18f70`. The holder-reward boolean at decoded +0x9d doubles as the Result error niche: value 2 indicates failure, values 0/1 are successful decoded booleans. It is not a separate serialized Result tag.

The serializer corroborates reserves with wrapper loads +0x48/+0x50/+0x58/+0x60 at `0x5b48..0x5c60`, complete +0xa1 at `0x5cb0`, creator +8 at `0x5cf8..0x5d20`, eligibility +0xa2 at `0x5d30`, cashback +0xa3 at `0x5d78`, quote +0x28 at `0x5dc0..0x5de8`, and depth +0xa0 at `0x5f60..0x5f88`. Remaining scalar writes are retained through `0x6068`.

## Length-selected defaults

Lengths here exclude the discriminator. The discriminator-checked dispatcher `0x9b148..0x9b430` selects the following branches. Intermediate lengths do not mean a partially decoded next field: the chosen older decoder leaves unconsumed suffix bytes and writes explicit zero defaults.

| Payload length | Decoder | Last decoded field; later fields default zero |
|---|---|---|
| 41–72 | 0x9b6a0 | complete |
| 73 | 0x9bc28 | creator |
| 74 | 0x9c240 | is_mayhem_mode |
| 75–106 | 0x9c8f8 | is_cashback_coin |
| 107–115 | 0x9d008 | quote_mint |
| 116 | 0x9d850 | can_edit_creator_fee |
| 117–132 | 0x9e178 | is_holder_reward |
| 133–157 | 0x9eaf0 | protocol_fees |
| >=158 | 0x9f500 | post_complete_quote_in |

Below 41 payload bytes fails. Every older branch explicitly defaults depth, initial virtual quote reserves, and both post-completion counters to zero; the oldest also zeros both pubkeys. Zero-default store tails are retained in all nine decoder windows. Booleans are validated, not normalized from arbitrary nonzero values. This differs from simply applying the current full-length derived `AnchorDeserialize` shown in the copied `trade_types` excerpt. Source promotion needs an explicit compatibility decision and implementation review.

## Typed pricing record, without pricing arithmetic

`0x190b0..0x190f0` loads the four reserves. **All four zero** selects the pool branch regardless of complete. Otherwise `0x190f8..0x19110` requires complete=false. Eligibility at `0x18808` is the immediate parent's `is_mayhem_mode`; this slice does not establish a repeated eligibility check for every ancestor. The next key copied at `0x18e50..0x18e98` is exactly the decoded quote mint.

Stores at `0x18d98..0x18df8` produce the seven-word record:

| Byte offset | Curve tag 1 | Pool tag 0 |
|---:|---|---|
| 0 | 1 | 0 |
| 8 | virtual token reserves | base vault amount |
| 16 | virtual quote reserves | adjusted quote balance low word |
| 24 | real token reserves | adjusted quote balance high word |
| 32 | real quote reserves | carried storage; inactive semantics unassigned |
| 40 | total supply minus Global decoded +0x3f0 | carried storage; inactive semantics unassigned |
| 48 | Global decoded +0x408 for zero quote mint, else zero | carried storage; inactive semantics unassigned |

The curve source registers are established by `0x190b0..0x19140` and restored at `0x19480..0x194a8`. Supply is lower-bound checked at `0x19110..0x19128` before subtraction at `0x19440..0x19450`. The zero quote comparison and native-only word are at `0x19148..0x19190` and `0x19400..0x19440`. Global field names are deliberately not guessed from declaration order. The pool return is loaded at `0x18d28..0x18d70`; tag=0 is set at `0x18d48`. Do not model all seven words as simultaneously meaningful fields of a flat Rust struct.

## Ordinary pool and vault acceptance

The caller derives pool authority using `pool-authority` and the current ancestor mint under Pump (`0x19290..0x19358`), then derives the AMM pool from `pool`, index zero encoded in two bytes, authority, current mint, and quote (`0x18bb8..0x18c90`). Zero quote mint is replaced with the embedded WSOL key at `0x194a8..0x19508`; otherwise the decoded quote key is used. Literal seeds and program IDs are copied in `constants.json` and byte checked.

`0x65260..0x652e8` checks pool address against that caller-provided PDA, then owner against Pump AMM. `0x63cf8` requires data length at least 211, and `0x63e10..0x63e28` checks Pool discriminator. It extracts only the two vault pubkeys at serialized +139 and +171 through the bounded 32-byte reader `0x64358` (calls `0x640f8`, `0x641a0`). Those offsets independently match the IDL's Pool token-account fields. `0x65600..0x65640` and `0x65b70..0x65bc0` compare supplied base and quote vault keys against them.

Each vault's **program owner** must be Token or Token-2022 (`0x648a8..0x64928`). Each data length must be at least 165 and not 355 (`0x64a38`, `0x64bf0`); state byte +108 must equal 1, and for lengths other than 165, byte +165 must equal 2 (`0x64de0..0x64e08`). Amount is read from +64. These helpers do not compare internal mint bytes +0..32 or internal token authority +32..64, and do not decode Pool base/quote mint fields. This is the observed acceptance contract for this create-linked helper, not a statement about every protocol path or a security conclusion.

Pool lengths >=261 supply a signed i128 quote adjustment from serialized +245..261 (`0x641e8..0x64260`); shorter accepted Pool data defaults it to zero. The IDL names it `virtual_quote_reserves`. At `0x65df0..0x65e38`, quote-vault amount is combined with that value by `0x645f8`; the helper checks signed overflow and nonnegativity, returns low/high words, and the outer success result returns base amount plus these two words at `0x65e78..0x65ea8`. This establishes the typed input to future pricing, without recovering the pricing fold.

## Remaining boundary and concrete handoff

This package closes the previously unnamed curve predicate, flags, quote link, decoded defaults, and active record inputs. It supplies a typed ledger rather than a speculative Rust memory layout or implementation patch. To produce integration-ready source next, bind Global decoded +0x3f0/+0x408 through its permitted decoder, then recover the variant-specific consumers in `0x62aa0` and the existing `0x61348`/`0x617e8` pricing contracts. Confirm which pool-tail words are inactive before defining the Rust enum. Full error precedence, account-context validation, ancestor depth consistency and trailing-account rules are not certified here.

No builds, runtime probes, fixtures, transactions, signatures, patching, staging, commits, or parent writes were performed. Current Pump/Fees differences and the 140 bounded / five partial / five unrecovered handler accounting remain unchanged. Verification checks evidence integrity and selected static bindings; it cannot prove exhaustive semantics or security.

Run `python3 verify.py` from any working directory. The copied-directory result is outside this seal in the worker's `verification-outcome.json`.

## Frozen disassembly source ranges

All rows below refer to `research/imported-lab/analysis/pump_fun/pump.asm`, blob `4c37a9b4931438cfab0311bea6c6398c5d909321`, SHA256 `d4a29dc6921d25d9d2e8e7a0f8b4d68027005f2ab74a8151d5ac8a8ab575ba0d`. Lines are inclusive; byte ranges are half-open. Prior walk/parser/wrapper ranges remain recorded in `inputs/prior/windows.json`.

| Copied window | Source lines | Byte range |
|---|---|---|
| decoder-entry.asm | 76455–76543 | 0x9b148..0x9b430 |
| decoder-latest.asm | 78552–78863 | 0x9f500..0x9ff00 |
| decoder-latest-tail.asm | 78864–78908 | 0x9ff00..0xa0070 |
| decoder-oldest.asm | 76620–76788 | 0x9b6a0..0x9bc28 |
| record-selection.asm | 12180–12218 | 0x19090..0x191d0 |
| pool-entry.asm | 50312–50431 | 0x65eb0..0x66280 |
| curve-update.asm | 47920–48052 | 0x60ee0..0x61348 |
| pool-validator-prefix.asm | 49936–50027 | 0x65238..0x65560 |
| pool-tail.asm | 50432–50439 | 0x66280..0x662c0 |
| pool-validator-rest.asm | 50028–50311 | 0x65560..0x65eb0 |
| pool-exit.asm | 50440–50440 | 0x662c0..0x662c8 |
| decoder-9bc28.asm | 76789–76975 | 0x9bc28..0x9c240 |
| decoder-9c240.asm | 76976–77182 | 0x9c240..0x9c8f8 |
| decoder-9c8f8.asm | 77183–77400 | 0x9c8f8..0x9d008 |
| decoder-9d008.asm | 77401–77657 | 0x9d008..0x9d850 |
| decoder-9d850.asm | 77658–77942 | 0x9d850..0x9e178 |
| decoder-9e178.asm | 77943–78237 | 0x9e178..0x9eaf0 |
| decoder-9eaf0.asm | 78238–78551 | 0x9eaf0..0x9f500 |
| pool-decode.asm | 49305–49574 | 0x63cf0..0x645f8 |
| vault-decode-prefix.asm | 49650–49732 | 0x64888..0x64b80 |
| pool-balances.asm | 49575–49649 | 0x645f8..0x64888 |
| vault-decode-rest.asm | 49733–49935 | 0x64b80..0x65238 |
| create-exit-prefix.asm | 89840–89950 | 0xb61d0..0xb6578 |
| pubkey-decoder-prefix.asm | 7633–7665 | 0xfab0..0xfbc0 |
| u64-decoder.asm | 6266–6282 | 0xce88..0xcf18 |
| bool-decoder-prefix.asm | 6320–6367 | 0xd068..0xd200 |
| bool-decoder-tail.asm | 6368–6369 | 0xd200..0xd210 |
| curve-exit-prefix.asm | 2710–2798 | 0x5a28..0x5d00 |
| curve-exit-rest.asm | 2799–2936 | 0x5d00..0x6150 |
| curve-exit-end.asm | 2937–2937 | 0x6150..0x6158 |
| create-exit-call.asm | 146118–146125 | 0x1272c0..0x127300 |
