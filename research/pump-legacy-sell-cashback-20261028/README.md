# Legacy-sell cashback source reconstruction: retained coverage, no new window

This source-only research packet restores an original-backed missing cashback
account path on exact L33. A single ordinary native Linux v1.44 control retained
**1010/1035 normalized and 166 raw windows**, under both membership and injective
counting, with **zero gains, zero losses, and zero multiplicity deficits**.
It is **not a new-window result**, maintained checkpoint, runtime verification,
repeat-build claim, historically exact source, or whole-binary reproduction.
The untouched L33 build remains the matching baseline.

Only a two-file Rust patch, source pins, a pure-Python materializer, tests and
this report are included. No ELF, IR, SDK, archive, disassembly, build log or
runtime receipt is included. The packet's tools do not compile or execute Pump.

## Exact parent and source scope

Parent: [L33 source at `1056a228…`](https://github.com/lalalune/pumpfun-source/tree/1056a228ab81a6e8352a0e4c97b222470531a4e9/research/claude-pump-integration-20261027/r37-layout-33/source).
`pins.json` authenticates all **65 archived source files** by SHA-256 and Git
blob identity. The result has the same 65 paths, with only:

| File | Result SHA-256 |
|---|---|
| `programs/pump/src/lib.rs` | `369f5f12e07caf1934025aad591fbc25dfdff804d59b0885c138f3cdd181731b` |
| `programs/pump/src/sell.rs` | `42e62f5d29ca622dce5e881d83537587939b06071a330b1a99e13ce201742444` |

No manifest, lockfile, account schema, instruction argument, discriminator,
error enum, dependency, feature or unrelated handler changes. The existing
creator-module split and inherited synthetic Source-positioning remain
verbatim. No new padding, filler, forced statement joins, numeric Source edits,
inline attributes, flag sweep, layout generator or output repair was used.
`lib.rs` remains 3,187 lines; every unrelated line stays in its prior position.
The original 148-line `sell.rs` prefix is unchanged.

## Missing path and original evidence

Comparison original: Pump capture SHA-256
`7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
Bounded static inspection covered helper `0x6cd78` (8,544 bytes), its caller
`0x152888` (8,488 bytes), and the relevant typed/native/system helper edges.
Addresses identify observations in that capture, not instructions to patch it.

L33 requires the cashback accumulator already to be owned by Pump with at least
82 bytes, updates a raw byte range, and prevalidates payment accounts even for
zero payment. The original instead supports an empty-data account and orders
validation/payment as follows:

1. The caller bypasses payment-specific processing when the payment is zero
   (`0x153730..0x153778`). For nonzero cashback it calls `0x6cd78` at
   `0x153b58`.
2. The helper requires remaining account 0 and checks its user-volume-accumulator
   PDA. Empty data takes Rent/shortfall funding, allocation of **137 bytes**,
   assignment to Pump, and discriminator/user initialization. Existing data
   instead receives Pump-owner, minimum-eight-byte and discriminator checks.
3. Native payment at `0x6e648 -> 0x969f0` precedes typed account construction,
   zero-user repair, checked cashback addition and account exit. The helper
   validates remaining account 1's curve-v2 PDA only afterward.
4. The typed constructor is specifically **checked**:
   `0x6e688 -> 0x9ab0 -> 0x101c20 -> 0x101ef8`. Decoder `0x101c20` tests the
   discriminator and emits Anchor 3001/3002 before its payload decoder. A
   normalized-identical unchecked wrapper exists, so normalizing direct calls
   alone cannot establish this API choice. The reconstruction uses
   `Account::try_from`, not `try_from_unchecked`.
5. Original shortfall arithmetic at `0x6d740..0x6d788` occurs before funding
   CPI-context clones beginning at `0x6d790`. The same saturating subtraction is
   now bound before context construction; the predicate, single lamport read,
   amount, account references and ownership operations are unchanged.

The locked Anchor 0.31.1 API and its actual account macro dependency 0.31.2
corroborate checked versus unchecked decoding. No dependency versions were
changed. Allocation137 comes from original instructions, not a replacement of
account validation with a shortened schema.

The same live seed/user/bump leaves remain available through both allocate and
assign calls. Their Rust signer representation was deliberately not rearranged
to imitate stack offsets or instruction counts. These are static source/order
observations, not executed CPI, account lifecycle, borrowing or rollback tests.

## Meaningful caller extraction

An ordinary `settle_creator_or_cashback` helper groups the observed settlement
operation and returns `(buyback_index, paid_cashback)`:

| Branch | Ordered processing | Successful result |
|---|---|---|
| Zero payment | No payment-specific remaining-account access | `(1, false)` |
| Nonzero cashback | Cashback initialization/validation, payment, checked update/exit, then curve-v2 | `(2, true)` |
| Nonzero noncashback | Curve-v2, creator-vault rent assurance, creator payment | `(1, false)` |

The caller then checks the returned buyback index. Four creator/cashback event
selectors use the successful cashback marker rather than the raw coin flag.
The original count/marker convergence is visible at `0x153b80..0x153b98`.

This extraction is a readable source abstraction, **not** evidence of a
distinct historical combined settlement function. It replaces the caller's
seven-line block with seven meaningful source lines without moving unrelated
definitions. A prior expanded source control had lost 17 existing normalized
windows through a +21-line collateral shift; this revision does not retain
that regression. No numeric positioning repair was performed.

## Measured result and limits

Both untouched L33 and this one control used ordinary official native Linux
v1.44 tools with the same 25 SBPF target libraries, locked 254 registry packages,
physical-source wrapper and ordinary release profile. Source, SDK/cache and
prior-output preservation checks passed. Standard copy plus `--strip-all` was
the only output transformation; the original was comparison-only.

| Static census | Untouched L33 | This control |
|---|---:|---:|
| Normalized membership / injective | 1010 / 1010 | 1010 / 1010 |
| Raw membership / injective | 166 / 166 | 166 / 166 |
| Gain / loss versus L33 | — | 0 / 0 |
| Multiplicity deficits | 0 | 0 |

The native Linux result must not be conflated with L33's different-host public
168-raw result or generated-link-layout statistics. Both outputs differ from
the original whole ELF. No repeat build is claimed for this control.

The compiler inlined cashback into a **9,056-byte combined settlement body**;
there is no independently emitted, matched cashback helper. The emitted sell
caller is **7,696 bytes**, not the original 8,488. The appended helper's known
Source coordinates still differ from original `sell.rs` lines 23–114. Retained
normalized windows therefore do not prove the new path or entire handler
byte-identical, nor do normalized call/data operands prove semantic identity.

This is bounded source reconstruction with measured coverage retention. Full
transitive decoder/serializer equivalence, account/CPI effects, error rollback,
runtime fixtures and whole-program behavior remain unverified. No VM, live
RPC, wallet, deployment, account-owner rewrite or fixture adaptation is part
of this packet.

## Source-only use and tests

The materializer requires the exact **archived** parent `source/` directory,
not a prepared compiler workspace. It rejects every other file inventory or
byte sequence, symlinks, unsafe patch paths, unsupported/fuzzy hunks, changed
pins, existing output and output nested under the parent. It authenticates all
result bytes and verifies parent content/metadata are unchanged. It does not
download anything or invoke Git, Cargo, a compiler or a runtime.

From a checkout containing this packet and the pinned parent:

```sh
python3 -B research/pump-legacy-sell-cashback-20261028/test_materialize.py \
  --parent research/claude-pump-integration-20261027/r37-layout-33/source -v
mkdir -p work
python3 -B research/pump-legacy-sell-cashback-20261028/materialize.py \
  --parent research/claude-pump-integration-20261027/r37-layout-33/source \
  --output work/legacy-sell-cashback-source
```

**23 pure source tests passed** during packet preparation, including a
single-byte mutation of each of the 65 parent files; missing/extra files and
directories; file/directory/root/output symlinks; overwrite protection; patch
context/count/offset/path mutations; pin mutation; exact output; source-line
preservation; checked decoder/order; and event selectors. These tests are
text/hash checks, not Rust typechecking, instruction emulation or Pump fixtures.

The packet is a research proposal. Publication, repository CI scope and any
later execution require their own review; these source-only commands do not
authorize workflow dispatch, merging, deployment or runtime testing.
