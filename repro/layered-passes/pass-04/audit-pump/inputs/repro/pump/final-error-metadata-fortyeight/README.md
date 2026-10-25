# Pump final-error metadata checkpoint

The current 48 recovered handlers and five partial paths now use the original
`PumpError::QuoteMintNotWritable` metadata at ordinal 110/code 6110. A separate local
error enum preserves all eleven reconstruction fences' existing names, messages
and codes. No new writable-account checks, handlers or unique cases were added.
The captured official IDL remains unchanged and ends at 6109.

One clean main build of the 37 recorded compiler inputs used the accepted v1.44
compiler and actual v1.52 strip phase. Both the entire stripped ELF and symbol ELF
are byte-identical to the independently validated scratch build. The candidate is
1,582,168 bytes, SHA-256
`2aa18c73e517d9f74063633ea5d5b15f187d63e4dd4c09678b852afdd588cbc3`.
The symbol ELF SHA-256 is
`78cbc62e21a5df9f16ee346f0609441168f52088157bc601851d10e7e3cf757d`.
The final program README is recorded separately from those 37 compiler inputs.

All 9,269 existing differential comparisons and 1,024 Surfpool comparisons passed
on that exact executable. Saved evidence contains 24,352 differential signatures
and 2,980 Surfpool signatures, plus 32 separate original-only prerequisite
signatures. The 68 direct receipt bindings preserve the actual scratch compiler
inputs and bind the clean main build through whole-file identity. Legacy embedded
source maps remain incidental checkout snapshots. There was no runtime rerun on
unequal bytes, and no added coverage claim.

The complete Debug, Display, name and From-error bodies now match the original
after relocation normalization, along with all 62 actual direct-call target bodies.
The final error name and message match. The 1,840-byte BondingCurve serializer,
all 25 direct targets and its discriminator remain matched. Using the same
full-window algorithm on both builds, candidate pattern matches improved from
492 to 494 and candidate call-consistent matches from 423 to 428. The complete
before/after inventory is directly available in this package.

These results do not establish full binary or transitive data equivalence. The
From-error panic path retains a different compiler source-path prefix, and two
relocated tables have unresolved extent/type. Full original byte equality and the
security audit remain incomplete. All existing stopped lanes, partial route and
extension boundaries, and the known sell_v2 transfer-fee gap remain unchanged.

`main-scratch-identity.json` records both complete ELF comparisons. The immutable
660-payload scratch package, its original seal, all logs, strict assertions and
signatures are retained in `scratch-handoff.tar.gz`; `scratch-REPORT.md` explains
the source evidence, static diagnostic attempts and scope in detail. The previous
packages remain intact.

```sh
python -B /path/to/final-error-metadata-fortyeight/verify.py
python -B /path/to/final-error-metadata-fortyeight/verify.py --check-current --repo /path/to/pumpfun-source
python -B /path/to/final-error-metadata-fortyeight/verify.py --current-main --repo /path/to/pumpfun-source
```

The last command also requires every current input and package payload to be
tracked. Verification uses the accepted Solders dependency to check saved signatures;
it performs no builds, target execution, signing or network calls and does not
require a local Surfpool executable. The canonical nested and route runners retain
the explicit provenance-only adapters; all cases and assertions are unchanged.
