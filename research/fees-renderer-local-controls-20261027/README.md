# Fees renderer source controls, independently executed locally

The restored workspace executed all eight source controls queued by [PR #326](https://github.com/lalalune/pumpfun-source/pull/326). Nine normal Cargo builds, including the direct-symbol baseline, preserve all **583/585 qualified signature multiplicities**. None recovers Create's complete normalized body. Whole ELF equality remains false; the maintained 200 raw-local / 583 normalized checkpoint is unchanged.

| Source control | Create bytes | Decoded instructions |
| --- | ---: | ---: |
| Original | 13,800 | 1,641 |
| Direct-symbol baseline | 13,880 | 1,651 |
| Residual propagation | 13,880 | 1,651 |
| Capture key values | 14,000 | 1,666 |
| Capture values + residual | 14,000 | 1,666 |
| Capture key references | 13,864 | 1,649 |
| Capture references + residual | 13,864 | 1,649 |
| Reference formatter argument | 13,880 | 1,651 |
| Local error + reference formatter | 13,896 | 1,657 |
| Named error fields | 13,880 | 1,651 |

All nine preserve the original Create direct-callee signature multiset. Their readonly sections contain 21,075 bytes against 21,079 original and lack four zero bytes in a byte-bag comparison. Neither target multisets nor byte bags qualify ordering, reference bindings, or Source attribution. No candidate has new runtime qualification. Runtime results for the different qualified Sweep binary do not apply here.

Each build retains its complete source archive, source/vendor hashes, compiler command, normal build logs, link map, and both native outputs. The packet includes the unchanged macro dependency, qualified comparison binary, renderer-only MIR-inlining wrapper, and actual executed control recipe. The unqualified first local launch with unresolved alias declarations is excluded; the retained baseline names the defined root callback symbols directly and uses the SDK linker. No binary/object patching was used.

Run the independent verifier from the repository:

```sh
python3 -B research/fees-renderer-local-controls-20261027/verify.py
```

The verifier checks the entire manifest, source archives against before-build hashes, unchanged vendor inputs, both native hashes, function boundaries and injective signature multiplicities, complete Create equality, callee multisets, and readonly byte diagnostics. The captured build scripts retain their actual `/workspace/fees-recovery` paths; the remote recipe in PR #326 supplies a portable reconstruction. The official SDK v1.44 archive SHA-256 is `6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9`.
