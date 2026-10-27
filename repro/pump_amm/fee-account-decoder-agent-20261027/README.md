# FeeConfig decoder and caller-gate recovery

This isolated agent investigation uses the diagnostic-parity source checkpoint (`fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf`) as its base. It changes no maintained source and never uses the root agent's target cache.

The original FeeConfig decoder is identifiable from its exact discriminator and the `FeeConfig` account-name string. The 744-byte frontend at `0xd9dc0` uses direct short-discriminator error conversion and an account-name-decorated mismatch; the 1,176-byte unchecked decoder at `0xda0a8` performs ordinary Borsh decoding of two vectors plus the exotic fee triple. It has no allocation-size clearing. `static_evidence.py`, `evidence.json` and `original-decoders.asm` retain this evidence.

The first isolated patch removes the reconstructed decoder's field clearing and restores generated Anchor error construction. A real parent-built Linux v1.44 candidate (`f54d0256322f017bd01fb7f7c82c1c5390672102f2945eb8236c518a121cb437`) gains the complete unchecked decoder window. Its frontend has the original 744-byte size and differs only at two source-location constants. However, **this decoder-only candidate is not correct and must not be promoted**: 30 of the 1,050 focused cases differ in errors, token transfers or state. Six stable-quote cases and 24 exotic-quote cases expose the missing caller gates.

The original 1,656-byte fee-selection helper at `0x14088` applies those gates at use sites: minimum length 2,512 at `0x14230`, exotic availability above 4,096 at `0x145d8`, and stable-tier pointer/length availability above 4,072 at `0x14690` and `0x146b0`. `original-selector.asm` records the full helper. `caller-gating.patch` relocates the gates into `trade::fees`; `combined.patch` contains the decoder and caller changes against the base source. The corrected source lives at `work/amm-account-recovery-agent-20261027/source-caller-gating` pending its separate build and validation.

The probe covers six trading instructions, discriminator and length boundaries, compact Borsh accounts with empty/nonempty fee-tier vectors, and native/stable/exotic quote paths. `verify_probe.py` checks complete recorded outputs except compute/source coordinates, identical transaction messages, every Ed25519 signature, and sidecar log/error binding. The archived decoder-only negative result passes the verifier with exactly 30 expected mismatches and 2,100 verified signed transactions. Baseline source has zero differences over the same 1,050 cases.

`decoder-only/` preserves the negative candidate, build record/log, compressed observations and signed sidecar. This investigation establishes a concrete decoder recovery plus the location of its required caller-side behavior; it does not establish whole-program identity.

## Additional shared-selector obligations

The first caller-gated combination (`03df8937e0a6b15cb7c3a81e8ce4a24e0faadbef01a48c91edf12a9f4d5525fd`) passes all 1,050 FeeConfig cases with 2,100 verified signatures. Broader probes then established two further obligations, both visible in the same original selector:

- At original `0x144a0`, the global `creator_fee_configurable` byte is checked before reading/applying the pool override. A 30-case v2 matrix has 12 differences when this flag is false and the pool override is nonzero.
- The original selector is shared by v2 and multi-hop wrappers. A 168-case single-hop matrix has 66 differences due to missing multi-hop allocation gates and the same missing creator flag. The original wrapper call chains are `0x40a08 -> 0x44ab0 -> 0x14088` for AMM multi-hop and v2 bodies `0x53350/0x54a20/0x56710 -> 0x4fba0 -> 0x14088`.

`creator-guard.patch` and `multihop-gates.patch` add these checks. The complete prepared source is `work/amm-account-recovery-agent-20261027/source-all-fee-gates`; only `trade.rs` and `multi_hop.rs` should be taken from it when merging into a newer combined source. The root agent owns integration and final acceptance.

`selector-gate-negatives/` binds the intermediate candidate, all three observed matrices, their signed transaction sidecars and verification reports. `verify_extra.py` verifies the v2 and multi-hop matrices, including exact signed messages, errors and log hashes. These negative results are intentional evidence, not passing acceptance claims.

## Accepted guarded candidate

The root-combined candidate `2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd` passes all three focused matrices:1,050 compact/malformed FeeConfig cases,30 v2 configurability cases, and168 multi-hop size/configurability cases. All1,248 cases and2,496 signed transactions pass complete recorded output/log comparisons with only compute and source coordinates excluded. Same-message and signature checks, plus raw log/error hashes tied to each observed transaction, pass too.

`accepted-gates/` preserves this candidate, its build record, all reports, all signed sidecars and verification summaries. Root remains responsible for full-corpus acceptance and promotion. The decoder-only and selector-gate failures remain separately preserved to explain why the final changes are necessary.

## V2 whitelist ordering

A later probe found a separate v2 whitelist exemption outside the shared selector. Original wrapper `0x4fba0` compares the user to GlobalConfig's whitelist before calling `0x14088`. Matching users receive zero fees without executing the selector. This differs from the legacy post-computation exemption and from multi-hop, which has no such user exemption in the observed cases.

On the otherwise accepted guarded candidate,9 basic cases have3 differences, and24 ordering cases have12 differences. For matching users, original v2 trades succeed with zero fees even for a valid short97-byte FeeConfig, empty tiers, or overflowing configured LP fees; the reconstruction instead charges fees or returns6083/6082/6024. All66 signed transactions have identical message pairs and bound error/log hashes. `whitelist-negative/` retains these failures. `verify_whitelist.py` checks both matrices.

`v2-whitelist.patch` adds an early zero-fee return at `trade::fees` entry. It is intentionally not added to `multi_hop::fees`. The frozen variant is `work/amm-account-recovery-agent-20261027/source-all-fee-gates-whitelist`, pending root's combined build and acceptance.
