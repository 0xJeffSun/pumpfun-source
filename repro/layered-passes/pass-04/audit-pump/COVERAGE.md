# Full frozen Pump coverage ledger

All line numbers refer to frozen aa98fb45 source. Snapshots preserve line count and mask excluded lines. Declared constraints are inspected; generated contexts, complete original equivalence and security closure are open.

## programs/pump/Cargo.lock

SHA-256 `486cbaa1eab7a945e849df5f72ca7c1e0b172ab8a17a1cd7a353fde123a84e95`; 2817 lines; 0 included / 0 opaque declarations.

**authority:** Dependency pins/build configuration inspected; no dependency source or build executed.

**accounts:** Dependency pins/build configuration inspected; no dependency source or build executed.

**cpi:** Dependency pins/build configuration inspected; no dependency source or build executed.

**arithmetic:** Dependency pins/build configuration inspected; no dependency source or build executed.

**serialization:** Dependency pins/build configuration inspected; no dependency source or build executed.

**ordering:** Dependency pins/build configuration inspected; no dependency source or build executed.

**limits:** Dependency pins/build configuration inspected; no dependency source or build executed.

| Function | Lines | Disposition |
|---|---:|---|

## programs/pump/Cargo.toml

SHA-256 `2e573ab4e47e5032b9dd3cb21391502bbd91c648ab37c63b99a63fa80afacf0e`; 25 lines; 0 included / 0 opaque declarations.

**authority:** Dependency pins/build configuration inspected; no dependency source or build executed.

**accounts:** Dependency pins/build configuration inspected; no dependency source or build executed.

**cpi:** Dependency pins/build configuration inspected; no dependency source or build executed.

**arithmetic:** Dependency pins/build configuration inspected; no dependency source or build executed.

**serialization:** Dependency pins/build configuration inspected; no dependency source or build executed.

**ordering:** Dependency pins/build configuration inspected; no dependency source or build executed.

**limits:** Dependency pins/build configuration inspected; no dependency source or build executed.

| Function | Lines | Disposition |
|---|---:|---|

## programs/pump/README.md

SHA-256 `dd0aaaf9ba43b6ed264aa0feff65aab7f15edbd900c14e5e79f981d6d53c6ace`; 260 lines; 0 included / 0 opaque declarations.

**authority:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**accounts:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**cpi:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**arithmetic:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**serialization:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**ordering:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**limits:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

| Function | Lines | Disposition |
|---|---:|---|

## programs/pump/recovered/README.md

SHA-256 `46eac75f48743d05e9acd4964080c739eedcc47cf47ad291f6f87459304f52b3`; 39 lines; 0 included / 0 opaque declarations.

**authority:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**accounts:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**cpi:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**arithmetic:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**serialization:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**ordering:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

**limits:** Documentation inspected for explicit partial-recovery, historical-count, no-signoff and original-identity limits.

| Function | Lines | Disposition |
|---|---:|---|

## programs/pump/recovered/constant_product.rs

SHA-256 `ec71f386f5f42abca163df627c7d8a5741c8954efec8732a1c9093728d33a99b`; 19 lines; 1 included / 0 opaque declarations.

**authority:** Standalone host/arithmetic module, not linked by lib.rs; no chain authority.

**accounts:** No chain accounts. Host input parser trusts comma-separated fields and unwrap/index operations.

**cpi:** None.

**arithmetic:** constant_product uses checked u128 mul/add/div. Sell fees use u64 products within u128 and checked narrowing/subtraction; ceil +9999 fits the u64 product bound.

**serialization:** Host text output is not original Anchor ABI; no replacement claim.

**ordering:** Host malformed input may panic; no chain transaction interpretation.

**limits:** Source-only inspection, no host build/test/probe. Fragment agreement cannot certify enclosing trades.

| Function | Lines | Disposition |
|---|---:|---|
| constant_product_output | 13-19 | manually-inspected-bounded-static |

## programs/pump/recovered/constant_product_host.rs

SHA-256 `ee2e9e7fb89d7cdc42525dcafa28c802faab4ccb874652fa9df2307b11bc5825`; 13 lines; 1 included / 0 opaque declarations.

**authority:** Standalone host/arithmetic module, not linked by lib.rs; no chain authority.

**accounts:** No chain accounts. Host input parser trusts comma-separated fields and unwrap/index operations.

**cpi:** None.

**arithmetic:** constant_product uses checked u128 mul/add/div. Sell fees use u64 products within u128 and checked narrowing/subtraction; ceil +9999 fits the u64 product bound.

**serialization:** Host text output is not original Anchor ABI; no replacement claim.

**ordering:** Host malformed input may panic; no chain transaction interpretation.

**limits:** Source-only inspection, no host build/test/probe. Fragment agreement cannot certify enclosing trades.

| Function | Lines | Disposition |
|---|---:|---|
| main | 4-13 | manually-inspected-bounded-static |

## programs/pump/recovered/sell_accounting.rs

SHA-256 `23c1bbd79d6aa2987472a6eba572e0ded99cc8846cffd6bc23883f0700a25983`; 28 lines; 2 included / 0 opaque declarations.

**authority:** Standalone host/arithmetic module, not linked by lib.rs; no chain authority.

**accounts:** No chain accounts. Host input parser trusts comma-separated fields and unwrap/index operations.

**cpi:** None.

**arithmetic:** constant_product uses checked u128 mul/add/div. Sell fees use u64 products within u128 and checked narrowing/subtraction; ceil +9999 fits the u64 product bound.

**serialization:** Host text output is not original Anchor ABI; no replacement claim.

**ordering:** Host malformed input may panic; no chain transaction interpretation.

**limits:** Source-only inspection, no host build/test/probe. Fragment agreement cannot certify enclosing trades.

| Function | Lines | Disposition |
|---|---:|---|
| ceil_fee | 14-17 | manually-inspected-bounded-static |
| sell_accounting | 18-28 | manually-inspected-bounded-static |

## programs/pump/recovered/sell_accounting_host.rs

SHA-256 `b4aa42643c68895a23b99d5c46ac429cdaff76f0b650b69211b813b48859a39a`; 13 lines; 1 included / 0 opaque declarations.

**authority:** Standalone host/arithmetic module, not linked by lib.rs; no chain authority.

**accounts:** No chain accounts. Host input parser trusts comma-separated fields and unwrap/index operations.

**cpi:** None.

**arithmetic:** constant_product uses checked u128 mul/add/div. Sell fees use u64 products within u128 and checked narrowing/subtraction; ceil +9999 fits the u64 product bound.

**serialization:** Host text output is not original Anchor ABI; no replacement claim.

**ordering:** Host malformed input may panic; no chain transaction interpretation.

**limits:** Source-only inspection, no host build/test/probe. Fragment agreement cannot certify enclosing trades.

| Function | Lines | Disposition |
|---|---:|---|
| main | 4-13 | manually-inspected-bounded-static |

## programs/pump/src/admin_cto.rs

