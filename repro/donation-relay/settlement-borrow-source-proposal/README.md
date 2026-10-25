# Borrowed settlement source proposal and build03 role correction

This is an **uncompiled source proposal** for build03's two remaining oversized wrapper frames. It changes only `src/handlers.rs` and `src/frames.rs`: each Settlement now borrows the admitted TokenView, MintView and three Account fields instead of copying them. The six settlement-construction sites cover After, NonSwap, Just's input/output and Combined's input/output. All other 19 source/lock inputs remain exact build03 bytes. No compiler, typecheck, target execution, transaction, network request or parent-source change was performed.

## Explicit correction to the frozen build03 report

The build03 report incorrectly named original wrappers 186/187 as the counterparts of its failing just-swap and combined wrappers. **The correct original wrappers are 185 for just_swap_v1 and 184 for swap_then_distribute_v1.** Wrappers186/187 are after-swap and non-swap distribution respectively. Build03's seal remains unchanged as historical evidence; this is an additive correction, not a silent rewrite.

`build03-attribution-correction.json` reproduces the corrected mapping from the sealed N09 discriminator ledger, actual original constant bytes, signed call displacements, complete wrapper hashes and wrapper→parser/adapter/exit calls. The candidate bytes, candidate symbol attribution, 166 diagnostics, all raw/normalized match counts and original minimum direct r10 value (-4,088) are unaffected by the old labeling error.

| Instruction | Correct original wrapper | Parser | Adapter → body | Exit |
| --- | --- | --- | --- | --- |
| just_swap_v1 |185 [545792,547224)|150|202 →99|153|
| swap_then_distribute_v1 |184 [544128,545792)|154|203 →100|155|

The selected source baseline is build03 seal `41320f38aeff7763adadfa9e18b39c93e94f5831fb73b34e9b2e2355a6034f4d`, candidate `6274a1a7…`. That candidate remains unsuitable for execution: just-swap's reported frame is 4,288 and combined's 4,864 versus 4,096; the respective raw direct r10 minima are -4,256 and -4,848. The complete original and candidate ELF files, source hashes and relevant saved ledgers are included and bound to the unchanged build03 manifest.

## Exact source change and lifetime review

`Settlement<'a>` holds five immutable references. `DistributionContext<'a>` and `SwapContext<'a>` carry that same lifetime; their existing distribution reference already bounds their use to the admitted frame. `frames::settlement` accepts references with that lifetime and returns direct references to the decoded boxed values and frame Account fields. It allocates nothing, clones nothing and acquires no AccountInfo RefCell data or lamport borrow.

Every call that still requires an Account by value now explicitly dereferences the corresponding borrowed field. Account is Copy; this preserves its handle, key, cached owner and genuine loader-derived flags at the call. Field reads such as `.key`, `.amount` and `.decimals` use ordinary reference dereferencing. No additional PDA/signature privileges or checks are introduced.

The borrowed values are cached admission data. They are not live decoded token data and are not mutated by CPI. `observed_swap` still records cached input/output amounts before the CPI, then independently reloads input followed by output through the real runtime. Keeping a reference to a cached value does not retain a runtime borrow or replace those reloads. Source owners and token keys remain the admitted snapshots, just as in build03.

Just's mutable receipt reference targets a different boxed field from the immutable settlement/distribution references. Its wrapper already scopes the body view inside a block, releasing that borrow before event/return and generated exit. Combined/After/NonSwap views are immutable and borrowed from the same frame that later supplies exit. No reference escapes the frame or enters a retained event value; events still own their ordinary copied key/scalar/vector data. This is a source-level lifetime review, not a successful Rust typecheck.

`effect-preservation.json` compares all seven relevant functions exactly after removing only the explicit dereferences required by the new reference types and the one lifetime annotation. Thus the guards, checks, amount selection, recipient/Jupiter partition, checked arithmetic, state writes, reloads, CPI arguments/order, residual burn/close and event values remain textually identical. The runtime/CPI implementation and all wrapper/event/return/exit code are unchanged. The common Settlement type also updates the two distribution paths; their operation order is included in the review rather than omitted from scope.

## Evidence and remaining limits

Original role windows are captured in `original-role-windows.json`; these show the wrapper, parser, adapter, body, shared108 and cleanup relationships. The natural reference type is a candidate stack repair, not a claim that original Rust used these exact lifetimes or layout. The original shared108 interface still has source at K+16, mint K+64, program K+112 and authority K+160. The old distribution report's reversed prose is preserved only as historical input and is accompanied by the published byte-backed correction. The proposed source does not transpose those roles.

This patch adds no allocations. The previous Loaded boxes, their OOM/drop/timing differences and all existing runtime/error/source-origin/dependency uncertainties remain. Compiler inlining, register allocation and spills may still produce excessive stack usage; no resulting frame size is promised. No inline attributes, compiler flags, resource-limit overrides, guessed guards, padding or alternative variants are proposed. A separate review and authorization are required before any new build, and any such build must inspect backend errors despite a zero exit status.

`source-repair.patch` and `derive.py` provide the exact two-file transform. Run `python3 -B verify.py`, optionally with `--repo /path/to/repository`. The portable verifier checks selected input seals, the exact source transform, effect and borrow ledgers, corrected original dispatch/call anchors and raw windows. It runs no compiler or target code. No handler count, receipt count, runtime-equivalence or security sign-off is added.
