# Connected BondingCurve decoder and preparation review

**Disposition: the exact three-file connected source proposal is ready for review; no build or main change has occurred.** `proposal/connected.patch` combines the frozen checked/unchecked decoder with the original shared preparation and its four affected runtime entry points. Decoder-only integration is not proposed. Missing short-account runtime coverage is recorded as a validation limit, not treated as evidence that the recovered original operations should be omitted.

The source base is the 37 current Pump compiler inputs bound to candidate `2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`; publication `49388202c7a3de76f326f59916eccaf44c343ed7` did not change them. The source snapshots and exact before/after maps are included. Only `trade_types.rs`, `trade.rs`, and `multi_hop_curve.rs` change. Cargo files, the program README, all other Rust modules, typed contexts, instruction dispatch, and all existing explicit reconstruction conditions remain unchanged. There is no new module or compiler input. `accepted-input-ownership.json` also verifies all195 current source, documentation, harness, fixture, captured-program, additional-input and build-helper bindings and assigns their ownership for the proposed scratch run.

The frozen decoder packet and frozen preparation packet are copied with their original manifests under `prior/`. Their seals are recorded in `prior-origins.json`. `integration-ledger.json` adds current source-use mapping and fresh original wrapper/call evidence. No old seal is edited.

## Every current trait consumer

There are four fields typed as `Account<BondingCurve>`, covering six instruction entrypoints:

| Current field | Entry points | Trait use and change |
|---|---|---|
| `create.rs:16`, `Create.bonding_curve` | `create` | unchecked reader after `init`, declared space166; no preparation added |
| `create_v2.rs:19`, `CreateV2.bonding_curve` | `create_v2` | unchecked reader after `init`, declared space166; no preparation added |
| `trade.rs:18`, `SellV3.bonding_curve` | `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` | checked reader; shared preparation inserted at the start of each body before `check_quote` |
| `multi_hop_curve.rs:34`, `CurveHop.bonding_curve` | `multi_hop_curve_swap` | checked reader for each hop; existing preparation delegates to the shared helper after its explicit short-account fence |

The exact source references and entrypoint declarations are recomputed, not inferred from type-name proximity. Legacy buy/sell/v2 contexts use their distinct `LegacyCurve` AccountDeserialize implementation. Its `BondingCurve::deserialize` call is the separate derived Anchor/Borsh payload reader; replacing `AccountDeserialize::try_deserialize` does not change that method. `nested_create` constructs a BondingCurve through its own versioned reader. Distribution, sweep, setter, migration, and minimum-distribution contexts use their own account types. No direct reload, `Account::<BondingCurve>::try_from`, or additional BondingCurve trait invocation appears in current source. Exporting a public type does not imply a further on-chain caller.

The inventory is lexical source/declaration analysis. It does not inspect the business semantics of excluded sell_v2 fee, incentive, or old extension implementations. Their source bytes remain unchanged.

## Original shared V3 parser and preparation

The three original V3 instruction wrappers have exact instruction log literals and all call **the same** parser `0x102578` and exit `0x107b38`:

| Original instruction | Wrapper | Parser call | Body call | First body call |
|---|---|---|---|---|
| BuyV3 | `0x1286c8..0x128c28` | `0x128808` | `0x128930 →0x147ba0` | `0x147c08 →0x3cd50` |
| BuyExactQuoteInV3 | `0x128c28..0x129188` | `0x128d68` | `0x128e90 →0x1489f8` | `0x148a60 →0x3cd50` |
| SellV3 | `0x129188..0x1295c0` | `0x129288` | `0x1293a8 →0x14a8a8` | `0x14a910 →0x3cd50` |

Each body loads the curve from `accounts+40`, passes System from `accounts+112`, and payer from `accounts+64`. Preparation is the first direct body call. A result tag other than2 branches to the existing error path before later mode/quote work. This extends the prior Buy-only proof with actual Sell/Exact wrapper identities and argument setup; it does not substitute an unused generic helper.

For routing, `0x129888→0x567d8`, `0x57438→0x5b3b0`, then its first call `0x5b428→0x3cd50`. The arguments are the curve at `hop+16`, System at route context+80, and payer at route context+24. The ledger retains 13 full or explicitly bounded new windows and all 14 direct original callers of preparation. Ten other callers remain opaque; their bodies are not reinterpreted or edited.

The preparation packet proves the complete helper `0x3cd50..0x3d250`, its rent helper `0x3d250..0x3dd78`, and immediate targets/data/lifetimes. The proposed shared function uses exactly that contract:

1. Read current account length through a temporary AccountInfo clone; end that temporary before rent work.
2. Fund rent for `max(current_size,166)` even for already-long accounts. Stored quote zero selects native reserve protection: checked creator+protocol fees, then checked real quote+fees. Nonzero stored quote protects zero lamports. There is no base-token-program or extension interpretation here.
3. Obtain Rent; subtract protected funds from lamports saturating; transfer the exact positive shortfall from the ordinary payer through the System program. Use the actual CPI, with no synthetic PDA signature or signer substitution.
4. Only after successful rent preparation, grow a short account to166 using `realloc(166,false)`. Do not overwrite or reload the decoded state. Keep temporary Ref/AccountInfo lifetimes out of the CPI/realloc interval.