SHA-256 `d3d93aded7ebb6fd50978d88f9e506de8d5016c7ccec46c3387501bd6f80d314`; 150 lines; 7 included / 0 opaque declarations.

**authority:** Global has_one admin_set_creator_authority Signer; pool-authority is a Pump PDA. Caller cannot substitute AMM/Fees Program identities.

**accounts:** Curve and sharing/pool/vault/ATA addresses are constrained. current_creator equality checked; wallet writability checked in handler. holder destination is checked in the shared-to-holder branch when used. Raw mint used as a seed, not decoded.

**cpi:** AMM fixed calls collect/transfer/update and Fees reset use explicit metas; Fees reset and AMM update receive pool PDA signer. ATA creation and token transfer use typed dependencies. Token helpers parse data without standalone owner verification.

**arithmetic:** Rent uses saturating deficit; payout from available balance; no local total-fee bound beyond global configured maximum. Frozen wallet and shared-vault branches affect payout selection.

**serialization:** DistributionCurve is read-only/no-op serializer; final raw offsets 49,115,123,124 are written after resizing. This avoids a derived stale full-state exit overwrite, but external CPI state effects remain a premise.

**ordering:** Mayhem/holder/fee checks precede resize. Shared AMM sweep precedes wallet checks; payouts precede Fees reset and AMM update; final raw curve write follows CPIs. Later errors must roll back earlier effects.

**limits:** No original CPI graph independently compared; raw error numbers and frozen/alias behavior need original evidence before any correction.

| Function | Lines | Disposition |
|---|---:|---|
| id | 6-6 | manually-inspected-bounded-static |
| id | 7-7 | manually-inspected-bounded-static |
| err | 99-99 | manually-inspected-bounded-static |
| execute | 100-144 | manually-inspected-bounded-static |
| token_frozen | 146-146 | manually-inspected-bounded-static |
| token_amount | 147-147 | manually-inspected-bounded-static |
| pay_token | 148-150 | manually-inspected-bounded-static |

## programs/pump/src/buy_v2.rs

SHA-256 `2807d9bb8ff4958171ea5ce1a854fe3bec047ff3d392a01da8651231333a7e46`; 113 lines; 6 included / 0 opaque declarations.

**authority:** User signs; curve/base/user token constraints and fixed Fees program bind main flow. Fee/buyback recipients come from Global membership.

**accounts:** Quote ATAs are seed-constrained. check_token only checks decoded mint and ignores its owner argument; user authority separately checked. Token account runtime owner checks are partly deferred to positive CPIs; zero legs skip them.

**cpi:** Base transfer precedes buyback membership check. Fees return_data provider is discarded. Quote transfers use typed TokenInterface; source user authority and downstream token semantics remain required.

**arithmetic:** u64 helpers check add/sub/narrow; cap and buy denominators rely on reserve invariants. Partial exact buys may bypass minimum when capped. Nominal quote accounting is not a proof of extension net amounts.

**serialization:** LegacyCurve compatibility decoder/exit; sharing decode errors become an empty event shareholder vector. Init-if-needed volume user is set only if zero.

**ordering:** Quote ATA initialization precedes trade validity checks; base transfer precedes buyback check; rent top-up/resize follows event emissions. Preserve rollback and error precedence.

**limits:** No upcoming Buy proposal is assessed. Token extensions, legacy-state admission and original error precedence remain unproven; no defect patch warranted from this review alone.

| Function | Lines | Disposition |
|---|---:|---|
| add | 50-50 | manually-inspected-bounded-static |
| sub | 51-51 | manually-inspected-bounded-static |
| narrow | 52-52 | manually-inspected-bounded-static |
| execute | 53-110 | manually-inspected-bounded-static |
| ceil_fee | 111-111 | manually-inspected-bounded-static |
| check_token | 113-113 | manually-inspected-bounded-static |

## programs/pump/src/cashback.rs

SHA-256 `647c24a4c6ad68a2b8e43ae60da9cbf9fa805e2c9a3227ace595033c56232410`; 54 lines; 2 included / 0 opaque declarations.

**authority:** Permissionless payout binds recipient to canonical user accumulator PDA owned by Pump; no arbitrary recipient field supplied to the handler.

**accounts:** V2 quote mint/program are unchecked; mint owner equals program on nonnative branch. Recipient runtime owner and decoded user checked only for positive balance; source ATA canonical. Dependency instruction builder/processor identity checks not expanded.

**cpi:** V2 calls token_interface transfer_checked with accumulator PDA signer. Native uses direct program-owned lamport debit. Cannot conclude arbitrary CPI without resolving dependency builder checks.

**arithmetic:** V1 checked counter add; V2 += uses locked release overflow-checks=true and panic=abort, not the same explicit error conversion. Claims use excess balance rather than cashback_earned entitlement cap.

**serialization:** Native/stable counters are different; V2 token event still emits native total_claimed. This is a candidate fact, not demonstrated original mismatch.

**ordering:** Zero balance returns before recipient validation; native counter increment before lamport transfer; stable increment after token CPI. Failure rollback and recipient aliases unresolved.

**limits:** Do not infer incentives eligibility from these handlers or inspect stopped incentive code. Need original plus reachable-state evidence for economic claims.

| Function | Lines | Disposition |
|---|---:|---|
| claim | 32-37 | manually-inspected-bounded-static |
| claim_v2 | 38-54 | manually-inspected-bounded-static |

## programs/pump/src/collect_v2.rs

SHA-256 `2915dc08ced5022aea32fa0440d6d24ab7f30197ef25f1055c9c6c73d8d22df1`; 30 lines; 1 included / 0 opaque declarations.

**authority:** Permissionless, with creator-vault and recipient ATA derived from creator key.

**accounts:** Canonical ATA addresses; unchecked vault token data parsed for amount; interface mint and program constraints. Executable creator returns successfully without transfer.

**cpi:** Positive balance only: System transfer with creator-vault seeds or token transfer_checked with same authority. ATA source ownership/mint validity partly delegated.

**arithmetic:** Native rent saturating_sub; token amount uses decoded account balance.

**serialization:** No mutable account structure; event records nominal gross transfer amount.

**ordering:** Executable and zero early returns precede transfer validation/event; errors propagate.

**limits:** Zero-path permissiveness and extension net-receipt effects are not confirmed vulnerabilities.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 19-30 | manually-inspected-bounded-static |

## programs/pump/src/create.rs

SHA-256 `d00b52848071d1b2edb8fddd8e716e7bd407f1e9c1c5b691dec95312fb7f0bbb`; 46 lines; 2 included / 0 opaque declarations.

**authority:** Payer user signs; init mint is signer-enforced by framework; mint authority and curve are canonical Pump PDAs.

**accounts:** Token/ATA/Metaplex identities fixed; metadata PDA binds mint. New curve and ATA initialized with typed ownership.

**cpi:** Explicit Metaplex instruction data begins 33; metas include duplicated mint authority with distinct flags; token mint_to then mint authority revocation. No extra Metaplex probe performed.

