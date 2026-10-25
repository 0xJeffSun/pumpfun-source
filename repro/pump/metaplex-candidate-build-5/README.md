# Metaplex recovered-source candidate5

A fresh pinned Linux source build applies the [three-file Rust patch](../metaplex-source-recovery/README.md) to public revision `17e99434af5ead3e989c08f32af33609821d0bc0`. Its raw ELF is706,480bytes, SHA256 `28632fa1e8245756dab65475f6021cda088249d32f1aabcaf7c33705a47c0f73`. Complete-file equality is **false**. The hosted job failed its deliberate final equality requirement after compilation succeeded.

All53 normally signed offline boundary comparisons now pass against the captured original, including the legacy conversion trailing-byte reset and read-only metadata rejection in master-edition creation. The earlier baseline had11 differing cases across those53. Watched state, errors and inner instructions agree; raw logs and compute usage are retained but not equivalence requirements. The106 transaction signatures and failed rollback assertions are verified. These finite tests do not establish complete dependency behavior.

The build preserves baseline and patched tracked-file manifests, exact patch, compiler/image identities, complete build log and comparison. An independent check confirms that exactly the three intended source files changed. The captured ELF was read only after compilation; no executable bytes or headers were patched. Fresh allocation zeros are explicitly recorded, but because the candidate is shorter than the captured ELF extent, padding cannot repair missing original ELF bytes. The appended output remains a negative comparison.

Read-only analysis finds1,251 inferred function windows in each binary. All775 unique normalized anchors retain the same ordinal. Under that inferred alignment,1,235 equal-length windows have identical normalized instruction bytes, relocation patterns and internal-call ordinal correspondence;16 windows differ structurally. Only328 unique-window raw matches were counted. This masks relocated addresses/calls in memory and does not prove referenced rodata equality, exact source, historical compiler settings or full binary identity. The unmatched-window source hints include burn, metadata, use-authority and processor helpers; they guide further recovery and are not security findings.

The retained JSON analysis identifies exact addresses and each limitation. Reproduce the build with the repository dependency workflow input `token_metadata_recovered`, or the pinned local builder. Reproduce the bounded runtime pass with:

```sh
python3 repro/pump/metaplex-candidate-build-5/validation.py --output work/metaplex-candidate5-replay.json.gz
```

The local Python environment requires the repository requirements and captured dependency files. Source recovery remains incomplete; candidate5 is not a production substitute.
