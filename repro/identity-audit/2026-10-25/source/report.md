# Source and SDK gap audit at `3c5b492be7ed793e062bc14f57c7abf3b3823c61`

This is a read-only re-derivation from Git objects, not an endorsement of old narrative reports. `audit.json` records 150 instruction dispositions, all entrypoint locations, 123 explicit source-boundary/unknown-field lines, current-candidate drift and ELF measurements. `handlers.csv` is the flat instruction table; `audit.py` reproduces the inspection. No VM was executed and no contracts or shared scripts were edited by this audit.

## Findings that change the next work

1. **Current Fees status is broken.** `repro/status.json` names `repro/pump_fees/sharing-second-pump-cpi-main-v144/main/candidate.so`; that path is absent from this exact Git tree. This is not a failed byte-identity comparison: the declared artifact cannot even be opened. Pass20's table/index instead names the `sharing-pump-extend` checkpoint. Do not silently substitute it. Reconcile the owning source/build/receipt package and status as one unit, then run current binding verification.
2. **All four completion-candidate pointers differ from current status.** `repro/completion.json` calls older candidates “current” (Pump `final-error-metadata`, AMM `destination-rent`, Fees `legacy-social-admission`, Mayhem `twentyfour`), while status points to later checkpoints. `docs/COMPLETION.md` has additional old candidate paragraphs. The handler counts can remain valid while the binary/receipt applicability is stale. The report must cite one pinned candidate per component and retain the others as historical.
3. **Merged source is not necessarily current source.** Pump has 53 live entrypoints: 48 bounded plus five partial, with `admin_update_token_incentives`, `claim_token_incentives`, and `set_mayhem_virtual_params` absent. The old combined PR package still exists under `repro/pump/merged-prs-20261025`, including historical positive claims, but the current lib does not dispatch those instructions. Pass20 explicitly says upstream-only claims remain inactive. Integrating historical handler modules requires independent current-source/body review and a new composite build, not transferring old receipts.
4. **The restored SDK startup script is stale and destructive.** The tracked `independent-reconstruction-review/localnet-sdk-testing/start-localnet.sh` hardcodes old Pump/AMM/Fees binaries, omits the captured donation relay, and calls `rm -rf "$LEDGER"` on the supplied path. Its root calculation walks four parents from the script directory and lands at `repro`, not the repository root, so even the named tracked paths resolve incorrectly. Its README claims behavioral/ABI identity and “fully covered all31 Fees” despite bounded tests, a known sell_v2 mismatch, and an absent relay executable needed by donation CPIs. It should resolve current accepted candidates, verify exact hashes against owning reports, load all five captured dependencies, preserve any existing ledger, and state finite scope.
5. **The master gap ledger is not a reliable current inventory.** It was restored from an earlier review and contradicts current code and the newer pass20 ledger in several concrete places (below). Its “104 items” is a narrative count, not coverage of every original function, basic block, source path or SDK action.

## Current source coverage (IDL or identified-handler denominator)

| Component | Live entrypoints | Instructions | Truly absent dispatches | Body/source conclusion |
| --- | ---: | ---: | --- | --- |
| Pump | 53 | 56 | admin_update_token_incentives; claim_token_incentives; set_mayhem_virtual_params | 48 bounded; 5 partial; whole-body/transitive equivalence unproved |
| PumpSwap | 38 | 38 | None | create_config is source-present/static-only; authentic positive replay absent |
| Fees | 31 | 31 | None | Source present for all retained IDL entries; current status artifact missing |
| Mayhem | 24 | 25 identified | initialize_mayhem_state | 24 bounded; initializer absent; no retained official Mayhem IDL in evidence/upstream |

The 140/150 bounded figure is a disposition metric. It is not 93.3% byte recovery, source recovery, SDK compatibility, security completion or input-space coverage. The Mayhem denominator comes from identified dispatches, unlike the three official retained IDLs.

## Explicit incomplete paths in current source

