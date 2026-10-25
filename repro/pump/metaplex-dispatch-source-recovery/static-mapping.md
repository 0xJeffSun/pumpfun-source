# Metaplex candidate8: ten remaining instruction-window mappings

This is read-only static analysis, not a source promotion or runtime result. The ten assigned windows are mapped with high confidence by dispatch/caller links, account parsing, and matching source operations. Nine behavioral differences are identified in eight public source files. Window346 has a structural difference without an identified semantic difference. No build, runtime probe, program-source edit, executable patch, or publication was performed.

## Bound inputs and method

- Original: `evidence/dependencies/token_metadata/deployed.so`, 793,991 bytes, SHA-256 `31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011`.
- Candidate8: `repro/pump/metaplex-candidate-build-8/token_metadata.so`, 707,144 bytes, SHA-256 `5fbcc8d62b4beae1a62d002260d6daa67e4d2cd7d084e3dca35518d76ecbfacb`.
- Public source: `17e99434af5ead3e989c08f32af33609821d0bc0`. The existing checkout was at `b92a9bd4fafeb8e33e720c9d8d75f2738f475780`; it was left untouched. All 104 retained `.rs` files were read with `git show` and verified byte-for-byte against the requested revision.
- Candidate8 is that public revision plus its saved ten-file `source.patch`. In particular, its existing use-authority token-standard restrictions and master-edition mutable-account check must be retained when reviewing the deltas below.
- Ordinals are the zero-based inferred windows from the existing Elf helper/function-analysis methodology, not recovered debug symbols. Both inputs have1,251 windows. The existing candidate8 analysis reports1,238 matching normalized bodies/call patterns and13 unmatched windows; this work addresses ten, excluding parent-owned279,301,331.
- All addresses below are ELF byte offsets in the original unless explicitly marked candidate. LLVM objdump's displayed decimal instruction index was multiplied by8. No executable or normalized executable was written.
- `dispatch-evidence.json` reads actual relocated log-pointer instructions, their explicit length operand, and their `sol_log_` call before following the direct handler call. It does not infer names from nearby string-pool contents.
- `original-N.asm` and `candidate-N.asm` preserve all selected instructions, direct-call ordinals, external symbols, and absolute branch targets. `diff-N.txt` is an alignment aid: address/displacement normalization can hide branch-target distinctions and therefore is not a semantic-equivalence proof. Conclusions below were checked against the full annotated instructions.
- ProgramResult's internal success tag `0x16` is not MetadataError22. Error codes cited below are from the full public enum (including variants with trailing comments), retained in `error-map.json`.

## Mapping table

| Window | Original / candidate start | Bytes original / candidate | Exact public source function represented |
|---|---|---|---|
|311|`0x1d420` / `0x1d3d8`|8520 /8544|`processor::delegate::delegate`, with `create_persistent_delegate_v1` inlined|
|312|`0x1f568` / `0x1f538`|4312 /4232|`processor::delegate::create_other_delegate_v1`, with its PDA creation logic|
|314|`0x220a8` / `0x22028`|3744 /3696|`processor::delegate::revoke_other_delegate_v1`, including authority selection and delegate-record closing|
|324|`0x29e38` / `0x29d88`|8680 /8704|`processor::metadata::mint_v1`|
|328|`0x2c758` / `0x2c6c0`|5688 /5720|`processor::metadata::print_logic`|
|335|`0x2f600` / `0x2f538`|11080 /11008|`processor::metadata::transfer`, with `transfer_v1` inlined|
|337|`0x32238` / `0x32128`|8128 /8280|`processor::metadata::update`, with `update_v1` and `check_desired_token_standard` logic inlined|
|344|`0x38240` / `0x381c8`|3776 /3688|`processor::uses::process_approve_use_authority`|
|346|`0x39c58` / `0x39b88`|5104 /5096|`processor::uses::process_utilize`|
|350|`0x3cce8` / `0x3cc10`|20088 /20040|`processor::process_instruction`, including inlined legacy arms; remaining semantic delta lies in `process_create_master_edition`|

##311: delegate and its persistent token-delegate path

Source: `processor/delegate/delegate.rs:69` (`delegate`) and `:266` (`create_persistent_delegate_v1`); account schema `instruction/mod.rs:623–637`.

The exact `IX: Delegate` log call at`0x3d4f0` is followed by call`0x3d550 →0x1d420`. Its first call at`0x1d458` enters window493, the14-account Delegate parser: count must exceed13; account references use0x30-byte strides; optional fields0/3/4/6/11/12/13 recognize the program-ID sentinel. Parser stores account5(mint) at context+0x48, account6(token) at+0x18, account7(authority) at+0x50, account8(payer) at+0x58, account9(system) at+0x60, account10(instructions) at+0x68, account11(token program) at+0x20. The enum branches distinguish persistent Sale/Transfer/Utility/Staking/Standard/LockedTransfer from other delegates; a single call at`0x1dce8` reaches312 for the latter.

