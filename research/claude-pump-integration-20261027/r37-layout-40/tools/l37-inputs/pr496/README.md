# Pump Main L32 AdminCto creator-collection log order

This additive research packet follows merged PR #492. It corrects the six remaining non-filename ordered-log differences without editing maintained `programs/pump`, the immutable L32 packet, or #492 evidence.

## Root cause

The discrepancy was an ATA CPI in the wrong branch, not a misplaced message. For native quote collection with a nonempty AMM creator vault, L32 skipped `create_idempotent` in the Pump collection branch, called `collect_v2::collect` (which logged `No creator fee to collect` for the empty Pump vault), then created the destination ATA in the AMM branch. The original and Round47 source instead:

1. cache the AMM vault frozen state;
2. create the destination ATA idempotently before Pump collection;
3. let zero Pump collection emit `No creator fee to collect`; and
4. reuse the cached frozen result and avoid a duplicate native-quote ATA CPI before AMM collection.

Moving only `msg!` would have changed failure precedence. `source.patch` restores the full Round47 branch structure in three line-neutral replacements, preserving the 700-line source layout.

## Six-case attribution

All cases start with no destination quote ATA. The successful idempotent CPI creates a Tokenkeg-owned ATA. Both holder modes and all three AMM vault balances share the independently verified branch cause:

| Case | Holder | AMM vault tokens | #492 order | Corrected/original order |
| ---: | --- | ---: | --- | --- |
| 270 | false | 0 | notice, ATA, AMM collect | ATA, notice, AMM collect |
| 271 | false | 1 | notice, ATA, AMM collect | ATA, notice, AMM collect |
| 272 | false | 1,000,000 | notice, ATA, AMM collect | ATA, notice, AMM collect |
| 273 | true | 0 | notice, ATA, AMM collect | ATA, notice, AMM collect |
| 274 | true | 1 | notice, ATA, AMM collect | ATA, notice, AMM collect |
| 275 | true | 1,000,000 | notice, ATA, AMM collect | ATA, notice, AMM collect |

`runtime/focused-summary.json` binds each case to its signed serialized transaction, account pre/poststate, CPI, events, errors, and return data.

## Qualification

- #492 baseline: stripped `3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36`; unstripped `f3aae993141c81277d8a14ac66331dbd59f646bd03d7a371ef201475af19a219`.
- Corrected repeated builds: stripped `6779af6d57bbd4427b643e554fbf98a8d2a607b3d5167e4c655963ce0b5379e2`; unstripped `2df0744f111ed41b4df0e8167e6914e01587a28a3e7fd26f73f5a6a9fc0955da`.
- Complete census: 990/1,035 normalized, 166 raw, 45 unmatched, 1,446,072 matched bytes; zero losses.
- Fresh AdminCto replay: 363 cases, zero structured differences and zero ordered-log differences after the documented compute/source-coordinate normalization.
- Fresh full replay: 44 suites, 10,468 pairs, 18,284 signature occurrences reverified, 2,409 distinct signed transactions, zero state differences.
- Ordered non-filename differences: 6 -> 0. Filename-only differences remain 52.
- Twelve mutation controls pass.

Only compute-consumption lines and numeric source coordinates are normalized; filenames and all messages remain visible.

## L33 compatibility

The same patch applies cleanly and line-neutrally to merged L33 source. This packet does not rebuild or modify L33, whose source does not yet include #492's separate 17 creator-diagnostic additions. A future L33 composition must independently combine and qualify both patches against L33's 1,010-window baseline.

## Limitations

`admin_cto` remains machine-code unmatched. The final ELF is not equal to the original. Runtime evidence is local captured-loader LiteSVM execution, not deployment or live-chain validation. This work establishes the stated order and behavior only; it is not historical-source provenance or a security assurance.
