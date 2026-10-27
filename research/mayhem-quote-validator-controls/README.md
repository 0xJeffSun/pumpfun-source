# Mayhem quote-aware validator controls

The private baseline reproduces the PR214 candidate and symbols exactly. Seven
ordinary Rust controls investigate O0095 at 188864–190160. No complete match is
added: all 188 prior examined matches and 58 literal local matches survive, while
the original 1,296-byte validator remains unmatched.

| Control | Emitted validator bytes |
| --- | ---: |
| Initial shared threshold | 1,224 |
| Load expiry before Clock | 1,232 |
| Separate threshold checks | 1,240 |
| Scoped status guard | 1,232 |
| Reordered signed comparison | 1,232 |
| Nested quote branches | 1,416 |
| Default native threshold reference | 1,248 |

The original loads expiry before calling Clock and spills the reserve argument.
An explicit source local recovers that prefix. Remaining differences include
quote-branch layout, threshold selection and error construction. The observed
native/default quote path reads GlobalParams object offset 128; other quotes use
offset 200. The original records the Clock unwrap at state.rs 578:49 and errors at
579 and 593. Source line placement reproduces those positions without assembly,
output modification or a broader normalization mask.

Every control retains all 15 compiled inputs, launch/source hashes, compiler output
and both artifacts. The final verifier checks actual root compilation, the exact
baseline, matching sets and all retained source bytes. All source changes are
confined to state.rs and the Legacy Sell caller. These are experiments: no new
VM replay or full semantic acceptance is claimed and no canonical source is
promoted. Native and alternate-quote behavior still need separate acceptance.

`python3 -B research/mayhem-quote-validator-controls/verify.py` recomputes saved
body correspondence. It never invokes a compiler or executes a program. The
recorded builder uses official Darwin v1.54, v1.52 stripping and a private copied
dependency target; recorded absolute paths are locators to adapt for reproduction.
The root is explicitly cleaned before each accepted build. Earlier collection
attempts with the wrong output filename and a stale Cargo root were detected and
are excluded from these accepted controls.
