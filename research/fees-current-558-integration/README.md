# Current Fees 558-window integration

This independently compiled composition combines the artifact-backed 556-window
source from PR206 with PR204's constant initializer key, PR201's native-only
Crank lifetimes, PR205's checked lamport credit, and PR207's borrowed typed Relay
encoder. Only `lib.rs`, `donation.rs` and `initialize_fee_config.rs` change from
that baseline. Every compiled input is retained losslessly under `sources/`.
The different 43-input PR209 source-only union remains a separate experiment.

| Observation | Baseline | Composition |
| --- | ---: | ---: |
| Normalized windows | 556 | 558 |
| Unique structural pairs | 409 | 411 |
| Raw-local counterparts | 118 | 142 |
| Unmatched windows | 29 | 27 |
| Unmatched original instruction bytes | 196,880 | 189,248 |
| Equal direct-call observations | 3,284 | 3,336 |
| Equal decoded Location uses | 165 | 165 |

The new complete bodies are encoder 270136/1,400 bytes and initializer parser
295800/6,232 bytes. All prior normalized/raw matches, equal direct-call
observations and Location uses survive. Raw-local counterparts are complete
local body equality; normalized matches mask declared calls/relocations and are
not whole-binary equality. The Crank business body remains unmatched.

A fresh isolated baseline build reproduces the published candidate and symbols
exactly. Its 252 lockfile-verified dependency archives were extracted into a
private cache and checked byte-for-byte before and after compilation. The two
composition builds reuse that cache but recompile the root and math crate.
Both produce candidate SHA256
`23978b955abf7d482f604d73734e6aca69216a5a3c0d4b96e14bb503fef66708`
and symbols SHA256
`b6d1ddd1eecf344acdc807d7e94ecf23af2810ee7aeb32e74c53ca3b862d4c9e`.
Compiler containers have no network and read-only source/SDK mounts; originals
are not compiler inputs. Launch records retain the exact environment, tool
hashes and source maps. Paths are recorded locators, not portable host defaults.
`tools/build-baseline.py` is the baseline driver; `tools/build.py` reuses its
verified dependency target for the two root-rebuild controls.

All 17,331 cases in 18 suites freshly pass. The 76-case boundary probe reproduces
15 control overflow errors and zero proposal mismatches. Every case in the
304-case strict Crank matrix agrees on all retained non-log fields and on logs
after excluding explicit compute-consumption lines. All 304 raw logs differ in
those compute lines; exact resource consumption is not claimed. These finite
suites do not establish every authorization, account or input combination, and
no authentic fixed-admin initialization success is claimed.

`python3 -B research/fees-current-558-integration/verify.py` verifies retained
source/build/artifact bindings and recomputes windows, equal calls, Locations
and saved results. It does not start a compiler or VM. Sources, patches, binaries
and large receipts are deterministic gzip files. Reproduction requires the
recorded official Linux v1.44 compiler, Linux v1.48 strip tool, container image and
verified locked cache; resolve the recorded paths to private local copies.

This is reconstructed Rust organization and compiler/layout evidence, not proof
of the historical source. The selected four core releases remain unchanged and
all four still lack whole-file identity. No mainnet transaction was sent.