| Handler / group | Direct source evidence | Remaining work and decisive evidence |
| --- | --- | --- |
| Pump buy_v3 | lib.rs:100 discards `partial_fill`; trade.rs:297–302 limits quote selection to native/WSOL or USDC | Recover original flag-dependent branches and quote-route admission/settlement; add signed target/candidate cases that discriminate true/false on identical funded state |
| Pump sell_v3 | Same SellV3/check_quote adapter; token-account parsing is finite | Non-USDC quote paths, token-extension settlement, account aliasing/ownership/short-layout error order; full target CFG/call/data closure |
| Pump buy_exact_quote_in_v3 | trade.rs consumes partial_fill for Mayhem crossing and min-out suppression | Do not incorrectly report the flag as ignored here. Other quote routes/transfer-fee combinations and account-validation closure remain |
| Pump create_v2 | create_v2.rs:39 explicitly rejects Mayhem using a reconstruction-only error | Recover genuine Mayhem CPI and initializer behavior; raw-context validation, extension combinations, failures and allocation effects |
| Pump nested creation | nested_create.rs:153 uses `g.max_curve_depth.min(5)` and a five-record local array | Depth>5 is not automatically missing behavior: first prove the target accepts it. Existing depth1–5 ancestry is synthetic; malformed/truncated/error-domain behavior remains incomplete |
| Pump multi_hop_curve_swap | multi_hop_curve.rs:161,181 require Tokenkeg-size165 accounts; 260–281 constrain token programs/layouts and holder mode; 311 excludes completion | Recover Token-2022/richer route branches without losing current native fee/parser behavior. Validate completion, migration, cashback/holder/Mayhem and capacity against authentic caller routes |
| Pump sell_v2 | Current status/COMPLETION explicitly retain transfer-fee min-output and event mismatch | Evidence-backed correction with target-observed fee arithmetic and gross/net thresholds; current generic passing cases cannot close this known counterexample |
| Pump TradeEvent suffix | Several trades force zero; multi_hop_curve.rs:355 computes adapter delta and :387 emits it | Zero is not global semantics. Route-specific delta is now attributed; recover meaning/cases in every trade family before renaming field globally |
| PumpSwap create_config | lib.rs:47 comment static-only; fixed administrator context | Separate static body/context/transitive equality from positive historical signature reachability. Captured genuine historical init transaction would enable authentic replay; its absence does not prevent static source analysis |
| PumpSwap all bounded handlers | Entry wrappers exist; no full raw-core equality | Scalar/context specialization, call factoring, diagnostics, data and relocation closure; all successful tests remain finite |
| Fees all handlers | Present wrappers including two deprecated rejection routes | Current artifact binding first; then 127 unattributed and two conflicting original windows in pass20, late error/CPI cleanup/payout paths, recursive data and compared-value CFG closure |
| Mayhem initialize_mayhem_state | No current entrypoint | Source/context/field initialization, real Pump→Mayhem CPI route and signed historical acceptance; don't fake privileged signer |
| Mayhem existing handlers | state.rs retains field_8, field_56, field_72, field_89 and two neutral status variants; GlobalParams raw arrays in lib | Resolve role/width/signedness independently; reconstruct error-return ABI, ownership/drop and source diagnostics using full target paths |
| Relay | current.json points source-build11; 12 ordinary cases;370 unmatched original windows | Privileged success routes, source-origin errors, serializer/header/name/log adapters, indirect and data closure; it is not “no source recovered” anymore |

## Numerical comparison scope

The source audit parses ELF section headers directly. It reports allocated captured bytes separately from the extent ending after all non-NOBITS sections and the section-header table. “.text deficit” is net section-size difference and must not be called an exact measure of genuinely missing code: one changed inlining/factoring decision can alter size across many already implemented paths.

| Component | Captured allocation | ELF used end | Captured .text | Current candidate bytes | Candidate .text | Net .text delta |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Pump | 10,485,715 | 1,934,800 | 1,792,208 | 1,581,232 | 1,461,384 | −330,824 |
| PumpSwap | 10,485,715 | 1,268,504 | 1,162,040 | 1,200,616 | 1,104,512 | −57,528 |
| Fees | 948,944 | 873,256 | 799,648 | Unavailable at declared path | — | — |
| Mayhem | 777,408 | 775,416 | 706,744 | 668,640 | 606,776 | −99,968 |

