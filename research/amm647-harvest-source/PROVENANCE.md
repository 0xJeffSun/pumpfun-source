# Public source provenance

- Repository: `lalalune/pumpfun-source`.
- Frozen public 647 revision: `2310e96d94868bb0a57fb7231a4eae13d8f87d01`.
- Packet: `repro/pump_amm/event-decoder-recovery-20261027`.
- Canonical source Git tree: `871d9014800622812d229b6b4e1ace189ab17952`.
- Canonical inputs: 51. Exact workspace inputs: 52.
- Public workspace recipe SHA256:
  `aec4787cdd4361ce5a825398661f5a13e96c31610db4990ebc13dd72aa8792bf`.

The packet includes the complete materialized workspace base, not only two
patch targets. `standalone-Cargo.toml` and the unchanged public recipe establish
the inverse canonical mapping: root Cargo.lock returns to the crate, the crate
manifest regains its empty workspace/release profile, and the generated root
manifest is removed. Every canonical source SHA256 and Git blob SHA1 is checked.
The same recipe then regenerates both bundled workspace manifests byte-for-byte.
Rust sources and the lockfile are unchanged by this materialization.

Compared with the older 638 qualification, the public 647 lockfile changes only
`solana-program-entrypoint` from 2.3.0 to 2.2.1. The reported 227 compiled inputs
are 52 workspace files plus 175 registry source files across nine recorded roots,
not 175 dependency packages. Registry inputs are not bundled here; the precise
lockfile is. Native reproduction used authenticated official dependency sources
and the official v1.44 toolchain, preserving the three inherited diagnostics.

The helper mechanism is credited to PR264, head
`204ee2513d0532193ad88ca4ea43f00a765bcc99`, merged as
`992899a8032c79259c6623968ecd3cde628ce042`.
PR281 independently qualified that source on public638. This packet composes
the same helper on the newer public 647 base and reports separate scoped checks.

A fresh read on 2026-10-27 at 18:15 UTC found main
`0cc61d6363719fd6d60634ec657446c72d20d550`, with both maintained patch targets
unchanged from this base and no open AMM PR. This is a dated overlap check,
not a claim that unpublished concurrent work does not exist. Publication must
refresh it. No main branch or selected-checkpoint modification is included.

Machine-readable `source-inputs.json` contains only source hashes, public
source provenance and transformation scope. Its native/runtime/whole-identity
verification flags are deliberately false: pure source tests cannot prove
the prose's independently observed local compilation or runtime results.