**arithmetic:** Global supply/reserves copied without revalidating configured reserve economics.

**serialization:** Metadata strings Borsh-serialized; fixed suffix and zero fees; derived CreateEvent and BondingCurve field writes. External Metaplex validation is not restated as local validation.

**ordering:** Framework initialization precedes nonzero creator check; metadata CPI, minting, revocation then curve stores and event.

**limits:** Historical lifecycle/config and full metadata ABI not re-proven; bounded original comparisons do not close them.

| Function | Lines | Disposition |
|---|---:|---|
| id | 6-6 | manually-inspected-bounded-static |
| execute | 31-43 | manually-inspected-bounded-static |

## programs/pump/src/create_v2.rs

SHA-256 `603e907d858ff3aa00e5e4f52805f22ec036255783e468454b04bceefa5609b3`; 114 lines; 3 included / 0 opaque declarations.

**authority:** Canonical mint-authority and curve; user payer signs. Mayhem addresses are constrained but the Mayhem path is fenced and not resumed.

**accounts:** Token2022 base mint; quote program must be Token/Token2022 and executable. Whitelist or canonical owned QuoteControl decides admission; nested walker may read further canonical ancestors. Quote ATA canonical and created through fixed ATA program.

**cpi:** Metadata initialize/update CPIs go to Token2022 with repeated mint/authority roles, then mint_to and revoke. Quote ATA creation occurs before later fee/string guards.

**arithmetic:** Configurable fee bounded by global maximum, no independent 10000 cap; string length caps bound rent size expression. Nested arithmetic reviewed separately.

**serialization:** CreationOptionU64 consumes partial 1-7 byte tails and defaults zero on UnexpectedEof; OptionBool next parse depends on remaining bytes. Extension TLV scanner bounds headers/payloads, terminates on zero kind; does not prove semantic validity of all accepted extensions.

**ordering:** Framework init precedes Mayhem fence; quote admission/ATA CPI precede configurable fee and name limits. Reject rollback depends on runtime.

**limits:** Ordinary ancestry is partial. Current extension scanner only inspected, no excluded extension proposal or new runtime case used.

| Function | Lines | Disposition |
|---|---:|---|
| deserialize_reader | 10-10 | manually-inspected-bounded-static |
| execute | 37-97 | manually-inspected-bounded-static |
| quote_extensions_supported | 101-113 | manually-inspected-bounded-static |

## programs/pump/src/creator_migration.rs

SHA-256 `8b555b1202bb01c9bb6e3faa8375df3d30ab6a85dfbc99ffdfb35691b8d59f35`; 29 lines; 5 included / 0 opaque declarations.

**authority:** Permissionless canonical curve-to-sharing transition; sharing owner Fees, PDA/mint and admin equals old curve creator.

**accounts:** Curve Pump-owned; no caller-selected replacement; new creator always sharing key. Event program unchecked input does not by itself prove variable target.

**cpi:** Event only; macro expansion unresolved. No new cross-program instruction constructed.

**arithmetic:** Creator-fee must be zero; no amount transfer.

**serialization:** MigratingCurve validates via DistributionCurve, preserves complete field spans, emits fixed 166-byte array with updated creator. Short-account exit capacity remains a lifecycle premise.

**ordering:** Holder immutability and fee guard before store; event before account exit.

**limits:** Sharing active status not required locally; semantics and short account reachability require original evidence.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 4-4 | manually-inspected-bounded-static |
| try_deserialize | 6-6 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 7-11 | manually-inspected-bounded-static |
| try_serialize | 13-13 | manually-inspected-bounded-static |
| execute | 26-29 | manually-inspected-bounded-static |

## programs/pump/src/distribution.rs

SHA-256 `0987e4747d5729952d2109ce7ee42842fe47f49543e9c0709fb46c6cb8f96185`; 123 lines; 9 included / 0 opaque declarations.

**authority:** Permissionless distribute uses Fees-owned canonical SharingConfig bound to mint and curve creator; active status required.

**accounts:** Remaining wallets match shareholders in order; executable and zero-share reject. V2 ATA derived per recipient/mint/program; no duplicate/share-total validation locally. Count guard accepts extras.

**cpi:** System/token transfer uses creator-vault PDA; missing V2 recipient ATAs created if flag true. Fixed ATA and TokenInterface. Positive transfer checks cannot be credited to zero legs.

**arithmetic:** Each floor(available*share_bps/10000) casts u128 to u64 without checked narrowing; safe bound needs each share<=10000. Total<=10000 and uniqueness are delegated to Fees state lifecycle. native_eligible uses ceiling of rent deficit/share.

**serialization:** Readonly compatibility curve and external sharing decoders; short unchecked sharing decoder requires caller prefix guard. Event distributed sums nominal transfers, not net receipt.

**ordering:** Native eligibility pass checks all recipients before transfers; token loop may initialize/transfer before later recipient rejection. Early effects require rollback. Eligibility false still validates rows and suppresses event.

**limits:** No proof Fees can create invalid shares or alias source/destination; no original defect established. Minimum query does not enforce active status.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 7-7 | manually-inspected-bounded-static |
| try_deserialize | 11-11 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 12-12 | manually-inspected-bounded-static |
| owner | 16-16 | manually-inspected-bounded-static |
| try_deserialize | 19-19 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 20-25 | manually-inspected-bounded-static |
| execute | 40-56 | manually-inspected-bounded-static |
| execute_v2 | 76-111 | manually-inspected-bounded-static |
| native_eligible | 113-123 | manually-inspected-bounded-static |

## programs/pump/src/extend.rs

SHA-256 `e1a4e4cac477e0e9bd9d8ebe650839aa5410e7edf084f6478c1a1f404d3800f8`; 63 lines; 1 included / 0 opaque declarations.

**authority:** Permissionless payer signs; only Pump-owned raw account accepted.

**accounts:** Four discriminators admitted; no PDA validation. This is bounded generic extension, not arbitrary content mutation.

**cpi:** System transfer pays difference of old/new rent minima even for overfunded input.

**arithmetic:** Size fixed at 166/1088/137/600 and checked rent subtraction.

**serialization:** realloc false; contents not explicitly initialized by handler; runtime initialization/resize semantics not independently proven.

**ordering:** At target or larger returns; transfer then resize then event; failure rollback required.

**limits:** Discriminator admission and owner guard alone do not prove all reachable account lifecycle safety.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 12-54 | manually-inspected-bounded-static |

## programs/pump/src/global_init.rs

SHA-256 `c5d65cd6536d9d0b18c4152617052023bc800f6a0c5652e031c33d90f1747891`; 14 lines; 1 included / 0 opaque declarations.

**authority:** First successful initializer user becomes authority; init seeds prevent reinitializing existing canonical Global.

**accounts:** Global allocated 1088; payer Signer and System Program.

**cpi:** Generated initialization only.

