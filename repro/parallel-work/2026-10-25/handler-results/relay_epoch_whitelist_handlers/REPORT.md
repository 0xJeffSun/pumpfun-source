# Relay epoch close and mint whitelist: bounded natural-source hypotheses

Fixed input checkpoint: **476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40**. This package recovers concrete handler behavior, context/init/exit schedules, a variable whitelist wire fragment, and exact close-event wire construction. `hypothesis.rs` is an implementable, dependency-free Rust fragment conditional on admitted accounts and the explicitly described runtime effects. `context-hypothesis.rs` proposes corresponding Anchor declarations; it is not a verified macro expansion or standalone build. Neither file has been compiled or run. No accepted implementation, handler count, historical function identity, exact error ABI, or whole-program equivalence is claimed.

The 830,448-byte original is SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. All inputs were obtained with `git show` at the fixed checkpoint, not from the moving source tree. `input-manifest.json` records whole-file SHA256, Git blob hash, checkpoint path and consumed source-line ranges. `static-evidence.json` records complete consumed code windows, literal/metadata ranges, raw instructions, signed call operands and branch destinations. Decimal ranges are half-open ELF file offsets, equal to virtual offsets for this capture's text. An inferred window is a partition for analysis, not a recovered historical function identity.

## Boundaries and method

Only these two handlers and their identified context/codec/CPI/exit dependencies were examined. No other worker directory, stopped work, private audit material, configuration, credentials, network, build, SBF execution, transaction fixture, target probe, binary patch, compiler search or parent-source mutation was used. Prior evidence seals were read-only. Telemetry and separate-copy verification receipt are outside publication. The fixed docs retain the root acceptance boundary: static proposals do not change completion counts.

The predecessor fixed codec and error reports are copied with their original historical claims unchanged. Their older checkpoint labels are provenance, not current implementation claims. Fixed codecs supply the ordinary wire/error premise; this package extends the variable whitelist and handler/context behavior. Sort/math studies are not needed: neither handler sorts or calls the distribution arithmetic lane.

`window-N.txt` is readable raw-operand decoding. External relocation calls are identified from the retained relocation records; register-source-1 internal calls use `pc + 8 + signed_imm*8`. Annotations do not override operands. `derive.py` independently recomputes internal calls from raw bytes, excluding type-10 syscall relocations, and matches them against the frozen inventory. The verifier checks complete windows and explicit instruction facts; it does not prove the handwritten semantic translation.

## Actual boundaries and ordering

| Role | Epoch close | Whitelist upsert |
|---|---|---|
| Dispatch call | 516856 → 542112 | 517416 → 551160 |
| Generated wrapper | W183 [542112,544128) | W188 [551160,552048) |
| Generated context | W142 [372816,388280) | W156 [490024,494368) |
| Init dependencies | W143 [388280,395160), W144 [395160,398696) | W157 [494368,503808) |
| Authorization/handler adapter | W204 [579576,582808) | in W188, call 551672 → W105 |
| Business body | W96 [87880,91880) | W101 [112568,113176) |
| Exit | W145 [398696,402000) | W158 [503808,505216) |

Both wrappers log the instruction before decoding arguments. Close decodes 32-byte config_id then LE u128 epoch (at least 48 argument bytes), and the context independently re-decodes them for seeds. It does not demand complete consumption of trailing instruction bytes. Upsert calls W79 [60320,61568) for a Borsh u32-length vector of 32-byte keys, also accepting a suffix. Decode failure becomes 102 before account parsing. In upsert, a syntactically valid vector of more than 32 elements is decoded/allocated before the context and before handler error 6032; imposing a decoder max-32 rule would change behavior and precedence.

Both contexts require signer status (W80 → W280: account flag +40, error 3010), signer writable (2000), and key equal to the fixed 32-byte relayer at [752896,752928), base58 `RLYRf96HAJSbbXCNS6ibQYnkxtb6kbfuFxqEkm9oQUc` (2012). After context success W105 [114568,115456) repeats the key comparison, with custom 6015 on failure. Thus the ordinary top-level wrong-key case reaches context 2012 first; 6015 belongs to the later authorization helper. The helper does not replace the context signature check.

