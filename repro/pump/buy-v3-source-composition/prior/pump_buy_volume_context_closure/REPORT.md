# Ordinary BuyV3 volume/context closure

Status: **concrete, uncompiled source hypothesis for root review**. The volume parser, wire layout, post-base-CPI key initialization and successful generated exit are recovered within the ordinary BuyV3 scope. `proposed/trade.rs` applies the minimal corrections to the completed `pump_partial_source_hypothesis` proposal; `minimal.diff` is against that exact predecessor, **not directly against checkpoint trade.rs**. `proposed/lib-buy-v3.diff` changes only checkpoint lib.rs line 100's context type. No parent files or predecessor seals were changed. No build, typecheck, fixture, runtime probe, network, transaction or completion-count change occurred.

The recovered application boundary is substantially narrower than before: an already initialized volume key is no longer a prerequisite of the proposed ordinary path. Framework account initialization/exit is now explicit. This does not certify the surrounding candidate context, native settlement or event fields and is not whole-program equivalence or original-source identity.

## Fixed evidence and identity

All repository reads use `git show 476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40:<path>`. The retained original ELF is 10,485,715 bytes, SHA256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`. It was independently compared with the same-checkpoint public `pump_partial_types/inputs/original.so`. Previously extracted files remain unchanged.

Wrapper [0x1286c8,0x128c28) loads `Instruction: BuyV3` from [0x1b7dd3,0x1b7de5). Signed call operands independently establish 0x128808 → parser 0x102578, 0x128930 → body 0x147ba0, and 0x128978 → exit 0x107b38. Parser window is [0x102578,0x105b78); body window [0x147ba0,0x1489f8), with the predecessor's shared body return [0x148600,0x148620). The wrapper calls exit only after the body returns success (tag 2 at 0x128940); body failure skips it. These are attributed instruction windows, not recovered historical function names. Assembly annotations are not used to resolve calls. `call -1` import sites are resolved through ELF relocation/symbol tables, not treated as recursive calls.

## Volume parser and creation

The volume account occupies output-context slot +0x58: parser saves the init helper's result at stack -0xad8 at 0x103908 and copies it into this slot at 0x105ac0..0x105ad0. User occupies slot +0x40 at 0x105af0. This connects admission to the exact decoded object later mutated by the body and serialized by exit.

The parser first derives the PDA using two seeds: the 23-byte literal `user_volume_accumulator` at 0x1b6f73 and the signer's 32-byte key. Preparation [0x103548,0x103608), find-address call 0x103608 → 0x1a7eb8, bump save at 0x103650..0x103670, and key comparison [0x103670,0x103708) precede initialization. Mismatch constructs 2006 (ConstraintSeeds) at 0x103718 and attaches the account name and compared keys. The derivation syscall/curve rejection and canonical bump search are imported Solana framework premises; no alternate PDA or arbitrary bump is accepted by the proposal.

At 0x1038f8 the parser calls [0x105b78,0x107b38), passing the volume account, Rent, user payer, system program, derived bump and program ID. This is the concrete `init_if_needed` pattern:

* Non-System owner: 0x105bf8 calls the checked account reader 0x9ab0. That reader compares against the Pump owner literal [0x1b79df,0x1b79ff), borrows data immutably, and calls checked decoder 0x101c20 at 0x9d40. Wrong owner returns 3007. The reader's System-owner/zero-lamport check returns 3012; in this init helper System ownership instead selects creation/preparation. Decode errors propagate with the volume account label. A decoded heap object is copied, not a persistent data borrow.
* Existing checked account: [0x105f68,0x105f88) requires **exactly 137 data bytes**, else 2019 (ConstraintSpace at 0x106120). It then compares the captured owner with program ID ([0x105f88,0x105fe0), 2004 on failure) and requires lamports at least Rent.minimum_balance(137) ([0x107360,0x107540), 2005 on failure). A larger allocation is not accepted merely because 106 bytes can be decoded.
* System-owned, zero lamports: [0x1061e0,0x1067e0) computes minimum balance for 137 bytes and constructs a signed System create-account CPI (0x1067b8 → 0x19dd50), with user payer and Pump owner. CPI errors propagate.
* System-owned, positive lamports: compares payer key against target key at 0x105d80; equality reaches error 4101 at 0x106968. It computes max(minimum_balance(137),1), transfers only a positive shortfall (0x106eb8 → 0x19e090), allocates 137 bytes (0x1072f0 → 0x19d630), then assigns Pump ownership (0x107950 → 0x19d9c0), signing with the same PDA seeds and bump. These CPI wrappers and their argument movement are retained; standard System instruction processing and transaction rollback are explicit premises. This is not an unchecked success path for an arbitrary funded account.
* Following successful creation/preparation, 0x107990 → 0x5628 takes the **unchecked-discriminator decoder**, still checking Pump ownership and borrowability and decoding all fields. It is unchecked only as to discriminator; no unbounded raw pointer write is proposed. The system's zero-filled newly allocated data is an imported premise. Account creation does not set the user key to the signer or eagerly serialize it.

After the helper returns, the outer parser checks volume writable at [0x103928,0x103948) (2000 at 0x103f88), reads lamports/data length and performs another rent-exemption check through 0x103a10 → 0x1a0c78 (2005 at 0x104178). Thus allocation success does not bypass the outer writable/rent checks. Rent helpers, account-list iteration and allocation/drop implementation are bounded framework premises, not newly proven historical library source.

## Wire layout and decoded memory

Checked decoder [0x101c20,0x101ef8) requires eight discriminator bytes (3001 if absent), compares `56 ff 70 0e 66 35 9a fa` (3002 if wrong), then enters [0x101ef8,0x102578). The unchecked reader skips the discriminator comparison but still requires the eight-byte prefix. Field truncation and invalid bool bytes map to 3003. Both booleans require 0 or 1; the second is read through 0x1021a8 → 0xd068. No older short-layout fallback or defaulting appears here.

| Wire bytes, half-open | Existing source field | Decoded Account wrapper offset |
| --- | --- | --- |
| 0..8 | discriminator | not a data field |
| 8..40 | user | +0x08..+0x28 |
| 40..41 | needs_claim | +0x68 |
| 41..49 | total_unclaimed_tokens | +0x28 |
| 49..57 | total_claimed_tokens | +0x30 |
| 57..65 | current_sol_volume | +0x38 |
| 65..73 | last_update_timestamp | +0x40 |
| 73..74 | has_total_claimed_tokens | +0x69 |
| 74..82 | cashback_earned | +0x48 |
| 82..90 | total_cashback_claimed | +0x50 |
| 90..98 | stable_cashback_earned | +0x58 |
| 98..106 | total_stable_cashback_claimed | +0x60 |
| 106..137 | unused allocation suffix | not decoded or rewritten |

Integer fields are little endian; timestamp signedness is supplied by the existing source declaration, since the byte loads alone do not establish a Rust signed type. `lib.rs:450–452` already declares this exact serialization order and discriminator-generating account name. The independent exit writes confirm the mapping: [0x6308,0x6340) writes 32 bytes from decoded +8, [0x6340,0x6388) writes the first bool from +0x68, then four u64-width fields, second bool from +0x69, and four further u64-width fields. This totals 106 including discriminator; 137 is **allocation space**, not the serialized field length. The decoded-memory offsets are not interchangeable with account-data offsets.

## Mutation and serialization timing; borrow and alias behavior

The base-transfer helper call at 0x83ed8 → 0x8f5c8 must succeed before [0x83ef8,0x84068). The next comparison is user versus Global.whitelist_pda, via 0x83f88 → sol_memcmp_ wrapper. Equal branches to 0x84468, skipping the initialization/accrual block. On inequality, 0x83fa8 loads context+0x58 and adds 8 to reach **decoded user**. The comparison at 0x83ff8 checks those 32 bytes against zero. A nonzero key branches directly to 0x84068, preserving it; there is no user-equality check on an already nonzero decoded key in this block. On zero, stores at 0x84030,0x84040,0x84050,0x84060 copy four signer-key words. Fee accrual follows at 0x840a0 → 0xa1bd8. No raw account data is borrowed or serialized here, and none of the other volume fields is reset.

The source insertion uses the predecessor's `normal` guard, which already entails non-whitelist and excludes Mayhem/unsupported token domains. It is immediately after successful TransferChecked and before protocol/creator accrual. Other nonordinary branches remain outside this proposal's claim. A base CPI failure cannot reach the insertion. A later funding/event/exit failure relies on normal transaction rollback; the insertion is not an early persistence operation.

Generated context exit [0x107b38,0x107f78) first exits BondingCurve (0x107b80 → 0x5a28), processes intervening interface-account exit checks, and calls volume serializer at 0x107d80 → 0x6158. Any earlier exit failure prevents volume serialization. Thus volume data writes occur **after the successful full body**, including its event CPIs, not before fee accrual or before those events.

Volume exit [0x6158,0x66f0) compares the declared owner with the running program ID, and skips serialization when the account is closed. Closed helper [0x19bac0,0x19bb30) means System-owned and data-empty; it is not a zero-lamport-only predicate. Otherwise it obtains a fallible mutable data borrow at 0x61e0. It writes discriminator, user and all remaining fields in wire order through bounded writer 0x19b548. Short writes become 3004 at 0x6690. The writer copies at most remaining capacity, advances its cursor, and reports failure if fewer than requested bytes were written. It does not zero the trailing allocation suffix. Partial writes before an error are not an instruction-success receipt.

Borrow helper [0x1a2ca8,0x1a2d38) allows an immutable borrow only when the unsigned borrow state is at most 0x7ffffffffffffffe, increments it, and returns a guard. Mutable helper [0x1a2d38,0x1a2db0) requires state zero and sets it to -1. Both otherwise return the borrow error representation ending in 0xb; account readers convert it through their error path. Guards are released on decode/serialize completion. `data_len()` and `lamports()` helpers use shared-borrow checks with panic paths, rather than unchecked access; they are not replaced by fabricated successful lengths.

AccountInfo aliases share those RefCell states: the source hypothesis imports that framework behavior. It adds no blanket distinctness rule. The concrete funded-System payer/target alias rejection is retained by `init_if_needed`; existing Pump-owned accounts do not gain an invented decoded-user==signer constraint. Outstanding incompatible borrows at exit fail, rather than being bypassed. The natural Box<Account> proposal delegates these operations to Anchor; no custom unsafe decoder, guessed offset, success stub, padding or altered signature checks is supplied.

## Quote mint/program reconciliation and concrete source changes

Both mint account reader sites (base 0x102738, quote 0x102890) call 0x288 → mint admission 0x32d8. The quote is a typed boxed interface mint, not the unchecked field in the reused SellV3 candidate context. Mint admission checks membership of the owner in the two token program IDs, borrows data and calls the mint decoder; zero-lamport System ownership is uninitialized. This package imports ordinary initialized legacy mint decoding; it does not follow extension bodies or assert their acceptance.

Both token program fields separately call 0x120 → 0x9eb0 (0x1029e8 and 0x102a30), checking the key against Tokenkeg or Token-2022 and checking executable. A two-ID interface check is **not proof that the supplied quote program equals the mint owner**. The native shortcut in checkpoint `check_quote` omitted typed mint admission; typing the BuyV3 quote field repairs that omission even for WSOL. The retained USDC helper still enforces quote owner==supplied quote program and its token-account/ATA checks. Those pre-existing restrictions are not newly proven to have original precedence or to be exhaustive original parser behavior. No additional native owner/program equality constraint is invented.

The original key relation [0x104330,0x104538) compares supplied quote key to decoded BondingCurve.quote_mint. Equality goes to 0x1045b0. Otherwise the curve key must be zero and supplied key must equal WSOL (literal at 0x1b5cc8). Failure calls the custom error constructor with index 4 at 0x1044d0, corresponding to MintDoesNotMatchBondingCurve in this hypothesis. This is a necessary relation, not sufficient admission: zero/zero equality does not make a System account a valid Mint. In particular curve=WSOL/supplied=zero is rejected, contrary to checkpoint check_quote's symmetric shortcut.

`proposed/BuyV3-context.rs` duplicates the candidate account order into a separate BuyV3 context, types quote_mint, types volume as Box<Account<UserVolumeAccumulator>>, uses `init_if_needed,payer=user,space=137,seeds=[literal,user],bump`, and places the asymmetric key constraint on bonding_curve. The proposed trade file selects this context only for buy, adds the decoded-key insertion, and gives it a private typed-quote helper. Existing SellV3, sell body, buy_exact_quote body and existing shared check_quote are byte-preserved. The lib diff changes only buy_v3's context type, keeping arguments and OptionBool handling intact. This duplication is deliberate to avoid silently imposing BuyV3 initialization semantics on SellV3. Root must retain/export the generated BuyV3 client-account context alongside the existing trade exports when integrating.

## Residual limits and acceptance boundary

* The source uses a natural Anchor context rather than hand-translating the complete parser. It imports init_if_needed expansion, owner/discriminator errors, PDA derivation, Rent, Borsh, shared RefCell guards, ordinary SPL Mint decoding, CPI processor semantics, sol_memcmp_/sol_memcpy_, allocation success and transaction rollback. These are explicit bounded premises; no historical dependency/compiler identity is claimed. The macro's complete constraint/error ordering must be compared by root before promoting this proposal.
* Full context equivalence remains open: all existing token-account/fee/global/associated-address checks, alias interactions across unrelated fields, other handler modes and combined malformed-input error precedence are not certified. The quote key relation is concretely corrected, but the existing helper's supported-domain restriction to SOL/USDC remains.
* This resolves the zero-key application gap for ordinary BuyV3 under the declared framework contract. It does not resolve predecessor native settlement, pre-existing TradeEvent volume metadata (still candidate zeros), holder fields, optional-fill branches or event-equivalence gaps. No numeric coverage, handler or completion count changes are justified.
* No historical function identity, whole-binary match, original source recovery, exhaustive security conclusion or runtime acceptance follows from these static checks. The proposal has not been compiled or typechecked, as instructed. Root owns implementation acceptance and any later authorized tests.

## Publication and verification

`inputs.json` gives whole-input sizes/hashes, exact checkpoint, source line/byte ranges and unchanged predecessor copies. Full trade input is retained for precise diff/opaque preservation; only specified source ranges are analyzed. `ranges.json` records exact virtual and ELF file-byte intervals for every retained assembly window and literal, plus branch/call and import metadata checks. Early partial extraction windows remain, including overlapping prefixes; they are not advertised as complete functions. Omitted full-source bytes cannot be independently reconstructed from excerpts; their whole-source hashes are provenance attestations.

`manifest.json` seals all members except itself and `manifest.sha256`; the latter anchors the manifest. `verify.py` uses only Python's standard library, checks the complete inventory and seals, all retained instruction bytes against the ELF, signed call/branch edges, relocation-backed imports, source preservation, exact diff and initialization order. It executes no target code and is not a semantic emulator or runtime comparison. Run `python3 verify.py` from a separate copy; the copied-run receipt belongs outside publication. CLI/session telemetry is excluded.
