# Collector candidate emitted review

**PASS for the bounded source-to-emitted sequence review, with all identity and semantic limits below retained.** This is an independent review of the single saved candidate, not another build or execution. The raw four-command analysis outputs and the frozen plan stayed unchanged. No original ELF was opened, no new original body or callee was decoded, no target/VM/compiler/runtime ran, and no source or artifact was selected.

The candidate is `6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e`, 1,589,176 bytes; its symbol artifact is `f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86`. All37 source inputs hash to the proposed set, CTO `5499f2b1`. The root launch receipt records the admitted static-analysis plan `aa5756b2` and separate cache acceptance `f491c336`. This review does not overwrite the build's terminal `requires-cache-review` receipt or invent inner compiler/strip child exits.

## Actual collector boundary and branches

The compiler emitted a separate `collect_wallet_creator_fee` body at **469552–474592**, 5,040 bytes. It takes a return-area pointer in r1, the AdminCto set in r2 and seeds in r3. At469576 it loads the recipient from context+64;469584 loads its owner pointer at+24. The 32-byte candidate Fees constant at1468936 independently decodes to the configured `pfeeUx…` key. The memcmp at469616 is followed by469640 equal→469712. That branch constructs the existing named6050 through PumpError::name469744 and Display469888, stores6050 at470104, converts the owning AnchorError at470176, writes its payload and error tag2 at470200–470216, then returns470224. The formatter failure branch469896 falls to the existing unwrap_failed call469976. No custom integer-only error substitute was introduced.

For a non-Fees owner,469648 reads recipient executable+42.469656 zero→470232 continues; executable fallthrough logs the exact60-byte diagnostic through relocated `sol_log_` at469688, writes tag0 at469696 and returns470224. The fresh quote-key path starts470232, copying the actual quote mint key through context+24/+88. The memcmp470368 uses the exact32-byte native mint at1469448.469640/469656/470392 therefore implement **owner Fees error before executable None before actual quote comparison**. This has the same bounded order as the already admitted original177296 text control (owner177368; executable177672; actual quote178264), without asserting byte, generic-ABI or natural source-origin equality.

The new candidate error origin is explicitly different: path `src/admin_cto.rs`, length16, line174 at470120, versus the admitted original's48-byte collector source path and line198 at177872–177880. The 6050 enum/message is the existing authenticated source item; its complete name/Display callee implementations are not newly expanded by this review.

| Actual path | Emitted trace and result |
| --- | --- |
| Native dispatch |470392 equal→470904; Rent::get470920. Success tag test470984→473608; failure converts ProgramError471024 and returns owning error through470200 |
| Native available amount | Source creator-vault lamports473680; Rent::minimum_balance(0)473728.473744–473800 implement saturating subtraction and positive-amount selection. Source≤rent goes473800→474392, logs exact25-byte zero diagnostic via474448, then returns None |
| Recipient rent | Recipient lamports473816;473840 addition,473856/473880 choose max-u64 on overflow; recipient data_len473904; minimum_balance(data_len)473936. Unsigned recipient-post-balance<required at473944→474424 logs exact60-byte rent diagnostic via474448 and returns None |
| Native payout | Eligible branch prepares account clones473976/474016/474048 and seed slice; system_program::transfer474216.474232 success-tag2→474248 returns Some with amount and all-zero quote key through474464. Failure474240→474560 returns error tag2 |
| Token raw amount | Non-native branch470400 creates temporary account clones; borrow_data470712 then TokenAccount::try_deserialize_unchecked470832.470856 tag2 goes473408 to release the borrow and return owning error; successful unpack releases the borrow470872–470888, then joins471160. Borrow failure470760→471056 converts the ProgramError471112, with owning-error/borrow cleanup dispatch471144/471152 |
| Token zero | After account-clone cleanup471160–471280, amount zero471288→474296 logs exact25-byte zero diagnostic474320 and returns None |
| Token payout | Positive amount prepares account-info clones and transfer context471296–473272, then transfer_checked473280.473296 error→474344 returns tag2. Success copies actual quote mint473304–473376, sets Some tag1, joins474464 with amount and quote tuple |

The standalone `token_raw_amount` symbol is absent. Its borrow/unpack/raw-amount/drop sequence is **inlined in this collector**; there is no helper call or frozen-state branch between unpack success and the zero/transfer choice. The existing source V/frozen gate remains in the caller. Name disappearance is not evidence that its functionality disappeared, and inlining does not prove equivalence to an original generic helper ABI.

