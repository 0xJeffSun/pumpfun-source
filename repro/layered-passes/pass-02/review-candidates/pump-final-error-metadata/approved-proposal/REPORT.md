# Pump final error: authentic metadata and reconstruction-fence separation

The original final error is **`QuoteMintNotWritable`, ordinal 110, code 6110**.
This is stronger than the prior last-string observation: the package records
complete Debug/Display/conversion windows, static selection paths for every
Debug ordinal 0–110, a literal 110 passed to the authentic name/ToString helpers,
and an actual 6110 error-number store. The captured official IDL still ends at
6109; it is retained unchanged and is not represented as documenting 6110.

A four-file source-only proposal restores this metadata in `PumpError` and moves
all **11 existing reconstruction-fence references** to a distinct local
`ReconstructionError`. Those references keep precisely the same variant name,
message and numeric code they currently have. No condition, account check,
control flow, signer rule, or instruction dispatch changes. The accepted
`MigrateV2Error` enum and migration implementation remain untouched. No build,
transaction, source integration, new coverage or full-binary equality is claimed.

## Baseline and scope

This package binds the 37 source inputs for current candidate
`731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93`
(1,579,424 bytes) and symbols
`151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d`.
All source files are retained for input identity. Apart from error declarations
and exact surrogate-token sites, source bodies are opaque in this task. Stopped
sell_v2/incentive, Mayhem-initializer and old extension semantics were not
investigated. The current migration's existing declaration is evidence about
already accepted metadata, not authorization to investigate its extension path.

The original ELF is
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
Original window ends are inferred from direct-call and relocation entries;
current candidate identities come from its symbol ELF. No original source type
name is asserted merely from those candidate names.

## Complete metadata evidence

| Role | Original | Current candidate | Result |
| --- | --- | --- | --- |
| Debug formatter | `[1436840,1441232)` | `[1222920,1227312)` | 4,392 bytes; only normalized slot difference is offset 2120, string length 20 versus 31 |
| Display formatter | `[1433224,1436840)` | `[1219304,1222920)` | 3,616 normalized bytes agree, but ordinal 110 selects unequal message data |
| name allocator | `[1405824,1432720)` | `[1191880,1218800)` | 26,896 versus 26,920 bytes; complete bytes/calls retained, not claimed equal |
| From-error conversion | `[1432720,1433224)` | `[1218800,1219304)` | 504 normalized bytes agree; actual name/Display targets recorded |

`static-evidence.json` contains complete decoded windows, raw and normalized
hashes, relocations and actual direct destinations. No normalized executable is
written or executed. The static selector follows only constant comparisons,
register moves and literal selection in the formatter tree and stops before
its formatting call; it is not an ELF/transaction VM.

All original and candidate Debug selections for ordinals 0–109 agree with the
110 saved official IDL names. The full path for ordinal 110 reaches the original
literal at 1805262, length 20, `QuoteMintNotWritable`. Ordinal 109 instead reaches
`QuoteChainAccountsRequired`. Thus the `== 109` branch near the last literal
cannot be confused with a claim that the last literal is ordinal 109.

For ordinal 110 the original Display selects the 16-byte slice descriptor at
1828624, pointing to 1810044 for exactly 115 bytes:

> quote_mint must be writable for a quote with a Token-2022 transfer fee: its withheld fees are harvested to the mint

This is the message already used by the current source's separate
`MigrateV2Error::QuoteMintNotWritable = 110`. Current `PumpError` instead selects
`Reconstruction branch is not implemented` (40 bytes). Consequently the complete
normalized Display body match is **not** a semantic message match: its relocated
data matters. Current Debug selects the 31-byte surrogate name.

The original conversion stores its scalar input, calls name at 1432784→1405824,
calls Display at 1432920→1433224, and adds 6000 at 1433112 before storing the u32
error code. The explicit 110 construction below closes the otherwise ambiguous
relationship between formatter-domain selection and a real emitted 6110 error.
The locked `anchor-syn` generator separately specifies `enum as u32 + offset`,
`name()`, Display message, and an AnchorError containing those values.

## Original usage: exact metadata block, bounded claim

