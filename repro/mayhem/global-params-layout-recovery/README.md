# GlobalParams layout and shared trade check

Research successor evidence to `repro/mayhem/shared-errors-typed-cpi`, PR211 commit `2f8ec04a5db57c3be8efe94733b24cea7581bdff`. Historical Git access is not required: `parent.json`, retained parent source mapping, decoded artifact hashes and all baseline sources/artifacts bind the transition portably. Prior packets remain unchanged.

The reconstructed Rust gains four complete strict normalized helper matches: O0094 shared trade validation1192bytes, O0138 GlobalParams serializer1832bytes, O0139 checked decoder1000bytes and O0140 unchecked decoder2448bytes. All177historical normalized matches, six parent source helper gains, separate already-matching token-burn admission,46admitted raw matches and58all-row raw windows remain. The12literal-equal opaque windows remain semantically opaque.

O0095 was explicitly examined and remains unmatched. Including it transparently, the scope is196admitted/188matched/8unmatched/245opaque. The historical184cohort and parent191cohort are preserved, not silently rewritten. No full handler, full ELF, transitive call closure or canonical promotion is claimed.

## Source and data evidence

Both baseline and recovered trees contain all15compiler inputs, including the unchanged projected Pump IDL. Each file is losslessly gzip-compressed; `source-inputs.json` pins its uncompressed bytes and path. `source.patch.gz` is the full change. Known instruction signatures, error codes/messages and serialized field order remain unchanged.

The old GlobalParams byte arrays concealed individually transported scalar fields. `global-params-serializer-proof.json.gz` plus the independent bounded evaluator in `tools/global_codec_proof.py` follow the original serializer's success path without executing original callees. They map every serialized byte[0,254), including the discriminator, to its native object source. All26field widths and offsets agree. `global-params-field-layout-proposal.json.gz` gives the source fields in Borsh order and is checked against both source declarations and original instruction evidence.

Unknown historical names and roles remain neutral, including field_138 and field_238. No padding or capacity bytes are invented. Existing unsigned wire fields remain unsigned storage; signed timestamp/interval interpretation is explicit at the observed consumers. The shared method reads paused, Clock, last trade and interval, performs the original checks and writes the current timestamp. Original state.rs error/Clock/add spans are recreated using ordinary source layout. Moving the GlobalParams attribute to state.rs line12 recovers its checked decoder's original source location. No inline attributes, register forcing, patched output bytes or new normalization rules are used.

Complete original bounds/raw hashes, strict normalized bodies and relocation patterns for the new method and codecs are retained. The bounds are inferred next-entry windows, not historical debug symbols. The entire serializer and unchecked-decoder matches substantiate primitive transport; the separately checked original serialized/object map avoids inferring layout from array size alone.

## Builds and runtime

Baseline624240bytes SHA256: `46b6a660c35868ac3821bc3edac5817e6ceb640679e5e9538e6004dc1a5e31e8`. Recovered625136bytes: `9be9d40f1c8995915d55c29abf42cf6bd1c07a1f386054ed89c2156a1ecd5460`. Recovered symbols: `1fc36019bec29a194822354bb38d29cdf2b11de2756e13d8b78ef578693fd338`. Original777408bytes: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.

Actual commands, logs, full input hashes and pinned SDK/private dependency provenance are retained. Both builds exited0 with unchanged sources and executables. They use the already reproduced official Darwin arm64SDKv1.54 recipe and fixedv1.52strip; no canonical source or shared cache was edited.

Final recovered candidate passes three bounded offline comparisons:

- Owned-admin transport:1032cases/2064signed transactions, all initializer cases excluded. The independent verifier rechecks every signature and independently computes the complete expected account bytes for624successful update/reset/transport cases.
- Legacy Sell:396cases/792signed transactions,134successful and262rejected pairs; independent state/event/CPI/rollback verification passes.
- Burn:12signed transactions across three two-step families, including second-burn6004errors and continued VM state; independent verification passes.

All2868signatures are independently verified by the default packet verifier. No initializer or unknown privileged path is executed. The four Sell normalized-log differences remain explicit: interval_overflow, retained10001, retained65535 and quote_extreme_1_0_1. This is not complete log-byte equality.

Legacy Sell remains7720bytes/75calls/97branches versus original12992/50/149. O0095's quote-aware curve validation and the remaining clone/ownership differences are not solved here. Burn and the other five trade handlers also remain unmatched.

```sh
python3 -I -B repro/mayhem/global-params-layout-recovery/verify.py
python3 -I -B repro/mayhem/global-params-layout-recovery/test_verify.py
```

Verification requires the pinned ordinary repository parent artifacts and Python with solders, but no Git history, compiler, VM, RPC or network. `crypto=False` is only a static mutation-test subset and does not certify signatures. Tests mutate sources, IDL, original-object mapping, parent binding, errors, runtime claims and actual helper instructions with outer artifact hashes repinned. The decoded helper comparison must reject the latter independently of file hash pins.
