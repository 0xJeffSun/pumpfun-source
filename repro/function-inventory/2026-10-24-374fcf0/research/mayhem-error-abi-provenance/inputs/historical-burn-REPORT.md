# Mayhem burn_tokens: static recovery draft

The isolated `crate/` reconstructs the no-argument `burn_tokens` path, its account parser, account codecs and `BurnEvent`. It is a partial source candidate, not a recovered complete program or a claim of binary identity. Main Mayhem source was not edited. No program instructions, transactions or initialization experiments were executed.

The captured original is `evidence/original/mayhem/deployed.so`, SHA-256 `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. All addresses below are original ELF virtual addresses, equal to file offsets for these reviewed sections. `static-evidence.json` records exact byte-range hashes and source hashes. `extract.py` calculates relative branch and internal-call destinations from instruction bytes, excluding R10 external-call relocations; annotations do not trust the old disassembler's displayed destination labels.

## State codec

The account wrapper at `0x7848`, serializer at `0x685f0`, and decoder at `0x688f8`/`0x68ce0` establish the following codec. Offsets include the eight-byte discriminator `b1fdbf7dcb16866b`; they are serialized offsets, distinct from reordered Rust memory offsets.

| Serialized offset | Width | Draft field/type | Rust memory offset | Evidence/qualification |
|---|---:|---|---|---|
| 8 | 8 | `field_8: u64` | `0x40` | Width established; name and signedness unknown |
| 16 | 8 | `end_timestamp: i64` | `0x48` | Signed comparison to Clock timestamp at `0xd8e0` |
| 24 | 32 | `mint: Pubkey` | `0x00` | Key-sized field; historical name not recovered here |
| 56 | 16 | `field_56: i128` | `0x20` | Width established; signedness/name unknown |
| 72 | 16 | `field_72: i128` | `0x30` | Width established; signedness/name unknown |
| 88 | 1 | `flag_88: bool` | `0x61` | Decoder accepts only 0/1; not a bump byte |
| 89 | 8 | `field_89: u64` | `0x50` | Width established; name and signedness unknown |
| 97 | 1 | `status: MayhemStatus` | `0x60` | Separate enum decoder accepts 0/1/2; only ended tag 2 has proven meaning |
| 98 | 8 | `burned_amount: u64` | `0x58` | Assigned the vault amount after successful Burn CPI |

The codec consumes/writes **106 bytes including the discriminator**. The existing 170-byte allocation observation is consistent with 64 additional trailing bytes; this codec does not consume or write those trailing bytes. The draft does not invent their meaning or initialize any state. `i128` versus `u128` choices have identical serialization here; their behavior in other handlers remains unproven.

`BondingCurve` has discriminator `17b7f83760d8ac60` and owner Pump (`6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P`), established by the wrapper at `0x7490`. Its serializer at `0x6dc00` writes five u64 values, bool, Pubkey, bool: 82 bytes including discriminator. Familiar reserve/creator field names in the draft are labels for this recovered shape, not independent recovery of their historical source names. `#[account("account")]` preserves the discriminator namespace while a manual `Owner` returns Pump.

## Exact account order and validation

The parser is `0x38670..0x3afb8`; the wrapper calls it before the body. Typed deserialization occurs first, then duplicate-mutable validation, then field constraints in order. No ordinary `Signer` field is present in this handler. This is not evidence that arbitrary accounts can satisfy its ownership, PDA, token or downstream CPI checks.

| Index | Field and wrapper | Additional constraints |
|---:|---|---|
| 0 | `mayhem_state: Account<MayhemState>` | writable; PDA `[b"mayhem-state", mint.key()]` under Mayhem; canonical bump |
| 1 | `mint: InterfaceAccount<Mint>` | writable; token-interface owner and mint codec |
| 2 | `mayhem_token_vault: InterfaceAccount<TokenAccount>` | writable; token account owner program equals **mint account owner**; token authority equals `sol_vault`; associated address for authority, mint and mint-owner token program |
| 3 | `sol_vault: UncheckedAccount` | writable; PDA `[b"sol-vault"]` under Mayhem; canonical bump |
| 4 | `bonding_curve: Box<Account<BondingCurve>>` | writable; Pump owner and discriminator; PDA `[b"bonding-curve", mint.key()]` under Pump |
| 5 | `global: UncheckedAccount` | consumed, no further burn-parser constraint |
| 6 | `pump_program: UncheckedAccount` | address equals Pump; parser does not use an executable `Program` wrapper |
| 7 | `pump_event_authority: UncheckedAccount` | consumed, no further burn-parser constraint |
| 8 | `system_program: Program<System>` | framework System ID and executable checks |
| 9 | `token_program: Interface<TokenInterface>` | framework legacy SPL Token or Token-2022 ID and executable checks |
| 10 | `event_authority: UncheckedAccount` | PDA `[b"__event_authority"]` under Mayhem |
| 11 | `program: UncheckedAccount` | consumed, no further account-parser constraint |

Duplicate checks insert only indices 0, 1, 2 and 4 into the framework set (`0x39848`, `0x39908`, `0x399c8`, `0x39af8`), returning 2040 for a repeated mutable typed-account key. The unchecked writable SOL vault is not included. Typed deserializers still enforce owner/discriminator/initialization constraints before this set is built.

