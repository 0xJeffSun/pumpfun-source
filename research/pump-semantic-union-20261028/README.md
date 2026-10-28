# Pump semantic union on L39: 1019/1035, 205 paired cases

This packet composes the latest L39 data corrections with six independently published source recoveries and qualifies **one final image**. It prevents choosing between the recovered legacy sell window and the subsequently corrected trade, cashback, and sweep behavior.

The native Linux v1.44 result is **1019/1035 normalized windows, 183 raw bodies, 16 unmatched**, covering 1,611,088 original text bytes. The normalized membership is the same as #555; **this integration adds no new normalized window**. The legacy sell gain belongs to #555. The 17 additional raw bodies relative to the L38 native control are retained from #560's composition and are sensitive to link placement. Whole-ELF equality remains false.

## Source composition

The starting tree is all 65 authenticated L39 primary files from [#559](https://github.com/lalalune/pumpfun-source/pull/559), pinned to `44697701d734c93a2e2321e850d62d368627c328`. The ordered exact patches are:

| PR | Retained recovery |
|---|---|
| [#555](https://github.com/lalalune/pumpfun-source/pull/555) | Actual legacy sell mint-reference evaluation boundary; checked constructor selection, credited there to #539 |
| [#538](https://github.com/lalalune/pumpfun-source/pull/538) | V2 cashback quote-program admission and Clock selection |
| [#560](https://github.com/lalalune/pumpfun-source/pull/560) | Ordinary v2 buy/sell whitelist reserve synchronization and typed trade flow |
| [#566](https://github.com/lalalune/pumpfun-source/pull/566) | Reject mayhem/whitelisted multi-hop completion crossings before `complete_fill` |
| [#563](https://github.com/lalalune/pumpfun-source/pull/563) | Nonzero sweep recipient check at original Source line 123 |
| [#567](https://github.com/lalalune/pumpfun-source/pull/567) | V3 sell reserve/payment order, whitelist synchronization, actual volume event, and error precedence |

`composition/L39-primary.tar.gz` and its upstream manifest bind the input. `composition/patches/` contains exactly the applied patches. `source/` is the complete 67-file workspace compiled here: the unchanged repository materialization moves the release profile to the workspace root and removes the nested empty workspace. The verifier reconstructs all final files from the authenticated input and patches. No existing maintained program or global status table is edited.

L39's synthetic Source positioning, blank lines, and inherited layout devices remain explicitly inherited. This is a reconstruction, not a claim to recovered historical formatting. No SDK, registry, executable, instruction, comparator, or normalization rule is patched. This build uses ordinary linking, without a generated layout layer.

## Final-image qualification

Every row below ran against stripped candidate `4ea5444a35305c2c12b4753a6cd28786f8d4936e8c1ccf128b0db348935e8501`:

| Cases | Coverage | Executed transactions |
|---:|---|---:|
| 18 | V2 native/SPL/Token-2022 whitelist and mayhem trades, including six negative baseline witnesses | 54 |
| 18 | Creator/protocol sweep recipients across native, SPL, and WSOL | 54 |
| 128 | V3 configured-fee sells, whitelist/mayhem, nonzero volume, compound error precedence | 256 |
| 25 | Legacy sell accumulator constructor and payment boundaries | 50 |
| 8 | Cashback quote-program admission and valid controls | 24 |
| 8 | Normally signed AMM-to-Pump CPI crossing/noncrossing controls | 16 |
| **205** | **Zero compared structured mismatches** | **454** |

All 454 actual transaction outcomes contain signed transaction bytes; all 454 signatures were independently reverified. Counts include repeated identical transaction bytes executed against different images; these are not 454 unique transactions. The baseline outcomes are retained for the three-way regressions. Main-program loads use the real captured upgradeable-loader account images, including the fresh AMM-to-Pump replay. The latter also reproduces every saved original structured result from #566.

The comparisons cover state, errors, events, CPI instructions and return data, with the exact field list recorded by the individual producer. Raw logs remain available; universal log parity is not claimed. This is a bounded integration qualification, **not** a repeat of the full 44-suite corpus. The individual packets document their larger independent corpora. Their results are not transferred to this new image.

## Build and verification

Both local crates were explicitly cleaned for `--release --target sbpf-solana-solana --offline` and freshly compiled. The two actual rustc commands, complete compressed compiler/controller logs, before/after source hashes, SDK hashes, standard-library hashes and reused external dependency hashes are retained. External dependencies were reused; this is not a cold dependency rebuild. A post-build audit confirms the recorded SDK tools and target libraries remained unchanged.

Unstripped SHA256: `a581cd94b1b74bd068b71ba79c94f07b2d73ab9408bdce2fd32957726c02f706`.

From a repository containing the original evidence and window selection:

```sh
python3 -I -B research/pump-semantic-union-20261028/verify.py
python3 -B research/pump-semantic-union-20261028/verify.py --signatures
```

The default verifier uses the standard library, recomputes all 1,035 windows with the unchanged official normalizer, checks exact composition/build bindings, and independently compares every saved structured outcome. `--signatures` also requires `solders` and rechecks the transaction signatures. Optimized Python is explicitly rejected. `--repo /path/to/full/repo` supports a separate evidence checkout.

`build.py` accepts `--repo`, `--sdk`, `--cargo-home`, and a new `--output` directory. It uses an unmodified native Linux v1.44 SDK, pinned locked dependencies, and the repository's pinned physical-source wrapper. An optional `--dependency-seed` copies an external dependency target into a newly owned target; both local crates still freshly compile.

`runtime/producers/` preserves the actual executed producer/harness sources. Some historical producers retain absolute session paths; these are evidence snapshots, not a claim that every producer is a portable command. `composition/runtime-producer-pins.json` records their executed paths and hashes. The multi-hop replay accepts explicit paths and reuses frozen signed transactions without constructing new signatures.