The two checked additions retain separate natural error construction sites. Historical source filenames/line numbers are not forged. The Source/SDK correspondence is grounded in the retained locked packages, but this does not predict exact compiler specialization or full original machine-code equality.

## Decoder, cursor, errors, and initialization

The copied B1 proposal retains all19 fields and nine original layout buckets. Checked decoding verifies the header before moving the byte cursor; unchecked decoding skips an existing eight-byte header without comparing it. Both preserve `InvalidAccountData` for their original short-header/payload failures and Borsh I/O conversion for malformed fields, rather than the current Anchor3001/3002/3003 substitutions. Missing tail fields have the proven zero defaults. Partial next layouts remain unconsumed. The packet's complete cursor/error proof is not replaced by an informal padded-buffer reader.

Anchor owner/lamports/borrow checks remain unchanged and precede decoding. Field-name decoration remains in the generated parser. The temporary data Ref is released before an Account holding an AccountInfo reference is returned and boxed. Advancing the decoder's slice therefore neither modifies account data nor leaves a borrow that prevents growth.

Original initializer chains are directly proved:

- Create: wrapper `0x1260d8`, parser call `0x126470→0x167528`, init call `0x168b30→0x16bdf0`, then `0x16d578→0x4238` unchecked Account reader.
- CreateV2: wrapper `0x1268a8`, parser call `0x126fe8→0xac6c8`, init call `0xae018→0xb3b90`, then `0xb5318→0x4238`.

Both reach unchecked decoder `0x9b430`. The current init declarations retain166 bytes. For any valid166-byte payload, old and proposed unchecked readers decode the same19 fields. In particular the canonical zeroed newly allocated payload has the same zero/false/default-key values. The changed local cursor is discarded by Anchor's wrapper. No initializer body, authority, allocation constraint, Mayhem path, or success fixture changes. This is a decoder-preservation argument plus retained existing tests, not a new claim of complete initializer coverage.

## Explicit fences and real behavior changes

Current V3 bodies have no account-length fence or growth operation. Decoder-only installation would admit49–165-byte states without the proven preparation, so the patch includes that prerequisite. Rent funding is intentionally added before all existing V3 quote/mode/amount checks. This can change balances, inner instructions, failure precedence, and logs for underfunded accounts even when they already have166 bytes. That is supported original behavior, not incidental noise to suppress if an existing receipt fails.

All current explicit reconstruction conditions are preserved. `fence-ledger.json` records all11 reconstruction `require!` statements byte-for-byte inside the macro, in their original relative order. The route's `require!(info.data_len() >=166, ReconstructionBranchUnsupported)` stays **before** shared preparation, in a short scope so its AccountInfo clone ends before the helper. Calling growth first would make this condition always pass and silently remove its meaning. For admitted route accounts, it is a pure successful boundary check and preparation still precedes mode/quote work at the original point. For short route accounts, the retained reconstruction rejection is deliberately not original behavior; full short-route parity remains unclaimed. Decoder error precedence can now reach that existing rejection, and this is explicitly outside the route's accepted size domain.

No artificial new short guard is added to the V3 bodies. The unaccepted Buy composition's separate domain fence is not installed or removed. There is no compatibility dispatch or fallback parser.

The configured-fee372 and exact-quote352 saved reports each expose only166-byte original curve snapshots. They do not prove short-curve behavior. The three V3 bodies now have a source-supported path for those historical layouts, but no new short/underfunded fixture is run. The 117 historical Buy rows remain mandatory unchanged assertions inside the existing corpus, not additional coverage. A failure in that corpus must be preserved and explained before any promotion; it must not trigger receipt rewriting, source variants, or automatic removal of recovered preparation.

## One-build and regression plan

`build-and-regression-plan.json` is the concrete gated plan. It retains exact existing build/runner sources and hashes. After parent approval, prepare one isolated37-input source snapshot, apply only this three-file patch, and run the established v1.44 compile/v1.52 strip recipe once with isolated target, SDK links and RUSTUP_HOME. Keep Cargo/profile/dependencies unchanged; verify the252 locked public packages/14,281 known files and recorded tool/SDK identities before and after. The captured original is comparison input only after compilation. Deployment keypairs must be excluded before reads/hashes/archives.

On successful compilation with no backend stack failure, recompute actual decoder/preparation/call/data proofs and the existing1840-byte serializer/all25-target/discriminator and error-metadata gates using fresh symbol locations. Preserve any codegen residual rather than claiming historical Rust identity. Then run all existing40 differential suites (9,269 comparisons) and28 Surfpool runners (1,024 comparisons), with ordinary signatures, PDA provenance, history controls and unchanged assertions. Expected-source-map adapters are provenance-only copies, and all legacy embedded maps remain accurately labeled.

Stop on a concrete compile/static/runtime discrepancy, retain complete numeric exits/logs/receipts, and return for review. No retries, flag/compiler/layout variants, new fixture, main promotion, or full-ELF claim is implicit in this proposal. Both static evidence and new-domain validation limits remain visible in the eventual handoff.

The early review initially withheld a connected proposal solely for absent short-state receipts; parent review clarified that original-supported behavior changes are the goal and that missing coverage is a limit rather than a source blocker. This final packet therefore supplies the connected patch and preserves the coverage distinction. Two static inventory-script mistakes (an overbroad field-name filter and null receipt data) are retained under `failures/`; they caused no source build or transaction.