## Whitelist context, construction and exit

The three accounts in order are raw mint_whitelist, Signer signer, executable system program. Missing accounts select 3005. System key/executable admission is W88 [63672,64232), errors 3008/3009. The context reads Rent (491064), derives the canonical PDA from exactly `mint_whitelist_v1` under the executing program (491576), records the returned bump, and compares the account key (491792; 2006 on mismatch). This occurs before W157 initialization.

W157 first tests owner against System (494440). A non-System-owned existing account goes through the checked program-account parser W27 → W165, enforcing relay owner, discriminator and body decoding. A System-owned account goes through initialization: zero lamports uses create-account with rent minimum and **1037 bytes** (497568/497576). A funded System account rejects payer==target through the 4101 framework-error construction (498168), transfers the rent shortfall using max(minimum_balance(1037),1), allocates 1037 bytes (500608/500616), and assigns relay ownership (502744), signed by `[mint_whitelist_v1, canonical_bump]`. CPI errors propagate; owner/rent/length checks are not waived on the existing path.

After the fresh unchecked parse W12 → W166, the shared continuation checks data length **equal to 1037**, not merely large enough (495408–495424; 2019 on mismatch), owner equality (495496; 2004), and rent balance (500752–501264; 2005). The outer context then checks whitelist writable, rent exemption again, signer writable and signer address. Thus account creation and rent funding can precede final address rejection; runtime rollback is essential. This ordering is why the proposed declaration is `init_if_needed`, not realloc-on-every-update. No resizing of an existing wrong-sized registry is evidenced.

W101 reads vector length at +16 and branches on `<33` at 112584; otherwise it constructs custom **6032 InvalidMintWhitelist** (112904). On success it moves the vector's three machine words into the account and writes the canonical bump at +24 (113008–113064). It does not inspect keys, sort, deduplicate, merge with the old vector, or emit an event. Empty input clears the logical whitelist; duplicate keys retain their positions.

The checked whitelist codec W165 [512088,513224) validates the 8-byte discriminator `4973b1ebea015f43`; short prefix is 3001, mismatch is 3002. W166 [513224,513680) reads bump at wire offset 8, then delegates the suffix starting at 9 to W79. Missing/short length or elements become 3003. Successful wire length is **13+32*n**, with trailing bytes allowed. The raw codec itself does not impose n<=32. In W79 the first allocation is min(n,128)*32, zero length uses an empty-vector representation, every iteration checks at least 32 remaining bytes, and the capacity-full path calls W70. The fragment models the normal value/cursor contract; grow capacity policy, allocator failure and cleanup remain transitive premises. There is no need to establish every allocator failure to use the bounded normal-return fragment.

On body success the wrapper calls W158 (552016); on body error it returns without exit. W158 writes only for the executing relay program and a nonclosed account (503856/503912); borrow conflict is propagated. It writes discriminator, one-byte bump, LE u32 vector length, then 32 bytes for every key (504040/504192/504320/504400). n>u32::MAX and write failures map to 3004, with account-name metadata. W281 shows partial writes on a too-short destination, and no zero-fill of unused suffix. A shorter update therefore leaves prior bytes beyond the new serialized prefix untouched. Clearing writes a 13-byte prefix into the 1037-byte account; it does not erase the remaining allocation. No return-event serialization or event-authority account exists on this instruction.

## Close context: actual admission and allocation

IDL account order is distribution, distribution_token_account, epoch_tracker, debouncer, debouncer_token_account, mint, token_program, signer, associated_token_program, system_program, event_authority, program. The first two are retained raw for deferred initialization. The existing tracker and debouncer are checked program accounts (W86 → W25 → W163; W83 → W23 → W159); token accounts/mint are interface types, token program is an interface program, signer is a Signer, ATA/System are executable fixed-id programs, and the last two are unchecked AccountInfo wrappers.