Behavioral difference: original persistent-path owner checks at`0x1d980–0x1d9e8` load the supplied token program's key and call window275 (`assert_owned_by`) separately for mint and token. Candidate calls window276 (`assert_owner_in`) at`0x1d970` and`0x1d9c0`, passing the two public token-program IDs and length2. Both later call window277 to validate the supplied token program. This changes acceptance when mint/token owners are valid token-program IDs but do not equal that supplied program.

Supported source change: in `create_persistent_delegate_v1`, replace only the two `assert_owner_in` calls for mint/token with `assert_owned_by(..., spl_token_program_info.key)`. Keep metadata ownership, signer checks, and all token-program validation. The other-delegate owner-in-list check in312 is present in both binaries and should remain. Confidence: high.

##312: create_other_delegate_v1

Source: `processor/delegate/delegate.rs:181–260`. Its sole caller is311 at`0x1dce8`. The helper starts with payer/authority signer checks, metadata ownership, mint owner-in-list, system/instructions key checks, metadata deserialization and mint equality. It then branches on `DelegateScenario`: Metadata uses update-authority validation(window263), Holder requires the optional token and calls holding-amount validation(window265) with amount1. Finally it requires account0(delegate record) and derives/allocates Metadata/Holder delegate records. These operations and the shared Delegate context prove the helper identity independently of strings.

Behavioral difference: after the Holder holding-amount call at`0x1fac8`, original checks metadata.token_standard at`0x1fae0–0x1fb20`:6(None) passes; otherwise clearing bit2 and comparing to0 permits only0(NonFungible) or4(ProgrammableNonFungible), and other values return135(InvalidTokenStandard). Candidate goes directly from successful holding validation to the required delegate record at`0x1fa98`, with no equivalent restriction. This gate is specific to the Holder branch, not the Metadata branch.

Supported source change: after `assert_holding_amount(..., 1)?` in the Holder arm, require `None | Some(NonFungible | ProgrammableNonFungible)` or return InvalidTokenStandard. Do not apply it globally to Metadata delegates. Confidence: high. Error-copy/cleanup block movement and reordered call265 are layout effects, not additional checks.

##314: revoke_other_delegate_v1

Source: `processor/delegate/revoke.rs:90–189` plus inlined `get_delegate_record_update_authority` and `close_other_delegate_record`. Dispatch `IX: Revoke` at`0x3d3f0` calls313 at`0x3d420`;313's call at`0x20e38` reaches314. Context matches the same14-account schema in `instruction/mod.rs:642–656`. The helper compares delegate account1 to authority account7 to distinguish self-revocation, deserializes Metadata/Holder delegate records for self-revocation, otherwise validates update authority or token holder, derives the appropriate delegate PDA, and closes it to payer account8.

Behavioral difference: in the non-self-revoking Holder path, account6's owner is validated and its SPL token data unpacked at`0x22880–0x22930`. Both binaries compare token.owner to authority.key (original`0x22e50–0x22e78`) and return57(IncorrectOwner) on mismatch. Original additionally compares token.mint to mint account5.key at`0x22ec0–0x22ee8`; it takes that same IncorrectOwner error. Candidate omits this second window44(Pubkey inequality) call. Account5 was retained at stack−0x508; the unpacked token's adjacent mint/owner32-byte fields are at−0x3b0/−0x390. The earlier metadata.mint check is separate and present in both.

Supported source change: extend the Holder path's token.owner mismatch condition with `|| token.mint != *ctx.accounts.mint_info.key`, retaining IncorrectOwner. Do not add it to self-revocation or change the earlier MintMismatch check. Confidence: high. The moved cleanup call59 is not an extra semantic difference.

##324: mint_v1

Source: `processor/metadata/mint.rs:31–45,151–170`; accounts `instruction/mod.rs:598–613`. Dispatch `IX: Mint` at`0x3dea8` calls323 (`mint`) at`0x3df08`. Window323 calls Mint context parser492 at`0x29c28` and forwards that context/args to324 at`0x29e28`.324 rejects amount0, checks authority account6 and payer8 signers, metadata account2 ownership/derivation, mint account5, token account0, and the supplied token program11; it then follows mint/ATA/token-record/master-edition branches. That unique order confirms mint_v1.

