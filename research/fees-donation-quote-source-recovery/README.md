# Fees donation creation: reuse the recovered curve quote reader

`CreateDonationFeePda` used a private copy of the curve quote reader, while the
captured binary's two Rust Source records identify the existing shared reader
at `programs/pump-fees/src/common/mod.rs:33:48` and `33:56`. This changes the real
handler to call `crate::common::curve_quote_mint(curve.as_ref())` and removes its
private duplicate. The other 45 source inputs are byte-identical. No log string,
source line padding, compiler library or binary output is patched.

Both typed Source references now match the original. The handler is bound through
the actual call at offset 424 of the uniquely matched entry wrapper at original
address 655904; this is not an unused helper selected by its symbol name. The
existing string-panic record also remains equal. These are static source/data
observations: no newly reproduced panic or changed financial outcome is claimed.

The proposal composes with the merged [qualified linker layout](../fees-qualified-linker-layout/README.md).
It preserves the **same 577 normalized and 198 raw-local original windows**, all
430 unique structural pairs, 181 existing Source observations and 3,870 equal
direct-call observations. The changed creation body remains unmatched: 10,704
candidate bytes versus 13,800 original bytes. Eight functions and full ELF,
relocation, indirect-target and data equality remain unresolved. A smaller
candidate body is not claimed as a byte-equality gain.

## Reproduction and validation

The unchanged 46-file parent was independently compiled with empty dependency
targets and reproduced its native artifacts exactly. Applying the published
linker script then reproduced the qualified-layout parent exactly. The final
proposal has two agreeing root builds with that unchanged linker script. The
native-layout source change separately has three agreeing builds, including two
empty-target builds. The controllers check pinned compiler/stripper hashes,
locked crate archives and their extracted files, source inventories and immutable
linker inputs. They use the pinned container with networking disabled and no
original executable mounted. Full SDK installation authentication is not claimed
by this packet.

The native and final qualified artifacts each receive their own **17,331 fresh
original/candidate comparisons across 18 suites**. All 6,413 cases with comparable
application logs agree. Receipts from one layout are not rebound to the other.

An additional 96 normally signed local creation cases cover each of four live
curve reserve fields, values 1 and `u64::MAX`, zero/native/other quote keys and
lengths 83/114/115/200. All 96 succeed against the original and each tested
artifact. The verifier independently decodes the account's quote key, the full
208-byte creation event and the transaction signatures. These complement the
parent's 356 creation cases, whose fixture starts with all curve reserves zero.
No live transaction, signer bypass or PDA substitution is used. Finite cases do
not certify arbitrary aliases or exhaustive program behavior.

`builds/` retains exact commands, logs and outputs' hashes. `analysis.json.gz`
records before/after wrapper, call and typed-data evidence; `validation/` retains
the actual executions and complete reports. Original captures, prior packets,
selected checkpoints, top-level README and its integrity seals are preserved.

```sh
python -B research/fees-donation-quote-source-recovery/verify.py
python -B research/fees-donation-quote-source-recovery/test_scope.py
python -B research/fees-donation-quote-source-recovery/analysis.py --check
```

These commands authenticate saved evidence; they execute no compiler, VM or
network operation. The runtime receipt checker needs Python 3.12 and solders
0.27.1. Materialize the exact 46 inputs with:

```sh
python -B research/fees-donation-quote-source-recovery/verify.py \
  --skip-runtime --materialize /absolute/new/source
```

For a fresh native build, use `build_native.py` with `--work`, `--sdk` (official
Linux platform-tools v1.44), `--strip-sdk` (v1.52), `--cargo-home`, a new label,
`--source /absolute/new/source` and `--fresh`. For the qualified build, copy this
packet's `layout/` to the work directory, make `layout/linker.sh` executable and
use `build.py` with the same arguments. No captured binary is a compiler input.

To execute fresh local comparisons against a newly built artifact (requires the
parent runner's LiteSVM/solders environment), use new output paths:

```sh
python -B research/fees-sharing-slice-recovery/run_parallel.py \
  --candidate /absolute/work/builds/new-label/candidate.so \
  --output /absolute/new-runtime.json --jobs 4
python -B research/fees-donation-quote-source-recovery/curve_cases.py \
  --candidate /absolute/work/builds/new-label/candidate.so \
  --output /absolute/new-curve-cases.json
```

The final stripped SHA-256 is
`4fa1e7702f25b302c4f2b675c5eb2178460d84f7f233c9edbd4a6e63f5fd6fe1`;
the symbol-bearing SHA-256 is
`36306557ce650e0a8c77248e315380096c9a41be02af37bbd24e90df89e08521`.

Separate event serialization, self-CPI construction, borrowing and error-format
experiments did not establish a further accepted recovery. They remain local
negative controls and are excluded from this source delta and runtime claims.
