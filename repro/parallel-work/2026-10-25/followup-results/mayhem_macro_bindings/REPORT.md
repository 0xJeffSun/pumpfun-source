# Mayhem Anchor 1.0.0 dependency-source binding review

**Result:** the concrete missing-source prerequisite in audit_mayhem D1 is closed at the static source-construction level. Eleven official crate archives were SHA256-checked against the fixed Cargo.lock before extraction. All 24 included handlers, 15 contexts and 231 declared fields are bound to the exact relevant dependency constructors. No compilation, macro expansion execution, runtime probe, source patch or whole-original security certification was performed.

Checkpoint: `517d77db988d8c63b6cf476f0be138c5a4f3128a`. The prior root-reviewed audit package is an explicitly authorized frozen filesystem snapshot, not present in this checkpoint tree; its full SHA256 is retained without inventing a Git identity. Mayhem program inputs carry both Git blob SHA1 and SHA256 in provenance.json. Crates carry lock checksum, archive SHA256 and exact member identity. Every citation in result.json records inclusive line ranges, zero-based byte ranges and full span SHA256.

Only Mayhem sources were consumed. The excluded initialize_mayhem_state handler is absent from the copied program source. No excluded Pump body, prior audit_coverage evidence, private security material, credential/config/cache metadata or unrelated work files were opened. References inside the authorized prior report are not newly consumed evidence. No historical binary window or function identity is inferred here. Comments containing binary offsets remain annotations.

## What changed in the review

### MB-01: Legacy transfer target remains fixed despite Interface input

withdraw_quote_admin cannot be described as selecting a Token2022 transfer via ctx.program_id. Sweep contexts explicitly narrow program to legacy. Intended quote support and concrete failure behavior remain external.

