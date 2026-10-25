# Relay account-context source composition

This publication supplies a coherent **uncompiled Rust proposal** for all eleven relay business contexts. `source/admission.rs` implements the ordered account parsers and creation paths; `source/frames.rs` connects their actual decoded values and account capabilities to the existing bodies and generated exits. `source/mint_policy.rs` is the unchanged recovered106 policy. The incomplete `safe_mint_106` adapter is replaced with a real immutable-data borrow and that policy. No application check is implemented as an unconditional success callback.

The result is a source integration proposal, not an accepted implementation, historical source identity, diagnostic-object equivalence, target execution result or whole-program equivalence. The framework/runtime adapter and original reserved IDL170 remain explicit boundaries. Root review and authorized implementation tests are required before any handler/completion count changes. No build, typecheck, target/runtime probe, fixture, network request, binary modification, staging, commit or parent-source edit was performed.

## Immutable lineage and scope

The original830448-byte relay ELF is SHA256 `367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`. It, the complete IDL, the492-window metadata and both boundary documents were obtained with `git show 476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40:<path>`. No moving root source was used as checkpoint evidence. The later7a9cf013 checkpoint was not needed; this package makes no independent lineage claim about unconsumed newer source. The five explicitly permitted predecessor publications supply the integrated bodies and four context/mint/exit closures. Only the two authorized native proposal files supply dispatch interfaces/source.

`input-manifest.json` gives exact whole-file sizes/hashes, origin, and source ranges. Original manifests and seals are retained unchanged under `inputs/<publication>/`; only their retained subset is certified here, not missing predecessor files. `consumed-code.json` identifies every inspected/retained code window and every instruction operand. `consumed-metadata.json` gives exact byte/line ranges of the selected window records. `consumed-literals.json` binds contiguous key/discriminator occurrences. Whole input retention is not a claim that the whole ELF was analyzed. `source-ranges.json` binds every resulting Rust file. All binary/source byte intervals are zero-based half-open; source lines are one-based inclusive. Window ordinals are inferred windows, never historical function identities.

## Concrete source and application order

| Business context | Original parser | Concrete Rust | Generated exit owned by dispatch |
| --- | --- | --- | --- |
| donate token bytes |121|`Contexts::donation`, TokenBytes|125|
| donate native bytes |126|`Contexts::donation`, NativeBytes|130|
| donate native pubkey |131|`Contexts::donation`, NativePubkey|130|
| donate token pubkey |135|`Contexts::donation`, TokenPubkey|125|
| donate token with payer |138|`Contexts::donation`, TokenPubkeyWithPayer|141|
| close epoch |142|`Contexts::epoch`|145|
| distribute after swap |146|`Contexts::after`|147|
| distribute without swap |148|`Contexts::non_swap`|149|
| just swap |150|`Contexts::just_swap`|153|
| swap and distribute |154|`Contexts::combined`|155|
| whitelist |156|`Contexts::whitelist`|158|

The six lifecycle parsers are a direct Rust translation of `lifecycle.py`, with actual typed fields rather than dictionary placeholders. Each consumes one account, performs its type admission, then consumes the next; insufficient accounts cannot outrank an earlier owner/codec/signer error. `consume_142/146/148/150/154/156` preserve the original IDL order. Remaining accounts retain their order and authentic alias handles. All methods receive checked program key, original account slice, complete selector-stripped suffix and decoded arguments. Donation parsers repeat the entire argument decode before taking accounts; epoch repeats exactly the first48 bytes (config32/epoch16). The other parsers do not invent an additional argument validation or suffix-exhaustion check.

Donation ordering is canonical tracker PDA → init_if_needed90 → writable/rent → canonical debouncer PDA → init_if_needed82 → writable/rent → destination ATA helper → writable/rent → native temporary initialization when applicable → mint/source/donor constraints → stored whitelist bump → native supported-program check → event PDA. With-payer changes funding of tracker/debouncer/destination only; donor remains token authority. Temporary native authority/funding remains donor. Native mint/program predicate103 runs **after** temporary initialization. Original126 calls129 at215288 before103 at216528. Ordinary mint-owner failure precedes source-owner failure by the branch at170928 despite the reversed physical error-block layout at171112/171168.

For existing program accounts, checked decoding precedes exact allocation length90/82, owner and rent constraints. A System-owned target follows create or prefunded top-up/allocate/assign, then actual unchecked decode. It is never replaced by a default struct. Destination ATA124 differs from output ATA creation: only System-owned donation destination accounts invoke ATA Create; both branches then decode and check token mint, token authority, owner, canonical address3014, and outer writable/rent. Existing ordinary source vaults instead check owner2023, decoded authority2015, derived address2009, then writable, without an invented separate token-mint equality.

