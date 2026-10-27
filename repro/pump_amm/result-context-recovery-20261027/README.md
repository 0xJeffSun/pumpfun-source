# Shared trade results and account constraints

The maintained candidate `4e92463b170186f499a47be5424543af38aad88cc1a04db27de0aa35dae31d70` matches **572/785 normalized original windows**, with **115 raw matches** and **213 unmatched windows**. All previously matched windows remain. Matched original text is **618,832/1,162,040 bytes (53.3%)**; whole-ELF equality is false.

This checkpoint reconstructs the shared 96-byte buy result, the two-stage exact-quote preview, and the native 32-byte optional decoded transfer-fee record. The complete 296-byte preview helper matches the original under unchanged normalization. Transfer-fee data is decoded once, and gross input uses the original pre-fee arithmetic. The result builder and several fee helpers still have instruction differences; they are not counted as matched.

It also restores two omitted mint/token-program ownership constraints during pool-account validation and validates the fee-config PDA using its stored bump. The original 15,624-byte CreatePool account parser and 464-byte PDA creation helper now match. The retained 21 signed cases demonstrate 18 failures of the prior checkpoint: invalid mint/program combinations and incorrect fee-config bumps could reach the handler or even succeed. The corrected candidate matches all 21, including handler-error collisions and valid controls.

```sh
work/test-env/bin/python -B repro/pump_amm/result-context-recovery-20261027/verify_saved.py --current-source
```

The saved verifier authenticates the 41 source files, pinned build, signed receipts, original/candidate identities, and independent static comparison. It verifies the full 17,462-case corpus (35,074 executions and 35,418 signature fields), plus 1,281 account/fee cases, 273 legacy trade cases, 1,996 boundaries, 72 buyback cases, 91 controlled CPI cases, 18 liquidity cases, 40 square-root cases, 134 focused transfer/preview cases, 58 mint-policy cases and the 21 new context cases. Groups may overlap in coverage. Recorded logs exclude only compute lines and exact source coordinates; omitted logs in older harnesses remain a limitation.

Paired direct-call closure covers 507 original windows and 1,302 pairs; 265 windows exclude indirect calls and 72 exclude static/external/indirect boundaries. All 620 bounded literal observations match. These claims do not cover arbitrary static data, unknown indirect calls or external implementation identity.

The full corpus uses eight isolated workers, preceded by a smaller changed-path gate. No extra dependency or compiler change was needed. Tests are local signed simulations; malformed or synthetic fixtures are deliberate, and none establish live-chain acceptance.

Remaining work includes 213 unmatched windows, the complete TradeV2 account layout, exact result/fee helper code, full readonly-data and indirect-call identity, and historical source/build provenance. The separate create_config audit has no authentic successful administrator replay. This is an intermediate reconstruction, not a completed byte-identical contract.
