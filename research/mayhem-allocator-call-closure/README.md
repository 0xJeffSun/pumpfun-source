# Independently reproduce and qualify the current allocator composition

This packet independently reproduces the exact artifacts published in
[PR295](https://github.com/lalalune/pumpfun-source/pull/295) and
[PR296](https://github.com/lalalune/pumpfun-source/pull/296) using two empty
dependency target directories. It adds a path-parameterized build recipe that
was actually executed, current curve-versus-root LLVM IR evidence, and fresh
initializer execution for this exact artifact. Those PRs appeared during this
local investigation; the submission scope was changed to these additional
reproduction/qualification guarantees. Credit for the source composition and
eight-window call repair belongs to the public preceding work.

The native baseline has a matching `finish_grow` body somewhere in its
image, but O0210 actually calls a different specialization. Composing the public
historical macro and CreateEvent-bearing IDL with the **latest 67-file qualified
source** repairs that destination and seven transitive callers. The accepted
O0210 instance at 520,168 calls 519,840 at relative offset 528; that target is a
direct-closed counterpart of original O0209 at 539,680 (328 bytes).

| Measurement | Fresh native baseline | Composed candidate |
| --- | ---: | ---: |
| Complete normalized original windows | 432 | 432 |
| Native raw-local original windows | 84 | 85 |
| Original windows supported by ordered direct-call fixed point | 414 | 422 |
| Surviving relation pairs (includes alternatives) | 602 | 602 |
| Partial Legacy Buy body, bytes | 13,784 | 13,784 |

The eight repaired windows are O0207, O0208, O0210, O0214, O0215, O0217,
O0219 and O0222. Ten body-matched windows still depend on unmatched handlers.
Nine original bodies remain unmatched. No new normalized body is recovered.
The separate qualified 432/100-raw layout is not replaced or combined with
these native counts; **whole-ELF equality remains false**.

## Attribution and distinct scope

The historical macro/source discovery belongs to the
[historical context work](../mayhem-historical-macro-context/README.md) and its
[native Linux reproduction](../mayhem-historical-macro-linux/README.md).
The [earlier PR282 composition](../mayhem-native-current432-composition/README.md)
already has 422 direct-closed windows when independently audited here; this is
not a newly discovered allocator source expression. Its Legacy Buy body was
13,680 bytes. This packet composes that public correction with the later
13,784-byte ownership source and proves the actual recursive direct-call
relationship that the earlier bounded immediate-call checks did not establish.
The [fresh Linux follow-up](../mayhem-direct-call-closure-20261027/README.md#fresh-linux-follow-up)
still had 414 supported windows before this composition.

Only `curve-accounts/src/interface_definition.rs` and
`curve-accounts/idls/pump.json` change. The latest handler/state sources remain
byte-identical. The two exact overrides and their [source diff](source.patch)
are retained. There is no synthetic allocation probe, assembly, padding,
binary rewrite, additional matcher mask or selected-checkpoint change.

## Build and preservation evidence

The portable producer starts with a new target directory and compiles locked
target dependencies with official Linux x86-64 v1.54 tools. It then recompiles
the curve crate and root with the published Linux historical host macro.
The macro itself is reused, not freshly rebuilt. Default section ordering and
ordinary `llvm-objcopy --strip-all` are used.

Two independent empty-target builds reproduce both complete baseline images.
Four actual composed root compilations, two per target directory, reproduce
both complete candidate images. `fresh-reproduction/` retains the second
producer's actual commands, inputs, logs and images.

| Artifact | SHA-256 |
| --- | --- |
| Baseline stripped | `a6adc4f876da179b4ce3daeebd55d24d17ca1aad4fc288085c5a1c5ba15069c5` |
| Baseline symbols | `9cd6ac43278b854d6d6a5fec9a1624ee205344a774714c893a2a3688ebc12301` |
| Composed stripped | `78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932` |
| Composed symbols | `5aad2a991fe54a2ad0f4c33bc99f34725795acaf936e4ac4b2042c0e7dbc6f75` |

All previous native raw/normalized matches, 4,314 positive immediate edges,
456 positive Source records and observed Source profiles survive. The complete
Buy/Sell helpers retain their twenty typed data observations. The 960-byte
initializer retains its complete body and bounded typed references. Legacy
Buy's complete normalized partial body remains unchanged. These observations
do not prove global data, vtable or indirect-call equivalence.

The compiler-context explanation is inherited from the
[allocator IR investigation](../mayhem-allocator-context/README.md): retaining
the historical event parser changes zeroed-allocation reachability and the
`finish_grow` specialization emitted after optimization. Fresh optimized IR
captures here narrow the current change to the curve crate: its size `phi` and
`select` disappear in favor of storing the requested size directly. The named
curve provider changes from 312 to 328 machine bytes and matches O0209. The
root crate's different `finish_grow` function is unchanged. `check_ir.py` binds
these parsed functions to their linked machine symbols. This independently
reproduces the current IR effect; it does not newly attribute an individual
optimization pass or authenticate the original historical compiler/framework.

Recorded executable hashes are checked before/after compilation. A separate
post-build audit checks 214 locked registry archives and their unpacked files,
plus all 26 official target libraries. This is explicitly a post-build audit,
not a retrospective pre-build observation. Host OS libraries and the system C
linker are not fully pinned. Original captured binaries are comparison/runtime
inputs and are never passed to compiler/linker commands.

## Local execution and verification

The composed executable has its own **6,636 fresh trade pairs / 13,272 signed
records** and **69 initializer pairs / 168 signed records**, including ten
successful original-Pump CPI initialization cases. All compared fields and
non-compute logs agree; initializer raw logs also agree in all 69 pairs.
`summary.json` gives the checked counts, signature totals, original
successes and raw initializer log differences. Every receipt is bound to the
actual executable program-account hash. The verifier checks signatures, account
states, errors, events, CPI/return data and exact non-compute logs; existing
scenario sets are reused and add no unique-case claim. These are finite local
synthetic-account executions, not live transactions or exhaustive equivalence.
Trade receipts are losslessly XZ-compressed; decompression was byte-compared
against every original local receipt before packaging.

With Python 3.12 and the repository requirements installed:

```sh
python -B research/mayhem-allocator-call-closure/verify.py
python -B research/mayhem-allocator-call-closure/test_verify.py
```

These commands check saved evidence without a compiler, VM or network fallback.
`verify.py --static-only` explicitly omits signed runtime verification.
The counterfactual test changes only O0210's masked call operand, keeping all
432 normalized bodies and a valid O0209 provider elsewhere. Exactly the eight
repaired windows lose closure. Three further controls reject a regressed
Legacy Buy body, missing provider support and inflated closure totals. Two
additional controls reject an actual signature-byte mutation and a forged
executed-program hash, for six negative controls in total. Test
mutations are confined to temporary files and are never candidate artifacts.

To execute the fresh Linux build recipe, supply an extracted official v1.54
SDK and a populated Cargo cache for the pinned lockfile; output must not exist:

```sh
python3 -B research/mayhem-allocator-call-closure/reproduce.py \
  --output /tmp/mayhem-allocator-reproduction \
  --sdk /path/to/platform-tools-v1.54 \
  --cargo-home /path/to/cargo-home
```

All Cargo builds are locked and offline. `controllers/` preserves the original
workspace-specific execution commands; `reproduce.py` is the subsequently
executed path-parameterized recipe. The first curve attempt used a non-`lib`
proc-macro filename and failed resolution; the next root attempt omitted its
dependency search directory and also failed. Their logs/results remain under
`builds/curve` and `builds/composed`; only the successful named/linked attempts
are counted. Earlier evidence packets and originals remain unchanged.

The fixed point permits supported cycles and multiple counterparts. It is a
greatest relation, not a global injective assignment or semantic proof. External
syscalls, opaque data, indirect calls, original provenance and whole-core
identity remain unresolved.
