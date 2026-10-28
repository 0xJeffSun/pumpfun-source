# Recover the external Pump FeeConfig decoder

Separating the route's Rust `FeeConfig` type from the generated external IDL
account restores the complete unchecked decoder at original **0x1159d8**:
**1,176 bytes / 142 instructions**. The previous 408-byte decoder called a shared
1,352-byte Borsh reader. The proposed decoder contains the original field-read
sequence. This also repairs the previously documented unequal final call from
the already-matching checked wrapper at original 0x1156f0, offset 728.

The change is in [local-feeconfig.patch](local-feeconfig.patch) and
[proposed/src/trade_types.rs](proposed/src/trade_types.rs). It removes one alias
and defines the route type with the same six ordered fields and the same Borsh
serialize/deserialize and Clone derives. The legacy external CPI account stays
the generated IDL type. `FeeTier`, `Fees`, and `Shareholder` remain aliases.
The retained blank line preserves downstream source coordinates. No global
optimization setting, SDK, dependency, linker layout or binary byte is changed.

## Same-profile result

| Ordinary Linux v1.44 **SBF** build | Injective normalized windows | Raw-equal windows |
| --- | ---: | ---: |
| Public sourcefronts780 parent, rebuilt locally | 780 / 1,035 | 121 |
| Separate route FeeConfig | **781 / 1,035** | **121** |

Exactly one original signature is gained and none is lost. All 780 normalized
and all 121 raw matches are retained. These are inferred function-window counts,
not a percentage of project completion. The new body is normalized-equal, not
raw-equal: the existing normalizer masks direct-call immediates and ELF-relocated
pointer operands. No new masks were added.

The five direct call sites in this decoder bind to matching complete normalized
callee windows. Following actual direct/imported calls reaches 32 matching
window pairs and 53 matching edges, with seven indirect sites left unproved.
Both root data references are independently decoded as relocated 24-byte
records: `programs/pump/src/lib.rs:84:1`, and the Borsh I/O error
`failed to fill whole buffer`, kind 37. See [closure.json](closure.json).
Some inferred callee windows have successors outside their window; this is a
bounded direct-call check, not complete transitive control-flow/data equivalence.
The root itself has no outside successors and all 142 instructions are reachable.

Across the 567 unambiguously paired, previously matched original windows,
6,125 actual direct/imported call sites were compared. The 6,082 previously
matching destinations are retained; the FeeConfig wrapper's final call becomes
the 6,083rd. None regresses, and the 42 remaining unequal destinations are
unchanged. Sixty duplicate-signature groups are excluded from this separate
boundary audit; it is not a universal 780-root correspondence claim.
See [retained-calls.json](retained-calls.json).

Two actual native root compilations of the candidate reproduce both complete
generated files byte-for-byte, holding all 60 source inputs and 355 compiled
dependency artifacts fixed:

| Artifact | SHA-256 |
| --- | --- |
| Baseline stripped | `35cf70afe10dcc5f97238c2d33d763590c444fd231db8ab3a0381c2cc9476848` |
| Candidate stripped | `a40ebd3568a2ba558130ef2c6b9d0e3765988bc0c66432ac767c48e71b21184e` |
| Candidate symbols | `34a8c2221ac55e693cfb95e20f63a959b72779808e9f3b070b7f011e3eeaa589` |
| Captured original | `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` |

Whole-original ELF identity is **false**. The reconstruction does not establish
the original Rust type names or historical source. Type identity is the tested
source-level explanation for this compiler specialization/inlining difference.

`caller-boundary.json` binds the actual original, 780 baseline and proposed
ELFs, including the checked wrapper's final call. The earlier `callers.json`
and `controllers/inspect.py` are retained diagnostic observations of a prior
777-source build, not receipts for these current builds; no count or runtime
result is taken from those earlier observations.

## Parent, provenance and excluded attempts