**arithmetic:** No reserve validation or accounting at init.

**serialization:** Sets initialized=true and authority; other fields initial defaults depend on framework.

**ordering:** Atomic init then store.

**limits:** First-writer authority is candidate behavior, not proof of original deployment takeover; deployed state/history unreviewed.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 10-14 | manually-inspected-bounded-static |

## programs/pump/src/holder_distribution.rs

SHA-256 `29ac5561bc59baddf7e962e95013053099699dafeca5b95550b219c9e1a57d04`; 47 lines; 1 included / 0 opaque declarations.

**authority:** Configured holder_reward_claim_authority signs against Global; mint only derives holder-rewards PDA.

**accounts:** Optional token source explicitly owner/mint/program checked; exactly two remaining accounts per amount. Token destination ATA canonical; native pair second entry unused.

**cpi:** Native source token close may precede System payouts; token ATAs created through fixed program and transfer_checked signs holder PDA.

**arithmetic:** Checked total; exact pair count; rent floor checked after payouts, allowing zero terminal balance.

**serialization:** Event amount is nominal sum; does not certify recipients are actual holders.

**ordering:** Late rent/total/account failures require full rollback; duplicate recipients not locally rejected.

**limits:** Authorized caller chooses allocations; fair-holder policy and aliases are external premises.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 21-47 | manually-inspected-bounded-static |

## programs/pump/src/idl_authority.rs

SHA-256 `a930baa51a270dcddb70becc6ece7edb0a93afca3e73543cd1842dc04f73cbf2`; 39 lines; 1 included / 0 opaque declarations.

**authority:** Global authority Signer; IDL canonical address; empty-seed signer PDA.

**accounts:** IDL owner System selects refund branch; otherwise Pump owner required. Authority not marked mut, so refund writability is transaction-dependent.

**cpi:** System transfer_with_seed to authority in System-owned branch; canonical program signer seeds used.

**arithmetic:** Refund entire balance; fixed resize 10240.

**serialization:** Realloc before discriminator then Anchor IdlAccount decode/update/serialize. Runtime allocation boundary differences explicitly documented.

**ordering:** System branch returns before authority-data mutation/event; Pump branch reallocation can fail before discriminator check.

**limits:** Known LiteSVM/Surfpool differences preserved in README; no new runtime assertion or patch.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 16-36 | manually-inspected-bounded-static |

## programs/pump/src/legacy_buy.rs

SHA-256 `f28885fc019ee2ff44464272fab67191f0d0616c5549b79217b7d3f64a0e0847`; 75 lines; 5 included / 0 opaque declarations.

**authority:** User Signer; canonical Global, curve, creator vault, volume and Fees config; typed token authorities.

**accounts:** Remaining v2 PDA and buyback membership checked after token output; v2 PDA only key used. Aliasing not globally denied.

**cpi:** Fixed Fees query with two readonly metas; return provider ignored, missing return unwraps. Base token output with curve signer then System user payments.

**arithmetic:** Explicit add/sub/narrow and ceiling fees; divisions rely on valid nonzero virtual reserves. Partial exact cap allows minimum bypass by design expression.

**serialization:** LegacyCurve; user volume initialized through framework but user field not set here. track flag copied into event without volume accrual logic.

**ordering:** Rent/resize first, token output before remaining-account guards, payments before curve stores/completion/events.

**limits:** Campaign behavior, return-data closure and original partial-fill semantics are unproved. No incentive bodies inspected.

| Function | Lines | Disposition |
|---|---:|---|
| add | 34-34 | manually-inspected-bounded-static |
| sub | 35-35 | manually-inspected-bounded-static |
| narrow | 36-36 | manually-inspected-bounded-static |
| execute | 37-74 | manually-inspected-bounded-static |
| ceil_fee | 75-75 | manually-inspected-bounded-static |

## programs/pump/src/legacy_sell.rs

SHA-256 `7078d27b768f0bd678d1463772a2177d5e092cebcbe4372c1711b5856574224b`; 73 lines; 14 included / 0 opaque declarations.

**authority:** User Signer with typed user token authority; canonical curve and fee config, typed Fees program.

**accounts:** LegacyCurve owner/discriminator and compatibility fields; cashback accumulator has canonical key/Pump owner/minimum length, but no separate discriminator check in that raw branch. Fee recipients from Global.

**cpi:** Fixed Fees query; return provider ignored. Token input before remaining v2/buyback checks; lamports then credited to selected recipients.

**arithmetic:** u64 helpers checked; cap denominator needs nonzero reserve; ceil fee products of two u64 plus 9999 fit u128. Buyback sub rejects excessive allocation.

**serialization:** LegacyCurve preserves serialized prefix length until resize; LegacyFeeConfig full decode even for nominally legacy state.

**ordering:** Resize/rent first; transfer before remaining-account validation; cashback raw field write before final curve stores/events.

**limits:** Account reachability, same-account roles and extension actual net input not proven; excluded sell_v2 untouched.

| Function | Lines | Disposition |
|---|---:|---|
| deref | 8-8 | manually-inspected-bounded-static |
| deref_mut | 9-9 | manually-inspected-bounded-static |
| owner | 10-10 | manually-inspected-bounded-static |
| try_deserialize | 11-11 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 11-11 | manually-inspected-bounded-static |
| try_serialize | 12-12 | manually-inspected-bounded-static |
| owner | 14-14 | manually-inspected-bounded-static |
| try_deserialize | 16-16 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 16-16 | manually-inspected-bounded-static |
| id | 18-18 | manually-inspected-bounded-static |
| add | 44-44 | manually-inspected-bounded-static |
| sub | 45-45 | manually-inspected-bounded-static |
| narrow | 46-46 | manually-inspected-bounded-static |
| execute | 47-73 | manually-inspected-bounded-static |

## programs/pump/src/lib.rs

SHA-256 `0634b73caafc19ce163f9ec464de7338bd7075f538d6198c67e9f68a00598281`; 497 lines; 53 included / 1 opaque declarations.

**authority:** AdminGlobal/AdminReadonly/UpdateGlobalAuthority bind canonical Global to its authority Signer; close requires the user Signer; permissionless collect and init bind destination/user to vault or accumulator seeds. See lines 164-171,436-450,464-493.

**accounts:** Global mutable only in setters; reserved recipients are nonzero, nonexecutable and rent-exempt but not distinct/sorted; new authority allows zero/self. No generic alias exclusion. Configuration role policy is an external premise.

**cpi:** Wrappers forward to named modules. Collection uses canonical System program and creator-vault signer; events use event_cpi. Generated dispatch/context/event code is not reviewed machine code.

**arithmetic:** Buyback rate capped at 10000; creator maximum and reserve setters accept full u64 and depth full u8. Collection saturates rent deficit. Downstream arithmetic assumptions are not proved by setters.

**serialization:** Global field ordering and UserVolumeAccumulator are derives. Optional boolean defaults false only on no input; invalid byte errors. BuyV3 discards the decoded partial_fill at line 100.

