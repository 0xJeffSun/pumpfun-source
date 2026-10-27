# Fees: attributable math compilation unit and authentic SyncNative packing

Four pinned ordinary-source states isolate two independent changes to the
[544-window source integration in PR178](https://github.com/lalalune/pumpfun-source/pull/178).
The final composition retains **545/585 normalized original windows**, **118 raw
local matches**, **398 unique pairs** and **161 equal decoded Location-shaped
record uses**. This is an isolated pinned experiment, not a claim to the latest
moving global frontier. Whole byte identity remains 0/4 core programs.

| Stage | Source inputs | Normalized / raw | Unique pairs | ELF bytes | Common-position differences |
| --- | ---: | ---: | ---: | ---: | ---: |
| Public pinned baseline | 41 | 544 / 118 | 397 | 868984 | 461447 |
| Math crate + root reexports only | 42 | 544 / 118 | 397 | 868984 | 459591 |
| Authentic SyncNative pack only | 41 | 545 / 118 | 398 | 871472 | 468043 |
| Math + pack composition | 42 | 545 / 118 | 398 | 871472 | 466077 |

The pack change makes positional file differences **worse** while gaining one
complete normalized body. No raw local window is gained or lost; normalized
losses are empty. Positional counts are not missing-source or completion measures.
The composition is still smaller than the 873,256-byte meaningful original ELF
and the 948,944-byte capture, whose allocation tail contains 75,688 zero bytes.
Neither output equals meaningful original ELF or capture.

## Two source-supported causes, kept separate

**Math ownership:** seven source/configuration paths turn the already recovered
math module into an ordinary local `pump-fees-math` workspace dependency and
reexport `FeeTier`/`Fees` from the root. The local manifest is added; all **252
registry package records remain unchanged**. All 588 candidate instruction-shape
signatures are preserved. Seven contiguous associated-token-client → math → std
windows then occur in the original order. This is evidence for a useful source
compilation-unit hypothesis, **not historical provenance or exact layout proof**.
No normalized body gain is attributed to it.

**Authentic packing:** one expression in `donation.rs` replaces manual `vec![17]`
with the actual runtime-used
`anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()`.
No dependencies are added. This recovers original **695672, 1,792 complete
normalized bytes**, with no losses. Its four actual direct callees match complete
bodies; the helper has no direct relocated data, external calls or indirect calls.
The incoming original Crank call is at 147944+12888. Both incoming calls pass a
four-byte discriminant 17, and a static decoded branch check selects byte 17 and
length one. The incoming Crank body remains unmatched; the complete Rust enum
object extent and recursive semantic equivalence are not claimed.

The composition applies exactly that same one-expression pack override to the
math state. Every stage has exact source hashes; the complete public baseline
map and readable patches reconstruct all four without captured executable
payloads, assembly templates, dead matching helpers, linker order tricks or
post-build binary patching.

## Full one-hop callee comparison and bounded direct data

The static checker recomputes **3,029 actual direct edges** across the baseline
397 unique pairs and checks that the math variant preserves the complete edge
shape ledger. It similarly checks **3,033 edges** across 398 pairs for pack versus
composition. **18 pre-existing callee-shape mismatches remain** in both cohorts;
none is added by math ownership. This is one-hop correspondence, not complete
recursive, indirect or semantic closure.

Both math functions (original 700568/700760) preserve their complete 24-byte
Location-shaped record and length-delimited source path; Rust type identity is
inferred. The full 161-use cohort remains value-equal, not necessarily equal
relocated pointer bytes. Other direct-data objects are not broadly certified.

## Source-only boundary and runtime limitations

The packet contains only readable source/configuration files, maps/patches,
static counts/hashes/addresses and Python verifier/tests. No ELF, archive,
encoded machine payload, replay cases, logs, archived build/runtime receipts or
receipt excerpts are included. Static metadata was freshly recomputed directly
from local outputs and the public original, not copied from saved runtime or
build reports. Default verification checks source integrity and recorded static
metadata only, reporting `compiler_executed=false` and `runtime_verified=false`.

Each changed stage was locally repeated with exact root-clean compiler outputs;
finite offline suites reported zero differences in their defined observations.
Those observations are **not downloadable runtime evidence**. In particular,
the existing Crank application-log gaps remain: the candidate still omits the
original "Nothing to donate" and feature-disabled messages. Do not interpret the
finite suite result as equality of all application logs or complete Crank behavior.
No verifier mode executes a compiler, target VM or live-chain operation.

## Verify and materialize

From a clone containing the pinned public commits, with Python 3.11+:

```sh
P=research/fees-math-pack-source-proposal
python3 -I -B "$P/verify.py"
python3 -I -B "$P/test_verify.py"
python3 -I -B "$P/verify.py" --variant combined --materialize work/fees-math-pack-source
```

Use variants `baseline`, `math` or `pack` for the independent controls. Every
materialization checks the complete file map and rejects existing destinations,
unsafe paths and symlinks. Nine stdlib tests cover mutation, patch consistency,
materialization and the default no-artifact/no-receipt read boundary.

Use the [pinned PR178 native Linux v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/0b5b69c6d4396ac520d1723fa8bd005e2cbbe549/research/fees-current-source-integration/README.md#guarded-portable-build-recipe),
substituting each exact materialized source. Preserve the existing release
profile, default features, locked/offline target, explicit clean environment,
source-path remapping and pinned strip tool. For the math and combined states,
require actual rustc invocations for **both** the root and local math crates;
a cache-only root artifact is not reproduction. Authenticate the official tools
and public locked registry inputs before native build scripts/macros run. Local
results used clean root/math rebuilds with reused verified dependency targets;
fresh all-dependency builds at relocated paths must be checked independently.
Never copy or patch a binary to repair a hash discrepancy.

## Optional fresh local comparison

Provide four directories, each containing your `candidate.so` and `symbols.so`:

```sh
python3 -I -B "$P/verify.py" \
  --baseline-build /path/to/baseline \
  --math-build /path/to/math \
  --pack-build /path/to/pack \
  --combined-build /path/to/combined
```

This opt-in mode loads only hash-pinned public parser code, the public original
and your local outputs. It recomputes whole section/window inventories, source
attribution transitions, all actual edge ledgers, Location values, math order
and the pack's real callers/callees/discriminant branch. Full comparisons bind
the expected stripped and symbol hashes; no runtime receipt is consulted.

The final stripped hash is
`4ac6f754ca4344c85aecc9cba0aa965e71f6d7cc480d2b9fcfcd1ad539acf50a`;
symbol hash is
`6d9504b691413f6eabfc94ecdf5fc898d43305d2aac5ae0c402975c41a419c72`.
The final `.text` is 795,736 bytes versus original 799,648, `.rodata` 21,387 versus
21,079, and `.data.rel.ro` 7,360 versus 6,744. Forty original windows remain
unmatched. No selected checkpoint or existing evidence is replaced.