Native temporary initialization is unconditional. Legacy size is165; Token2022 sizing depends on the **mint's live owner**, not just the supplied token-program key. The imported token-library sizing operation parses required extensions and errors; its prefunded branch is called again after transfer, before allocate. SPL InitializeAccount3 data is18 plus the donor key, with target writable and mint readonly. Token/program/native pair checks are not moved ahead of this effect.

Lifecycle translation preserves the distinctions that were missing in the older declarations:

- Close142 initializes distribution98 and its ATA unconditionally before existing tracker/debouncer seeds, source vault, mint, relayer and event constraints. Both tracker/debouncer use stored bumps and argument config plus supplied mint. Rent is observed separately for each initialization.
- Just150 initializes receipt49 from `[swap_receipt_v1, distribution.key, canonical bump]` and unconditionally creates output ATA before stored PDA and mint/relayer/Jupiter constraints. It does not add a close-destination check.
- Combined154 unconditionally creates output ATA first, then validates stored PDAs, distribution writable/close-destination, vault and mints, relayer, Jupiter and event authority. It does not transplant just-swap-only business guards.
- After146 uses receipt.output_amount for distribution, validates receipt's stored bump, writable, stored distribution relation6033, then close destination. Its output mint uses6006, whereas swap's fixed output mint uses2012.
- Non-swap148 uses supplied mint for tracker/debouncer seeds but the distribution's stored mint for its own PDA. The body subsequently checks mint relations; the parser does not move those checks earlier.
- Whitelist156 canonically derives its PDA, uses the live System owner to choose initialization1037 or checked existing decode, and checks exact length, owner and rent on **both** branches. Outer writable/rent repeat before fixed relayer checks. No realloc, vector bound, sort or deduplication is inserted in the parser; the body retains max32/custom6032.

Relayer admission reads the original signer privilege during ordered consumption (280 at650976), before deferred initialization. Writable and fixed-address2012 checks occur later. The body retains its independent6015 address comparison. No equality check manufactures a signature; instruction-meta signer bits request privileges that the genuine runtime must enforce.

## Instructions, borrows and codecs

System instructions are constructed concretely in Rust: CreateAccount0 with payer/new-account writable signer metas, Transfer2 with only payer signing, Allocate8 with target signing, and Assign1 with target signing. Allocation/assignment use one real PDA seed group; prefunding transfer supplies no PDA signature. The funded branch rejects payer=target4101, computes `max(minimum_balance,1)`, transfers a positive shortfall, then allocates and assigns. Original151 anchors455328/455688/455752 and calls457304/459072/460192/461216 bind that order. An already-funded receipt is not reused just because its bytes decode; genuine System operations must succeed.

ATA creation constructs byte00 with six metas in order: payer writable signer, **canonical** ATA writable nonsigner, authority readonly nonsigner, mint readonly nonsigner, System readonly, token-program readonly. Original152→225→255→254 establishes non-idempotent Create. The original target capability is passed; a wrong key cannot be replaced by a fabricated canonical account. Runtime account resolution and external ATA execution remain required. Output/distribution ATA paths invoke Create regardless of current owner or balance.

Program-account type admission concretely checks System-owner/zero-lamport uninitialized3012, declared relay owner3007, immutable fallible data borrow, then checked discriminator/body decoding. Interface type admission concretely checks the same uninitialized condition, supported token owners, borrow, and imported SPL unpacking. SPL unpacking is a bounded library primitive, not a relay policy callback. Body reloads use the same explicit owner rules and fresh borrowed data through `Runtime::token/mint`.

State codecs retain actual field layouts and enum validation. Newly allocated accounts skip discriminator comparison only; payload bytes still decode. The original unchecked decoders160/162/164/166/168 first branch on length<8 to the slice-panic helper. For168,514824 branches to515384 and calls730592 at515408; buffers with a prefix but a short payload reach3003. `codec::header` now distinguishes this from checked short-prefix3001/mismatch3002. Panic text/object identity is not claimed. No original path/line is fabricated.

## Shared state, aliases and exits

`Runtime: AccountRuntime<A=Account>` unifies the body account type and exit handle type. `Account` is a trusted invocation-arena capability with immutable key/privilege metadata; its private handle resolves to the **same** runtime owner, data, lamports and borrow cells across all copies. The trusted loader supplies capabilities from the real original account list, including duplicate aliases. There is no public constructor accepting arbitrary signer flags. An adapter that deep-copies backing state violates the contract.

Each typed `Loaded<T>` owns the result of an actual decoder. `DonationFrame::body`, `EpochFrame::body` and `JustFrame::body` borrow those values mutably; their `exit` views borrow those **same fields**. There is no second decode, synthesized initial state or exit-only state copy. Distinct typed wrappers may retain separate decoded caches even when their underlying account capabilities alias, matching the framework distinction between decoded state and AccountInfo storage. CPI changes live storage; explicit token reloads observe it. Generated state exits serialize the body-mutated cache.

