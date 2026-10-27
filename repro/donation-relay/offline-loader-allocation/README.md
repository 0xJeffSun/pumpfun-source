# Offline upgradeable-loader allocation

Installed solders0.27.1/LiteSVM successfully executes real signed buffer creation, initialization, writes and `DeployWithMaxDataLen` transactions using the unmodified, compressed Rust-build candidate from [access-control-layout-artifact](../access-control-layout-artifact/README.md). The loader creates the additional account capacity itself. No ELF padding, `add_program`, `set_account`, RPC connection, or network account is used.

The maximum payload capacity is calculated from the initial deployment capacity plus the five extensions in [allocation-provenance/report.json](../allocation-provenance/report.json), and checked against that report's derived and captured capacities. It is not a hardcoded padding target.

The recorded local run completed912 signed transactions: buffer creation/initialization,910 writes of up to900bytes, and program creation/deployment. The input818280-byte ELF is copied unchanged. The resulting ProgramData account is830493bytes, including45metadata bytes. Its830448-byte payload contains the exact input followed by12168loader-allocated zero bytes. Deployment consumed2820CU within a normal1400000CU transaction limit. Every transaction fits1232bytes; signature and recent-blockhash verification are enabled.

## Verify

Default verification is standard-library-only, read-only and static. It hashes the source, frozen receipt and dependency inputs; checks compressed candidate length/hash; independently recalculates capacity from the provenance report; and checks receipt consistency. It does not execute a compiler, loader or VM, and does not rederive a runtime-produced payload hash.

```sh
python3 -I -B repro/donation-relay/offline-loader-allocation/verify.py
```

To execute all transactions again in a fresh, in-memory local VM and compare the complete result/transaction receipt list with the frozen receipt:

```sh
work/test-env/bin/python -B repro/donation-relay/offline-loader-allocation/verify.py --execute
```

The second command requires the existing solders0.27.1 environment. Neither mode writes files or modifies public packets. The optional execution consumes only local synthetic balances. The fixed seeds are public test fixtures, must never hold real funds, and have no relationship to the captured network accounts. The VM's transaction-history cache is disabled, while transaction signatures and recent blockhash are checked.

## Limits

This is allocation reproduction, **not byte-identical program completion**. The selected compiler ELF still differs from the original; the frozen local payload hash is `702fba4e9643343b7824aa2fc2bcc31d9cb31dcc6a31b3e4edc470097dc8e7af`, and original-payload equality remains false. Once the meaningful compiler ELF is exact, this verified loader path can create the required trailing allocation without editing compiler output.

The prototype deploys directly with the final derived capacity. It does not reenact the historical546944-byte deployment and subsequent extensions/upgrades. Synthetic program IDs, authority, slot0, lamports, and current installed VM feature set differ from historical mainnet. Full ProgramData metadata/history identity and historical-runtime equivalence are not claimed. The frozen receipt is local execution evidence, not a network receipt or independent third-party attestation. The compiler artifact's provenance remains governed by its parent packet.
