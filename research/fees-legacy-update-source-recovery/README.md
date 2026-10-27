# Legacy Fees update recovered from Rust

The complete legacy update handler at original address 193400 (5,672 bytes)
and its finishing helper at 205768 (5,640 bytes) now match under the existing
instruction normalization. All 59 direct calls from those functions match
original callee bodies. The verifier also checks all 40 relocated data uses,
including source paths, Rust Locations, formatting tables and event constants.

This raises Fees coverage from 570 to **572/585 normalized original functions**.
All earlier normalized and raw matches, equal source Locations and positive
callee observations remain intact. There are 143 raw local matches, 170 equal
Location observations and 3,729 equal direct-callee observations. **13 original
functions remain unmatched; whole meaningful ELF and whole capture are unequal.**

## Reconstructed source structure

The original finishing helper receives the accounts pointer, event-authority
bump and new-shareholder vector. Its body validates shares, updates the sharing
configuration, and emits the ordinary and CPI events. The previous source put
validation in a separate helper and inlined the remaining work into the caller.
Moving these operations into a Context-taking Rust helper reproduces the full
instruction sequence. The caller then has the original complete shape too.

Embedded source constants place both routines in
`instructions/fee_sharing/update_fee_shares.rs`: caller checks at lines 129/130,
share checks at 258/259/269/291/292. Ordinary Rust source placement reproduces
those constants; blank lines preserve the independently recovered event layout.
The recovered helper name is descriptive, not a claim about historical spelling.
No assembly, binary patch, manufactured Source object or extra mask is used.

## Reproducibility and validation

Two independent root builds from the same 43 inputs reproduce candidate SHA-256
`fc4b440e9a7085cc42afe23bc22706a285fd46f01b261cad83855354cce2db1d`
and symbol-bearing SHA-256
`a6e82dedfa0cd1f383d7b3661ac5b35c3ca5bb08d7670827d281d6f773d9e773`.
They use the existing cached dependencies, Linux platform-tools v1.44,
locked/offline mode and the parent's math path mappings. These are not fresh
all-dependency builds. Inputs, commands, logs and artifacts are included.

The packet retains fresh original/candidate execution for the 17,331-case,
18-suite regression, 119 native arithmetic cases, eight quote-owner cases and
24 preprocessing cases. Finite synthetic execution does not establish exhaustive
semantics, mainnet reachability or whole-binary equality.

```sh
python3 -B research/fees-legacy-update-source-recovery/verify.py
python3 -B research/fees-legacy-update-source-recovery/test_scope.py
```

The verifier authenticates the parent packet, recomputes function/callee/data
comparisons and validates saved runtime receipts. Negative controls reject an
unsealed claim, substitution of the parent binary and an omitted runtime case.