All complete helper branch records are retained in `candidate-cfg-anchors.json`. Its other repeated conditions are account-info reference-count increments/decrements, shared zero-count cleanup tails and clone-overflow exits to the relocated `abort` at470480. Native transfer preparation names AccountInfo::clone and memcpy; token preparation contains its corresponding inlined clone bookkeeping. These finite local traces do not close allocation/abort/drop behavior of every transitive callee. The helper has four relocated external calls (three log sites and one abort) and no recorded indirect call; no callee body was expanded beyond the existing candidate allowlist.

## Actual caller sequence

The existing ordinary-wallet eligibility tests are visible at448744 (holder exclusion),448856 (zero creator exclusion),448872/448880 (executable exclusion),448896/448920/448952 (System owner comparison), then writable448960/448968. The sole early6092 construction remains449112 with owning AnchorError conversion449152.6019 remains446352 and6091 remains444352. The helper's repeated owner/executable guards do not establish that those errors become reachable inside this already restricted ordinary-wallet domain.

At456984 the caller makes its own native quote comparison. It reads AMM account presence457008. Native457032→457128 sets V=true; non-native checks vault-token presence457056 and frozen state on the saved path459384→459448→459616 before forming V. AMM frozen state is checked457224 before the ATA prelude, producing its independent collectible flag at457400–457416. No claimed helper-level frozen recheck is inserted after the raw amount load.

The ordinary ATA call is uniquely at**457784**. Native with absent AMM skips directly through457152→457840; non-native or present AMM enters the ATA preparation. ATA error457800→464288 returns the owning error. After successful ATA,457808/457824 uses V to call the helper at**457880**, or457832→464432 bypasses it. The passed account set is the existing r7 and the same seed slice is built at457856–457864.

Helper tag2 at457912 goes to the caller error tail447384. Tag1 at457968→457984 alone enters Clock::get**458000**, collection-event data458336/log_data458400, then CPI event data458504/invoke_signed459144. Tag0 bypasses Clock and both collection events via457976→464432. Event success returns to the same independent AMM collectible gate459320–459368. That gate is read at464432–464480; false skips to456512 and true enters464496 onward. Thus the actual local order is **E/VA flags → one ATA prelude → V-gated helper → Some-only Clock/events → independent AMM continuation**, with error exits at the recorded real destinations. Later calls, AMM target behavior and complete state-side effects remain separate obligations.

## Parser and wrapper controls

`parser-wrapper-comparisons.json` compares the new complete parser and wrapper with both retained candidates71ec andd75. The parser at941320 is21,088 bytes with165 direct calls; the wrapper at1125416 is2,128 bytes with9. Both preserve the complete reference-method normalized hash **and complete actual named-callee sequence** against each baseline. The old controls are authenticated by their retained manifest seals21c52748 anddf2338c4. This establishes this bounded emitted structural preservation; it does not close original parser header/alias behavior or all callees and data extents. The execute body itself is changed; no blanket normalized or raw identity claim is made for it.

## All1,035 retained original metadata windows

The two baseline metadata joins successfully reproduced all comparable saved summary metrics, complete pair relations and call-pruning rounds. No original capture was reread. The new candidate has781 symbol/inferred windows. It has493 candidate windows with normalized patterns,427 with call-consistent patterns,454 original windows with a call-consistent candidate,1,462 normalized pattern pairs,1,080 call-consistent pairs,617 raw-hash-equal pairs and99 ambiguous candidate rows. Pair counts and distinct-original strongest statuses are different measures.

| Baseline comparison | Strongest original-window status transitions |
| --- | --- |
|71ec→new | All1,035 unchanged:98 raw,356 call-consistent,74 normalized,507 unmatched |
|d75→new |1,034 unchanged; original347576–347952 moves call-consistent→unmatched. It had the standalone candidate token_raw_amount relation, now lost when that body inlines |

`all1035-transitions.json` retains every row and its candidate-pair counts for both comparisons. The lost metadata relation is disclosed rather than presented as a byte-identity improvement or a demonstrated semantic regression. “Raw” here compares retained original raw SHA-256 with candidate body SHA-256; it is not a fresh direct original-byte comparison. “Call-consistent” retains the unchanged bounded fixed-point criterion, and “normalized” remains address/relocation-pattern evidence. None establishes transitive data or semantic equivalence.

Whole original byte equality remains false by the differing known file sizes. No new positional raw-difference number, original section byte comparison, near-pattern sweep or original pointee extent was computed. Shared6093 is still unimplemented. Original source origins, generic ABI, header/alias domains, complete token unpack/extensions, CPI/sysvar/system/library behavior, cleanup/OOM/indirect calls and full original byte identity remain open. No target corpus or live execution occurred in this review.