The only relocated code references to a four-byte literal 110 in the original
are **308008 and 308048**, both in inferred window `[301192,310080)`. The package
records only their error-construction block `[307992,308208)` and metadata callees;
it does not decode the surrounding migration/extension decision or invent a
writable check from an error name.

* 308008 loads literal address **1793568**, which contains u32 110; the actual
  308024 call reaches the same authentic name routine 1405824.
* 308048 reloads that literal; 308064 calls ToString at `[43320,43616)`.
* 308128 stores explicit error number **6110**.
* The source-literal pointer at 308072 consumes the exact stored filename
  `programs/pump/src/migrate_v2.rs` and the block stores historical line 335.
* 308168 reaches AnchorError conversion `[1686320,1686456)`.

The filename is corroborating metadata attached to these concrete calls; it is
not used to infer the surrounding business behavior. All relevant literal
bytes and full metadata callees are retained. The standalone Debug formatting
callee `[1766256,... )` has current normalized matches, also retained.

The scan also finds an immediate numeric store of 110 at 1376728 in another
window. It is deliberately listed as an **unattributed numeric store**, not an
enum construction or permitted writable-check site. Its surrounding semantics
are outside this task. Likewise, enumeration of literal references is not proof
that no dynamic error construction exists. No conclusions are drawn about
stopped or unidentified handlers, no caller guards are changed, and no complete
application callgraph is claimed.

## Exact source proposal

`metadata-separation.patch` changes only:

1. `programs/pump/src/lib.rs`: replace the final surrogate `PumpError` declaration
   with the authentic binary-evidenced variant/message and explicit ordinal 110;
   add a clearly local `ReconstructionError` with the former surrogate
   declaration, also explicitly ordinal 110.
2. `create_v2.rs`, `trade.rs`, and `multi_hop_curve.rs`: replace only the exact
   `PumpError::ReconstructionBranchUnsupported` expression with
   `crate::ReconstructionError::ReconstructionBranchUnsupported` at all 11 sites.

The conditions and surrounding bytes in those three files are unchanged under
this exact token substitution. The local reconstruction enum is not presented
as recovered historical source. Existing fences still describe an unsupported
reconstruction branch rather than being mislabeled as a writable-mint failure.
Their name/message/code remain the same; sharing code 6110 is an explicit
compatibility choice inherited from the accepted candidate, not a claim that a
local surrogate is part of the original ABI. `surrogate-sites.json` lists each
site and the preserved contract without interpreting its excluded mode logic.

No existing call is redirected to the authentic final `PumpError` variant, and
no new call site or guard is added. The migration-specific error remains as it
was to avoid changing an accepted path under this metadata-only assignment.
A later reviewed consolidation may choose to use the common authentic variant,
but is not necessary for this proposal. The official IDL file is untouched.

The locked Anchor macro sources show that error name and Display use the variant
identifier/message, and error construction obtains the same u32 ordinal plus
6000 regardless of the containing enum's Rust type name. `error!` retains its
real caller's `file!()`/`line!()` origin; there are no fabricated origins, padding,
inline annotations, compiler changes, or layout variants. Natural source line
movement in `lib.rs` is not claimed byte-neutral. Compile output and all runtime
behavior still require independent validation before integration.

## Limits and verification

This is a source-fidelity proposal, not a measured binary improvement. Full
original/candidate equality remains false. Exact historical Rust type names,
source layout, compiler units, and all transitive formatter/allocator behavior
remain unproved. The unchanged accepted migration enum supports the binary
metadata independently, but the source's existing acceptance is not reused as
proof that this proposed split has executed successfully.

The original first read-only selector attempt stopped when it reached a
Display-formatting store; the revised analysis explicitly ends selection there.
Both scripts and the diagnostic are preserved under `preparation/`. This was a
static-analysis boundary adjustment, not a target runtime attempt.

```sh
python3 -B /path/to/publication/verify.py
python3 -B /path/to/publication/verify.py --repo /path/to/pumpfun-source
```

The portable verifier checks the seal, all 37 input bindings, locked crate
archives, whole metadata ledgers, ordinal/data selections, code conversion,
original metadata references, and exact proposal substitutions. The optional
repository check fails if current source has moved from this frozen baseline.
No builds, account fixtures, transactions, or network calls are performed.
