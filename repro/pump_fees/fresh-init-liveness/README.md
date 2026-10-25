# Fresh FeeConfig setup liveness, captured Pump Fees ELF

This package executes the captured Pump Fees ProgramData (`4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`) and the checked-in official IDL (`6b9fa3eccc6e06273076a47b581f9fcb9e531bb7c3c88acbcd44db55a4002b29`). It preserves the same raw receipt as the private lab, SHA-256 `283ce63c6562e7e8fa6a442dfa13882512d54be5d97e2b52793436ac53634e40`. It does not assume that the reconstructed Fees source is historically exact.

The [replay](replay.py) uses a deliberately **unsigned local simulation** for `initialize_fee_config`: the required fixed admin has synthetic lamports but no private key, the transaction's signature results are `[true, false]`, and signature verification is disabled for that initializer only. A normally signed disposable-admin control fails `6001 InvalidAdmin`. The original ELF creates a 2,512-byte FeeConfig with no regular or stable tiers. Eleven subsequent fee queries use verified signatures in fresh signature-verifying VMs. The non-pool query succeeds; pool regular, stable, WSOL and USDC queries panic on empty tiers.

With only the stored admin bytes locally changed to a disposable signer, signed updates populate both vectors. The regular query then succeeds, while the stable query still panics on the legacy-size allocation. A signed `extend_fee_config` using the IDL's read-only funding `user` meta fails `PrivilegeEscalation` when the user is distinct from the fee payer. Marking that same user writable succeeds, reallocates to 4,097 bytes, and restores both query paths. The [saved verifier](verify.py) checks the [package manifest](manifest-sha256.json), 21 signatures in signed controls, transaction bytes, state hashes, exact tier/size transitions, errors and return data. It cannot turn the unsigned initializer into a valid mainnet signature.

The [read-only finalized snapshot](live-finalized-configs.json) at slot **461143975** contains extended nonempty FeeConfigs: Pump **1 regular / 1 stable**, PumpSwap **25 / 25**. The [ProgramData header check](programdata-head-check.json) at the same slot found the pinned last-deploy slots unchanged; it did not rehash full live program bytes. No current empty live config, user-fund loss, or permissionless exploit is claimed. This is a conditional privileged-setup liveness and IDL/client-meta issue. The two already configured live PDAs do not exhibit the failing state.

Run with the repository's pinned `solders==0.27.1` dependency:

```sh
python3 repro/pump_fees/fresh-init-liveness/verify.py
python3 repro/pump_fees/fresh-init-liveness/replay.py
```

`replay.py` rewrites only its own local receipt from deterministic isolated tests. It never calls a public RPC or broadcasts a transaction. The account snapshot and header were captured earlier with read-only finalized `getMultipleAccounts` requests; they are fixed inputs to this package, not refreshed by replay. The copied fixtures and helper are included so the package is reviewable without the private lab.