The parent is the 60-input `sourcefronts780` stage from
[PR #342](https://github.com/lalalune/pumpfun-source/pull/342), exact head
`3887bcf3fbcfe308c986094a51a99bf75240a0a7`, based on maintained Round37
`b855ede024ac3bac603405db1d874ee58e651b38`. Its earlier 780 recoveries are credited
to the contributors recorded in [parent-README.md](parent-README.md); they are
not new gains of this PR. The complete parent source inventory is pinned and
retained alongside the proposal. Maintained source/checkpoint selection is not
promoted by this research proposal.

At the subsequent public-head review, #342 had added a distinct SBPF clamp
profile (786); #352 restored legacy-buy wrappers, #353 whitelist loops, and
#354 checked three-value addition. Those changes are different source scopes.
The updated #342 still explicitly listed the 1,176-versus-408-byte FeeConfig gap.
Their counts/build profiles are not transferred to this SBF control. This packet
does not claim to have composed those later patches.

The final 2026-10-28 01:06 UTC review also checked #355 sequential subtraction,
#356 checked market cap, #357 reserve-update methods, #358 fee-accrual methods,
and #359 a separately qualified legacy-buy specialization. Updated #342 at
`36387c009159c22b0c109e7f9c1398f3bc6dde17` added an SBPF v2-rent stage (789),
again explicitly retaining the FeeConfig decoder gap. None implements this
route/external type separation. The separately pinned 780 baseline remains the
comparison control; later frontier gains are not counted here.

Two setup attempts are preserved rather than silently reused:

* The public materializer initially rejected the archived standalone Cargo
  manifest. A fresh parent copy was adapted to the exact published workspace
  manifest hash, after which the unchanged materializer verified all 60 output
  hashes. `public-inputs.json` binds this operation; the archived parent stayed
  untouched.
* The first proposed build reported `Fresh pump-recovered`: its source-copy
  mtime predated the baseline at the same logical mount. It is explicitly
  **disqualified**, not evidence of a changed-source build. Both accepted runs
  refresh only root-file mtime, preserve its content hash, and require an actual
  root rustc invocation. See `excluded-cache-hit/qualification.json` and the
  original controllers/logs.

## Reproduce and inspect

The portable verifier checks file integrity, both full source inventories,
actual root-build receipts, dependency/tool identity, repeat hashes, the complete
before/after window census, real direct-call destinations, the two interpreted
root data records, and the saved runtime bindings/results. It does not compile
or execute the program, and refuses Python optimization that removes assertions.

```sh
python3 -I -B research/pump-feeconfig-decoder-recovery/verify.py
python3 -I -B research/pump-feeconfig-decoder-recovery/materialize.py \
  --stage candidate --output /fresh/path/feeconfig-source
```

`--stage baseline780` restores the exact comparison parent. Both source archives
contain ordinary Rust/workspace inputs only. They are never reconstructed from
an ELF. Use the ordinary v1.44 SBF profile described in `LINUX_RECIPE.md`; exact
commands, environment, tools, 355 dependency hashes and logs for this run are in
`builds/{baseline780,candidate,repeat}/`. Controllers preserve the actual local
paths and commands; substitute physical host mount paths for another machine.
Require a real root compile, unchanged inputs and the recorded output hashes.
Generated ELFs are comparison outputs only. They are not compiler inputs.

The local runtime command, executed against the exact stripped candidate, is:

```sh
python3 -B scripts/pump_validate_parallel.py \
  --candidate work/pump-feeconfig-recovery-20261028/candidate.so \
  --source-directory work/pump-feeconfig-recovery-20261028/source/programs/pump \
  --build-comparison work/pump-feeconfig-recovery-20261028/build-comparison.json \
  --output work/pump-feeconfig-recovery-20261028/runtime/report.json.gz \
  --workers 3 --captured-loader
```

The build-record adapter explicitly binds a byte-identical runtime copy to the
accepted native build's launch and result hashes; it does not claim another
compile occurred in that copy. Original binaries/captures and prior evidence
were preserved. No networked chain transactions or deployment are involved.

## Local execution results

The exact candidate passed **44 suites / 10,468 cases**, using the captured
upgradeable-loader layout. Every suite has its own retained actual original and
candidate ELF-loading hashes, preserved header/allocation checks, and unchanged
harness/source bindings. The 372 V3 configured-fee and 352 exact-quote cases are
part of this run, as are the 284 legacy-buy and 28 configured-fee legacy-sell
cases. No earlier candidate's runtime results are transferred.

The existing diagnostic audit compared **10,464 log-bearing cases with zero
mismatches**, including panic/error payloads, account-origin categories and
compared operands. It excludes source file/line coordinates and compute usage;
the four cases without paired logs are not silently counted as log comparisons.
Per-suite outcome/state/CPI/signature oracles retain their published limits.
The Tokenkeg two-curve subset records 20 cases, 40 verified outer signatures,
16 original successes and 18 cases with original Pump CPI. This is not a claim
that all 10,468 cases use that same signature oracle or that every raw log/CU
value is equal.

`runtime/report.json.gz` and the separate suite/loader receipts retain the exact
run. `runtime/environment.json` records the local Python/package versions.
The portable verifier audits these saved results; running it in CI is not
another VM execution. All source, native-build and runtime inputs stay bound to
this specific candidate. Whole-program equivalence remains unproved.