**ordering:** Setter validations precede stores; state writes precede event CPI. Close occurs via generated account exit after event. Runtime rollback remains necessary for late errors.

**limits:** Excluded sell_v2 forwarding span is opaque; two stopped incentive handlers and set_mayhem_virtual_params have no fn declaration in this source. Error 6110 is shared numerically by the local fence and recovered error; names distinguish them.

| Function | Lines | Disposition |
|---|---:|---|
| multi_hop_curve_swap | 63-63 | manually-inspected-bounded-static |
| initialize_quote_control | 64-64 | manually-inspected-bounded-static |
| set_quote_control_admin | 65-65 | manually-inspected-bounded-static |
| set_quote_control_reserves_admin | 66-66 | manually-inspected-bounded-static |
| add_quote_control_mint | 67-67 | manually-inspected-bounded-static |
| remove_quote_control_mint | 68-68 | manually-inspected-bounded-static |
| set_quote_control_mint_reserves | 69-69 | manually-inspected-bounded-static |
| distribute_fee_to_holders | 70-70 | manually-inspected-bounded-static |
| buy | 71-71 | manually-inspected-bounded-static |
| buy_exact_sol_in | 72-72 | manually-inspected-bounded-static |
| migrate_v2 | 73-73 | manually-inspected-bounded-static |
| claim_cashback | 74-74 | manually-inspected-bounded-static |
| claim_cashback_v2 | 75-75 | manually-inspected-bounded-static |
| buy_v2 | 76-76 | manually-inspected-bounded-static |
| buy_exact_quote_in_v2 | 77-77 | manually-inspected-bounded-static |
| initialize | 78-78 | manually-inspected-bounded-static |
| migrate | 79-79 | manually-inspected-bounded-static |
| sell_v2 | 80-80 | excluded-metadata-only |
| sell | 81-81 | manually-inspected-bounded-static |
| create_v2 | 82-82 | manually-inspected-bounded-static |
| buy_exact_quote_in_v3 | 83-83 | manually-inspected-bounded-static |
| create | 84-84 | manually-inspected-bounded-static |
| admin_set_idl_authority | 85-85 | manually-inspected-bounded-static |
| set_creator | 86-86 | manually-inspected-bounded-static |
| set_metaplex_creator | 87-87 | manually-inspected-bounded-static |
| set_params | 88-88 | manually-inspected-bounded-static |
| migrate_bonding_curve_creator | 89-89 | manually-inspected-bounded-static |
| admin_cto | 90-90 | manually-inspected-bounded-static |
| sweep_creator_fee | 91-91 | manually-inspected-bounded-static |
| sweep_protocol_fee | 92-92 | manually-inspected-bounded-static |
| sync_user_volume_accumulator | 93-93 | manually-inspected-bounded-static |
| extend_account | 94-94 | manually-inspected-bounded-static |
| collect_creator_fee_v2 | 95-95 | manually-inspected-bounded-static |
| distribute_creator_fees | 96-96 | manually-inspected-bounded-static |
| distribute_creator_fees_v2 | 97-97 | manually-inspected-bounded-static |
| get_minimum_distributable_fee | 98-98 | manually-inspected-bounded-static |
| buy_v3 | 100-100 | manually-inspected-bounded-static |
| add_quote_mint | 101-105 | manually-inspected-bounded-static |
| remove_quote_mint | 106-109 | manually-inspected-bounded-static |
| collect_creator_fee | 110-117 | manually-inspected-bounded-static |
| init_user_volume_accumulator | 118-120 | manually-inspected-bounded-static |
| close_user_volume_accumulator | 121-123 | manually-inspected-bounded-static |
| update_global_authority | 124-127 | manually-inspected-bounded-static |
| set_reserved_fee_recipients | 128-134 | manually-inspected-bounded-static |
| set_virtual_quote_reserves | 135-135 | manually-inspected-bounded-static |
| update_buyback_config | 136-136 | manually-inspected-bounded-static |
| update_creator_fee_config | 137-140 | manually-inspected-bounded-static |
| update_holder_reward_config | 141-141 | manually-inspected-bounded-static |
| sell_v3 | 142-142 | manually-inspected-bounded-static |
| toggle_create_v2 | 143-147 | manually-inspected-bounded-static |
| toggle_mayhem_mode | 148-152 | manually-inspected-bounded-static |
| toggle_cashback_enabled | 153-157 | manually-inspected-bounded-static |
| set_max_curve_depth | 158-161 | manually-inspected-bounded-static |
| deserialize_reader | 427-429 | manually-inspected-bounded-static |

## programs/pump/src/migrate.rs

SHA-256 `b9e3dd278c84b413f8d6a823a6a95af516816e4b40c2d9e157d4f1bef71fe99f`; 72 lines; 4 included / 0 opaque declarations.

**authority:** User signs funding; withdraw_authority only equals Global destination, not a required signer; canonical pool-authority signs AMM.

**accounts:** Canonical pool/config/ATA/LP addresses and fixed programs; complete curve required; zero four-reserve range returns migrated. enable_migrate not read by handler.

**cpi:** Explicit tuple builder forwards signer/writable flags, appends program account. Creates ATAs, transfers base, wraps quote, creates pool, initializes boost, burns/closes LP and drains pool PDA to withdrawal destination.

**arithmetic:** Checked lamport debit/credit but helper reads both balances before stores (alias precondition). Amount helper slices 64..72 relying on prior real ATA/AMM creation; quote subtract fee checked.

**serialization:** Raw copied curve retains suffix, zeroes reserve bytes 8..40 on success; DistributionCurve exit no-op.

**ordering:** Funding/ATA/token/pool calls precede remaining boost-account check. Full rollback needed. Old native rent top-up uses entire rent minimum, unlike v2 deficit.

**limits:** Migration enable flag, alias exclusions and complete AMM call ABI need original/lifecycle proof. No original mismatch confirmed.

| Function | Lines | Disposition |
|---|---:|---|
| call | 43-43 | manually-inspected-bounded-static |
| move_lamports | 44-44 | manually-inspected-bounded-static |
| amount | 45-45 | manually-inspected-bounded-static |
| execute | 46-71 | manually-inspected-bounded-static |

## programs/pump/src/migrate_v2.rs

SHA-256 `0e0be1e808ef796287fcd6a8631297e1c51e6d79663d42b21b9f7fbf22ceb522`; 91 lines; 6 included / 0 opaque declarations.

**authority:** User funding Signer; Global-bound withdrawal destination; canonical Pump pool PDA signs AMM.

**accounts:** Base ATA typed, quote ATA seed-bound, pool/LP/temp addresses canonical. TokenInterface targets fixed to admitted token family; runtime ownership per leg not all local.

**cpi:** ATA/token/AMM flow; quote delta reloaded after transfer; optional transfer-fee harvest before close. Event instruction explicitly fixed crate::ID even though supplied program account is unchecked.

