# Pump L33 v3 sell: partial source recovery

**No new exact function window. Whole-ELF byte identity remains false.** This research packet preserves the recovered call order for original `0x14a8a8`; its body shrinks from L33's 8,160 bytes to 6,128 bytes, against 6,032 bytes in the original. It is not a maintained checkpoint and does not edit `programs/pump` or global census documentation.

The source uses the original `v3_trade_fees`, `post_fee_amount`, `apply_sell`, transfer and fee-accrual boundaries. It applies reserves before base transfer, reloads and synchronizes whitelist vaults, initializes the volume account after base transfer, constructs the event from the real volume account, and emits the same event without cloning it. `source.patch` applies to the frozen L33 archive at `3719d910d297ad62497e2ef1b12e263d2059f2ae`. Shared transfer helpers remain unchanged.

`call-order.json` records the real incoming wrapper edge and pairs every direct outgoing call with its original. Each paired callee is independently equal under the repository's existing narrow normalization; this does not claim the parent body's equality. The parent still differs in 668 instruction slots, chiefly register/stack/block placement.

The eight-case replay covers SOL and Token-2022 quotes, ordinary and whitelist users, and normal and mayhem curves. All eight compare errors, accounts, inner instructions, event payloads and return data exactly, using genuine dependency CPIs and verified signatures. The saved report binds the unstripped ELF. This is a raw LiteSVM subset; the full captured-loader 44-suite corpus has not been run for this packet.

```sh
python research/pump-l33-v3sell-progress-20261028/verify.py
python research/pump-l33-v3sell-progress-20261028/replay.py --candidate research/pump-l33-v3sell-progress-20261028/unstripped.so --output /tmp/v3sell-replay.json.gz
python research/pump-l33-v3sell-progress-20261028/rebuild.py --sdk /workspace/toolchains/v1.44 --registry-home /path/to/cargo-home --output work/v3sell-rebuild
```

The native Linux v1.44 build uses the official `sbpf-solana-solana` libraries, both `cdylib` and `lib` crate types, `--locked --offline`, the physical-source wrapper, and `-Zremap-cwd-prefix=`. The original ELF was analysis input only. Both Pump and the nested `pump-token-ext` crate were freshly compiled from L33; no registry, SDK, shared target, original bytes, or published packet was modified.

L33's synthetic Source positioning is retained and disclosed: the same real amount check is placed at line 1127 and the same minimum-output check at line 1148, as recorded in the original; the real Overflow closure remains at line 1155. `trade_v3.rs` stays 1,295 lines. There are no fake checks, unused matching functions, padding instructions or binary edits.
