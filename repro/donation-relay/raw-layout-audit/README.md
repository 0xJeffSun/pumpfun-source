# Relay raw-layout audit and source identity controls

Every remaining common-position byte difference in the accepted 492-window
artifact is accounted for below. This is a read-only positional analysis; it
neither patches an ELF nor proves that the differing pointers are semantically
interchangeable.

| Location | Differing byte positions | Observation |
| --- | ---: | --- |
| Fifteen reordered `.text` regions | 17,991 | Each region has the same multiset of complete normalized bodies and the same start/end extent. |
| Other `.text` positions | 462 | All are direct-call displacement bytes inside otherwise aligned normalized bodies. |
| `.data.rel.ro` | 25 | Fourteen stored pointer values differ; each points to a complete matching normalized body. |
| `.dynsym` | 4 | Two symbol values differ; their other fields are equal. |
| `.rel.dyn` | 139 | Eighty-one relocation-site values differ; every corresponding relocation-info word is equal. |
| ELF header | 2 | Only entry-address bytes differ; both entries select matching normalized bodies. |
| **Total common positions** | **18,623** | No unexplained common-position difference remains outside these categories. |

Both images contain exactly the same **multiset** of 492 normalized function
bodies. This is stronger than each original body merely having some candidate
counterpart: multiplicities agree too. The fifteen permutation regions and all
outside-region differing byte categories are recomputed, not supplied as masks.
The original has another 12,168 captured allocation bytes beyond the candidate.

The first next source targets are the original regions 7984–13984 (Anchor account
specializations), 33384–34400 (drop functions), 566024–582808 (program/entrypoint
emission), and 703520–705720 (library helpers). `report.json` retains all fifteen
regions, complete candidate names, sizes and the affected address fields.
Ordering and duplicate attribution remain unresolved; no unique body permutation
is claimed and no reordered output is emitted.

## Source identity hypotheses

The captured IDL names `donation_relay` version `0.6.0`; captured source paths use
`programs/contracts/`. Six actual root compilations test ordinary program-module,
library-crate and package name/version hypotheses derived from those clues.
The program-module rename alone produces exactly the accepted stripped binary.
Other names change ordering and raw matches, but none reduces the common-position
residual. None is promoted. Exact outcomes and all raw-match ordinals are in
`control-results.json`; source patches, 60-input maps, actual compiler invocations
and artifacts are retained. These are dependency-cache-reusing v1.48 root builds,
not fresh all-dependency builds. No runtime replay is claimed for rejected controls.

| Control | Raw-local matches | Common differing positions | Raw gains / losses |
| --- | ---: | ---: | ---: |
| Program module name only | 317 | 18,623 | 0 / 0 |
| Library name only | 304 | 21,514 | 8 / 21 |
| Library and module names | 304 | 21,514 | 8 / 21 |
| `contracts` library + module | 318 | 21,421 | 13 / 12 |
| `donation-relay` package, version 0.6.0 | 312 | 21,686 | 20 / 25 |
| `contracts` package, version 0.6.0 | 309 | 19,924 | 10 / 18 |

The controls do not identify the historical package name or compiler metadata.
A plausible IDL name is not proof of library-crate identity. The accepted source,
artifact and all 492 normalized matches remain unchanged.

```sh
python3 -I -B repro/donation-relay/raw-layout-audit/verify.py
python3 -I -B repro/donation-relay/raw-layout-audit/test_scope.py
```

The verifier reads source and binary evidence without compiling or executing
programs. Negative tests reject an unmasked instruction change and an unexplained
ELF-header change. This audit narrows raw layout work; it does not close broader
behavior, indirect calls, data semantics, toolchain provenance or whole-file identity.
