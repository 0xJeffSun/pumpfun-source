# Fees: complete legacy and V2 distribution helpers

The pinned AdminCto-integrated554-window source gains two complete original function-body matches: legacy distribution at235304 (936bytes), then V2 distribution at236240 (1224bytes). The cumulative result is556/585 normalized windows,409 unique structural pairs,118 raw-local windows and29 unmatched windows. Whole meaningful-ELF and captured-file equality remain false.

| Stage | Normalized | Unique pairs | Raw-local | Gain |
| --- | ---: | ---: | ---: | --- |
| AdminCto current baseline | 554 | 407 | 118 | pinned control |
| Legacy composition | 555 | 408 | 118 | 235304 /936bytes |
| Legacy and V2 composition | 556 | 409 | 118 | 236240 /1224bytes |

Neither step loses any prior normalized/raw window. The AdminCto business window127776 remains matched. Both source deltas live in sharing_update.rs; the42-input snapshots preserve every other current input. The fixed-account aggregate is constructed inside each helper from individual owned AccountInfo arguments. The program is moved into CpiContext.program and cloned into accounts.program. A local mutable vector is moved with std::mem::take into a locally bound CpiContext. These ordinary Rust ownership boundaries reproduce the complete original instruction sequences without assembly, output patching, dummy fields, raw parts or padding.

The V2 parameter order follows original register/stack-to-field copies rather than IDL declaration order: program; mint, bonding curve, sharing config, creator vault; creator-vault quote token account, quote mint, quote token program, associated token program; system program, event authority; payer; remaining accounts. The measured argument mapping is recorded in value-flow.json. The accepted source preserves the preexisting helper and call source-line spans.

The two recovered bodies have nine and14 real outgoing calls, respectively. Every outgoing callee body matches; external abort relocations are identified separately. Neither helper contains indirect calls or direct pointer relocations. All165 decoded Location uses remain equal. The baseline's3261 equal direct-callee observations remain equal, with23 added positive observations and no positive-edge regression. These are bounded local body/call/data checks, not complete transitive semantics.

## Compiler and source evidence

Sources derive from immutable main3aa90d021ecc0faf75b4b1d2c993a90092d36339, using research/fees-admin-cto-current-integration. The isolated baseline rebuild reproduces its published stripped hash ce8e040056b0645e59473306ad6b9fc8f1428461695d7fece8d0b276fc3f10d8 and symbols hash629b6d92b1b0ab81e924d5eaef867b4806e26fb041642c5c663df619f3745d9d. Final stripped hash fcb56a875b8f3a2e4805986f488b27708b77b2b66d8bbd04d71ddd3931d1cf52; final symbols hash573ffaa04800cec77f505bd678c4b8b6b65739fd977f383a180159fda499bd46.

All three actual Rust compiler invocations, logs, source/input maps and both outputs are retained. They use the pinned Linux platform-tools v1.44 compiler, canonical target, offline locked dependencies, and three existing math-path mappings. These builds reuse this lane's private dependency cache. The earlier independent551-window control started from an empty target and reproduced its published hashes; no clean all-dependency claim is made for these cumulative builds. No other container, public source selection, or historical packet was modified.

## Bounded runtime evidence

Both AdminCto554 baseline and cumulative556 candidate freshly pass417 signed sharing-update cases against the captured original. Checked fields are error, before/after account states, events, inner instructions and returns. Transaction bytes agree in all cases. The actual Pump legacy distribution CPI occurs in90 cases and V2 distribution CPI in120 cases, with identical original/candidate case sets. These exercise both helper branches but do not exhaust all inputs, authorization or resource limits.

Application logs excluding explicit compute-consumption lines introduce zero differences from the554 baseline. Raw original/candidate logs still differ in297 cases;88 retain preexisting diagnostic path/line differences even after excluding compute lines. Full raw-log/compute equality is not claimed. The complete receipts and exact case lists are retained in runtime/.

## Verification

```sh
python3 -B repro/pump_fees/distribution-helper-recovery/verify.py
python3 -B repro/pump_fees/distribution-helper-recovery/test_scope.py
```

The verifier recomputes the full inventories, helper/callee checks and Location cohort, and checks saved runtime fields, membership and hashes. It does not compile or execute target programs. The mutation test rejects altered source, artifact bytes, extra members and symlinks. Large JSON receipts, binaries and logs use deterministic gzip; evidence-bytes.json binds their exact decompressed bytes. Source snapshots must be decompressed before compiling; build commands retain the original isolated paths, which are locators requiring equivalent pinned tools and offline dependencies elsewhere. No deployment is performed.

This is a separately verified research candidate; the repository’s selected checkpoint and pinned research inventory are unchanged. Source inputs and the source patch with significant retained whitespace use gzip to preserve their exact bytes without changing repository-wide Git attributes.
