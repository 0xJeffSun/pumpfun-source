# Pump `set_mayhem_virtual_params`: signer boundary

This package narrows the missing handler's reachability. It adds **no Rust
handler**, no positive CPI for this selector, no byte-equality claim, and no
vulnerability claim.
The Pump IDL requires account 0, `sol_vault_authority`, to be a writable signer
at Mayhem's `[b"sol-vault"]` PDA. That address is
`BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s` (bump 253, off-curve).
[Solana's PDA rules](https://solana.com/docs/core/pda) mean only the Mayhem
program can supply its signer privilege through an `invoke_signed` CPI.

At finalized mainnet slot **461116128**, `getMultipleAccounts` captured the
actual token vault, Token-2022 mint, Pump Global and BondingCurve for mint
`DKsuJCZ3d3mLcNR3vPCb83qhDzS1YxR6XMvd8GWmpump`. The compressed raw account
response is `account-snapshot.json.gz`; its slot and per-account hashes appear in
`signer-boundary.json`. A normally signed local LiteSVM transaction fed those
accounts to the captured Pump ELF (SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`).
The target reached `sol_vault_authority`'s **ConstraintSigner 2002**. All seven
watched nonpayer accounts were unchanged. The signer account was correctly
marked *non-signer* in the outer instruction; no signature was forged.

Two successful public creation transactions, at slots **461115028** and
**461114637**, invoke Mayhem `InitializeMayhemState` from Pump `CreateV2`.
Their full `getTransaction` result bodies are retained in
`mainnet-createv2-traces.json.gz` and checked by the replay script. Neither
contains `SetMayhemVirtualParams`. These are two samples, not proof that the
instruction never runs. The first trace creates the same mint used by the
account snapshot. The archive also retains each raw signed v0 transaction;
both transactions' Ed25519 signatures verify offline. RPC execution logs are
public observations and are not themselves cryptographic attestations.

A later [finalized trade-CPI packet](mainnet-trade-cpi/README.md) independently
pins one genuine Mayhem → Pump `buy` and one `sell`. In both, Mayhem's
`sol-vault` PDA is Pump's user, is not an outer signer, and moves the exact
watched token/lamport amounts encoded in the Pump inner instruction. That
positive **trade** route does not include `SetMayhemVirtualParams`; this
package's negative-reachability qualification for that selector remains.

The original Mayhem ELF (SHA-256
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`)
was independently imported into Ghidra 11.0.3 with the eBPFSol processor.
The `initialize_mayhem_state` dispatch calls wrapper `0x80ef0`, its context
parser `0x692f8`, and body `0x82938`. The retained wrapper/body decompilations
show state initialization and a Clock helper call, with no direct Pump CPI in
that body. Decompiled C and inferred function boundaries are diagnostic;
runtime traces establish the two observed executions. Shaw's pinned
`4ffe8bd88761059693e481ae972443c10204f7af` source implements 24 of 25
identified Mayhem handlers; the initializer is absent there, and its recovered
trade handlers sign separate Pump buy/sell CPIs.

Replay offline with the saved snapshot and the captured Pump ELF:

```sh
python3 scripts/pump_set_mayhem_params_signer_boundary.py \
  --target /absolute/path/to/evidence/original/pump/deployed.so
```

The script checks both saved mainnet creation traces and their transaction
signatures, derives every account address, verifies the synthetic payer's real
signature, executes the original
Pump code with signature and blockhash checks enabled, verifies error 2002 and
unchanged watched accounts, and writes `signer-boundary.json`. Optional
`--capture` refreshes only the public account snapshot via read-only RPC.

A positive differential needs a **real Mayhem instruction path** that invokes
this Pump selector while signing `[b"sol-vault", bump]`. No such path has been
established. The current result does not justify implementing or counting the
handler, and does not rule out a different Mayhem state or path. No mainnet
transaction was sent; the live calls above were read-only RPC requests.
