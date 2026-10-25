# Fees framework and function-body comparison

The current independently built thirty-one-body Fees candidate shares many complete instruction patterns with the capture, but **the full executable still differs**. This diagnostic narrows the source and framework work; it is not a new behavioral test or an identity claim.

Inputs are the captured `evidence/original/pump_fees/deployed.so`, the published `repro/pump_fees/all-thirtyone-v144/pump_fees_candidate.so`, and the unstripped output from that exact build. The bundled `symbol-source.so` supplies candidate function names/ranges. Its entire `.text` section is asserted identical to the stripped candidate before comparison. The existing build report records source, lockfile, compiler and SDK hashes.

| Candidate ranges | Inspected | Entry-bounded patterns with consistent mapped calls | Entry-bounded raw exact |
| --- | ---: | ---: | ---: |
| All named ranges of at least 16 bytes | 512 | 385 | 68 |
| Names containing Anchor | 164 | 110 | 2 |
| Names containing the candidate crate | 167 | 59 | 1 |

These categories overlap. Generic monomorphizations can contain both framework and user-type names; counts are not independent samples or a confidence score. Three recovered handler bodies—`set_disable_flags`, `set_claim_rate_limit`, and `set_social_claim_authority`—have full instruction-pattern matches at captured offsets 109944, 112496 and 106728, with lengths 2552, 2664 and 3216 bytes respectively. Twelve generated global instruction wrappers also match. Most substantive handler bodies and several account parsers remain different.

The Anchor `ErrorCode::name` and `Display` implementations (3056 and 2552 bytes), error logging and conversion helpers, and several generated IDL handlers match under this diagnostic. This supports the current Anchor 0.31-family baseline alongside the stronger v1.44 compiler evidence. It does not uniquely attribute a release or dependency graph. A comparison of all Rust files in the locally cached 0.31.1/0.31.2 macro crates found only documentation/deprecation-string changes in `anchor-attribute-program`; the hash maps and package VCS metadata are retained. That inspection alone is not independent verification of package provenance.

`match.py` masks loader relocation immediates and relative internal-call destinations **in memory only**, retaining every other byte and requiring identical relocation offsets/types/symbols. It checks inferred original entry boundaries and call destinations when the callee has a unique mapped body. Relocated data objects and unmapped callees are not proven equivalent. Raw equality is reported separately. Original function boundaries are inferred from calls/relocations, not recovered debug symbols. No executable bytes, headers, relocations or sections are changed.

From the repository root:

```sh
python3 repro/pump_fees/framework-matching/match.py \
  --original evidence/original/pump_fees/deployed.so \
  --candidate repro/pump_fees/all-thirtyone-v144/pump_fees_candidate.so \
  --symbols repro/pump_fees/framework-matching/symbol-source.so \
  --output work/fees-function-matches.json
```

`function-matches.json` retains every positive and negative range and mapped-call check. `artifact-hashes.json` covers this package except itself. The parser is derived from the already published controlled compiler matcher; it does not execute SBF programs.
