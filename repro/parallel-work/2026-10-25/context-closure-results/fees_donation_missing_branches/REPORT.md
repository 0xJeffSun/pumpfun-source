# create_donation_fee_pda: missing business branches

Static reconstruction of the admitted original Fees handler **[163920,177720)**. The early guards, reserve selector, extension quote extraction, common authorization path, and local effect/event order are now traced. **No handler proposal is issued:** decoder/error/borrow/CPI transitive contracts and complete nested literal closure remain incomplete. No parser correction is duplicated. No build, runtime, generated case, transaction, or source mutation was performed.

Source excerpts come exclusively from Git commit `4d3c19e3c58427f3604caede144b3322fa56d2b5`. The independently approved `repro/pump_fees/donation-event-account-proposal` supplies original/symbol/data evidence; it is additional evidence, not source silently attributed to that commit. The original also rebinds to frozen Git blob `e330cbb6dfbc3351dbaaf594ba6e873d89af5f5e` at `evidence/original/pump_fees/deployed.so` (948,944 bytes). Original SHA256 is `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`, candidate `8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87`, symbols `7c14bde16dc3211ae97f55efbc3cd5a375e0697d5aff799c1f7498bc423b15a1`. Original intervals use file/virtual byte addresses in these admitted ELFs, with exclusive ends. They are inferred boundaries, not recovered original symbols. Disassembly's decimal instruction numbers must be multiplied by eight; its `.text+...` display is not an absolute address.

## Admission and identities

The approved chain is entrypoint 660680 → dispatch 598128 (call 660808), discriminator `f48b10580eff7a1a` at 599184, comparison 599200 → selected block 602624 → wrapper 655904 (call 602704). Wrapper log is `Instruction: CreateDonationFeePda`; parser call 656064 targets 425776, handler call 656328 targets 163920. See unchanged approved analysis/ledger/report in `inputs/approved/`.

`calls.json` records every handler direct/external call and the prior caller-bound mapping before helper extraction. There are 77 internal calls, 25 distinct targets, and three external callsites (two `sol_log_`, one `abort`). Twenty-three targets have complete normalized candidate symbol-window matches; two checked decoders have known one-slot differences. Normalization is not target/data or semantic equivalence. Panic aliases remain ambiguous. `helper-windows.json` preserves each candidate symbol verbatim and its raw bounded bytes; no historical source name is invented.

| Original entry | Caller-bound role | Qualification |
|---|---|---|
| 731512 / 731720 / 732088 | AccountInfo data_len / data_is_empty / try_borrow_data | Candidate symbol-window identity; downstream failure contracts not closed |
| 575408 / 442944 | Pool / SharingConfig checked decoder | Approved near-match identity; +528 coordinate difference; not a complete normalized match |
| 289880 / 280976 / 290384 | FeeError conversion / name / Display | Enum numbering comes from frozen lib.rs 317–392; full allocation/format/drop ABI not closed |
| 796464 / 796360 | memcmp / memcpy | Complete bounded symbol-window match |
| 752280 / 752592 | find_program_address / create_program_address | Candidate names and admitted arguments; syscall closure not certified |
| 725232 / 724280 / 750976 / 724336 | Clock::get / sol_log_data / Instruction::new_with_bytes / invoke_signed | Local order established; runtime effects not executed |

BondingCurve admission is parser → 70520 → Account::try_from 28120 → checked decoder 537312 → unchecked decoder 538040. The original unchecked success layout has creator at +0, virtual token/quote at +32/+40, real token/quote at +48/+56, supply +64, complete +72, mode +73. Account wrapper adds its AccountInfo pointer at +0 and shifts that decoded value by eight. Parser success copies this to context +176. Thus handler context +216/+224/+232/+240 are the four reserves, +184 is creator, +176 AccountInfo. This follows 538168, 538448, 538512, 538576, 539400–539472; Account copy 28968–29112; parser success 434136–434752 (full ledger retained). Frozen Pump IDL 5763–5802 names the fields; it has **no quote-mint extension field**. That does not license a type-layout rewrite.

## Exact guards and branch contract

