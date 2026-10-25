# Fees shared social ATA admission: source-only proposal

The complete original `[243184,249264)` routine supports a shared **ATA admission
helper returning `Result<()>`**, called twice by `ClaimSocialFeePdaV2`. The proposed
patch replaces the current split between `token_amount` and caller-owned ATA
creation. It changes only `social.rs` and `instructions/fee_sharing/mod.rs` in the
proposal directory; no main source was edited and no build or transaction ran.
The helper name is reconstructed, not claimed to be the historical identifier.

The proposal is grounded in both real call sites and the complete routine. It
preserves canonical-address validation; conditional idempotent creation; exact
supplied-token-program ownership; token decoding; mint comparison and diagnostic
operand order. It does **not** add a decoded token-authority check. It also
preserves the original caller's separate post-admission balance reads. Acceptance
still requires a separately authorized build, static comparison and regression
run; the proposal does not establish improved machine-code identity in advance.

## Frozen source and dispatch

Inputs are the 26 actual source/lock/IDL/README files bound by the accepted Fees
`5cf8d567934188d1307d2f9f3d2220ede52f6978e389064b08897441fbdd7d49` candidate
(770,016 bytes), symbol ELF
`99ac87e9b79e86e23d7458400475d5d967545e345767d0263d544bfd02660a07`, and captured
original `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
`baseline.json` records observed checkout context separately. The older layer01
report describes `fc1088`; none of its candidate helper addresses is adopted
without a fresh symbol and full-window comparison.

`static-evidence.json` recomputes:

| Role | Original window | Current candidate window | Evidence |
| --- | --- | --- | --- |
| Named instruction wrapper | `[647968,650064)` | `[353448,355544)` | all 2,096 normalized bytes and relocation pattern agree; 13/14 actual direct target bodies agree, with the instruction body the residual |
| Accounts parser | `[395656,405560)` | `[192176,202080)` | all 9,904 normalized bytes and all 76 actual direct target bodies agree |
| Accounts exit | `[405560,406120)` | `[202080,202640)` | all 560 normalized bytes and all seven actual direct target bodies agree |
| Instruction body | `[137280,147944)` | `[397608,408344)` | actual wrapper calls at relative 688 establish correspondence, not whole-body equality |
| Shared admission helper | `[243184,249264)` | no existing shared counterpart | exactly two direct callers in the original: 138936 and 141000 |

Original window ends are inferred from adjacent direct-call/relocation entries;
these are not original source symbols. The candidate names and matched parser,
actual wrapper edge, account access order, and downstream use jointly support the
attribution. A nearby string alone is not the attribution evidence.

## Both caller contracts

The handler obtains its accounts base through `[entry_r2+8]`. The matched parser
and actual typed-account accesses identify these offsets: `+0xb0` social PDA
AccountInfo; `+0x118` recipient AccountInfo; `+0x120` boxed quote Mint (its
AccountInfo reference is at box+0x58); `+0x128` source ATA; `+0x130` recipient ATA;
`+0x138` supplied token program; `+0x2a0` claim-authority Signer; `+0x2a8` System
Program. Full parser instructions and all its direct calls are retained so this
layout inference is reviewable. No hypothetical extra caller is introduced.

| ABI input | Call 138936 | Call 141000 | Original evidence |
| --- | --- | --- | --- |
| r1 output slot | stack-0x448 | stack-0x458 | caller checks only result tag 2 at 138952/141024 |
| r2 ATA `&AccountInfo` | accounts+0x128 | accounts+0x130 | loads at 138056 and 139272, retained across preparation |
| r3 wallet `&AccountInfo` | temporary clone of social PDA | temporary clone of recipient | source at accounts+0xb0 versus +0x118; both temporaries at stack-0x198 |
| r4 mint `&Pubkey` | quote-mint key at stack-0x48 | same | key loads through accounts+0x120 then +0x58 |
| fifth argument area -0x1000 | token-program key copy | same | stored at 138800 / 140920 |
| -0xff8 | cloned quote-mint AccountInfo at stack-0x2b0 | same | stored at 138776 / 140896 |
| -0xff0 | supplied token-program AccountInfo | same | stored at 138752 / 140872 |
| -0xfe8 | false (0) | true (1) | literal stores 138864 / 140928 |
| -0xfe0 | `&Signer` at accounts+0x2a0 | same | preparation 138824 / 140848 |
| -0xfd8 | `&Program<System>` at accounts+0x2a8 | same | preparation 138856 / 140864 |

Both callers release their temporary Mint/wallet AccountInfo clones on success
and error. A successful helper writes tag 2; the caller never reads a token
amount from its output. This is a unit-result ABI, with errors represented by
the alternative two-word Anchor Error payload. Raw numerical tags are compiler
ABI observations, not source-level constants to reproduce.

The source helper signature preserves the observed borrowed ATA/wallet/mint and
program inputs, creation boolean, typed payer and System references. Caller
`.to_account_info()` temporaries account for their two Rc-clone pairs. The
helper itself does not acquire an owned clone of those borrowed inputs on entry.

## Complete branch and operation order

1. **Canonical key.** 243184–243504 copies the wallet key, calls ATA derivation at
   243368→698680 with wallet/mint/supplied-token-program, then compares the ATA
   key at 243488→796464. Unequal enters 244592–245264: `ConstraintSeeds` (2006),
   `with_pubkeys((actual_ata, expected_ata))`, historical source line 273.
2. **System ownership identifies the creation path.** At 243648 the ATA owner is
   compared with the 32 zero bytes at 800416, i.e. System ID. This does not test
   lamports or `data_is_empty()`. Equal branches to 244352 and reads the creation
   boolean at 244376. False creates `AccountNotInitialized` (3012), no compared
   pubkeys, historical line 278. True branches to 246144.
3. **Creation.** 246144–246360 copies payer and wallet keys and calls the actual
   idempotent instruction constructor 700528, whose selector is **1**, not the
   separate ordinary-create selector 0. It builds exactly six cloned
   AccountInfos in order: payer, ATA, wallet, mint, System, token program.
   248912→724296 calls ordinary `invoke`, not a signer-seed substitute. No
   associated-token-program AccountInfo is appended. Successful CPI releases
   all six clones via 248976→40472 and rejoins owner validation at 243688.
   Failed CPI converts ProgramError at 249168→709368, releases the same six via
   249208→40472, and returns the error. The caller's normal signed authority is
   still required; neither a signer bypass nor a new initializer fixture is
   proposed.
4. **Exact token-program ownership.** At 243712 the ATA owner is compared against
   the supplied token-program key. Unequal creates FeeError 29 (runtime 6029),
   `with_pubkeys((actual_owner, supplied_token_program))`, historical line 299.
   Thus accepting either known token-program ID independently of the supplied
   program is not an equivalent helper contract.
5. **Data borrow and token decode.** 245328→732088 performs `try_borrow_data`;
   failed borrow is converted by 249056→709368. 245456→685664 decodes the
   `token_interface::TokenAccount`. Its failure tag is tested at 245488;
   error exits release the Ref borrow at 246112–246128 before returning.
6. **Mint only.** 245688→796464 compares the decoded mint with the supplied mint.
   Unequal creates FeeError 30 (runtime 6030), with
   `with_pubkeys((decoded_mint, supplied_mint))`, historical line 306. The data
   Ref is released on this error path. Equal branches to 249224, releases the
   Ref, sets successful tag 2, and returns. There is no decoded authority
   comparison or token-amount extraction in this helper.

The mint-error branch calls FeeError::ToString directly; other errors expose
inlined formatting paths. The ordinary `require!` / `require_keys_eq!` macros
and their exact locked expansion are retained as source evidence. The formatting
`unwrap_failed` path at 244856 is the standard ToString invariant failure
("a Display implementation returned an error unexpectedly"), not an application
`unwrap` permission or evidence that a validation should be removed.

## Post-admission balance order

After **both** helper calls succeed, the original borrows the source ATA at
141304 and decodes it at 141432. Decoder failure propagates; successful amount
is loaded at 144168 and the Ref is dropped at 144176–144192. Zero returns before
reading the destination amount, though destination admission/possible creation
has already happened. For nonzero amount, 144232 borrows the destination and
144352 decodes it. Successful amount is used; decoder failure is dropped at
144400→41456 and defaults to zero at 144408. Borrow failure still propagates.

The proposal therefore removes `token_amount`, performs two shared admission
calls first, then reads source amount with `?`, checks zero, and reads destination
amount with decode `unwrap_or_default()` but borrow `?`. Transfer, aggregate
updates, native branch, events, account context, and exits remain unchanged.
This caller ordering is required by the actual helper unit-result contract.
It is not an invitation to fix other instruction-body differences.

## Dependency, data, and cleanup closure

The 6,080-byte helper has 739 decoded instructions, 30 direct calls to 17 unique
target windows, one external abort boundary (Rc overflow), and no indirect calls.
Sixteen target windows match current candidate normalized bytes and relocation
patterns, with current symbol names retained. The seventeenth `[40472,41248)` is
independently decoded: six sequential 128-byte blocks releasing lamports then
data Rc references at AccountInfo stride 48, followed by exit. It is not replaced
with an unused matching generic helper. A codegen-equal six-account drop has not
been proved for the current candidate; ordinary owned array drop expresses the
observed lifetime semantics.

Eleven bounded data objects include actual error discriminants, System ID,
consumed source filename, ToString panic text, formatter vtables and its panic
location/filename. Embedded relocated code pointers are retained. The source
filename proves `instructions/fee_sharing/mod.rs` is a natural module for this
helper; the proposal appends real source there without padding, line directives
or manually fabricated error origins. Historical line numbers will differ.
Full recursive equivalence of allocator/formatter/vtable targets and OOM/panic
behavior is not claimed. Ordinary locked dependency behavior is an explicit
source-contract premise. Neither source similarity nor normalized bytes prove
historical compiler-unit identity.

Exact versions and archive SHA-256 hashes come from the frozen Cargo.lock. Eight
public cached `.crate` archives are retained; selected source files are verified
against archive members. The first preparation attempt found no
`.cargo-checksum.json` in the existing registry source and stopped during input
copying. The resumed preparation used lock-hashed archives instead; the failed
script and diagnostic remain under `preparation/`. No build was attempted.

## Saved evidence and boundaries

`inputs/accepted-differential.json.gz` is copied unchanged from the accepted
5cf8 package. Its 627 SocialClaimV2 comparisons are all recorded matches;
`saved-evidence-review.json` identifies 13 existing cases that support source
absence rejection, recipient creation/privilege errors, exact owner/mint errors,
zero-amount recipient validation, and lack of an extra decoded-authority guard.
These remain historical accepted-candidate observations, not receipts for the
proposal. Signed transaction bytes remain unchanged. This static package does
not create transactions or claim new cryptographic/runtime validation.

No new source or runtime acceptance, handler count, comparison count, security
finding, or full-byte equality is claimed. No update_fee_shares work, unrelated
donation change, compiler/flag/layout variant, stopped Pump lane, initializer
fixture, or live-chain action is included.

## Verify

```sh
python3 -B /path/to/publication/verify.py
python3 -B /path/to/publication/verify.py --repo /path/to/pumpfun-source
```

The optional repo check requires all 26 current inputs still equal this proposal's
frozen baseline. It intentionally fails if another accepted source change has
occurred. The default verifier is portable, uses only Python's standard library,
recomputes the full static evidence, verifies the two-file patch from before/after
bytes, checks locked archives and saved report selection, and does not run a
compiler or a target program.
