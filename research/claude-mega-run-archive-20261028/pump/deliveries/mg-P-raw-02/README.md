# mg-P-raw-02: mg-P-raw-01 link recipe + lib.rs `mod` order = original codegen order (L28)

## Source change (line-neutral: lib.rs lines 1-66 only, same statements, same line count; nothing else moves)
The `pub mod` / `pub use` declarations at the top of lib.rs are reordered to the original module order
(buy_v2, create_v2, creator/{admin_cto, collect_creator_fee, distribute_creator_fees, minimum, distribute_fee_to_holders,
migrate_bonding_curve_creator}, set_creator, buy.rs, extend_account, migrate, migrate_v2, multi_hop_curve_swap, pump_quote,
quote_control, sell.rs, sell_v2, set_reserved_fee_recipients, sweep_fees, token_incentives (+incentives, volume_sync),
trade_v3, util/*, then the rest). No `macro_rules!` in the crate, so mod order has no name-resolution effect.

## Why (binary evidence)
rustc codegens a CGU in `items_in_deterministic_order`: non-local instances (sorted by symbol name) first, then local
items by DefIndex (= AST order: `mod` declaration order, then item order in files). The original's main-object .text
order IS that order; its local part runs through the module files alphabetically (buy_v2 0x14910 .. create_v2 0x17cf0 ..
creator/admin_cto 0x22a10 .. migrate 0x3fb70 .. migrate_v2 0x49888 .. multi_hop 0x567d8 .. pump_quote 0x60a80 ..
trade_v3 0x7e0b0). Our lib.rs declared multi_hop_curve first, etc.
.text order is fixed by the generated ordered.ld anyway, but merged constant sections are NOT: every `error!(PumpError::X)`
passes `&PumpError::X` (a promoted 4-byte constant -> .rodata.cst4) to PumpError::name, and lld (-O1,
MergeNoTailSection) lays merged pieces out by xxh3 shard, then FIRST-OCCURRENCE order (= rustc creation order = codegen
order). Model verified: both ELFs' cst4/cst8/cst16/cst32 sections are shard-sorted under xxh3_64 (tools/cst.py).

## Result (score.py vs L28 inventory; two-pass build == link replay: 266d5bf2... / 3d99f4db...)
normalized 987 (0 gains, 0 losses), raw 204 (+38 vs L28, 0 raw losses; = mg-P-raw-01), runtime_valid.
End-state prediction (tools/prawready.py): raw-ready 922 -> 952/987 (merge_order windows 41 -> 10; cst4 shards
differing 23 -> 12). Remaining cst4 differences are mostly consequences of unmatched windows (admin_cto 0x22a10 first-uses
88/92, 83/89, 93/95; sell.rs 0x6cd78 72/73; migrate_v2 0x49888 110; trade 0x14a8a8 "sell") plus: create_v2.rs item order
(execute before nested_create in ours), fee_recipient.rs nested in sell.rs (original: own file before migrate.rs),
early creation of PumpError 42 (original creates it before 4/5: a non-local closure instance), RouteFeeConfig's
AccountDeserialize creating &ErrorCode 3001/3003 (original never does).