| Original range | Local behavior |
|---|---|
| 163936–163960 | Read context byte +625 (`disable_flags`), mask 4. Nonzero jumps to 164024 before reading version. |
| 164024–164104 | Log exactly 42 bytes at 803543, `CreateDonationFeePda is currently disabled`; convert FeeError index 21 at 164080. No state write or event. |
| 163960–164024 | With feature enabled, nonzero byte +849 (`version`) logs exactly 31 bytes at 803512, `donation_fee_pda already exists`, returns success tag 2. No handler state initialization/event. |
| 164128–164248 | Test real quote reserve (+240), virtual quote (+224), real token (+232), virtual token (+216), in this order. Any nonzero enters curve path 164248; all zero selects pool path 164336. |

This is an OR of four reserves, **not** a `complete`, supply, mayhem, cashback, or balance predicate. Account parsing and init_if_needed precede these handler guards; “no handler state write” is not a claim that parsing did nothing. Frozen donation.rs 44–47 has the same disabled-before-existing precedence but omits both logs. It then selects pool unconditionally.

## Curve quote and creator

164248–164848 clones the admitted BondingCurve AccountInfo, including Rc overflow-abort paths. At 164864 it calls data_len. Length <115 jumps to 165008, yielding a zero 32-byte extension value. Otherwise 164880–165200 takes an immutable data borrow, preserves the borrow count, checks length >114 and reconstructs **data[83..115]**. Loads are [89..97], [97], [83..87], [87..89], [98..106], [114], [106..114]. Those pieces are packed into stack [-768..-736] at 165208–165304; all 32 bytes, including byte 89, are accounted for. This is an observed untyped extension read, not a claim about the original field/type spelling. Slice/borrow panic paths are retained.

At 165440–165552 that 32-byte value is compared with zero. A nonzero value is copied unchanged to quote stack [-128..-96]. Zero selects the four immediate little-endian words at 165624–165712: `069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001`, the native mint `So11111111111111111111111111111111111111112`. No quote whitelist or amount arithmetic is performed here. Creator comes from decoded context [+184..+216], copied at 165720–165776, independently of extension length/value.

## Pool path and convergence

Only all-four-zero reserves take 164336. It compares pool owner with the AMM ID, borrows data (164440), invokes Pool checked decoder (164600), and checks its success tag. Base mint comparison is 168808–168968. The derived Pump pool-authority uses exactly `pool-authority` and base mint under Pump at 174120–174312; creator comparison 174376–174456 precedes pool address derivation. Six seeds at 175480–175752 are `pool`, little-endian u16 index, pool creator, base mint, quote mint, one-byte bump, under AMM. Derivation failure converts FeeError index 8 at 175792; address comparison is 176424–176576. Owner/base/authority/address failures are InvalidPool (6008). The Pool data borrow is released on the corresponding return/convergence paths.

Pool success 177056–177240 copies **pool.coin_creator** into creator stack [-96..-64] and **pool.quote_mint** into quote stack [-128..-96], then joins the curve authorization comparison at 165784. Pool quote is not passed through the curve zero/native fallback. Frozen Pool IDL 6827–6892 and checked-decoder mapping support these names; complete unchecked decoding and failure cleanup remain obligations.

## Shared authorization and error precedence

Creator is compared against sharing_config.key at 165784–165936. If different, compare payer.key with creator at 165936–166088. Mismatch produces NotAuthorized (6016); match enters initialization 166968. If equal, the branch at 166696 checks sharing owner against Fees ID; mismatch is InvalidSharingConfig (6007). Next data_is_empty at 168472 rejects empty data with 6007. Next try_borrow_data at 173176 and SharingConfig checked decoding at 173320 propagate their own errors. Then:

1. Sharing mint vs base mint, 174848–175080: mismatch 6007.
2. **Payer vs sharing admin**, 175856–176016: mismatch 6016.
3. **admin_revoked**, 176968–177056: nonzero converts FeeError index 9 (6009).
4. Status, 177240–177256: zero returns SharingConfigNotActive (6018), nonzero proceeds through success assembly at 177256–177464.

