# Attribution of original Mayhem windows181656 and184200

**New attribution established; no source correction is justified.** The two windows are post-trade signed accounting, not sizing/math-division routines. The current legacy/V2 source already expresses the same ordered updates and buy-side limit checks at the source level. Changing the sizing `Option::unwrap()` sites based on these windows would be a category error.

The original hash is `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`. The previously opaque ledger rows are preserved unmodified in `classification-history.json`. This report supplies a new bounded attribution; it does not rewrite old classification history or declare transitive closure/full-function byte equality. Main currently includes both separately accepted swap typed-error changes; neither is changed here.

## Caller-to-argument proof

Four complete, previously admitted caller bodies are retained as regenerated assembly:

| Caller | Call | Target | Post-call result check |
|---|---:|---:|---:|
| legacy buy [113672,127520) |124896|181656|124904, r0!=2 exits|
| buy_v2 [140512,159160) |156240|181656|156248, r0!=2 exits|
| legacy sell [127520,140512) |137992|184200|138000, r0!=2 exits|
| sell_v2 [159160,177256) |174352|184200|174360, r0!=2 exits|

All four calls are after the actual trade and typed reload paths. Legacy buy calls token reload17064 at124680 and curve reload24496 at124704. It then obtains current SOL-vault balance through656376 at124728, subtracts it from saved pretrade SOL at124784, reads current token-vault amount at124760 and subtracts saved pretrade tokens at124792. Thus r3 is actual quote spent and r4 is tokens gained, both nonnegative checked u64 differences. It loads the context's global/state references at124800/124808, adds8 to pass decoded payloads at124848/124856, and passes a four-zero-word key at124816–124872.

Legacy sell reloads at137768/137792, obtains posttrade SOL balance at137816, checks/subtracts pretrade SOL at137840/137880, and checks/subtracts current token amount from pretrade tokens at137872/137888. It loads decoded global/state payload pointers at137896–137952; r3 becomes quote received at137976, r4 remains tokens spent, and r5 points at four zero words. These signs explain the opposite accounting operations below.

The V2 callers use the same payload pointer conventions. They select actual balance via native SOL-vault or reloaded quote-token amount, then pass the four-word supplied quote key, copied from context+32 AccountInfo.key, to r5 (buy156112–156216; sell174224–174328). The buy value setup is156072–156088 and156232; the sell setup is174192–174200 and174336. This is source-role evidence for quote-family selection, not a guessed memory layout based on declarations.

## Quote-family selection and affected fields

Both routines inspect all32 bytes at r5. All-zero selects native accounting. Otherwise they compare the four exact u64 words encoding `So11111111111111111111111111111111111111112`; only that complete equality also selects native. Every other key selects the stable/non-native accounting branch. No account owner or signature is bypassed here.

Decoded global offsets+64/+72 form the native i128 counter; +80/+88 form the non-native i128 counter. These roles are established by the native/quote caller linkage and the current source/prior field crosswalk, rather than inferred from host Rust field order. State+32/+40 is the quote-deployed i128 and state+48/+56 is the token-net i128. The global current source names are `sol_deployed`/`stable_deployed`; state names remain `field_56`/`field_72` at their serialized offsets. In particular decoded offsets are not serialized account offsets.

## Full natural contract:181656..184200

Source-level contract, conditional on admitted pointers and normal internal ABI:

1. Select global native counter for zero or WSOL key, otherwise stable counter.
2. Checked signed-i128 add of the nonnegative u64 quote-spent value. Native stores are181984/181992; stable stores182120/182128.
3. Checked signed-i128 add of the same quote amount to state quote-deployed. Stores182280/182288.
4. Checked signed-i128 subtraction of nonnegative u64 token-gained from state token-net. Stores182752/182760.
5. If the newly updated selected global counter is positive as a signed i128, require its low u64 limb strictly below the selected overall limit. Equal fails. Native limit is decoded+112; stable is+184. The unsigned failure test at183080 (`limit <= low`) reaches6006.
6. If newly updated state quote-deployed is positive as signed i128, require its low u64 limb strictly below the selected per-coin limit (native decoded+120, stable+192). Equal fails;183256 takes the success path only for `limit > low`. Failure is6007.
7. Success sets r0=2 at184104. Checked arithmetic failures build6002 with no source-origin attachment in this routine. Risk failures construct6006/6007 with original source metadata and pass compared numeric values to11776.

The positivity tests are **signed128 positivity followed by low64 comparison**, not a wide unsigned limit comparison. A positive counter above2^64 may have low limb zero and is still tested against the limit. Negative/zero counters skip the corresponding risk comparison. The current `>0` guards followed by `as u64` casts preserve precisely that distinction.

The three checked updates occur before risk checks. Earlier successful stores can exist in memory when a later arithmetic/risk error is returned. Whole-transaction rollback is an external runtime premise, not evidence that this routine avoided those stores.

## Full natural contract:184200..185296

1. Select the same native/stable global counter.
2. Checked signed-i128 subtraction of received quote: native stores184456/184464; stable stores184576/184584.
3. Checked signed-i128 subtraction of quote from state quote-deployed:184712/184720.
4. Checked signed-i128 addition of tokens spent to state token-net:185184/185192.
5. Any checked arithmetic error constructs6002 through the common error-construction path; success sets r0=2 at185200. There are no buy-risk-limit branches or division operations anywhere in this complete window.

The carry/borrow sequences operate on two64-bit limbs and explicitly check signed overflow. They do not use saturating updates or reject ordinary transitions through negative counters. The source's `checked_add`/`checked_sub` on i128 with `u64 as i128` operands fits this observed contract.

## Error evidence and transitive limits

Buy stores error number6002 at182680 and sell at185128 after enum-value2 formatting through190160/196056. Buy risk paths use enum7 literal708712/code6007 at183568 and enum6 literal708764/code6006 at183992. The risk source record at710295 is exactly `programs/mayhem-program/src/state.rs`; the observed line numbers250/243 remain historical evidence only. No fake source coordinates are proposed.

Calls to190160 (error naming/string creation),196056 (Display),620712 (error conversion),11776 (compared-value attachment),674280 (formatting failure unwrap), and their allocator/formatter dependencies remain transitive obligations. The complete direct call/data/branch list is saved in `attribution.json`. This pass does not claim identity of error allocation, log formatting or every returned internal register/heap object. V2 quote-token ownership/reload/CPI semantics are upstream and not newly proved.

## Current-source disposition

Frozen copies of the four current source modules are under `before/`. Their posttrade updates have the same order and directions. The buy modules retain signed positivity and low-u64 strict limit comparisons. Their `math()` constructs `MayhemError::MathOverflow.into()` naturally; the original6002/enum2 path supports that choice.

No main-source patch is supplied: this pass closes an attribution gap, not an implementation gap. A future correction to legacy sizing diagnostics requires the **actual sizing helper** call/data/return evidence, not these posttrade targets. Their addresses differ; no wider original window was speculatively relabeled or searched here.

## Reproduction and exclusions

Run `python3 -B inspect.py`. It reads the copied original and checks full-window hashes, all four caller call encodings, selected updates/error codes and risk branches; it writes only the derived attribution file. No ELF is executed or modified. The initializers and other stopped scopes remain untouched. There were no builds, new fixtures, runtime probes, compiler searches or main edits.