`Loaded.info.owner` records the owner captured at interface decoding. Generated interface exits use this cached owner for their first gate, then read live owner/data for closed status. Body mint admission/policy uses the live owner instead. Original8 snapshots owner words at6296 onward into its returned wrapper; original283 at652288 reads AccountInfo owner and conditionally tests data-empty at652376. Closed means System owner AND empty data, never merely zero lamports. State persistence compares the type's declared relay owner with checked program key, not live owner;17 at14056 and14088 establishes the two gates. Successful interface exit still acquires the fallible mutable data borrow even though it writes zero bytes.

Generated exits are preserved in their original order.125/130/141 persist tracker and debouncer before vault/mint/source interface borrows;145 persists distribution before its vault, then tracker/debouncer/source/mint.147 closes distribution then receipt before interfaces;149 closes distribution;153 persists distribution then receipt before four interfaces;155 closes distribution before its interfaces;158 streams whitelist discriminator/bump/count/keys without clearing trailing allocation. Close282 reads destination then source balance, checked-adds with framework panic on overflow, writes destination then source, assigns System, then resizes zero. Alias-sensitive ordering and resize failure after earlier effects are preserved. Transaction rollback belongs to the runtime.

Native dispatch remains byte-for-byte unchanged in this proposal. It alone calls the exact nine exits after body/event/return success; whitelist exits without event or return data. An unused predecessor callback wrapper and the older unused program-close helper were omitted to prevent competing return/exit or close semantics.

## Conflicting representations resolved against original operands

`adapter-map.json` maps internal context offsets to named Rust fields; it is not a repr(C) layout. After146's receipt amount at+232 feeds body97:94360; its vault balance at+584 is loaded separately at94376. These are not distribution.total_amount at+464. Non-swap148 uses distribution total+408 at100456 and vault balance+528 at100464. Just150 uses distribution total+528 at104720, input balance+648 at105800, and a separate receipt payload at+280. Combined154 removes the56-byte receipt segment: distribution total is+472 and input balance+592. Frame constructors follow these distinct accounts and fields instead of casting the old model layout.

`Settlement` keeps source token, mint, token program and authority as separate fields. Its inherited body mapping is source K+16, mint K+64, program K+112, authority K+160. Source/authority inversion would silently produce wrong CPI metas; every frame constructs it explicitly with authority=distribution. Close's source is debouncer vault, destination distribution vault, authority debouncer. Donation's source/temp remains donor-authorized. The complete prior layout ledger is retained, with all corresponding selected parser/body/adapter bytes.

The extractor classifies opcode0x85 calls by their source-register operand. Only src1 receives PC+8+8*signed_immediate relative resolution. Callx retains its register operand, and external/absolute calls are not resolved using annotated names. No inferred window is promoted to a historical function identity.

## Mint policy and remaining boundaries

The unchanged mint policy performs base/header validation before authority rejection and six independent extension scans: transfer fee config, transfer hook, permanent delegate, close authority, default account state, and nontransferable. The original authority policy follows shared112 message/tip/owner and native/whitelist bypass gates. Lookup errors are suppressed only by the observed scan callers; malformed base decoding propagates a distinct ProgramError conversion, never custom6031. The adapter holds the immutable borrow through all scans. There is no second Token2022 policy imported from the stopped Pump lane.

The coherent application paths are now concrete, but these implementation obligations remain:

1. Authentic loader arena, AccountInfo borrow cells, rent/PDA syscalls, CPI resolution/execution and transaction rollback must implement the declared primitives. Genuine signer flags are non-negotiable. This package supplies no runtime or success stub.
2. SPL base/extension unpacking and required-token-account-extension sizing remain bounded library primitives, including malformed-data and borrow errors. Box allocation, arena retention versus exact Rc clone/drop timing, refcount overflow, allocator failure and panic payload identity are outside the normal-resource hypothesis.
3. Rich diagnostics remain a **separate boundary**. Numeric Error::Code and FrameworkFailure values describe decisions, not complete historical Anchor objects. Account-origin strings/lines, name/message allocation, compared-value owner-list formatting, conversion652528, ProgramError field decoration, report286/lowering290, cleanup and exact invalid-alias error representation are not fully implemented. Do not publish this as rich-error equivalence. Original metadata that is represented is retained; missing metadata is not silently asserted equal.
4. Original reserved IDL170 is unchanged as `Failure::Unrecovered`; this is an analysis stop, not a success or guessed Anchor IDL implementation. Loader entrypoint ABI also remains external.
5. No compiler, linker, target execution, differential cases or whole-ELF equality evidence is supplied. A later authorized build may expose Rust integration issues; this work deliberately did not typecheck.

`DISPATCH_COMPATIBILITY.md` specifies the exact adapter obligations and source changes. The portable verifier checks integrity, selected original instruction/call operands, source/order bindings, state-view mappings and predecessor seals. It never executes Rust, lifecycle.py, SBF, transaction fixtures or runtime probes. Run `python3 -B verify.py` from an independent copy. Its successful separate-copy run is recorded outside the sealed publication.
