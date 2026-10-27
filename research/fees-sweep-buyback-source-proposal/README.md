# SweepBuyback: original admission, diagnostic and arithmetic ordering

A three-file ordinary-source correction on exact
[public PR212](https://github.com/lalalune/pumpfun-source/blob/9b09de84c9422ec6bacb363231a0f8a2d8c14a31/research/fees-exotic-body-source-integration/README.md)'s frozen 559
inputs preserves 559/585 complete normalized windows, 143 raw local matches,
412 unique pairs and all 166 previously equal Locations. No new complete-body
match is claimed: the actual SweepBuyback body is 6,984 bytes versus the
original 6,960 (previous source 9,248). All 3,341 prior actual callee obligations
remain equal; no mask is widened, duplicate pair forced or original byte copied
into compiler input.

The original matched wrapper at 651272 calls the real business body at 120816,
not an unused helper. Disassembly supports these corrections:
- The index check uses compared-value `require_gt!`, at the actual
  instructions/buyback/mod.rs line 109.
- A real BuybackVault admission method in state.rs reads Clock using unwrap,
  performs checked signed subtraction for the rate limit, and updates
  last_claimed before the transfer. Rust locations 67:32 and 73:12 match naturally.
  The helper's historical name and exact original source spelling are unknown.
- SOL balance is read through the borrowed account (`get_lamports`), not an
  unnecessary cloned AccountInfo.
- Anchor checked Lamports subtraction/addition occurs before updating cumulative
  counters. Counter overflow uses plain FeeError conversion, not an invented
  source-bearing error! constructor. This preserves both error precedence and
  original diagnostics.


## Concurrent work and attribution

[PR219](https://github.com/lalalune/pumpfun-source/pull/219) independently published
the same destination `add_lamports(sol_amount)?` correction on its PR215 parent.
That shared arithmetic change is credited there, not claimed here as an exclusive
discovery. The exact-source admission/Location recovery, real state method,
borrowed balance read, pre-counter transfer ordering and source-free counter
errors are the separate corrections documented by this proposal. The observed
275 log repairs and boundary results above are measured against the **pinned
PR212 baseline**, not asserted as incremental gains over PR219 or current main.
No comparative runtime result against the newer combined upstream source is
claimed. PR220's newer 569-window union is also separate; the unchanged 559
count here describes this isolated tested source, not the best current frontier.

Two actual root-clean official-v1.44 source builds reproduce candidate SHA256
c52b03a34ed6bb6371b1cc034c543743131b1afa55efaeb29b6297bb064da82e and symbols
6c8814ae805b497c514eea2933736b95552a50dd07cdea523fb7a53c464e4fb2.
They use the established pinned offline registry and immutable dependency seed;
this is not a new all-dependency-clean or OS-isolated build claim.

Fresh exact-candidate offline regression passes 17,331 cases / 18 suites. Within
it, all 1,249 Buyback cases now also match application logs, eliminating 275 prior
log mismatches. Another 8 destination-balance/counter-boundary cases eliminate
4 prior outcome mismatches and 6 log mismatches (4 overlap the outcomes; 2 are
additional log-only differences). Both native and nonnative mints are covered.
A saturated recipient produces original ArithmeticOverflow before a later
counter-overflow error, rather than a panic or the wrong custom error.
The 1,249 cases' 2,498 actual synthetic transactions / 4,978 signatures and the
8 boundary cases' 16 transactions / 32 signatures were independently verified.
No live signing, transaction submission or wallet interaction occurs.

The static audit binds the actual matched wrapper, compares the multiset of
all 37 complete actual callee shapes and bijectively checks all 17 direct used
operands/descriptors, including trait metadata/callbacks and full Rust source
locations. These are NOT same-position call/operand or complete CFG equality;
full body identity remains open. Six in-memory binding/callee/data mutations are rejected without saving or executing a modified binary. Arbitrary instructions in the unmatched body
are not certified by this bounded inventory. Used discriminant extents are
identified separately from entire containing allocations.

The compiler ELF is 871,192 bytes versus meaningful original 873,256. Section
size differences are .text -2,448, .rodata -128, .data.rel.ro +224 and .rel.dyn
+288. Common-position differing bytes increase 448,155 -> 455,540, so this
semantic/source correction is NOT a whole-file raw improvement. The original
capture is 948,944 bytes; none of these images is fully byte-identical.

All local execution evidence stays local. This packet includes only ordinary
source deltas, public source provenance, a readable patch and source-only tools.
No native artifact, archived compiler/runtime report, transaction/log fixture or
encoded derivative is included. The local static audit and its mutation results
are described as unpublished observations, not a supplied executable-output or
runtime proof. The default tools do not read or verify any native output.
These local observations do not establish exhaustive semantics, full raw runtime
logs/CU equality, historical source provenance or whole-program byte identity.
Authentic fixed-admin initializer success remains outside standard coverage.
All four core whole identities remain unresolved; no selected checkpoint changes.


## Exact source verification and materialization

The unchanged input set has 43 files; only `buyback.rs`,
`instructions/buyback/mod.rs` and `state.rs` differ. Later PR215 Social semantics,
PR218 parser integration and other concurrent source branches are **not composed**
here; this is a separately measured delta, not a claim to contain all upstream
work. No packages, features, compiler inputs outside these files or lock records
change.

```sh
P=research/fees-sweep-buyback-source-proposal
python3 -B "$P/verify.py"
python3 -B "$P/test_scope.py"
python3 -B "$P/materialize.py" --parent-source /exact/pr212-source --output /fresh/source
```

`manifest.json` flattens all immutable public parent revision/path/hash mappings.
The readable three-file patch must reverse to exact parent hashes and round-trip.
Full input/output maps are checked, existing outputs and symlink paths refused,
and the actual method/source-coordinate and arithmetic-order expressions are
checked. Thirteen stdlib tests cover source/patch/path mutations and false
runtime claims. Verification performs no network, subprocess, compiler or target
execution, and reports `native_build_verified=false`, `runtime_verified=false`
and `whole_binary_identity_verified=false`.

For native reproduction follow the [pinned Linux v1.44 recipe](https://github.com/lalalune/pumpfun-source/blob/79e592bfdbd08a7e0129eccfa55087e2609fddda/research/fees-six-window-source-integration/README.md#verify-and-materialize):
unchanged 252 registry packages, default Anchor/SPL features, entrypoint 2.2.1,
separate math crate, source-path mappings, release profile and pinned stripper.
Require a genuine root compiler invocation; authenticate the math/dependency
cache or require its real compiler invocations when rebuilding. Fresh dependency
and relocated-path reproduction are separate checks. Never patch or substitute
an output to repair its hash.

The package-local `.gitattributes` permits exact whitespace only in `source.patch`; the source verifier checks that literal rule.
