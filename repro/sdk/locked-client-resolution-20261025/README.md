# Newly resolved SDK graph and offline named-account resolver

This package closes a specific reproducibility gap in the retained SDK integration manifest. It retains a new npm lock graph and authenticated archive bytes, then binds a bounded offline Anchor instruction-construction observation to the files loaded by that process. It does not recover the original deployed contract dependency graph or establish full SDK compatibility.

Run the read-only verifier with `python -B verify.py`. It uses the Python standard library, reads compressed archives in memory, and performs no network access, filesystem extraction, installation, JavaScript execution, subprocess launch, signing, or target program execution. It checks the retained observations; it does not rerun Node. Run Python without `-O`, because assertions enforce checks.

## Recovered evidence

| Item | Observed and verified scope |
| --- | --- |
| Exact input manifest | SHA-256 `20a9877f296b57df35c2a10493201a527a7fafb9515fb9bc9600f0da1558045d` |
| New lock | npm lockfile v3, SHA-256 `41d8bb8221af1754eda507211398e54132b391028d96aad9a0ecbe9520372a63` |
| Graph | 99 non-root lock placements, 91 unique registry archives, 15,817,698 archive bytes |
| Materialized files | 4,747 regular-file paths and hashes reconstructed from archive contents |
| Dependency references | 196 dependency/optional/peer edges; one absent optional peer, `node-fetch` to `encoding ^0.1.0` |
| Client versions | Anchor 0.31.1; root web3.js 1.98.0; Pump SDK 4.3.1; Pump Swap SDK 2.2.0 |
| Version discrepancy | Both SDKs resolve their own nested web3.js 1.99.0 placements; the root remains 1.98.0 |
| Observed resolver process | Node 24.5.0, 152 loaded CommonJS module paths, each hash bound to the authenticated archive graph |
| Named accounts | Buy has 23 and sell has 21 accounts. Nineteen supplied helper keys leave four buy and two sell defaults. Order, flags, keys, discriminator and argument bytes match the authenticated IDL |

The verifier recomputes the default PDA addresses with separate standard-library base58, SHA-256 and Ed25519 compressed-point math, and compares them with the previously saved Solders results and Node observation. The IDL bytes are equal in the two retained SDK archives. Supplied account keys are deterministic arbitrary public keys. They do not represent valid pool, mint, program, vault, token account or user state.

All archive SHA-256, SHA-1 and lock SRI values are checked. Archive package names and versions bind the lock placements. The graph's dependency edges record nearest available package resolution and declared ranges. The current validator does **not** independently implement npm semver/range acceptance or npm's complete resolver algorithm. The lock is an observed npm result, not an independent proof of every resolver choice.

## Execution and provenance limits

`launch.json`, `exit.json`, and raw logs record a metadata-only npm invocation with `--package-lock-only --ignore-scripts`. The input stayed unchanged and `node_modules` was absent at that stage. The recorded tool versions were Node 24.5.0 and npm 11.5.1. The package does not contain the complete npm implementation, full host loader or environment, so those records do not establish a historical execution environment.

Archive materialization copied regular files directly; it did not execute install scripts or create `.bin` links. Four lock placements declare lifecycle install scripts. The observed Node stderr explicitly reports that the bigint native binding could not load and that the pure JavaScript implementation was used. Native addon identity and npm-ci equivalence remain open.

The Node script invoked Anchor's named-account instruction builder with an empty remaining-account array. Its network/RPC traps recorded zero attempts. It did not call the SDK transaction wrappers, fee selection, remaining-account compatibility logic or a target runtime, and did not sign or submit transactions. The zero execution/signing/submission fields are scoped to this inspected script and saved process observation. These observations do not prove an operating-system network sandbox.

`resolver-checked-run/result.json` binds the test source, raw process streams, 4,747 before/after file hashes, and 152 loaded module hashes. This publication contains the files and hashes needed to audit that observation, rather than an installed tree. `frozen-sdk-archive-bindings.json` records equality to three prior SDK archives; local validation checks the retained hash bindings but does not reread the referenced external original files.

Three materialization preflight failures were retained or summarized in `materialization-first-failure.json` and `preflight-failures.json`. The latter is an author summary, not a raw process receipt. The final materialization accepts ordinary package/name archive roots plus one exact hash-pinned legacy `@types/node 12.20.55` root named `node v12.20`. Earlier scripts are retained as execution history; they are not the recommended replay interface.

## Remaining work

- Recover the actual historical installed SDK graph and build environment if a historical compatibility claim is required.
- Independently validate npm semver edges and any optional/native resolution choices relevant to a future SDK wrapper test.
- Audit the previously unexpanded SDK helper and wrapper sites, actual remaining-account routes, fee state and valid pool/mint/token state.
- Preserve the distinction between this client instruction-construction evidence and target program acceptance, compiler reconstruction and whole-binary byte identity.

No source contract, selected candidate artifact, status selection or active program input is changed by this package.