**arithmetic:** Checked deficits/fees/quote delta; base amount uses actual temporary balance. Lamport alias helper reads both prestates; amount slices depend on successful account creation.

**serialization:** Raw curve copied and reserve bytes cleared; extension list chooses required account size/ImmutableOwner. No speculative extension variant added.

**ordering:** Pool CPI before boost remaining accounts, mint writability for harvest late, closes before final stores/events. Transaction rollback indispensable.

**limits:** enable_migrate not read locally. Dependency/lifecycle/alias equivalence unresolved, unchanged original evidence not sufficient for a correction.

| Function | Lines | Disposition |
|---|---:|---|
| call | 48-48 | manually-inspected-bounded-static |
| move_lamports | 49-49 | manually-inspected-bounded-static |
| quote_extensions | 50-50 | manually-inspected-bounded-static |
| quote_account_size | 51-51 | manually-inspected-bounded-static |
| amount | 52-52 | manually-inspected-bounded-static |
| execute | 53-84 | manually-inspected-bounded-static |

## programs/pump/src/minimum.rs

SHA-256 `ebc8f6f1a2c5aaa00211473cbd68ac1e006a0a80cbdba611046b10f8932c8631`; 27 lines; 1 included / 0 opaque declarations.

**authority:** Readonly permissionless query; canonical Fees sharing and Pump curve/vault, mint match.

**accounts:** Exact ordered wallet prefix checked, executable and zero shares rejected; extras allowed; active sharing status not checked.

**cpi:** No transfer; log event and returned event.

**arithmetic:** ceil(deficit*10000/share), max over recipients, checked narrow and reserve addition. Empty shares yields required zero; validity delegated to Fees.

**serialization:** Event can_distribute reflects rent threshold only, not all transfer preconditions/status.

**ordering:** Validation before return; no mutation.

**limits:** Do not treat positive query as certification actual distribution can succeed.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 14-27 | manually-inspected-bounded-static |

## programs/pump/src/multi_hop_curve.rs

SHA-256 `8fe8da5a3bc2f57d30054d2fe1ee5656ca518b3fbfa84e5be046e05f300c0fe2`; 414 lines; 21 included / 0 opaque declarations.

**authority:** AMM canonical global_config must be Signer; user/source_authority also sign. Does not bypass genuine PDA signing. Caller AMM authorization is a cross-program premise.

**accounts:** Five accounts per hop, fee count/flags validated; curve/quote relation canonical; Tokenkeg size fences. Quote vault address then owner/mint. Buyback positive flag preflight owner/mint/authority membership/ATA before input.

**cpi:** Fixed Tokenkeg transfers, System transfers, fixed self event CPI and SyncNative. route_input skips transfer if same vault; curve signer bound to previous base. Final destination mint checked only after loop.

**arithmetic:** Checked u64 operations/narrow/div; selector evaluates fees before masks. Budget correction not used as net amount; buyback asserts bounds. Cannot sum mixed-quote buyback values as one economic unit without route premise.

**serialization:** Per-hop h.exit before next hop; events before exit. RouteFeeConfig decodes all fields, then selection depends on length. Readonly serializer no-op. Same-account paths require full dynamic account graph, not just function coverage.

**ordering:** prepare_curve rent transfer precedes completion/mode guards. Input before stores, output before fee accrual, buyback before native final payout. End mint mismatch must roll back all earlier hops.

**limits:** Noncompleting ordinary routes only; native interior endpoints, repeated curves, extension routes, holder/Mayhem/cashback and short allocations not certified. Header is historical proposal wording despite accepted checkpoint source binding.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 46-46 | manually-inspected-bounded-static |
| try_deserialize | 49-55 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 56-60 | manually-inspected-bounded-static |
| add | 62-62 | manually-inspected-bounded-static |
| sub | 63-63 | manually-inspected-bounded-static |
| n | 64-64 | manually-inspected-bounded-static |
| div | 65-67 | manually-inspected-bounded-static |
| fee | 68-68 | manually-inspected-bounded-static |
| tier | 71-76 | manually-inspected-bounded-static |
| select_fees | 78-99 | manually-inspected-bounded-static |
| buy_budget | 102-115 | manually-inspected-bounded-static |
| checked_transfer | 118-125 | manually-inspected-bounded-static |
| route_input | 132-144 | manually-inspected-bounded-static |
| admit_vaults | 147-167 | manually-inspected-bounded-static |
| preflight_buyback_recipient | 171-192 | manually-inspected-bounded-static |
| system_transfer | 195-199 | manually-inspected-bounded-static |
| prepare_curve | 200-215 | manually-inspected-bounded-static |
| move_lamports | 216-226 | manually-inspected-bounded-static |
| native_buyback | 227-242 | manually-inspected-bounded-static |
| route_event | 243-254 | manually-inspected-bounded-static |
| execute | 257-408 | manually-inspected-bounded-static |

## programs/pump/src/nested_create.rs

SHA-256 `fa9b27bcd090e2f41e566263ea13c9e9a4e2b9c401b6dc6eda32881a92b693b3`; 230 lines; 14 included / 0 opaque declarations.

**authority:** Read-only helper called after CreateV2 canonical owned QuoteControl check; ancestors Pump-owned and derived per mint.

**accounts:** Depth starts from first ancestor stored depth+1 capped by min(global,5). Later ancestors not checked for positional depth, repeated eligibility or exact tail. Migrated Pool PDA/AMM owner/discriminator; vault keys loaded from Pool; token owners/state checked but token mint/authority fields not repeated.

**cpi:** None; read-only pricing over account snapshots. Trust in AMM-owned state construction is required.

**arithmetic:** Checked pool adjustment i128 and nonnegative guard; denominator/numerator arithmetic mostly checked; u64 product bounds justify floor+1 in convert. Reverse composition/narrow and nonzero derived reserves enforced.

**serialization:** 49-byte minimum curve compatibility decode, complete-field thresholds; depth and final three u64 values read only at full 166 bytes. Control count u32 => 108+40*n fits 64-bit usize. Raw offset helpers caller-guarded.

**ordering:** Borrow Pool and both vaults before key/owner checks; first depth/mode checked before traversal; conversion after read-only walk.

**limits:** Absence of later eligibility guards may be inherited behavior; no original exploit/defect inferred. Need captured original contract and reachable canonical graph for any change.

| Function | Lines | Disposition |
|---|---:|---|
| overflow | 19-19 | manually-inspected-bounded-static |
| u64_at | 20-22 | manually-inspected-bounded-static |
| key_at | 23-25 | manually-inspected-bounded-static |
| decode_curve | 29-73 | manually-inspected-bounded-static |
| read | 35-37 | manually-inspected-bounded-static |
| ancestor | 75-81 | manually-inspected-bounded-static |
| control_entry | 83-94 | manually-inspected-bounded-static |
| root_seed | 96-103 | manually-inspected-bounded-static |
| vault_amount | 105-113 | manually-inspected-bounded-static |
| pool_record | 115-143 | manually-inspected-bounded-static |
| walk | 145-186 | manually-inspected-bounded-static |
| constant_product | 188-194 | manually-inspected-bounded-static |
| convert | 196-215 | manually-inspected-bounded-static |
| price | 217-230 | manually-inspected-bounded-static |

