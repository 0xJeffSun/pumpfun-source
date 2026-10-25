# Ordinary route and nested-creation prerequisites

All five independent CLI workers completed from checkpoint `4d3c19e`. Their unchanged seals and evidence are retained below. Root read each report and ran each verifier from a separate copied directory; selected assembly instructions were independently rebound to the full captured Pump ELF as recorded in `root-frozen-bindings.json`. These are static contracts with explicit imported runtime and exceptional-path limits, not exhaustive semantic proofs or accepted broader handlers. No program source, runtime cases or completion counts change.

| Package | New evidence | Remaining prerequisite |
| --- | --- | --- |
| [Fee decoder](pump_route_fee_decode/REPORT.md) | Route FeeConfig decoder, both vector layouts, selector length gates/rates and local numeric error ordering | Full context admission, allocator and error ABI |
| [Vault admission](pump_route_vault_admission/REPORT.md) | Ordinary Tokenkeg address/owner/mint order, no-creation caller, raw account layout | Upstream program checks, downstream authority/runtime contract |
| [Transfers](pump_route_tokenkeg_transfers/REPORT.md) | TransferChecked bytes/metas, initial/previous/current signer seeds, invocation and borrow ordering | Native endpoints, processor/runtime, error conversion |
| [Event wire](pump_route_event_wire/REPORT.md) | 401-byte event / 409-byte self-CPI, clone effects; trailing u64 is quote-adapter difference on this route, zero for ordinary Tokenkeg | Upstream event authority/bump, exceptional paths and broader field semantics |
| [Nested creation](pump_nested_create_admission/REPORT.md) | Walk-local depth, account consumption, Curve/Pool selection and pricing composition | Remaining create context and full-handler admission; no guard removal |

The CLI total is now **46 completed tasks**, of which one earlier private-input audit result remains withheld. Prior packages and corrections remain immutable. Whole-core byte equality is still 0/4 and bounded handler coverage remains 140/150.
