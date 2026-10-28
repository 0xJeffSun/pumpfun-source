# Round37 + attributed CurveHop comparison order

This source-only composition applies the key-first `Pubkey` equality already published in [PR #323](https://github.com/lalalune/pumpfun-source/pull/323), pinned at `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`, to selected Round37 at `b855ede024ac3bac603405db1d874ee58e651b38`. It is not a claim of discovering that source change independently.

Only line 35 of `multi_hop_curve_swap.rs` changes. Its total length and line count remain unchanged; all other 56 workspace inputs, fallback expression, explicit error, features and lockfile are unchanged. The original comparison passes the mint key first and curve quote field second to `sol_memcmp_`. Both source evaluations are immutable, nonfailing reads of already-decoded accounts; the copied `Pubkey` has no destructor.

## Measured scope

| Separate native Linux profile | Injective normalized windows | Raw windows |
|---|---:|---:|
| Clean Round37 | 744 / 1,035 | 121 |
| Key-first composition | 745 / 1,035 | 121 |

All 744 baseline windows are retained. Compared with the clean Linux baseline, the loaded ELF changes only those three `.text` bytes; all other loaded sections and their addresses are unchanged.

The added inferred original window is CurveHop `try_accounts`, original address `0xdd700`, 3,512 bytes. Its complete normalized body matches after changing only three argument-register bytes. All 33 direct-call sites bind to same-length normalized-equal callee bodies, and all 12 direct data references match over their actual consumer extents. This is not recursive whole-program equivalence or proof of original Rust source.

**Whole-binary identity against the original: false. Runtime: NOT RUN. Reproducibility repeat: passed for both complete generated ELFs.**

A separate root recompilation produced byte-identical candidate and symbols ELFs, with all 355 compiled dependency artifacts and retained source inputs unchanged. This is reproducibility of the recovered build—not identity with the original binary. No compute-unit or previously published runtime qualification is transferred. The macOS-host Round37 hybrid's 175 raw matches and artifact hashes are not results of this Linux profile. Counts use one-to-one capacity, not membership-only counting.

## Files and use

- `curvehop.patch`: the single attributed source edit, for review.
- `source-pins.json`: exact source parent and ordinary Linux toolchain/library identities.
- `materialize.py`: checks the complete parent source inventory, creates a fresh workspace, and makes precisely that edit. It does not compile or read any ELF.
- `test_materialize.py`: pure source integrity/negative tests.
- `LINUX_RECIPE.md`: ordinary offline build commands, without custom linker ordering or binary repair.

From a checkout containing the pinned archive:

```sh
PARENT="$PWD/repro/pump/main-contract-round37-20261027"
PACKET="$PWD/research/pump-round37-curvehop745"
python3 -B "$PACKET/test_materialize.py" --parent "$PARENT"
python3 -B "$PACKET/materialize.py" --parent "$PARENT" --output /fresh/path/source
```

Do not modify the archived parent/checkpoint in place. The materializer verifies content hashes rather than trusting a directory name or branch label. This packet contains no original/generated binaries, compiler IR, raw experimental receipts, dependency archives or runtime fixtures.

### Parent manifest compatibility

The existing upstream `member_manifest` repair supports the public archive's standalone `primary/Cargo.toml` by removing its exact trailing release-profile and empty-workspace block in memory. This packet additionally retains compatibility with an already prepared workspace-member manifest: either representation must produce the same existing source pin. Standalone input is also checked explicitly against `primary_source_sha256` in the already hash-authenticated parent checkpoint. This is defense in depth; upstream's exact suffix and final workspace hash already constrained the accepted standalone bytes.

Neither parent representation is rewritten. Dependencies, profiles, source pins and all seventeen output inventories are unchanged. The 131 pure source tests pass against both public-standalone and prepared-workspace parents, including altered manifests, symlinks and archive-preservation cases. This restores input compatibility, not an additional matched window, a new build or runtime validation. See [PARENT_MANIFEST.md](PARENT_MANIFEST.md) for attribution and the fresh-main baseline.

## Optional reserve-sync stage: 746

The default `curvehop745` stage above remains unchanged. Select `--stage reserve746` to additionally apply the one-line checked-add source expression from [PR #340](https://github.com/lalalune/pumpfun-source/pull/340), exact head `d2c01ad86df5f9088cca6a255df30ed65ee2a96c`, credited there to PR #323. `reserve.patch` shows that separate edit; `reserve-pins.json` binds its entire before/after Rust file. Both stages retain all 57 inputs, unchanged dependency/SDK configuration, and the CurveHop correction.

The ordinary Linux **SBF** reserve composition measures **746 / 1,035 injective normalized windows and 121 raw windows**, retaining every 745-stage match and its entire raw-match set. Its sole new match is reserve-sync at original `0xa23f0`, 1,168 bytes. The complete normalized body and nine direct callee bodies match; there are no direct data operands. Compared with the 745 stage, both complete generated ELF files differ by exactly four bytes exchanging two independent loads from initialized converter-return slots. Other loaded sections and their addresses are unchanged.

Only source line 85 changes; no line is inserted or removed. Both addends are `u64` values widened to `u128`, so their sum is at most `2^65 - 2`: the new checked-add failure arm is unreachable. Existing checked multiplication, division, fallible narrowing and capping keep their evaluation and error order. This is source-level reconstruction evidence, not proof of the historical source or recursive program equivalence.

**Reserve-stage runtime: NOT RUN. Reserve-stage reproducibility repeat: passed for both complete generated ELFs. Whole-binary identity against the original: false.** A separate recompilation of the exact 746 source reproduced both complete generated ELF files byte-for-byte, with all 355 dependencies and retained source/artifacts unchanged. This is a distinct 746 repeat proof, not a transfer of the 745 result. Neither stage inherits any public runtime suite or compute-unit claim. No program execution is part of materialization or the source tests.

```sh
python3 -B "$PACKET/materialize.py" --parent "$PARENT" --stage reserve746 --output /fresh/path/reserve-source
```

## Optional arithmetic stage: 749

`--stage arithmetic749` additionally composes the checked constant-product helper and wrappers from [PR #339](https://github.com/lalalune/pumpfun-source/pull/339), exact head `3ce198c28260d45f7305910df0f3fb4749e42857`, onto the 746 stage. `arithmetic.patch` displays the three modified Rust files and one added helper; `arithmetic-pins.json` binds exact before/after contents and minimal context replacements. All other 54 inputs remain unchanged, including both earlier source corrections, lockfile, manifests and features. The default 745 and optional 746 stages remain independently selectable.

The ordinary Linux SBF composition measures **749 / 1,035 injective normalized windows and 121 raw windows**, retaining all 746 normalized and all 121 raw matches. The three added original windows are `0x834c8` (736 bytes), `0x880b0` (2,136 bytes), and `0xa0838` (192 bytes). Their complete normalized bodies, direct ABI and error-origin boundaries are qualified: 22 direct call sites, 14 consumer-bounded direct data references, three relocated records and six referenced function slots were checked against their original counterparts. This is the direct boundary of these three bodies, not recursive whole-program equivalence.

A separate root recompilation of the exact 58-source arithmetic stage reproduced both complete generated ELF files byte-for-byte, with all 355 dependencies unchanged and prior source/artifacts preserved. **Arithmetic runtime: NOT RUN. Reproducibility repeat: passed. Whole-original identity: false.** Generated-output reproducibility is not identity with the original binary. No public runtime suite or earlier-stage repeat result is inherited.

This is an intentional original-bound error-behavior repair, not semantics-preserving relative to the previous baseline. For a quote of one and zero input reserve, the previous inline division could panic; the reconstructed checked helper instead returns the original DivisionByZero error 6026. Overflow 6024, division 6026 and narrowing 6025 retain their observed error origins. Source line spacing expresses observed Rust error Source coordinates (helper lines 13/17/19 and `trade_v3.rs:591`), not arbitrary instruction-layout padding. The checked subtraction is reached after existing nonzero-quote validation. Historical Rust source and recursive whole-program equivalence are not claimed.

Select the separately preserved arithmetic stage with `--stage arithmetic749`. Its materializer/source tests do not compile or execute any program.

## Optional Source and declaration stage: 780

`--stage sourcefronts780` composes the attributed ordinary-Rust changes from [PR #341](https://github.com/lalalune/pumpfun-source/pull/341), [#343](https://github.com/lalalune/pumpfun-source/pull/343), [#344](https://github.com/lalalune/pumpfun-source/pull/344), and [#346](https://github.com/lalalune/pumpfun-source/pull/346), authenticated at head `0598a518b170b24f232c719cc5cc343103e7ffbe`, onto the 749 stage. The cumulative `sourcefronts.patch` and exact full inventory in `sourcefronts-pins.json` bind 15 modified files and two added files: 60 total inputs. All earlier stages remain selectable and the default remains 745. The source materializer applies strict original-context hunks only after validating the entire parent inventory and validates the entire output before writing.

The actual ordinary Linux SBF control measures **780 / 1,035 injective normalized windows and 121 raw windows**: 31 additional original bodies, with every 749 normalized and every 121 raw match retained. This is 75.36% of the inferred function-window census, not a completion percentage or a count transferred from an upstream build. No upstream runtime, direct-edge or alternative-profile result is inherited.

The changes restore diagnostic Source coordinates, declaration filenames/module paths and one borrowed account-label cloning helper. Source coordinates are inferred from original fields, not proof of historical source spelling. The clone helper intentionally changes the ownership/API boundary: it clones a borrowed formatted `String` into either Anchor error variant and drops the temporary after return. Allocation and compute equivalence to the previous generic conversion are not claimed. All earlier CurveHop, reserve and constant-product changes are retained; checked add Source390 and arithmetic truncation Source591 remain explicit.

**Bounded static qualification and a separate same-source recompilation passed. Runtime: NOT RUN. Whole-original binary identity: false.** Both complete generated ELF files were reproduced byte-for-byte from the exact 60 inputs; all 355 dependencies and prior source/artifacts were preserved. Reproducibility is not original identity. Two distinct residual decoder boundaries must not be hidden: the prior dispatcher at original `0x9b430` remains 624 versus 600 candidate bytes (11 length partitions and ten matching leaves), while the newly matched FeeConfig wrapper at original `0x1156f0 + 728` calls original `0x1159d8` (1,176 bytes) versus a 408-byte candidate unchecked decoder. The latter is already present in the 749 candidate: its complete normalized body, reader and immediate callees are unchanged in the 780 composition. Preservation is not original-decoder equivalence. Full transitive call/data semantics remain unproved.

Materialization and 31 pure source tests do not compile or execute a program. No binary, IR, archive, raw build/runtime receipt or held runtime fixture is included.

The 31 new bodies have 405 direct-call sites: 404 bind to complete normalized-equal callee bodies; the one explicitly unequal FeeConfig boundary is described above. The review inventories 307 direct data references, checks 32 Source fields, eight relocated records, one code pointer and 13 imported-call bindings. The record proof covers named fields and function slots at interpreted Rust layout extents, not transitive method behavior. **27 PDA seed pointer uses across four seed categories have equal inspected source-named bytes, but machine consumer extents and dominance remain open.** No universal direct-data closure is claimed. The five prior qualified roots retain all 98 immediate boundaries, seven prior trait-method edges and receiver fields at offsets +64 and +72.

## Separate ordinary SBPF profile: 785

The unchanged `sourcefronts780` inputs also have an independently built and repeated ordinary Linux SBPF profile: **785 / 1,035 injective normalized windows and 131 raw windows**, retaining all SBF780 matches. This is a profile choice, not a fifth source stage; the default materializer and all four existing source stages remain unchanged. See [SBPF_PROFILE.md](SBPF_PROFILE.md) for bounded TypeId/record qualification and explicit residuals, and [SBPF_RECIPE.md](SBPF_RECIPE.md) for the minimal ordinary target/library recipe delta. Credit PRs #307, #321 and #338. Runtime NOT RUN; whole-original identity false.

## Optional SBPF clamp stage: 786

The additional `--stage clamp786` preserves the default and all prior stages. See [CLAMP786.md](CLAMP786.md) for the attributed one-line #323 edit, independently repeated 786 / 1,035 injective and 131 raw checkpoint, typed incoming-call proof and Source 57 versus 2911 limitation. Runtime remains **NOT RUN** and whole-original identity remains false. Use the separate [SBPF recipe](SBPF_RECIPE.md), not an inferred SBF result.

## Optional SBPF visibility stage: 788

Select `--stage visibility788` for the exact three attributed #323 visibility changes on `clamp786`. See [VISIBILITY788.md](VISIBILITY788.md) for the independently repeated 788 / 1,035 injective and 131 raw checkpoint, typed helper boundaries, unchanged contract-route evidence and explicit v2 residual. All prior stages and default remain available. Runtime is **NOT RUN**; whole-original identity remains false.

## Optional SBPF v2 rent stage: 789

Select `--stage v2rent789` for the isolated attributed #323 v2 helper hunk on `visibility788`. See [V2RENT789.md](V2RENT789.md) for the independently repeated 789 / 1,035 injective and 131 raw result, three actual zero-size callers, preserved contract routes and explicit nonzero-input exclusion. All prior stages/default remain selectable. Runtime is **NOT RUN**; whole-original identity remains false.

## Optional fourfronts795 stage

Select `--stage fourfronts795` on the ordinary SBPF profile. The default and all seven preceding source stages remain selectable. This strictly composed three-file source delta credits [#352](https://github.com/lalalune/pumpfun-source/pull/352), [#353](https://github.com/lalalune/pumpfun-source/pull/353), [#354](https://github.com/lalalune/pumpfun-source/pull/354) and [#355](https://github.com/lalalune/pumpfun-source/pull/355). It preserves the prior clamp, public payment helpers and v2 zero-domain correction.

The independently qualified result is **795 / 1,035 injective normalized windows and 131 raw windows**, retaining all 789 prior matches and all raw matches. Both complete generated ELFs repeat byte-for-byte after a separate same-source root compilation. Six new normalized bodies cover two scalar arithmetic helpers, two singleton whitelist methods and two instruction wrappers; no new raw match is claimed. The pure source suite has 59 passing tests.

**Two typed business-handler edges remain unequal, and two changed panic-location identities have unresolved original owner/consumer mappings.** Dispatcher route membership and selectors are preserved; blanket relocated-data literal identity is not claimed. See [FOURFRONTS795.md](FOURFRONTS795.md) for the exact bounded proof, scoped original-record scan and all prior limits. Runtime remains **NOT RUN**, whole-original binary identity remains **false**, and no upstream counts/runtime results are inherited.

## Optional harvest799 stage

Select `--stage harvest799` on the ordinary SBPF profile; the default and all eight previous source stages remain selectable. The isolated `migrate_v2.rs` call/public helper is credited to [#323](https://github.com/lalalune/pumpfun-source/pull/323), exact head `e8a20069315b8c6fd645b7f3b1e7990de07b6b0d`. All other 59 inputs and existing source coordinates remain unchanged.

The independently qualified result is **799 / 1,035 injective normalized windows and 133 raw windows**, retaining every prior match. Four complete harvest-related bodies and 58 immediate callee edges match; two already-normalized bodies also become raw-identical. Both complete generated ELFs repeat byte-for-byte after a separate same-source root compilation. The pure source suite has 66 passing tests.

The helper intentionally restores original Token-2022 program validation and AccountInfo order. It is not blanket equivalence with the manual CPI for wrong-program, conflicting duplicate-key, missing-account or allocation/borrow-error domains. Original/current typed caller roles and bounded data/route preservation are verified; full migration equivalence is not. Existing two handler and two panic-identity open edges remain. See [HARVEST799.md](HARVEST799.md) for precise readonly insertion transport, backend-diagnostic limits and prior gaps. Runtime remains **NOT RUN**, whole-original identity remains **false**.

## Optional nextfronts804 stage, with repaired split metadata

Select `--stage nextfronts804` on the ordinary SBPF profile; the default and all nine preceding source stages remain selectable. The combined two-file delta credits [#356](https://github.com/lalalune/pumpfun-source/pull/356), [#357](https://github.com/lalalune/pumpfun-source/pull/357), [#358](https://github.com/lalalune/pumpfun-source/pull/358) and [#360](https://github.com/lalalune/pumpfun-source/pull/360), plus a separately identified local inferred private split-helper reconstruction. All other 58 source inputs and file line counts remain unchanged.

The accepted repaired checkpoint has **804 / 1,035 injective normalized windows and 133 raw windows**, retaining all harvest799 matches. Five new normalized bodies have 94 qualified immediate callee occurrences; both newly observed accrual panic metadata mismatches were repaired before acceptance. Both complete generated ELFs repeat byte-for-byte from the exact repaired source. The pure source suite has 74 passing tests across ten selectable stages.

Sequential mutation equivalence is bounded to the three callers' retained prevalidated success domain, not arbitrary helper partial failures. Actual 18 fallible checks remain despite three unused-variable warnings; first/post fee rounding stays separate. The buyback diagnostic change is intentional original-backed string-value formatting. Natural private-helper inlining is observed, not historical-source identity; the third original shared-record consumer 527864 remains unmatched. Prior two handler and two panic-origin open edges remain. See [NEXTFRONTS804.md](NEXTFRONTS804.md) for exact Source/data/route and domain limits. Runtime remains **NOT RUN**, whole-original identity remains **false**.

## Optional chain805 stage

Select `--stage chain805` after `nextfronts804` using the same ordinary SBPF profile. All ten prior source stages and the default remain available. This local original-backed two-file change places a private owned-Error producer at `create_v2.rs:412` and retains lazy `ok_or_else` construction before ancestor parsing. The inferred helper name is not historical source identity; the measured 520-byte body is naturally emitted as a `FnOnce::call_once` adapter.

The accepted checkpoint is **805 / 1,035 injective normalized windows and 133 raw windows**, retaining all 804 / 133 preceding matches. The new constructor has four matched immediate callees, seven bounded data uses and three matched records. Both complete generated ELFs repeat byte-for-byte from the exact source; 81 pure source tests pass across eleven stages. The unsuccessful decoder-expression alternative is not included.

The broader original walk and ancestor remain unmatched, and all prior decoder, handler, panic-origin, PDA, TypeId and split-consumer limitations remain. See [CHAIN805.md](CHAIN805.md) for exact scope. Runtime remains **NOT RUN** and full original byte identity remains **false**.

## Optional feeconfig806 stage

Select `--stage feeconfig806` after `chain805` using the unchanged ordinary SBPF profile. All eleven prior stages and the default remain selectable. This one-file source change credits [#362](https://github.com/lalalune/pumpfun-source/pull/362): a six-field route-local derived FeeConfig type separates its reader from the unchanged generated legacy/CPI account. No registry, SDK, macro or IDL change is used.

The accepted checkpoint is **806 / 1,035 injective normalized windows and 133 raw windows**, retaining all preceding matches. The original 1,176-byte generated unchecked decoder now matches, closing the earlier immediate FeeConfig decoder gap; the local 1,352-byte reader and both route/trade consumers preserve their complete normalized bodies. Both complete generated ELFs repeat byte-for-byte from the exact source, and 88 pure source tests pass across twelve stages.

This is not universal nominal Rust type/API equivalence or a recursive dynamic-destructor proof. BondingCurve's 624-versus-600 dispatcher and prior handler, metadata, PDA, duplicate-identity and split-consumer limits remain. See [FEECONFIG806.md](FEECONFIG806.md). Runtime remains **NOT RUN** and full original identity remains **false**.

## Optional next369810 stage

Select `--stage next369810` after `feeconfig806` with the same ordinary SBPF profile. All twelve prior stages and the default remain selectable. This stage credits [#369](https://github.com/lalalune/pumpfun-source/pull/369), with an explicitly local no-hint wrapper derivative: the upstream `inline(always)` attribute is omitted, not replaced by an optimization sweep. Three existing files change and one utility file is added, for 61 inputs.

The accepted checkpoint is **810 / 1,035 injective normalized windows and 133 raw windows**, retaining all preceding matches. Four original bodies gain matches: buy/sell quote, post-fee amount and migration subtraction error. The already-matched addition error is not counted again. Both complete generated ELFs repeat byte-for-byte, and 95 pure source tests pass across thirteen stages.

Migration intentionally repairs post-completion quote funding and changes nonzero/invalid-input behavior. The correctly typed calculator (696 versus 640 bytes), inverse wrapper (688 versus 632), two previously unresolved panic-coordinate identities and earlier limits remain explicit. No whole-handler or recursive closure is claimed. See [NEXT369810.md](NEXT369810.md). Runtime remains **NOT RUN** and full original identity remains **false**.

## Optional v2errors814 stage

Select `--stage v2errors814` after `next369810` under the unchanged ordinary SBPF profile. All thirteen prior stages and the default remain selectable. This two-file stage credits [#371](https://github.com/lalalune/pumpfun-source/pull/371) and [#375](https://github.com/lalalune/pumpfun-source/pull/375), explicitly rebased to preserve the earlier qualified Token-2022 harvest wrapper. The negative receiver experiment is excluded.

The accepted checkpoint is **814 / 1,035 injective normalized windows and 133 raw windows**, retaining all prior matches. Four new standalone error bodies match; two existing migration errors are requalified, not counted again. All 102 pure source tests pass across fourteen stages, and both complete generated ELFs repeat byte-for-byte.

Migration funding intentionally adds post-completion quote before native-only fee subtraction; this is not baseline invalid/nonzero-domain equivalence. Original-backed lazy callback Source ownership, changed-handler prior edges and the restricted repeated-subtraction/error-drop case are documented in [V2ERRORS814.md](V2ERRORS814.md). Fee wrapper, decoder, handler, PDA and historical metadata/identity limits remain explicit. Runtime is **NOT RUN** and full original binary identity is **false**.

## Optional truncation815 stage

Select `--stage truncation815` after `v2errors814` under the unchanged ordinary SBPF profile. All fourteen earlier source stages and the default remain selectable. This local inferred source repair replaces one sell quote conversion with an explicit lazy error callback at original Source line 1140; no compiler attribute or SDK change is used. The measured implementation is a compiler `FnOnce` adapter, not a claimed historical helper name.

The accepted checkpoint is **815 / 1,035 injective normalized windows and 133 raw windows**, retaining every earlier match. One new complete 520-byte original error body matches. All 109 pure source tests pass across fifteen stages, and both complete generated ELFs repeat byte-for-byte. The shared narrow helper and its 21 other callsites remain retained, including bounded quote-register provenance for the two conversions inside the changed sell handler. See [TRUNCATION815.md](TRUNCATION815.md) for the actual interface/data evidence and remaining limits. Runtime is **NOT RUN** and full original binary identity is **false**.

## Optional buytruncation816 stage

Select `--stage buytruncation816` after `truncation815` under the unchanged ordinary SBPF profile. All fifteen earlier source stages and the default remain selectable. This local inferred source repair replaces one buy quote conversion with an explicit lazy error callback at original Source line 811; no compiler attribute or SDK change is used. The measured implementation is a compiler `FnOnce` adapter, not a claimed historical helper name.

The accepted checkpoint is **816 / 1,035 injective normalized windows and 133 raw windows**, retaining every earlier match. One new complete 520-byte original error body matches. All 116 pure source tests pass across sixteen stages, and both complete generated ELFs repeat byte-for-byte. The shared narrow helper and its 20 other callsites remain retained, including bounded quote-register provenance and five retained conversions inside the changed buy handler. See [BUYTRUNCATION816.md](BUYTRUNCATION816.md) for the actual interface/data evidence and remaining limits. Runtime is **NOT RUN** and full original binary identity is **false**.

## Optional refund817 stage

Select `--stage refund817` after `buytruncation816` under the unchanged ordinary SBPF profile. All sixteen earlier source stages and the default remain selectable. This isolates two existing migration-v2 refund lines from upstream PR #384 g7, preserving the existing attribute, zero guard, account roles and source coordinates. Ordinary closure/temporary seed lowering produces the measured complete original 384-byte refund boundary; no new function or attribute is added.

The accepted checkpoint is **817 / 1,035 injective normalized windows and 133 raw windows**, with no prior loss. Both complete generated ELFs repeat byte-for-byte, and 123 pure tests pass across seventeen stages. Actual ordered seed leaves, the original-equal native target, both unchanged caller interfaces and prior graph boundaries are checked. See [REFUND817.md](REFUND817.md) for attribution, lifetime assumptions and remaining limits. Runtime is **NOT RUN**; full original binary identity remains **false**.