Both Pump and AMM captured payloads include approximately9MB of allocated zero tail. The source/compiler must reproduce the executable image; the loader allocation tail must be compared and regenerated under a separate explicit rule. Do not conflate a 10MB capture comparison with a 1.9MB ELF comparison. Captured .text remains unequal in every inspectable current core candidate. Current Pump/AMM build reports say v1.44; Mayhem says v1.52. A later default-v1.43 setting does not retroactively rebuild or re-prove them.

## Corrections required in the master ledger

- The ATA summary says the remaining307 bytes are in custom_panic. Pass20 explicitly says they are **not the custom panic body**. Use the current dependency analysis to attribute actual differing extents before experimenting with a panic replacement.
- The AMM deposit/withdraw sections claim quote_transfer_fee is omitted. Current state.rs:179/201 includes it, and lib.rs:559/581 assigns it. That is no longer an outstanding source omission; extension/semantic coverage and exact code remain open.
- “donation_relay: no source recovered” is contradicted by the current source-build11 package with owned error/IDL discriminator recovery and finite runtime coverage. It has substantial missing closure, but it is not an empty implementation.
- The TradeEvent suffix is not uniformly “uninterpreted/set0”; current generalized route emits an attributed adapter difference. State the remaining family-dependent uncertainty.
- Pump candidate size/data points cite the older buy-mode-order binary while current status names admin-cto-owned. The new exact measurements are above.
- The claim “literal source lost, therefore byte identity is unrecoverable and original source is the only way” is not established by the bytes. Compilation is many-to-one; lack of unique source recovery does not prove no source preimage can be found that emits the target. The justified conclusion is that historical source identity and a complete byte-matching reconstruction are currently unproved. Source backups are useful evidence, not a mathematically necessary exclusive solution.
- “Arbitrary depth beyond5 missing” overstates a gap when the current recovered protocol cap is5. A larger target-supported depth must be established first.
- A footer calling all stopped lanes immutable task constraints is historical workflow text, not technical evidence about decompilability. Parent should follow current user scope while retaining genuine authorization and source-evidence requirements.

## SDK and external-program coverage

Nine captured executable programs exist: four cores and five dependencies (`spl_token`, `spl_token_2022`, ATA, token_metadata, donation_relay). The SDK localnet currently loads only eight, leaving `RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu` missing. Fees donation.rs:36 explicitly invokes it and :159 constrains it executable. Adding its binary alone is necessary but not sufficient: epoch/debouncer/whitelist/ATA and other flow-specific accounts also need lifecycle-valid fixtures. Three seeded global configs do not prepare every SDK action. The existing official IDLs are pinned to pump-public-docs commit639b87f and snapshot hashes; SDK source/API parity needs its own revision-pinned comparison. A listed official transfer-hook repository or segments SDK does not prove those programs occur in the tested CPI closure; trace/IDL evidence must decide scope.

## Recommended implementation lanes

1. **First fix evidence plumbing:** current Fees artifact path, status/completion/document drift, safe SDK startup with relay and flow-specific acceptance qualifications. This restores meaningful verification and is independently testable without inventing contract behavior.
2. **Highest-tractability contract discriminator:** Pump buy_v3's discarded partial_fill argument. It is a direct source-level omission with a binary/IDL input seam. Inspect full target body via current Ghidra/portable disassembly, identify its boolean branch, then compare funded same-state false/true executions. Implement only the target-derived branch; preserve all existing successful SOL/USDC cases and reject an overlay that removes them.
3. **Largest clear scope gain:** independently review/integrate the historical three handler modules in current source with honest synthetic reachability qualifications. This closes dispatch absence, not general semantics or byte identity, and must be backed by new composite builds/receipts and source-closure analysis.
4. **Byte-identity work:** for each selected original function close direct callee identity, recursive error/drop/allocator/formatter/data ownership and source-location records. Recompare entire ELF after changes. Do not count a normalized function match as raw equality or missing raw windows as missing handler source one-for-one.

No conclusion of completion, broad safety, deployment readiness, or full SDK compatibility is supported by this audit.