Representative field constraints: state PDA `0x39bb0..0x39cc0`; mint mutability `0x39cd8`; vault owner-program mismatch 2023 `0x39cf8..0x39d70`; token authority mismatch 2015 `0x39d90..0x39e38`; ATA derivation and mismatch 2009 `0x39f38..0x39fd8`; SOL vault PDA `0x3a040`; curve PDA under Pump `0x3a250`; Pump address mismatch 2012 `0x3a320..0x3a3c8`; event authority PDA `0x3a418`. In particular, the ATA constraint uses `mint.to_account_info().owner`, not the supplied token-program key. The supplied program is subsequently used for the actual Burn CPI.

## Guards, effects and events

The handler is `0xd898..0xef10` (5,752 bytes). Its wrapper at `0x7ff08` has no instruction-argument decoder.

1. Read Clock with unwrap semantics. Require `end_timestamp <= unix_timestamp`, using a signed comparison. Failure is **6005 `MayhemModeNotEnded`**, message `Mayhem mode not ended`, source location `burn.rs:78`.
2. Require status != 2. Failure is **6004 `MayhemModeEnded`**, message `Mayhem mode ended`, source location `burn.rs:82`.
3. Read the full vault token `amount` and issue token **Burn, tag 8**, even when amount is zero. `0xe120` calls the wrapper at `0x90bc0`, whose instruction constructor is `0x93510`. Final instruction metas and invoke account-info order are source vault (writable, not signer), mint (writable, not signer), then SOL vault authority (readonly, signer). There are no multisig signer keys. Instruction data is byte 8 followed by the amount as eight little-endian bytes. The wrapper passes from/mint/authority at `0x90bc8..0x90c28`; meta flags are written at `0x93818`, `0x93868` and `0x938f8..0x93900`. Program ID is the supplied token interface's key. Signer seeds are `[b"sol-vault", &[ctx.bumps.sol_vault]]`. Any CPI error returns immediately.
4. Store the amount into serialized state offset 98 (`0xe138` writes Rust context offset `0x1b8`).
5. Obtain a fresh Clock and emit an 88-byte log event (`0xe1f0`, `0xe468`).
6. Obtain another fresh Clock and emit the same schema through event CPI (`0xe608`, `0xebe8`). These are **two separate Clock calls**, not a reused timestamp. All three Clock failures use unwrap panic paths, with body locations 77:52, 104:33 and 110:33 respectively.
7. Set status to ended/tag 2 only after the event CPI succeeds (`0xed80`), then run normal account exit serialization. The draft introduces no custom rollback behavior; no runtime rollback claim was tested.

`BurnEvent` discriminator is `21592f75527ceefa`, independently equal to SHA-256(`event:BurnEvent`)[0:8]. Payload order is discriminator (0), amount u64 (8), mint Pubkey (16), MayhemState account key Pubkey (48), timestamp i64 (80). The event CPI prepends `e445a52e51cb9a1d`, giving 96 bytes. Its target is Mayhem, with one readonly signer meta and one account-info entry for event authority; signer seeds are `b"__event_authority"` and the compile-time bump `0xfc`. There is no Pump CPI in this body; Pump-related accounts are nevertheless parsed and checked as above.

## Framework evidence and build boundary

Anchor **1.0-family** is supported by multiple independent code paths: error 2040 and its duplicate-mutable set generator; the CpiContext carrying a 32-byte Pubkey program ID; and the event macro using `crate::EVENT_AUTHORITY_AND_BUMP.1`. These features match the [immutable Anchor v1.0.0 sources](https://github.com/otter-sec/anchor/tree/25be6d502ec6957d34d436bc2a6170040fc64153), with exact URLs and full-file hashes in `anchor-source-provenance.json`. Relevant lines: error.rs 175–185; try_accounts.rs 277–293 and 327–420; context.rs 179–205; event macro 170–194; token_2022.rs 105–120. This is a controlled baseline, not unique attribution to 1.0.0; later compatible releases may share these features. Earlier 0.31 API examples in the previous static inventory are superseded for this draft by these stronger observations.

The source has all Anchor macro crates and anchor-syn pinned to 1.0.0 in Cargo.lock. Other dependency selections are a current compatible resolution, not recovered original versions. Platform-tools v1.52 is a controlled Rust 1.89 baseline compatible with the hashbrown-0.15.4 embedded family observation, not an exact original compiler assertion.

`build-01` preserves the initial failed compile: the draft wrote a dereferenced token-owner expression, and Anchor's appended `.key()` produced E0614. The revised source retains the owner reference; this changes draft syntax to express the already recovered constraint. Build-02 compiled but static review exposed a separate mismatch in convenience-macro expansion: Anchor 1.0 `#[event_cpi]` generates inline AccountInfo wrappers and a constant-address constraint, while the original uses borrowed unchecked wrappers and a runtime PDA seed check. Build-03 replaces that attribute with explicit original-compatible event account declarations, while retaining `emit_cpi!` in the body. The immutable macro parser source is included. This does not establish which historical macro, custom declaration, or dependency revision the original used. Build and static-comparison outcomes are recorded separately in `BUILD.md`.

Remaining source gaps are historical field/enum names, unused field signedness and semantics, the full original error enum, original dependency graph and compiler release, original source path/line layout, and all unrelated program handlers. These affect binary identity. A compiling draft and selected matching helper bodies cannot establish transaction behavior or complete-program equivalence. Future runtime validation, if separately authorized, still needs legitimate existing accounts satisfying the recovered constraints; no such state was fabricated here.

Reproduce static hashes with `python3 work/mayhem-burn-static/collect_evidence.py`. Compilation command and actual environment are in each build's `build-attempt.json`. The isolated Cargo cache was fetched before the locked/offline builds; the build itself has no original executable as a compiler input.