Source construction established; no runtime exploit or source patch. Sources: [crates/anchor-spl-1.0.0/src/token.rs:13-31](evidence/crates/anchor-spl-1.0.0/src/token.rs#L13); [crates/spl-token-interface-2.0.0/src/instruction.rs:963-991](evidence/crates/spl-token-interface-2.0.0/src/instruction.rs#L963); [programs/mayhem/src/lib.rs:44-59](evidence/programs/mayhem/src/lib.rs#L44); [programs/mayhem/src/lib.rs:401-415](evidence/programs/mayhem/src/lib.rs#L401); [crates/anchor-lang-1.0.0/src/accounts/interface.rs:84-123](evidence/crates/anchor-lang-1.0.0/src/accounts/interface.rs#L84); [crates/anchor-lang-1.0.0/src/lib.rs:466-482](evidence/crates/anchor-lang-1.0.0/src/lib.rs#L466); [crates/anchor-spl-1.0.0/src/token_interface.rs:14-15](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L14); [crates/anchor-spl-1.0.0/src/token_interface.rs:74-82](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L74); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:678-756](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L678); [crates/anchor-spl-1.0.0/src/associated_token.rs:14-34](evidence/crates/anchor-spl-1.0.0/src/associated_token.rs#L14); [crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs:57-104](evidence/crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs#L57); [crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs:603-630](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs#L603).

### MB-02: ATA data mint equality differs between existing ATA constraint and init_if_needed

Non-init ATA does key/authority/program-owner checks but no explicit stored mint comparison; init_if_needed adds it. Do not label all ATA paths identical or infer bypass without authentic processor/state evidence.

Construction distinction established; no counterfeit ATA reachability claim. Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1253-1309](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1253); [crates/spl-associated-token-account-interface-2.0.0/src/address.rs:38-70](evidence/crates/spl-associated-token-account-interface-2.0.0/src/address.rs#L38); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:678-756](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L678); [crates/anchor-spl-1.0.0/src/associated_token.rs:14-34](evidence/crates/anchor-spl-1.0.0/src/associated_token.rs#L14); [crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs:57-104](evidence/crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs#L57); [crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs:603-630](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs#L603).

### MB-03: Duplicate detection is declared-field scoped

231 fields mapped; sweep_remaining direct try_from calls have no generated uniqueness scan. InterfaceAccount duplicate candidates are included even though external owner blocks Mayhem serialization.

Source gap closed. Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs:327-422](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs#L327); [crates/anchor-syn-1.0.0/src/codegen/accounts/exit.rs:20-78](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/exit.rs#L20); [crates/anchor-lang-1.0.0/src/accounts/account.rs:255-268](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L255); [crates/anchor-lang-1.0.0/src/accounts/account.rs:364-371](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L364); [crates/anchor-lang-1.0.0/src/accounts/interface_account.rs:273-281](evidence/crates/anchor-lang-1.0.0/src/accounts/interface_account.rs#L273); [programs/mayhem/src/lib.rs:401-430](evidence/programs/mayhem/src/lib.rs#L401).

### MB-04: Event target and generic macro differ from old documentation

Target fixed to crate ID; program field unused by emit_cpi. Generic event_cpi source injects address=constant, while included contexts manually use runtime seeds+bump.

Source gap closed. Sources: [crates/anchor-attribute-event-1.0.0/src/lib.rs:33-66](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L33); [crates/anchor-attribute-event-1.0.0/src/lib.rs:108-115](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L108); [crates/anchor-attribute-event-1.0.0/src/lib.rs:157-197](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L157); [crates/anchor-syn-1.0.0/src/parser/accounts/event_cpi.rs:52-69](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/event_cpi.rs#L52); [crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs:195-231](evidence/crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs#L195); [crates/anchor-attribute-account-1.0.0/src/id.rs:39-52](evidence/crates/anchor-attribute-account-1.0.0/src/id.rs#L39).

### MB-05: Manual extension does not inherit realloc macro protections

No realloc/token:: group present in included fields; generic sources reviewed without claiming they execute.

Non-applicability established. Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:416-477](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L416); [programs/mayhem/src/lib.rs:79-116](evidence/programs/mayhem/src/lib.rs#L79).

## Feature and construction boundary

The package enables anchor-lang event-cpi/init-if-needed, and anchor-spl associated_token/token/token_2022 with defaults disabled. anchor-spl also requests anchor-lang derive. event-cpi reaches anchor-attribute-event/anchor-syn and anchor-attribute-account; init-if-needed reaches anchor-derive-accounts/anchor-syn. token_2022_extensions and metadata are not requested. The base token interface still uses StateWithExtensions unpack; disabling extension helper modules does not prohibit extension-bearing accounts. Complete extension policy/processor validation is not supplied by base decoding. This is manifest propagation, not a historical compiled feature attestation.

The generic Accounts parser first consumes/deserializes fields, delays init field decoding, then emits init constraints, duplicate checks and non-init checks. Init CPIs can precede stored-authority has_one rejection. This sequencing does not itself prove unauthorized committed creation: transaction rollback remains a runtime obligation. Existing state types use owner and their concrete codec; custom SellCurve/SwapPool/SwapGlobalConfig decoders remain custom, including their padding behavior. No Anchor 0.31.1 semantics were imported.

## Exact construction contracts

### Account

Reject zero-lamport system-owned input, require T::owner(), then T::try_deserialize. No implied PDA or role link. Box delegates. Unchecked initializer deserialization retains owner check, skips discriminator via T. Custom Mayhem codecs remain the concrete T contract.

Sources: [crates/anchor-lang-1.0.0/src/accounts/account.rs:314-365](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L314); [crates/anchor-lang-1.0.0/src/accounts/boxed.rs:23-40](evidence/crates/anchor-lang-1.0.0/src/accounts/boxed.rs#L23).

### Signer

Consumes one account and checks is_signer only; does not imply writable, System ownership, or role membership.

Sources: [crates/anchor-lang-1.0.0/src/accounts/signer.rs:46-76](evidence/crates/anchor-lang-1.0.0/src/accounts/signer.rs#L46).

### Program

Require T ID except when T::id()==Pubkey::default(); always require executable. Thus System ID needs Mayhem custom wrapper. Nonzero Token2022, AssociatedToken, Mayhem types enforce fixed IDs.

Sources: [crates/anchor-lang-1.0.0/src/accounts/program.rs:148-181](evidence/crates/anchor-lang-1.0.0/src/accounts/program.rs#L148).

### CheckedSystemProgram

Explicit System ID check precedes Program executable check; composite exit is no-op and duplicate key list empty.

Sources: [programs/mayhem/src/checked_program.rs:16-38](evidence/programs/mayhem/src/checked_program.rs#L16); [programs/mayhem/src/checked_program.rs:55-59](evidence/programs/mayhem/src/checked_program.rs#L55); [programs/mayhem/src/checked_program.rs:84-86](evidence/programs/mayhem/src/checked_program.rs#L84).

### Interface

CheckId membership then executable; TokenInterface allows legacy SPL and Token2022. A separate address constraint can narrow the set.

Sources: [crates/anchor-lang-1.0.0/src/accounts/interface.rs:84-123](evidence/crates/anchor-lang-1.0.0/src/accounts/interface.rs#L84); [crates/anchor-lang-1.0.0/src/lib.rs:466-482](evidence/crates/anchor-lang-1.0.0/src/lib.rs#L466); [crates/anchor-spl-1.0.0/src/token_interface.rs:14-15](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L14); [crates/anchor-spl-1.0.0/src/token_interface.rs:74-82](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L74).

### InterfaceAccount

CheckOwner membership then T deserialize; token wrappers accept both program owners and unpack initialized base state with extension framing, retain base only. No automatic equality to a separate token_program account and no complete TLV extension-policy validation. Reload repeats membership + deserialize.

Sources: [crates/anchor-lang-1.0.0/src/accounts/interface_account.rs:213-281](evidence/crates/anchor-lang-1.0.0/src/accounts/interface_account.rs#L213); [crates/anchor-lang-1.0.0/src/lib.rs:438-455](evidence/crates/anchor-lang-1.0.0/src/lib.rs#L438); [crates/anchor-spl-1.0.0/src/token_interface.rs:14-72](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L14); [crates/spl-token-2022-interface-2.1.0/src/extension/mod.rs:512-534](evidence/crates/spl-token-2022-interface-2.1.0/src/extension/mod.rs#L512); [crates/spl-token-2022-interface-2.1.0/src/extension/mod.rs:953-964](evidence/crates/spl-token-2022-interface-2.1.0/src/extension/mod.rs#L953).

### UncheckedAccount

Consumes AccountInfo only; constraints explicitly attached to field still apply. No implicit owner, discriminator, executable or signer check.

Sources: [crates/anchor-lang-1.0.0/src/accounts/unchecked_account.rs:15-38](evidence/crates/anchor-lang-1.0.0/src/accounts/unchecked_account.rs#L15).

### codec

Nonzero-copy account macro emits discriminator prefix check then AnchorDeserialize, serialize writes discriminator+fields; owner for default namespace is crate ID. This does not override custom codecs. No trailing-data exhaustion assertion in this generated deserialize path.

Sources: [crates/anchor-attribute-account-1.0.0/src/lib.rs:113-145](evidence/crates/anchor-attribute-account-1.0.0/src/lib.rs#L113); [crates/anchor-attribute-account-1.0.0/src/lib.rs:230-273](evidence/crates/anchor-attribute-account-1.0.0/src/lib.rs#L230).

### order

Derive consumes fields in declaration order; init fields initially raw. Init constraints run before duplicate checks, then non-init field constraints. Per field order: zero/init/realloc/seeds/ATA/mut/signer/has_one/raw/owner/rent/executable/close/address/token/mint. Handler only after parsing; exit only after handler returns Ok. This is source construction, not an executed expansion or rollback proof.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs:20-98](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs#L20); [crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs:258-293](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs#L258); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:75-146](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L75); [crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs:108-169](evidence/crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs#L108).

### mut

Require is_writable. init and init_if_needed imply mut through parser.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:295-304](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L295); [crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs:603-630](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs#L603).

### seeds

Bare bump uses find_program_address and caches canonical bump; explicit bump uses create_program_address. seeds::program replaces executing program for derivation. Equality to derived key enforced. Seeds alone do not check owner/data.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1169-1251](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1169).

### has_one

Compare stored named field to target.key; Signer validation is independent.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:306-343](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L306).

### address

Compare account key to exact declared expression; address alone does not imply executable.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:181-199](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L181).

### owner

Compare AccountInfo.owner to declared expression.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:367-395](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L367).

### token

token::authority compares token data owner; token::mint compares data mint; token::token_program compares AccountInfo owner, only when each is specified. No included Mayhem field declares this group; ATA is a distinct group.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1311-1356](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1311).

### ATA

Non-init ATA: compare AccountInfo owner to explicit associated_token::token_program; compare token data owner to authority; compare key to ATA PDA derived from authority, token program and mint. It does NOT separately compare token data mint. Authentic creation invariants and downstream token logic remain external. Every included ATA field specifies token program.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1253-1309](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1253); [crates/spl-associated-token-account-interface-2.0.0/src/address.rs:38-70](evidence/crates/spl-associated-token-account-interface-2.0.0/src/address.rs#L38).

### init

Parser implies mut and rent enforcement; canonical PDA init uses current program and caches bump. Program-owned init creates/funds+allocates+assigns via System then unchecked typed deserialize; discriminator persists on exit. Existing funded accounts take allocate/assign path. No automatic authorization relationship to a field called admin.

Sources: [crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs:603-645](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs#L603); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:479-576](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L479); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1066-1167](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1066); [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:1676-1729](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L1676).

### ATA_init

ATA init invokes associated_token::create (not create_idempotent), then unchecked typed deserialize. init_if_needed enters create when AccountInfo owner is System; otherwise deserialize existing. if_needed explicitly checks stored mint, authority, token program owner and canonical ATA key. Parser also implies mut/rent enforcement.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:678-756](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L678); [crates/anchor-spl-1.0.0/src/associated_token.rs:14-34](evidence/crates/anchor-spl-1.0.0/src/associated_token.rs#L14); [crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs:57-104](evidence/crates/spl-associated-token-account-interface-2.0.0/src/instruction.rs#L57); [crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs:603-630](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/constraints.rs#L603).

### realloc

Generic realloc macro prevents duplicate reallocs, bounds growth, funds rent or refunds shrink excess and invokes resize. No included Mayhem field has realloc attribute: extend_account manually funds and resizes. Do not import generated realloc guard to that handler.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs:416-477](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/constraints.rs#L416); [programs/mayhem/src/lib.rs:79-116](evidence/programs/mayhem/src/lib.rs#L79).

### duplicate

Generated set includes mutable Account/LazyAccount/InterfaceAccount/Migration except dup and pure init; init_if_needed remains included. Signer, UncheckedAccount and AccountLoader not included. Composite keys collected. No remaining_accounts scan. Per-context candidate lists below are static substitutions of this filter, not runtime collision findings.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs:327-422](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/try_accounts.rs#L327).

### exit

Mutable fields get AccountsExit; composite exit delegates. Account serializes only when expected owner equals executing program and not closed. InterfaceAccount uses originally captured owner; external SPL accounts are not serialized by Mayhem. remaining_accounts not auto-exited. sweep explicitly exits each FeeRecipient.

Sources: [crates/anchor-syn-1.0.0/src/codegen/accounts/exit.rs:20-78](evidence/crates/anchor-syn-1.0.0/src/codegen/accounts/exit.rs#L20); [crates/anchor-lang-1.0.0/src/accounts/account.rs:255-268](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L255); [crates/anchor-lang-1.0.0/src/accounts/account.rs:364-371](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L364); [crates/anchor-lang-1.0.0/src/accounts/interface_account.rs:273-281](evidence/crates/anchor-lang-1.0.0/src/accounts/interface_account.rs#L273); [programs/mayhem/src/lib.rs:401-430](evidence/programs/mayhem/src/lib.rs#L401).

### event

emit logs serialized discriminator+event; emit_cpi targets crate::ID with only event_authority signer meta, uses constant event bump and does not read ctx.accounts.program. Event dispatch checks signer and fixed authority key. Generic event_cpi attribute injects address=constant (despite older seed-based doc example); Mayhem declares explicit seeds+bump fields instead. Nontrade unchecked program field has no implicit target check; six trade Program<Mayhem> fields independently do.

Sources: [crates/anchor-attribute-event-1.0.0/src/lib.rs:33-66](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L33); [crates/anchor-attribute-event-1.0.0/src/lib.rs:108-115](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L108); [crates/anchor-attribute-event-1.0.0/src/lib.rs:157-197](evidence/crates/anchor-attribute-event-1.0.0/src/lib.rs#L157); [crates/anchor-syn-1.0.0/src/parser/accounts/event_cpi.rs:52-69](evidence/crates/anchor-syn-1.0.0/src/parser/accounts/event_cpi.rs#L52); [crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs:195-231](evidence/crates/anchor-syn-1.0.0/src/codegen/program/handlers.rs#L195); [crates/anchor-attribute-account-1.0.0/src/id.rs:39-52](evidence/crates/anchor-attribute-account-1.0.0/src/id.rs#L39).

### transfer

anchor_spl::token::transfer hardcodes legacy SPL ID; ctx.program_id is unused. Constructs writable source/destination and signer authority, no multisig signers; invokes with signer seeds. Applies to withdraw_quote_admin and sweep_remaining. Passing Token2022 Interface does not select Token2022 transfer.

Sources: [crates/anchor-spl-1.0.0/src/token.rs:13-31](evidence/crates/anchor-spl-1.0.0/src/token.rs#L13); [crates/spl-token-interface-2.0.0/src/instruction.rs:963-991](evidence/crates/spl-token-interface-2.0.0/src/instruction.rs#L963); [programs/mayhem/src/lib.rs:44-59](evidence/programs/mayhem/src/lib.rs#L44); [programs/mayhem/src/lib.rs:401-415](evidence/programs/mayhem/src/lib.rs#L401).

### burn

token_interface reexports token_2022 burn: target is ctx.program_id; instruction constructor permits legacy or Token2022, writable from+mint, signer authority, supplied signer seeds. Does not itself execute token account/mint relationship or extension checks; those belong to callee.

Sources: [crates/anchor-spl-1.0.0/src/token_interface.rs:1-15](evidence/crates/anchor-spl-1.0.0/src/token_interface.rs#L1); [crates/anchor-spl-1.0.0/src/token_2022.rs:105-120](evidence/crates/anchor-spl-1.0.0/src/token_2022.rs#L105); [crates/spl-token-2022-interface-2.1.0/src/instruction.rs:1553-1581](evidence/crates/spl-token-2022-interface-2.1.0/src/instruction.rs#L1553); [crates/spl-token-2022-interface-2.1.0/src/lib.rs:36-48](evidence/crates/spl-token-2022-interface-2.1.0/src/lib.rs#L36); [programs/mayhem/src/instructions/burn.rs:38-64](evidence/programs/mayhem/src/instructions/burn.rs#L38).

### boxed

Box delegates try_accounts and exit to its inner type; it does not replace InterfaceAccount owner-set checks with Account single-owner checks.

Sources: [crates/anchor-lang-1.0.0/src/accounts/boxed.rs:23-40](evidence/crates/anchor-lang-1.0.0/src/accounts/boxed.rs#L23).

### system_CPI

System wrappers construct fixed System instructions and pass the relevant account infos and ctx.signer_seeds to invoke_signed. They do not use ctx.program_id to select arbitrary targets; actual debit/assign/allocate rules and rollback belong to System/runtime.

Sources: [crates/anchor-lang-1.0.0/src/system_program.rs:41-56](evidence/crates/anchor-lang-1.0.0/src/system_program.rs#L41); [crates/anchor-lang-1.0.0/src/system_program.rs:89-104](evidence/crates/anchor-lang-1.0.0/src/system_program.rs#L89); [crates/anchor-lang-1.0.0/src/system_program.rs:158-178](evidence/crates/anchor-lang-1.0.0/src/system_program.rs#L158); [crates/anchor-lang-1.0.0/src/system_program.rs:298-314](evidence/crates/anchor-lang-1.0.0/src/system_program.rs#L298).

### reload

Account reload rechecks T owner and concrete T deserializer; InterfaceAccount reload rechecks owner membership and concrete T decoder. Neither reruns context seed/ATA/has_one constraints.

Sources: [crates/anchor-lang-1.0.0/src/accounts/account.rs:294-310](evidence/crates/anchor-lang-1.0.0/src/accounts/account.rs#L294); [crates/anchor-lang-1.0.0/src/accounts/interface_account.rs:237-253](evidence/crates/anchor-lang-1.0.0/src/accounts/interface_account.rs#L237).

## Handler binding matrix

Each row inherits the complete per-field context mapping in result.json. Event means actual log/self-CPI use, not merely requiring event accounts. Trade CPIs are hand-constructed in Mayhem and remain downstream obligations; native AMM sync/close are raw instruction tags 17/9, not Anchor token wrapper calls.

| Handler | Context | Event | Dependency contracts |
| --- | --- | --- | --- |
| update_admin | Admin | False | order, exit |
| update_trader | Admin | False | order, exit |
| update_max_sol_per_sweep | Admin | False | order, exit |
| update_max_stable_per_sweep | Admin | False | order, exit |
| reset_sol_deployed | Admin | False | order, exit |
| reset_stable_deployed | Admin | False | order, exit |
| reset_state | Admin | False | order, exit |
| stop_trading | Admin | False | order, exit |
| resume_trading | Admin | False | order, exit |
| initialize_global_params | InitializeGlobalParams | False | order, exit, system_CPI, init |
| initialize_fee_recipient | InitializeFeeRecipient | False | order, exit, system_CPI, init |
| update_global_params | Admin | True | order, exit, event |
| withdraw_admin | WithdrawAdmin | False | order, exit, system_CPI |
| withdraw_quote_admin | WithdrawQuoteAdmin | False | order, exit, transfer |
| extend_account | ExtendAccount | True | order, exit, system_CPI, event, realloc |
| sweep_fees | SweepFees | True | order, exit, transfer, event |
| sweep_fees_admin | SweepFeesAdmin | True | order, exit, transfer, event |
| burn_tokens | BurnTokens | True | order, exit, burn, event |
| buy | LegacyBuy | True | order, exit, reload, event |
| sell | LegacySell | True | order, exit, reload, event |
| buy_v2 | BuyV2 | True | order, exit, reload, event |
| sell_v2 | SellV2 | True | order, exit, reload, event |
| buy_pump_swap | BuyPumpSwap | True | order, exit, reload, system_CPI, event |
| sell_pump_swap | SellPumpSwap | True | order, exit, reload, event |

## Declared-field binding matrix

Every field below is individually bound to its type and explicit constraint constructors. Full expressions, source bytes/digests, concrete data-type source and candidate duplicate membership are in result.json. No omitted implicit constraints are assumed.

### BurnTokens

[programs/mayhem/src/instructions/burn.rs:7-36](evidence/programs/mayhem/src/instructions/burn.rs#L7)

Duplicate comparison candidates: mayhem_state, mint, mayhem_token_vault, bonding_curve.

| Field | Type | Contracts |
| --- | --- | --- |
| mayhem_state | `Account<'info, MayhemState>` | Account, mut, seeds, exit, codec |
| mint | `InterfaceAccount<'info, Mint>` | InterfaceAccount, mut, exit |
| mayhem_token_vault | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA, exit |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| bonding_curve | `Box<Account<'info, BondingCurve>>` | Account, mut, seeds, exit, codec, boxed |
| global | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| pump_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Interface<'info, TokenInterface>` | Interface |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `UncheckedAccount<'info>` | UncheckedAccount |

### LegacyBuy

[programs/mayhem/src/instructions/buy.rs:14-51](evidence/programs/mayhem/src/instructions/buy.rs#L14)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_token_vault, bonding_curve, associated_bonding_curve.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| mayhem_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Program<'info,Token2022>` | Program |
| global | `UncheckedAccount<'info>` | UncheckedAccount |
| bonding_curve | `Box<Account<'info,SellCurve>>` | Account, mut, seeds, exit, boxed |
| fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_bonding_curve | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| pump_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| global_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| bonding_curve_v2 | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### BuyPumpSwap

[programs/mayhem/src/instructions/buy_pump_swap.rs:18-70](evidence/programs/mayhem/src/instructions/buy_pump_swap.rs#L18)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_token_vault, mayhem_quote_vault, pool, pool_base_token_account, pool_quote_token_account, protocol_fee_recipient_token_account, coin_creator_vault_ata.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| mayhem_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| mayhem_quote_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA_init, init, exit, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| quote_token_program | `Interface<'info,TokenInterface>` | Interface, address |
| base_token_program | `Program<'info,Token2022>` | Program |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| pool | `Box<Account<'info,SwapPool>>` | Account, mut, exit, boxed |
| global_config | `Box<Account<'info,SwapGlobalConfig>>` | Account, exit, boxed |
| quote_mint | `UncheckedAccount<'info>` | UncheckedAccount |
| pool_base_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, exit, boxed |
| pool_quote_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, exit, boxed |
| protocol_fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| protocol_fee_recipient_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| pump_swap_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_swap_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| coin_creator_vault_ata | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| coin_creator_vault_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| global_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| pool_v2 | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount |
| buyback_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### BuyV2

[programs/mayhem/src/instructions/buy_v2.rs:15-67](evidence/programs/mayhem/src/instructions/buy_v2.rs#L15)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_base_token_vault, mayhem_quote_token_vault, bonding_curve, associated_base_bonding_curve.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| quote_mint | `UncheckedAccount<'info>` | UncheckedAccount |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| mayhem_base_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| mayhem_quote_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Program<'info,Token2022>` | Program |
| quote_token_program | `Interface<'info,TokenInterface>` | Interface |
| global | `UncheckedAccount<'info>` | UncheckedAccount |
| bonding_curve | `Box<Account<'info,SellCurve>>` | Account, mut, seeds, exit, boxed |
| associated_quote_bonding_curve | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_base_bonding_curve | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| sharing_config | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| global_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount |
| user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| buyback_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### LegacySell

[programs/mayhem/src/instructions/sell.rs:11-44](evidence/programs/mayhem/src/instructions/sell.rs#L11)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_token_vault, bonding_curve, associated_bonding_curve.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| mayhem_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| token_program | `Program<'info,Token2022>` | Program |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| global | `UncheckedAccount<'info>` | UncheckedAccount |
| bonding_curve | `Box<Account<'info,SellCurve>>` | Account, mut, seeds, exit, boxed |
| fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_bonding_curve | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| pump_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| bonding_curve_v2 | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### SellPumpSwap

[programs/mayhem/src/instructions/sell_pump_swap.rs:18-66](evidence/programs/mayhem/src/instructions/sell_pump_swap.rs#L18)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_token_vault, mayhem_quote_vault, pool, pool_base_token_account, pool_quote_token_account, protocol_fee_recipient_token_account, coin_creator_vault_ata.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| mayhem_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| mayhem_quote_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA_init, init, exit, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| quote_token_program | `Interface<'info,TokenInterface>` | Interface, address |
| base_token_program | `Program<'info,Token2022>` | Program |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| pool | `Box<Account<'info,SwapPool>>` | Account, mut, exit, boxed |
| global_config | `Box<Account<'info,SwapGlobalConfig>>` | Account, exit, boxed |
| quote_mint | `UncheckedAccount<'info>` | UncheckedAccount |
| pool_base_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, exit, boxed |
| pool_quote_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, exit, boxed |
| protocol_fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| protocol_fee_recipient_token_account | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| pump_swap_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_swap_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| coin_creator_vault_ata | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| coin_creator_vault_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| pool_v2 | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount |
| buyback_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### SellV2

[programs/mayhem/src/instructions/sell_v2.rs:15-65](evidence/programs/mayhem/src/instructions/sell_v2.rs#L15)

Duplicate comparison candidates: global_params, mayhem_state, mayhem_base_token_vault, mayhem_quote_token_vault, bonding_curve, associated_base_bonding_curve.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Box<Account<'info,GlobalParams>>` | Account, mut, seeds, has_one, exit, codec, boxed |
| mayhem_state | `Box<Account<'info,MayhemState>>` | Account, mut, seeds, exit, codec, boxed |
| mint | `Box<InterfaceAccount<'info,Mint>>` | InterfaceAccount, exit, boxed |
| quote_mint | `UncheckedAccount<'info>` | UncheckedAccount |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| mayhem_base_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| mayhem_quote_token_vault | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Program<'info,Token2022>` | Program |
| quote_token_program | `Interface<'info,TokenInterface>` | Interface |
| global | `UncheckedAccount<'info>` | UncheckedAccount |
| bonding_curve | `Box<Account<'info,SellCurve>>` | Account, mut, seeds, exit, boxed |
| associated_quote_bonding_curve | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_base_bonding_curve | `Box<InterfaceAccount<'info,TokenAccount>>` | InterfaceAccount, mut, ATA, exit, boxed |
| creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_creator_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| sharing_config | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_event_authority | `UncheckedAccount<'info>` | UncheckedAccount |
| pump_program | `UncheckedAccount<'info>` | UncheckedAccount, address |
| user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| associated_user_volume_accumulator | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| fee_config | `UncheckedAccount<'info>` | UncheckedAccount |
| fee_program | `UncheckedAccount<'info>` | UncheckedAccount |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `Program<'info,crate::program::MayhemRecovered>` | Program |
| buyback_recipient | `UncheckedAccount<'info>` | UncheckedAccount, mut |
| buyback_recipient_ata | `UncheckedAccount<'info>` | UncheckedAccount, mut |

### Admin

[programs/mayhem/src/lib.rs:218-229](evidence/programs/mayhem/src/lib.rs#L218)

Duplicate comparison candidates: global_params.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, has_one, exit, codec |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `UncheckedAccount<'info>` | UncheckedAccount |

### InitializeGlobalParams

[programs/mayhem/src/lib.rs:313-319](evidence/programs/mayhem/src/lib.rs#L313)

Duplicate comparison candidates: none.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, init, exit, codec |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |

### InitializeFeeRecipient

[programs/mayhem/src/lib.rs:330-345](evidence/programs/mayhem/src/lib.rs#L330)

Duplicate comparison candidates: global_params.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| wsol_mint | `InterfaceAccount<'info, Mint>` | InterfaceAccount, address, exit |
| fee_recipient | `Account<'info, FeeRecipient>` | Account, mut, seeds, init, exit, codec |
| fee_recipient_ata | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA_init, init, exit |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, exit, codec |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Interface<'info, TokenInterface>` | Interface, address |
| associated_token_program | `Program<'info, AssociatedToken>` | Program |

### ExtendAccount

[programs/mayhem/src/lib.rs:348-359](evidence/programs/mayhem/src/lib.rs#L348)

Duplicate comparison candidates: none.

| Field | Type | Contracts |
| --- | --- | --- |
| account | `UncheckedAccount<'info>` | UncheckedAccount, mut, owner |
| user | `Signer<'info>` | Signer |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `UncheckedAccount<'info>` | UncheckedAccount |

### WithdrawAdmin

[programs/mayhem/src/lib.rs:371-380](evidence/programs/mayhem/src/lib.rs#L371)

Duplicate comparison candidates: global_params.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, has_one, exit, codec |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |

### WithdrawQuoteAdmin

[programs/mayhem/src/lib.rs:383-397](evidence/programs/mayhem/src/lib.rs#L383)

Duplicate comparison candidates: global_params, vault_quote_ata, admin_quote_ata.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, has_one, exit, codec |
| sol_vault | `UncheckedAccount<'info>` | UncheckedAccount, mut, seeds |
| quote_mint | `InterfaceAccount<'info, Mint>` | InterfaceAccount, exit |
| vault_quote_ata | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA, exit |
| admin_quote_ata | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA_init, init, exit |
| token_program | `Interface<'info, TokenInterface>` | Interface |
| associated_token_program | `Program<'info, AssociatedToken>` | Program |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |

### SweepFees

[programs/mayhem/src/lib.rs:433-446](evidence/programs/mayhem/src/lib.rs#L433)

Duplicate comparison candidates: global_params, trader_quote_ata.

| Field | Type | Contracts |
| --- | --- | --- |
| trader | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, has_one, exit, codec |
| quote_mint | `InterfaceAccount<'info, Mint>` | InterfaceAccount, exit |
| trader_quote_ata | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA, exit |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Interface<'info,TokenInterface>` | Interface, address |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `UncheckedAccount<'info>` | UncheckedAccount |

### SweepFeesAdmin

[programs/mayhem/src/lib.rs:449-462](evidence/programs/mayhem/src/lib.rs#L449)

Duplicate comparison candidates: global_params, admin_quote_ata.

| Field | Type | Contracts |
| --- | --- | --- |
| admin | `Signer<'info>` | Signer, mut |
| global_params | `Account<'info, GlobalParams>` | Account, mut, seeds, has_one, exit, codec |
| quote_mint | `InterfaceAccount<'info, Mint>` | InterfaceAccount, exit |
| admin_quote_ata | `InterfaceAccount<'info, TokenAccount>` | InterfaceAccount, mut, ATA, exit |
| system_program | `CheckedSystemProgram<'info>` | CheckedSystemProgram |
| token_program | `Interface<'info,TokenInterface>` | Interface, address |
| associated_token_program | `Program<'info,AssociatedToken>` | Program |
| event_authority | `UncheckedAccount<'info>` | UncheckedAccount, seeds |
| program | `UncheckedAccount<'info>` | UncheckedAccount |

## Remaining obligations and next prerequisites

D1 no longer needs a search for matching Anchor account/event/token source. Its runtime/deployment portion remains open. The six earlier M observations are not promoted to vulnerabilities or independently replayed by this package. This review narrows the dependency uncertainty rather than asserting all source semantics or security are exhaustive.

- **D1-runtime**: These source generators are not a captured compilation or historical loaded ELF attestation. Runtime signer privileges, CPI validation and atomic rollback are not implemented by these macros. Next prerequisite: Parent-provided identity-bound existing build/deployment and runtime evidence; no build/probe in this lane.
- **D2**: Pump/AMM downstream relationship/fee validation and Token/ATA processor invariants not reviewed. Interface crates are constructors/codecs, not processors. Next prerequisite: Permitted matching deployed callee identity plus public processor/configuration evidence, preserving excluded Pump sell_v2.
- **D3**: Historical ABI/compiler diagnostics remain unresolved. Next prerequisite: Identity-bound permitted ABI evidence; no compiler search.
- **D4**: Transactions must roll back prior init CPI, state writes and transfers if later checks/events fail; logs alone do not certify commit. Next prerequisite: Existing public runtime semantics and matching pre/post receipts, no new probe.
- **policy**: Token2022 quote withdrawal behavior, extension policies, bootstrap/live-state reachability and intended authorization policy. Next prerequisite: Responsible-owner supported quote/extension policy and public state provenance before source change or severity assignment.

## Evidence and verification

Run `python3 verify.py` from any working directory. It verifies the exact manifest file set, every evidence SHA256, Git blob identities for program sources, archive lock checksums, extracted member bytes, all referenced line/byte spans, all 24/15/231 bindings and prior frozen-source agreement. It neither compiles nor executes source, nor contacts a network. Integrity and inventory checks do not prove semantic/security completeness. Verification outcome is deliberately outside the seal in ../verification-outcome.json, after running a copied publication directory.

No program source changes are proposed. Parent owns review/integration; prior packages remain immutable. The seal excludes CLI telemetry, mutable logs, credentials and this verification outcome.
