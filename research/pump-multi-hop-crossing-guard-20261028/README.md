# Pump multi-hop crossing guard

A multi-hop buy that would exceed the curve's remaining base reserves must reject a whitelisted user with `NotEnoughTokensToBuy` (6021). L38 instead ran the post-completion estimator and could succeed, change balances and emit three events. This packet adds the original observed crossing guard before that estimator:

```rust
require!(!c.is_mayhem_mode && a.user.key()!=a.global.whitelist_pda,
         PumpError::NotEnoughTokensToBuy);
```

`source.patch` changes only the live per-hop region in `programs/pump/src/multi_hop_curve_swap.rs`. The guard is placed at the original observed Anchor Source line 599; existing operations are moved through existing blank lines so later Source sites remain stable. This positioning is disclosed reconstruction work, not a claim to historical source text. The earlier Mayhem rejection remains in force.

The original ELF checks the curve's Mayhem flag and compares the user's key with `Global.whitelist_pda` (Rust layout offset `0x288`), sharing the 6021 / Source-599 error block. The original function window is `0x5b3b0`, 18,584 bytes. Its complete deployed ELF is frozen with this packet. Authenticated open PR #559 / L39 was inspected at head `44697701d734c93a2e2321e850d62d368627c328`; its per-hop file has no whitelist reference. That PR's shared-helper changes are separate from this fix.

The eight focused cases vary crossing versus noncrossing reserves, whitelist membership and input amounts of 100,000,000 or 1,000,000,000. Both images match the original in the six controls. In the two whitelisted crossing cases, the exact L38 control succeeds and emits three events; the original and fixed image return 6021, emit no events and roll back program state. The transaction payer still pays the normal 5,000-lamport transaction fee. The fixed image matches the original's complete compared errors, prestate, poststate, event bytes, inner instructions and return data in all eight cases.

These are synthetic local fixtures, executed through the captured AMM's real CPI into Pump. Each of the 24 outer transactions has an ordinary test-owned signature. The verifier independently checks every Ed25519 signature, the AMM outer instruction, the Pump CPI at stack height two, and the AMM global-config controller's absence from the outer signers. No zero-amount Pump coverage is claimed.

Both local crates were explicitly cleaned for the SBPF release target and freshly compiled. The exact L38 baseline reproduces the supplied official native-control hashes. Both builds retain the same **1018/1035 normalized and 166 raw** window memberships. The live per-hop body changes, but remains unmatched: **zero function-window gain and whole-ELF equality remains false**. No SDK, registry, emitted-byte or comparator changes are included.

Run the self-contained artifact, signature and census verification:

```sh
python3 -I -B research/pump-multi-hop-crossing-guard-20261028/verify.py
```

Replay all 24 signed transactions from frozen prestates and deployed ELF inputs in fresh VMs (requires the recorded `solders` runtime dependency):

```sh
python3 -B research/pump-multi-hop-crossing-guard-20261028/verify.py --replay
```

The portable replay needs no original fixture imports or network access. The initial fixture producer and its log are retained for provenance. Build source archives, exact compiler commands, clean/build logs, source/tool receipts and both stripped and unstripped images are archived under `builds/`. `MANIFEST.json` binds the packet's files.