Behavioral difference: in the existing-token branch's close-authority validation, original`0x2acf0–0x2ad08` enters the validation only for token-standard value4(ProgrammableNonFungible). Candidate`0x2ad20–0x2ad40` skips None6 but masks bit0 to accept both4 and5(ProgrammableNonFungibleEdition). Both compare a present close authority to optional master-edition account3 and produce the same MissingMasterEditionAccount/InvalidCloseAuthority errors.

Supported source change: restrict only this close-authority guard to `Some(ProgrammableNonFungible)`. Retain unrelated programmable-edition handling elsewhere. Confidence: high. The relocated close-authority comparison and cleanup blocks are not extra source differences.

##328: print_logic

Source: `processor/metadata/print.rs:23–85,203–224`; accounts `instruction/mod.rs:809–830`. Dispatch `IX: Print` at`0x3d5b0` calls325 at`0x3d5f0`.325 routes enum0 to326(`print_v1`) and the other variant to327(`print_v2`).326 parses Print's18-account context and passes two None options to328 at`0x2c2d8`.327 takes the first18 accounts, requires account18, treats the program-ID sentinel as None, conditionally takes account19, then calls328 at`0x2c738`. This matches the public wrappers exactly. The shared body levies fees using payer9/new metadata0, loads master metadata12, handles edition mint2/token4, validates ATA15/instructions16, and handles optional token record6.

Behavioral difference: the same close-authority guard as324. Original`0x2ce98–0x2ceb8` checks only master_metadata.token_standard value4. Candidate`0x2d490–0x2d4c0` accepts4 or5 after excluding None. Both compare the present token close authority to edition account1 and otherwise return188(InvalidCloseAuthority).

Supported source change: restrict only this existing-token close-authority guard to `Some(ProgrammableNonFungible)`. Confidence: high. Large linear-diff chunks are moved blocks, including unchanged ATA/instructions/PDA checks, not evidence of their removal.

##335: transfer / transfer_v1

Source: `processor/metadata/transfer.rs:73–123`; accounts `instruction/mod.rs:718–735`. Dispatch `IX: Transfer` at`0x3d618` calls335 at`0x3d678`. First call`0x2f638` enters17-account parser495. Its stores at`0x61ee0–0x61f10` place account2(destination) at context+0x38 and account0(source token) at+0x28.335 carries these into stack−0x6f8 and−0x6d8. It checks nonzero amount, authority9 signer, metadata5 ownership, mint4/source0 owners against token program13, and optional owner record/edition/auth-rules ownership.

Behavioral difference: original`0x2f9e8–0x2fa18` compares those destination/source keys via equality helper41 and returns ProgramResult success when equal, before deserializing metadata at`0x2fb00`. Candidate deserializes metadata at`0x2f940` with no equality early return. This is a self-transfer no-op after the preceding validation, not a check of owner versus authority.

Supported source change: after the optional authorization-rules ownership check and before metadata deserialization, add `if ctx.accounts.destination_info.key == ctx.accounts.token_info.key { return Ok(()); }`. Confidence: high. Register renaming, cleanup movement, and shifted metadata call are not additional fixes.

##337: update / update_v1

Source: `processor/metadata/update.rs:42–52,207–231,333–346`; accounts `instruction/mod.rs:741–752`. Dispatch `IX: Update` at`0x3de10` forwards0x158 bytes of args and calls337 at`0x3de70`. Its first call`0x32270` enters11-account parser496: authority0, optional delegate1/token2, mint3, metadata4, optional edition5, payer6, system7, instructions8, optional auth-rules9/10. The body validates authority/payer, token/mint/metadata, chooses update/delegate/holder authority, then chooses existing or inferred token standard. Both inputs call standard-inference helper453 and have the same complete direct-call ordinal sequence(62 calls).

Behavioral difference: original desired-standard check at`0x33640–0x33690` accepts an absent desired value6 or exact equality; otherwise returns135(InvalidTokenStandard). Candidate`0x33530–0x335b0` and`0x339c0–0x33a08` additionally allow values1 and2(FungibleAsset/Fungible) to interchange. This corresponds to public `check_desired_token_standard`'s first match arm.

Supported source change: remove only the special Fungible/FungibleAsset pair acceptance; retain equality acceptance and InvalidTokenStandard otherwise. Confidence: high. Metadata-field updates and authorization-rules validation are not implicated by these deltas.

##344: process_approve_use_authority

Source: `processor/uses/approve_use_authority.rs:21–118` plus candidate8's existing token-standard restriction. Dispatch at`0x3f250` logs exact25-byte `IX: Approve Use Authority`, forwards number_of_uses inr5, and calls344 at`0x3f280`. Initial count check requires10 accounts. Account5 metadata is at base+0xf0, owner1 at+0x30, payer2 at+0x60, token4 at+0xc0, mint6 at+0x120, token program8 at+0x180, system9 at+0x1b0. The body validates uses, signers, holding, delegate-record PDA, allocates the record, optionally approves the burner, and saves allowed uses/bump.