Fixed account codecs accept state tags 0 and 1, named Uninitialized/Initialized in the IDL; invalid tags are deserialize error 3003. **No additional requirement for state==Initialized occurs in this context or W96.** No stored-config equality predicate occurs here. The argument config_id does participate in PDA checks, and the handler copies stored debouncer config/mint. These distinctions must survive implementation review.

The generated constraint schedule is:

1. Rent acquisition; canonical distribution PDA from `[distribution_v1, argument_config_id, supplied_mint_key, argument_epoch_le16]` (377520–377944), 2006 on mismatch. W143 initializes 98 bytes with signer as payer, canonical distribution bump as signer seed, System create-account or funded-account rent top-up/allocate/assign branches. It is unconditional init, not init_if_needed; no business-level existing-distribution state test is substituted for System failure. W11 performs unchecked deserialization after initialization.
2. Distribution writable/rent checks; another Rent read and W144 creates the distribution ATA. W144 → W225 → W255 → W254 constructs ATA **Create, data byte 0**, not idempotent Create. Payer=signer, owner=distribution, mint=supplied mint, selected token program. W144 then parses the created token account; outer parser checks writable/rent. System/ATA success and their external state effects are explicit premises.
3. Tracker PDA uses `[epoch_tracker_v1, argument_config_id, supplied_mint_key, tracker.stored_bump]` with create-program-address (380904), not find-canonical-bump. Creation failure/key mismatch is 2006; writable is 2000. Debouncer is analogous with its own stored bump and `debouncer_v1` (382344/382664), then writable. There is no separate custom InvalidBump admission.
4. Debouncer token-account program owner equals supplied token_program (383528, 2023); its token authority equals debouncer (383904, 2015); its key equals ATA derivation with debouncer, mint, token program (384464/384584, 2009); writable follows. Mint writable, key equals **stored debouncer.mint** (385424, 2012), mint program owner equals supplied token_program (385552, 2022). The key comparison's source is the debouncer payload copied at 374632, not an inferred config-account field.
5. Signer writable and fixed address (386096), then canonical event_authority PDA under `[__event_authority]` (386176/386384; 2006). The event bump is recorded. The program AccountInfo is consumed as unchecked; no parser address/executable assertion for it is inserted in this hypothesis. Event CPI targets the embedded relay id.

Framework account owner/uninitialized/borrow/parser failures propagate before later constraints. State wire discriminators and lower bounds remain the predecessor contracts: Debouncer 82, Tracker 90, Distribution 98 bytes. No additional configuration account is passed. Config_id, epoch, stored bumps, account ownership and address checks are separate invariants; IDL documentation alone is not used to add checks.

## Close body, transfer and mutation order

W204 authorizes through W105, then invokes W96. Its admitted-context layout is: tracker at +0 (current epoch +72/+80), distribution at +232 (config +240, mint +272, epoch +304/+312, amount +320, bump +328, state +329), debouncer at +336 (config +344, mint +376, amount +408, bump +416, state +417). These are observed binary layout offsets only, not proposed portable Rust layout.

W96 first loads **recorded debouncer.total_amount**, not the token-account balance (87896). Zero fails with **6012 InvalidBalance**. Next it compares both u64 halves of tracker.current_epoch against the u128 argument (88328–88408); any inequality fails **6011 EpochAlreadyClosed**, not 6027 InvalidEpoch. This is equality, not `<` or `<=`.

It copies debouncer config/mint into distribution, copies current_epoch, stores canonical distribution bump, recorded amount and state=1 (88568–88688). It assembles signing seeds from the **stored debouncer** fields and bump. These precede the transfer. W226 [614432,616736) → W248 [639120,640832) builds Token/Token2022 TransferChecked, and W244's selected arm serializes byte **12**, LE u64 amount and mint decimals: exactly ten instruction bytes. CPI accounts are source=debouncer ATA, mint, destination=distribution ATA, authority=debouncer, with no extra multisig signers. The selected token program is validated by W248 against the two embedded ids; unsupported program yields an IncorrectProgramId-shaped error. Transfer effects, fees/extensions, balances/freeze policy and invocation failure remain token-program/runtime premises. The source does not precheck equality of actual token balance with recorded amount.

