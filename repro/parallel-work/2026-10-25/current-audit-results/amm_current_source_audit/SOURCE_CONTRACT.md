# Natural source hypothesis: current AMM configuration

This is a contract for the included candidate source, not proposed replacement code or original source identity.

Premises: standard signer/owner/PDA/System creation rules; fresh allocated bytes zero; ordinary locked Anchor generation and Borsh fixed-field serialization; fallible operations propagate; transaction rollback on failure; no alternate valid config in the initial state or introduced by historical/upgrade code. Allocation, serialization, clock, compute and event CPI can fail. The success contract does not require proving every failure implementation.

1. Admit fixed admin signer, mutable payer, canonical global_config PDA with canonical bump, System program and generated event accounts. Create a rent-funded 949-byte AMM-owned allocation, including handling a prefunded System allocation through allocate/assign.
2. Decode zero latest-layout GlobalConfig. Store admin; validate-and-store LP<=1000; protocol<=1000; all eight recipients nonzero and strictly ascending; creator<=1000. Explicitly zero disable flags; store caller-selected creator authority. Other fields remain zero/false.
3. Obtain timestamp once. Serialize the same immutable fixed-field event by borrowed reference for log then self-CPI. On successful body, serialize config discriminator and 941-byte fields. Any error is not successful committed initialization.
4. Fee update admits existing typed mutable config and its admin signer. Perform the same four ordered setters and creator-authority assignment, then borrowed log/self-CPI. Do not reset unrelated fields. This accepts the same successful scalar/recipient set as the old candidate but has changed failure order and payloads.

Consequences under premises: this creation transition cannot create a second configuration address; unauthorized keys cannot initialize; configuration setters do not alone prove downstream Fees selection/creator policy or asset conservation. Current code's single creation transition plus existing-state mutation preserves the stated initial singleton condition. This is not proof that the deployed captured original has that initial condition.

The exact implementable fragments already exist in inputs/programs/pump-amm/src/lib.rs:44-64,186-202; state/global_config.rs:5-31; instructions/admin/create_config.rs:4-26. They are evidence copies, not program edits. Missing conditions must not be added to claim original parity.