## programs/pump/src/quote_control/initialize_quote_control.rs

SHA-256 `f69183651495574b85e572aafd23ab768fdf3072a0d4c7e05da6ca51715b9136`; 31 lines; 1 included / 0 opaque declarations.

**authority:** Permissionless canonical init; does not appoint initializer admin. Global authority later assigns roles.

**accounts:** User payer Signer; QuoteControl PDA owner/space via framework.

**cpi:** Generated System initialization only.

**arithmetic:** Fixed initial capacity 50 entries.

**serialization:** Two zero role keys, reserved zeros and empty vec; layout 108-byte header + entries.

**ordering:** Init then deterministic fields.

**limits:** Initialization availability/history not audited; no admin takeover conclusion.

| Function | Lines | Disposition |
|---|---:|---|
| initialize_quote_control | 24-31 | manually-inspected-bounded-static |

## programs/pump/src/quote_control/mod.rs

SHA-256 `c1a355d9ed55a4b69224ddd3ddc703b2dd7608bc8aa0bbde830d88a6a61a8120`; 7 lines; 0 included / 0 opaque declarations.

**authority:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**accounts:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**cpi:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**arithmetic:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**serialization:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**ordering:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

**limits:** Module wiring only: three public modules and reexports; no declared functions or account contexts.

| Function | Lines | Disposition |
|---|---:|---|

## programs/pump/src/quote_control/state.rs

SHA-256 `98df5c28a3c0006fcdef4f3cb0c3529ad0aca6393fe8b99852f12abc502d5213`; 119 lines; 7 included / 0 opaque declarations.

**authority:** Role predicates pure key equality; signer requirement is supplied by calling contexts.

**accounts:** Mint admission rejects default and both native mints, duplicate and count>=256. No mint account parsed here; state is administrative key list.

**cpi:** None.

**arithmetic:** space checked multiply/add. Reserves accept u64 including zero.

**serialization:** QuoteControl derived vector with initial capacity annotation, not a runtime 50-entry maximum. Remove does not shrink allocation.

**ordering:** Validate before mutation; missing mint fails; reserve returns old value.

**limits:** Economic validity of reserve settings and downstream quote behavior not guaranteed by administrative admission.

| Function | Lines | Disposition |
|---|---:|---|
| is_admin | 35-37 | manually-inspected-bounded-static |
| is_reserves_admin | 39-41 | manually-inspected-bounded-static |
| contains | 43-45 | manually-inspected-bounded-static |
| space | 48-53 | manually-inspected-bounded-static |
| validate_new_mint | 61-88 | manually-inspected-bounded-static |
| remove_mint | 91-102 | manually-inspected-bounded-static |
| set_mint_reserves | 108-118 | manually-inspected-bounded-static |

## programs/pump/src/quote_control/update_quote_control_mints.rs

SHA-256 `93140eca968e6753b64ab19b0fc66dbfe4e89d777690392377ff3a5f94e62945`; 241 lines; 5 included / 0 opaque declarations.

**authority:** Global or list admin changes list/reserves-admin; Global alone assigns admin; reserves writes additionally allow reserves-admin. All require Signer.

**accounts:** Global and QuoteControl canonical typed accounts; mutable roles/payer only as needed.

**cpi:** Fixed System rent top-up in list growth; events through event_cpi.

**arithmetic:** Checked length and space; deficit subtraction under greater-than guard. Per-call growth one 40-byte entry.

**serialization:** Append/remove and role/reserve stores; no new bytes interpreted before write/exit.

**ordering:** Validation, rent, resize, push, event; failure rollback required. Remove leaves allocated capacity.

**limits:** Zero/self admin rotations and zero reserves permitted; policy and original complete context behavior remain external.

| Function | Lines | Disposition |
|---|---:|---|
| add_quote_control_mint | 59-107 | manually-inspected-bounded-static |
| remove_quote_control_mint | 109-121 | manually-inspected-bounded-static |
| set_quote_control_mint_reserves | 140-158 | manually-inspected-bounded-static |
| set_quote_control_admin | 182-196 | manually-inspected-bounded-static |
| set_quote_control_reserves_admin | 224-241 | manually-inspected-bounded-static |

## programs/pump/src/sell_v2.rs

SHA-256 `a81d214a3153ccc0976194e1e4609a63ecfddd095113d5818ff729fb187bc033`; 99 lines; 0 included / 5 opaque declarations.

**authority:** Excluded file opaque; metadata-only. No conclusions.

**accounts:** Excluded file opaque; metadata-only. No conclusions.

**cpi:** Excluded file opaque; metadata-only. No conclusions.

**arithmetic:** Excluded file opaque; metadata-only. No conclusions.

**serialization:** Excluded file opaque; metadata-only. No conclusions.

**ordering:** Excluded file opaque; metadata-only. No conclusions.

**limits:** Excluded file opaque; metadata-only. No conclusions.

| Function | Lines | Disposition |
|---|---:|---|
| add | 49-49 | excluded-metadata-only |
| sub | 50-50 | excluded-metadata-only |
| narrow | 51-51 | excluded-metadata-only |
| execute | 52-97 | excluded-metadata-only |
| check_token | 99-99 | excluded-metadata-only |

## programs/pump/src/set_creator.rs

SHA-256 `3e05a3ec321fa267fe1124e9ff18f65e07f39fdc45ee70ee5649f57b15738443`; 37 lines; 9 included / 0 opaque declarations.

**authority:** Privileged set binds Global role Signer; permissionless sync uses canonical Metaplex metadata. Both only change zero creator.

**accounts:** Pump curve PDA/mint and metadata PDA/Metaplex owner; first metadata creator taken without verified/share checks.

**cpi:** Events only.

**arithmetic:** cs[0] panics if Some(empty); no local length guard. Need authentic reachable metadata state and original behavior before finding.

**serialization:** Metadata prefix key=4 and Borsh fields decoded, tail ignored. SetterCurve expands to 166 and writes whole raw vector; short account exit may error.

**ordering:** Nonzero current creator returns before candidate update, but context metadata decode already occurred. Store before event/exit.

**limits:** No speculative Metaplex probe. Canonical metadata validity and omitted full fields remain dependency premises.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 4-4 | manually-inspected-bounded-static |
| try_deserialize | 5-5 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 5-5 | manually-inspected-bounded-static |
| try_serialize | 6-6 | manually-inspected-bounded-static |
| owner | 10-10 | manually-inspected-bounded-static |
| try_deserialize | 13-13 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 14-18 | manually-inspected-bounded-static |
| set | 36-36 | manually-inspected-bounded-static |
| sync | 37-37 | manually-inspected-bounded-static |