Behavioral difference: after record-length/initialization validation and before `create_or_allocate_account_raw`, original`0x38988–0x389d8` compares account9.key to system_program::ID (indirect pointer to32 zero bytes), returning126(InvalidSystemProgram) if unequal. Candidate passes account9 into allocation without that explicit comparison.

Supported source change: insert that system-key validation immediately before allocation, after `process_use_authority_validation`. Confidence: high.

Structural-only difference: original`0x38ac8–0x38ae0` explicitly bypasses `number_of_uses > remaining` when number_of_uses is0; candidate simply compares the unsigned values. Since remaining is u64, this has no identified semantic effect. Do not claim a zero-use behavioral correction or treat this as an additional proven historical source edit.

##346: process_utilize

Source: `processor/uses/utilize.rs:27–150` plus candidate8's token-standard restriction. Exact21-byte `IX: Use/Utilize Token` log at`0x3f648` is followed by call`0x3f678 →346`, forwarding number_of_uses. The initial eight `next_account_info` calls at`0x39cd0–0x39ee8` consume metadata0, token1, mint2, user3, owner4, token program5, ATA6 and system7. The next helper handles optional Rent; account counts10/11 distinguish delegated usage. This precedes metadata loading, signer/holding checks, subtracting uses, optional use-authority-record update, metadata save, and possible burn.

Only localized observed difference is the unsigned use-count check: original`0x3a4d0` takes an explicit n==0 edge to`0x3a530`; otherwise it checks n>total then remaining>=n. Candidate checks n>total and n>remaining directly. Error remains86(NotEnoughUses); call59 cleanup moves to a shared epilogue. Direct-call multiset remains identical(51 calls), with that cleanup call appearing at another point in linear order.

No behavioral source correction is supported by this window alone. An explicit positive-count guard is a possible source spelling of the original branch, but this analysis does not identify exact syntax or prove why compilation emitted it. Confidence: high for mapping and semantic redundancy; unresolved for historical source spelling. No build or optimizer experiment was attempted.

##350: process_instruction and inlined legacy master-edition creation

Source: `processor/mod.rs:80–191,194–347` and `processor/edition/create_master_edition_v3.rs:20–108`, with candidate8's existing mutable-account check. ELF entrypoint is window463 at`0x580f8`; it deserializes Solana input and calls350 at`0x58188`, then prints/maps ProgramError as `entrypoint.rs:10–26` describes.350 deserializes MetadataInstruction, checks locked/incompatible accounts, emits distinct instruction logs and dispatches to the linked handlers above. This proves the broad window is the dispatcher, not a single legacy instruction body.

The unmatched semantic check is in the inlined `process_create_master_edition` branch. Exact24-byte `V3 Create Master Edition` log at`0x3efd8` leads through the eight-account check to`0x3fa98`, which loads metadata account5(base+0xf0); mint account1 follows. Edition0 derivation, token-program6, mint authority3, ownership and metadata.mint checks precede the decimals check at`0x40ac0`. The original zero-decimals edge enters`0x40b78`, compares system account7(base+0x150) to system_program::ID at`0x40ba0`, and returns126 on mismatch. Only then does it call update-authority validation263 with account2 at`0x40c20`, require supply1, and allocate the edition using payer4/system7. Candidate omits that system comparison.

Supported source change: add the explicit system account key check after the decimals check and before `assert_update_authority_is_correct`, retaining InvalidSystemProgram. Confidence: high. Other linear register/stack/cleanup changes and the shifted data-length call in the neighboring conversion arm are not separately identified behavioral differences. The existing conversion clearing/mutability patch should remain.

## Limits and handoff

These are source-function identifications and bounded behavioral deductions from compiled control/data flow. None proves the historical source text, compiler graph, all reachable behavior, or full ELF equality. Parent-owned279/301/331 were not reworked. The nine behavioral deltas above are the minimal justified changes for the parent's next source trial;346 and344's zero-count shapes remain explicitly structural observations. Main programs, maintained harnesses, central status, original evidence, and candidate8 package are untouched.

Reproduce retained diagnostics with the recorded objdump executable against the two frozen inputs, then `python3 work/metaplex-static-mapping/annotate.py` and `python3 work/metaplex-static-mapping/analyze.py`. `inputs.json`, `public-source-manifest.json`, `dispatch-evidence.json`, `call-map.json`, and the annotated files bind the conclusions; `MANIFEST.sha256` covers the retained handoff files.
