# Application boundary (not an integration patch)

`source/amount_selection.rs` is a complete, uncompiled Rust scalar helper proposal. Its result is valid only after original parser, preparation and mode-preflight success. It is not a complete BuyV3 implementation and must not replace the current handler by itself.

The natural intended signature change is from `buy(ctx, amount, max_sol_cost)` to `buy(ctx, amount, max_sol_cost, partial_fill: bool)`. The wrapper must pass `partial_fill.0`, not discard `OptionBool`. The authenticated final parser must be BuyV3's own context; do not change shared SellV3 or add a compatibility selector. `max_sol_cost` passes unchanged. No bytes or source are changed in main by this package.

After preparation and mode preflight, replace the ordinary proposal's three operations (unconditional min, zero check, requested-minus-min) with the scalar selection, using the original real reserve, mode byte, signer key and Global whitelist key. Keep both returned amounts alive:

```rust
let selected = select_buy_amounts(
    amount, a.bonding_curve.real_token_reserves, partial_fill,
    a.bonding_curve.is_mayhem_mode,
    &a.user.key().to_bytes(), &a.global.whitelist_pda.to_bytes(),
);
// Bind errors into the authentic handler's error construction here.
let BuyAmounts { curve_amount: amount, residual_amount: residual_base } = selected?;
```

The snippet is a typed application sketch, not a compilable Anchor patch: `?` requires the error adapter described next and context completion remains necessary. The helper's `mode_a2` input represents the existing decoded mode flag; its scalar branch is recovered but mode preflight and downstream effects remain opaque. Do not substitute the ordinary proposal's early `buy_domain` rejection or its incomplete mode checks for authentic preflight.

The adapter must map `BuyZeroAmount` to original Pump6020 with compared strings `("0", "0")`, from `(0u64, 0i32)`. Map `NotEnoughTokensToBuy { available, requested }` to Pump6021 with compared values `(available, requested)`, both u64, not their reverse. The current error names/messages agree with captured original materialization. An idiomatic Anchor expression is `Error::from(PumpError::BuyZeroAmount).with_values((0u64, 0i32))`, respectively `Error::from(PumpError::NotEnoughTokensToBuy).with_values((available, requested))`. These expressions do **not** restore the original error origin, so they are not certified complete adapters. The original origin strings and line values are recorded in REPORT and bytes, not fabricated into Rust with padding or manual location overrides.

Downstream input contract: original first constant-product call consumes selected curve amount at `148268`; the first quote/fee leg keeps that amount. `148098` saves residual in r8 across preflight; `1483a8` gates the residual path on r8 and `148478` passes it in r5 to `82af8`. The residual is not redefined by the flag and is not always `requested - curve_amount`: an oversized whitelist fill with the flag set has residual zero. Conversely, an oversized ordinary nonwhitelist request has residual `requested - reserve` under either flag value. Keep the residual per-leg fee, maximum cost, settlement and event contracts from existing evidence; this source fragment does not close them.

Composition: this packet owns only its publication paths. It adds no main destination or replacement file, changes no metadata and touches no other handler. A parallel metadata-only patch can coexist without textual conflicts. Any future integration must recheck parser order, error origins and the current main-source checkpoint. The captured Pump731003 source evidence is frozen, not an assertion about a later HEAD.