The bool/status interpretation is conditional on the admitted checked decoder's successful typed output. Frozen SharingConfig declaration is six lines; ConfigStatus is `{Paused,Active}` in donation.rs. No shareholder allocation/sum predicate is visible in this handler. Its creator output on the sharing path is the authorized admin. **Frozen source reverses steps 2 and 3:** donation.rs 62–63 checks revocation before payer. This is a distinct error-precedence gap in addition to logs and the missing curve branch. Frozen donation.rs 57–60 also omits the original explicit nonempty-data guard: it borrows and passes empty bytes directly to the decoder instead of constructing InvalidSharingConfig first. Its resulting decoder error is not silently equated with the original 6007.

## Effects, amount, errors, events

After authorization, 166968–167352 assembles creator/quote. State writes 167352–167768 set bump, version 1, config_id.key, base_mint.key, selected quote and creator; total_donated and last_crank_ts are zero, reserved 64 bytes are zero. Relevant frozen state.rs 8–20 and donation.rs 70–79 are retained. There is no create amount argument, fee computation, token transfer, relay invocation, reserve mutation, or accumulation in this handler; amounts do not depend on reserve magnitude, only the zero/nonzero selector. The crank operation is not reconstructed here.

Clock::get at 167784 follows these in-memory writes; error conversion 167808–167920 precedes any event. Successful Clock output feeds timestamp at 169896. Event serialization at 169896–171040 constructs 208 bytes: discriminator `5e1489ef234de1eb`, timestamp i64, created_by, donation_fee_pda, config_id, base_mint, quote_mint, creator (six Pubkeys). sol_log_data at 171072 occurs **before** event CPI construction. The second 208-byte serialization is prefixed with eight bytes `e445a52e51cb9a1d` (172176), yielding 216 bytes. The copy loop 172200–172280 preserves its exact length. Instruction construction at 172648 uses Fees ID; one event-authority meta is marked signer/read-only (172552), seeds `__event_authority` plus bump are assembled 172768–172880, invoke_signed is 172968. Its failure is converted at 173840–173896; success returns at 173136–173152 after Rc cleanup. These are local instruction/effect ordering claims, not runtime rollback or complete CPI semantics claims.

## Publication and remaining contracts

`results.json` separates recovered local claims from pending closure. `inputs/handler-data.json` retains all 49 direct relocated handler references with bounded previews. `inputs/exact-data.json` identifies exact consumed logs, source filename, seeds and program IDs. Preview length 128 is not a proven consumed extent for error descriptors, vtables, formatting tables or nested data. `calls.json` and bounded helper bytes retain ambiguous panic names and unmatched decoders rather than replacing them with guessed source.

The imported pump_route_wide REPORT/CONTRACTS are preserved with their prior seal: multiplication is modulo 2^128; division floor quotient is proved manually only for positive denominator; checked-ceil ordering is explicit. Those manual algebraic contracts are **not automated proof** and do not close this Fees handler. No wide arithmetic helper is called in the admitted create body.

Concrete residual obligations before a complete natural handler proposal:

- Finish Pool/SharingConfig successful decode layout and all error/drop branches, including nested bool/enum/Vec dependencies; preserve +528 checked-decoder differences and the parser/init closure mismatches already recorded upstream.
- Close data_len/borrow/slice panic behavior and Rc clone/drop failure contracts for the curve extension read; keep the original 115-byte threshold, zero fallback, and raw [83..115] semantics. Do not append a speculative field to the frozen BondingCurve type.
- Close FeeError constructors, formatting, allocation, vtables, nested descriptor extents and exact error provenance. Preserve the newly identified payer-before-revocation order and original file/line data rather than claiming a require! substitution is byte-exact.
- Close PDA syscalls and event CPI accounts/seeds/serialization/failure cleanup transitively, plus wrapper exit/account serialization. Earlier init_if_needed parser work remains separately owned; do not incorporate the one-field proposal here.

Run `python3 -B verify.py`. It checks the exact inventory, inherited selected seals, bounded raw instruction records, signed call/branch calculations, helper normalization, source-excerpt hashes and selected semantic anchor instructions/data. It is not an interpreter, runtime test, SMT proof, or independent whole-ELF rebind without the admitted original. A copied-directory verification result is retained **outside** the seal. All four whole-byte comparisons remain false; 140/150 bounded implementations, five partial, five unrecovered are unchanged. No exhaustive semantic/security claim or integration promotion is made.