## programs/pump/src/set_params.rs

SHA-256 `43beba987f5347ea646fe4ebf3a48aede7ce71a7f77bcb0167d0beabe0aaaa0e`; 39 lines; 1 included / 0 opaque declarations.

**authority:** Canonical mutable Global has_one authority Signer.

**accounts:** Eight ordered nonzero rent-exempt recipient keys; strict sort enforces distinctness. No local executable guard here (unlike reserved setter). Extras ignored.

**cpi:** Events only.

**arithmetic:** real<total, virtual>real ensure denominator positive; u64 product fits u128; resulting subtraction nonnegative. Fee/creator <=1000; migration fee<derived final reserve. Final narrow checked.

**serialization:** Updates explicit fields only; other Global values retained.

**ordering:** All checks before Global writes, then event CPI.

**limits:** Configuration migration effects on existing curves and downstream recipient compatibility not proven.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 12-39 | manually-inspected-bounded-static |

## programs/pump/src/sweep.rs

SHA-256 `5d88bb58cc4d0818a1252da424e4cfa196d82caf43728646e4548dbad52e3167`; 64 lines; 8 included / 0 opaque declarations.

**authority:** Permissionless payer; native/token recipients constrained to creator-vault PDA or selected Global normal/reserved member.

**accounts:** Curve canonical/Pump owner; raw offsets padded decoder. Quote ATA seeds, quote mint relation. Token owner accepts family then transfer enforces actual program.

**cpi:** System rent top-up, optional ATA create and token transfer with curve signer; native uses lamports directly.

**arithmetic:** Checked fee sum, saturating rent availability; amount exact selected bucket; other bucket preserved. Normal fee lookup uses binary search, assumes sorted array.

**serialization:** SweepCurve zero-defaults incomplete field groups, extends vector to >=166; after transfer zeros exactly one fee field.

**ordering:** Rent/resize before recipient authorization; zero amount returns after guards; positive transfer before bucket clear/event.

**limits:** Global setters establish ordinary sort but historical/state transitions not fully proven. Alias effects and token extensions need original plus lifecycle evidence.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 4-4 | manually-inspected-bounded-static |
| try_serialize | 5-5 | manually-inspected-bounded-static |
| try_deserialize | 7-7 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 8-14 | manually-inspected-bounded-static |
| field_key | 17-17 | manually-inspected-bounded-static |
| number | 18-18 | manually-inspected-bounded-static |
| execute | 40-62 | manually-inspected-bounded-static |
| classic_search | 64-64 | manually-inspected-bounded-static |

## programs/pump/src/trade.rs

SHA-256 `0616cdb05fa3531ea841b33c59996020d0109e8c85e8255d89907f5a5b723647`; 318 lines; 11 included / 0 opaque declarations.

**authority:** User Signer; curve/base vault and user token authority typed; FeeConfig canonical and Fees owner. SOL buyback membership checked; USDC recipient authority member and canonical ATA.

**accounts:** V3 explicit SOL/default/USDC domain fence; unchecked volume accumulator PDA not decoded/updated. USDC vault mint/owner/address checked, actual authority relies partly on canonical lifecycle/token CPI.

**cpi:** TokenInterface checked transfers; fixed System payment; no Fees CPI (local selector). Token balances not reloaded to measure extension net transfer.

**arithmetic:** u64 checked helper paths; some cap/completion divisions use raw / relying on reserve validity. Nonempty tier guard precedes selected indexing. Exact-quote splits first/post-completion fees and uses actual base vault balance for crossing.

**serialization:** read_config length-gates stable/exotic fields; buy_exact_quote instead fully deserializes all fields then min-length guard. Event tail zero; post-complete event distinct. No proof unified decoder substitution is safe.

**ordering:** Token input/output before quote settlement; stores after transfers; post-event arithmetic may fail after stores and needs rollback. BuyV3 wrapper ignores partial input.

**limits:** Partial source retained. No unintegrated v3 extension code or upcoming Buy proposal read; current behavior alone cannot establish original mismatch.

| Function | Lines | Disposition |
|---|---:|---|
| add | 42-42 | manually-inspected-bounded-static |
| sub | 43-43 | manually-inspected-bounded-static |
| narrow | 44-44 | manually-inspected-bounded-static |
| fee | 45-45 | manually-inspected-bounded-static |
| selected | 46-50 | manually-inspected-bounded-static |
| sell | 51-112 | manually-inspected-bounded-static |
| buy | 114-181 | manually-inspected-bounded-static |
| buy_exact_quote | 183-276 | manually-inspected-bounded-static |
| read_config | 278-291 | manually-inspected-bounded-static |
| check_quote | 294-314 | manually-inspected-bounded-static |
| net_quote | 316-316 | manually-inspected-bounded-static |

## programs/pump/src/trade_types.rs

SHA-256 `49ab3f4dd75c2703157caaed925d7410c90dfeeecb4b55b5b24ae0335cbb44b5`; 122 lines; 4 included / 0 opaque declarations.

**authority:** BondingCurve Owner returns crate::ID; account wrappers enforce it.

**accounts:** try_deserialize checks eight-byte discriminator. unchecked decoder assumes prefix exists; direct short callers would panic, not independently exposed here.

**cpi:** No direct CPI; shared serialized events consumed by emit paths.

**arithmetic:** No numeric computation.

**serialization:** Explicit discriminator and Borsh writer propagate IO errors; exact field order retained. Prior normalized serializer/immediate-target evidence reported separately from raw equality.

**ordering:** Discriminator written before body; write failure propagates; caller runtime rollback required.

**limits:** No macro/complete historical layout proof, and full artifact remains unequal. Body matches do not prove all transitive data.

| Function | Lines | Disposition |
|---|---:|---|
| owner | 28-28 | manually-inspected-bounded-static |
| try_serialize | 31-35 | manually-inspected-bounded-static |
| try_deserialize | 38-47 | manually-inspected-bounded-static |
| try_deserialize_unchecked | 48-52 | manually-inspected-bounded-static |

## programs/pump/src/volume_sync.rs

SHA-256 `309ef3db60b5cdf76e08b39eb73c0e33d146a9bb85a08bd4053217901a5026ad`; 43 lines; 1 included / 0 opaque declarations.

**authority:** Permissionless sync for canonical user accumulator; GlobalVolume and UserVolume Pump-owned typed PDAs.

**accounts:** User key only derives PDA; no arbitrary accumulator. Incentives bodies excluded.

**cpi:** Event only if prior claimed>0.

**arithmetic:** Signed timestamp comparisons, no day division. Zeroes only claimed fields before campaign starts if last update also pre-start.

**serialization:** GlobalVolume arrays and UserVolume derived; other fields untouched.

**ordering:** Clear then conditional event.

**limits:** Campaign reachability and economic claim eligibility not audited; no stop-lane inference.

| Function | Lines | Disposition |
|---|---:|---|
| execute | 21-35 | manually-inspected-bounded-static |