Only on transfer success does it zero debouncer.total_amount (91352), then checked-increment the tracker u128 (91360–91512). Overflow invokes custom variant 8 through W115, which adds 6000: **6008 ArithmeticOverflow**. This failure follows the successful CPI and local writes, so transaction rollback is part of the contract. No handler lamport-transfer branch is present; native-token behavior, if used, is the token program's behavior. System lamport transfers in the generated context fund rent and allocation.

The event uses stored debouncer config/mint, the **preincrement** epoch, and the recorded amount. Tracker state, tracker stored config/mint/bump and debouncer state/config/mint/bump are not rewritten by W96. Only distribution is marked Initialized.

## Exact event and exit sequence

W117 [153952,154912) serializes one-byte Daas enum ordinal **1**, config_id[32], mint[32], epoch LE u128, gross_epoch_amount LE u64: **89 bytes**. This is backed by actual loads/stores and the W96 tag store at 91752, not just IDL field ordering.

After successful W96, W204 emits the following in order:

- log_data with event discriminator **9ba9170e06755693** followed by the 89-byte payload (**97 bytes**), call 580560 → W295;
- self event CPI data **e445a52e51cb9a1d** + the 97-byte event (**105 bytes**), target embedded relay id, one readonly signer meta for event_authority, signed by `[__event_authority, canonical_event_bump]` (581352–582152); the handler propagates CPI error;
- return of event to W183, which serializes the **bare 89-byte payload** and calls set_return_data (543760/543784), then runs account exit (543832).

W145 exits distribution first through W20, performs distribution-token-account owner/closed/borrow handling, serializes tracker through W18, then debouncer through W17, followed by remaining token/mint/account exit/borrow handling. Each writable program account serializer has owner and closed-account gates, writes its discriminator and fields, and maps write failure to 3004. Framework borrow errors and account-name origin metadata survive these exits. An exit failure can therefore follow the event log, event CPI and return-data setup. Logs must not be treated as proof of successful committed state. Runtime rollback covers account writes and CPI state effects; this report makes no claim about off-chain log delivery on failed transactions.

## Explicit remaining premises and review gates

The Rust fragments model ordinary completed allocation/formatting paths and preserve business check/mutation ordering. They do not model machine register layout, panic strings, historical diagnostic source coordinates, allocator OOM/growth, refcount aborts, indirect destructors, SDK macro-version ordering or total error-object parity. `read_keys` maps its local decode failures to 3003; an instruction wrapper must remap its decode failure to 102. Account serialization skips and metadata wrapping belong to the described framework adapter, not the standalone byte helper.

The context declaration is an implementable hypothesis for Anchor integration, not a proof that an arbitrary Anchor version expands into this parser. Root must review the byte schedule against actual generated context before adopting it. External PDA hash/off-curve derivation, rent, System create/transfer/allocate/assign, ATA Create, token-interface decoding/extensions, token TransferChecked, invoke_signed/self-event dispatch, error conversion, allocation and atomic rollback are bounded transitive premises. They are named, not silently replaced with successful stubs. This package does not establish all helper failure semantics or all data/call closure. No probes or build tests were performed or implied.

Root acceptance requires an actual integrated implementation and authorized tests. Until then these remain static source hypotheses with unchanged handler/completion counts and original binary inequality status.

## Portable verification

Run `python3 verify.py` from a separate copy of publication. It checks an exact artifact set, every whole-file SHA256, input Git blob identity, the raw selected-window/data-range ledger, signed internal call targets, critical branch/store constants, IDL account/event bindings, relayer bytes and regenerated readable instruction ledgers. It uses only Python's standard library, reads copied inputs, writes no target state, and never invokes a compiler or the captured executable. The immutable manifest excludes itself; its SHA256 is recorded in the outside `result.json`, preventing a silently resealed package from matching that handoff. The separate-copy receipt is outside publication.
